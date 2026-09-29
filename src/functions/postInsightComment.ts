import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { CommentService } from "../services/comment.service";
import { UserService } from "../services/user.service";
import { createInsightCommentSchema, toggleCommentUpvoteSchema } from "../validators";

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

        const dbUser = await UserService.getUserByClerkId(authSession.userId);
        if (dbUser) {
          userId = dbUser.id;
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
