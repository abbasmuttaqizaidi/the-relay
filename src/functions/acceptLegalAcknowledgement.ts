import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { acceptLegalAcknowledgementSchema } from "../validators";

export const acceptLegalAcknowledgement = createServerFn({ method: "POST" })
  .inputValidator(acceptLegalAcknowledgementSchema)
  .handler(async ({ data }) => {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    try {
      const client = clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          legal_ack_accepted: true,
          legal_ack_accepted_at: new Date().toISOString(),
          marketing_consent: data?.marketingConsent ?? false,
        },
      });
      return { success: true };
    } catch (err: any) {
      console.error("[acceptLegalAcknowledgement] Error saving legal acknowledgement:", err);
      return { success: false, error: err.message };
    }
  });

export type AcceptLegalAcknowledgementFn = typeof acceptLegalAcknowledgement;
