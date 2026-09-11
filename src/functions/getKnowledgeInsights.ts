import { createServerFn } from "@tanstack/react-start";
import { KnowledgeService } from "../services/knowledge.service";
import { z } from "zod";

const getKnowledgeInsightsFilterSchema = z
  .object({
    topic: z.string().optional().nullable(),
    search: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    business_id: z.string().optional().nullable(),
    limit: z.union([z.number(), z.string()]).optional().nullable(),
    offset: z.union([z.number(), z.string()]).optional().nullable(),
  })
  .optional();

export const getKnowledgeInsights = createServerFn({ method: "GET" })
  .inputValidator(getKnowledgeInsightsFilterSchema)
  .handler(async ({ data }) => {
    const filters: any = {};

    if (data?.topic && data.topic !== "All" && data.topic !== "undefined") {
      filters.topic = data.topic;
    }

    if (data?.search && data.search !== "undefined" && data.search.trim()) {
      filters.search = data.search.trim();
    }

    if (data?.status && data.status !== "all" && data.status !== "undefined") {
      filters.status = data.status;
    }

    if (data?.business_id && data.business_id !== "undefined") {
      filters.business_id = data.business_id;
    }

    if (data?.limit) {
      filters.limit = Number(data.limit);
    }

    if (data?.offset) {
      filters.offset = Number(data.offset);
    }

    return await KnowledgeService.getKnowledgeInsights(filters);
  });

export type GetKnowledgeInsightsFn = typeof getKnowledgeInsights;
