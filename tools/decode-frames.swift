// Decodes every frame of a video to full-resolution JPEGs using the OS's own
// AVFoundation decoder (no ffmpeg needed). Called by video-to-frames.mjs.
//
//   swift tools/decode-frames.swift <video> <outDir>
//
// ponytail: ignores the track's preferredTransform, so rotated phone footage
// comes out sideways; apply it to the CIImage if that ever matters.
import AVFoundation
import CoreImage

let args = CommandLine.arguments
guard args.count == 3 else {
  FileHandle.standardError.write("usage: swift decode-frames.swift <video> <outDir>\n".data(using: .utf8)!)
  exit(1)
}
let input = URL(fileURLWithPath: args[1])
let outDir = URL(fileURLWithPath: args[2])

let done = DispatchSemaphore(value: 0)
var failure: Error?

Task {
  do {
    try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
    let asset = AVURLAsset(url: input)
    guard let track = try await asset.loadTracks(withMediaType: .video).first else {
      throw NSError(domain: "decode-frames", code: 1, userInfo: [NSLocalizedDescriptionKey: "no video track"])
    }
    let reader = try AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(
      track: track,
      outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
    )
    output.alwaysCopiesSampleData = false
    reader.add(output)
    guard reader.startReading() else { throw reader.error! }

    // Core Image colour-manages the decoded buffer into sRGB for the web.
    let context = CIContext()
    let srgb = CGColorSpace(name: CGColorSpace.sRGB)!
    let options = [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.95]

    var index = 0
    while let sample = output.copyNextSampleBuffer() {
      guard let buffer = CMSampleBufferGetImageBuffer(sample) else { continue }
      index += 1
      let url = outDir.appendingPathComponent(String(format: "%04d.jpg", index))
      try context.writeJPEGRepresentation(of: CIImage(cvPixelBuffer: buffer), to: url, colorSpace: srgb, options: options)
    }
    if reader.status == .failed { throw reader.error! }
    print("decoded \(index) frames")
  } catch {
    failure = error
  }
  done.signal()
}

done.wait()
if let failure {
  FileHandle.standardError.write("\(failure)\n".data(using: .utf8)!)
  exit(1)
}
