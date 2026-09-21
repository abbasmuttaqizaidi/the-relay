import { prisma } from "../db/prisma.server";
import { SITE_URL } from "./seo";

export const STATIC_CANONICAL_ROUTES = [
  "/",
  "/solutions",
  "/about",
  "/8-step-journey",
  "/core-pillars",
  "/trust-and-safety",
  "/faq",
  "/b2b-opportunity-exchange",
  "/b2b-lead-exchange",
  "/b2b-referral-network",
  "/b2b-partnership-network",
  "/referral-partnerships",
  "/channel-partnerships",
  "/distribution-partners",
  "/agency-lead-exchange",
  "/what-to-do-with-unqualified-leads",
  "/how-to-monetize-unqualified-leads",
  "/how-to-find-b2b-referral-partners",
  "/how-to-find-distribution-partners",
  "/how-to-exchange-business-leads",
  "/insights",
] as const;

export interface SitemapBreakdown {
  staticUrls: string[];
  questionUrls: string[];
  knowledgeUrls: string[];
  totalUrls: number;
}

/**
 * Fetch all published, publicly indexable URLs from static definitions and live database
 */
export async function getPublicSitemapUrls(): Promise<SitemapBreakdown> {
  const staticUrls = STATIC_CANONICAL_ROUTES.map((route) => {
    return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  });

  let questionUrls: string[] = [];
  let knowledgeUrls: string[] = [];

  try {
    // 1. Query public questions (open or closed, not drafts/private)
    const questions = await prisma.question.findMany({
      where: {
        status: { in: ["open", "closed"] },
      },
      select: {
        id: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    questionUrls = questions
      .filter((q) => Boolean(q.id))
      .map((q) => `${SITE_URL}/insights/${q.id}`);
  } catch (err) {
    console.error("[Sitemap] Failed to query published questions:", err);
  }

  try {
    // 2. Query published knowledge articles (status = 'published' only, exclude drafts/archived)
    const knowledgeInsights = await prisma.knowledgeInsight.findMany({
      where: {
        status: "published",
      },
      select: {
        id: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    knowledgeUrls = knowledgeInsights
      .filter((k) => Boolean(k.id))
      .map((k) => `${SITE_URL}/insights/knowledge/${k.id}`);
  } catch (err) {
    console.error("[Sitemap] Failed to query published knowledge articles:", err);
  }

  // Deduplicate and filter out any invalid paths
  const allUnique = Array.from(
    new Set([...staticUrls, ...questionUrls, ...knowledgeUrls])
  );

  return {
    staticUrls,
    questionUrls,
    knowledgeUrls,
    totalUrls: allUnique.length,
  };
}

/**
 * Generate standard XML sitemap string dynamically
 */
export async function generateSitemapXml(): Promise<string> {
  const { staticUrls, questionUrls, knowledgeUrls } = await getPublicSitemapUrls();

  // Combine and deduplicate
  const allUrls = Array.from(
    new Set([...staticUrls, ...questionUrls, ...knowledgeUrls])
  );

  const urlElements = allUrls
    .map((url) => {
      return `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlElements}\n</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
