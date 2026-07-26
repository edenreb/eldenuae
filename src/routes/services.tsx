import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Capabilities — Elden Interior Studio, Dubai" },
      {
        name: "description",
        content:
          "Fit-out, joinery, MEP design and execution, BMS integration, bespoke furniture and aftercare — the four disciplines Elden holds under one roof in Dubai.",
      },
      { property: "og:title", content: "Capabilities — Elden" },
      {
        property: "og:description",
        content: "The four disciplines Elden holds in-house in Dubai.",
      },
    ],
  }),
  component: ServicesPage,
});

const capabilities = [
  {
    n: "01",
    t: "Fit-out",
    lead: "Turnkey interior fit-out for hospitality, retail, commercial and leisure — carried by our own site trades.",
    scope: [
      "Design coordination & value engineering",
      "Programme management & procurement",
      "Site supervision & QA/QC",
      "Snagging, commissioning and handover",
    ],
    proof:
      "120+ delivered projects across the UAE, from mall footprints to standalone flagships.",
  },
  {
    n: "02",
    t: "Joinery",
    lead: "A dedicated Al Quoz workshop producing bespoke millwork under shop-drawing tolerances.",
    scope: [
      "Bar counters, reception desks & banquettes",
      "Book-matched stone and veneer fabrication",
      "Full custom kits and loose furniture",
      "Metalwork, hand-forged detailing and lacquering",
    ],
    proof:
      "In-house CNC, spray and hand-finishing lines let us hold detail from drawing to install.",
  },
  {
    n: "03",
    t: "MEP",
    lead: "Full MEP scope engineered in-house — from load calculations to the final commissioning file.",
    scope: [
      "HVAC, electrical, plumbing & drainage design",
      "Fire, life-safety and access-control coordination",
      "Coordinated shop drawings and BIM clash resolution",
      "Testing, commissioning and DEWA / DCD close-out",
    ],
    proof:
      "Coordinated inside 3-metre ceiling voids with zero visible services in guest zones.",
  },
  {
    n: "04",
    t: "Systems & Controls",
    lead: "BMS strategy for HVAC, lighting, blinds and AV — consolidated behind a single facilities interface.",
    scope: [
      "Scene and circadian lighting programming",
      "Integrated HVAC zoning & occupancy control",
      "Access control and CCTV integration",
      "Energy-efficient sequencing and lifecycle strategy",
    ],
    proof:
      "Delivered for hospitality and corporate clients requiring silent plant and precise scene control.",
  },
  {
    n: "05",
    t: "Bespoke Furniture",
    lead: "One-off pieces engineered for the space — never catalogued, never repeated.",
    scope: [
      "Sprung banquettes and upholstery",
      "Sculptural lighting armatures",
      "Book-matched stone counters",
      "Hand-forged brass and blackened steel",
    ],
    proof:
      "Every custom piece drawn, prototyped and finished under the same workshop roof.",
  },
  {
    n: "06",
    t: "Aftercare",
    lead: "Structured maintenance contracts keeping delivered interiors at handover condition.",
    scope: [
      "Planned MEP maintenance & 24/7 response",
      "Joinery refurbishment and re-finishing",
      "Finishes protection and periodic audits",
      "Warranty, records and lifecycle reporting",
    ],
    proof:
      "Every Elden fit-out ships with a maintenance proposal in the handover file.",
  },
];

function ServicesPage() {
  return (
    <div className="bg-background">
      <section className="relative border-b border-border/60 pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Capabilities</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[0.98] text-balance md:text-[7vw] lg:text-[6.5rem]">
              One studio.<br />
              <span className="italic">Six disciplines, held in-house.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              We hold design, joinery and MEP inside a single studio so a single
              project manager can answer for the whole build. That's why our
              programmes hold, our budgets hold, and our finishes read as one
              continuous idea instead of a stack of subcontracts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="border-b border-border/60">
            {capabilities.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.03}>
                <article className="grid gap-10 border-t border-border/60 py-16 md:grid-cols-[120px_1fr_1.2fr] md:py-24">
                  <div className="font-display text-4xl tabular-nums text-muted-foreground">{c.n}</div>
                  <div>
                    <h2 className="font-display text-4xl leading-[1.05] text-balance md:text-5xl">{c.t}</h2>
                    <p className="mt-6 max-w-md text-base leading-[1.75] text-muted-foreground">
                      {c.lead}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-accent">Scope</p>
                    <ul className="mt-5 space-y-3 text-sm leading-relaxed md:text-base">
                      {c.scope.map((line) => (
                        <li key={line} className="grid grid-cols-[16px_1fr] gap-3">
                          <span className="mt-2 h-px bg-foreground/40" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 border-t border-border/60 pt-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                      Proof — <span className="normal-case tracking-normal text-foreground/80">{c.proof}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <Reveal>
              <p className="max-w-3xl font-display text-3xl leading-[1.1] text-balance md:text-5xl">
                Every discipline is available on its own — but the case for Elden is that they don't have to be.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/contact"
                className="mt-12 inline-flex items-center gap-4 border border-foreground px-7 py-4 text-[11px] uppercase tracking-[0.32em] transition hover:bg-foreground hover:text-background"
              >
                Begin the enquiry <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
