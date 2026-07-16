import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroSchematic } from "@/components/HeroSchematic";
import { Reveal, ParallaxImage } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import clientWarehouseGym from "@/assets/clients/warehousegym.png";
import clientDu from "@/assets/clients/du.png";
import clientBikanervala from "@/assets/clients/bikanervala.png";
import clientMaison from "@/assets/clients/maison.png";
import clientAtelier from "@/assets/clients/atelier.png";
import clientVirgin from "@/assets/clients/virgin.png";
import clientSelSucre from "@/assets/clients/selsucre.png";
import clientHolidayInn from "@/assets/clients/holidayinn.png";
import clientCostaAzul from "@/assets/clients/costaazul.png";
import clientVervain from "@/assets/clients/vervain.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elden — Interior Fit-out, Joinery & MEP in Dubai" },
      {
        name: "description",
        content:
          "Converting places into spaces. Elden delivers turnkey interior fit-out, joinery and MEP across the UAE.",
      },
    ],
  }),
  component: Index,
});

const services = [
  { n: "01", t: "Concept", d: "Brief interrogation, site studies, moodboards, spatial diagrams." },
  { n: "02", t: "Design", d: "Full design development, BOQ, samples, technical documentation." },
  { n: "03", t: "Engineering", d: "MEP design, load calculations, BMS strategy, sustainability review." },
  { n: "04", t: "Joinery", d: "Bespoke millwork produced in our Al Quoz workshop." },
  { n: "05", t: "Construction", d: "Turnkey fit-out delivered by our own trades, site-managed daily." },
  { n: "06", t: "Handover", d: "Snagging, commissioning, aftercare and maintenance contracts." },
];

const sectors = ["Hospitality", "Restaurants", "Retail", "Commercial", "Leisure", "Cultural"];

function Index() {
  return (
    <div className="bg-background">
      <HeroSchematic />

      {/* Manifesto */}
      <section className="relative marble-surface py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">
              Elden — Est. 2016 · Dubai
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-5xl font-display text-5xl leading-[1.05] text-balance md:text-7xl lg:text-[5.5rem]">
              Everyone deserves their own space —{" "}
              <span className="italic text-elden-blue">we simply specialise in building it.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-10 border-t border-border/60 pt-10 md:grid-cols-3">
            {[
              ["09+", "Years converting places into spaces"],
              ["100+", "Fit-out projects delivered across the UAE"],
              ["6", "Sectors served, from hospitality to cultural"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={0.1 * i}>
                <div>
                  <div className="font-display text-6xl text-elden-blue md:text-7xl">{k}</div>
                  <div className="mt-3 max-w-xs text-sm text-muted-foreground">{v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients we've served — sliding list */}
      <ClientsMarquee />

      {/* Featured projects — editorial */}
      <FeaturedProjects />


      {/* Process ribbon */}
      <ProcessRibbon />

      {/* Sectors — sliding marquee */}
      <SectorsMarquee />

      {/* CTA */}
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">Begin</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] text-balance md:text-8xl">
              Have a space in mind?
              <br />
              <span className="italic text-elden-blue">Let's build it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-elden-blue px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-elden-blue-deep"
            >
              Start a conversation <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FeaturedProjects() {
  const featured = projects.slice(0, 4);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Work</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[1.02] text-balance md:text-7xl">
                A portfolio of spaces, not thumbnails.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-elden-blue"
            >
              View all projects
              <span className="inline-block transition group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="space-y-24">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({
  project,
  flip,
  index,
}: {
  project: (typeof projects)[number];
  flip: boolean;
  index: number;
}) {
  return (
    <Reveal delay={0.05}>
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className={`group grid items-center gap-10 md:grid-cols-[1.4fr_1fr] ${
          flip ? "md:grid-cols-[1fr_1.4fr] md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className="aspect-[16/10] rounded-sm bg-transparent"
        />

        <div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-elden-green">
            <span className="tabular-nums text-muted-foreground">
              0{index + 1} / 0{4}
            </span>
            <span className="h-px w-8 bg-border" />
            {project.sector}
          </div>
          <h3 className="mt-5 font-display text-4xl leading-tight text-balance md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>{project.location.split(",")[0]}</span>
            <span className="h-px w-6 bg-border" />
            <span>{project.year}</span>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-elden-blue transition group-hover:gap-3">
            Explore project <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function ProcessRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-stone" aria-label="Our process">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Process</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-balance md:text-6xl">
                From first line to final key — one team, six stages.
              </h2>
            </div>
            <div className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
              Scroll →
            </div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-10">
          {services.map((s) => (
            <div
              key={s.n}
              className="grain-overlay w-[80vw] shrink-0 rounded-sm border border-border/70 bg-card p-8 md:w-[42vw] md:p-12"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl text-elden-blue md:text-6xl">{s.n}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-elden-green">
                  Stage
                </span>
              </div>
              <h3 className="mt-10 font-display text-3xl leading-tight md:text-5xl">{s.t}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.d}
              </p>
              <div className="mt-12 h-px w-full bg-border" />
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>Elden Method</span>
                <span>· · · ·</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectorsMarquee() {
  // Duplicate list so the translate loop is seamless.
  const loop = [...sectors, ...sectors];
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-elden-blue-deep py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green-soft">
              Sectors we serve
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/50 md:block">
              Six disciplines · one studio
            </p>
          </div>
        </Reveal>
      </div>

      <div
        className="group relative mt-12 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex shrink-0 items-center gap-16 font-display text-5xl leading-none text-balance md:text-8xl"
            >
              {s}
              <span className="text-elden-green">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const clients = [
  { name: "Warehouse Gym", logo: clientWarehouseGym },
  { name: "du", logo: clientDu },
  { name: "Bikanervala", logo: clientBikanervala },
  { name: "Maison Privée", logo: clientMaison },
  { name: "Atelier Mode", logo: clientAtelier },
  { name: "Virgin", logo: clientVirgin },
  { name: "Sel & Sucre", logo: clientSelSucre },
  { name: "Holiday Inn", logo: clientHolidayInn },
  { name: "Costa Azul Resorts", logo: clientCostaAzul },
  { name: "Vervain Gallery", logo: clientVervain },
];

function ClientsMarquee() {
  const loop = [...clients, ...clients];
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-elden-stone/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-elden-blue-deep/70">
            Clients we've served
          </p>
        </Reveal>
      </div>
      <div
        className="relative mt-12 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 animate-[marquee_45s_linear_infinite] items-center gap-24 pr-24 md:gap-40 md:pr-40">
          {loop.map((c, i) => (
            <img
              key={`${c.name}-${i}`}
              src={c.logo}
              alt={c.name}
              loading="lazy"
              width={1536}
              height={512}
              className="h-16 w-auto shrink-0 object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 md:h-28"
            />
          ))}
        </div>
      </div>
    </section>
  );
}



