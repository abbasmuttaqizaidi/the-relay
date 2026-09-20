import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { OpportunityViewService } from "../services/opportunity-view.service";

const getViewsSchema = z.object({
  opportunity_ids: z.array(z.string()),
});

export const getOpportunityViews = createServerFn({ method: "POST" })
  .inputValidator(getViewsSchema)
  .handler(async ({ data }) => {
    return OpportunityViewService.getBatchViews(data.opportunity_ids);
  });

export type GetOpportunityViewsFn = typeof getOpportunityViews;
