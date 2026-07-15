import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/60 text-foreground"
          : "backdrop-blur-md bg-background/25 text-primary-foreground"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-elden-blue text-primary-foreground">
            <span className="font-display text-lg leading-none">E</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight">Elden</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Interiors · Dubai
            </span>
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
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur"
        >
          <div className="relative h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-foreground transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-foreground transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
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
