import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/blogs")({
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
    ],
  }),
  component: BlogsPage,
});

const posts = [
  {
    date: "23 Apr 2022",
    tag: "Site Practice",
    title: "Site Safety Induction",
    excerpt:
      "At Elden, employee welfare starts with safety. As a specialist in interior fit-out, Elden undertakes projects across various sectors — each requiring its own induction protocol before a single tool leaves the store.",
  },
  {
    date: "15 Mar 2024",
    tag: "Joinery",
    title: "Behind the scenes of a book-matched marble bar",
    excerpt:
      "How a single 3.6m slab of emerald marble travels from quarry to cafe — templated, cut, wet-polished and re-joined in a way you can never quite see.",
  },
  {
    date: "02 Nov 2023",
    tag: "MEP",
    title: "Designing HVAC that you feel but never hear",
    excerpt:
      "Silent air handling in hospitality environments requires more than good equipment. A note on plenum design, cross-talk and where our engineers spend their obsessive hours.",
  },
  {
    date: "10 Sep 2023",
    tag: "Craft",
    title: "Six materials, six sectors, one language",
    excerpt:
      "How we build a material palette that can travel from a gym to a fine-dining room and still feel like the same studio built both.",
  },
];

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
              <Reveal key={p.title} delay={i * 0.04}>
                <article className="grid gap-6 border-b border-border/70 py-14 md:grid-cols-[180px_1fr]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">
                      {p.tag}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{p.date}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl leading-tight md:text-5xl">{p.title}</h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {p.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
