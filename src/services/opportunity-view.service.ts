import { serverCache } from "../lib/server-cache";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import { calculateBaseViews } from "../lib/utils";

// Global persistent in-memory unique view registry across sessions and Vite hot reloads
const globalRef = globalThis as any;
if (!globalRef.__uniqueUserOpportunityViews) {
  globalRef.__uniqueUserOpportunityViews = new Set<string>();
}
if (!globalRef.__extraViewsMap) {
  globalRef.__extraViewsMap = new Map<string, number>();
}

const uniqueUserOpportunityViews = globalRef.__uniqueUserOpportunityViews as Set<string>;
const extraViewsMap = globalRef.__extraViewsMap as Map<string, number>;


export class OpportunityViewService {
  /**
   * Records a view for an opportunity when a non-owner user expands the card.
   * Ensures STRICT 1-view-per-user deduplication across all devices, sessions, and expand/collapse actions.
   */
  static async recordUniqueView(
    opportunityId: string,
    clerkUserId: string
  ): Promise<{ isNew: boolean; totalViews: number }> {
    if (!opportunityId || !clerkUserId) {
      return { isNew: false, totalViews: this.getViews(opportunityId) };
    }

    // 1. If real opportunity in DB, verify that viewer is NOT the owner
    try {
      if (!opportunityId.startsWith("RY-")) {
        const { prisma } = await import("../db/prisma.server");
        const opp = await prisma.opportunity.findUnique({
          where: { id: opportunityId },
          include: { business: { include: { owner: true } } },
        });
        if (opp && opp.business?.owner?.clerk_user_id === clerkUserId) {
          // Poster expanding their own listing -> do not increment
          return { isNew: false, totalViews: this.getViews(opportunityId) };
        }
      }
    } catch (_) {}

    const dedupKey = `view:${clerkUserId}:${opportunityId}`;

    // 2. Check if user has already viewed/expanded this opportunity
    if (uniqueUserOpportunityViews.has(dedupKey)) {
      return { isNew: false, totalViews: this.getViews(opportunityId) };
    }

    // 3. Also check persistent server cache
    if (serverCache.get(dedupKey)) {
      uniqueUserOpportunityViews.add(dedupKey);
      return { isNew: false, totalViews: this.getViews(opportunityId) };
    }

    // 4. Mark as viewed for this user permanently
    uniqueUserOpportunityViews.add(dedupKey);
    serverCache.set(dedupKey, true, 86400 * 365); // 1 year persistence

    // 5. Increment unique view count for this opportunity
    const currentExtra = extraViewsMap.get(opportunityId) || 0;
    const newExtra = currentExtra + 1;
    extraViewsMap.set(opportunityId, newExtra);
    serverCache.set(`opp_extra_views:${opportunityId}`, newExtra, 86400 * 365);

    const totalViews = this.getViews(opportunityId);
    return { isNew: true, totalViews };
  }

  /**
   * Retrieves the total deduplicated views count for a given opportunity.
   * - Pre-populated mock opportunities have a realistic baseline.
   * - Real user-posted opportunities start at 0 and grow 100% organically.
   */
  static getViews(opportunityId: string, interestedCount?: number): number {
    const cachedExtra = serverCache.get<number>(`opp_extra_views:${opportunityId}`);
    const extra = cachedExtra ?? (extraViewsMap.get(opportunityId) || 0);

    const mock = OPPORTUNITIES.find((m) => m?.id === opportunityId);
    const isMock = Boolean(mock);

    // If it's a real newly created opportunity, it starts at 0 and grows 100% organically
    if (!isMock) {
      return extra;
    }

    let interest = interestedCount ?? (mock ? mock.interested : 6);
    const base = calculateBaseViews(opportunityId, interest);
    return base + extra;
  }

  /**
   * Batch returns views for multiple opportunities.
   */
  static getBatchViews(opportunityIds: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    for (const id of opportunityIds) {
      result[id] = this.getViews(id);
    }
    return result;
  }
}
