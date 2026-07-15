import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Elden Interior Fit-out, Joinery & MEP" },
      {
        name: "description",
        content:
          "Fit-out works, joinery, MEP design & execution, maintenance and bespoke furniture — delivered by Elden across the UAE.",
      },
      { property: "og:title", content: "Services — Elden" },
      {
        property: "og:description",
        content: "Interior fit-out, joinery, MEP, and maintenance under one roof.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    t: "Fit-out Works",
    d: "All types of interior fit-out for retail, hospitality, restaurants, commercial and leisure. With our group company Fusion we have delivered numerous fit-out projects across the UAE.",
  },
  {
    n: "02",
    t: "Joinery Works",
    d: "Bespoke furniture and joinery from our Al Quoz workshop — from reception desks and bar counters to full custom kits produced to shop-drawing tolerances.",
  },
  {
    n: "03",
    t: "MEP Design & Execution",
    d: "Energy-efficient design, load and duct calculations, coordinated shop drawings, execution and commissioning — all delivered in-house.",
  },
  {
    n: "04",
    t: "Building Management Systems",
    d: "Integrated BMS strategy: HVAC, lighting, blinds and AV consolidated into a single facilities interface, with circadian and scene programming.",
  },
  {
    n: "05",
    t: "Bespoke Furniture",
    d: "One-off pieces engineered for the space — sprung banquettes, sculptural lights, book-matched stone counters, hand-forged metalwork.",
  },
  {
    n: "06",
    t: "Maintenance",
    d: "Structured maintenance and aftercare contracts across MEP, joinery and finishes — keeping delivered spaces at handover-day standard.",
  },
];

function ServicesPage() {
  return (
    <div className="bg-background">
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Expertise</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-[7.5vw] lg:text-[7rem]">
              One studio.
              <br />
              <span className="italic text-elden-blue">Six disciplines.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Our expertise is spread across a wide range of services that facilitate efficient
              execution and timely completion — kept intentionally under one roof.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="border-t border-border/70">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04}>
                <article className="group grid items-start gap-8 border-b border-border/70 py-14 md:grid-cols-[120px_1fr_1fr]">
                  <div className="font-display text-5xl text-elden-blue md:text-6xl">{s.n}</div>
                  <h2 className="font-display text-4xl leading-tight md:text-6xl">{s.t}</h2>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {s.d}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
