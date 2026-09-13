import { describe, it, expect } from "vitest";
import { detectPostIntent } from "../src/lib/offer-detector";

describe("detectPostIntent classifier", () => {
  describe("Example A: Explicit Offer / Sale", () => {
    it("detects 'Providing Lead Execution System (no CRM)' as OFFER", () => {
      const result = detectPostIntent(
        "Providing Lead Execution System (no CRM)",
        "We provide a lead execution system with real-time lead capture, analytics, and workflow automation."
      );
      expect(result.intent).toBe("OFFER");
      expect(result.confidence).toBeGreaterThanOrEqual(0.8);
    });

    it("detects 'Enterprise CRM software for clinics' with selling description as OFFER", () => {
      const result = detectPostIntent(
        "Enterprise CRM software for clinics",
        "Our software provides full patient booking, billing, and automated SMS reminders. Pricing starts at $99/mo."
      );
      expect(result.intent).toBe("OFFER");
    });

    it("detects 'Offering full-stack web development services' as OFFER", () => {
      const result = detectPostIntent(
        "Offering full-stack web development services",
        "We build and deliver high-performance web applications for startups and enterprise clients. Hire us today."
      );
      expect(result.intent).toBe("OFFER");
    });
  });

  describe("Example B: Explicit Opportunity (Need / Seeking)", () => {
    it("detects 'Looking for a Lead Execution System (no CRM)' as OPPORTUNITY", () => {
      const result = detectPostIntent(
        "Looking for a Lead Execution System (no CRM)",
        "We are looking for a suitable solution to execute our leads without using a traditional CRM."
      );
      expect(result.intent).toBe("OPPORTUNITY");
    });

    it("detects 'Seeking distribution partners in Europe' as OPPORTUNITY", () => {
      const result = detectPostIntent(
        "Seeking distribution partners in Europe",
        "Looking for established B2B resellers and distributors in DACH region to expand our hardware line."
      );
      expect(result.intent).toBe("OPPORTUNITY");
    });

    it("detects hiring as OPPORTUNITY", () => {
      const result = detectPostIntent(
        "Hiring Senior Rust Systems Engineer",
        "We are looking to hire a lead architect with 5+ years of experience in distributed databases."
      );
      expect(result.intent).toBe("OPPORTUNITY");
    });
  });

  describe("Example C: Opportunity with product mention", () => {
    it("detects 'Looking for a business partner for our Lead Execution System' as OPPORTUNITY", () => {
      const result = detectPostIntent(
        "Looking for a business partner for our Lead Execution System",
        "We are looking for businesses that can help us implement/distribute the system."
      );
      expect(result.intent).toBe("OPPORTUNITY");
    });

    it("detects 'Seeking strategic advice for our Series A pitch' as OPPORTUNITY", () => {
      const result = detectPostIntent(
        "Seeking strategic advice for our Series A pitch",
        "We are seeking advisors who have scaled fintech platforms past $10M ARR to join our advisory board."
      );
      expect(result.intent).toBe("OPPORTUNITY");
    });
  });

  describe("Edge cases & Ambiguity", () => {
    it("returns AMBIGUOUS for vague or empty input", () => {
      expect(detectPostIntent("", "").intent).toBe("AMBIGUOUS");
      expect(detectPostIntent("Enterprise Growth", "General expansion plan").intent).toBe("AMBIGUOUS");
    });
  });
});
