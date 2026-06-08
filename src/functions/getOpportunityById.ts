import { createServerFn } from "@tanstack/react-start";
import { OpportunityService } from "../services/opportunity.service";
import { z } from "zod";

export const getOpportunityById = createServerFn({ method: "GET" })
  .inputValidator(z.object({ opportunity_id: z.string().uuid() }))
  .handler(async ({ data }) => {
    return await OpportunityService.getOpportunityById(data.opportunity_id);
  });
export type GetOpportunityByIdFn = typeof getOpportunityById;
