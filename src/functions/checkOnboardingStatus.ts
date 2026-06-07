import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";

export const checkOnboardingStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      // 1. Authenticate user (this will also register them in DB if newly signed up on Clerk)
      const user = await getAuthenticatedUser();

      // 2. Check if they have a business profile
      const business = await BusinessService.getBusinessByOwner(user.id);

      return {
        isAuthenticated: true,
        hasBusiness: !!business,
        business,
      };
    } catch (error) {
      // If not authenticated, return isAuthenticated: false
      return {
        isAuthenticated: false,
        hasBusiness: false,
        error: error instanceof Error ? error.message : "Unauthorized",
      };
    }
  });

export type CheckOnboardingStatusFn = typeof checkOnboardingStatus;
