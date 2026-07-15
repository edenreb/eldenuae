import { Link } from "@tanstack/react-router";
import eldenLogo from "@/assets/elden-logo.svg.asset.json";


export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-elden-blue-deep text-primary-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-elden-green/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
              Let's build something enduring
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] text-balance md:text-7xl">
              Converting places into spaces.
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-elden-green px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              Start a project <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="text-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary-foreground/50">
              Studio
            </p>
            <p className="leading-relaxed text-primary-foreground/80">
              Elden Interior Design LLC<br />
              Al Quoz Industrial Area 2<br />
              Opposite Planet Eco<br />
              Dubai, United Arab Emirates
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary-foreground/50">
              Contact
            </p>
            <p className="leading-relaxed text-primary-foreground/80">
              info@eldenuae.com<br />
              +971 4 227 6206
            </p>
            <p className="mt-6 mb-2 text-xs uppercase tracking-[0.3em] text-primary-foreground/50">
              Sitemap
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-primary-foreground/80">
              <Link to="/projects">Projects</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About</Link>
              <Link to="/blogs">Journal</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50">
          <div className="flex items-center gap-4">
            <img src={eldenLogo.url} alt="Elden" className="h-6 w-auto brightness-0 invert opacity-80" />
            <p>© {new Date().getFullYear()} Elden Interior Design LLC. All rights reserved.</p>
          </div>
          <p>Interior Fit-out · Joinery · MEP · Dubai, UAE</p>
        </div>

      </div>
    </footer>
  );
}
