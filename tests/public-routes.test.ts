import { describe, it, expect } from "vitest";
import { isPublicSeoRoute } from "../src/lib/public-routes";

describe("Public Route Access Audit & Boundaries", () => {
  describe("6 Target SEO routes flagged in Google Search Console", () => {
    it("classifies /distribution-partners as public SEO route", () => {
      expect(isPublicSeoRoute("/distribution-partners")).toBe(true);
      expect(isPublicSeoRoute("/distribution-partners/")).toBe(true);
    });

    it("classifies /b2b-referral-network as public SEO route", () => {
      expect(isPublicSeoRoute("/b2b-referral-network")).toBe(true);
      expect(isPublicSeoRoute("/b2b-referral-network/")).toBe(true);
    });

    it("classifies /channel-partnerships as public SEO route", () => {
      expect(isPublicSeoRoute("/channel-partnerships")).toBe(true);
      expect(isPublicSeoRoute("/channel-partnerships/")).toBe(true);
    });

    it("classifies /referral-partnerships as public SEO route", () => {
      expect(isPublicSeoRoute("/referral-partnerships")).toBe(true);
      expect(isPublicSeoRoute("/referral-partnerships/")).toBe(true);
    });

    it("classifies /b2b-lead-exchange as public SEO route", () => {
      expect(isPublicSeoRoute("/b2b-lead-exchange")).toBe(true);
      expect(isPublicSeoRoute("/b2b-lead-exchange/")).toBe(true);
    });

    it("classifies /b2b-opportunity-exchange as public SEO route", () => {
      expect(isPublicSeoRoute("/b2b-opportunity-exchange")).toBe(true);
      expect(isPublicSeoRoute("/b2b-opportunity-exchange/")).toBe(true);
    });
  });

  describe("Other public SEO marketing and foundational routes", () => {
    const otherPublicRoutes = [
      "/",
      "/solutions",
      "/about",
      "/core-pillars",
      "/trust-and-safety",
      "/faq",
      "/8-step-journey",
      "/eight-step-journey",
      "/network",
      "/b2b-partnership-network",
      "/agency-lead-exchange",
      "/how-to-find-distribution-partners",
      "/how-to-find-b2b-referral-partners",
      "/how-to-exchange-business-leads",
      "/how-to-monetize-unqualified-leads",
      "/what-to-do-with-unqualified-leads",
      "/insights",
    ];

    it.each(otherPublicRoutes)("classifies %s as public SEO route", (route) => {
      expect(isPublicSeoRoute(route)).toBe(true);
      expect(isPublicSeoRoute(`${route}/`)).toBe(true);
    });

    it("classifies dynamic public question insight URLs as public SEO routes", () => {
      expect(isPublicSeoRoute("/insights/how-to-earn-in-dollars")).toBe(true);
      expect(isPublicSeoRoute("/insights/how-to-earn-in-dollars/")).toBe(true);
    });

    it("classifies dynamic public knowledge playbooks as public SEO routes", () => {
      expect(
        isPublicSeoRoute(
          "/insights/knowledge/why-you-are-profitable-on-paper-but-broke-in-the-bank"
        )
      ).toBe(true);
    });
  });

  describe("Protected/private application routes (MUST remain protected)", () => {
    const protectedRoutes = [
      "/dashboard",
      "/opportunities",
      "/opportunities/my",
      "/proposals",
      "/requests/incoming",
      "/requests/sent",
      "/connections",
      "/connections/conn_123",
      "/saved-opportunities",
      "/post",
      "/onboarding",
      "/business-profile",
      "/admin",
      "/admin/users",
      "/my-relay",
      "/query-relay",
      "/design-system",
      "/login",
      "/signup",
      "/sso-callback",
      "/_serverFn",
      "/_serverFn/createOpportunity",
    ];

    it.each(protectedRoutes)("ensures %s is NOT marked as public SEO route", (route) => {
      expect(isPublicSeoRoute(route)).toBe(false);
    });

    it("ensures contributor creation/edit routes are NOT marked as public SEO routes", () => {
      expect(isPublicSeoRoute("/insights/ask")).toBe(false);
      expect(isPublicSeoRoute("/insights/knowledge/new")).toBe(false);
      expect(isPublicSeoRoute("/insights/knowledge/art_123/edit")).toBe(false);
    });
  });
});
