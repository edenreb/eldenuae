# Hero parallax layers

Drop **three** files in this folder. The hero upgrades itself automatically the
moment all three are present — no code change needed. Until then it renders the
single-photograph fallback, so the site is never broken.

## Files (exact names)

| File          | Plane      | Scroll travel | Contents                                    |
|---------------|------------|---------------|---------------------------------------------|
| `layer-1.webp`| farthest   | most (70%)    | Back wall, window, far room                 |
| `layer-2.webp`| midground  | 55%           | Mid furniture, joinery, partitions          |
| `layer-4.webp`| nearest    | least (10%)   | Foreground objects the camera passes closest|

`layer-3` is intentionally absent — that slot is the "Turnkey fitout." headline,
generated in code so it stays live text (selectable, translatable, and readable
by screen readers rather than baked into an image).

## Requirements

- **Format:** WebP or PNG **with alpha**. Layers 2 and 4 must be cut out — if
  they are opaque rectangles they will simply hide the layers behind them and
  there is no parallax.
- **Identical canvas size for all three.** This is the one that breaks things:
  the layers are stacked and registered to the same box, so they must be
  exported from the same document at the same dimensions. Do not crop
  individually.
- **Dimensions:** 2400×1600 (3:2) or wider. Landscape.
- **Colour:** untouched photography. No grading, no filters — DESIGN.md's rule
  is that all colour on the site comes from the photographs themselves.
- **Headroom:** keep the lower third of layers 2 and 4 free of critical detail;
  the headline and its legibility scrim sit there.

## Why cut-outs and not flat photos

A parallax needs genuine occlusion — near planes must move across far ones and
hide parts of them. Three flat copies of the same photo at different speeds just
looks like a smeared image. If cutting these out is not practical, say so and I
will build the depth from scaled crops instead, which is weaker but needs no new
assets.
