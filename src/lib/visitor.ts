/**
 * Client-side visitor identification and view tracking helper.
 * Provides persistent visitor ID and cross-browser hardware device fingerprinting
 * to prevent view inflation across different browsers (Chrome, Safari, Firefox, WebViews) on the same mobile device.
 */

/**
 * Generates a stable hardware-level device fingerprint that is consistent
 * across different browsers (Chrome, Safari, Firefox, in-app WebViews) on the same physical mobile device.
 */
export function getDeviceHardwareFingerprint(): string {
  if (typeof window === "undefined" || typeof screen === "undefined" || typeof navigator === "undefined") {
    return "";
  }

  try {
    // 1. Screen resolution & orientation-independent dimensions
    const width = screen.width || 0;
    const height = screen.height || 0;
    const minRes = Math.min(width, height);
    const maxRes = Math.max(width, height);
    const dpr = Math.round((window.devicePixelRatio || 1) * 100) / 100;
    const colorDepth = screen.colorDepth || 24;

    // 2. Hardware capabilities
    const touchPoints = navigator.maxTouchPoints || 0;
    const cores = navigator.hardwareConcurrency || 4;

    // 3. Timezone
    let timeZone = "UTC";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch (_) {}

    // 4. OS / Platform family
    const platform = (navigator.platform || "").toLowerCase();
    const userAgent = (navigator.userAgent || "").toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(platform) || /iphone|ipad|ipod/.test(userAgent) || (/mac/.test(platform) && touchPoints > 1);
    const isAndroid = /android/.test(userAgent) || /arm/.test(platform);
    const osFamily = isIOS ? "ios" : isAndroid ? "android" : platform.slice(0, 10);

    // 5. WebGL hardware GPU renderer (identical across WebKit/Blink on the same GPU)
    let gpuRenderer = "";
    try {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (gl) {
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (ext) {
          gpuRenderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "").trim();
        }
      }
    } catch (_) {}

    // 6. Stable hardware features (exclude 2D canvas to maintain parity with iOS 17+ Private Browsing)
    const raw = [minRes, maxRes, dpr, colorDepth, touchPoints, cores, timeZone, osFamily, gpuRenderer].join("|");

    // Fast 32-bit FNV-1a hash
    let hash = 0x811c9dc5;
    for (let i = 0; i < raw.length; i++) {
      hash ^= raw.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, "0");

    return `dfp_${minRes}x${maxRes}_${hex}`;
  } catch {
    return "";
  }
}

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let vid = localStorage.getItem("relay_vid");
    if (!vid) {
      const dfp = getDeviceHardwareFingerprint();
      vid = (dfp ? `${dfp}_` : "v_") + Math.random().toString(36).substring(2, 9);
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
    const dfp = getDeviceHardwareFingerprint();
    return Boolean(
      localStorage.getItem(`relay_viewed_${vid || "anon"}_${itemType}_${itemId}`) ||
      (dfp && localStorage.getItem(`relay_viewed_${dfp}_${itemType}_${itemId}`))
    );
  } catch {
    return false;
  }
}

export function markViewedLocally(itemType: "question" | "knowledge" | "opportunity", itemId: string): void {
  if (typeof window === "undefined" || !itemId) return;
  try {
    const vid = getOrCreateVisitorId();
    const dfp = getDeviceHardwareFingerprint();
    localStorage.setItem(`relay_viewed_${vid || "anon"}_${itemType}_${itemId}`, "1");
    if (dfp) {
      localStorage.setItem(`relay_viewed_${dfp}_${itemType}_${itemId}`, "1");
    }
  } catch (_) {}
}
