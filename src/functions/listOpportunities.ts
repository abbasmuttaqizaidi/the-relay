import { createServerFn } from "@tanstack/react-start";
import { OpportunityService } from "../services/opportunity.service";
import { z } from "zod";

const listFiltersSchema = z.object({
  industry: z.string().optional(),
  category: z.enum(["partnership", "referral", "distribution", "vendor"]).optional(),
  status: z.enum(["active", "closed"]).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
}).optional();

export const listOpportunities = createServerFn({ method: "GET" })
  .inputValidator(listFiltersSchema)
  .handler(async ({ data }) => {
    return await OpportunityService.listActive(data);
  });
export type ListOpportunitiesFn = typeof listOpportunities;
