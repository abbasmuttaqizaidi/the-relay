import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { KnowledgeService } from "../services/knowledge.service";
import { archiveKnowledgeInsightSchema } from "../validators";

export const archiveKnowledgeInsight = createServerFn({ method: "POST" })
  .inputValidator(archiveKnowledgeInsightSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to KnowledgeService
    return await KnowledgeService.archiveKnowledgeInsight(
      data.knowledge_insight_id,
      business.id,
    );
  });

export type ArchiveKnowledgeInsightFn = typeof archiveKnowledgeInsight;
