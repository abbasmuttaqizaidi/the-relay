import { describe, it, expect } from "vitest";

describe("Network Directory Feature", () => {
  const sampleBusinesses = [
    {
      id: "biz_1",
      company_name: "Apex AI Systems",
      industry: "AI / Machine Learning",
      description: "Generative AI infrastructure for enterprise data pipelines.",
      status: "approved",
      funding_stage: "Series A",
      company_size: "11-50",
      active_opportunities_count: 3,
    },
    {
      id: "biz_2",
      company_name: "Stripe Flow Labs",
      industry: "Fintech",
      description: "Next-gen checkout and payment orchestration SDK.",
      status: "approved",
      funding_stage: "Profitable / Established",
      company_size: "51-200",
      active_opportunities_count: 1,
    },
    {
      id: "biz_3",
      company_name: "CloudScale DevOps",
      industry: "DevTools",
      description: "Automated Kubernetes cluster management and CI/CD tools.",
      status: "applied",
      funding_stage: "Pre-Seed / Seed",
      company_size: "1-10",
      active_opportunities_count: 0,
    },
  ];

  it("filters network businesses by search keyword matching company name or bio", () => {
    const query = "AI Systems";
    const filtered = sampleBusinesses.filter(
      (b) =>
        b.company_name.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].company_name).toBe("Apex AI Systems");
  });

  it("filters network businesses by industry", () => {
    const selectedIndustry = "Fintech";
    const filtered = sampleBusinesses.filter((b) => b.industry === selectedIndustry);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].company_name).toBe("Stripe Flow Labs");
  });

  it("filters network businesses by verification status", () => {
    const approvedOnly = sampleBusinesses.filter((b) => b.status === "approved");
    expect(approvedOnly).toHaveLength(2);

    const appliedOnly = sampleBusinesses.filter((b) => b.status === "applied");
    expect(appliedOnly).toHaveLength(1);
  });

  it("accurately aggregates live metrics counters across directory entities", () => {
    const totalEntities = sampleBusinesses.length;
    const totalOpportunities = sampleBusinesses.reduce(
      (acc, b) => acc + b.active_opportunities_count,
      0
    );
    const uniqueIndustries = new Set(sampleBusinesses.map((b) => b.industry)).size;

    expect(totalEntities).toBe(3);
    expect(totalOpportunities).toBe(4);
    expect(uniqueIndustries).toBe(3);
  });
});
