import { prisma } from "../db/prisma.server";
import { SavedOpportunity } from "../types";

export class SavedOpportunityService {
  /**
   * Saves an opportunity for a user.
   */
  static async save(userId: string, opportunityId: string): Promise<SavedOpportunity> {
    try {
      // Create saved opportunity
      const saved = await prisma.savedOpportunity.create({
        data: {
          user_id: userId,
          opportunity_id: opportunityId,
        },
      });

      // Optional: Optional activity logging (try/catch to avoid failure if table does not exist)
      try {
        const opp = await prisma.opportunity.findUnique({
          where: { id: opportunityId },
          select: { opportunity_number: true },
        });
        await (prisma as any).activityLog.create({
          data: {
            user_id: userId,
            action: "opportunity_saved",
            metadata: {
              opportunity_id: opportunityId,
              opportunity_number: opp?.opportunity_number || "",
            },
          },
        });
      } catch (logErr) {
        // Suppress errors for optional activity logging table if it doesn't exist
      }

      return {
        id: saved.id,
        user_id: saved.user_id,
        opportunity_id: saved.opportunity_id,
        created_at: saved.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[SavedOpportunityService.save] Error:", error);
      throw new Error(`Failed to save opportunity: ${error.message || error}`);
    }
  }

  /**
   * Removes a saved opportunity for a user.
   */
  static async remove(userId: string, opportunityId: string): Promise<boolean> {
    try {
      await prisma.savedOpportunity.delete({
        where: {
          user_id_opportunity_id: {
            user_id: userId,
            opportunity_id: opportunityId,
          },
        },
      });
      return true;
    } catch (error: any) {
      console.error("[SavedOpportunityService.remove] Error:", error);
      throw new Error(`Failed to remove saved opportunity: ${error.message || error}`);
    }
  }

  /**
   * Lists all saved opportunities for a user, including detailed opportunity and business context.
   */
  static async listByUser(userId: string) {
    try {
      const list = await prisma.savedOpportunity.findMany({
        where: { user_id: userId },
        include: {
          opportunity: {
            include: {
              business: {
                select: {
                  company_name: true,
                  industry: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return list.map((item) => ({
        id: item.id,
        user_id: item.user_id,
        opportunity_id: item.opportunity_id,
        created_at: item.created_at.toISOString(),
        opportunity: {
          ...item.opportunity,
          company: item.opportunity.business?.company_name || "Confidential",
          industry: item.opportunity.business?.industry || item.opportunity.category,
          expires_at: item.opportunity.expires_at ? item.opportunity.expires_at.toISOString() : null,
        },
      }));
    } catch (error: any) {
      console.error("[SavedOpportunityService.listByUser] Error:", error);
      throw new Error(`Failed to list saved opportunities: ${error.message || error}`);
    }
  }

  /**
   * Checks if a user has saved a specific opportunity.
   */
  static async isSaved(userId: string, opportunityId: string): Promise<boolean> {
    try {
      const count = await prisma.savedOpportunity.count({
        where: {
          user_id: userId,
          opportunity_id: opportunityId,
        },
      });
      return count > 0;
    } catch (error) {
      console.error("[SavedOpportunityService.isSaved] Error:", error);
      return false;
    }
  }

  /**
   * Counts the number of saved opportunities for a user.
   */
  static async countSaved(userId: string): Promise<number> {
    try {
      return await prisma.savedOpportunity.count({
        where: {
          user_id: userId,
        },
      });
    } catch (error) {
      console.error("[SavedOpportunityService.countSaved] Error:", error);
      return 0;
    }
  }
}
