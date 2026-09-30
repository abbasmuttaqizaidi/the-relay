import crypto from "crypto";
import { prisma } from "../db/prisma.server";
import { serverCache } from "../lib/server-cache";
import { isUUID } from "../lib/slug";
import { detectTrafficSource, type TrafficSource } from "../lib/traffic-source";

// In-memory set for fast duplicate rejection across hot reloads & sessions
const globalRef = globalThis as any;
if (!globalRef.__uniqueInsightViews) {
  globalRef.__uniqueInsightViews = new Set<string>();
}
const uniqueInsightViews = globalRef.__uniqueInsightViews as Set<string>;

function addUniqueViewKey(key: string) {
  if (uniqueInsightViews.size > 20000) {
    const toDelete = Array.from(uniqueInsightViews).slice(0, 10000);
    for (const k of toDelete) {
      uniqueInsightViews.delete(k);
    }
  }
  uniqueInsightViews.add(key);
}

export interface RecordInsightViewParams {
  itemId: string; // ID or Slug
  itemType: "question" | "knowledge";
  userId?: string | null; // Clerk User ID
  visitorId?: string | null; // Anonymous visitor ID
  deviceFingerprint?: string | null; // Cross-browser hardware device fingerprint
  clientIp?: string | null; // Client IP address
  source?: string | null; // Raw HTTP Referer or client document.referrer
}

export class InsightViewService {
  /**
   * Records a strictly deduplicated view for a Question or Knowledge Insight.
   * - Deduplicates across both authenticated members and non-members.
   * - Deduplicates across different browsers (Chrome, Safari, Firefox, in-app WebViews) on the same physical mobile device.
   * - Never counts author/business owner views of their own content.
   * - Categorizes traffic source (google, linkedin, twitter, instagram, direct).
   * - Uses DB unique constraints (InsightView) and multi-level caching for high performance.
   */
  static async recordUniqueView(
    params: RecordInsightViewParams
  ): Promise<{ isNew: boolean; totalViews: number; source?: TrafficSource }> {
    const { itemId, itemType, userId, visitorId, deviceFingerprint, clientIp, source } = params;
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

    // 3. Construct unique viewer key with cross-browser hardware device fingerprinting
    let viewerKey: string | null = null;
    let deviceDedupKey: string | null = null;

    if (userId) {
      viewerKey = `user:${userId}`;
    } else if (deviceFingerprint) {
      // Deterministic cross-browser device key combining hardware fingerprint and client IP
      const sanitizedIp = (clientIp || "").replace(/:\d+$/, "").trim();
      const ipHash = sanitizedIp
        ? crypto.createHash("sha256").update(sanitizedIp).digest("hex").slice(0, 10)
        : "direct";
      viewerKey = `dev:${deviceFingerprint}_${ipHash}`;
      deviceDedupKey = `view_dfp:${itemType}:${realId}:${deviceFingerprint}`;
    } else if (visitorId) {
      viewerKey = `anon:${visitorId}`;
    }

    if (!viewerKey) {
      return { isNew: false, totalViews: currentViews };
    }

    const dedupKey = `view:${itemType}:${realId}:${viewerKey}`;

    // 4. Check fast in-memory set & server cache
    if (uniqueInsightViews.has(dedupKey) || serverCache.get(dedupKey)) {
      addUniqueViewKey(dedupKey);
      return { isNew: false, totalViews: currentViews };
    }

    // Check cross-browser hardware device lock (covers same device across Chrome, Safari, Firefox, in-app)
    if (deviceDedupKey && (uniqueInsightViews.has(deviceDedupKey) || serverCache.get(deviceDedupKey))) {
      addUniqueViewKey(deviceDedupKey);
      addUniqueViewKey(dedupKey);
      return { isNew: false, totalViews: currentViews };
    }

    // Check DB for existing view by this device on this item (handles cross-browser and network switches on same device)
    if (deviceFingerprint) {
      try {
        const existingDeviceView = await prisma.insightView.findFirst({
          where: {
            item_type: itemType,
            item_id: realId,
            viewer_key: {
              startsWith: `dev:${deviceFingerprint}`,
            },
          },
          select: { id: true },
        });

        if (existingDeviceView) {
          addUniqueViewKey(dedupKey);
          if (deviceDedupKey) {
            addUniqueViewKey(deviceDedupKey);
            serverCache.set(deviceDedupKey, true, 86400 * 365);
          }
          serverCache.set(dedupKey, true, 86400 * 365);
          return { isNew: false, totalViews: currentViews };
        }
      } catch (checkErr) {
        console.warn("[InsightViewService] Device check error:", checkErr);
      }
    }

    // 5. Database-level deduplication via InsightView table unique constraint
    const trafficSource = detectTrafficSource(source);
    try {
      await prisma.insightView.create({
        data: {
          item_type: itemType,
          item_id: realId,
          viewer_key: viewerKey,
          source: trafficSource,
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
      addUniqueViewKey(dedupKey);
      serverCache.set(dedupKey, true, 86400 * 365); // 1 year cache
      if (deviceDedupKey) {
        addUniqueViewKey(deviceDedupKey);
        serverCache.set(deviceDedupKey, true, 86400 * 365);
      }

      return { isNew: true, totalViews: updatedViews, source: trafficSource };
    } catch (dbErr: any) {
      // Prisma unique constraint violation (P2002) means this viewer already recorded a view
      if (dbErr.code === "P2002" || dbErr.message?.includes("Unique constraint")) {
        addUniqueViewKey(dedupKey);
        serverCache.set(dedupKey, true, 86400 * 365);
        if (deviceDedupKey) {
          addUniqueViewKey(deviceDedupKey);
          serverCache.set(deviceDedupKey, true, 86400 * 365);
        }
        return { isNew: false, totalViews: currentViews, source: trafficSource };
      }
      console.warn("[InsightViewService.recordUniqueView] DB insertion error:", dbErr);
      return { isNew: false, totalViews: currentViews, source: trafficSource };
    }
  }

  /**
   * Retrieves current views for a question or knowledge insight by ID or slug.
   */
  static async getViews(
    itemId: string,
    itemType: "question" | "knowledge"
  ): Promise<number> {
    if (!itemId) return 0;
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

  /**
   * Retrieves aggregated traffic source analytics for the Super Admin dashboard.
   * Broken down across Google, LinkedIn, Twitter, Instagram, and Direct.
   */
  static async getTrafficAnalytics(): Promise<{
    totalViews: number;
    sourcesBreakdown: Record<TrafficSource, number>;
    sourcesPercentage: Record<TrafficSource, number>;
    itemTrafficMap: Record<string, Record<TrafficSource, number>>;
  }> {
    try {
      // 1. Group overall by source
      const overallGrouped = await prisma.insightView.groupBy({
        by: ["source"],
        _count: { id: true },
      });

      const sourcesBreakdown: Record<TrafficSource, number> = {
        google: 0,
        linkedin: 0,
        twitter: 0,
        instagram: 0,
        direct: 0,
      };

      let totalViews = 0;
      for (const item of overallGrouped) {
        const src = (item.source as TrafficSource) || "direct";
        if (sourcesBreakdown[src] !== undefined) {
          sourcesBreakdown[src] += item._count.id;
        } else {
          sourcesBreakdown.direct += item._count.id;
        }
        totalViews += item._count.id;
      }

      const sourcesPercentage: Record<TrafficSource, number> = {
        google: totalViews > 0 ? Math.round((sourcesBreakdown.google / totalViews) * 100) : 0,
        linkedin: totalViews > 0 ? Math.round((sourcesBreakdown.linkedin / totalViews) * 100) : 0,
        twitter: totalViews > 0 ? Math.round((sourcesBreakdown.twitter / totalViews) * 100) : 0,
        instagram: totalViews > 0 ? Math.round((sourcesBreakdown.instagram / totalViews) * 100) : 0,
        direct: totalViews > 0 ? Math.round((sourcesBreakdown.direct / totalViews) * 100) : 0,
      };

      // 2. Group per item
      const itemGrouped = await prisma.insightView.groupBy({
        by: ["item_id", "source"],
        _count: { id: true },
      });

      const itemTrafficMap: Record<string, Record<TrafficSource, number>> = {};
      for (const item of itemGrouped) {
        if (!itemTrafficMap[item.item_id]) {
          itemTrafficMap[item.item_id] = {
            google: 0,
            linkedin: 0,
            twitter: 0,
            instagram: 0,
            direct: 0,
          };
        }
        const src = (item.source as TrafficSource) || "direct";
        if (itemTrafficMap[item.item_id][src] !== undefined) {
          itemTrafficMap[item.item_id][src] += item._count.id;
        } else {
          itemTrafficMap[item.item_id].direct += item._count.id;
        }
      }

      return {
        totalViews,
        sourcesBreakdown,
        sourcesPercentage,
        itemTrafficMap,
      };
    } catch (err) {
      console.warn("[InsightViewService.getTrafficAnalytics] Error:", err);
      return {
        totalViews: 0,
        sourcesBreakdown: { google: 0, linkedin: 0, twitter: 0, instagram: 0, direct: 0 },
        sourcesPercentage: { google: 0, linkedin: 0, twitter: 0, instagram: 0, direct: 0 },
        itemTrafficMap: {},
      };
    }
  }
}

