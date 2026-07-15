import { createFileRoute } from "@tanstack/react-router";
import { Reveal, ParallaxImage } from "@/components/Reveal";
import teamImage from "@/assets/hero-frame-4.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Elden — Interior Design & Fit-out, Dubai" },
      {
        name: "description",
        content:
          "ELDEN is a well established company in the Interior Design, Fit-out and MEP field, delivering internal and external services across the UAE since 2016.",
      },
      { property: "og:title", content: "About Elden" },
      {
        property: "og:description",
        content:
          "A team of engineers, craftsmen and designers building enduring interiors across the UAE.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Name</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-[7.5vw] lg:text-[7rem]">
              A prominent name in{" "}
              <span className="italic text-elden-blue">Interior Design, Fit-out & MEP</span> across
              the UAE.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ELDEN is a well-established interior fit-out company offering a wide range of
              internal and external services. Since 2016 we've delivered projects across
              hospitality, retail, commercial, leisure and cultural sectors from our home in Al
              Quoz, Dubai.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ParallaxImage
            src={teamImage}
            alt="Elden delivered lobby interior"
            className="aspect-[21/9] rounded-sm bg-muted"
          />
        </div>
      </section>

      <section className="marble-surface py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1fr_1.4fr] md:px-10">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Skills</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
                Engineers, craftsmen, designers, builders.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              <p>
                A qualified team of skilled personnel bringing together a wealth of experience
                with the main aim of setting impeccable standards in business guidelines — to
                accomplish the highest levels of integrity, performance and achievement.
              </p>
              <p>
                We keep design, joinery and MEP under one roof so a single project manager can
                answer for the whole build. That's why our timelines hold, our budgets hold, and
                our finishes read as one continuous idea instead of a stack of subcontracts.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            {[
              ["Quality", "Every detail signed off by trade leads and project management."],
              ["Innovation", "Continuous R&D into materials, joinery techniques and MEP systems."],
              ["Sustainability", "Energy-efficient design, BMS integration, lifecycle thinking."],
              ["Delivery", "On-time, on-budget handover — with a maintenance contract to match."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="border-t border-border pt-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">
                    Value 0{i + 1}
                  </p>
                  <h3 className="mt-4 font-display text-3xl">{t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
