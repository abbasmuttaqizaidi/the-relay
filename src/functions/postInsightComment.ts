import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { CommentService } from "../services/comment.service";
import { UserService } from "../services/user.service";
import { verifyAdminSession } from "../lib/admin-auth.server";
import { resolveAdminBusiness } from "./resolveAdminBusiness";
import { prisma } from "../db/prisma.server";
import {
  createInsightCommentSchema,
  toggleCommentUpvoteSchema,
  deleteInsightCommentSchema,
} from "../validators";

export const getAdminApprovedBusinesses = createServerFn({ method: "GET" })
  .handler(async () => {
    let isAdmin = false;
    try {
      const headers = getRequestHeaders();
      const cookieHeader = headers.get("cookie") || "";
      isAdmin = verifyAdminSession(cookieHeader);
    } catch (_) {}

    if (!isAdmin) {
      return [];
    }

    return await prisma.business.findMany({
      where: { status: "approved" },
      select: {
        id: true,
        company_name: true,
        industry: true,
        logo_url: true,
      },
      orderBy: { company_name: "asc" },
    });
  });

export const postInsightComment = createServerFn({ method: "POST" })
  .inputValidator(createInsightCommentSchema)
  .handler(async ({ data }) => {
    let userId: string | undefined;
    let userEmail: string | undefined;
    let clerkName: string | undefined;
    let isAdmin = false;

    // Check admin session
    try {
      const headers = getRequestHeaders();
      const cookieHeader = headers.get("cookie") || "";
      isAdmin = verifyAdminSession(cookieHeader);
    } catch (_) {}

    // Check Clerk user session if available
    try {
      const authSession = await auth();
      if (authSession.userId) {
        const client = clerkClient();
        const clerkUser = await client.users.getUser(authSession.userId);
        userEmail =
          clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress;
        clerkName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || clerkUser.username || undefined;

        let dbUser = await UserService.getUserByClerkId(authSession.userId);
        if (!dbUser && authSession.userId) {
          dbUser = await UserService.createUser({
            clerk_user_id: authSession.userId,
            email: userEmail,
          });
        }
        if (dbUser) {
          userId = dbUser.id;
        }

        // Always attach Google photo as author_avatar if available and not custom provided
        if (!data.author_avatar && clerkUser.imageUrl) {
          data.author_avatar = clerkUser.imageUrl;
        }
      }
    } catch (_) {
      // Unauthenticated / general public / admin-only posting
    }

    // Handle Admin Demo Personas (Verified Network Business or Community Member)
    if (isAdmin) {
      if (data.author_type === "relay_business") {
        if (data.custom_company_name) {
          const resolved = await resolveAdminBusiness({
            business_id: data.business_id,
            custom_company_name: data.custom_company_name,
            custom_industry: data.custom_industry,
            custom_website: data.custom_website,
            custom_logo_url: data.custom_logo_url || data.author_avatar,
          });
          data.business_id = resolved.id;
          if (!data.author_name) {
            data.author_name = resolved.company_name;
          }
          if (!data.author_avatar && resolved.logo_url) {
            data.author_avatar = resolved.logo_url;
          }
        }
      }
    } else {
      // Non-admins cannot provide custom company creation fields or custom timestamps
      delete (data as any).custom_company_name;
      delete (data as any).custom_industry;
      delete (data as any).custom_website;
      delete (data as any).custom_logo_url;
      delete (data as any).created_at;
    }

    return await CommentService.createComment(data, {
      userId,
      userEmail,
      clerkName,
      isAdmin,
    });
  });

export const upvoteInsightComment = createServerFn({ method: "POST" })
  .inputValidator(toggleCommentUpvoteSchema)
  .handler(async ({ data }) => {
    return await CommentService.upvoteComment(data.comment_id);
  });

export const deleteInsightComment = createServerFn({ method: "POST" })
  .inputValidator(deleteInsightCommentSchema)
  .handler(async ({ data }) => {
    let userId: string | undefined;
    let userEmail: string | undefined;
    let isAdmin = false;

    // Check admin session
    try {
      const headers = getRequestHeaders();
      const cookieHeader = headers.get("cookie") || "";
      isAdmin = verifyAdminSession(cookieHeader);
    } catch (_) {}

    // Check Clerk user session
    try {
      const authSession = await auth();
      if (authSession.userId) {
        const client = clerkClient();
        const clerkUser = await client.users.getUser(authSession.userId);
        userEmail =
          clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress;

        const dbUser = await UserService.getUserByClerkId(authSession.userId);
        if (dbUser) {
          userId = dbUser.id;
        }
      }
    } catch (_) {}

    if (!isAdmin && !userId && !userEmail) {
      throw new Error("Authentication required to delete comments.");
    }

    return await CommentService.deleteComment(data.comment_id, {
      userId,
      userEmail,
      isAdmin,
    });
  });
