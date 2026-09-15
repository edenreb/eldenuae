// Row layout for the /projects mosaic. Each breakpoint repeats a sequence of
// rows; a row is a height (vw) and column spans that add up to 24. Used at
// build time for the full list and again in the browser after every filter,
// so both always agree.

type Row = { h: number; spans: number[] };

export const LAYOUTS = {
  sm: [
    { h: 62, spans: [24] },
    { h: 46, spans: [12, 12] },
    { h: 52, spans: [14, 10] },
  ],
  md: [
    { h: 38, spans: [14, 10] },
    { h: 28, spans: [8, 8, 8] },
    { h: 34, spans: [10, 14] },
  ],
  lg: [
    { h: 28, spans: [10, 7, 7] },
    { h: 20, spans: [6, 5, 7, 6] },
    { h: 24, spans: [7, 9, 8] },
  ],
} satisfies Record<string, Row[]>;

export type Cell = { span: number; h: number };

export function mosaic(count: number, rows: Row[]): Cell[] {
  const cells: Cell[] = [];
  for (let r = 0; cells.length < count; r++) {
    const row = rows[r % rows.length];
    const left = count - cells.length;
    let take = row.spans.length;
    // Never strand a single project on the final row: pull it up into this one.
    if (left - take === 1) take += 1;
    take = Math.min(take, left);

    // A row with more or fewer items than its template is rescaled so it
    // still spans the full width. The last cell absorbs rounding.
    const base = Array.from({ length: take }, (_, i) => row.spans[i % row.spans.length]);
    const sum = base.reduce((a, b) => a + b, 0);
    let used = 0;
    base.forEach((s, i) => {
      const span = i === take - 1 ? 24 - used : Math.max(1, Math.round((s / sum) * 24));
      used += span;
      cells.push({ span, h: row.h });
    });
  }
  return cells;
}

/** Inline custom properties per card (all three breakpoints) for `count` cards. */
export function cellStyles(count: number): string[] {
  const bps = Object.keys(LAYOUTS) as (keyof typeof LAYOUTS)[];
  const grids = bps.map((bp) => mosaic(count, LAYOUTS[bp]));
  return Array.from({ length: count }, (_, i) =>
    bps.map((bp, b) => `--span-${bp}:${grids[b][i].span};--h-${bp}:${grids[b][i].h}`).join(";"),
  );
}
