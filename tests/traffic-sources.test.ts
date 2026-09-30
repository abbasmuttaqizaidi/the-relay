import { describe, it, expect, vi, beforeEach } from "vitest";
import { detectTrafficSource, getSessionReferrer } from "../src/lib/traffic-source";
import { InsightViewService } from "../src/services/insight-view.service";
import { prisma } from "../src/db/prisma.server";

describe("Traffic Sources Attribution & Analytics System", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("detectTrafficSource() Unit Tests", () => {
    it("correctly identifies Google Search from various TLDs and app schemes", () => {
      expect(detectTrafficSource("https://www.google.com/")).toBe("google");
      expect(detectTrafficSource("https://google.com/search?q=the+relay")).toBe("google");
      expect(detectTrafficSource("https://www.google.co.in/")).toBe("google");
      expect(detectTrafficSource("https://www.google.co.uk/")).toBe("google");
      expect(detectTrafficSource("https://www.google.de/")).toBe("google");
      expect(detectTrafficSource("https://www.google.ca/")).toBe("google");
      expect(detectTrafficSource("android-app://com.google.android.googlequicksearchbox/https/www.google.com")).toBe("google");
    });

    it("correctly identifies LinkedIn from desktop, mobile, shortlink, and app schemes", () => {
      expect(detectTrafficSource("https://www.linkedin.com/")).toBe("linkedin");
      expect(detectTrafficSource("https://linkedin.com/feed/update/urn:li:activity:123")).toBe("linkedin");
      expect(detectTrafficSource("https://lnkd.in/e9XYZ12")).toBe("linkedin");
      expect(detectTrafficSource("android-app://com.linkedin.android/")).toBe("linkedin");
    });

    it("correctly identifies Twitter / X from twitter.com, x.com, and t.co link shorteners", () => {
      expect(detectTrafficSource("https://twitter.com/")).toBe("twitter");
      expect(detectTrafficSource("https://mobile.twitter.com/TheRelay/status/1234")).toBe("twitter");
      expect(detectTrafficSource("https://x.com/home")).toBe("twitter");
      expect(detectTrafficSource("https://t.co/abc12345")).toBe("twitter");
      expect(detectTrafficSource("android-app://com.twitter.android/")).toBe("twitter");
    });

    it("correctly identifies Instagram web and l.instagram.com link shim (bio/stories/DMs)", () => {
      expect(detectTrafficSource("https://instagram.com/")).toBe("instagram");
      expect(detectTrafficSource("https://www.instagram.com/p/1234/")).toBe("instagram");
      // Instagram link shim used whenever a user taps an external link in the app
      expect(detectTrafficSource("https://l.instagram.com/")).toBe("instagram");
      expect(detectTrafficSource("https://l.instagram.com/?u=https%3A%2F%2Ftherelay.co&e=AT123")).toBe("instagram");
      expect(detectTrafficSource("android-app://com.instagram.android/")).toBe("instagram");
    });

    it("falls back to 'direct' for empty, null, self-referrals, or unrecognized domains", () => {
      expect(detectTrafficSource("")).toBe("direct");
      expect(detectTrafficSource(null)).toBe("direct");
      expect(detectTrafficSource(undefined)).toBe("direct");
      expect(detectTrafficSource("https://therelay.co/insights")).toBe("direct");
      expect(detectTrafficSource("http://localhost:6009/")).toBe("direct");
      expect(detectTrafficSource("https://random-external-blog.com/article")).toBe("direct");
    });
  });

  describe("getSessionReferrer() Client Persistence", () => {
    it("falls back to direct when document is undefined or empty", () => {
      const ref = getSessionReferrer();
      expect(ref).toBe("");
    });
  });

  describe("InsightViewService source recording & analytics", () => {
    const mockInsight = {
      id: "a0000000-0000-0000-0000-000000000001",
      slug: "how-to-scale-b2b",
      title: "How to scale B2B operations",
      views: 50,
      business_id: "biz-1",
      business: { owner: { clerk_user_id: "other_user" } },
    };

    it("records the detected traffic source when saving a new unique view", async () => {
      vi.spyOn(prisma.knowledgeInsight, "findFirst").mockResolvedValue(mockInsight as any);
      vi.spyOn(prisma.insightView, "findFirst").mockResolvedValue(null);

      const createSpy = vi.spyOn(prisma.insightView, "create").mockResolvedValue({
        id: "view-ig-1",
        item_type: "knowledge",
        item_id: mockInsight.id,
        viewer_key: "dev:unique_dfp_123_abc",
        source: "instagram",
        created_at: new Date(),
      } as any);

      vi.spyOn(prisma.knowledgeInsight, "update").mockResolvedValue({
        views: 51,
      } as any);

      const result = await InsightViewService.recordUniqueView({
        itemId: mockInsight.id,
        itemType: "knowledge",
        deviceFingerprint: "unique_dfp_123",
        clientIp: "1.2.3.4",
        source: "https://l.instagram.com/?u=https%3A%2F%2Ftherelay.co",
      });

      expect(result.isNew).toBe(true);
      expect(result.source).toBe("instagram");
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            source: "instagram",
          }),
        })
      );
    });

    it("aggregates traffic analytics across all 5 channels accurately", async () => {
      // Mock prisma.insightView.groupBy for overall
      vi.spyOn(prisma.insightView, "groupBy")
        .mockResolvedValueOnce([
          { source: "google", _count: { id: 40 } },
          { source: "linkedin", _count: { id: 30 } },
          { source: "instagram", _count: { id: 15 } },
          { source: "twitter", _count: { id: 10 } },
          { source: "direct", _count: { id: 5 } },
        ] as any)
        // and groupBy for per-item
        .mockResolvedValueOnce([
          { item_id: mockInsight.id, source: "google", _count: { id: 25 } },
          { item_id: mockInsight.id, source: "instagram", _count: { id: 10 } },
        ] as any);

      const analytics = await InsightViewService.getTrafficAnalytics();

      expect(analytics.totalViews).toBe(100);
      expect(analytics.sourcesBreakdown.google).toBe(40);
      expect(analytics.sourcesBreakdown.linkedin).toBe(30);
      expect(analytics.sourcesBreakdown.instagram).toBe(15);
      expect(analytics.sourcesBreakdown.twitter).toBe(10);
      expect(analytics.sourcesBreakdown.direct).toBe(5);

      expect(analytics.sourcesPercentage.google).toBe(40);
      expect(analytics.sourcesPercentage.linkedin).toBe(30);
      expect(analytics.sourcesPercentage.instagram).toBe(15);
      expect(analytics.sourcesPercentage.twitter).toBe(10);
      expect(analytics.sourcesPercentage.direct).toBe(5);

      expect(analytics.itemTrafficMap[mockInsight.id]).toBeDefined();
      expect(analytics.itemTrafficMap[mockInsight.id].google).toBe(25);
      expect(analytics.itemTrafficMap[mockInsight.id].instagram).toBe(10);
    });
  });
});
