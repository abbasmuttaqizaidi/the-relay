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

    // 2. Fetch users from DB
    const dbUsers = await prisma.user.findMany({
      include: {
        businesses: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // 3. Fetch users from Clerk
    const clerkList = await client.users.getUserList({ limit: 500 });
    const clerkUsersMap = new Map(clerkList.data.map(u => [u.id, u]));

    // 4. Merge details
    const users = dbUsers.map((dbUser) => {
      const clerkUser = clerkUsersMap.get(dbUser.clerk_user_id);
      const email = clerkUser
        ? clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || ""
        : "Deleted from Clerk";
      const name = clerkUser
        ? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "No Name"
        : "Unknown";

      const business = dbUser.businesses[0] || null;

      return {
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
      };
    });

    return { users };
  });

export type GetAdminUsersFn = typeof getAdminUsers;
