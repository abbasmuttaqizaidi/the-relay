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
        };
      }

      // 2. Fetch Clerk user and check if welcome email needs to be sent
      try {
        const client = clerkClient();
        const clerkUser = await client.users.getUser(userId);
        const email =
          clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
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
      } catch (emailErr) {
        console.error("[checkOnboardingStatus] Welcome email check error:", emailErr);
      }

      // 3. Check if the user is registered in the database Users table
      const dbUser = await UserService.getUserByClerkId(userId);
      if (!dbUser) {
        return {
          isAuthenticated: true, // Logged in via Clerk
          hasBusiness: false,
          dbUserExists: false, // NOT in DB
        };
      }

      // 4. Check if they have a business profile
      const business = await BusinessService.getBusinessByOwner(dbUser.id);

      return {
        isAuthenticated: true,
        hasBusiness: !!business,
        dbUserExists: true,
        business,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        hasBusiness: false,
        dbUserExists: false,
        error: error instanceof Error ? error.message : "Unauthorized Check",
      };
    }
  });

export type CheckOnboardingStatusFn = typeof checkOnboardingStatus;
