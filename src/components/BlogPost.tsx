import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/Reveal";
import type { Post } from "@/lib/posts";

export function BlogPost({ post, related }: { post: Post; related: Post[] }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `/blogs/${post.slug}`;

  return (
    <div className="bg-background">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-elden-green"
      />

      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-elden-green-soft">
              {post.tag} · {post.readingMinutes} min read
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] text-balance text-white md:text-7xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/80">
              <span>{post.author}</span>
              <span className="h-px w-8 bg-white/40" />
              <span>{post.date}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <article className="prose-elden">
            {post.body.map((block: Post["body"][number], i: number) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="mt-14 first:mt-0">
                  {block.heading && (
                    <h2 className="font-display text-3xl leading-tight md:text-4xl">
                      {block.heading}
                    </h2>
                  )}
                  <div className={block.heading ? "mt-6 space-y-6" : "space-y-6"}>
                    {block.paragraphs.map((p: string, j: number) => (
                      <p
                        key={j}
                        className="text-lg leading-[1.75] text-foreground/85 md:text-xl"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </article>

          <div className="mt-20 border-t border-border/70 pt-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-elden-green">
              Share
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title,
                )}&url=${encodeURIComponent(shareUrl)}`}
                className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted"
              >
                Twitter / X
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-stone py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-xs uppercase tracking-[0.35em] text-elden-green">
            Keep reading
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Related from the studio
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((r: Post) => (
              <Link
                key={r.slug}
                to="/blogs/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                  <img
                    src={r.cover}
                    alt={r.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-elden-green">
                  {r.tag} · {r.date}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
