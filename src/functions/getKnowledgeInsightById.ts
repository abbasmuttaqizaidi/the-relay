import { createServerFn } from "@tanstack/react-start";
import { KnowledgeService } from "../services/knowledge.service";
import { z } from "zod";

const getKnowledgeInsightByIdSchema = z.object({
  id: z.string().uuid("Invalid knowledge insight ID"),
});

export const getKnowledgeInsightById = createServerFn({ method: "GET" })
  .inputValidator(getKnowledgeInsightByIdSchema)
  .handler(async ({ data }) => {
    const insight = await KnowledgeService.getKnowledgeInsightById(data.id);
    if (!insight) {
      throw new Error("Knowledge insight not found");
    }
    return insight;
  });

export type GetKnowledgeInsightByIdFn = typeof getKnowledgeInsightById;
