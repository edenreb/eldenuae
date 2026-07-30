import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";

const RADIUS = 2000;
const CARD_WIDTH = 260;
const GAP = 26;
const SLICE = 360 / 40; // 40 slots around the cylinder

export function HeroCurved() {
  const slots = [...projects, ...projects].slice(0, 40);

  return (
    <section
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

      {/* Curved cylinder of work */}
      <div
        className="relative mt-14 md:mt-20"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
      >
        <div
          className="relative mx-auto h-[300px] md:h-[360px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute left-1/2 top-0 h-full w-0 animate-[hero-orbit_70s_linear_infinite]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {slots.map((p, i) => (
              <Link
                key={`${p.slug}-${i}`}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="absolute top-0 block h-full overflow-hidden bg-muted"
                style={{
                  width: CARD_WIDTH,
                  marginLeft: -(CARD_WIDTH + GAP) / 2,
                  transform: `rotateY(${i * SLICE}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading={i < 8 ? "eager" : "lazy"}
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
