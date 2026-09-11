import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { KnowledgeService } from "../services/knowledge.service";
import { deleteKnowledgeInsightSchema } from "../validators";

export const deleteKnowledgeInsight = createServerFn({ method: "POST" })
  .inputValidator(deleteKnowledgeInsightSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to KnowledgeService
    return await KnowledgeService.deleteKnowledgeInsight(
      data.knowledge_insight_id,
      business.id,
    );
  });

export type DeleteKnowledgeInsightFn = typeof deleteKnowledgeInsight;
