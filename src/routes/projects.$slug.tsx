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
        { title: `${p.name} — Elden Interior Design` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Elden` },
        { property: "og:description", content: p.summary },
        { property: "og:image", content: p.image.src },
        { name: "twitter:image", content: p.image.src },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32">
      <div className="text-center">
        <h1 className="font-display text-5xl">Project not found</h1>
        <Link
          to="/projects"
          className="mt-6 inline-flex rounded-full bg-elden-blue px-5 py-2.5 text-sm text-primary-foreground"
        >
          Back to projects
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
      {/* Hero — expanding image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[92vh] w-full overflow-hidden bg-charcoal"
      >
        <div className="absolute inset-0">
          <motion.img
            src={project.image.src}
            srcSet={project.image.srcSet}
            sizes="100vw"
            alt={project.name}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-32 pb-16 text-primary-foreground md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white"
            >
              <span aria-hidden>←</span> All projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-elden-green-soft">
              {project.sector} <span className="h-px w-8 bg-white/40" /> {project.year}
            </div>
            <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-8xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{project.summary}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Facts */}
      <section className="border-b border-border/60 bg-background py-16">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 md:grid-cols-4 md:px-10">
          {[
            ["Client", project.client],
            ["Location", project.location],
            ["Scope", project.scope],
            ["Sector", project.sector],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.05}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-elden-green">{k}</p>
                <p className="mt-3 text-base leading-relaxed">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="marble-surface py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">The Story</p>
          </Reveal>
          {project.narrative.map((para: string, i: number) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p className="mt-8 font-display text-2xl leading-[1.35] text-balance md:text-4xl">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background pb-4 pt-24 md:pb-8 md:pt-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green">Gallery</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Inside the space.</h2>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-6">
            {project.gallery.map((image, i) => (
              <div
                key={i}
                className={`w-full sm:w-[calc(50%-0.75rem)] ${project.gallery.length % 2 !== 0 && i === project.gallery.length - 1 ? "mx-auto" : ""}`}
              >
                <ParallaxImage
                  image={image}
                  alt={`${project.name} — view ${i + 1}`}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10] rounded-sm bg-muted"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="bg-background pb-8 pt-4 md:pb-16 md:pt-8">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group flex flex-col gap-8 rounded-2xl bg-elden-blue-deep px-8 py-16 text-primary-foreground md:flex-row md:items-center md:justify-between md:px-16 md:py-24"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-elden-green-soft">
                Next project
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-7xl">{next.name}</h2>
            </div>
            <span className="inline-flex items-center gap-3 text-sm transition group-hover:gap-5">
              Continue <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
