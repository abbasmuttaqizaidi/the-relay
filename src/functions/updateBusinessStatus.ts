import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BusinessService } from "../services/business.service";

const updateBusinessStatusSchema = z.object({
  business_id: z.string().uuid(),
  status: z.enum(["pending", "approved", "rejected"]),
  owner_email: z.string().email().optional(),
});

/**
 * Allows the super admin to change the status of a business.
 * Guarded by a simple shared secret token passed from the client.
 */
export const updateBusinessStatus = createServerFn({ method: "POST" })
  .inputValidator(updateBusinessStatusSchema)
  .handler(async ({ data }) => {
    const { business_id, status, owner_email } = data;

    if (status === "approved") {
      const updated = await BusinessService.approveBusiness(business_id, owner_email);
      return { status: updated.status };
    } else if (status === "rejected") {
      const updated = await BusinessService.rejectBusiness(business_id, undefined, owner_email);
      return { status: updated.status };
    } else {
      const updated = await BusinessService.setBusinessStatusToPending(business_id);
      return { status: updated.status };
    }
  });

export type UpdateBusinessStatusFn = typeof updateBusinessStatus;
