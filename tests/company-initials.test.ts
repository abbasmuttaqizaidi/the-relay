import { describe, it, expect } from "vitest";
import { getCompanyInitials } from "../src/lib/utils";

describe("getCompanyInitials", () => {
  describe("1-word company names", () => {
    it("returns first 2 uppercase characters for a single word name", () => {
      expect(getCompanyInitials("Google")).toBe("GO");
      expect(getCompanyInitials("Acme")).toBe("AC");
      expect(getCompanyInitials("Stripe")).toBe("ST");
      expect(getCompanyInitials("relay")).toBe("RE");
    });

    it("returns single character if word has only 1 letter", () => {
      expect(getCompanyInitials("X")).toBe("X");
      expect(getCompanyInitials("a")).toBe("A");
    });
  });

  describe("2-word company names", () => {
    it("returns first characters of both words uppercase", () => {
      expect(getCompanyInitials("Nova Logistics")).toBe("NL");
      expect(getCompanyInitials("Bulyam Web")).toBe("BW");
      expect(getCompanyInitials("Cloud Scale")).toBe("CS");
      expect(getCompanyInitials("apple inc")).toBe("AI");
    });
  });

  describe("2+ word company names", () => {
    it("returns first characters of only the first 2 words uppercase", () => {
      expect(getCompanyInitials("Bulyam Web Studio")).toBe("BW");
      expect(getCompanyInitials("Apex Advanced Tech Solutions")).toBe("AA");
      expect(getCompanyInitials("International Business Machines Corporation")).toBe("IB");
      expect(getCompanyInitials("Red Hat Enterprise Linux")).toBe("RH");
    });
  });

  describe("Edge cases", () => {
    it("handles extra whitespace, trims properly", () => {
      expect(getCompanyInitials("  Google  ")).toBe("GO");
      expect(getCompanyInitials("  Nova   Logistics  ")).toBe("NL");
      expect(getCompanyInitials("  Bulyam   Web   Studio  ")).toBe("BW");
    });

    it("handles empty strings and null/undefined values gracefully", () => {
      expect(getCompanyInitials("")).toBe("CO");
      expect(getCompanyInitials("   ")).toBe("CO");
      expect(getCompanyInitials(null)).toBe("CO");
      expect(getCompanyInitials(undefined)).toBe("CO");
    });
  });
});
