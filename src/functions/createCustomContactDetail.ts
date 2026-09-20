import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { createCustomContactSchema } from "../validators";

export const createCustomContactDetail = createServerFn({ method: "POST" })
  .inputValidator(createCustomContactSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await BusinessService.createCustomContactDetail(
      business.id,
      data.label,
      data.value
    );
  });
