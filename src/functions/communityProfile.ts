import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { updateCommunityProfileSchema, setUserTypeSchema } from "../validators";
import { prisma } from "../db/prisma.server";

export const getCommunityProfile = createServerFn({ method: "GET" })
  .handler(async () => {
    const authSession = await auth();
    if (!authSession.userId) {
      return null;
    }

    let user = await UserService.getUserByClerkId(authSession.userId);
    if (!user) {
      try {
        const client = clerkClient();
        const clerkUser = await client.users.getUser(authSession.userId);
        const email =
          clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
          clerkUser.emailAddresses[0]?.emailAddress ||
          null;
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || clerkUser.username || null;

        user = await UserService.createUser({
          clerk_user_id: authSession.userId,
          email,
        });
      } catch (err) {
        console.error("[getCommunityProfile] Failed to provision user:", err);
        return null;
      }
    }

    return user;
  });

export const saveCommunityProfile = createServerFn({ method: "POST" })
  .inputValidator(updateCommunityProfileSchema)
  .handler(async ({ data }) => {
    const authSession = await auth();
    if (!authSession.userId) {
      throw new Error("Unauthorized: Please sign in to save your contributor profile.");
    }

    let user = await UserService.getUserByClerkId(authSession.userId);
    if (!user) {
      const client = clerkClient();
      const clerkUser = await client.users.getUser(authSession.userId);
      const email =
        clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
        clerkUser.emailAddresses[0]?.emailAddress ||
        null;

      user = await UserService.createUser({
        clerk_user_id: authSession.userId,
        email,
      });
    }

    return await UserService.updateCommunityProfile(user.id, {
      name: data.name,
      handle: data.handle,
      title: data.title,
      bio: data.bio || undefined,
      avatar_type: data.avatar_type || "monogram",
      avatar_url: data.avatar_url,
      expertise_domain: data.expertise_domain,
      linkedin_url: data.linkedin_url,
    });
  });

export const setUserAccountType = createServerFn({ method: "POST" })
  .inputValidator(setUserTypeSchema)
  .handler(async ({ data }) => {
    const authSession = await auth();
    if (!authSession.userId) {
      throw new Error("Unauthorized");
    }

    let user = await UserService.getUserByClerkId(authSession.userId);
    if (!user) {
      const client = clerkClient();
      const clerkUser = await client.users.getUser(authSession.userId);
      const email =
        clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
        clerkUser.emailAddresses[0]?.emailAddress ||
        null;

      user = await UserService.createUser({
        clerk_user_id: authSession.userId,
        email,
      });
    }

    return await UserService.setUserType(user.id, data.type);
  });
