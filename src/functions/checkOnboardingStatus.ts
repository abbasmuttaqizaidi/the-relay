import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { BusinessService } from "../services/business.service";

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

      // 2. Check if the user is registered in the database Users table
      const dbUser = await UserService.getUserByClerkId(userId);
      if (!dbUser) {
        return {
          isAuthenticated: true, // Logged in via Clerk
          hasBusiness: false,
          dbUserExists: false, // NOT in DB
        };
      }

      // 3. Check if they have a business profile
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
