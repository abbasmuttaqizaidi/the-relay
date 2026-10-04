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
 * Safely sign out the user and navigate to the landing page.
 *
 * Why this is necessary:
 * 1. Clerk manages its own session lifecycle, cookies, and tokens.
 *    Destructive manual clearing of `document.cookie` or calling `localStorage.clear()`
 *    breaks Clerk's internal sync, CSRF tokens, and router cache, causing client-side exceptions.
 * 2. Calling TanStack Router `navigate({ to: "/" })` during sign-out races with
 *    protected route `useEffect` hooks that simultaneously call `navigate({ to: "/login" })`,
 *    leading to conflicting navigation errors and React rendering crashes with null user state.
 * 3. Setting `relay_is_signing_out` immediately mutes protected route login redirects
 *    and displays a smooth transition screen, preventing any 1-2 second flash of the error boundary.
 * 4. A hard redirect via `window.location.href = "/"` completely unmounts the app,
 *    clears in-memory query caches and WebSockets, and re-initializes on the clean public landing page.
 */
export async function safeSignOut(signOut: (options?: any) => Promise<any> | void): Promise<void> {
  // 1. Immediately flag signing out and notify React tree
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("relay_is_signing_out", "true");
      window.dispatchEvent(new Event("relay:signing_out"));
      notifySigningOut();

      // Clear app-specific storage keys ONLY (do not wipe Clerk's internal storage or cookies)
      localStorage.removeItem("relay_account_mode");
      localStorage.removeItem("relay.profile.v1");
      sessionStorage.removeItem("relay_auth_return_url");
    }
  } catch (err) {
    console.warn("Non-fatal storage cleanup error:", err);
  }

  // 2. Perform Clerk sign out with redirectUrl
  try {
    await signOut({ redirectUrl: "/" });
  } catch (err) {
    console.error("Clerk signOut error:", err);
  } finally {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("relay_is_signing_out");
      }
    } catch (_) {}

    // 3. Guaranteed hard navigation/reload to landing page
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }
  }
}
