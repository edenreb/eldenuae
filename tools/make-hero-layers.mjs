// Generates the three hero parallax planes from a single Elden photograph.
//
// These are depth-band slices, not true cut-outs: the source is one flat photo,
// so there is no real occlusion data. It works because interiors recede upward
// in frame — floor is near, back wall is far — so horizontal bands approximate
// depth. Each plane is the same photo masked to a different band with a
// feathered edge, so at rest they align seamlessly and only separate as they
// scroll at different rates.
//
// Re-run with a different source:  node tools/make-hero-layers.mjs <path-to-jpg>

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2] ?? path.join(root, "../src/assets/anantara-penthouse/1.jpg");
const OUT = path.join(root, "../src/assets/hero-parallax");

// One canvas for all three — misaligned planes are the main way this breaks.
const W = 2400;
const H = 1600;

/** Vertical alpha ramp: transparent above `from`, opaque below `to`. */
const bandMask = (from, to) =>
  Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="${from}%" stop-color="#fff" stop-opacity="0"/>
           <stop offset="${to}%" stop-color="#fff" stop-opacity="1"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
     </svg>`,
  );

const base = () => sharp(SRC).resize(W, H, { fit: "cover", position: "centre" });

async function build() {
  // Layer 1 — farthest. The whole room. Travels most (70%), so it is also
  // pulled back slightly in brightness to sit behind the nearer planes.
  await base()
    .modulate({ brightness: 0.88 })
    .ensureAlpha()
    .webp({ quality: 88 })
    .toFile(path.join(OUT, "layer-1.webp"));

  // Layer 2 — midground. Lower ~60% of the room: floor plane and furniture.
  await base()
    .ensureAlpha()
    .composite([{ input: bandMask(34, 56), blend: "dest-in" }])
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(path.join(OUT, "layer-2.webp"));

  // Layer 4 — nearest. The strip closest to camera. Travels least (10%) and is
  // darkened so it reads as foreground rather than a duplicate of layer 2.
  await base()
    .modulate({ brightness: 0.72 })
    .ensureAlpha()
    .composite([{ input: bandMask(70, 86), blend: "dest-in" }])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT, "layer-4.webp"));

  for (const f of ["layer-1.webp", "layer-2.webp", "layer-4.webp"]) {
    const m = await sharp(path.join(OUT, f)).metadata();
    console.log(`${f}  ${m.width}x${m.height}  alpha=${m.hasAlpha}  ${m.format}`);
  }
}

build().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
