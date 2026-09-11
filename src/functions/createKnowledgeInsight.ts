import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { KnowledgeService } from "../services/knowledge.service";
import { createKnowledgeInsightSchema } from "../validators";

export const createKnowledgeInsight = createServerFn({ method: "POST" })
  .inputValidator(createKnowledgeInsightSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error(
        "Precondition Failed: You must register a business profile first.",
      );
    }

    // 3. Verify business is approved (Applied businesses cannot publish)
    if (business.status !== "approved") {
      throw new Error(
        `Forbidden: Your business profile is "${business.status}". Publishing Knowledge Insights requires an approved business profile.`,
      );
    }

    // 4. Delegate to KnowledgeService with server-derived business_id
    return await KnowledgeService.createKnowledgeInsight({
      business_id: business.id,
      title: data.title,
      content: data.content,
      topic: data.topic,
      based_on: data.based_on || null,
    });
  });

export type CreateKnowledgeInsightFn = typeof createKnowledgeInsight;
