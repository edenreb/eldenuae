import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Work" },
  { to: "/services", label: "Capabilities" },
  { to: "/about", label: "Studio" },
  { to: "/blogs", label: "Journal" },
  { to: "/contact", label: "Enquire" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero
          ? "text-primary-foreground"
          : "text-foreground bg-background/85 backdrop-blur-md border-b border-border/70"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Elden"
            className={`h-6 w-auto md:h-7 transition duration-500 ${overHero ? "brightness-0 invert" : ""}`}
          />
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.35em] opacity-60">
            Est. 2016 · Dubai
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "!opacity-100 border-current" }}
              className="border-b border-transparent pb-1 text-[11px] uppercase tracking-[0.28em] opacity-70 transition hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-current/40"
        >
          <div className="relative h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1px] w-full bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1px] w-full bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background text-foreground">
          <div className="mx-auto flex max-w-[1600px] flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-4 text-[11px] uppercase tracking-[0.28em]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
