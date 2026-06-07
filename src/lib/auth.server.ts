import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { User } from "../types";

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

  // Check users table and auto-create mapping if missing
  let dbUser = await UserService.getUserByClerkId(userId);
  if (!dbUser) {
    console.log(`[Clerk Auth Sync] Registering new Clerk user: ${userId}`);
    
    // Fetch email address from Clerk API
    const client = clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || "";

    dbUser = await UserService.createUser({ clerk_user_id: userId, email });
  }

  return dbUser;
}
