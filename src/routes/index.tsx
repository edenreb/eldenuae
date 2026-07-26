import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, ParallaxImage } from "@/components/Reveal";
import { projects } from "@/lib/projects";
import heroImage from "@/assets/foret-cafe/1.jpg";
import client1 from "@/assets/clients/1.png";
import client2 from "@/assets/clients/2.png";
import client3 from "@/assets/clients/3.png";
import client4 from "@/assets/clients/4.png";
import client5 from "@/assets/clients/5.png";
import client6 from "@/assets/clients/6.png";
import client7 from "@/assets/clients/7.png";
import client8 from "@/assets/clients/8.png";
import client9 from "@/assets/clients/9.png";
import client10 from "@/assets/clients/10.png";
import client11 from "@/assets/clients/11.png";
import client12 from "@/assets/clients/12.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elden — Interior Fit-out, Joinery & MEP in Dubai" },
      {
        name: "description",
        content:
          "A Dubai studio delivering considered, enduring interiors. Fit-out, joinery and MEP under one roof since 2016.",
      },
      { property: "og:title", content: "Elden — Interior Studio, Dubai" },
      { property: "og:image", content: "https://eldenuae.com/og.jpg" },
    ],
  }),
  component: Index,
});

const clients = [
  client1, client2, client3, client4, client5, client6,
  client7, client8, client9, client10, client11, client12,
];

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <Discipline />
      <ClientList />
      <ClosingCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-charcoal text-primary-foreground">
      <img
        src={heroImage}
        alt="A delivered interior by Elden, Dubai"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-40 pb-14 md:px-10 md:pb-20">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70">
          <span className="h-px w-10 bg-primary-foreground/50" />
          Interior Studio · Dubai · Est. 2016
        </div>

        <div>
          <h1 className="max-w-[16ch] font-display text-[13vw] font-normal leading-[0.92] tracking-[-0.02em] text-balance md:text-[8.5vw] lg:text-[7.5rem]">
            Considered interiors,<br />
            <span className="italic text-primary-foreground/85">quietly delivered.</span>
          </h1>
          <div className="mt-14 grid gap-10 border-t border-primary-foreground/20 pt-10 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Elden is a Dubai fit-out studio. We hold design, joinery and MEP
              under one roof so a single team can answer for the whole build —
              from the first blueprint to the last brushstroke of lacquer.
            </p>
            <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.32em] text-primary-foreground/60">
              <div>
                <span className="text-primary-foreground/40">Practice —</span>{" "}
                Fit-out · Joinery · MEP
              </div>
              <div>
                <span className="text-primary-foreground/40">Sectors —</span>{" "}
                Hospitality · Retail · Commercial
              </div>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-4 self-start border border-primary-foreground/60 px-7 py-4 text-[11px] uppercase tracking-[0.32em] transition hover:bg-primary-foreground hover:text-charcoal md:self-end"
            >
              Selected Work <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="border-t border-border/60 bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">01 — Position</p>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-4xl leading-[1.1] text-balance md:text-6xl">
                A studio built to answer for the whole space — not just draw it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-xl text-base leading-[1.75] text-muted-foreground md:text-lg">
                Every project runs through one team, one workshop and one project
                manager. Timelines hold because they're not stitched together
                across subcontracts. Finishes read as one continuous idea because
                the same hands drew, milled and installed them.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-x-16 gap-y-14 border-t border-border/60 pt-14 md:grid-cols-4">
          {[
            ["09+", "Years in practice"],
            ["120+", "Projects delivered"],
            ["06", "Sectors served"],
            ["01", "Team, one workshop"],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.05}>
              <div>
                <div className="font-display text-6xl leading-none tabular-nums md:text-7xl">{k}</div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.slice(0, 4);
  return (
    <section className="border-t border-border/60 bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">02 — Selected Work</p>
          </Reveal>
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-4xl leading-[1.05] text-balance md:text-6xl">
              A record of delivered spaces, each carried by one team from brief to key.
            </h2>
          </Reveal>
        </div>

        <div className="mt-24 space-y-28">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} total={featured.length} />
          ))}
        </div>

        <div className="mt-24 border-t border-border/60 pt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-4 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.32em] transition hover:text-accent"
          >
            The complete index <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  return (
    <Reveal delay={0.05}>
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="group grid items-start gap-10 md:grid-cols-[1.5fr_1fr]"
      >
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className="aspect-[4/3] bg-transparent"
        />

        <div className="md:pt-6">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-border" />
            <span>{project.sector}</span>
          </div>
          <h3 className="mt-6 font-display text-4xl leading-[1.05] text-balance md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-6 max-w-md text-base leading-[1.75] text-muted-foreground">
            {project.summary}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border/60 pt-6 text-[11px] uppercase tracking-[0.28em]">
            <div>
              <dt className="text-muted-foreground/70">Location</dt>
              <dd className="mt-2">{project.location.split(",")[0]}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground/70">Year</dt>
              <dd className="mt-2 tabular-nums">{project.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted-foreground/70">Scope</dt>
              <dd className="mt-2 normal-case tracking-normal text-sm text-foreground/85">{project.scope}</dd>
            </div>
          </dl>
          <span className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent transition group-hover:gap-5">
            Read the case study <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Discipline() {
  const disciplines = [
    ["01", "Fit-out", "Turnkey interior fit-out delivered by our own site trades under a single project management structure."],
    ["02", "Joinery", "Bespoke millwork produced in our Al Quoz workshop — from shop drawings to hand-finished install."],
    ["03", "MEP", "Design, load calculations, coordinated shop drawings, execution and commissioning, all in-house."],
    ["04", "Aftercare", "Structured maintenance contracts that keep delivered spaces at handover-day condition."],
  ];
  return (
    <section className="border-t border-border/60 bg-stone py-32 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">03 — Practice</p>
          </Reveal>
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-4xl leading-[1.05] text-balance md:text-6xl">
              Four disciplines, one continuous responsibility.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-14 border-t border-border/60 pt-14 md:grid-cols-4">
          {disciplines.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.05}>
              <div>
                <span className="font-display text-2xl tabular-nums text-muted-foreground">{n}</span>
                <h3 className="mt-8 font-display text-3xl leading-tight">{t}</h3>
                <p className="mt-5 text-sm leading-[1.75] text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientList() {
  return (
    <section className="border-t border-border/60 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">04 — Trust</p>
          </Reveal>
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-3xl leading-[1.1] text-balance md:text-5xl">
              A short list of clients who've come back.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 items-center gap-x-6 gap-y-12 border-t border-b border-border/60 py-16 md:grid-cols-6">
          {clients.map((logo, i) => (
            <Reveal key={i} delay={(i % 6) * 0.03}>
              <div className="flex h-14 items-center justify-center px-4 md:h-20">
                <img
                  src={logo}
                  alt=""
                  className="max-h-full max-w-full object-contain opacity-55 grayscale transition duration-500 hover:opacity-90"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="border-t border-border/60 bg-background py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Begin</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-[18ch] font-display text-5xl leading-[1] text-balance md:text-8xl">
            A conversation is the first stage of a build.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-border/60 pt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.32em] transition hover:bg-foreground hover:text-background"
            >
              Begin an enquiry <span aria-hidden>→</span>
            </Link>
            <a
              href="mailto:info@eldenuae.com"
              className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground hover:text-foreground"
            >
              info@eldenuae.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
