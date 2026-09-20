import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { auth } from "@clerk/tanstack-react-start/server";
import { OpportunityViewService } from "../services/opportunity-view.service";

const recordViewSchema = z.object({
  opportunity_id: z.string(),
  visitor_id: z.string().optional(),
});

export const recordOpportunityView = createServerFn({ method: "POST" })
  .inputValidator(recordViewSchema)
  .handler(async ({ data }) => {
    try {
      let uniqueId: string | null = null;
      try {
        const session = await auth();
        if (session?.userId) {
          uniqueId = session.userId;
        }
      } catch (authErr) {
        // Fallback below
      }

      if (!uniqueId && data.visitor_id) {
        uniqueId = `visitor:${data.visitor_id}`;
      }

      if (!uniqueId) {
        return { isNew: false, totalViews: OpportunityViewService.getViews(data.opportunity_id) };
      }

      const result = await OpportunityViewService.recordUniqueView(
        data.opportunity_id,
        uniqueId
      );

      return { success: true, ...result };
    } catch (err) {
      console.warn("[recordOpportunityView] Error recording view:", err);
      return { isNew: false, totalViews: OpportunityViewService.getViews(data.opportunity_id) };
    }
  });

export type RecordOpportunityViewFn = typeof recordOpportunityView;

