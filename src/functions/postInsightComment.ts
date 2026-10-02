import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { CommentService } from "../services/comment.service";
import { UserService } from "../services/user.service";
import { verifyAdminSession } from "../lib/admin-auth.server";
import {
  createInsightCommentSchema,
  toggleCommentUpvoteSchema,
  deleteInsightCommentSchema,
} from "../validators";

export const postInsightComment = createServerFn({ method: "POST" })
  .inputValidator(createInsightCommentSchema)
  .handler(async ({ data }) => {
    let userId: string | undefined;
    let userEmail: string | undefined;
    let clerkName: string | undefined;

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

        // Always attach Google photo as author_avatar if available
        if (!data.author_avatar && clerkUser.imageUrl) {
          data.author_avatar = clerkUser.imageUrl;
        }
      }
    } catch (_) {
      // Unauthenticated / general public posting
    }

    return await CommentService.createComment(data, {
      userId,
      userEmail,
      clerkName,
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
