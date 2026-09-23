// Turns a video into a scroll-scrub frame sequence for FrameSequence.astro:
// every frame as WebP, once per width, named 0001.webp, 0002.webp, ...
//
//   node tools/video-to-frames.mjs src/assets/voco-by-ihg/featured.mov public/sequences/voco-by-ihg
//
// macOS only: decoding goes through decode-frames.swift (AVFoundation), so
// it needs Xcode's `swift` but not ffmpeg. Encoding uses sharp, which Astro
// already installs.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// 1920 for desktop and tablet, 1280 for phones (see FrameSequence.astro).
const WIDTHS = [1920, 1280];
const QUALITY = 70;

const [video, outDir] = process.argv.slice(2);
if (!video || !outDir) {
  console.error("usage: node tools/video-to-frames.mjs <video> <outDir>");
  process.exit(1);
}

const tmp = mkdtempSync(path.join(tmpdir(), "frames-"));
try {
  const decoder = fileURLToPath(new URL("./decode-frames.swift", import.meta.url));
  execFileSync("swift", [decoder, video, tmp], { stdio: "inherit" });

  const frames = readdirSync(tmp).filter((f) => f.endsWith(".jpg")).sort();
  for (const width of WIDTHS) {
    const dir = path.join(outDir, String(width));
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    for (const frame of frames) {
      await sharp(path.join(tmp, frame))
        .resize({ width })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(dir, frame.replace(/\.jpg$/, ".webp")));
    }
    console.log(`${width}px: ${frames.length} frames -> ${dir}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
