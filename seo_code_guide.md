The implementation we should add
Create:
src/lib/analytics.ts
/**
 * Google Analytics 4 — production-only tracking for The Relay.
 *
 * Measurement ID: G-CTQSXFFG6G
 */

const MEASUREMENT_ID = "G-CTQSXFFG6G";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __relayGaInitialized?: boolean;
  }
}

export function initAnalytics(): void {
  if (typeof window === "undefined" || !import.meta.env.PROD) return;
  if (window.__relayGaInitialized) return;

  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

  const scriptId = "relay-google-analytics";

  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src =
      `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

    document.head.appendChild(script);
  }

  window.gtag("js", new Date());

  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
  });

  window.__relayGaInitialized = true;
}

export function trackPageView(
  pathname: string,
  search = "",
): void {
  if (typeof window === "undefined" || !import.meta.env.PROD) return;

  initAnalytics();

  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location:
      `${window.location.origin}${pathname}${search}`,
    page_path: `${pathname}${search}`,
  });
}
Then in your existing:
src/routes/__root.tsx
add:
import { useRouterState } from "@tanstack/react-router";
import { initAnalytics, trackPageView } from "@/lib/analytics";
And inside RootComponent():
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const location = useRouterState({
    select: (state) => state.location,
  });

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname, location.search);
  }, [location.pathname, location.search]);

  // ...existing code
}
This approach deliberately disables automatic page views and sends them ourselves when TanStack Router changes routes. That's important for a client-side application like Relay.
Google's GA4 documentation supports installing the Google tag using the property's Measurement ID and then verifying incoming data in Realtime. 
Why I'm specifically using import.meta.env.PROD
This is the part I wanted to get right for you:
if (typeof window === "undefined" || !import.meta.env.PROD) return;
Therefore:
Localhost
→ GA4 doesn't initialize
→ no page views sent
Production
→ GA4 initializes
→ page views are recorded