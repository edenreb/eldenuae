import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-4 font-display text-6xl text-foreground">Space not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for isn't part of our current portfolio.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 border border-foreground px-6 py-3 text-[11px] uppercase tracking-[0.3em] transition hover:bg-foreground hover:text-background"
        >
          Return to Index
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something interrupted the render. Refresh, or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-foreground px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-foreground hover:text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elden — Interior Fit-out, Joinery & MEP in Dubai" },
      {
        name: "description",
        content:
          "Elden is a Dubai interior fit-out, joinery and MEP studio delivering considered, enduring spaces across hospitality, retail and commercial sectors.",
      },
      { name: "author", content: "Elden Interior Design LLC" },
      { name: "theme-color", content: "#1a1a17" },
      { property: "og:title", content: "Elden — Interior Fit-out, Joinery & MEP in Dubai" },
      {
        property: "og:description",
        content: "A Dubai studio delivering considered, enduring interiors since 2016.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Elden Interior Design" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/icon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;350;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
