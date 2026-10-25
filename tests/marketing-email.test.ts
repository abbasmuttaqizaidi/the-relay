import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createMarketingUnsubscribeToken,
  prepareMarketingEmail,
  sanitizeMarketingHtml,
  verifyMarketingUnsubscribeToken,
} from "../src/lib/marketing-email.server";

describe("marketing email safety", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("strips scripts, event handlers, and unsafe link schemes while preserving email markup", () => {
    const result = sanitizeMarketingHtml(
      '<table><tr><td style="color:#123">Hello</td></tr></table><script>alert(1)</script><a href="javascript:alert(1)" onclick="alert(1)">link</a>',
    );

    expect(result).toContain("<table>");
    expect(result).toContain("color:#123");
    expect(result).not.toContain("<script");
    expect(result).not.toContain("onclick");
    expect(result).not.toContain("javascript:");
  });

  it("signs unsubscribe tokens and rejects tampering", () => {
    vi.stubEnv("MARKETING_UNSUBSCRIBE_SECRET", "a-secret-that-is-at-least-thirty-two-bytes-long");
    const token = createMarketingUnsubscribeToken("user_123", "USER@example.com");

    expect(verifyMarketingUnsubscribeToken(token)).toEqual({
      clerkUserId: "user_123",
      contactId: null,
      email: "user@example.com",
    });
    expect(verifyMarketingUnsubscribeToken(`${token}x`)).toBeNull();
  });

  it("supports signed unsubscribe tokens for directly entered email addresses", () => {
    vi.stubEnv("MARKETING_UNSUBSCRIBE_SECRET", "a-secret-that-is-at-least-thirty-two-bytes-long");
    const token = createMarketingUnsubscribeToken(null, "jane@example.com");

    expect(verifyMarketingUnsubscribeToken(token)).toEqual({
      clerkUserId: null,
      contactId: null,
      email: "jane@example.com",
    });
  });

  it("adds an opt-out link to HTML and text without requiring a postal address", () => {
    vi.stubEnv("MARKETING_UNSUBSCRIBE_SECRET", "a-secret-that-is-at-least-thirty-two-bytes-long");

    const email = prepareMarketingEmail("<p>News</p>", "user_123", "user@example.com");

    expect(email.html).toContain("News");
    expect(email.html).toContain("/unsubscribe?token=");
    expect(email.text).toContain("Unsubscribe:");
  });
});
