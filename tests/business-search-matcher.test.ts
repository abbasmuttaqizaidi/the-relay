import { describe, it, expect } from "vitest";
import {
  matchBusiness,
  searchAndRankBusinesses,
  extractWords,
  collapseAlphanumeric,
} from "../src/lib/business-search-matcher";

describe("business-search-matcher", () => {
  it("extracts words correctly from text with punctuation", () => {
    expect(extractWords("A.H. Mobile, Inc.")).toEqual(["a", "h", "mobile", "inc"]);
    expect(extractWords("A-H Mobile")).toEqual(["a", "h", "mobile"]);
    expect(extractWords("A & H Mobile")).toEqual(["a", "h", "mobile"]);
    expect(extractWords("  A   H   Mobile  ")).toEqual(["a", "h", "mobile"]);
  });

  it("collapses alphanumeric characters correctly", () => {
    expect(collapseAlphanumeric("A.H. Mobile")).toBe("ahmobile");
    expect(collapseAlphanumeric("A H")).toBe("ah");
    expect(collapseAlphanumeric("Studio-54!")).toBe("studio54");
  });

  describe("Single-character and multi-token word matching edge cases", () => {
    const ahMobile = {
      company_name: "A H Mobile",
      industry: "Telecommunications",
      hq_location: "Chicago, IL",
    };

    const ahTogether = {
      company_name: "AH Mobile",
      industry: "Electronics",
    };

    const ahDotted = {
      company_name: "A.H. Mobile",
      industry: "Retail",
    };

    const alphabetHealth = {
      company_name: "Alphabet Healthcare",
      industry: "Healthtech",
      hq_location: "New York, NY",
    };

    const amazonHealth = {
      company_name: "Amazon Health Services",
      industry: "Healthcare",
    };

    const acmeHoldings = {
      company_name: "Acme Holdings Group",
      industry: "Finance",
    };

    const nordicTech = {
      company_name: "Nordic Tech Bank",
      industry: "Banking",
      hq_location: "Oslo, Norway",
    };

    const studio54 = {
      company_name: "Studio 54 Entertainment",
      industry: "Media & Entertainment",
    };

    it("matches 'A H' for 'A H Mobile'", () => {
      const res = matchBusiness("A H", ahMobile);
      expect(res.matches).toBe(true);
      expect(res.score).toBeGreaterThan(0);
    });

    it("matches 'A H' for 'AH Mobile' and 'A.H. Mobile'", () => {
      expect(matchBusiness("A H", ahTogether).matches).toBe(true);
      expect(matchBusiness("A H", ahDotted).matches).toBe(true);
    });

    it("matches 'AH' for 'A H Mobile'", () => {
      expect(matchBusiness("AH", ahMobile).matches).toBe(true);
    });

    it("matches full query 'A H Mobile' for 'A H Mobile'", () => {
      const res = matchBusiness("A H Mobile", ahMobile);
      expect(res.matches).toBe(true);
      expect(res.score).toBeGreaterThanOrEqual(750);
    });

    it("matches 'Mobile' for 'A H Mobile'", () => {
      expect(matchBusiness("Mobile", ahMobile).matches).toBe(true);
    });

    it("matches case-insensitively with irregular whitespace", () => {
      expect(matchBusiness("  a   h   mobile ", ahMobile).matches).toBe(true);
      expect(matchBusiness("A H MOBILE", ahMobile).matches).toBe(true);
    });

    it("STRICT: does NOT match 'A H' against companies that merely contain letters A and H", () => {
      // User requirement: "aisa na ho ke koi bhe business jisme A aur H aaata ho wo mil jaaye"
      expect(matchBusiness("A H", alphabetHealth).matches).toBe(false);
      expect(matchBusiness("A H", amazonHealth).matches).toBe(false);
      expect(matchBusiness("A H", acmeHoldings).matches).toBe(false);
    });

    it("matches by industry prefix for multi-character terms", () => {
      expect(matchBusiness("Tele", ahMobile).matches).toBe(true);
      expect(matchBusiness("Banking", nordicTech).matches).toBe(true);
    });

    it("handles alphanumeric tokens such as numbers", () => {
      expect(matchBusiness("54", studio54).matches).toBe(true);
      expect(matchBusiness("Studio 54", studio54).matches).toBe(true);
    });

    it("returns all items when query is empty or spaces", () => {
      const pool = [ahMobile, nordicTech];
      expect(searchAndRankBusinesses(pool, "")).toEqual(pool);
      expect(searchAndRankBusinesses(pool, "   ")).toEqual(pool);
    });

    it("handles diacritics and accented characters gracefully", () => {
      const cafeBusiness = { company_name: "Café de Paris", industry: "Hospitality" };
      const munchenTech = { company_name: "München Innovations", industry: "Technology" };

      expect(matchBusiness("Cafe", cafeBusiness).matches).toBe(true);
      expect(matchBusiness("Café", cafeBusiness).matches).toBe(true);
      expect(matchBusiness("Munchen", munchenTech).matches).toBe(true);
      expect(matchBusiness("München", munchenTech).matches).toBe(true);
    });

    it("handles queries with special characters without regex exceptions", () => {
      expect(matchBusiness("A.H.", ahMobile).matches).toBe(true);
      expect(matchBusiness("A.H. Mobile", ahMobile).matches).toBe(true);
      expect(matchBusiness("(Test)", { company_name: "Test Corp" }).matches).toBe(true);
      expect(matchBusiness("Test?", { company_name: "Test Corp" }).matches).toBe(true);
    });

    it("ranks exact and phrase matches higher than partial matches", () => {
      const pool = [
        nordicTech,
        alphabetHealth,
        ahMobile,
        ahTogether,
        acmeHoldings,
      ];

      const results = searchAndRankBusinesses(pool, "A H");
      expect(results.length).toBeGreaterThanOrEqual(2);
      expect(results.map((r) => r.company_name)).toContain("A H Mobile");
      expect(results.map((r) => r.company_name)).toContain("AH Mobile");
      expect(results.map((r) => r.company_name)).not.toContain("Alphabet Healthcare");
      expect(results.map((r) => r.company_name)).not.toContain("Acme Holdings Group");
    });
  });
});
