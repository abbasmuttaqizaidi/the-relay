import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { User } from "../types";
import { prisma } from "../db/prisma.server";

/**
 * Resolves the authenticated user on the server side using the request context.
 *
 * Clerk Integration Flow:
 * 1. Extract Clerk User ID from the request context using auth().
 * 2. Lookup the user mapping in the database.
 * 3. If the user doesn't exist, automatically create the user row in the database.
 * 4. Return the database User model.
 */
export async function getAuthenticatedUser(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Missing Clerk authentication session context.");
  }

  // Strictly verify that the user exists in the database Users table
  const dbUser = await UserService.getUserByClerkId(userId);
  if (!dbUser || !dbUser.email) {
    throw new Error("Unauthorized: User is not fully registered with email in both Clerk and database.");
  }

  return dbUser;
}

/**
 * Resolves the authenticated user on the server side during onboarding,
 * automatically creating the user row in the database if they are newly signed up on Clerk.
 */
export async function resolveOrCreateUserDuringOnboarding(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Missing Clerk authentication session context.");
  }

  // Fetch email address from Clerk API to ensure it exists
  const client = clerkClient();
  const clerkUser = await client.users.getUser(userId);
  const email = clerkUser.emailAddresses.find(
    (e) => e.id === clerkUser.primaryEmailAddressId
  )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || "";

  if (!email) {
    throw new Error("Conflict: A verified email address must exist in Clerk to complete sign up.");
  }

  let dbUser = await UserService.getUserByClerkId(userId);
  if (!dbUser) {
    console.log(`[Clerk Auth Sync] Registering new Clerk user during onboarding: ${userId}`);
    dbUser = await UserService.createUser({ clerk_user_id: userId, email });
  } else if (!dbUser.email) {
    // Sync email in database if it was somehow missing
    dbUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: { email },
    });
  }

  return dbUser;
}
