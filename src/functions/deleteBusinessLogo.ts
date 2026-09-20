import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { resolveOrCreateUserDuringOnboarding } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { getSupabaseAdmin } from "../db/supabase";

const deleteBusinessLogoSchema = z.object({
  business_id: z.string().optional().nullable(),
  logo_url: z.string().optional().nullable(),
});

export const deleteBusinessLogo = createServerFn({ method: "POST" })
  .inputValidator(deleteBusinessLogoSchema)
  .handler(async ({ data }) => {
    const { business_id, logo_url } = data;
    const targetBusinessId = business_id && business_id.trim() !== "" ? business_id.trim() : null;

    const user = await resolveOrCreateUserDuringOnboarding();
    const supabase = getSupabaseAdmin();

    if (targetBusinessId) {
      const business = await BusinessService.getBusinessById(targetBusinessId);
      if (!business) {
        throw new Error("Not Found: Business profile not found.");
      }
      const userBizIds = await BusinessService.getUserBusinessIds(user.id);
      const hasAccess = business.owner_user_id === user.id || userBizIds.includes(targetBusinessId);
      if (!hasAccess) {
        throw new Error("Unauthorized: You do not own this business profile.");
      }

      // Remove from Supabase Storage
      try {
        const { data: existingFiles } = await supabase.storage
          .from("business-assets")
          .list(`logos/${targetBusinessId}`);

        if (existingFiles && existingFiles.length > 0) {
          const filePaths = existingFiles.map((f) => `logos/${targetBusinessId}/${f.name}`);
          await supabase.storage.from("business-assets").remove(filePaths);
        }
      } catch (err) {
        console.warn("[deleteBusinessLogo] Storage deletion warning:", err);
      }

      // Update database record to clear logo_url
      await BusinessService.updateBusiness(targetBusinessId, {
        logo_url: null,
      });
    } else if (logo_url && logo_url.includes("/business-assets/")) {
      try {
        const path = logo_url.split("/business-assets/")[1];
        if (path) {
          await supabase.storage.from("business-assets").remove([path]);
        }
      } catch (err) {
        console.warn("[deleteBusinessLogo] Direct path deletion warning:", err);
      }
    }

    return { success: true };
  });

export type DeleteBusinessLogoFn = typeof deleteBusinessLogo;
