import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { getProjectBySlug, projects } from "@/lib/projects";
import { Reveal, ParallaxImage } from "@/components/Reveal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Elden" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — Elden Case Study` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Elden` },
        { property: "og:description", content: p.summary },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent">404</p>
        <h1 className="mt-4 font-display text-5xl">Project not found</h1>
        <Link
          to="/projects"
          className="mt-8 inline-flex border border-foreground px-6 py-3 text-[11px] uppercase tracking-[0.32em] hover:bg-foreground hover:text-background"
        >
          Back to Work
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="bg-background">
      {/* Hero — restrained, still */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-charcoal">
        <motion.div
          layoutId={`project-image-${project.slug}`}
          className="absolute inset-0"
        >
          <img
            src={project.image}
            alt={project.name}
            fetchPriority="high"
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-36 pb-16 text-primary-foreground md:px-10 md:pb-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 hover:text-primary-foreground"
          >
            <span aria-hidden>←</span> The Index
          </Link>

          <div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70">
              <span className="tabular-nums">Case {String(idx + 1).padStart(3, "0")}</span>
              <span className="h-px w-10 bg-primary-foreground/40" />
              {project.sector}
              <span className="h-px w-10 bg-primary-foreground/40" />
              <span className="tabular-nums">{project.year}</span>
            </div>
            <h1 className="mt-8 max-w-[18ch] font-display text-5xl leading-[0.95] text-balance md:text-[7vw] lg:text-[7rem]">
              {project.name}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-[1.75] text-primary-foreground/85 md:text-lg">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Meta ledger */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto grid max-w-[1600px] gap-y-10 px-6 py-14 md:grid-cols-4 md:gap-x-10 md:px-10 md:py-16">
          {[
            ["Client", project.client],
            ["Location", project.location],
            ["Scope", project.scope],
            ["Year", project.year],
          ].map(([k, v]) => (
            <Reveal key={k}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-accent">{k}</p>
                <p className="mt-4 text-base leading-relaxed">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brief */}
      <CaseSection
        label="01 — Brief"
        heading="What the space had to become."
        body={project.narrative[0] ?? project.summary}
      />

      {project.gallery[0] && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <ParallaxImage
              src={project.gallery[0]}
              alt={`${project.name} — view 1`}
              className="aspect-[16/9] bg-muted"
            />
          </div>
        </section>
      )}

      {/* Scope & Materials */}
      <section className="border-t border-border/60 bg-stone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-accent">02 — Scope & Materials</p>
            </Reveal>
            <div>
              <Reveal>
                <h2 className="max-w-[20ch] font-display text-4xl leading-[1.05] text-balance md:text-5xl">
                  What was delivered, and what it was delivered in.
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <Reveal delay={0.05}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Delivered by Elden</p>
                    <ul className="mt-5 space-y-3 text-base leading-relaxed">
                      {(project.scope.split(/[,&·]| and /i).map((s: string) => s.trim()).filter(Boolean)).map((s: string) => (
                        <li key={s} className="grid grid-cols-[16px_1fr] gap-3">
                          <span className="mt-2.5 h-px bg-foreground/40" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Material register</p>
                    <ul className="mt-5 space-y-3 text-base leading-relaxed">
                      {["Book-matched stone", "Solid & veneered timber", "Blackened steel · brass", "Custom joinery finishes"].map((s) => (
                        <li key={s} className="grid grid-cols-[16px_1fr] gap-3">
                          <span className="mt-2.5 h-px bg-foreground/40" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution */}
      {project.narrative.length > 1 && (
        <CaseSection
          label="03 — Execution"
          heading="How the space was built."
          body={project.narrative.slice(1).join(" ")}
        />
      )}

      {/* Gallery */}
      {project.gallery.length > 1 && (
        <section className="border-t border-border/60 bg-background py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent">04 — Record</p>
              </Reveal>
              <Reveal>
                <h2 className="max-w-[22ch] font-display text-4xl leading-[1.05] text-balance md:text-5xl">
                  Delivered views of the finished space.
                </h2>
              </Reveal>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {project.gallery.slice(1).map((src: string, i: number) => (
                <ParallaxImage
                  key={i}
                  src={src}
                  alt={`${project.name} — view ${i + 2}`}
                  className={`bg-muted ${i % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcome */}
      <CaseSection
        label="05 — Outcome"
        heading="What the client took to opening day."
        body={`${project.name} was handed over as a fully commissioned space with a maintenance contract signed on the same day. ${project.client} continues to operate the interior in its delivered condition.`}
      />

      {/* Next */}
      <section className="border-t border-border/60 bg-charcoal text-primary-foreground">
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group mx-auto grid max-w-[1600px] gap-10 px-6 py-24 md:grid-cols-[auto_1fr_auto] md:items-center md:px-10 md:py-32"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/60">
            Next case
          </p>
          <h2 className="font-display text-4xl leading-[1] text-balance md:text-7xl">{next.name}</h2>
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-primary-foreground/80 transition group-hover:gap-5">
            Continue <span aria-hidden>→</span>
          </span>
        </Link>
      </section>
    </article>
  );
}

function CaseSection({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="border-t border-border/60 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">{label}</p>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-3xl leading-[1.1] text-balance md:text-5xl">
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-base leading-[1.85] text-muted-foreground md:text-lg">
                {body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
