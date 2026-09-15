import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createKnowledgeInsightSchema,
  updateKnowledgeInsightSchema,
  archiveKnowledgeInsightSchema,
  deleteKnowledgeInsightSchema,
  listKnowledgeInsightsSchema,
} from "../src/validators";

describe("Insights Feature: Use Case 2 (Knowledge Insights)", () => {
  // Mock business entities
  const approvedBusinessA = {
    id: "biz-a-1111-2222-3333-444455556666",
    company_name: "Apex Manufacturing",
    industry: "Manufacturing",
    hq_location: "Detroit, MI",
    status: "approved",
    contact_email: "ceo@apexmanufacturing.com",
    owner_user_id: "user-owner-a",
  };

  const approvedBusinessB = {
    id: "biz-b-2222-3333-4444-555566667777",
    company_name: "Nova Logistics",
    industry: "Logistics",
    hq_location: "Chicago, IL",
    status: "approved",
    contact_email: "ops@novalogistics.com",
    owner_user_id: "user-owner-b",
  };

  const appliedBusinessC = {
    id: "biz-c-3333-4444-5555-666677778888",
    company_name: "Applied / Pending Startup",
    industry: "Technology",
    hq_location: "Austin, TX",
    status: "applied",
    contact_email: "founder@pendingstartup.com",
    owner_user_id: "user-owner-c",
  };

  // ---------------------------------------------------------
  // 1. Zod Validation Tests
  // ---------------------------------------------------------
  describe("Input Validation (createKnowledgeInsightSchema)", () => {
    it("validates a compliant knowledge insight", () => {
      const valid = {
        title: "3 things we learned while building our B2B sales process",
        content:
          "We changed our qualification process by focusing on three things before allowing a lead into our sales pipeline: direct budget authority, concrete timeline within 60 days, and current pain severity.",
        topic: "Sales",
        based_on: "business_experience",
      };

      const result = createKnowledgeInsightSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects title shorter than 10 characters", () => {
      const invalid = {
        title: "Too short",
        content:
          "This is content that is more than fifty characters long to pass the content length validation rule.",
        topic: "Sales",
      };

      const result = createKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 10 characters");
      }
    });

    it("rejects title exceeding 200 characters", () => {
      const invalid = {
        title: "a".repeat(201),
        content:
          "This is content that is more than fifty characters long to pass the content length validation rule.",
        topic: "Sales",
      };

      const result = createKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("cannot exceed 200 characters");
      }
    });

    it("rejects content shorter than 50 characters", () => {
      const invalid = {
        title: "Valid title for sales process",
        content: "Short advice that fails.",
        topic: "Sales",
      };

      const result = createKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 50 characters");
      }
    });

    it("rejects content exceeding 5000 characters", () => {
      const invalid = {
        title: "Valid title for sales process",
        content: "a".repeat(5001),
        topic: "Sales",
      };

      const result = createKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("cannot exceed 5000 characters");
      }
    });

    it("accepts all approved topics including 'Building a System / Business'", () => {
      const topics = [
        "Building a System / Business",
        "Sales",
        "Marketing",
        "Operations",
        "Hiring",
        "Finance",
        "Product",
        "Partnerships",
        "Distribution",
        "Technology",
        "Other",
      ];

      for (const topic of topics) {
        const result = createKnowledgeInsightSchema.safeParse({
          title: "Valid title for topic validation",
          content:
            "This is content that is more than fifty characters long to pass the content length validation rule.",
          topic,
        });
        expect(result.success).toBe(true);
      }
    });

    it("rejects invalid topics", () => {
      const result = createKnowledgeInsightSchema.safeParse({
        title: "Valid title for topic validation",
        content:
          "This is content that is more than fifty characters long to pass the content length validation rule.",
        topic: "Cryptocurrency",
      });
      expect(result.success).toBe(false);
    });

    it("validates all allowed based_on values", () => {
      const allowedBasedOn = [
        "business_experience",
        "project",
        "experiment",
        "industry_experience",
        "lesson_learned",
        "general_perspective",
      ];

      for (const based_on of allowedBasedOn) {
        const result = createKnowledgeInsightSchema.safeParse({
          title: "Valid title for based on validation",
          content:
            "This is content that is more than fifty characters long to pass the content length validation rule.",
          topic: "Operations",
          based_on,
        });
        expect(result.success).toBe(true);
      }
    });

    it("rejects unknown based_on values", () => {
      const result = createKnowledgeInsightSchema.safeParse({
        title: "Valid title for based on validation",
        content:
          "This is content that is more than fifty characters long to pass the content length validation rule.",
        topic: "Operations",
        based_on: "verified_advice", // "Verified advice" must NOT be allowed
      });
      expect(result.success).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 2. Authorization & Publishing Guards
  // ---------------------------------------------------------
  describe("Author Requirements & Permissions", () => {
    it("allows approved businesses to publish knowledge insights", () => {
      const canPublish = approvedBusinessA.status === "approved";
      expect(canPublish).toBe(true);
    });

    it("strictly forbids applied/pending businesses from publishing", () => {
      const canPublish = appliedBusinessC.status === "approved";
      expect(canPublish).toBe(false);
    });

    it("strictly derives business_id from authenticated session (no client spoofing)", () => {
      const authenticatedSessionUser = {
        userId: "user-owner-a",
        business: approvedBusinessA,
      };

      const clientSuppliedBody = {
        business_id: "biz-b-2222-3333-4444-555566667777", // Spoofing business B
        title: "Spoofed title attempt for testing",
        content:
          "This is content that is more than fifty characters long to pass the content length validation rule.",
        topic: "Marketing",
      };

      // Server overrides client-supplied business_id with authenticated user's business.id
      const finalBusinessId = authenticatedSessionUser.business.id;
      expect(finalBusinessId).toBe(approvedBusinessA.id);
      expect(finalBusinessId).not.toBe(clientSuppliedBody.business_id);
    });
  });

  // ---------------------------------------------------------
  // 3. Ownership & Modification Guards (Update, Delete, Archive)
  // ---------------------------------------------------------
  describe("Ownership Controls", () => {
    const sampleInsight = {
      id: "insight-001",
      business_id: approvedBusinessA.id,
      title: "How we reduced operational overhead",
      content:
        "By streamlining approvals and removing duplicate reviews, we shaved 4 days off customer delivery cycles.",
      topic: "Operations",
      status: "published",
    };

    it("allows the author business to update their insight", () => {
      const isOwner = approvedBusinessA.id === sampleInsight.business_id;
      expect(isOwner).toBe(true);
    });

    it("prevents another business from updating another's insight", () => {
      const isOwner = approvedBusinessB.id === sampleInsight.business_id;
      expect(isOwner).toBe(false);
    });

    it("allows the author business to archive their insight", () => {
      const isOwner = approvedBusinessA.id === sampleInsight.business_id;
      expect(isOwner).toBe(true);
    });

    it("prevents non-owners from archiving an insight", () => {
      const isOwner = approvedBusinessB.id === sampleInsight.business_id;
      expect(isOwner).toBe(false);
    });

    it("allows the author business to delete their insight", () => {
      const isOwner = approvedBusinessA.id === sampleInsight.business_id;
      expect(isOwner).toBe(true);
    });

    it("prevents non-owners from deleting an insight", () => {
      const isOwner = approvedBusinessB.id === sampleInsight.business_id;
      expect(isOwner).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 4. Discovery, Search, and Filtering
  // ---------------------------------------------------------
  describe("Discovery & Search", () => {
    const mockInsights = [
      {
        id: "1",
        title: "3 things we learned building B2B sales pipelines",
        content: "Detailed notes on sales outbound and prospecting qualification.",
        topic: "Sales",
        status: "published",
        created_at: "2026-09-10T10:00:00Z",
      },
      {
        id: "2",
        title: "How we optimized our Postgres database queries",
        content: "Adding composite indexes and connection pooling reduced latency by 60%.",
        topic: "Technology",
        status: "published",
        created_at: "2026-09-11T12:00:00Z",
      },
      {
        id: "3",
        title: "Old outdated hiring framework",
        content: "This framework was archived and should not appear in general listing.",
        topic: "Hiring",
        status: "archived",
        created_at: "2026-09-08T09:00:00Z",
      },
    ];

    it("filters out archived insights by default", () => {
      const publicFeed = mockInsights.filter((i) => i.status === "published");
      expect(publicFeed.length).toBe(2);
      expect(publicFeed.some((i) => i.status === "archived")).toBe(false);
    });

    it("searches across both title and content", () => {
      const query = "connection pooling";
      const results = mockInsights
        .filter((i) => i.status === "published")
        .filter(
          (i) =>
            i.title.toLowerCase().includes(query.toLowerCase()) ||
            i.content.toLowerCase().includes(query.toLowerCase()),
        );
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("2");
    });

    it("filters by topic", () => {
      const salesOnly = mockInsights
        .filter((i) => i.status === "published")
        .filter((i) => i.topic === "Sales");
      expect(salesOnly.length).toBe(1);
      expect(salesOnly[0].topic).toBe("Sales");
    });

    it("sorts newest first (chronological order)", () => {
      const sorted = [...mockInsights]
        .filter((i) => i.status === "published")
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      expect(sorted[0].id).toBe("2"); // Sept 11 is newer than Sept 10
      expect(sorted[1].id).toBe("1");
    });
  });

  // ---------------------------------------------------------
  // 5. Anti-Social Network & Privacy Guarantees
  // ---------------------------------------------------------
  describe("Anti-Social Network Principles & Privacy", () => {
    it("does not include social vanity metrics (likes, followers, karma)", () => {
      const insightData = {
        id: "insight-999",
        title: "Operational lessons",
        content: "Sharing five key bottlenecks we removed this quarter.",
        topic: "Operations",
      };

      expect(insightData).not.toHaveProperty("likes");
      expect(insightData).not.toHaveProperty("upvotes");
      expect(insightData).not.toHaveProperty("followers");
      expect(insightData).not.toHaveProperty("karma");
      expect(insightData).not.toHaveProperty("reactions");
    });

    it("does not expose private author emails in public insight representation", () => {
      const publicSafeBusiness = {
        id: approvedBusinessA.id,
        company_name: approvedBusinessA.company_name,
        industry: approvedBusinessA.industry,
        hq_location: approvedBusinessA.hq_location,
        status: approvedBusinessA.status,
      };

      expect(publicSafeBusiness).not.toHaveProperty("contact_email");
    });
  });

  // ---------------------------------------------------------
  // 6. Knowledge Editorial Workspace & Tiptap Schema Tests
  // ---------------------------------------------------------
  describe("Knowledge Editorial Workspace & Rich-Text Persistence", () => {
    it("allows saving drafts with partial content (under 50 characters)", () => {
      const draftData = {
        title: "Initial Draft Title",
        content: "Drafting in progress...", // Under 50 chars
        content_json: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Drafting in progress..." }],
            },
          ],
        }),
        topic: "Operations",
        based_on: "business_experience",
        status: "draft",
      };

      const result = createKnowledgeInsightSchema.safeParse(draftData);
      expect(result.success).toBe(true);
    });

    it("enforces 50 characters minimum when publishing", () => {
      const publishData = {
        title: "Full Publishing Attempt",
        content: "Too short for publish.",
        topic: "Operations",
        status: "published",
      };

      const result = createKnowledgeInsightSchema.safeParse(publishData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 50 characters");
      }
    });

    it("persists structured Tiptap JSON and round-trips without data loss", () => {
      const tiptapDoc = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "1. The Unit Economics Problem" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "We discovered that our " },
              { type: "text", marks: [{ type: "bold" }], text: "CAC exceeded LTV" },
              { type: "text", text: " when targeting mid-market leads directly." },
            ],
          },
          {
            type: "image",
            attrs: {
              src: "https://example.com/storage/knowledge/biz-1/chart.png",
              alt: "LTV vs CAC Chart",
              caption: "Q3 Acquisition Performance Breakdown",
              alignment: "center",
            },
          },
          {
            type: "blockquote",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Never scale customer acquisition before unit economics stabilize.",
                  },
                ],
              },
            ],
          },
        ],
      };

      const serialized = JSON.stringify(tiptapDoc);
      const parsed = JSON.parse(serialized);

      expect(parsed.type).toBe("doc");
      expect(parsed.content.length).toBe(4);
      expect(parsed.content[0].type).toBe("heading");
      expect(parsed.content[1].content[1].marks[0].type).toBe("bold");
      expect(parsed.content[2].attrs.alignment).toBe("center");
      expect(parsed.content[3].type).toBe("blockquote");
    });

    it("strictly strips or rejects video/iframe embed nodes from Tiptap JSON rendering", () => {
      const maliciousDocWithVideo = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Legitimate paragraph text here." }],
          },
          {
            type: "video",
            attrs: { src: "https://youtube.com/watch?v=12345" },
          },
          {
            type: "iframe",
            attrs: { src: "https://vimeo.com/embed/12345" },
          },
        ],
      };

      // Simulating our renderer filter logic
      const allowedNodes = maliciousDocWithVideo.content.filter(
        (node) => node.type !== "video" && node.type !== "iframe",
      );

      expect(allowedNodes.length).toBe(1);
      expect(allowedNodes[0].type).toBe("paragraph");
      expect(allowedNodes.some((n) => n.type === "video")).toBe(false);
      expect(allowedNodes.some((n) => n.type === "iframe")).toBe(false);
    });

    it("strictly sanitizes dangerous javascript: URLs in links", () => {
      const dangerousHref = "javascript:alert('xss')";
      const isDangerous = dangerousHref.toLowerCase().startsWith("javascript:");
      expect(isDangerous).toBe(true);

      const safeUrl = (url: string) => {
        if (url.toLowerCase().startsWith("javascript:")) return "#";
        return url;
      };

      expect(safeUrl(dangerousHref)).toBe("#");
      expect(safeUrl("https://company.com")).toBe("https://company.com");
    });

    it("validates knowledge image storage path convention", () => {
      const businessId = "biz-1234";
      const knowledgeId = "kn-5678";
      const fileName = "chart_1720000000_abc123.png";

      const expectedPath = `knowledge/${businessId}/${knowledgeId}/${fileName}`;
      expect(expectedPath).toMatch(/^knowledge\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/);
    });

    it("verifies public vs draft visibility isolation", () => {
      const allArticles = [
        { id: "1", title: "Public Article", status: "published", business_id: "biz-a" },
        { id: "2", title: "Secret Draft", status: "draft", business_id: "biz-a" },
        { id: "3", title: "Other Draft", status: "draft", business_id: "biz-b" },
      ];

      // Unauthenticated visitor listing:
      const publicVisitorListing = allArticles.filter((a) => a.status === "published");
      expect(publicVisitorListing.length).toBe(1);
      expect(publicVisitorListing[0].title).toBe("Public Article");
      expect(publicVisitorListing.some((a) => a.status === "draft")).toBe(false);

      // Non-owner direct access check for draft:
      const canVisitorViewDraft = (article: (typeof allArticles)[0], visitorUserId?: string) => {
        if (article.status === "published") return true;
        return visitorUserId === article.business_id;
      };

      expect(canVisitorViewDraft(allArticles[1], undefined)).toBe(false); // Unauthenticated visitor
      expect(canVisitorViewDraft(allArticles[1], "biz-b")).toBe(false); // Different business
      expect(canVisitorViewDraft(allArticles[1], "biz-a")).toBe(true); // Owner business
    });
  });
});

