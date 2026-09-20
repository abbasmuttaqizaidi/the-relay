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
              business: {
                include: {
                  owner: true,
                },
              },
            },
          },
          requesting_business: {
            include: {
              owner: true,
            },
          },
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

      // 1. Notify the expressing business owner (requester)
      try {
        await NotificationService.createNotification({
          user_id: existing.requesting_business.owner_user_id,
          title: "Handshake Complete",
          description: `${existing.opportunity.business.company_name} accepted your interest in "${existing.opportunity.title}". You can now contact them directly by email.`,
        });
      } catch (notifyErr) {
        console.error("[InterestService.acceptInterest] Requester notification failed:", notifyErr);
      }

      // 2. Notify the opportunity owner for confirmation
      try {
        await NotificationService.createNotification({
          user_id: existing.opportunity.business.owner_user_id,
          title: "Handshake Complete",
          description: `You accepted ${existing.requesting_business.company_name}'s interest in "${existing.opportunity.title}". You can now contact them directly by email.`,
        });
      } catch (notifyOwnerErr) {
        console.error("[InterestService.acceptInterest] Owner notification failed:", notifyOwnerErr);
      }

      // 3. Send email to requester via Resend
      try {
        const requesterEmail =
          existing.requesting_business.contact_email ||
          existing.requesting_business.owner?.email;
        const ownerEmail =
          existing.opportunity.business.contact_email ||
          existing.opportunity.business.owner?.email ||
          "";

        if (requesterEmail) {
          await EmailService.sendHandshakeCompleteEmail({
            toEmail: requesterEmail,
            acceptingCompanyName: existing.opportunity.business.company_name,
            acceptingBusinessEmail: ownerEmail,
            opportunityTitle: existing.opportunity.title,
            pitchMessage: existing.message,
          });
        }
      } catch (emailErr) {
        console.error("[InterestService.acceptInterest] Handshake complete email failed:", emailErr);
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
          title: "Interest Request Declined",
          description: `Your interest in "${existing.opportunity.title}" was not accepted at this time.`,
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
   * Strips private emails if request status is not accepted.
   */
  static async getIncoming(businessId: string) {
    return this.getIncomingForBusinessIds([businessId]);
  }

  /**
   * Gets incoming interest requests for any of the given business IDs.
   */
  static async getIncomingForBusinessIds(businessIds: string[]) {
    try {
      if (!businessIds || businessIds.length === 0) return [];
      const results = await prisma.interest.findMany({
        where: {
          opportunity: {
            business_id: { in: businessIds },
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

      // Server-side authorization check: Only reveal contact email if request is accepted
      for (const item of results) {
        if (item.status !== "accepted") {
          item.requesting_business.contact_email = null;
          if (item.requesting_business.owner) {
            item.requesting_business.owner.email = null;
          }
        }
      }

      return results;
    } catch (error) {
      console.error("[InterestService.getIncomingForBusinessIds] Error:", error);
      throw error;
    }
  }

  /**
   * Gets sent interest requests by a business.
   * Strips private emails if request status is not accepted.
   */
  static async getSent(businessId: string) {
    return this.getSentForBusinessIds([businessId]);
  }

  /**
   * Gets sent interest requests by any of the given business IDs.
   */
  static async getSentForBusinessIds(businessIds: string[]) {
    try {
      if (!businessIds || businessIds.length === 0) return [];
      const results = await prisma.interest.findMany({
        where: {
          requesting_business_id: { in: businessIds },
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

      // Server-side authorization check: Only reveal target business email if request is accepted
      for (const item of results) {
        if (item.status !== "accepted") {
          item.opportunity.business.contact_email = null;
          if (item.opportunity.business.owner) {
            item.opportunity.business.owner.email = null;
          }
        }
      }

      return results;
    } catch (error) {
      console.error("[InterestService.getSentForBusinessIds] Error:", error);
      throw error;
    }
  }

  /**
   * Counts incoming pending requests for a business.
   */
  static async countIncoming(businessId: string): Promise<number> {
    return this.countIncomingForBusinessIds([businessId]);
  }

  /**
   * Counts incoming pending requests for any of the given business IDs.
   */
  static async countIncomingForBusinessIds(businessIds: string[]): Promise<number> {
    try {
      if (!businessIds || businessIds.length === 0) return 0;
      return await prisma.interest.count({
        where: {
          opportunity: {
            business_id: { in: businessIds },
          },
          status: "pending",
        },
      });
    } catch (error) {
      console.error("[InterestService.countIncomingForBusinessIds] Error:", error);
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
