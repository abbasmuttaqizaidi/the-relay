import { createServerFn } from "@tanstack/react-start";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { z } from "zod";
import { serverCache } from "../lib/server-cache";

const deleteUserSchema = z.object({
  id: z.string().uuid(),
  clerk_user_id: z.string(),
});

export const deleteUserFromAdmin = createServerFn({ method: "POST" })
  .inputValidator(deleteUserSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using local admin token cookie
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";
    const match = cookieHeader.match(/relay_admin_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (token !== "PP@password110") {
      throw new Error("Forbidden: Only the super admin can perform this action.");
    }

    const client = clerkClient();

    // 2. Prevent self-deletion of the super admin account
    try {
      const targetClerkUser = await client.users.getUser(data.clerk_user_id);
      const targetEmail = targetClerkUser.emailAddresses.find(
        (e) => e.id === targetClerkUser.primaryEmailAddressId
      )?.emailAddress || targetClerkUser.emailAddresses[0]?.emailAddress || "";

      if (targetEmail.toLowerCase() === "nexorembws@gmail.com") {
        throw new Error("Conflict: Super Admin account cannot be deleted.");
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Conflict:")) {
        throw err;
      }
      console.error("[Admin Delete] Check failed:", err);
    }

    // 3. Delete from Clerk (if user still exists in Clerk)
    try {
      await client.users.deleteUser(data.clerk_user_id);
      console.log(`[Admin Delete] Deleted user ${data.clerk_user_id} from Clerk.`);
    } catch (clerkErr) {
      console.error(`[Admin Delete] Failed to delete user from Clerk (may already be deleted):`, clerkErr);
    }

    // 4. Delete from Supabase with manual transactional cascade cleanup to guarantee no leftover records or constraint failures
    const { deletedUser, businessIds } = await prisma.$transaction(async (tx) => {
      // Find all businesses owned by this user
      const userBusinesses = await tx.business.findMany({
        where: { owner_user_id: data.id },
        select: { id: true },
      });
      const businessIds = userBusinesses.map((b) => b.id);

      // A. Delete Interests (where the business is interest target or interest source)
      await tx.interest.deleteMany({
        where: {
          OR: [
            { requesting_business_id: { in: businessIds } },
            { opportunity: { business_id: { in: businessIds } } },
          ],
        },
      });

      // B. Delete Saved Opportunities (saved by user, or opportunities of the user's business saved by others)
      await tx.savedOpportunity.deleteMany({
        where: {
          OR: [
            { user_id: data.id },
            { opportunity: { business_id: { in: businessIds } } },
          ],
        },
      });

      // C. Delete Opportunities belonging to user's businesses
      await tx.opportunity.deleteMany({
        where: { business_id: { in: businessIds } },
      });

      // D. Delete Business members
      await tx.businessMember.deleteMany({
        where: {
          OR: [
            { business_id: { in: businessIds } },
            { user_id: data.id },
          ],
        },
      });

      // E. Delete Notifications for the user
      await tx.notification.deleteMany({
        where: { user_id: data.id },
      });

      // F. Delete Businesses owned by the user
      await tx.business.deleteMany({
        where: { owner_user_id: data.id },
      });

      // G. Finally, delete the User
      const user = await tx.user.delete({
        where: { id: data.id },
      });

      return { deletedUser: user, businessIds };
    });

    // Invalidate user cache and any owned business caches
    serverCache.delete(`user:clerk:${data.clerk_user_id}`);
    serverCache.delete(`business:owner:${data.id}`);
    for (const businessId of businessIds) {
      serverCache.delete(`business:id:${businessId}`);
    }

    console.log(`[Admin Delete] Deleted user ${data.id} and all cascade business relations from Supabase.`);
    return { success: true, deletedUser };
  });

export type DeleteUserFromAdminFn = typeof deleteUserFromAdmin;
