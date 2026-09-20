import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { updateCustomContactSchema } from "../validators";

export const updateCustomContactDetail = createServerFn({ method: "POST" })
  .inputValidator(updateCustomContactSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await BusinessService.updateCustomContactDetail(
      business.id,
      data.id,
      data.label,
      data.value
    );
  });
