import { useEffect, useRef, useState } from "react";

/**
 * Minimal elegant custom cursor. Renders after mount so we can safely detect
 * pointer type and attach refs without SSR/hydration issues.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
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

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      setHover(
        !!t?.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
        ),
      );
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
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
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border-2 border-elden-blue"
        style={{
          width: hover ? 60 : 36,
          height: hover ? 60 : 36,
          opacity: 0,
          mixBlendMode: "difference",
          transition:
            "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease, background-color 200ms ease, border-color 200ms ease",
          backgroundColor: hover ? "rgba(255,255,255,0.1)" : "transparent",
        }}
      />
    </>
  );
}
