import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useMatchRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { ClerkProvider } from "@clerk/tanstack-react-start";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/home"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "The Relay — Business Opportunity Network for Verified Businesses" },
      {
        name: "description",
        content:
          "An operator-grade network where verified businesses exchange partnerships, referrals, vendors and growth opportunities. No feeds. No noise. Just outcomes.",
      },
      { property: "og:title", content: "The Relay — Where growth finds momentum" },
      {
        property: "og:description",
        content: "A curated business opportunity network for verified businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var s = window.location.search || '';
                  var h = window.location.hash || '';
                  if (
                    s.indexOf('__clerk') !== -1 ||
                    h.indexOf('__clerk') !== -1 ||
                    s.indexOf('status=') !== -1 ||
                    h.indexOf('status=') !== -1 ||
                    s.indexOf('created_session_id') !== -1 ||
                    h.indexOf('created_session_id') !== -1 ||
                    s.indexOf('redirect_url') !== -1 ||
                    h.indexOf('redirect_url') !== -1
                  ) {
                    document.documentElement.classList.add('clerk-oauth-resolving');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      (function() {
        window.__insp = window.__insp || [];
        __insp.push(['wid', 2139138225]);
        var ldinsp = function(){
          if(typeof window.__inspld != "undefined") return;
          window.__inspld = 1;
          var insp = document.createElement('script');
          insp.type = 'text/javascript';
          insp.async = true;
          insp.id = "inspsync";
          insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=2139138225&r=' + Math.floor(new Date().getTime()/3600000);
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(insp, x);
        };
        setTimeout(ldinsp, 0);
      })();
    }
  }, []);
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Toaster position="bottom-right" visibleToasts={1} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
