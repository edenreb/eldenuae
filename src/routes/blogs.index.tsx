import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Journal — Elden Interior Design" },
      {
        name: "description",
        content: "News, site notes and reflections from the Elden studio in Dubai.",
      },
      { property: "og:title", content: "Journal — Elden" },
      {
        property: "og:description",
        content: "News, advancements, and reflections from the Elden studio.",
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
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The News</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-[7.5vw] lg:text-[7rem]">
              Notes from the{" "}
              <span className="italic text-elden-blue">studio floor.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="border-t border-border/70">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link
                  to="/blogs/$slug"
                  params={{ slug: p.slug }}
                  className="group grid gap-6 border-b border-border/70 py-14 md:grid-cols-[180px_1fr]"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">
                      {p.tag}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{p.date}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {p.readingMinutes} min read
                    </p>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl leading-tight md:text-5xl">
                      <span className="bg-gradient-to-r from-elden-blue to-elden-blue bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                        {p.title}
                      </span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {p.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-elden-blue transition group-hover:gap-3">
                      Read article <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
