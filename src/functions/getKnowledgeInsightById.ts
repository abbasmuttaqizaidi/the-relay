import { createServerFn } from "@tanstack/react-start";
import { KnowledgeService } from "../services/knowledge.service";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
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

    // Public access allows reading published articles.
    // Unpublished or archived articles are restricted to the author business owner only.
    if (insight.status !== "published") {
      let isOwner = false;
      try {
        const user = await getAuthenticatedUser();
        const business = await BusinessService.getBusinessByOwner(user.id);
        if (business && business.id === insight.business_id) {
          isOwner = true;
        }
      } catch {
        isOwner = false;
      }

      if (!isOwner) {
        throw new Error("Knowledge insight not found");
      }
    }

    return insight;
  });

export type GetKnowledgeInsightByIdFn = typeof getKnowledgeInsightById;
