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
 * 3. A hard redirect via `window.location.href = "/"` completely unmounts the app,
 *    clears in-memory query caches and WebSockets, and re-initializes on the clean public landing page.
 */
export async function safeSignOut(signOut: (options?: any) => Promise<any> | void): Promise<void> {
  // 1. Clear application-specific storage keys ONLY (do not wipe Clerk's internal storage or cookies)
  try {
    if (typeof window !== "undefined") {
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
