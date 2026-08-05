# Testimonial portraits

Every card in `src/components/Testimonials.tsx` currently shows the same
generic placeholder icon (`public/testimonial-avatars/placeholder.png`, a public-domain
Wikimedia Commons silhouette) — `src/lib/testimonials.ts` has no per-person
`image` field right now.

To swap in real portraits:

1. Drop raw source images here, e.g. `kevin-teixeira.jpg`.
2. Add an `image: ImageSet` field back to the `Testimonial` interface in
   `src/lib/testimonials.ts`, import the new source, and reference it per entry:
   ```ts
   import kevinTeixeira from "@/assets/testimonials/kevin-teixeira.jpg";
   ```
3. Confirm with the user, then run `node scripts/optimize-images.mjs`
   (`src/lib/testimonials.ts` is already listed in its `SOURCE_FILES`).
4. In `TestimonialCard` (`src/components/Testimonials.tsx`), swap the shared
   `<Img image={placeholderAvatar} .../>` for `<Img image={testimonial.image} .../>`.

The optimize script re-encodes the raw image to responsive WebP variants,
rewrites the import into `src/assets/generated/images.ts`, and **deletes the
raw source file** — it is destructive by design. Do not run it casually.
