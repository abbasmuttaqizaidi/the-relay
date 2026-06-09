import { prisma } from "../db/prisma.server";
import { Interest, ExpressInterestDTO } from "../types";
import { NotificationService } from "./notification.service";
import { EmailService } from "./email.service";

export class InterestService {
  /**
   * Records interest from a business on an opportunity.
   */
  static async expressInterest(dto: ExpressInterestDTO): Promise<Interest> {
    try {
      // 1. Fetch opportunity and owner details
      const opportunity = await prisma.opportunity.findUnique({
        where: { id: dto.opportunity_id },
        include: {
          business: {
            select: {
              id: true,
              company_name: true,
              owner_user_id: true,
            },
          },
        },
      });

      if (!opportunity || !opportunity.business) {
        throw new Error("Associated business not found for this opportunity.");
      }

      // 2. Enforce rules
      if (opportunity.business.id === dto.business_id) {
        throw new Error("You cannot express interest in your own opportunity.");
      }

      // 3. Fetch pitching business details
      const pitchingBusiness = await prisma.business.findUnique({
        where: { id: dto.business_id },
        select: {
          company_name: true,
          status: true,
        },
      });

      if (!pitchingBusiness) {
        throw new Error("Pitching business not found.");
      }

      if (pitchingBusiness.status !== "approved") {
        throw new Error("Only approved businesses can express interest.");
      }

      // 4. Check for duplicate interest (both active or inactive)
      const existing = await prisma.interest.findUnique({
        where: {
          opportunity_id_requesting_business_id: {
            opportunity_id: dto.opportunity_id,
            requesting_business_id: dto.business_id,
          },
        },
      });

      if (existing) {
        if (existing.status === "withdrawn") {
          // Reactivate it
          const updated = await prisma.interest.update({
            where: { id: existing.id },
            data: {
              status: "pending",
              message: dto.message || null,
            },
          });

          // Log activity
          await prisma.activityLog.create({
            data: {
              action: "Interest Sent",
              details: `Interest re-sent by business ${dto.business_id} on opportunity ${dto.opportunity_id}`,
            },
          });

          return {
            id: updated.id,
            opportunity_id: updated.opportunity_id,
            requesting_business_id: updated.requesting_business_id,
            message: updated.message,
            status: updated.status as any,
            created_at: updated.created_at.toISOString(),
            updated_at: updated.updated_at.toISOString(),
          };
        } else {
          throw new Error("You have already expressed interest in this opportunity.");
        }
      }

      // 5. Insert interest record
      const interest = await prisma.interest.create({
        data: {
          opportunity_id: dto.opportunity_id,
          requesting_business_id: dto.business_id,
          message: dto.message || null,
          status: "pending",
        },
      });

      // 6. Create internal notification for the opportunity owner
      try {
        await NotificationService.createNotification({
          user_id: opportunity.business.owner_user_id,
          title: "New Interest Received",
          description: `${pitchingBusiness.company_name} is interested in your opportunity: "${opportunity.title}"`,
        });
      } catch (notifErr) {
        console.error("[InterestService.expressInterest] Notification failed:", notifErr);
      }

      // 7. Trigger email
      try {
        await EmailService.sendInterestReceived(
          "owner@example.com", // Placeholder
          opportunity.title,
          pitchingBusiness.company_name,
        );
      } catch (emailErr) {
        console.error("[InterestService.expressInterest] Email failed:", emailErr);
      }

      // 8. Log activity
      await prisma.activityLog.create({
        data: {
          action: "Interest Sent",
          details: `Business "${pitchingBusiness.company_name}" expressed interest in opportunity "${opportunity.title}" (ID: ${opportunity.id})`,
        },
      });

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        requesting_business_id: interest.requesting_business_id,
        message: interest.message,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
        updated_at: interest.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.expressInterest] Error:", error);
      throw error;
    }
  }

  /**
   * Withdraws interest request (only if pending).
   */
  static async withdrawInterest(interestId: string): Promise<Interest> {
    try {
      const existing = await prisma.interest.findUnique({
        where: { id: interestId },
      });

      if (!existing) {
        throw new Error("Interest request not found.");
      }

      if (existing.status !== "pending") {
        throw new Error(`Cannot withdraw interest that is already ${existing.status}.`);
      }

      const interest = await prisma.interest.update({
        where: { id: interestId },
        data: { status: "withdrawn" },
      });

      // Log activity
      await prisma.activityLog.create({
        data: {
          action: "Interest Withdrawn",
          details: `Interest request ${interestId} withdrawn.`,
        },
      });

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        requesting_business_id: interest.requesting_business_id,
        message: interest.message,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
        updated_at: interest.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.withdrawInterest] Error:", error);
      throw error;
    }
  }

  /**
   * Accepts interest request.
   */
  static async acceptInterest(interestId: string): Promise<Interest> {
    try {
      const existing = await prisma.interest.findUnique({
        where: { id: interestId },
        include: {
          opportunity: {
            include: {
              business: true,
            },
          },
          requesting_business: true,
        },
      });

      if (!existing) {
        throw new Error("Interest request not found.");
      }

      if (existing.status !== "pending") {
        throw new Error(`Cannot accept interest that is already ${existing.status}.`);
      }

      const interest = await prisma.interest.update({
        where: { id: interestId },
        data: { status: "accepted" },
      });

      // Notify the expressing business owner
      try {
        await NotificationService.createNotification({
          user_id: existing.requesting_business.owner_user_id,
          title: "Your Interest Was Accepted",
          description: `Your interest in "${existing.opportunity.title}" was accepted by ${existing.opportunity.business.company_name}. Contact details unlocked!`,
        });
      } catch (notifyErr) {
        console.error("[InterestService.acceptInterest] Notification failed:", notifyErr);
      }

      // Log activity
      await prisma.activityLog.create({
        data: {
          action: "Interest Accepted",
          details: `Interest request ${interestId} accepted by opportunity owner business ${existing.opportunity.business.id}`,
        },
      });

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        requesting_business_id: interest.requesting_business_id,
        message: interest.message,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
        updated_at: interest.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.acceptInterest] Error:", error);
      throw error;
    }
  }

  /**
   * Rejects/declines interest request.
   */
  static async declineInterest(interestId: string): Promise<Interest> {
    try {
      const existing = await prisma.interest.findUnique({
        where: { id: interestId },
        include: {
          opportunity: {
            include: {
              business: true,
            },
          },
          requesting_business: true,
        },
      });

      if (!existing) {
        throw new Error("Interest request not found.");
      }

      if (existing.status !== "pending") {
        throw new Error(`Cannot decline interest that is already ${existing.status}.`);
      }

      const interest = await prisma.interest.update({
        where: { id: interestId },
        data: { status: "declined" },
      });

      // Notify the expressing business owner
      try {
        await NotificationService.createNotification({
          user_id: existing.requesting_business.owner_user_id,
          title: "Your Interest Was Declined",
          description: `Your interest in "${existing.opportunity.title}" was declined by ${existing.opportunity.business.company_name}.`,
        });
      } catch (notifyErr) {
        console.error("[InterestService.declineInterest] Notification failed:", notifyErr);
      }

      // Log activity
      await prisma.activityLog.create({
        data: {
          action: "Interest Declined",
          details: `Interest request ${interestId} declined by opportunity owner business ${existing.opportunity.business.id}`,
        },
      });

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        requesting_business_id: interest.requesting_business_id,
        message: interest.message,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
        updated_at: interest.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.declineInterest] Error:", error);
      throw error;
    }
  }

  /**
   * Gets incoming interest requests for a business's opportunities.
   */
  static async getIncoming(businessId: string) {
    try {
      return await prisma.interest.findMany({
        where: {
          opportunity: {
            business_id: businessId,
          },
        },
        include: {
          requesting_business: {
            include: {
              owner: true,
            },
          },
          opportunity: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    } catch (error) {
      console.error("[InterestService.getIncoming] Error:", error);
      throw error;
    }
  }

  /**
   * Gets sent interest requests by a business.
   */
  static async getSent(businessId: string) {
    try {
      return await prisma.interest.findMany({
        where: {
          requesting_business_id: businessId,
        },
        include: {
          opportunity: {
            include: {
              business: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
    } catch (error) {
      console.error("[InterestService.getSent] Error:", error);
      throw error;
    }
  }

  /**
   * Counts incoming pending requests for a business.
   */
  static async countIncoming(businessId: string): Promise<number> {
    try {
      return await prisma.interest.count({
        where: {
          opportunity: {
            business_id: businessId,
          },
          status: "pending",
        },
      });
    } catch (error) {
      console.error("[InterestService.countIncoming] Error:", error);
      throw error;
    }
  }

  /**
   * Counts all pending interests received or overall.
   */
  static async countPending(businessId: string): Promise<number> {
    return this.countIncoming(businessId);
  }

  /**
   * Gets a request by id.
   */
  static async getRequestById(interestId: string) {
    try {
      return await prisma.interest.findUnique({
        where: { id: interestId },
        include: {
          requesting_business: {
            include: {
              owner: true,
            },
          },
          opportunity: {
            include: {
              business: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("[InterestService.getRequestById] Error:", error);
      throw error;
    }
  }
}
