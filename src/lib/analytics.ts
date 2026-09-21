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
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

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
  search: string | Record<string, unknown> = "",
): void {
  if (typeof window === "undefined" || !import.meta.env.PROD) return;

  initAnalytics();

  let searchStr = "";
  if (typeof search === "string") {
    searchStr = search;
  } else if (search && typeof search === "object" && Object.keys(search).length > 0) {
    searchStr = `?${new URLSearchParams(search as Record<string, string>).toString()}`;
  }

  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${pathname}${searchStr}`,
    page_path: `${pathname}${searchStr}`,
  });
}
