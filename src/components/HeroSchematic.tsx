import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import frame1 from "@/assets/hero-frame-1.jpg";
import frame2 from "@/assets/hero-frame-2.jpg";
import frame3 from "@/assets/hero-frame-3.jpg";
import frame4 from "@/assets/hero-frame-4.jpg";
import frame5 from "@/assets/hero-frame-5.jpg";

const frames = [
  { src: frame1, label: "Schematic" },
  { src: frame2, label: "Wireframe" },
  { src: frame3, label: "Massing" },
  { src: frame4, label: "Materials" },
  { src: frame5, label: "Delivered" },
];

function useFrameOpacity(progress: MotionValue<number>, index: number, total: number) {
  const step = 1 / (total - 1);
  const center = index * step;
  const w = step * 0.75;
  return useTransform(
    progress,
    [center - w, center, center + w].map((v) => Math.max(0, Math.min(1, v))),
    index === 0
      ? [1, 1, 0]
      : index === total - 1
        ? [0, 1, 1]
        : [0, 1, 0],
  );
}

export function HeroSchematic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const stageProgress = [0, 1, 2, 3, 4].map((i) => useFrameOpacity(progress, i, 5));

  const captionY = useTransform(progress, [0, 1], [0, -60]);
  const gridOpacity = useTransform(progress, [0, 0.15, 0.6, 1], [1, 0.6, 0.2, 0]);
  const overlayScale = useTransform(progress, [0, 1], [1.08, 1]);
  const stageIndex = useTransform(progress, (p) => Math.min(4, Math.round(p * 4)));

  return (
    <section
      ref={ref}
      className="relative h-[500vh] bg-elden-blue-deep text-primary-foreground"
      aria-label="Hero: schematic to delivered interior"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame stack */}
        <motion.div
          style={{ scale: overlayScale }}
          className="absolute inset-0 grain-overlay"
        >
          {frames.map((f, i) => (
            <motion.img
              key={f.src}
              src={f.src}
              alt={`Interior build stage ${i + 1}: ${f.label}`}
              style={{ opacity: stageProgress[i] }}
              className="absolute inset-0 h-full w-full object-cover"
              {...(i === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
              width={1600}
              height={1000}
              draggable={false}
            />
          ))}
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-elden-blue-deep/70 via-transparent to-elden-blue-deep/85" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />

        {/* Blueprint grid overlay */}
        <motion.svg
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 h-full w-full text-primary-foreground/25"
          aria-hidden
        >
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>

        {/* Content */}
        <motion.div
          style={{ y: captionY }}
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-28 md:px-10 md:py-32"
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-primary-foreground/70">
            <span className="h-px w-8 bg-primary-foreground/50" />
            Interior Fit-out · Joinery · MEP
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-[13vw] leading-[0.86] tracking-[-0.03em] text-balance md:text-[9.5vw] lg:text-[8vw]">
              We build
              <br />
              <span className="italic text-elden-green-soft">the spaces</span>
              <br />
              you remember.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              From the first line on a blueprint to the last brushstroke of lacquer —
              Elden delivers turnkey interior fit-out, joinery and MEP across the UAE.
            </p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <StageIndicator index={stageIndex} />
            <div className="hidden text-right text-xs uppercase tracking-[0.3em] text-primary-foreground/60 md:block">
              Scroll <span className="ml-2 inline-block h-px w-16 translate-y-[-3px] bg-primary-foreground/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StageIndicator({ index }: { index: MotionValue<number> }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-[0.35em] text-primary-foreground/50">
        Build stage
      </p>
      <div className="flex items-center gap-2">
        {frames.map((f, i) => (
          <StageDot key={f.label} label={f.label} active={index} i={i} />
        ))}
      </div>
    </div>
  );
}

function StageDot({
  label,
  active,
  i,
}: {
  label: string;
  active: MotionValue<number>;
  i: number;
}) {
  const width = useTransform(active, (v) => (Math.round(v) === i ? 44 : 12));
  const opacity = useTransform(active, (v) => (Math.round(v) === i ? 1 : 0.35));
  return (
    <motion.div
      style={{ width, opacity }}
      className="flex h-6 items-center overflow-hidden rounded-full bg-primary-foreground/20 px-2"
    >
      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-primary-foreground">
        {label}
      </span>
    </motion.div>
  );
}
