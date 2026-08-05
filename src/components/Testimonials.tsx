import { useEffect, useId, useState } from "react";
import type { ImageSet } from "@/assets/generated/images";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { testimonials as initialTestimonials, type Testimonial } from "@/lib/testimonials";

// Shared generic avatar until real client portraits land — see
// src/assets/testimonials/README.md. Served as a static public asset rather
// than through the generated image pipeline since it's one icon reused by
// every card, not per-project photography.
const placeholderAvatar: ImageSet = {
  src: "/testimonial-avatars/placeholder.png",
  srcSet: "/testimonial-avatars/placeholder.png",
  width: 360,
  height: 360,
};

// Each stack entry carries a synthetic recycling key distinct from the
// testimonial's own id — when a card is shifted from one end of the list to
// the other it gets a fresh key so React remounts it instead of animating it
// across the whole stack.
interface StackEntry {
  key: number;
  testimonial: Testimonial;
}

let keySeed = initialTestimonials.length;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduced;
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
      className="h-5 w-5"
    >
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
      className="h-5 w-5"
    >
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  cardSize: number;
  onSelect: (position: number) => void;
  reducedMotion: boolean;
}

// Longer quotes get a smaller starting size so they still read as a pull
// quote rather than overflowing the fixed card — line-clamp below is the
// hard backstop regardless of length.
function quoteSizeClass(quote: string) {
  if (quote.length > 140) return "text-base md:text-lg";
  if (quote.length > 90) return "text-lg md:text-xl";
  return "text-xl md:text-2xl";
}

function TestimonialCard({
  position,
  testimonial,
  cardSize,
  onSelect,
  reducedMotion,
}: TestimonialCardProps) {
  const isCenter = position === 0;
  const notch = Math.round(cardSize * 0.14);

  // z-index is a discrete jump, not something CSS can interpolate — so a
  // card leaving the center would otherwise drop behind its neighbours the
  // instant you click, even while it's still sliding across the stack. Delay
  // that drop until the transform transition has finished (a card becoming
  // center still rises immediately, so the incoming card is never hidden).
  const transitionStyle = reducedMotion
    ? { transitionProperty: "none" }
    : {
        transitionProperty: "transform, z-index",
        transitionDuration: "500ms, 0ms",
        transitionTimingFunction: "ease-in-out, linear",
        transitionDelay: isCenter ? "0ms, 0ms" : "0ms, 500ms",
      };

  return (
    <div
      aria-hidden={!isCenter}
      onClick={isCenter ? undefined : () => onSelect(position)}
      className={`absolute left-1/2 top-1/2 ${isCenter ? "z-10" : "z-0 cursor-pointer"}`}
      style={{
        width: cardSize,
        height: cardSize,
        ...transitionStyle,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : 15}px)
          rotate(${isCenter ? 0 : position < 0 ? -2.5 : 2.5}deg)
        `,
      }}
    >
      <figure
        className={`relative flex h-full w-full flex-col overflow-hidden border p-8 ${
          isCenter
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-card-foreground hover:border-elden-green/50"
        }`}
        style={{
          clipPath: `polygon(0 0, calc(100% - ${notch}px) 0, 100% ${notch}px, 100% 100%, 0 100%)`,
        }}
      >
        <span
          aria-hidden
          className={`absolute origin-top-right rotate-45 ${
            isCenter ? "bg-primary-foreground/40" : "bg-border"
          }`}
          style={{ right: -1, top: notch - 2, width: notch * Math.SQRT2, height: 1 }}
        />
        <Img
          image={testimonial.image ?? placeholderAvatar}
          alt=""
          sizes="40px"
          intrinsic
          className={`mb-4 h-10 w-10 shrink-0 rounded-full object-cover ${
            isCenter ? "opacity-90" : "opacity-60"
          }`}
        />
        <blockquote
          className={`line-clamp-5 flex-1 font-display leading-snug text-balance ${quoteSizeClass(testimonial.quote)}`}
        >
          “{testimonial.quote}”
        </blockquote>
        <figcaption
          className={`mt-4 shrink-0 text-sm ${
            isCenter ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          <span className="block font-medium">{testimonial.name}</span>
          <span className="block text-xs uppercase tracking-[0.2em]">
            {testimonial.role}, {testimonial.company}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export function Testimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [stack, setStack] = useState<StackEntry[]>(() =>
    initialTestimonials.map((testimonial, i) => ({ key: i, testimonial })),
  );
  const liveRegionId = useId();
  const reducedMotion = usePrefersReducedMotion();

  const move = (steps: number) => {
    setStack((current) => {
      const next = [...current];
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = next.shift();
          if (!item) return current;
          next.push({ key: keySeed++, testimonial: item.testimonial });
        }
      } else {
        for (let i = 0; i < -steps; i++) {
          const item = next.pop();
          if (!item) return current;
          next.unshift({ key: keySeed++, testimonial: item.testimonial });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setCardSize(mql.matches ? 365 : 290);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const center = stack[Math.floor(stack.length / 2)]?.testimonial;

  return (
    <section className="relative bg-stone py-24 md:py-32" aria-label="Client testimonials">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-elden-green">In Their Words</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[1.02] text-balance md:text-7xl">
            The people we built for.
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-16 w-full overflow-hidden"
        style={{ height: cardSize > 320 ? 600 : 520 }}
      >
        <div aria-live="polite" className="sr-only" id={liveRegionId}>
          {center ? `${center.quote} — ${center.name}, ${center.role}, ${center.company}` : null}
        </div>
        {stack.map((entry, index) => {
          const position = index - Math.floor(stack.length / 2);
          return (
            <TestimonialCard
              key={entry.key}
              testimonial={entry.testimonial}
              position={position}
              cardSize={cardSize}
              onSelect={move}
              reducedMotion={reducedMotion}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
            aria-controls={liveRegionId}
            className="flex h-12 w-12 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-elden-green hover:text-elden-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
            aria-controls={liveRegionId}
            className="flex h-12 w-12 items-center justify-center border border-border bg-card text-foreground transition-colors hover:border-elden-green hover:text-elden-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
