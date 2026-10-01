import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { updateCommunityProfileSchema, setUserTypeSchema } from "../validators";
import { prisma } from "../db/prisma.server";
import { serverCache } from "../lib/server-cache";
import { User } from "../types";

async function resolveOrCreateUser(userId: string): Promise<User | null> {
  let user = await UserService.getUserByClerkId(userId);
  if (user) {
    if (!user.name) {
      try {
        const client = clerkClient();
        const clerkUser = await client.users.getUser(userId);
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || clerkUser.username || null;
        if (name) {
          const emailPrefix = (user.email?.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, "") || "contributor";
          const genHandle = user.handle || (clerkUser.username ? `@${clerkUser.username}` : `@${emailPrefix}`);
          const updated = await prisma.user.update({
            where: { id: user.id },
            data: {
              name: user.name || name,
              handle: user.handle || genHandle,
              avatar_url: user.avatar_url || clerkUser.imageUrl || null,
              avatar_type: "photo",
            },
          });
          user.name = updated.name;
          user.handle = updated.handle;
          user.avatar_url = updated.avatar_url;
          user.avatar_type = "photo";
          serverCache.delete(`user:clerk:${userId}`);
          serverCache.set(`user:clerk:${userId}`, user, 300);
        }
      } catch (_) {}
    }
    return user;
  }

  try {
    const client = clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email =
      clerkUser.emailAddresses.find((e: any) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
      clerkUser.emailAddresses[0]?.emailAddress ||
      null;
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || clerkUser.username || null;
    const emailPrefix = (email?.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, "") || "contributor";
    const genHandle = clerkUser.username ? `@${clerkUser.username}` : `@${emailPrefix}`;
    const photoUrl = clerkUser.imageUrl || null;

    // Reconcile existing DB user by email
    if (email) {
      const userByEmail = await prisma.user.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
      });

      if (userByEmail) {
        const updated = await prisma.user.update({
          where: { id: userByEmail.id },
          data: {
            clerk_user_id: userId,
            name: userByEmail.name || name,
            handle: userByEmail.handle || genHandle,
            avatar_url: userByEmail.avatar_url || photoUrl,
            avatar_type: "photo",
          },
        });
        user = {
          id: updated.id,
          clerk_user_id: updated.clerk_user_id,
          email: updated.email,
          type: (updated.type as any) || "community_member",
          name: updated.name,
          handle: updated.handle,
          title: updated.title,
          bio: updated.bio,
          avatar_type: "photo",
          avatar_url: updated.avatar_url,
          expertise_domain: updated.expertise_domain,
          linkedin_url: updated.linkedin_url,
          created_at: updated.created_at.toISOString(),
        };
        serverCache.delete(`user:clerk:${userId}`);
        serverCache.set(`user:clerk:${userId}`, user, 300);
        return user;
      }
    }

    const created = await prisma.user.create({
      data: {
        clerk_user_id: userId,
        email,
        name,
        handle: genHandle,
        type: "community_member",
        avatar_type: "photo",
        avatar_url: photoUrl,
      },
    });
    user = {
      id: created.id,
      clerk_user_id: created.clerk_user_id,
      email: created.email,
      type: "community_member",
      name: created.name,
      handle: created.handle,
      title: created.title,
      bio: created.bio,
      avatar_type: "photo",
      avatar_url: created.avatar_url,
      expertise_domain: created.expertise_domain,
      linkedin_url: created.linkedin_url,
      created_at: created.created_at.toISOString(),
    };
    serverCache.delete(`user:clerk:${userId}`);
    serverCache.set(`user:clerk:${userId}`, user, 300);
    return user;
  } catch (err) {
    console.error("[resolveOrCreateUser] Failed to provision user:", err);
    return null;
  }
}

export const getCommunityProfile = createServerFn({ method: "GET" })
  .handler(async () => {
    const authSession = await auth();
    if (!authSession.userId) {
      return null;
    }

    return await resolveOrCreateUser(authSession.userId);
  });

export const saveCommunityProfile = createServerFn({ method: "POST" })
  .inputValidator(updateCommunityProfileSchema)
  .handler(async ({ data }) => {
    const authSession = await auth();
    if (!authSession.userId) {
      throw new Error("Unauthorized: Please sign in to save your contributor profile.");
    }

    const user = await resolveOrCreateUser(authSession.userId);
    if (!user) {
      throw new Error("Failed to find or initialize user account.");
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

    const user = await resolveOrCreateUser(authSession.userId);
    if (!user) {
      throw new Error("Failed to find or initialize user account.");
    }

    return await UserService.setUserType(user.id, data.type);
  });
