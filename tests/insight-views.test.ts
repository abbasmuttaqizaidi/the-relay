import { describe, it, expect, vi, beforeEach } from "vitest";
import { InsightViewService } from "../src/services/insight-view.service";
import { prisma } from "../src/db/prisma.server";

describe("Deduplicated Views System (Members & Non-Members)", () => {
  const mockKnowledgeArticle = {
    id: "e5f2a1b0-4c3d-4e5f-8a9b-0c1d2e3f4a5b",
    title: "Streamlining Cross-Border Trade & Freight Operations",
    slug: "streamlining-cross-border-trade-freight-operations",
    views: 10,
    business_id: "biz-1111-2222-3333-444455556666",
    business: {
      owner_user_id: "user-author-uuid",
      owner: {
        clerk_user_id: "user_author_clerk_id",
      },
    },
  };

  const mockQuestion = {
    id: "f6a3b2c1-5d4e-4f6a-9b0c-1d2e3f4a5b6c",
    title: "How do you handle supplier chargebacks in automotive manufacturing?",
    slug: "how-do-you-handle-supplier-chargebacks-automotive",
    views: 5,
    business_id: "biz-1111-2222-3333-444455556666",
    business: {
      owner_user_id: "user-author-uuid",
      owner: {
        clerk_user_id: "user_author_clerk_id",
      },
    },
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("records a unique view for a first-time authenticated member on a knowledge article", async () => {
    let currentArticleViews = mockKnowledgeArticle.views;

    vi.spyOn(prisma.knowledgeInsight, "findFirst").mockResolvedValue({
      ...mockKnowledgeArticle,
      views: currentArticleViews,
    } as any);

    vi.spyOn(prisma.insightView, "create").mockResolvedValue({
      id: "view-1",
      item_type: "knowledge",
      item_id: mockKnowledgeArticle.id,
      viewer_key: "user:user_member_clerk_999",
      created_at: new Date(),
    } as any);

    vi.spyOn(prisma.knowledgeInsight, "update").mockImplementation(async (args: any) => {
      currentArticleViews += 1;
      return { views: currentArticleViews } as any;
    });

    const result = await InsightViewService.recordUniqueView({
      itemId: mockKnowledgeArticle.id,
      itemType: "knowledge",
      userId: "user_member_clerk_999",
    });

    expect(result.isNew).toBe(true);
    expect(result.totalViews).toBe(11);
  });

  it("strictly prevents duplicate view counting when the same member re-visits or refreshes", async () => {
    vi.spyOn(prisma.knowledgeInsight, "findFirst").mockResolvedValue({
      ...mockKnowledgeArticle,
      views: 11,
    } as any);

    // The in-memory / serverCache or DB throws unique constraint (P2002)
    const result = await InsightViewService.recordUniqueView({
      itemId: mockKnowledgeArticle.id,
      itemType: "knowledge",
      userId: "user_member_clerk_999",
    });

    expect(result.isNew).toBe(false);
    expect(result.totalViews).toBe(11);
  });

  it("records a unique view for a first-time non-member (public visitor via visitorId)", async () => {
    let currentQuestionViews = mockQuestion.views;

    vi.spyOn(prisma.question, "findFirst").mockResolvedValue({
      ...mockQuestion,
      views: currentQuestionViews,
    } as any);

    vi.spyOn(prisma.insightView, "create").mockResolvedValue({
      id: "view-anon-1",
      item_type: "question",
      item_id: mockQuestion.id,
      viewer_key: "anon:vid_guest_device_abc123",
      created_at: new Date(),
    } as any);

    vi.spyOn(prisma.question, "update").mockImplementation(async (args: any) => {
      currentQuestionViews += 1;
      return { views: currentQuestionViews } as any;
    });

    const result = await InsightViewService.recordUniqueView({
      itemId: mockQuestion.id,
      itemType: "question",
      visitorId: "vid_guest_device_abc123",
    });

    expect(result.isNew).toBe(true);
    expect(result.totalViews).toBe(6);
  });

  it("strictly prevents duplicate views when the non-member refreshes the page", async () => {
    vi.spyOn(prisma.question, "findFirst").mockResolvedValue({
      ...mockQuestion,
      views: 6,
    } as any);

    // Same visitorId attempting to increment again
    const result = await InsightViewService.recordUniqueView({
      itemId: mockQuestion.id,
      itemType: "question",
      visitorId: "vid_guest_device_abc123",
    });

    expect(result.isNew).toBe(false);
    expect(result.totalViews).toBe(6);
  });

  it("never increments views when the creator / owner business views their own content", async () => {
    vi.spyOn(prisma.knowledgeInsight, "findFirst").mockResolvedValue(mockKnowledgeArticle as any);
    const updateSpy = vi.spyOn(prisma.knowledgeInsight, "update");

    // The user attempting to view is the owner ("user_author_clerk_id")
    const result = await InsightViewService.recordUniqueView({
      itemId: mockKnowledgeArticle.id,
      itemType: "knowledge",
      userId: "user_author_clerk_id",
    });

    expect(result.isNew).toBe(false);
    expect(result.totalViews).toBe(mockKnowledgeArticle.views);
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("correctly resolves items by slug as well as UUID", async () => {
    vi.spyOn(prisma.knowledgeInsight, "findFirst").mockResolvedValue({
      ...mockKnowledgeArticle,
      views: 15,
    } as any);

    vi.spyOn(prisma.insightView, "create").mockResolvedValue({
      id: "view-slug-test",
      item_type: "knowledge",
      item_id: mockKnowledgeArticle.id,
      viewer_key: "anon:vid_new_slug_visitor",
      created_at: new Date(),
    } as any);

    vi.spyOn(prisma.knowledgeInsight, "update").mockResolvedValue({
      views: 16,
    } as any);

    const result = await InsightViewService.recordUniqueView({
      itemId: "streamlining-cross-border-trade-freight-operations",
      itemType: "knowledge",
      visitorId: "vid_new_slug_visitor",
    });

    expect(result.isNew).toBe(true);
    expect(result.totalViews).toBe(16);
  });

  describe("Compact View Count Formatting (e.g. 1.7k format)", () => {
    it("formats counts under 1,000 as raw numbers", async () => {
      const { formatCompactNumber } = await import("../src/routes/insights.index");
      expect(formatCompactNumber(0)).toBe("0");
      expect(formatCompactNumber(42)).toBe("42");
      expect(formatCompactNumber(999)).toBe("999");
    });

    it("formats thousands into 1k, 1.7k, 10.5k format", async () => {
      const { formatCompactNumber } = await import("../src/routes/insights.index");
      expect(formatCompactNumber(1000)).toBe("1k");
      expect(formatCompactNumber(1700)).toBe("1.7k");
      expect(formatCompactNumber(1750)).toBe("1.8k");
      expect(formatCompactNumber(10500)).toBe("10.5k");
      expect(formatCompactNumber(250000)).toBe("250k");
    });

    it("formats millions into 1m, 1.5m format", async () => {
      const { formatCompactNumber } = await import("../src/routes/insights.index");
      expect(formatCompactNumber(1000000)).toBe("1m");
      expect(formatCompactNumber(1500000)).toBe("1.5m");
    });
  });

  describe("Published Date Formatting (e.g. 28-sept-26 format)", () => {
    it("formats ISO date string into DD-month-YY format", async () => {
      const { formatPublishedDate } = await import("../src/routes/insights.index");
      expect(formatPublishedDate("2026-09-28T12:00:00Z")).toBe("28-Sept-26");
      expect(formatPublishedDate("2026-01-15T08:30:00Z")).toBe("15-Jan-26");
      expect(formatPublishedDate("2025-12-05T00:00:00Z")).toBe("5-Dec-25");
      expect(formatPublishedDate("")).toBe("");
      expect(formatPublishedDate(null)).toBe("");
    });
  });
});
