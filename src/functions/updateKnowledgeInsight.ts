import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { KnowledgeService } from "../services/knowledge.service";
import { updateKnowledgeInsightSchema } from "../validators";

export const updateKnowledgeInsight = createServerFn({ method: "POST" })
  .inputValidator(updateKnowledgeInsightSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to KnowledgeService with server-derived business_id
    return await KnowledgeService.updateKnowledgeInsight({
      knowledge_insight_id: data.knowledge_insight_id,
      business_id: business.id,
      title: data.title,
      content: data.content,
      content_json: data.content_json,
      topic: data.topic,
      based_on: data.based_on,
      status: data.status,
    });
  });

export type UpdateKnowledgeInsightFn = typeof updateKnowledgeInsight;
