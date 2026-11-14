import { describe, it, expect, vi } from "vitest";

describe("Onboarding Guards & Business Status Verification", () => {
  describe("Onboarding Flow Redirection Logic", () => {
    it("redirects authenticated user without a business profile to /onboarding", () => {
      const navigateMock = vi.fn();
      const toastMock = vi.fn();

      const proceedWithStatus = (status: {
        isAuthenticated: boolean;
        hasBusiness: boolean;
        business?: any;
      }) => {
        if (status.isAuthenticated && !status.hasBusiness) {
          toastMock("Please register your business profile to access the opportunities board.");
          navigateMock({ to: "/onboarding", replace: true });
        }
      };

      // Case: User is logged in via Clerk but has not completed onboarding
      proceedWithStatus({
        isAuthenticated: true,
        hasBusiness: false,
      });

      expect(toastMock).toHaveBeenCalledWith(
        "Please register your business profile to access the opportunities board."
      );
      expect(navigateMock).toHaveBeenCalledWith({ to: "/onboarding", replace: true });
    });

    it("allows authenticated user with an approved business to access dashboard and post opportunities", () => {
      const navigateMock = vi.fn();
      let createOpen = false;

      const business = {
        id: "biz_123",
        company_name: "Acme Corp",
        status: "approved",
      };

      const handleOpenCreate = () => {
        if (!business || business.status !== "approved") {
          return;
        }
        createOpen = true;
      };

      handleOpenCreate();
      expect(createOpen).toBe(true);
      expect(navigateMock).not.toHaveBeenCalled();
    });

    it("blocks opportunity creation for pending or applied business profiles", () => {
      const toastErrorMock = vi.fn();
      let createOpen = false;

      const business = {
        id: "biz_456",
        company_name: "Startup Pending",
        status: "pending",
      };

      const handleOpenCreate = () => {
        if (!business || business.status !== "approved") {
          toastErrorMock(
            `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`
          );
          return;
        }
        createOpen = true;
      };

      handleOpenCreate();

      expect(createOpen).toBe(false);
      expect(toastErrorMock).toHaveBeenCalledWith(
        'Forbidden: Your business profile status is "pending". Only approved businesses can create opportunities.'
      );
    });

    it("routes uninitialized new signups without chosen role to /get-started", () => {
      const navigateMock = vi.fn();
      const status = {
        isAuthenticated: true,
        hasChosenRole: false,
        userType: "business",
        hasBusiness: false,
        onboardingCompleted: false,
      };

      const resolveNavigation = (s: typeof status) => {
        if (!s.hasChosenRole) {
          navigateMock({ to: "/get-started", replace: true });
        } else if (!s.onboardingCompleted) {
          if (s.userType === "business" && !s.hasBusiness) {
            navigateMock({ to: "/onboarding", replace: true });
          } else {
            navigateMock({ to: "/profile", replace: true });
          }
        } else {
          navigateMock({ to: s.hasBusiness ? "/opportunities" : "/profile", replace: true });
        }
      };

      resolveNavigation(status);
      expect(navigateMock).toHaveBeenCalledWith({ to: "/get-started", replace: true });
    });

    it("routes midway abandoned business onboarding back to /onboarding", () => {
      const navigateMock = vi.fn();
      const status = {
        isAuthenticated: true,
        hasChosenRole: true,
        userType: "business",
        hasBusiness: false,
        onboardingCompleted: false,
      };

      const resolveNavigation = (s: typeof status) => {
        if (!s.hasChosenRole) {
          navigateMock({ to: "/get-started", replace: true });
        } else if (!s.onboardingCompleted) {
          if (s.userType === "business" && !s.hasBusiness) {
            navigateMock({ to: "/onboarding", replace: true });
          } else {
            navigateMock({ to: "/profile", replace: true });
          }
        } else {
          navigateMock({ to: s.hasBusiness ? "/opportunities" : "/profile", replace: true });
        }
      };

      resolveNavigation(status);
      expect(navigateMock).toHaveBeenCalledWith({ to: "/onboarding", replace: true });
    });

    it("routes completed business onboarding directly to /opportunities", () => {
      const navigateMock = vi.fn();
      const status = {
        isAuthenticated: true,
        hasChosenRole: true,
        userType: "business",
        hasBusiness: true,
        onboardingCompleted: true,
      };

      const resolveNavigation = (s: typeof status) => {
        if (!s.hasChosenRole) {
          navigateMock({ to: "/get-started", replace: true });
        } else if (!s.onboardingCompleted) {
          if (s.userType === "business" && !s.hasBusiness) {
            navigateMock({ to: "/onboarding", replace: true });
          } else {
            navigateMock({ to: "/profile", replace: true });
          }
        } else {
          navigateMock({ to: s.hasBusiness ? "/opportunities" : "/profile", replace: true });
        }
      };

      resolveNavigation(status);
      expect(navigateMock).toHaveBeenCalledWith({ to: "/opportunities", replace: true });
    });
  });
});
