import { useState, useEffect } from "react";

const signingOutListeners = new Set<() => void>();

export function isSigningOutActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem("relay_is_signing_out") === "true";
  } catch (_) {
    return false;
  }
}

export function subscribeSigningOut(listener: () => void): () => void {
  signingOutListeners.add(listener);
  return () => signingOutListeners.delete(listener);
}

export function notifySigningOut() {
  signingOutListeners.forEach((listener) => {
    try {
      listener();
    } catch (_) {}
  });
}

export function useIsSigningOut(): boolean {
  const [signingOut, setSigningOut] = useState(() => isSigningOutActive());

  useEffect(() => {
    const handle = () => setSigningOut(isSigningOutActive());
    window.addEventListener("relay:signing_out", handle);
    window.addEventListener("storage", handle);
    const unsub = subscribeSigningOut(handle);
    return () => {
      window.removeEventListener("relay:signing_out", handle);
      window.removeEventListener("storage", handle);
      unsub();
    };
  }, []);

  return signingOut;
}

/**
 * Completely clears all client-side browser storage:
 * - localStorage (all keys, profiles, cached telemetry, legal flags)
 * - sessionStorage (all session keys, return URLs, pending states)
 * - document.cookie (all client-accessible cookies across root and domain)
 * - cacheStorage (service worker and runtime caches if available)
 */
export function clearAllBrowserStorage(): void {
  if (typeof window === "undefined") return;

  // 1. Clear all localStorage
  try {
    localStorage.clear();
  } catch (err) {
    console.warn("[clearAllBrowserStorage] Failed to clear localStorage:", err);
  }

  // 2. Clear all sessionStorage
  try {
    sessionStorage.clear();
  } catch (err) {
    console.warn("[clearAllBrowserStorage] Failed to clear sessionStorage:", err);
  }

  // 3. Clear all accessible cookies
  if (typeof document !== "undefined") {
    try {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${window.location.pathname}`;
        }
      }
    } catch (err) {
      console.warn("[clearAllBrowserStorage] Failed to clear cookies:", err);
    }
  }

  // 4. Clear cache storage if available
  try {
    if ("caches" in window && typeof caches.keys === "function") {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      }).catch(() => {});
    }
  } catch (_) {}
}

/**
 * Safely sign out the user, completely clear all browser storage, and navigate to the landing page.
 *
 * Why this is necessary:
 * 1. Clerk manages its own session lifecycle, cookies, and tokens.
 * 2. Calling TanStack Router `navigate({ to: "/" })` during sign-out races with
 *    protected route `useEffect` hooks that simultaneously call `navigate({ to: "/login" })`.
 * 3. Setting `relay_is_signing_out` immediately mutes protected route login redirects
 *    and displays a smooth transition screen, preventing any flash of the error boundary.
 * 4. Completely wipes localStorage, sessionStorage, and cookies to ensure absolute zero residual state.
 * 5. A hard redirect via `window.location.href = "/"` completely unmounts the app,
 *    clears in-memory query caches and WebSockets, and re-initializes on the clean public landing page.
 */
export async function safeSignOut(
  signOutParam?: ((options?: any) => Promise<any> | void) | { signOut: (options?: any) => Promise<any> | void }
): Promise<void> {
  const signOutFn =
    typeof signOutParam === "function"
      ? signOutParam
      : signOutParam && typeof signOutParam === "object" && typeof signOutParam.signOut === "function"
        ? signOutParam.signOut
        : null;

  // 1. Immediately flag signing out and notify React tree for smooth transition
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("relay_is_signing_out", "true");
      window.dispatchEvent(new Event("relay:signing_out"));
      notifySigningOut();
    }
  } catch (err) {
    console.warn("Non-fatal storage cleanup error:", err);
  }

  // 2. Perform Clerk sign out with redirectUrl
  try {
    if (signOutFn) {
      await signOutFn({ redirectUrl: "/" });
    }
  } catch (err) {
    console.error("Clerk signOut error:", err);
  } finally {
    // 3. Completely wipe all browser storage (localStorage, sessionStorage, cookies)
    clearAllBrowserStorage();

    // 4. Guaranteed hard navigation/reload to landing page
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }
  }
}
