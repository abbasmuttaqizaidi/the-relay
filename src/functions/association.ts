import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { prisma } from "../db/prisma.server";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";

export interface BusinessSearchResult {
  id: string;
  company_name: string;
  industry: string;
  logo_url: string | null;
  hq_location: string | null;
  website: string;
  description: string | null;
}

export interface AssociationStatusResult {
  id: string;
  status: "pending" | "approved";
  role: string;
  requestedAt: string;
  business: {
    id: string;
    company_name: string;
    industry: string;
    logo_url: string | null;
    hq_location: string | null;
    website: string;
    status: string;
  };
}

export interface AssociateMemberItem {
  recordId: string;
  userId: string;
  name: string;
  email: string;
  handle: string | null;
  title: string;
  avatarUrl: string | null;
  requestedAt?: string;
  joinedAt?: string;
}

/**
 * Searches approved businesses for users to connect/associate with.
 */
export const searchApprovedBusinesses = createServerFn({ method: "GET" })
  .inputValidator((data: { query?: string }) => data)
  .handler(async ({ data }): Promise<BusinessSearchResult[]> => {
    const q = (data?.query || "").trim();

    if (!q) {
      const list = await prisma.business.findMany({
        where: { status: "approved" },
        select: {
          id: true,
          company_name: true,
          industry: true,
          logo_url: true,
          hq_location: true,
          website: true,
          description: true,
        },
        orderBy: { created_at: "desc" },
        take: 8,
      });
      return list;
    }

    const list = await prisma.business.findMany({
      where: {
        status: "approved",
        company_name: { contains: q, mode: "insensitive" },
      },
      select: {
        id: true,
        company_name: true,
        industry: true,
        logo_url: true,
        hq_location: true,
        website: true,
        description: true,
      },
      orderBy: { created_at: "desc" },
      take: 12,
    });
    return list;
  });

/**
 * Retrieves the current user's active or pending association status.
 */
export const getMyAssociationStatus = createServerFn({ method: "GET" })
  .handler(async (): Promise<AssociationStatusResult | null> => {
    const { userId } = await auth();
    if (!userId) return null;

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) return null;

    const memberRecord = await prisma.businessMember.findFirst({
      where: {
        user_id: dbUser.id,
        role: { in: ["pending_associate", "associate"] },
      },
      include: {
        business: {
          select: {
            id: true,
            company_name: true,
            industry: true,
            logo_url: true,
            hq_location: true,
            website: true,
            status: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    if (!memberRecord) return null;

    return {
      id: memberRecord.id,
      status: memberRecord.role === "associate" ? "approved" : "pending",
      role: memberRecord.role,
      requestedAt: memberRecord.created_at.toISOString(),
      business: memberRecord.business,
    };
  });

/**
 * Sends a request to associate with an approved business.
 */
export const requestBusinessAssociation = createServerFn({ method: "POST" })
  .inputValidator((data: { businessId: string }) => data)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Authentication required.");
    }

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) {
      throw new Error("User record not found.");
    }

    const business = await prisma.business.findUnique({
      where: { id: data.businessId },
    });

    if (!business || business.status !== "approved") {
      throw new Error("The target business is not an approved entity on The Relay.");
    }

    if (business.owner_user_id === dbUser.id) {
      throw new Error("You are already the owner of this business.");
    }

    const existing = await prisma.businessMember.findUnique({
      where: {
        business_id_user_id: {
          business_id: data.businessId,
          user_id: dbUser.id,
        },
      },
    });

    if (existing) {
      if (existing.role === "associate") {
        throw new Error("You are already an approved associate of this business.");
      }
      if (existing.role === "pending_associate") {
        return { success: true, message: "Your association request is already pending." };
      }
    }

    await prisma.businessMember.upsert({
      where: {
        business_id_user_id: {
          business_id: data.businessId,
          user_id: dbUser.id,
        },
      },
      create: {
        business_id: data.businessId,
        user_id: dbUser.id,
        role: "pending_associate",
      },
      update: {
        role: "pending_associate",
      },
    });

    // Generate in-app notification for the business owner
    const requestorLabel = dbUser.name || dbUser.email || "An operator";
    await prisma.notification.create({
      data: {
        user_id: business.owner_user_id,
        title: "New Association Request",
        description: `${requestorLabel} has requested to associate with ${business.company_name}. Review in your Business Profile.`,
      },
    });

    return { success: true };
  });

/**
 * Cancels a pending association request.
 */
export const cancelAssociationRequest = createServerFn({ method: "POST" })
  .inputValidator((data: { businessId: string }) => data)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) throw new Error("User not found");

    await prisma.businessMember.deleteMany({
      where: {
        business_id: data.businessId,
        user_id: dbUser.id,
        role: "pending_associate",
      },
    });

    return { success: true };
  });

/**
 * Returns pending association requests and approved associates for the current user's business.
 */
export const getBusinessAssociates = createServerFn({ method: "GET" })
  .handler(async (): Promise<{ pending: AssociateMemberItem[]; approved: AssociateMemberItem[] }> => {
    const { userId } = await auth();
    if (!userId) return { pending: [], approved: [] };

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) return { pending: [], approved: [] };

    const business = await prisma.business.findFirst({
      where: { owner_user_id: dbUser.id },
    });

    if (!business) return { pending: [], approved: [] };

    const members = await prisma.businessMember.findMany({
      where: {
        business_id: business.id,
        role: { in: ["pending_associate", "associate"] },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            handle: true,
            title: true,
            avatar_url: true,
            avatar_type: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const pending = members
      .filter((m) => m.role === "pending_associate")
      .map((m) => ({
        recordId: m.id,
        userId: m.user.id,
        name: m.user.name || "Operator",
        email: m.user.email || "",
        handle: m.user.handle,
        title: m.user.title || "Community Contributor",
        avatarUrl: m.user.avatar_url,
        requestedAt: m.created_at.toISOString(),
      }));

    const approved = members
      .filter((m) => m.role === "associate")
      .map((m) => ({
        recordId: m.id,
        userId: m.user.id,
        name: m.user.name || "Operator",
        email: m.user.email || "",
        handle: m.user.handle,
        title: m.user.title || "Associate",
        avatarUrl: m.user.avatar_url,
        joinedAt: m.created_at.toISOString(),
      }));

    return { pending, approved };
  });

/**
 * Approves or rejects an association request.
 * On approval, generates an in-app notification and sends a confirmation email.
 */
export const respondToAssociationRequest = createServerFn({ method: "POST" })
  .inputValidator((data: { recordId: string; action: "approve" | "reject" }) => data)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) throw new Error("User not found");

    const memberRecord = await prisma.businessMember.findUnique({
      where: { id: data.recordId },
      include: {
        business: true,
        user: true,
      },
    });

    if (!memberRecord) {
      throw new Error("Association request not found.");
    }

    if (memberRecord.business.owner_user_id !== dbUser.id) {
      throw new Error("Only the verified business owner can review association requests.");
    }

    if (data.action === "approve") {
      await prisma.businessMember.update({
        where: { id: data.recordId },
        data: { role: "associate" },
      });

      await prisma.user.update({
        where: { id: memberRecord.user_id },
        data: { type: "associate" },
      });

      // 1. Create In-app Notification for the requestor
      await prisma.notification.create({
        data: {
          user_id: memberRecord.user_id,
          title: "Association Approved!",
          description: `Your request to associate with ${memberRecord.business.company_name} has been approved. You are now an active associate.`,
        },
      });

      // 2. Send confirmation email to requestor
      if (memberRecord.user.email) {
        try {
          await EmailService.sendAssociationApprovedEmail({
            toEmail: memberRecord.user.email,
            requestorName: memberRecord.user.name || undefined,
            companyName: memberRecord.business.company_name,
          });
        } catch (err) {
          console.error("[Association] Error sending confirmation email:", err);
        }
      }

      return { success: true, action: "approved" };
    } else {
      await prisma.businessMember.delete({
        where: { id: data.recordId },
      });

      await prisma.notification.create({
        data: {
          user_id: memberRecord.user_id,
          title: "Association Request Update",
          description: `Your request to associate with ${memberRecord.business.company_name} was not accepted at this time.`,
        },
      });

      return { success: true, action: "rejected" };
    }
  });

/**
 * Removes an approved associate from the business.
 */
export const removeApprovedAssociate = createServerFn({ method: "POST" })
  .inputValidator((data: { recordId: string }) => data)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const dbUser = await UserService.getUserByClerkId(userId);
    if (!dbUser) throw new Error("User not found");

    const memberRecord = await prisma.businessMember.findUnique({
      where: { id: data.recordId },
      include: { business: true },
    });

    if (!memberRecord || memberRecord.business.owner_user_id !== dbUser.id) {
      throw new Error("Unauthorized to remove this associate.");
    }

    await prisma.businessMember.delete({
      where: { id: data.recordId },
    });

    return { success: true };
  });
