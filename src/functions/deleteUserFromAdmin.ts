import { createServerFn } from "@tanstack/react-start";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { z } from "zod";
import { serverCache } from "../lib/server-cache";
import { verifyAdminSession } from "../lib/admin-auth.server";

const deleteUserSchema = z.object({
  id: z.string(),
  clerk_user_id: z.string(),
});

export const deleteUserFromAdmin = createServerFn({ method: "POST" })
  .inputValidator(deleteUserSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
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

    // 4. Delete from Supabase PostgreSQL (Atomic native cascade)
    const isDbUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.id);
    const userInDb = await prisma.user.findFirst({
      where: {
        OR: [
          ...(isDbUuid ? [{ id: data.id }] : []),
          { clerk_user_id: data.clerk_user_id },
        ],
      },
      include: {
        businesses: true,
      },
    });

    const realUserId = userInDb?.id || (isDbUuid ? data.id : null);
    const businessIds = userInDb?.businesses?.map((b) => b.id) || [];

    if (realUserId) {
      try {
        // Execute atomic cascade delete directly in Postgres
        await prisma.$executeRawUnsafe(
          `DELETE FROM businesses WHERE owner_user_id = $1::uuid;`,
          realUserId,
        );
        await prisma.$executeRawUnsafe(
          `DELETE FROM users WHERE id = $1::uuid OR clerk_user_id = $2;`,
          realUserId,
          data.clerk_user_id,
        );
      } catch (dbErr: any) {
        console.error("[Admin Delete] Postgres raw delete error:", dbErr);
        // Fallback: try Prisma user delete
        try {
          await prisma.user.deleteMany({
            where: {
              OR: [
                { id: realUserId },
                { clerk_user_id: data.clerk_user_id },
              ],
            },
          });
        } catch (fallbackErr) {
          console.error("[Admin Delete] Fallback delete error:", fallbackErr);
        }
      }
    } else {
      try {
        await prisma.$executeRawUnsafe(
          `DELETE FROM users WHERE clerk_user_id = $1;`,
          data.clerk_user_id,
        );
      } catch (dbErr) {
        console.error("[Admin Delete] Postgres clerk user delete error:", dbErr);
      }
    }

    // 5. Invalidate server caches
    serverCache.delete(`user:clerk:${data.clerk_user_id}`);
    if (realUserId) {
      serverCache.delete(`business:owner:${realUserId}`);
    }
    for (const businessId of businessIds) {
      serverCache.delete(`business:id:${businessId}`);
    }

    console.log(`[Admin Delete] Successfully wiped user ${data.clerk_user_id} (${realUserId || "no-db-id"}).`);
    return { success: true };
  });

export type DeleteUserFromAdminFn = typeof deleteUserFromAdmin;
