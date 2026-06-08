import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";

export const getAdminOpportunities = createServerFn({ method: "GET" }).handler(async () => {
  // 1. Authenticate caller using local admin token cookie
  const headers = getRequestHeaders();
  const cookieHeader = headers.get("cookie") || "";
  const match = cookieHeader.match(/relay_admin_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (token !== "PP@password110") {
    throw new Error("Forbidden: Only the super admin can access this page.");
  }

  // 2. Fetch all opportunities in the system, showing business info
  const opportunities = await prisma.opportunity.findMany({
    include: {
      business: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // 3. Map to clean structures
  return {
    opportunities: opportunities.map((opp) => ({
      id: opp.id,
      opportunity_number: opp.opportunity_number,
      title: opp.title,
      description: opp.description,
      category: opp.category,
      location: opp.location,
      offer_text: opp.offer_text,
      status: opp.status,
      hide_company_name: opp.hide_company_name,
      promotion_status: opp.promotion_status,
      created_at: opp.created_at.toISOString(),
      business: {
        id: opp.business.id,
        company_name: opp.business.company_name,
        website: opp.business.website,
        industry: opp.business.industry,
      },
    })),
  };
});

export type GetAdminOpportunitiesFn = typeof getAdminOpportunities;
