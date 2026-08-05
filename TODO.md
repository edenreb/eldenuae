# Elden Site TODO

Implementation backlog. Every item below was verified against the current codebase (35 projects in `src/lib/projects.ts`, 5 posts in `src/blogs/`, `npx tsc --noEmit` clean at time of writing).

Format: each item lists the files it touches, why it matters, and what "done" means.

## Critical

- [ ] Remove or rewrite the duplicated journal post.
  - Files: `src/blogs/mep-insights.ts`, `src/blogs/site-safety-induction.ts`, `src/lib/posts.ts`
  - Why: `mep-insights` and `site-safety-induction` are the same article. Identical excerpt, identical cover URL, identical date (`23 Apr 2022`), identical `readingMinutes`, and the same body copy about safety inductions — only the title and slug differ. A post titled "MEP INsights" whose content is a safety induction briefing reads as unfinished, and two URLs serving the same text is duplicate content for crawlers.
  - Acceptance:
    - No two posts share an excerpt, cover, or body.
    - `mep-insights` either carries real MEP editorial content or is deleted along with its entry in `src/lib/posts.ts`.
    - Title casing is corrected ("MEP Insights", not "MEP INsights") if the post is kept.

- [ ] Store journal dates in ISO 8601.
  - Files: `src/lib/posts.ts`, `src/blogs/*.ts`, `src/routes/blogs.$slug.tsx`, `src/components/BlogPost.tsx`
  - Why: `date` is a human string (`"15 Mar 2024"`) and is passed straight into `article:published_time`, which expects a machine-readable timestamp. Sorting posts by date is also impossible in the current shape.
  - Acceptance:
    - `Post.date` holds ISO 8601; display formatting happens at render.
    - `article:published_time` emits the ISO value.
    - Rendered dates use `<time dateTime="…">`.
    - Posts can be sorted newest-first from the data alone.

- [ ] Emit absolute URLs in Open Graph, Twitter and canonical tags.
  - Files: `src/routes/__root.tsx`, `src/routes/blogs.$slug.tsx`, `src/routes/blogs.index.tsx`, `src/routes/projects.$slug.tsx`
  - Why: `og:url` and `rel="canonical"` are set to relative paths (`/blogs`, `/blogs/${slug}`), and `og:image` is set to a bundled asset path. Social crawlers and search engines require absolute URLs — as written, no share preview will resolve an image and the canonical tags are ambiguous.
  - Acceptance:
    - A single site-origin constant exists and is used everywhere.
    - `og:url`, `og:image`, `twitter:image` and canonical hrefs are fully qualified.
    - A share-preview debugger renders a card with an image for the home page, one project and one article.

- [ ] Replace hotlinked Unsplash covers with real project photography.
  - Files: `src/blogs/*.ts`, `src/lib/posts.ts`, `src/components/BlogPost.tsx`
  - Why: All five covers are external Unsplash URLs. They bypass the WebP/`srcSet` pipeline entirely, add a runtime dependency on a third-party CDN, and put generic stock imagery on the site of a company with 35 photographed projects. Two posts also point at the same Unsplash photo.
  - Acceptance:
    - `Post.cover` is typed `ImageSet`, not `string`.
    - Covers are sourced from `src/assets` via `@/assets/generated/images` and rendered with `<Img>`.
    - No external image URLs remain in `src/`.

## Highest Impact

- [ ] Make homepage-featured curation explicit instead of array-order.
  - Files: `src/lib/projects.ts`, `src/routes/index.tsx`
  - Why: The hero ring now uses an explicit `hero` flag (see Completed Tasks), but `FeaturedProjects` on the homepage still shows `projects.slice(0, 4)` — whichever four entries sit first in the array. Same problem the hero had, one section over.
  - Acceptance:
    - Featured selection is explicit (a `featured` flag or an ordered slug list), not positional.
    - Changing display order does not require reordering the data array.

- [ ] Fill out thin project entries or unpublish them.
  - Files: `src/lib/projects.ts`
  - Why: 30 of 35 projects have a single-sentence `narrative`, and 6 have only one gallery image. Several are placeholder-grade — e.g. "A park clubhouse fit-out in Jumeira, Dubai." next to entries that carry three real paragraphs about brief, execution and MEP coordination. The gap makes the strong entries look accidental.
  - Acceptance:
    - Every published project has at least three narrative paragraphs covering brief, execution and outcome.
    - Every published project has at least three gallery images.
    - Projects that cannot meet that bar are removed from the array (and their assets deleted) rather than shipped thin.

- [ ] Give the contact page a working enquiry path.
  - Files: `src/routes/contact.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/routes/index.tsx`, `src/components/HeroCurved.tsx`
  - Why: Every call to action on the site — "Start a project" in the header and footer, "Start a conversation" on the home page, "Book a meeting" in the hero — lands on a page containing an address, a phone number, an email link and a Google Maps embed. There is no form and no submission handler anywhere in the codebase.
  - Acceptance:
    - Either an enquiry form exists with a real submission target (TanStack Start server function or email endpoint), field validation, and explicit success and failure states —
    - or the CTAs are relabelled to match what the page actually offers ("Call the studio", "Email us"), with no button implying a form that does not exist.
    - No submission path silently discards input.

- [ ] Fix stale hardcoded counts in page copy.
  - Files: `src/routes/projects.index.tsx`, `src/routes/index.tsx`
  - Why: The projects index reads "Ten projects, six sectors, one standard." while rendering 35 projects directly below it. The homepage stat block ("80+ fit-out projects", "6 sectors") is hand-maintained and will drift the same way.
  - Acceptance:
    - Counts shown next to rendered data are derived from that data.
    - Any figure that cannot be derived (e.g. total projects delivered off-site) is clearly a claim, not a description of what's on screen.

## Important

- [ ] Bring `README.md` back in line with the codebase.
  - Files: `README.md`
  - Why: The README lists Radix UI + shadcn/ui, React Hook Form, Zod and Recharts as part of the stack — all removed in `3c4d752`. Its structure tree references `src/components/ui/`, `projects.tsx` and `blogs.tsx`, none of which exist (the routes are `projects.index.tsx` and `blogs.index.tsx`), and its route table claims an enquiry form.
  - Acceptance:
    - Stack section matches `package.json`.
    - Structure tree and route table match `src/routes/`.
    - No dependency or file is named that isn't present.

- [ ] Add `robots.txt` and a sitemap.
  - Files: `public/`, `src/routes/`, `src/lib/projects.ts`, `src/lib/posts.ts`
  - Why: The site has roughly 45 indexable URLs (7 static routes, 35 projects, 5 articles) and ships neither a robots file nor a sitemap. `public/` contains only `icon.png` and `logo.svg`.
  - Acceptance:
    - `robots.txt` is served and points at the sitemap.
    - The sitemap is generated from `projects` and `posts` so new content appears without a manual edit.
    - Every project and article slug appears exactly once with an absolute URL.

- [ ] Add structured data for the organisation, projects and articles.
  - Files: `src/routes/__root.tsx`, `src/routes/projects.$slug.tsx`, `src/routes/blogs.$slug.tsx`, `src/routes/contact.tsx`
  - Why: A Dubai fit-out contractor with a physical studio address, phone number and map benefits directly from `LocalBusiness` markup; project and article pages currently expose nothing machine-readable beyond basic meta tags.
  - Acceptance:
    - `Organization`/`LocalBusiness` JSON-LD on the root, with the Al Quoz address and phone that already appear on `/contact`.
    - Per-project and per-article JSON-LD driven by the existing data.
    - Output validates in a structured-data testing tool.

- [ ] Settle on one package manager.
  - Files: `bun.lock`, `package-lock.json`, `bunfig.toml`, `README.md`, `CLAUDE.md`
  - Why: Both lockfiles are committed and they drift independently — `package-lock.json` was last written after `bun.lock`. Two lockfiles means two dependency resolutions and no single answer to "what is actually installed in CI".
  - Acceptance:
    - One lockfile remains in the repo; the other is deleted.
    - `bunfig.toml` is kept only if bun is the chosen manager (its `minimumReleaseAge` supply-chain guard is worth keeping if so).
    - README and CLAUDE.md document the single supported install command.

- [ ] Delete the orphaned Lovable asset descriptor.
  - Files: `src/assets/elden-logo.svg.asset.json`
  - Why: It is a JSON metadata stub pointing at a remotely hosted `elden-logo.svg`. Nothing in `src/` imports it, and the logo actually rendered by `SiteHeader` is `public/logo.svg`.
  - Acceptance:
    - The file is removed and the header still renders its logo.

- [ ] Clean up dead markup and vestigial state in the header.
  - Files: `src/components/SiteHeader.tsx`
  - Why: The header contains an empty `<span className="hidden sm:flex flex-col leading-none">`, a backdrop layer with `transition-opacity duration-700` and a hardcoded `style={{ opacity: 1 }}`, and `transition-colors duration-700` on an element whose colours never change. This is the residue of a scroll-state header that no longer has state.
  - Acceptance:
    - Empty elements are removed.
    - Transitions either drive a real state change or are deleted.
    - The mobile menu button and panel behave identically after the cleanup.

- [ ] Let the toolchain see unused code.
  - Files: `tsconfig.json`, `eslint.config.js`
  - Why: `noUnusedLocals` and `noUnusedParameters` are `false` and `@typescript-eslint/no-unused-vars` is `"off"`, so dead imports, unused props and orphaned helpers accumulate silently. The recent dependency and component purge (`3c4d752`) had to be done by hand for exactly this reason.
  - Acceptance:
    - Unused locals and unused vars are reported at least at warning level.
    - Existing violations are cleared, not suppressed.
    - `npx tsc --noEmit` and `lint` stay clean.

- [ ] Accessibility pass on the custom cursor and hero carousel.
  - Files: `src/components/CustomCursor.tsx`, `src/components/HeroCurved.tsx`, `src/styles.css`
  - Why: The cursor hides the native pointer globally via `html.cursor-none-root` with `!important` and paints with `mix-blend-mode: difference` — if its cleanup ever fails to run, the page has no visible cursor at all. It also ignores `prefers-reduced-motion`, which `HeroCurved` respects. The hero ring is drag-only: its project links sit inside a pointer-capturing container with no keyboard or touch-swipe affordance, and no visible focus state.
  - Acceptance:
    - The cursor respects `prefers-reduced-motion` and degrades to the native pointer.
    - Hero project links are reachable and activatable by keyboard, with a visible focus ring.
    - Interactive elements across the site have discernible focus states.

## Nice To Have

- [ ] Brand the raw SSR error page.
  - Files: `src/lib/error-page.ts`, `src/routes/__root.tsx`
  - Why: `renderErrorPage()` returns a hand-written HTML string styled with system fonts and hex greys, while the React `errorComponent` and 404 use Fraunces and the Elden palette. A visitor hitting a catastrophic SSR failure sees a page from a different site. The constraint is real — this string renders when the React app cannot — so it must stay dependency-free.
  - Acceptance:
    - The static page uses the brand palette, wordmark and voice with inline CSS only.
    - It still renders with no JavaScript and no bundle.

- [ ] Derive reading time from post content.
  - Files: `src/lib/posts.ts`, `src/blogs/*.ts`, `src/components/BlogPost.tsx`
  - Why: `readingMinutes` is hand-authored per post and already inconsistent — the two duplicate articles both claim 5 minutes for the same body.
  - Acceptance:
    - Reading time is computed from the body word count.
    - The field is removed from the authored post data.

- [ ] Extract the repeated section scaffold into a primitive.
  - Files: `src/components/*`, `src/routes/*`
  - Why: Every route repeats the same block — `<Reveal>` wrapping an uppercase tracked eyebrow, then a `font-display` heading with `text-balance`, then muted body copy, inside `mx-auto max-w-[1600px] px-6 md:px-10`. The spacing values are re-typed each time and have drifted between pages.
  - Acceptance:
    - One section/eyebrow/heading primitive covers the common case.
    - Page-level spacing comes from the primitive rather than repeated utility strings.

- [ ] Prune assets when projects change.
  - Files: `src/assets/**`, `src/lib/projects.ts`, `scripts/optimize-images.mjs`
  - Why: Image variants are generated per source image and referenced only through `src/assets/generated/images.ts`. Removing a project from the array leaves its WebP variants in the repo with nothing to flag them. (Verified: there are currently no unused exports in the generated module — the goal is keeping it that way.)
  - Acceptance:
    - A check exists that reports generated exports no reachable module imports.
    - Removing a project is documented as a two-step operation: data entry plus assets.

## Completed Tasks

- [x] Make hero-ring curation explicit instead of array-order.
  - What changed: Added `src/lib/hero-projects.ts`, a single ordered `heroProjectSlugs: string[]` array (20 of the 35 project slugs, spread across all six sectors), and changed `HeroCurved` to build its ring by mapping that list through `getProjectBySlug` instead of `projects.slice(0, SLOTS)`. The ring's slice angle (`360 / slots.length`) is now derived from the list's length instead of a hardcoded `SLOTS = 24`, so the count can change without touching the component. (An earlier version of this fix used a `hero: true` flag scattered across 20 project objects in `projects.ts`; replaced with this dedicated list since a flag buried inside a 500-line file isn't actually reviewable as a curated set.)
  - Files: `src/lib/hero-projects.ts` (new), `src/components/HeroCurved.tsx`
  - Why: The hero previously showed whichever 24 projects happened to be first in the array — 11 of 35 projects could never appear, and reordering the array for any reason silently changed the hero. The homepage's featured-projects slice has the same problem and is tracked separately above.
  - Testing status: `npx tsc --noEmit`, lint, and `npm run build` all clean. Verified visually in the browser (dev server) — hero ring renders the curated photos with no console errors — and confirmed via SSR output that all 20 listed slugs render once each, in list order, at the correct `18deg` spacing (`360 / 20`).

## Suggested Execution Order

1. Content integrity first — duplicate post, thin projects, stale counts. These are visible to every visitor and cost nothing but editing.
2. SEO correctness — ISO dates, absolute URLs, robots/sitemap, structured data. Cheap, and everything after this compounds on it.
3. The contact gap — either build the enquiry flow or stop promising it.
4. Curation and image ownership — explicit featured selection, real journal covers.
5. Housekeeping — README, lockfile, dead markup, lint strictness, accessibility.

## Definition Of Done

- Nothing on the site claims something that isn't there: no form that doesn't submit, no count that doesn't match, no README dependency that isn't installed.
- Every published project and article is substantive enough to stand next to the strongest one.
- All indexable URLs are discoverable, canonical, and share correctly with an image.
- Images are served from the local WebP pipeline; no third-party image hosts.
- `npx tsc --noEmit`, `lint` and `build` pass, and the site is verified in the browser at mobile, tablet and desktop widths.
