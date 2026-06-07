import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { approveBusinessSchema } from "../validators";

export const approveBusiness = createServerFn({ method: "POST" })
  .inputValidator(approveBusinessSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const adminUser = await getAuthenticatedUser();

    // 2. Admin check placeholder (e.g. metadata role or environment list check)
    // For now, we allow the operation but log an audit trail.
    console.log(
      `[Admin Action] User ${adminUser.clerk_user_id} requested approval for business ${data.business_id}`,
    );

    // 3. Fetch business to resolve details
    const business = await BusinessService.getBusinessById(data.business_id);
    if (!business) {
      throw new Error("Not Found: Business profile not found.");
    }

    // 4. Resolve owner email (e.g. query Clerk in the future; using mock fallback for now)
    const ownerEmail = "owner@example.com";

    // 5. Delegate to Service Layer
    return await BusinessService.approveBusiness(data.business_id, ownerEmail);
  });
export type ApproveBusinessFn = typeof approveBusiness;
