export type TrafficSource = "google" | "linkedin" | "twitter" | "instagram" | "direct";

export const TRAFFIC_SOURCES: TrafficSource[] = [
  "google",
  "linkedin",
  "twitter",
  "instagram",
  "direct",
];

export const TRAFFIC_SOURCE_LABELS: Record<TrafficSource, string> = {
  google: "Google Search",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  instagram: "Instagram",
  direct: "Direct / Other",
};

/**
 * Normalizes an incoming HTTP referrer or client document.referrer into
 * one of our 5 tracked sources: google, linkedin, twitter, instagram, direct.
 *
 * Handles standard web domains, link shorteners / shims (t.co, lnkd.in, l.instagram.com),
 * country code TLDs (google.co.in, google.de, etc.), and Android app referrers.
 */
export function detectTrafficSource(rawReferrer?: string | null): TrafficSource {
  if (!rawReferrer) return "direct";

  const trimmed = rawReferrer.trim().toLowerCase();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") {
    return "direct";
  }

  // 1. Android app referrer schemes (e.g. android-app://com.google.android.googlequicksearchbox)
  if (trimmed.startsWith("android-app://")) {
    if (trimmed.includes("com.linkedin.android")) return "linkedin";
    if (trimmed.includes("com.twitter.android")) return "twitter";
    if (trimmed.includes("com.instagram.android")) return "instagram";
    if (trimmed.includes("com.google.android")) return "google";
    return "direct";
  }

  // 2. Parse standard URL or hostname
  let hostname = "";
  try {
    const url = new URL(trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`);
    hostname = url.hostname.toLowerCase();
  } catch {
    // If not a valid URL, check direct substring
    hostname = trimmed;
  }

  // Strip leading www.
  hostname = hostname.replace(/^www\./, "");

  // LinkedIn (linkedin.com, lnkd.in)
  if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com") || hostname === "lnkd.in" || hostname.endsWith(".lnkd.in")) {
    return "linkedin";
  }

  // Twitter / X (twitter.com, x.com, t.co)
  if (
    hostname === "twitter.com" ||
    hostname.endsWith(".twitter.com") ||
    hostname === "x.com" ||
    hostname.endsWith(".x.com") ||
    hostname === "t.co" ||
    hostname.endsWith(".t.co")
  ) {
    return "twitter";
  }

  // Instagram (instagram.com, l.instagram.com link shim)
  if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
    return "instagram";
  }

  // Google (google.com, google.co.in, google.co.uk, google.ca, etc.)
  if (hostname === "google.com" || /(^|\.)google\.[a-z]{2,}(\.[a-z]{2})?$/.test(hostname)) {
    return "google";
  }

  // Ignore internal domain as referrer (counts as direct navigation)
  if (
    hostname.includes("therelay.co") ||
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1")
  ) {
    return "direct";
  }

  return "direct";
}

/**
 * Retrieves the session referrer on the client side.
 * Preserves the original external referrer (LinkedIn, Twitter, Instagram, Google)
 * across client-side SPA navigation in the current browser session.
 */
export function getSessionReferrer(): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }

  const currentReferrer = document.referrer || "";
  const detected = detectTrafficSource(currentReferrer);

  if (detected !== "direct") {
    try {
      sessionStorage.setItem("relay_session_referrer", currentReferrer);
    } catch (_) {}
    return currentReferrer;
  }

  try {
    const saved = sessionStorage.getItem("relay_session_referrer");
    if (saved) return saved;
  } catch (_) {}

  return currentReferrer;
}

