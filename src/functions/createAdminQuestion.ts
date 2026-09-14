import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { questionTopicSchema, desiredPerspectiveSchema } from "../validators";
import { resolveAdminBusiness } from "./resolveAdminBusiness";
import { verifyAdminSession } from "../lib/admin-auth.server";

const createAdminQuestionSchema = z
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
    description: z
      .string()
      .trim()
      .min(30, "Description must be at least 30 characters")
      .max(10000, "Description cannot exceed 10000 characters"),
    topic: questionTopicSchema,
    desired_perspective: desiredPerspectiveSchema.optional().nullable(),
    context_content_json: z.string().optional().nullable(),
    status: z.enum(["open", "closed"]).optional().default("open"),
  })
  .refine((data) => Boolean(data.business_id || data.custom_company_name?.trim()), {
    message: "Either select an existing business or enter a custom company name.",
    path: ["business_id"],
  });

export const createAdminQuestion = createServerFn({ method: "POST" })
  .inputValidator(createAdminQuestionSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can create questions via admin.");
    }

    // 2. Resolve business (existing or newly created)
    const business = await resolveAdminBusiness({
      business_id: data.business_id,
      custom_company_name: data.custom_company_name,
      custom_industry: data.custom_industry,
      custom_website: data.custom_website,
    });

    // 3. Create question in database
    const question = await prisma.question.create({
      data: {
        business_id: business.id,
        title: data.title,
        description: data.description,
        topic: data.topic,
        desired_perspective: data.desired_perspective || null,
        context_content_json: data.context_content_json || null,
        status: data.status || "open",
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
      question: {
        ...question,
        created_at: question.created_at.toISOString(),
        updated_at: question.updated_at.toISOString(),
        perspectives_count: 0,
      },
    };
  });

export type CreateAdminQuestionFn = typeof createAdminQuestion;
