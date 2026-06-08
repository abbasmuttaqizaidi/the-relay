import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { SavedOpportunityService } from "../services/saved-opportunity.service";
import { z } from "zod";
import { uuidSchema } from "../validators";

const isSavedSchema = z.object({
  opportunity_id: uuidSchema,
});

export const isOpportunitySaved = createServerFn({ method: "GET" })
  .inputValidator(isSavedSchema)
  .handler(async ({ data }) => {
    try {
      // 1. Authenticate user
      const user = await getAuthenticatedUser();

      // 2. Delegate to Service Layer
      return await SavedOpportunityService.isSaved(user.id, data.opportunity_id);
    } catch (err) {
      console.error("[isOpportunitySaved] Error:", err);
      return false;
    }
  });
export type IsOpportunitySavedFn = typeof isOpportunitySaved;
