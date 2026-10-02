import { describe, it, expect } from "vitest";
import { generateBaseSlug, isUUID } from "@/lib/slug";

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

describe("isUUID", () => {
  it("recognizes standard lowercase UUIDs", () => {
    expect(isUUID("d4c0cbca-ac38-41e4-bb7d-a0978ef19ef2")).toBe(true);
    expect(isUUID("b214740f-ae4a-448a-b477-6b47e1f7b290")).toBe(true);
  });

  it("recognizes uppercase and trimmed UUIDs", () => {
    expect(isUUID("D4C0CBCA-AC38-41E4-BB7D-A0978EF19EF2")).toBe(true);
    expect(isUUID("  d4c0cbca-ac38-41e4-bb7d-a0978ef19ef2  ")).toBe(true);
  });

  it("returns false for non-UUID slugs and invalid formats", () => {
    expect(isUUID("why-you're-profitable-on-paper-but-broke-in-the-bank")).toBe(false);
    expect(isUUID("not-a-uuid")).toBe(false);
    expect(isUUID("")).toBe(false);
    expect(isUUID(null as any)).toBe(false);
    expect(isUUID(undefined as any)).toBe(false);
  });
});
