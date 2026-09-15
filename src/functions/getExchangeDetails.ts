import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { uuidSchema } from "../validators";

export const getExchangeDetails = createServerFn({ method: "POST" })
  .inputValidator(z.object({ interest_id: uuidSchema }))
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.getExchangeDetails(data.interest_id, business.id);
  });
