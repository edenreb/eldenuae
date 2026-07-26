import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Work — Elden Interior Studio, Dubai" },
      {
        name: "description",
        content:
          "The complete index of Elden's delivered interior fit-out, joinery and MEP projects across hospitality, retail, commercial and leisure sectors in the UAE.",
      },
      { property: "og:title", content: "Work — Elden Interior Studio" },
      {
        property: "og:description",
        content: "An index of delivered interior projects across the UAE.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="bg-background">
      <section className="relative border-b border-border/60 pt-40 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[0.98] text-balance md:text-[7vw] lg:text-[6.5rem]">
              The complete index of delivered spaces.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              Every project in this index was carried by one team, from brief
              to key. Select a project to enter the case study.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-x-8 gap-y-20 pt-16 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
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
      className="group block"
    >
      <motion.div
        layoutId={`project-image-${project.slug}`}
        className="aspect-[4/5] w-full overflow-hidden bg-stone"
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1600}
          height={2000}
          className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </motion.div>
      <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-border" />
        <span>{project.sector}</span>
      </div>
      <h2 className="mt-4 font-display text-2xl leading-tight md:text-3xl">{project.name}</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        {project.location.split(",")[0]} · {project.year}
      </p>
    </Link>
  );
}
