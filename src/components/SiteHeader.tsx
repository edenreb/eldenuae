import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import eldenLogo from "@/assets/elden-logo.svg.asset.json";


const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  // Only the home hero starts with a dark image behind the nav.
  const useLightText = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-4 md:inset-x-8 top-4 z-50 rounded-2xl transition-all duration-500 ${
        useLightText
          ? "bg-transparent text-primary-foreground"
          : "bg-background/60 backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/5 text-foreground"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Elden"
            className={`h-7 w-auto md:h-8 transition ${useLightText ? "brightness-0 invert" : ""}`}
          />
          <span className="hidden sm:flex flex-col leading-none">
          </span>
        </Link>


        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "!text-elden-green" }}
              className="rounded-full px-4 py-2 text-sm font-medium opacity-90 transition hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-elden-blue px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-elden-blue-deep md:inline-flex"
        >
          Start a project
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur ${
            useLightText
              ? "border-white/40 bg-white/10"
              : "border-border/70 bg-background/70"
          }`}
        >
          <div className="relative h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted"
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
