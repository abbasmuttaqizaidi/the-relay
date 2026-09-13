import { prisma } from "../db/prisma.server";

export interface ResolveAdminBusinessInput {
  business_id?: string | null;
  custom_company_name?: string | null;
  custom_industry?: string | null;
  custom_website?: string | null;
}

/**
 * Resolves an author business for admin creation.
 * If custom_company_name is provided:
 *  - Checks if a business with that name already exists (case-insensitive)
 *  - If not, automatically creates a new approved business record linked to an admin/system user
 * If business_id is provided:
 *  - Verifies and returns that business
 */
export async function resolveAdminBusiness(params: ResolveAdminBusinessInput) {
  const customName = params.custom_company_name?.trim();

  // 1. If admin provided a custom company name
  if (customName) {
    // Check if business already exists (case-insensitive)
    const existing = await prisma.business.findFirst({
      where: {
        company_name: {
          equals: customName,
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      return existing;
    }

    // Identify an owner user for admin-created businesses
    let ownerUser = await prisma.user.findFirst({
      where: { email: "nexorembws@gmail.com" },
    });
    if (!ownerUser) {
      ownerUser = await prisma.user.findFirst({
        where: { clerk_user_id: "admin_system_user" },
      });
    }
    if (!ownerUser) {
      const anyUser = await prisma.user.findFirst();
      if (anyUser) {
        ownerUser = anyUser;
      } else {
        ownerUser = await prisma.user.create({
          data: {
            clerk_user_id: "admin_system_user",
            email: "nexorembws@gmail.com",
          },
        });
      }
    }

    // Create newly approved business record
    const cleanSlug = customName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const newBiz = await prisma.business.create({
      data: {
        owner_user_id: ownerUser.id,
        company_name: customName,
        website:
          params.custom_website?.trim() || `https://${cleanSlug || "business"}.com`,
        industry: params.custom_industry?.trim() || "Technology & Software",
        status: "approved",
        website_verified: true,
        description: `Verified B2B profile for ${customName}.`,
      },
    });

    // Optionally record owner membership
    try {
      await prisma.businessMember.create({
        data: {
          business_id: newBiz.id,
          user_id: ownerUser.id,
          role: "owner",
        },
      });
    } catch {
      // Ignored if member creation is non-essential
    }

    return newBiz;
  }

  // 2. Otherwise, use business_id
  if (!params.business_id) {
    throw new Error("Either select an existing business or enter a custom company name.");
  }

  const business = await prisma.business.findUnique({
    where: { id: params.business_id },
  });

  if (!business) {
    throw new Error("Selected business does not exist.");
  }

  return business;
}
