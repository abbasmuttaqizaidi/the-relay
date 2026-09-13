import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";

export const getAdminInsights = createServerFn({ method: "GET" })
  .handler(async () => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can access this data.");
    }

    // 2. Fetch all questions with business info & perspective counts
    const questions = await prisma.question.findMany({
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
        _count: {
          select: {
            perspectives: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // 3. Fetch all knowledge insights with business info
    const knowledgeInsights = await prisma.knowledgeInsight.findMany({
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
      orderBy: {
        created_at: "desc",
      },
    });

    // 4. Fetch all businesses for author selection
    const businesses = await prisma.business.findMany({
      select: {
        id: true,
        company_name: true,
        status: true,
        industry: true,
        logo_url: true,
      },
      orderBy: {
        company_name: "asc",
      },
    });

    return {
      questions: questions.map((q) => ({
        id: q.id,
        business_id: q.business_id,
        title: q.title,
        description: q.description,
        topic: q.topic,
        desired_perspective: q.desired_perspective,
        status: q.status,
        created_at: q.created_at.toISOString(),
        updated_at: q.updated_at.toISOString(),
        business: q.business,
        perspectives_count: q._count.perspectives,
      })),
      knowledgeInsights: knowledgeInsights.map((k) => ({
        id: k.id,
        business_id: k.business_id,
        title: k.title,
        content: k.content,
        topic: k.topic,
        based_on: k.based_on,
        status: k.status,
        created_at: k.created_at.toISOString(),
        updated_at: k.updated_at.toISOString(),
        business: k.business,
      })),
      businesses,
    };
  });

export type GetAdminInsightsFn = typeof getAdminInsights;
