import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { projects } from "@/lib/projects";
import { Img } from "@/components/Img";

const RADIUS = 1300;
const CARD_WIDTH = 320;
const GAP = 16;
const SLOTS = 24;
const SLICE = 360 / SLOTS;
const AUTO_SPEED = 0.6; // degrees per second — very slow

export function HeroCurved() {
  const slots = useMemo(() => projects.slice(0, SLOTS), []);
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let prev = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;
      if (!dragging.current) rotation.current += AUTO_SPEED * dt;
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(${RADIUS}px) rotateY(${rotation.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      prev = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "100px" },
    );
    io.observe(section);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    if (Math.abs(dx) > 1) moved.current = true;
    rotation.current -= dx * 0.04;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background pt-36 pb-20 md:pt-44 md:pb-28"
      aria-label="Elden — bespoke interior fit-out"
    >
      <div className="mx-auto max-w-[1100px] px-6 text-center">
        <h1 className="mx-auto max-w-[18ch] text-[13vw] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground sm:text-[9vw] md:text-[5.6rem]">
          Bespoke Interior Fit-out Studio
        </h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-sm text-muted-foreground md:text-base">
          The space you deserve has never been built before.
        </p>
      </div>

      {/* Concave cylinder of work — draggable */}
      <div
        className="relative mt-14 cursor-grab select-none active:cursor-grabbing md:mt-20"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="relative mx-auto h-[340px] md:h-[420px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={ringRef}
            className="absolute left-1/2 top-0 h-full w-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${RADIUS}px)`,
            }}
          >
            {slots.map((p, i) => (
              <Link
                key={`${p.slug}-${i}`}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                onClick={(e) => {
                  if (moved.current) e.preventDefault();
                }}
                className="absolute top-0 block h-full overflow-hidden bg-muted"
                style={{
                  width: CARD_WIDTH,
                  marginLeft: -(CARD_WIDTH + GAP) / 2,
                  transform: `rotateY(${i * SLICE}deg) translateZ(-${RADIUS}px)`,
                }}
              >
                <Img
                  image={p.image}
                  alt={p.name}
                  sizes="320px"
                  className="h-full w-full object-cover"
                  loading={i < 3 ? "eager" : "lazy"}
                  draggable={false}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* edge fades so the cylinder dissolves instead of clipping */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="mx-auto mt-16 max-w-[720px] px-6 text-center md:mt-20">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          We deliver private residences, restaurants, retail and workplaces across the UAE — from a
          blank page to handover. No templates, no repeated details, no shortcuts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-10 text-sm font-medium">
          <Link to="/contact" className="underline underline-offset-4 hover:no-underline">
            Book a meeting
          </Link>
          <Link to="/projects" className="underline underline-offset-4 hover:no-underline">
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
