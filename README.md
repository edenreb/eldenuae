# Elden

Turnkey fitout marketing site — Astro 7 + Tailwind v4 + GSAP, static output served by a Cloudflare Worker.

## Structure

```text
src/
├── assets/            # project photography + client logos (processed by Astro's image pipeline)
├── content/
│   ├── projects/      # project entries (frontmatter schema in content.config.ts)
│   └── journal/       # MDX journal posts
├── components/        # Hero, FrameSequence, SelectedWork, ClientWall, Testimonials, Footer, …
├── layouts/Base.astro # shared shell: header, mobile menu, footer, preloader, page transitions
├── pages/             # routes: /, /projects, /projects/[id], /about, /contact, /careers, /journal, /journal/[id]
├── scripts/           # motion.ts (GSAP/Lenis), enquiry.ts (contact form, shared with worker.ts), dropdown.ts, mosaic.ts
├── styles/global.css  # design tokens (@theme) + base layer
└── facts.ts           # company numbers quoted across the site
public/sequences/      # scroll-scrub frames for FrameSequence (tools/video-to-frames.mjs)
worker.ts              # Cloudflare Worker: static assets + POST /api/contact via Resend
```

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`        | Dev server at `localhost:4321`                |
| `npm run build`       | Build to `./dist/` (static)                   |
| `npm run preview`      | Serve the production build locally            |

## Deploying to Cloudflare Workers

The repo is connected to a Cloudflare Worker (Workers Builds). `wrangler.jsonc` serves `dist/` as static assets and routes `POST /api/contact` to `worker.ts`, which emails enquiries through Resend.

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Build variable:** `NODE_VERSION` = `22`
- **Secret (Settings → Variables and Secrets):** `RESEND_API_KEY`

## Content

Every project and journal entry is placeholder copy, flagged with a `PLACEHOLDER COPY` comment in its frontmatter/body — see [Open items for Elden] in the design plan for what needs replacing before launch (real project facts, testimonial quotes, journal articles, contact details).
