import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { PerspectiveService } from "../services/perspective.service";
import { updatePerspectiveSchema } from "../validators";

export const updatePerspective = createServerFn({ method: "POST" })
  .inputValidator(updatePerspectiveSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to PerspectiveService
    return await PerspectiveService.updatePerspective(data.perspective_id, business.id, {
      content: data.content,
      qualification: data.qualification,
      based_on: data.based_on,
      relevant_experience: data.relevant_experience,
    });
  });

export type UpdatePerspectiveFn = typeof updatePerspective;
