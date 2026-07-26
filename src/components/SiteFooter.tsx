import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary-foreground/50">
              Enquiries
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[1.02] text-balance md:text-7xl">
              Every enduring space begins with a single line.
            </h2>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-4 border-b border-primary-foreground/50 pb-2 text-[11px] uppercase tracking-[0.35em] transition hover:border-primary-foreground"
            >
              Begin the enquiry <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="text-sm leading-relaxed text-primary-foreground/75">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-primary-foreground/45">
              Studio
            </p>
            <p>
              Elden Interior Design LLC<br />
              Al Quoz Industrial Area 2<br />
              Opposite Planet Eco<br />
              Dubai, United Arab Emirates
            </p>
          </div>

          <div className="text-sm leading-relaxed text-primary-foreground/75">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-primary-foreground/45">
              Contact
            </p>
            <p>
              info@eldenuae.com<br />
              +971 4 227 6206
            </p>
            <p className="mt-8 mb-3 text-[10px] uppercase tracking-[0.35em] text-primary-foreground/45">
              Index
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/projects">Work</Link>
              <Link to="/services">Capabilities</Link>
              <Link to="/about">Studio</Link>
              <Link to="/blogs">Journal</Link>
              <Link to="/contact">Enquire</Link>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/45">
          <div className="flex items-center gap-6">
            <img src="/logo.svg" alt="Elden" className="h-5 w-auto brightness-0 invert opacity-70" />
            <p>© {new Date().getFullYear()} Elden Interior Design LLC</p>
          </div>
          <p>Interior Fit-out · Joinery · MEP · Dubai</p>
        </div>
      </div>
    </footer>
  );
}
