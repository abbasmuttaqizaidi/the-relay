import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { OpportunityService } from "../services/opportunity.service";
import { saveOpportunitySchema } from "../validators";

export const saveOpportunity = createServerFn({ method: "POST" })
  .inputValidator(saveOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Delegate to Service Layer
    await OpportunityService.saveOpportunity(user.id, data.opportunity_id);

    return { success: true, opportunity_id: data.opportunity_id };
  });
export type SaveOpportunityFn = typeof saveOpportunity;
