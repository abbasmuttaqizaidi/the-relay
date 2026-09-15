import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { questionTopicSchema, knowledgeInsightBasedOnSchema } from "../validators";
import { resolveAdminBusiness } from "./resolveAdminBusiness";
import { verifyAdminSession } from "../lib/admin-auth.server";

const createAdminKnowledgeInsightSchema = z
  .object({
    business_id: z.string().uuid("Invalid business ID").optional().nullable(),
    custom_company_name: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters")
      .optional()
      .nullable(),
    custom_industry: z.string().trim().max(100).optional().nullable(),
    custom_website: z.string().trim().max(200).optional().nullable(),
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(200, "Title cannot exceed 200 characters"),
    content: z
      .string()
      .trim()
      .min(50, "Content must be at least 50 characters")
      .max(5000, "Content cannot exceed 5000 characters"),
    topic: questionTopicSchema,
    based_on: knowledgeInsightBasedOnSchema.optional().nullable(),
    content_json: z.string().optional().nullable(),
    status: z.enum(["published", "draft", "archived"]).optional().default("published"),
  })
  .refine((data) => Boolean(data.business_id || data.custom_company_name?.trim()), {
    message: "Either select an existing business or enter a custom company name.",
    path: ["business_id"],
  });

export const createAdminKnowledgeInsight = createServerFn({ method: "POST" })
  .inputValidator(createAdminKnowledgeInsightSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can create knowledge insights via admin.");
    }

    // 2. Resolve business (existing or newly created)
    const business = await resolveAdminBusiness({
      business_id: data.business_id,
      custom_company_name: data.custom_company_name,
      custom_industry: data.custom_industry,
      custom_website: data.custom_website,
    });

    // 3. Create knowledge insight in database
    const status = data.status || "published";
    const insight = await prisma.knowledgeInsight.create({
      data: {
        business_id: business.id,
        title: data.title,
        content: data.content,
        content_json: data.content_json || null,
        topic: data.topic,
        based_on: data.based_on || null,
        status,
        published_at: status === "published" ? new Date() : null,
      },
      include: {
        business: {
          select: {
            id: true,
            company_name: true,
            logo_url: true,
            status: true,
            industry: true,
          },
        },
      },
    });

    return {
      success: true,
      knowledgeInsight: {
        ...insight,
        created_at: insight.created_at.toISOString(),
        updated_at: insight.updated_at.toISOString(),
      },
    };
  });

export type CreateAdminKnowledgeInsightFn = typeof createAdminKnowledgeInsight;
