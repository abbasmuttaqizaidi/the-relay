import { prisma } from "../db/prisma.server";
import { User, CreateUserDTO } from "../types";

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
      return {
        id: user.id,
        clerk_user_id: user.clerk_user_id,
        email: user.email,
        created_at: user.created_at.toISOString(),
      };
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
    try {
      const user = await prisma.user.findUnique({
        where: { clerk_user_id: clerkUserId },
      });
      if (!user) return null;
      return {
        id: user.id,
        clerk_user_id: user.clerk_user_id,
        email: user.email,
        created_at: user.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[UserService.getUserByClerkId] Error:", error);
      throw new Error(`Failed to fetch user: ${error.message || error}`);
    }
  }
}
