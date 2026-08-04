import { useEffect, useRef, useState } from "react";

/**
 * Minimal elegant custom cursor. Renders after mount so we can safely detect
 * pointer type and attach refs without SSR/hydration issues.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Enable only on real pointer devices, after mount (avoids SSR mismatch).
  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isFine) setEnabled(true);
  }, []);

  // Wire up movement once the cursor elements are actually in the DOM.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none-root");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      const next = !!t?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
      );
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle("cursor-ring--hover", hovering);
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-elden-green"
        style={{ opacity: 0, transition: "opacity 200ms ease" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] rounded-full border-2 border-elden-blue"
        style={{ opacity: 0, mixBlendMode: "difference" }}
      />
    </>
  );
}
