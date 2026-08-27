// Single motion entry point for the whole site.
//
// Components never hand-roll GSAP — they declare intent with data-attributes
// and this module wires them up:
//
//   data-reveal            clip-path wipe on enter
//   data-reveal-words      per-word settle, staggered ("sm" = shorter travel)
//   data-scroll-words      per-word opacity tied to scroll progress (scrubbed,
//                          reversible — not a one-time reveal on enter)
//   data-reveal-rule       divider grows from the left (scaleX 0 -> 1)
//   data-reveal-media      gallery image: y 20 + scale 0.75 -> settled
//   data-rise="N"          fade + rise from N px (default 24)
//   data-settle            large panel image, subtle scale on enter
//   data-parallax="0.3"    scrubbed Y translate at the given speed
//
// Every offset and duration below was measured off the reference's own
// animation config, not tuned by feel — see the plan file for the full table.
//
// Progressive enhancement is load-bearing here: every effect uses gsap.from(),
// so the *final* state is what the CSS renders. With JS disabled, or under
// prefers-reduced-motion, the page is complete and static rather than blank.

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// The reference authors exactly two easing curves across its entire site.
// Everything else it does is a spring resolved at runtime. Registering the
// real curves rather than approximating with power3/back keeps our motion on
// the same footing as the design we're matching.
CustomEase.create("settle", "M0,0 C0.44,0 0.56,1 1,1"); // cubic-bezier(.44,0,.56,1)
CustomEase.create("page", "M0,0 C0.27,0 0.51,1 1,1"); // cubic-bezier(.27,0,.51,1)

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run `fn` only once the tab is actually being looked at.
 *
 * A hidden tab throttles requestAnimationFrame to zero, and every effect here
 * is a gsap.from() — which applies its *hidden* start state synchronously and
 * then waits for frames that never come. Setting any of that up in the
 * background would leave the page blank until the user focuses it. Deferring
 * means a backgrounded page simply renders its finished state, and the motion
 * wires up intact the moment it becomes visible.
 */
export function whenVisible(fn: () => void) {
  if (!document.hidden) {
    fn();
    return;
  }
  const onVisible = () => {
    if (document.hidden) return;
    document.removeEventListener("visibilitychange", onVisible);
    fn();
  };
  document.addEventListener("visibilitychange", onVisible);
}

let lenis: Lenis | null = null;

/** Lenis is global and survives view transitions; ScrollTriggers do not. */
function initSmoothScroll() {
  if (lenis || prefersReduced()) return;

  lenis = new Lenis({ duration: 1.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Honour the preloader's scroll lock. `overflow: hidden` on html/body —
  // which is what the lock does in CSS — only blocks the browser's own
  // scrolling. Lenis takes the wheel event and moves the page by *script*,
  // and scripted scrolling ignores overflow entirely, so with Lenis running
  // the CSS lock is decorative and the user can wheel through the whole
  // site behind the curtain. Stopping Lenis is the half that actually
  // holds; the CSS half still covers the moment before this module loads.
  if (document.documentElement.dataset.preloading) {
    lenis.stop();
    // Preloader dispatches this as the curtain starts lifting.
    document.addEventListener("elden:intro", () => lenis?.start(), { once: true });
  }
}

export function getLenis() {
  return lenis;
}

/**
 * Wrap each word in a masked span so it can slide up from behind its own
 * overflow box. Idempotent — re-running on the same element is a no-op.
 */
export function splitWords(el: HTMLElement) {
  if (el.dataset.split === "true") return;

  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";

  words.forEach((word, i) => {
    // Real CSS classes (see global.css), not Tailwind utilities — these are
    // created at runtime and would never be seen by the class scanner.
    const mask = document.createElement("span");
    mask.className = "word-mask";

    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = word;

    mask.appendChild(inner);
    el.appendChild(mask);
    // A real space between masks, so line-breaking and screen readers behave.
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });

  el.dataset.split = "true";
}

function initReveals() {
  // Per-word settle. Measured: opacity 0.001 -> 1 with translateY of 19px on
  // large type and 10px on small, staggered 0.1s per word over 0.6s.
  document.querySelectorAll<HTMLElement>("[data-reveal-words]").forEach((el) => {
    splitWords(el);
    const inners = el.querySelectorAll(":scope > span > span");
    const short = el.dataset.revealWords === "sm";
    gsap.from(inners, {
      opacity: 0.001,
      y: short ? 10 : 19,
      duration: 0.6,
      ease: "settle",
      // The reference's own 0.1s/word, capped so a 45-word statement
      // paragraph doesn't crawl for four and a half seconds. Short headings —
      // which is most call sites — get the full measured beat.
      stagger: Math.min(0.1, 2.5 / Math.max(inners.length, 1)),
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // Scroll-scrubbed word-by-word reveal: each word's opacity is tied
  // directly to scroll progress through the paragraph, not a one-time
  // stagger on enter. Words brighten in sequence as the page scrolls
  // and dim back if you scroll up — the reading pace sets the reveal pace,
  // not a fixed animation duration.
  document.querySelectorAll<HTMLElement>("[data-scroll-words]").forEach((el) => {
    splitWords(el);
    // No y-translate here, so the slide-up mask has no job except clipping
    // descenders — same fix as the hero headline.
    el.querySelectorAll<HTMLElement>(".word-mask").forEach((mask) => {
      mask.style.overflow = "visible";
    });
    const inners = el.querySelectorAll(":scope > span > span");
    gsap.set(inners, { opacity: 0.15 });
    gsap.to(inners, {
      opacity: 1,
      ease: "none",
      stagger: 1 / Math.max(inners.length, 1),
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
    });
  });

  // Dividers grow from the left rather than simply appearing. This is one of
  // the reference's quietest and most characteristic moves, and the thing
  // that made our `.rule` hairlines feel inert by comparison.
  document.querySelectorAll<HTMLElement>("[data-reveal-rule]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
  });

  // Gallery/column imagery: measured at y 20 + scale 0.75 on the reference.
  document.querySelectorAll<HTMLElement>("[data-reveal-media]").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      scale: 0.75,
      duration: 0.8,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Generic rise. The reference uses distinct offsets per element type —
  // dots 23px, buttons 31px, the whole footer 300px — so the distance is a
  // parameter rather than three near-identical attributes.
  document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
    const y = Number(el.dataset.rise) || 24;
    gsap.from(el, {
      y,
      opacity: 0,
      duration: 0.8,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Block-level clip wipe. Wipes rather than fades — a fade is the default
  // tell; a wipe reads as editorial.
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.1,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // Large panel photography settles rather than appearing. Kept distinct from
  // data-reveal-media: a 0.75 scale-up reads fine on a 291px column image and
  // badly on a full-viewport panel.
  document.querySelectorAll<HTMLElement>("[data-settle]").forEach((el) => {
    gsap.from(el, {
      scale: 1.05,
      duration: 1,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.3;
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

export function initMotion() {
  // Reduced motion: no Lenis, no tweens. The CSS final state is the page.
  if (prefersReduced()) return;

  initSmoothScroll();
  initReveals();
  initParallax();
  ScrollTrigger.refresh();
}

if (typeof document !== "undefined") {
  // astro:page-load fires on the initial load *and* on every client-side
  // navigation, so this single listener covers both. Calling initMotion()
  // at module scope as well would double-fire it.
  document.addEventListener("astro:page-load", () => whenVisible(initMotion));

  document.addEventListener("astro:before-swap", () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  });
}
