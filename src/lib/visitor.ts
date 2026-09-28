/**
 * Client-side visitor identification and view tracking helper.
 * Provides persistent visitor ID and local deduplication across browser sessions.
 */

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let vid = localStorage.getItem("relay_vid");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem("relay_vid", vid);
    }
    try {
      if (document && !document.cookie.includes("relay_vid=")) {
        document.cookie = `relay_vid=${vid}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch (_) {}
    return vid;
  } catch {
    return "";
  }
}

export function hasViewedLocally(itemType: "question" | "knowledge" | "opportunity", itemId: string): boolean {
  if (typeof window === "undefined" || !itemId) return false;
  try {
    const vid = getOrCreateVisitorId();
    return Boolean(localStorage.getItem(`relay_viewed_${vid || "anon"}_${itemType}_${itemId}`));
  } catch {
    return false;
  }
}

export function markViewedLocally(itemType: "question" | "knowledge" | "opportunity", itemId: string): void {
  if (typeof window === "undefined" || !itemId) return;
  try {
    const vid = getOrCreateVisitorId();
    localStorage.setItem(`relay_viewed_${vid || "anon"}_${itemType}_${itemId}`, "1");
  } catch (_) {}
}
