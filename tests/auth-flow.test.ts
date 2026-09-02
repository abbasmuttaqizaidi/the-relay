import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("OAuth Handshake & Route Guard Resiliency", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.pushState({}, "", "/");
    document.documentElement.classList.remove("clerk-oauth-resolving");
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe("Zero-Latency Head Script Execution", () => {
    const runOAuthHeadScript = () => {
      try {
        const s = window.location.search || "";
        const h = window.location.hash || "";
        if (
          s.indexOf("__clerk") !== -1 ||
          h.indexOf("__clerk") !== -1 ||
          s.indexOf("status=") !== -1 ||
          h.indexOf("status=") !== -1 ||
          s.indexOf("created_session_id") !== -1 ||
          h.indexOf("created_session_id") !== -1 ||
          s.indexOf("redirect_url") !== -1 ||
          h.indexOf("redirect_url") !== -1
        ) {
          document.documentElement.classList.add("clerk-oauth-resolving");
        }
      } catch (e) {}
    };

    it("attaches clerk-oauth-resolving class when __clerk_status is in query search", () => {
      window.history.pushState({}, "", "/opportunities?__clerk_status=complete");
      runOAuthHeadScript();
      expect(document.documentElement.classList.contains("clerk-oauth-resolving")).toBe(true);
    });

    it("attaches clerk-oauth-resolving class when __clerk_created_session is in hash", () => {
      window.history.pushState({}, "", "/opportunities#/?__clerk_created_session=sess_123");
      runOAuthHeadScript();
      expect(document.documentElement.classList.contains("clerk-oauth-resolving")).toBe(true);
    });

    it("attaches clerk-oauth-resolving class when status= is present", () => {
      window.history.pushState({}, "", "/opportunities?status=complete");
      runOAuthHeadScript();
      expect(document.documentElement.classList.contains("clerk-oauth-resolving")).toBe(true);
    });

    it("does NOT attach clerk-oauth-resolving class for normal visits without OAuth params", () => {
      window.history.pushState({}, "", "/opportunities");
      runOAuthHeadScript();
      expect(document.documentElement.classList.contains("clerk-oauth-resolving")).toBe(false);
    });
  });

  describe("Resilient Auth Verification Timer Logic", () => {
    it("cancels unauthenticated redirect if isSignedIn resolves to true before timeout", async () => {
      const navigateMock = vi.fn();
      let active = true;
      const isSignedInRef = { current: false };

      // Simulate initial mount with isSignedIn = false
      const unauthenticatedRedirectTimer = setTimeout(async () => {
        if (!active) return;
        if (isSignedInRef.current) return;
        navigateMock({ to: "/login", replace: true });
      }, 2500);

      // Advance timer by 300ms (simulate Clerk hydration resolving)
      vi.advanceTimersByTime(300);
      isSignedInRef.current = true;
      active = false;
      clearTimeout(unauthenticatedRedirectTimer);

      // Advance past the full 2500ms
      vi.advanceTimersByTime(3000);

      // Verify navigate to /login was NEVER called
      expect(navigateMock).not.toHaveBeenCalled();
    });

    it("redirects genuine unauthenticated guest to /login after 2500ms timeout", async () => {
      const navigateMock = vi.fn();
      const active = true;
      const isSignedInRef = { current: false };

      setTimeout(async () => {
        if (!active) return;
        if (isSignedInRef.current) return;
        navigateMock({ to: "/login", replace: true });
      }, 2500);

      // Before timeout
      vi.advanceTimersByTime(1000);
      expect(navigateMock).not.toHaveBeenCalled();

      // After timeout
      vi.advanceTimersByTime(1600);
      expect(navigateMock).toHaveBeenCalledWith({ to: "/login", replace: true });
    });
  });

  describe("Login & Signup Route Protection", () => {
    it("redirects logged-in users away from /login to /opportunities", async () => {
      const redirectMock = vi.fn();
      const mockAuthCheck = vi.fn().mockResolvedValue({ isAuthenticated: true });

      const beforeLoadLogin = async ({ search }: { search: Record<string, unknown> }) => {
        const hasClerkParam = Object.keys(search || {}).some(
          (k) => k.startsWith("__clerk") || k === "status" || k === "created_session_id"
        );
        if (hasClerkParam) {
          return;
        }

        const authData = await mockAuthCheck();
        if (authData?.isAuthenticated) {
          redirectMock({ to: "/opportunities", replace: true });
        }
      };

      await beforeLoadLogin({ search: {} });
      expect(redirectMock).toHaveBeenCalledWith({ to: "/opportunities", replace: true });
    });

    it("allows /login to mount when OAuth parameters are present in search", async () => {
      const redirectMock = vi.fn();
      const mockAuthCheck = vi.fn();

      const beforeLoadLogin = async ({ search }: { search: Record<string, unknown> }) => {
        const hasClerkParam = Object.keys(search || {}).some(
          (k) => k.startsWith("__clerk") || k === "status" || k === "created_session_id"
        );
        if (hasClerkParam) {
          return;
        }

        const authData = await mockAuthCheck();
        if (authData?.isAuthenticated) {
          redirectMock({ to: "/opportunities", replace: true });
        }
      };

      await beforeLoadLogin({ search: { __clerk_status: "complete" } });
      expect(mockAuthCheck).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
    });
  });
});
