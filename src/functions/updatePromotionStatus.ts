import { createServerFn } from "@tanstack/react-start";
import { OpportunityService } from "../services/opportunity.service";
import { updatePromotionStatusSchema } from "../validators";

/**
 * Allows the super admin to update the promotion status of an opportunity.
 * Used to approve or reject promotion requests from businesses.
 */
export const updatePromotionStatus = createServerFn({ method: "POST" })
  .inputValidator(updatePromotionStatusSchema)
  .handler(async ({ data }) => {
    const { opportunity_id, promotion_status } = data;
    const updated = await OpportunityService.updatePromotionStatus(
      opportunity_id,
      promotion_status,
    );
    return { promotion_status: updated.promotion_status };
  });

export type UpdatePromotionStatusFn = typeof updatePromotionStatus;
