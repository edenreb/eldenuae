import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Elden Interior Design, Dubai" },
      {
        name: "description",
        content:
          "Fit-out, joinery and MEP projects delivered by Elden across hospitality, retail, commercial and leisure sectors in the UAE.",
      },
      { property: "og:title", content: "The Work — Elden Interior Design" },
      {
        property: "og:description",
        content: "An architectural gallery of interior fit-out projects across the UAE.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="bg-background">
      <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[0.98] text-balance md:text-[8vw] lg:text-[7rem]">
              A quiet gallery of{" "}
              <span className="italic text-elden-blue">delivered work.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Ten projects, six sectors, one standard. Click any project to enter it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group relative block overflow-hidden rounded-sm bg-charcoal"
    >
      <motion.div
        layoutId={`project-image-${project.slug}`}
        className="aspect-[4/5] w-full overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1600}
          height={1000}
          className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-white/40" />
          {project.sector}
        </div>
        <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">{project.name}</h2>
        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
          <span>{project.location.split(",")[0]}</span>
          <span className="inline-flex items-center gap-1 transition group-hover:gap-2">
            Enter <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
