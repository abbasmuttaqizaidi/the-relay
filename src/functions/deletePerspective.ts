import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { PerspectiveService } from "../services/perspective.service";
import { deletePerspectiveSchema } from "../validators";

export const deletePerspective = createServerFn({ method: "POST" })
  .inputValidator(deletePerspectiveSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: Business not found.");
    }

    // 3. Delegate to PerspectiveService
    return await PerspectiveService.deletePerspective(data.perspective_id, business.id);
  });

export type DeletePerspectiveFn = typeof deletePerspective;
