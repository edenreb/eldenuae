import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Journal — Elden Interior Studio" },
      {
        name: "description",
        content:
          "Curated notes from the Elden studio floor — on materials, joinery, MEP and the delivered interiors we build in Dubai.",
      },
      { property: "og:title", content: "Journal — Elden" },
      {
        property: "og:description",
        content: "Curated notes from the Elden studio floor in Dubai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <div className="bg-background">
      <section className="relative border-b border-border/60 pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Journal</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[0.98] text-balance md:text-[6.5vw] lg:text-[6rem]">
              Notes from the studio floor.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              Occasional writing on the work — materials, joinery, MEP details
              and what the studio is currently making.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                to="/blogs/$slug"
                params={{ slug: p.slug }}
                className="group grid gap-8 border-b border-border/60 py-16 md:grid-cols-[200px_1fr]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-accent">{p.tag}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{p.date}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    {p.readingMinutes} min
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-3xl leading-tight md:text-5xl">
                    {p.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground md:text-lg">
                    {p.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] transition group-hover:gap-5">
                    Read the entry <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
