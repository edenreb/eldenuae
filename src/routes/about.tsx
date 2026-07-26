import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, ParallaxImage } from "@/components/Reveal";
import studioImage from "@/assets/foret-cafe/2.jpg";
import workshopImage from "@/assets/warehouse-gym-ibn-battuta/2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — Elden Interior Design, Dubai" },
      {
        name: "description",
        content:
          "Elden is a Dubai interior fit-out, joinery and MEP studio operating from Al Quoz since 2016 — a single team answering for design, workshop and site.",
      },
      { property: "og:title", content: "Studio — Elden" },
      {
        property: "og:description",
        content: "A Dubai studio holding design, joinery and MEP under one roof since 2016.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative border-b border-border/60 pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Studio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[0.98] text-balance md:text-[6.5vw] lg:text-[6rem]">
              A Dubai interior studio, held in-house since 2016.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              Elden operates from Al Quoz Industrial Area 2. Design, joinery and
              MEP are not partners we coordinate — they are teams that sit inside
              the same studio, report to the same project manager, and finish
              their work on the same site.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ParallaxImage
            src={studioImage}
            alt="An Elden-delivered interior in Dubai"
            className="aspect-[21/9] bg-muted"
          />
        </div>
      </section>

      <section className="border-t border-border/60 bg-stone py-32 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1fr_1.5fr] md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Position</p>
          </Reveal>
          <div className="space-y-10 text-lg leading-[1.75] text-foreground/85 md:text-xl">
            <Reveal delay={0.05}>
              <p>
                We measure a studio by what it can answer for. Elden was built
                to answer for the whole space — the drawing, the joinery
                shop, the mechanical services, the site programme, and the day
                after handover.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                One project manager holds every discipline. Every finish is
                signed off by the trade lead who executed it. That's why our
                timelines hold, our budgets hold, and the finished interior
                reads as one continuous idea instead of a stack of subcontracts.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Scale</p>
            </Reveal>
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-4xl leading-[1.05] text-balance md:text-6xl">
                The measurable side of a nine-year practice.
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-x-12 gap-y-14 border-t border-border/60 pt-14 md:grid-cols-4">
            {[
              ["09+", "Years in continuous practice"],
              ["120+", "Interior projects delivered"],
              ["06", "Sectors — hospitality to cultural"],
              ["01", "Studio · one workshop · one site team"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.05}>
                <div>
                  <div className="font-display text-6xl tabular-nums leading-none md:text-7xl">{k}</div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">{v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <ParallaxImage
            src={workshopImage}
            alt="Elden joinery workshop, Al Quoz, Dubai"
            className="aspect-[21/9] bg-muted"
          />
        </div>
      </section>

      <section className="border-t border-border/60 py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Principles</p>
            </Reveal>
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-4xl leading-[1.05] text-balance md:text-6xl">
                Four positions the studio does not compromise.
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 border-t border-border/60 pt-14 md:grid-cols-2">
            {[
              [
                "Quality",
                "Every detail signed off by the trade lead who executed it. Handover packs include commissioning records and finish sample matches — not photographs.",
              ],
              [
                "Precision",
                "Programmes engineered around long-lead materials. Book-matched stone, veneer runs and joinery orders scheduled from day one, not the week before install.",
              ],
              [
                "Restraint",
                "Every specification defended against the brief. If a detail doesn't serve the space, it doesn't ship, even if the client will pay for it.",
              ],
              [
                "Accountability",
                "One project manager. One point of contact. One team that returns for the maintenance contract.",
              ],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl">{t}</h3>
                  <p className="mt-5 max-w-md text-base leading-[1.75] text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 border-t border-border/60 pt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-foreground px-7 py-4 text-[11px] uppercase tracking-[0.32em] transition hover:bg-foreground hover:text-background"
            >
              Visit the studio <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
