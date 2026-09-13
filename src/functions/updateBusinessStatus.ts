import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BusinessService } from "../services/business.service";
import { prisma } from "../db/prisma.server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { verifyAdminSession } from "../lib/admin-auth.server";

const updateBusinessStatusSchema = z.object({
  business_id: z.string().optional(),
  user_id: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]),
  owner_email: z.string().optional(),
  company_name: z.string().optional(),
});

/**
 * Allows the super admin to change the status of a business.
 * Supports updating existing businesses or auto-provisioning a profile for non-onboarded users.
 */
export const updateBusinessStatus = createServerFn({ method: "POST" })
  .inputValidator(updateBusinessStatusSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can perform this action.");
    }

    let { business_id, user_id, status, owner_email, company_name } = data;

    // 2. If business_id is missing, find or create a business for the user
    if (!business_id && user_id) {
      const dbUser = await prisma.user.findFirst({
        where: {
          OR: [
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user_id)
              ? { id: user_id }
              : undefined,
            { clerk_user_id: user_id },
          ].filter(Boolean) as any,
        },
        include: {
          businesses: true,
        },
      });

      if (!dbUser) {
        throw new Error("User record not found in database.");
      }

      if (dbUser.businesses && dbUser.businesses.length > 0) {
        business_id = dbUser.businesses[0].id;
      } else {
        const defaultName = company_name?.trim() || "Verified Business";
        const slug = defaultName.toLowerCase().replace(/[^a-z0-9]/g, "") || "relay";
        const createdBiz = await BusinessService.createBusiness({
          owner_user_id: dbUser.id,
          company_name: defaultName,
          website: `https://${slug}.com`,
          industry: "SaaS",
          description: "Verified operator profile.",
        });
        business_id = createdBiz.id;
      }
    }

    if (!business_id) {
      throw new Error("Target business profile could not be identified or created.");
    }

    if (status === "approved") {
      const updated = await BusinessService.approveBusiness(business_id, owner_email);
      return { status: updated.status, business: updated };
    } else if (status === "rejected") {
      const updated = await BusinessService.rejectBusiness(business_id, undefined, owner_email);
      return { status: updated.status, business: updated };
    } else {
      const updated = await BusinessService.setBusinessStatusToPending(business_id);
      return { status: updated.status, business: updated };
    }
  });

export type UpdateBusinessStatusFn = typeof updateBusinessStatus;
