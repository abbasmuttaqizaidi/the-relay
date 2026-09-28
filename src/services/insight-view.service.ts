import { prisma } from "../db/prisma.server";
import { serverCache } from "../lib/server-cache";
import { isUUID } from "../lib/slug";

// In-memory set for fast duplicate rejection across hot reloads & sessions
const globalRef = globalThis as any;
if (!globalRef.__uniqueInsightViews) {
  globalRef.__uniqueInsightViews = new Set<string>();
}
const uniqueInsightViews = globalRef.__uniqueInsightViews as Set<string>;

export interface RecordInsightViewParams {
  itemId: string; // ID or Slug
  itemType: "question" | "knowledge";
  userId?: string | null; // Clerk User ID
  visitorId?: string | null; // Anonymous visitor ID
}

export class InsightViewService {
  /**
   * Records a strictly deduplicated view for a Question or Knowledge Insight.
   * - Deduplicates across both authenticated members and non-members.
   * - Never counts author/business owner views of their own content.
   * - Uses DB unique constraints (InsightView) and multi-level caching for high performance.
   */
  static async recordUniqueView(
    params: RecordInsightViewParams
  ): Promise<{ isNew: boolean; totalViews: number }> {
    const { itemId, itemType, userId, visitorId } = params;
    if (!itemId || !itemType) {
      return { isNew: false, totalViews: 0 };
    }

    // 1. Resolve actual entity by ID or slug to get canonical UUID and owner business
    let realId: string = itemId;
    let ownerUserId: string | null = null;
    let currentViews = 0;

    try {
      const isIdUUID = isUUID(itemId);
      if (itemType === "knowledge") {
        const item = await prisma.knowledgeInsight.findFirst({
          where: isIdUUID
            ? { OR: [{ id: itemId }, { slug: itemId }] }
            : { slug: itemId },
          select: {
            id: true,
            views: true,
            business: {
              select: {
                owner: { select: { clerk_user_id: true } },
              },
            },
          },
        });
        if (!item) return { isNew: false, totalViews: 0 };
        realId = item.id;
        currentViews = item.views ?? 0;
        ownerUserId = item.business?.owner?.clerk_user_id || null;
      } else {
        const item = await prisma.question.findFirst({
          where: isIdUUID
            ? { OR: [{ id: itemId }, { slug: itemId }] }
            : { slug: itemId },
          select: {
            id: true,
            views: true,
            business: {
              select: {
                owner: { select: { clerk_user_id: true } },
              },
            },
          },
        });
        if (!item) return { isNew: false, totalViews: 0 };
        realId = item.id;
        currentViews = item.views ?? 0;
        ownerUserId = item.business?.owner?.clerk_user_id || null;
      }
    } catch (resolveErr) {
      console.warn("[InsightViewService.recordUniqueView] Failed to resolve entity:", resolveErr);
      return { isNew: false, totalViews: currentViews };
    }

    // 2. Prevent content creator/owner from inflating their own views
    if (userId && ownerUserId && userId === ownerUserId) {
      return { isNew: false, totalViews: currentViews };
    }

    // 3. Construct unique viewer key
    const viewerKey = userId
      ? `user:${userId}`
      : visitorId
      ? `anon:${visitorId}`
      : null;

    if (!viewerKey) {
      return { isNew: false, totalViews: currentViews };
    }

    const dedupKey = `view:${itemType}:${realId}:${viewerKey}`;

    // 4. Check fast in-memory set & server cache
    if (uniqueInsightViews.has(dedupKey)) {
      return { isNew: false, totalViews: currentViews };
    }
    if (serverCache.get(dedupKey)) {
      uniqueInsightViews.add(dedupKey);
      return { isNew: false, totalViews: currentViews };
    }

    // 5. Database-level deduplication via InsightView table unique constraint
    try {
      await prisma.insightView.create({
        data: {
          item_type: itemType,
          item_id: realId,
          viewer_key: viewerKey,
        },
      });

      // 6. Successfully created unique record -> increment entity views count atomically
      let updatedViews = currentViews + 1;
      if (itemType === "knowledge") {
        const updated = await prisma.knowledgeInsight.update({
          where: { id: realId },
          data: { views: { increment: 1 } },
          select: { views: true },
        });
        updatedViews = updated.views;
      } else {
        const updated = await prisma.question.update({
          where: { id: realId },
          data: { views: { increment: 1 } },
          select: { views: true },
        });
        updatedViews = updated.views;
      }

      // Mark in caches
      uniqueInsightViews.add(dedupKey);
      serverCache.set(dedupKey, true, 86400 * 365); // 1 year cache

      return { isNew: true, totalViews: updatedViews };
    } catch (dbErr: any) {
      // Prisma unique constraint violation (P2002) means this viewer already recorded a view
      if (dbErr.code === "P2002" || dbErr.message?.includes("Unique constraint")) {
        uniqueInsightViews.add(dedupKey);
        serverCache.set(dedupKey, true, 86400 * 365);
        return { isNew: false, totalViews: currentViews };
      }
      console.warn("[InsightViewService.recordUniqueView] DB insertion error:", dbErr);
      return { isNew: false, totalViews: currentViews };
    }
  }

  /**
   * Retrieves current views for a question or knowledge insight by ID or slug.
   */
  static async getViews(
    itemId: string,
    itemType: "question" | "knowledge"
  ): Promise<number> {
    try {
      const isIdUUID = isUUID(itemId);
      if (itemType === "knowledge") {
        const item = await prisma.knowledgeInsight.findFirst({
          where: isIdUUID
            ? { OR: [{ id: itemId }, { slug: itemId }] }
            : { slug: itemId },
          select: { views: true },
        });
        return item?.views ?? 0;
      } else {
        const item = await prisma.question.findFirst({
          where: isIdUUID
            ? { OR: [{ id: itemId }, { slug: itemId }] }
            : { slug: itemId },
          select: { views: true },
        });
        return item?.views ?? 0;
      }
    } catch (err) {
      console.warn("[InsightViewService.getViews] Error getting views:", err);
      return 0;
    }
  }
}
