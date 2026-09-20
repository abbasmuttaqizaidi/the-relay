import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { BusinessService } from "../services/business.service";
import { EmailService } from "../services/email.service";

export const checkOnboardingStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      // 1. Get Clerk user session ID
      const { userId } = await auth();

      if (!userId) {
        return {
          isAuthenticated: false,
          hasBusiness: false,
          dbUserExists: false,
          legalAckAccepted: false,
        };
      }

      let legalAckAccepted = false;
      let email = "";
      let clerkUser: any = null;

      // 2. Fetch Clerk user and check if welcome email needs to be sent
      try {
        const client = clerkClient();
        clerkUser = await client.users.getUser(userId);
        email =
          clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress ||
          "";

        // Dispatch welcome email on first signup/visit if not already sent
        if (email && !clerkUser.privateMetadata?.welcome_email_sent) {
          const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ");
          await EmailService.sendWelcomeEmail(email, name || undefined);
          await client.users.updateUserMetadata(userId, {
            privateMetadata: { welcome_email_sent: true },
          });
          console.log(`[Welcome Email] Successfully dispatched welcome email to ${email} (${userId})`);
        }

        if (
          clerkUser.publicMetadata?.legal_ack_accepted ||
          clerkUser.privateMetadata?.legal_ack_accepted ||
          clerkUser.unsafeMetadata?.legal_ack_accepted
        ) {
          legalAckAccepted = true;
        }
      } catch (emailErr) {
        console.error("[checkOnboardingStatus] Welcome email check error:", emailErr);
      }

      // 3. Check if the user is registered in the database Users table (or resolve by email)
      const { prisma } = await import("../db/prisma.server");
      let dbUser = await UserService.getUserByClerkId(userId);

      if (!dbUser && email) {
        const userByEmail = await prisma.user.findFirst({
          where: { email: { equals: email, mode: "insensitive" } },
        });

        if (userByEmail) {
          await prisma.user.update({
            where: { id: userByEmail.id },
            data: { clerk_user_id: userId },
          });
          dbUser = {
            id: userByEmail.id,
            clerk_user_id: userId,
            email: userByEmail.email,
            created_at: userByEmail.created_at.toISOString(),
          };
          const { serverCache } = await import("../lib/server-cache");
          serverCache.set(`user:clerk:${userId}`, dbUser, 300);
        } else {
          try {
            dbUser = await UserService.createUser({ clerk_user_id: userId, email });
          } catch (_) {}
        }
      }

      if (!dbUser) {
        return {
          isAuthenticated: true,
          hasBusiness: false,
          dbUserExists: false,
          legalAckAccepted,
        };
      }

      // 4. Check if they have a business profile
      let business = await BusinessService.getBusinessByOwner(dbUser.id);
      
      if (!business && email) {
        const fallbackBiz = await prisma.business.findFirst({
          where: {
            OR: [
              { contact_email: { equals: email, mode: "insensitive" } },
              { owner: { email: { equals: email, mode: "insensitive" } } },
            ],
          },
        });
        if (fallbackBiz) {
          if (fallbackBiz.owner_user_id !== dbUser.id) {
            await prisma.business.update({
              where: { id: fallbackBiz.id },
              data: { owner_user_id: dbUser.id },
            });
            await prisma.businessMember.upsert({
              where: {
                business_id_user_id: {
                  business_id: fallbackBiz.id,
                  user_id: dbUser.id,
                },
              },
              create: {
                business_id: fallbackBiz.id,
                user_id: dbUser.id,
                role: "owner",
              },
              update: {
                role: "owner",
              },
            });
          }
          business = BusinessService.mapBusinessModel(fallbackBiz);
        }
      }

      let completedExchanges = 0;
      let activeExchanges = 0;

      if (business) {
        legalAckAccepted = true;
        // Sync Clerk metadata if missing
        if (clerkUser && !clerkUser.publicMetadata?.legal_ack_accepted) {
          try {
            const client = clerkClient();
            await client.users.updateUserMetadata(userId, {
              publicMetadata: {
                legal_ack_accepted: true,
                legal_ack_accepted_at: new Date().toISOString(),
              },
            });
          } catch (_) {}
        }

        try {
          completedExchanges = await prisma.exchangeAgreement.count({
            where: {
              OR: [
                { owner_business_id: business.id },
                { interested_business_id: business.id },
              ],
              status: "agreed",
            },
          });

          activeExchanges = await prisma.interest.count({
            where: {
              OR: [
                { requesting_business_id: business.id },
                { opportunity: { business_id: business.id } },
              ],
              status: { in: ["accepted", "in_discussion", "negotiation", "agreement"] },
            },
          });
        } catch (dbErr) {
          console.error("[checkOnboardingStatus] Error counting exchange telemetry:", dbErr);
        }
      }

      return {
        isAuthenticated: true,
        hasBusiness: !!business,
        dbUserExists: true,
        business,
        legalAckAccepted,
        telemetry: {
          completedExchanges,
          activeExchanges,
          reciprocalParity: completedExchanges > 0 ? "100%" : "—",
        },
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        hasBusiness: false,
        dbUserExists: false,
        legalAckAccepted: false,
        error: error instanceof Error ? error.message : "Unauthorized Check",
      };
    }
  });

export type CheckOnboardingStatusFn = typeof checkOnboardingStatus;
