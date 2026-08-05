// Re-encodes src/assets photos/logos into responsive WebP variants, rewrites
// the import blocks in the files that reference them, and updates
// src/assets/generated/images.ts. Run manually: `node scripts/optimize-images.mjs`.
//
// Safe to re-run per folder: if src/assets/<folder> is a folder of raw source
// images (imported via a plain `import X from "@/assets/<folder>/...";` line
// in one of SOURCE_FILES), this script re-encodes just that folder, replaces
// its entries in images.ts in place, deletes stale .webp variants left over
// from a previous run in that folder, and deletes the new raw source images
// after a successful re-encode. Folders/entries it doesn't touch this run are
// left untouched in images.ts.
import { readFile, writeFile, unlink, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src/assets");
const GENERATED_DIR = path.join(ASSETS_DIR, "generated");
const GENERATED_FILE = path.join(GENERATED_DIR, "images.ts");

const SOURCE_FILES = [
  "src/lib/projects.ts",
  "src/lib/testimonials.ts",
  "src/routes/index.tsx",
  "src/routes/about.tsx",
];

const PHOTO_WIDTHS = [320, 640, 1280, 1920];
const PHOTO_QUALITY = 78;
const LOGO_WIDTHS = [320, 563];
const LOGO_QUALITY = 90;

const IMPORT_RE = /^import\s+(\w+)\s+from\s+"(@\/assets\/[^"]+)";$/gm;
const GENERATED_IMPORT_RE = /^import\s+(\w+)\s+from\s+"([^"]+)";$/gm;
const GENERATED_EXPORT_RE =
  /export const (\w+): ImageSet = \{\n\s*src: (\w+),\n\s*srcSet: `([^`]*)`,\n\s*width: (\d+),\n\s*height: (\d+),\n\};/g;
const VARIANT_RE = /\$\{(\w+)\}\s+(\d+)w/g;

async function collectImageImports() {
  /** @type {{ varName: string, relImportPath: string, absPath: string, sourceFile: string }[]} */
  const entries = [];
  for (const sourceFile of SOURCE_FILES) {
    const abs = path.join(ROOT, sourceFile);
    const content = await readFile(abs, "utf8");
    for (const match of content.matchAll(IMPORT_RE)) {
      const [, varName, relImportPath] = match;
      const relDiskPath = relImportPath.replace(/^@\//, "src/");
      entries.push({
        varName,
        relImportPath,
        absPath: path.join(ROOT, relDiskPath),
        sourceFile,
      });
    }
  }
  return entries;
}

/** Parses the current generated file into { imports: Map<importId, path>, exports: [{varName, variants, width, height}] }. */
async function parseExistingGenerated() {
  if (!existsSync(GENERATED_FILE)) return { imports: new Map(), exports: [] };
  const content = await readFile(GENERATED_FILE, "utf8");

  const imports = new Map();
  for (const m of content.matchAll(GENERATED_IMPORT_RE)) {
    imports.set(m[1], m[2]);
  }

  const exports = [];
  for (const m of content.matchAll(GENERATED_EXPORT_RE)) {
    const [, varName, , srcSetRaw, width, height] = m;
    const variants = [];
    for (const vm of srcSetRaw.matchAll(VARIANT_RE)) {
      variants.push({ importId: vm[1], width: Number(vm[2]) });
    }
    exports.push({ varName, variants, width: Number(width), height: Number(height) });
  }

  return { imports, exports };
}

function isLogo(absPath) {
  return absPath.includes(`${path.sep}assets${path.sep}clients${path.sep}`);
}

async function encodeVariants(entry) {
  const { absPath, varName } = entry;
  const dir = path.dirname(absPath);
  const base = path.basename(absPath, path.extname(absPath));
  const widths = isLogo(absPath) ? LOGO_WIDTHS : PHOTO_WIDTHS;
  const quality = isLogo(absPath) ? LOGO_QUALITY : PHOTO_QUALITY;

  const img = sharp(absPath);
  const meta = await img.metadata();
  const srcWidth = meta.width ?? 0;
  const srcHeight = meta.height ?? 0;

  let useWidths = widths.filter((w) => w <= srcWidth);
  if (useWidths.length === 0) useWidths = [srcWidth];

  const variants = [];
  let originalBytes = 0;
  try {
    originalBytes = (await stat(absPath)).size;
  } catch {
    // ignore
  }

  let newBytes = 0;
  for (const w of useWidths) {
    const outPath = path.join(dir, `${base}-${w}.webp`);
    const pipeline = sharp(absPath).resize({
      width: w,
      fit: "inside",
      withoutEnlargement: true,
    });
    const webpOpts = isLogo(absPath) ? { quality, alphaQuality: 100 } : { quality };
    await pipeline.webp(webpOpts).toFile(outPath);
    newBytes += (await stat(outPath)).size;
    variants.push({ width: w, outPath, importId: `${varName}_${w}` });
  }

  return { entry, variants, srcWidth, srcHeight, originalBytes, newBytes };
}

function toImportSpecifier(absPath) {
  const rel = path.relative(ASSETS_DIR, absPath).split(path.sep).join("/");
  return `@/assets/${rel}`;
}

/**
 * Deletes .webp variant files superseded by this run — scoped to the exact
 * varName being re-encoded, never to "everything else in the folder", so a
 * folder holding multiple independent images (e.g. several numbered photos
 * for one project) can have just one of them swapped without touching its
 * siblings' files.
 */
async function cleanupStaleVariants(existing, results) {
  for (const r of results) {
    const oldExport = existing.exports.find((e) => e.varName === r.entry.varName);
    if (!oldExport) continue; // brand new image, nothing to clean up

    const newBasenames = new Set(r.variants.map((v) => path.basename(v.outPath)));
    for (const v of oldExport.variants) {
      const oldImportPath = existing.imports.get(v.importId);
      if (!oldImportPath) continue;
      const oldBasename = path.basename(oldImportPath);
      if (newBasenames.has(oldBasename)) continue; // overwritten in place, fine

      const oldAbsPath = path.join(ASSETS_DIR, oldImportPath.replace(/^@\/assets\//, ""));
      if (existsSync(oldAbsPath)) {
        await unlink(oldAbsPath);
      }
    }
  }
}

function buildGeneratedModule(finalEntries) {
  const lines = [];
  lines.push("// GENERATED by scripts/optimize-images.mjs — do not edit.");
  lines.push("");
  for (const e of finalEntries) {
    for (const v of e.variants) {
      lines.push(`import ${v.importId} from "${v.path}";`);
    }
  }
  lines.push("");
  lines.push(
    "export type ImageSet = { src: string; srcSet: string; width: number; height: number };",
  );
  lines.push("");
  for (const e of finalEntries) {
    const srcSet = e.variants.map((v) => `\${${v.importId}} ${v.width}w`).join(", ");
    const largest = e.variants[e.variants.length - 1];
    lines.push(`export const ${e.varName}: ImageSet = {`);
    lines.push(`  src: ${largest.importId},`);
    lines.push(`  srcSet: \`${srcSet}\`,`);
    lines.push(`  width: ${e.width},`);
    lines.push(`  height: ${e.height},`);
    lines.push(`};`);
  }
  lines.push("");
  return lines.join("\n");
}

/**
 * Merges this run's results into the previously-generated entries. Matches
 * on varName — the identity of a single image slot — so replacing one image
 * in a folder never disturbs sibling images that happen to share the folder.
 * A varName that already existed is replaced in place (keeping its original
 * position in the file); a brand-new varName is appended at the end.
 */
function mergeEntries(existing, results) {
  const touchedVarNames = new Set(results.map((r) => r.entry.varName));
  const newByVarName = new Map(
    results.map((r) => [
      r.entry.varName,
      {
        varName: r.entry.varName,
        variants: r.variants.map((v) => ({
          importId: v.importId,
          width: v.width,
          path: toImportSpecifier(v.outPath),
        })),
        width: r.srcWidth,
        height: r.srcHeight,
      },
    ]),
  );

  const finalEntries = [];
  const insertedVarNames = new Set();

  for (const exp of existing.exports) {
    if (touchedVarNames.has(exp.varName)) {
      finalEntries.push(newByVarName.get(exp.varName));
      insertedVarNames.add(exp.varName);
      continue;
    }
    finalEntries.push({
      varName: exp.varName,
      variants: exp.variants.map((v) => ({
        importId: v.importId,
        width: v.width,
        path: existing.imports.get(v.importId),
      })),
      width: exp.width,
      height: exp.height,
    });
  }

  // Brand-new varNames (no prior entry) are appended, in this run's order.
  for (const r of results) {
    if (!insertedVarNames.has(r.entry.varName)) {
      finalEntries.push(newByVarName.get(r.entry.varName));
      insertedVarNames.add(r.entry.varName);
    }
  }

  return finalEntries;
}

async function rewriteSourceFile(sourceFile, varNames) {
  const abs = path.join(ROOT, sourceFile);
  const content = await readFile(abs, "utf8");
  const lines = content.split("\n");
  const varSet = new Set(varNames);

  const genImportRe = /^import\s*\{\s*([^}]*)\s*\}\s*from\s*"@\/assets\/generated\/images";$/;
  let existingImportLineIndex = -1;
  let existingNames = [];
  lines.forEach((line, i) => {
    const m = line.match(genImportRe);
    if (m) {
      existingImportLineIndex = i;
      existingNames = m[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  });

  const mergedNames = [...existingNames.filter((n) => !varSet.has(n)), ...varNames];
  const mergedImportLine = `import { ${mergedNames.join(", ")} } from "@/assets/generated/images";`;

  const outLines = [];
  let insertedHere = existingImportLineIndex !== -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === existingImportLineIndex) {
      outLines.push(mergedImportLine);
      continue;
    }
    const m = line.match(/^import\s+(\w+)\s+from\s+"@\/assets\/[^"]+";$/);
    if (m && varSet.has(m[1])) {
      if (!insertedHere) {
        outLines.push(mergedImportLine);
        insertedHere = true;
      }
      continue; // drop the raw import line
    }
    outLines.push(line);
  }

  // Dropping raw import lines can leave two blank lines butted together
  // (one that sandwiched the dropped block on each side) — collapse runs of
  // blank lines back down to one.
  const collapsed = outLines.filter((line, i) => line.trim() !== "" || outLines[i - 1]?.trim() !== "");

  await writeFile(abs, collapsed.join("\n"), "utf8");
}

async function main() {
  let entries = await collectImageImports();
  console.log(`Found ${entries.length} tracked image imports across ${SOURCE_FILES.length} files.`);
  const limit = process.env.OPTIMIZE_LIMIT ? Number(process.env.OPTIMIZE_LIMIT) : undefined;
  if (limit) entries = entries.slice(0, limit);

  await mkdir(GENERATED_DIR, { recursive: true });

  const existing = await parseExistingGenerated();

  const results = [];
  let totalOriginal = 0;
  let totalNew = 0;
  for (const entry of entries) {
    if (!existsSync(entry.absPath)) {
      console.warn(`  ! missing source, skipping: ${entry.absPath}`);
      continue;
    }
    const res = await encodeVariants(entry);
    results.push(res);
    totalOriginal += res.originalBytes;
    totalNew += res.newBytes;
    process.stdout.write(".");
  }
  console.log("");

  if (results.length === 0) {
    console.log("Nothing to encode — no raw @/assets imports found. Generated file left as-is.");
    return;
  }

  // Clean up .webp variants this run's re-encoded images superseded.
  await cleanupStaleVariants(existing, results);

  // Delete the new raw source images only after all encodes succeeded.
  for (const entry of entries) {
    if (existsSync(entry.absPath)) {
      await unlink(entry.absPath);
    }
  }

  const finalEntries = mergeEntries(existing, results);
  const moduleSrc = buildGeneratedModule(finalEntries);
  await writeFile(GENERATED_FILE, moduleSrc, "utf8");

  // Group var names by source file for the rewrite step.
  const bySourceFile = new Map();
  for (const entry of entries) {
    if (!bySourceFile.has(entry.sourceFile)) bySourceFile.set(entry.sourceFile, []);
    bySourceFile.get(entry.sourceFile).push(entry.varName);
  }
  for (const [sourceFile, varNames] of bySourceFile) {
    await rewriteSourceFile(sourceFile, varNames);
  }

  console.log("");
  console.log("=== Result ===");
  console.log(`Original: ${(totalOriginal / 1048576).toFixed(1)} MB`);
  console.log(`New:      ${(totalNew / 1048576).toFixed(1)} MB`);
  console.log(`Reduction: ${(100 - (totalNew / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`Generated module: ${path.relative(ROOT, GENERATED_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
