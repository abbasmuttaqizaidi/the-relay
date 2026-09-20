import { prisma } from "../db/prisma.server";
import { OPPORTUNITIES } from "./mock-opportunities";

export async function ensureDatabaseOpportunitiesSeeded() {
  try {
    const count = await prisma.opportunity.count();
    if (count >= 15) {
      return { seeded: 0, existing: count };
    }

    // 1. Create or get system verified seed user
    const systemUser = await prisma.user.upsert({
      where: { clerk_user_id: "system_verified_seed_operator" },
      update: {},
      create: {
        clerk_user_id: "system_verified_seed_operator",
        email: "partnerships@therelay.io",
        tour_completed: true,
      },
    });

    let seededCount = 0;

    // 2. Iterate through top mock opportunities and seed them as real DB records
    for (const opp of OPPORTUNITIES.slice(0, 30)) {
      if (!opp.title || !opp.company) continue;

      const category = (opp.type || "Partnership").toLowerCase().replace(/\s+/g, "_");
      const companyDomain = opp.company.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";

      // Upsert Business
      let business = await prisma.business.findFirst({
        where: {
          company_name: opp.company,
        },
      });

      if (!business) {
        business = await prisma.business.create({
          data: {
            owner_user_id: systemUser.id,
            company_name: opp.company,
            website: `https://${companyDomain}`,
            industry: opp.industry || "SaaS",
            description: `Enterprise partner in ${opp.industry || "B2B SaaS"}. Verified provider on The Relay.`,
            hq_location: opp.geo || "Global / Remote",
            status: "approved",
            website_verified: true,
            website_verified_at: new Date(),
          },
        });
      } else if (business.status !== "approved") {
        await prisma.business.update({
          where: { id: business.id },
          data: { status: "approved" },
        });
      }

      // Ensure BusinessMember link
      await prisma.businessMember.upsert({
        where: {
          business_id_user_id: {
            business_id: business.id,
            user_id: systemUser.id,
          },
        },
        create: {
          business_id: business.id,
          user_id: systemUser.id,
          role: "owner",
        },
        update: {},
      });

      // Upsert Opportunity
      const oppNum = opp.id && opp.id.startsWith("RY-") ? opp.id : `RY-${String(9100 + seededCount)}`;
      
      const existingOpp = await prisma.opportunity.findUnique({
        where: { opportunity_number: oppNum },
      });

      if (!existingOpp) {
        await prisma.opportunity.create({
          data: {
            business_id: business.id,
            opportunity_number: oppNum,
            title: opp.title,
            description: opp.description || "Strategic reciprocal opportunity on The Relay.",
            category,
            industry: opp.industry || "SaaS",
            location: opp.geo || "Global / Remote",
            offer_text: opp.offer_text || "Reciprocal margin share and co-marketing.",
            status: "active",
            hide_company_name: opp.hide_company_name ?? false,
            expires_at: opp.expires_at ? new Date(opp.expires_at) : new Date(Date.now() + 45 * 86400000),
          },
        });
      }

      seededCount++;
    }

    console.log(`[Seed Opportunities] Successfully ensured ${seededCount} opportunities in DB.`);
    return { seeded: seededCount, existing: count };
  } catch (error) {
    console.error("[Seed Opportunities] Error seeding database:", error);
    return { error: String(error) };
  }
}
