import { prisma } from "../db/prisma.server";
import { User, CreateUserDTO, UpdateCommunityProfileDTO, UserType } from "../types";
import { serverCache } from "../lib/server-cache";

function mapUserRecord(user: any): User {
  return {
    id: user.id,
    clerk_user_id: user.clerk_user_id,
    email: user.email,
    type: (user.type as UserType) || "business",
    name: user.name || null,
    handle: user.handle || null,
    title: user.title || null,
    bio: user.bio || null,
    avatar_type: user.avatar_type || "monogram",
    avatar_url: user.avatar_url || null,
    expertise_domain: user.expertise_domain || null,
    linkedin_url: user.linkedin_url || null,
    created_at: user.created_at.toISOString(),
  };
}

export class UserService {
  /**
   * Creates a new user row in the database via Prisma, mapping the Clerk User ID.
   */
  static async createUser(dto: CreateUserDTO): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          clerk_user_id: dto.clerk_user_id,
          email: dto.email || null,
        },
      });
      const mappedUser = mapUserRecord(user);
      
      // Cache the new user mapping
      serverCache.set(`user:clerk:${user.clerk_user_id}`, mappedUser, 300);
      return mappedUser;
    } catch (error: any) {
      console.error("[UserService.createUser] Error:", error);
      throw new Error(`Failed to create user: ${error.message || error}`);
    }
  }

  /**
   * Retrieves an internal user by their Clerk User ID.
   * Returns null if the user does not exist.
   */
  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const cacheKey = `user:clerk:${clerkUserId}`;
    const cached = serverCache.get<User>(cacheKey);
    if (cached) return cached;

    try {
      const user = await prisma.user.findUnique({
        where: { clerk_user_id: clerkUserId },
      });
      if (!user) return null;
      
      const mappedUser = mapUserRecord(user);
      serverCache.set(cacheKey, mappedUser, 300); // Cache for 5 minutes
      return mappedUser;
    } catch (error: any) {
      console.error("[UserService.getUserByClerkId] Error:", error);
      throw new Error(`Failed to fetch user: ${error.message || error}`);
    }
  }

  /**
   * Updates a user's contributor profile for Community Member participation.
   */
  static async updateCommunityProfile(
    userId: string,
    dto: UpdateCommunityProfileDTO
  ): Promise<User> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, type: true },
      });

      // Preserve existing business or associate type; only default unclassified/business-less to community_member
      const resolvedType =
        existingUser?.type === "business" || existingUser?.type === "associate"
          ? existingUser.type
          : "community_member";

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          type: resolvedType,
          name: dto.name,
          handle: dto.handle.startsWith("@") ? dto.handle : `@${dto.handle}`,
          title: dto.title,
          bio: dto.bio || null,
          avatar_type: dto.avatar_type || "monogram",
          avatar_url: dto.avatar_url || null,
          expertise_domain: dto.expertise_domain || null,
          linkedin_url: dto.linkedin_url || null,
        },
      });

      const mappedUser = mapUserRecord(user);
      serverCache.del(`user:clerk:${user.clerk_user_id}`);
      serverCache.set(`user:clerk:${user.clerk_user_id}`, mappedUser, 300);
      return mappedUser;
    } catch (error: any) {
      console.error("[UserService.updateCommunityProfile] Error:", error);
      throw new Error(`Failed to update community profile: ${error.message || error}`);
    }
  }

  /**
   * Updates a user's type explicitly (business | community_member | associate).
   */
  static async setUserType(userId: string, type: UserType): Promise<User> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { type },
      });

      const mappedUser = mapUserRecord(user);
      serverCache.del(`user:clerk:${user.clerk_user_id}`);
      serverCache.set(`user:clerk:${user.clerk_user_id}`, mappedUser, 300);
      return mappedUser;
    } catch (error: any) {
      console.error("[UserService.setUserType] Error:", error);
      throw new Error(`Failed to set user type: ${error.message || error}`);
    }
  }
}

