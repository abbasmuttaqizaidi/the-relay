import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { PerspectiveService } from "../services/perspective.service";
import { createPerspectiveSchema } from "../validators";

export const createPerspective = createServerFn({ method: "POST" })
  .inputValidator(createPerspectiveSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: You must register a business profile first.");
    }

    // 3. Verify business is approved
    if (business.status !== "approved") {
      throw new Error(
        `Forbidden: Your business profile is "${business.status}". Sharing perspectives requires an approved business profile.`,
      );
    }

    // 4. Delegate to PerspectiveService
    return await PerspectiveService.createPerspective({
      question_id: data.question_id,
      business_id: business.id,
      content: data.content,
      qualification: data.qualification,
      based_on: data.based_on,
      relevant_experience: data.relevant_experience,
    });
  });

export type CreatePerspectiveFn = typeof createPerspective;
