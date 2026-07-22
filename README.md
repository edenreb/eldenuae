# Elden — Interior Fit-out, Joinery & MEP

A portfolio website for Elden Interior Design LLC, a Dubai-based fit-out, joinery and MEP company. Built with [TanStack Start](https://tanstack.com/start/latest) (React), TypeScript, Tailwind CSS v4, and Motion.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/latest) (React 19, file-based routing, SSR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + `tw-animate-css`
- **Animation:** Motion (Framer Motion API)
- **UI Primitives:** Radix UI + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Build:** Vite 8

## Getting Started

```bash
bun install     # or npm install
bun dev         # vite dev → http://localhost:5173
bun run build   # vite build
bun run preview # serve built output
```

## Project Structure

```
src/
├── assets/            # Project images, client logos
├── components/        # Shared React components (Header, Footer, Reveal, Hero)
│   └── ui/            # shadcn/ui primitives
├── lib/               # Data (projects.ts), utilities
├── routes/            # TanStack file-based routing
│   ├── __root.tsx     # Root layout (header, footer, providers)
│   ├── index.tsx      # Home page
│   ├── projects.tsx   # Project list
│   ├── projects.$slug.tsx  # Project detail
│   ├── about.tsx
│   ├── services.tsx
│   ├── blogs.tsx
│   ├── blogs.$slug.tsx
│   └── contact.tsx
├── router.tsx         # Router definition
├── routeTree.gen.ts   # Auto-generated route tree
├── server.ts          # TanStack Start server entry
├── start.ts           # App entry
└── styles.css         # Tailwind + brand tokens
```

## Pages

| Route       | Content                                        |
|-------------|------------------------------------------------|
| `/`         | Hero, client marquee, stats, featured projects |
| `/projects` | Full project portfolio grid                    |
| `/projects/:slug` | Single project detail with gallery      |
| `/services` | Service offerings                             |
| `/about`    | Company background & team                     |
| `/blogs`    | Journal / articles                            |
| `/contact`  | Enquiry form                                  |

## Brand Tokens

Defined in `src/styles.css` under the `:root` block:

- **Elden Green** — accent/CTAs
- **Elden Blue** — primary headings
- Marble, stone, charcoal, beige — supporting palette
