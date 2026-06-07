import { prisma } from "../db/prisma.server";
import { Interest, ExpressInterestDTO } from "../types";
import { NotificationService } from "./notification.service";
import { EmailService } from "./email.service";

export class InterestService {
  /**
   * Records interest from a business on an opportunity via Prisma.
   * Creates a notification for the opportunity owner and logs an email placeholder.
   */
  static async expressInterest(dto: ExpressInterestDTO): Promise<Interest> {
    try {
      // 1. Fetch opportunity and owner details
      const opportunity = await prisma.opportunity.findUnique({
        where: { id: dto.opportunity_id },
        include: {
          business: {
            select: {
              company_name: true,
              owner_user_id: true,
            },
          },
        },
      });

      if (!opportunity || !opportunity.business) {
        throw new Error("Associated business not found for this opportunity.");
      }

      // 2. Fetch pitching business details
      const pitchingBusiness = await prisma.business.findUnique({
        where: { id: dto.business_id },
        select: {
          company_name: true,
        },
      });

      if (!pitchingBusiness) {
        throw new Error("Pitching business not found.");
      }

      const ownerUserId = opportunity.business.owner_user_id;
      const opportunityTitle = opportunity.title;
      const pitchingCompanyName = pitchingBusiness.company_name;

      // 3. Insert interest record
      const interest = await prisma.interest.create({
        data: {
          opportunity_id: dto.opportunity_id,
          business_id: dto.business_id,
          status: "pending",
        },
      });

      // 4. Create internal notification for the opportunity owner
      try {
        await NotificationService.createNotification({
          user_id: ownerUserId,
          title: "New Interest Expressed",
          description: `"${pitchingCompanyName}" is interested in your opportunity: "${opportunityTitle}"`,
        });
      } catch (notifErr) {
        console.error("[InterestService.expressInterest] Notification failed:", notifErr);
      }

      // 5. Trigger placeholder email to the opportunity owner
      await EmailService.sendInterestReceived(
        "owner@example.com", // Placeholder: replaced with Clerk email at runtime
        opportunityTitle,
        pitchingCompanyName,
      );

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        business_id: interest.business_id,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.expressInterest] Error:", error);
      throw new Error(`Failed to record interest: ${error.message || error}`);
    }
  }

  /**
   * Accepts interest request.
   */
  static async acceptInterest(interestId: string): Promise<Interest> {
    try {
      const interest = await prisma.interest.update({
        where: { id: interestId },
        data: { status: "accepted" },
      });

      // Notify the expressing business owner
      try {
        const business = await prisma.business.findUnique({
          where: { id: interest.business_id },
          select: {
            owner_user_id: true,
          },
        });

        if (business) {
          await NotificationService.createNotification({
            user_id: business.owner_user_id,
            title: "Interest Accepted!",
            description: `Your introduction request has been accepted. Contact details unlocked.`,
          });
        }
      } catch (notifyErr) {
        console.error("[InterestService.acceptInterest] Notification failed:", notifyErr);
      }

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        business_id: interest.business_id,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.acceptInterest] Error:", error);
      throw new Error(`Failed to accept interest: ${error.message || error}`);
    }
  }

  /**
   * Rejects interest request.
   */
  static async rejectInterest(interestId: string): Promise<Interest> {
    try {
      const interest = await prisma.interest.update({
        where: { id: interestId },
        data: { status: "rejected" },
      });

      return {
        id: interest.id,
        opportunity_id: interest.opportunity_id,
        business_id: interest.business_id,
        status: interest.status as any,
        created_at: interest.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[InterestService.rejectInterest] Error:", error);
      throw new Error(`Failed to reject interest: ${error.message || error}`);
    }
  }
}
