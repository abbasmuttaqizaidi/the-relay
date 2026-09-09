import { createServerFn } from "@tanstack/react-start";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";

export const getAdminUsers = createServerFn({ method: "GET" })
  .handler(async () => {
    // 1. Authenticate caller using local admin token cookie
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";
    const match = cookieHeader.match(/relay_admin_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (token !== "PP@password110") {
      throw new Error("Forbidden: Only the super admin can access this page.");
    }

    const client = clerkClient();

    // 2. Fetch users from Clerk
    const clerkList = await client.users.getUserList({ limit: 500 });
    const clerkUsersMap = new Map(clerkList.data.map((u) => [u.id, u]));

    // 3. Fetch users from DB
    const dbUsers = await prisma.user.findMany({
      include: {
        businesses: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const dbUsersMap = new Map(dbUsers.map((u) => [u.clerk_user_id, u]));

    // 4. Auto-provision any Clerk users missing from the DB
    for (const clerkUser of clerkList.data) {
      if (!dbUsersMap.has(clerkUser.id)) {
        const email =
          clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
            ?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress ||
          null;

        try {
          const newDbUser = await prisma.user.upsert({
            where: { clerk_user_id: clerkUser.id },
            update: {
              ...(email ? { email } : {}),
            },
            create: {
              clerk_user_id: clerkUser.id,
              email,
              created_at: clerkUser.createdAt ? new Date(clerkUser.createdAt) : new Date(),
            },
            include: {
              businesses: true,
            },
          });
          dbUsers.push(newDbUser);
          dbUsersMap.set(newDbUser.clerk_user_id, newDbUser);
        } catch (syncErr) {
          console.error(`[getAdminUsers] Auto-provision error for user ${clerkUser.id}:`, syncErr);
        }
      }
    }

    // 5. Merge details
    const processedClerkIds = new Set<string>();
    const users: Array<{
      id: string;
      clerk_user_id: string;
      name: string;
      email: string;
      created_at: string;
      business: {
        id: string;
        company_name: string;
        website: string;
        industry: string;
        status: string;
      } | null;
    }> = [];

    for (const dbUser of dbUsers) {
      processedClerkIds.add(dbUser.clerk_user_id);
      const clerkUser = clerkUsersMap.get(dbUser.clerk_user_id);
      const email = clerkUser
        ? clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
            ?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress ||
          ""
        : dbUser.email || "Deleted from Clerk";
      const name = clerkUser
        ? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          clerkUser.username ||
          "No Name"
        : "Unknown";

      const business = dbUser.businesses[0] || null;

      users.push({
        id: dbUser.id,
        clerk_user_id: dbUser.clerk_user_id,
        name,
        email,
        created_at: dbUser.created_at.toISOString(),
        business: business
          ? {
              id: business.id,
              company_name: business.company_name,
              website: business.website,
              industry: business.industry,
              status: business.status,
            }
          : null,
      });
    }

    // Fallback: If any Clerk user could not be saved to DB, still show them in Admin
    for (const clerkUser of clerkList.data) {
      if (!processedClerkIds.has(clerkUser.id)) {
        const email =
          clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
            ?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress ||
          "";
        const name =
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          clerkUser.username ||
          "No Name";

        users.push({
          id: "pending-db-sync",
          clerk_user_id: clerkUser.id,
          name,
          email,
          created_at: clerkUser.createdAt
            ? new Date(clerkUser.createdAt).toISOString()
            : new Date().toISOString(),
          business: null,
        });
      }
    }

    // 6. Sort users by newest registration first
    users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return { users };
  });

export type GetAdminUsersFn = typeof getAdminUsers;
