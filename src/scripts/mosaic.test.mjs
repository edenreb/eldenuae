// Invariants for the /projects mosaic. Run: node --experimental-strip-types src/scripts/mosaic.test.mjs
import assert from "node:assert";
import { LAYOUTS, mosaic } from "./mosaic.ts";

for (const [bp, rows] of Object.entries(LAYOUTS)) {
  for (const row of rows) assert.equal(row.spans.reduce((a, b) => a + b, 0), 24, `${bp}: template must sum to 24`);

  for (let n = 1; n <= 40; n++) {
    const cells = mosaic(n, rows);
    assert.equal(cells.length, n, `${bp} n=${n}: one cell per card`);

    // Every row lands exactly on 24 columns — no holes, no overflow.
    let acc = 0;
    let lastRow = 0;
    cells.forEach((cell) => {
      assert(cell.span >= 1, `${bp} n=${n}: empty span`);
      acc += cell.span;
      lastRow++;
      assert(acc <= 24, `${bp} n=${n}: row overflows`);
      if (acc === 24) acc = 0;
      if (acc === 0 && cell !== cells.at(-1)) lastRow = 0;
    });
    assert.equal(acc, 0, `${bp} n=${n}: last row leaves a gap`);

    // A lone card on the final row only where the template itself has one.
    if (n > 1 && !rows.some((r) => r.spans.length === 1)) assert(lastRow >= 2, `${bp} n=${n}: stranded card`);
  }
}

console.log("mosaic ok");
