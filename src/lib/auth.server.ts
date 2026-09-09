import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { User } from "../types";
import { prisma } from "../db/prisma.server";
import { EmailService } from "../services/email.service";

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
    throw new Error(
      "Unauthorized: User is not fully registered with email in both Clerk and database.",
    );
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
  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
    clerkUser.emailAddresses[0]?.emailAddress ||
    "";

  if (!email) {
    throw new Error("Conflict: A verified email address must exist in Clerk to complete sign up.");
  }

  let dbUser: User | null = await UserService.getUserByClerkId(userId);
  if (!dbUser) {
    console.log(`[Clerk Auth Sync] Registering new Clerk user during onboarding: ${userId}`);
    dbUser = await UserService.createUser({ clerk_user_id: userId, email });

    // Trigger welcome email via Resend if not already sent
    if (!clerkUser.privateMetadata?.welcome_email_sent) {
      try {
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ");
        await EmailService.sendWelcomeEmail(email, name || undefined);
        await client.users.updateUserMetadata(userId, {
          privateMetadata: { welcome_email_sent: true },
        });
      } catch (emailErr) {
        console.error(`[Clerk Auth Sync] Error sending welcome email to ${email}:`, emailErr);
      }
    }
  } else if (!dbUser.email) {
    // Sync email in database if it was somehow missing
    const updated = await prisma.user.update({
      where: { id: dbUser.id },
      data: { email },
    });
    dbUser = {
      id: updated.id,
      clerk_user_id: updated.clerk_user_id,
      email: updated.email,
      created_at: updated.created_at.toISOString(),
    };

    // Update cache
    const { serverCache } = await import("./server-cache");
    serverCache.set(`user:clerk:${updated.clerk_user_id}`, dbUser, 300);
  }

  if (!dbUser) {
    throw new Error("Internal Server Error: Failed to resolve database user.");
  }

  return dbUser;
}
