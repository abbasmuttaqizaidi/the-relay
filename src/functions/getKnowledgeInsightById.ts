import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { KnowledgeService } from "../services/knowledge.service";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { verifyAdminSession } from "../lib/admin-auth.server";
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
    // Unpublished or archived articles are restricted to the author business owner or admin only.
    if (insight.status !== "published") {
      let isAllowed = false;
      try {
        const headers = getRequestHeaders();
        const cookieHeader = headers.get("cookie") || "";
        if (verifyAdminSession(cookieHeader)) {
          isAllowed = true;
        }
      } catch {
        // Not admin
      }

      if (!isAllowed) {
        try {
          const user = await getAuthenticatedUser();
          const business = await BusinessService.getBusinessByOwner(user.id);
          if (business && business.id === insight.business_id) {
            isAllowed = true;
          }
        } catch {
          isAllowed = false;
        }
      }

      if (!isAllowed) {
        throw new Error("Knowledge insight not found");
      }
    }

    return insight;
  });

export type GetKnowledgeInsightByIdFn = typeof getKnowledgeInsightById;
