import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { rejectBusinessSchema } from "../validators";

export const rejectBusiness = createServerFn({ method: "POST" })
  .inputValidator(rejectBusinessSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const adminUser = await getAuthenticatedUser();

    // 2. Admin check placeholder (e.g. metadata role or environment list check)
    console.log(
      `[Admin Action] User ${adminUser.clerk_user_id} requested rejection for business ${data.business_id}`,
    );

    // 3. Fetch business to resolve details
    const business = await BusinessService.getBusinessById(data.business_id);
    if (!business) {
      throw new Error("Not Found: Business profile not found.");
    }

    const ownerEmail = "owner@example.com"; // Placeholder, resolved via Clerk integration at runtime.
    const reason = "Does not meet verified B2B network requirements.";

    // 4. Delegate to Service Layer
    return await BusinessService.rejectBusiness(data.business_id, reason, ownerEmail);
  });
export type RejectBusinessFn = typeof rejectBusiness;
