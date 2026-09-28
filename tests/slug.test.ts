import { describe, it, expect } from "vitest";
import { generateBaseSlug } from "@/lib/slug";

describe("generateBaseSlug", () => {
  it("treats em-dashes as spaces and preserves intra-word apostrophes", () => {
    const title =
      "Your hiring process is scaring away your best candidates—and they’re not even telling you why.";
    const slug = generateBaseSlug(title);

    expect(slug).toBe(
      "your-hiring-process-is-scaring-away-your-best-candidates-and-they're-not-even-telling-you-why"
    );
    expect(slug).toContain("candidates-and-they're-not");
  });

  it("handles en-dashes and symbols as space separators", () => {
    const title = "Sales – Strategy & Growth (2026)";
    expect(generateBaseSlug(title)).toBe("sales-strategy-growth-2026");
  });

  it("strips outer quotes but keeps internal contraction apostrophes", () => {
    const title = "\"The Ultimate Guide\": don't do this!";
    expect(generateBaseSlug(title)).toBe("the-ultimate-guide-don't-do-this");
  });

  it("handles curly quotes and curly apostrophes properly", () => {
    const title = "“Growth” isn’t easy—it’s tough!";
    expect(generateBaseSlug(title)).toBe("growth-isn't-easy-it's-tough");
  });

  it("handles colons, slashes, and question marks as separators", () => {
    const title = "B2B/B2C Sales: What is the best strategy?";
    expect(generateBaseSlug(title)).toBe("b2b-b2c-sales-what-is-the-best-strategy");
  });

  it("falls back to insight for empty or symbol-only titles", () => {
    expect(generateBaseSlug("")).toBe("insight");
    expect(generateBaseSlug("   ")).toBe("insight");
    expect(generateBaseSlug("!@#$%^&*()_+")).toBe("insight");
  });
});
