import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { deleteCustomContactSchema } from "../validators";

export const deleteCustomContactDetail = createServerFn({ method: "POST" })
  .inputValidator(deleteCustomContactSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await BusinessService.deleteCustomContactDetail(business.id, data.id);
  });
