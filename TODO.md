# Elden Luxury Redesign TODO

This is the implementation backlog for turning the current site from a polished template into a credible luxury fit-out website.

## Critical

- [ ] Replace the homepage motion stack with a single authoritative hero and one secondary scroll story.
  - Files: `src/components/HeroSchematic.tsx`, `src/routes/index.tsx`, `src/components/CustomCursor.tsx`
  - Why: The current homepage uses too many premium-web clichés at once: sticky 400vh hero, blueprint grid, marquee strips, horizontal process ribbon, and custom cursor.
  - Acceptance:
    - Hero feels architectural, not cinematic-demo.
    - Only one major scroll interaction remains on the homepage.
    - Custom cursor is removed or reduced to a subtle optional desktop-only enhancement.

- [ ] Rebuild the project case study model so each project reads like a real luxury fit-out submission.
  - Files: `src/lib/projects.ts`, `src/routes/projects.index.tsx`, `src/routes/projects.$slug.tsx`
  - Why: Current case studies are formatted like portfolio thumbnails with generic summaries, not premium project narratives.
  - Acceptance:
    - Each project includes brief, constraints, scope, materials, execution, outcome, and 3 to 5 curated images.
    - Homepage featured projects are manually curated, not `slice(0, 4)`.
    - Detail pages have a stronger hierarchy than hero -> facts -> paragraphs -> gallery.

- [ ] Fix the blog/journal system or remove it until it is real.
  - Files: `src/lib/posts.ts`, `src/routes/blogs.tsx`, `src/routes/blogs.$slug.tsx`
  - Why: Duplicate slugs, duplicate covers, and placeholder editorial copy make the brand look unfinished.
  - Acceptance:
    - Every post has a unique slug.
    - Every post has unique content and an intentional cover.
    - Dates are stored and emitted in valid ISO format for SEO.
    - If no real editorial workflow exists, the journal is removed from nav until it does.

- [ ] Replace the current palette and typography with a more architectural system.
  - Files: `src/styles.css`, `src/routes/__root.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`
  - Why: The blue/green palette and Fraunces/Inter pairing read more SaaS/editorial than luxury architecture.
  - Acceptance:
    - Palette is quieter and more neutral with one restrained accent.
    - Typography feels premium, sober, and precise.
    - Headings, labels, and body copy use a stricter type hierarchy.

- [ ] Remove or drastically simplify the floating glass header and pill-button system.
  - Files: `src/components/SiteHeader.tsx`, `src/routes/__root.tsx`
  - Why: The current header looks like a modern app shell, not a bespoke studio navigation.
  - Acceptance:
    - Header feels lighter, more editorial, and less rounded.
    - Mobile menu is cleaner and more intentional.
    - Active/hover states are subtle, not button-like.

- [ ] Fix the broken token usage on the homepage.
  - Files: `src/routes/index.tsx`, `src/styles.css`
  - Why: `bg-elden-stone/40` is referenced but no `elden-stone` token exists.
  - Acceptance:
    - No undefined design tokens remain in class names.
    - CI/build continues to pass after token cleanup.

## Highest Impact

- [ ] Turn the homepage into a curated narrative sequence.
  - Files: `src/routes/index.tsx`
  - Suggested structure:
    1. Hero with a single strong statement and one supporting proof line.
    2. Trust strip with clients, certifications, and scale metrics.
    3. Curated featured projects.
    4. One process or methodology section.
    5. One proof section for fabrication / MEP / delivery.
    6. Final CTA.
  - Acceptance:
    - The homepage reads like an architecture studio, not a start-up landing page.
    - Sections have clearer pacing and less repetitive motion.

- [ ] Replace project cards with a more premium gallery system.
  - Files: `src/routes/projects.index.tsx`
  - Why: Current cards are standard dark overlays with generic metadata.
  - Acceptance:
    - At least one editorial card layout variation.
    - Better use of whitespace, scale, and image cropping.
    - Hover state feels controlled, not flashy.

- [ ] Upgrade each project detail page with richer proof.
  - Files: `src/routes/projects.$slug.tsx`
  - Add:
    - Challenge / Brief
    - Design intent
    - Technical execution
    - Materials
    - Metrics / timeline / delivery notes
    - Related projects selected by narrative, not just order
  - Acceptance:
    - Detail pages feel like case studies from a top-tier studio.

- [ ] Build a real services architecture, not a list of services.
  - Files: `src/routes/services.tsx`
  - Why: The current page is brochure copy with six numbered rows.
  - Acceptance:
    - Services are grouped by capability or phase.
    - Each service shows deliverables and proof.
    - The page demonstrates how Elden works, not just what it offers.

- [ ] Add credibility content to the about page.
  - Files: `src/routes/about.tsx`
  - Add:
    - Studio story
    - Leadership / team / workshop proof
    - Process and delivery standards
    - Client confidence signals
  - Acceptance:
    - About page establishes authority, scale, and seriousness.

- [ ] Replace the contact page with a premium enquiry flow.
  - Files: `src/routes/contact.tsx`
  - Add:
    - Project type
    - Budget range
    - Location
    - Timeline
    - Short brief form
    - Consultation framing
  - Acceptance:
    - The page feels like a high-end studio intake, not a utility page.

- [ ] Rework the footer into a trust and navigation block.
  - Files: `src/components/SiteFooter.tsx`
  - Why: Current footer is visually strong but still generic.
  - Acceptance:
    - Includes licensing / service area / credibility markers.
    - Better hierarchy between CTA, studio details, and sitemap.
    - Avoids decorative glow that feels synthetic.

## Important

- [ ] Reduce repeated reveal animations.
  - Files: `src/components/Reveal.tsx`, all route files using `Reveal`
  - Why: Everything animating on scroll makes the site feel overdesigned.
  - Acceptance:
    - Reveal is used sparingly, not as the default for every block.
    - Motion durations and delays are harmonized across the site.

- [ ] Replace marquee patterns with more restrained motion.
  - Files: `src/routes/index.tsx`, `src/styles.css`
  - Why: Repeating marquees are common on template sites and overused in luxury-web work.
  - Acceptance:
    - If motion remains, it has a quieter and more editorial character.
    - No section depends on looping text for visual interest.

- [ ] Audit image cropping and aspect ratios per content type.
  - Files: `src/routes/index.tsx`, `src/routes/projects.index.tsx`, `src/routes/projects.$slug.tsx`, `src/routes/about.tsx`, `src/routes/blogs.$slug.tsx`
  - Why: Current aspect ratios are functional, but not art-directed.
  - Acceptance:
    - Hero, project, and gallery images each have a deliberate format strategy.
    - Important content is not lost to arbitrary cropping.

- [ ] Compress and rationalize the asset library.
  - Files: `src/assets/**`, `src/lib/projects.ts`
  - Why: Build output shows very large images, including multi-megabyte assets.
  - Acceptance:
    - Large unused or redundant assets are removed.
    - Hero and gallery images are compressed and resized appropriately.
    - Build payload is materially lower.

- [ ] Add reduced-motion handling and accessibility polish.
  - Files: `src/components/Reveal.tsx`, `src/components/HeroSchematic.tsx`, `src/components/CustomCursor.tsx`, `src/routes/*`
  - Acceptance:
    - Motion can be reduced without breaking the experience.
    - Keyboard navigation and focus states are clear.
    - Custom cursor does not interfere with accessibility.

- [ ] Clean up design-system token naming and usage.
  - Files: `src/styles.css`
  - Why: The system is close, but not disciplined enough.
  - Acceptance:
    - All brand tokens are explicit and used consistently.
    - Unused or misleading tokens are removed.

## Nice To Have

- [ ] Make the 404 and error pages feel like part of the brand system.
  - Files: `src/routes/__root.tsx`, `src/lib/error-page.ts`

- [ ] Consolidate repeated page-section patterns into reusable layout primitives.
  - Files: `src/components/*`, `src/routes/*`

- [ ] Add structured data for projects and organization.
  - Files: `src/routes/__root.tsx`, `src/routes/projects.$slug.tsx`, `src/routes/blogs.$slug.tsx`

- [ ] Remove dead or placeholder references in documentation.
  - Files: `README.md`
  - Why: The README still references a route that does not exist and should match the actual structure.

- [ ] Revisit mobile nav ergonomics and sticky behavior after the visual system is simplified.
  - Files: `src/components/SiteHeader.tsx`

## Suggested Execution Order

1. Fix data integrity and obvious credibility issues: blog duplicates, undefined tokens, README drift.
2. Rework the homepage motion and visual hierarchy.
3. Rebuild project and services pages for premium case-study depth.
4. Simplify navigation, footer, and contact flow.
5. Compress assets, trim motion, and finish accessibility/performance polish.

## Definition Of Done

- The site reads as a bespoke luxury fit-out studio, not a motion-heavy template.
- Every major page has a clear role in the sales journey.
- The content is specific, credible, and difficult to fake.
- Motion is restrained and intentional.
- Build and lint continue to pass.
