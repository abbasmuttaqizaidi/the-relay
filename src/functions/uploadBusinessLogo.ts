import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { getSupabaseAdmin } from "../db/supabase";

const uploadBusinessLogoSchema = z.object({
  business_id: z.string().uuid("Please provide a valid business ID"),
  // Base64-encoded file content
  fileBase64: z.string().min(1),
  // MIME type e.g. "image/png"
  mimeType: z.string().min(1),
  // Original file name e.g. "logo.png"
  fileName: z.string().min(1),
});

export const uploadBusinessLogo = createServerFn({ method: "POST" })
  .inputValidator(uploadBusinessLogoSchema)
  .handler(async ({ data }) => {
    const { business_id, fileBase64, mimeType, fileName } = data;

    // 1. Authenticate
    const user = await getAuthenticatedUser();

    // 2. Verify ownership
    const business = await BusinessService.getBusinessById(business_id);
    if (!business) {
      throw new Error("Not Found: Business profile not found.");
    }
    if (business.owner_user_id !== user.id) {
      throw new Error("Unauthorized: You do not own this business profile.");
    }

    // 3. Decode base64 to buffer
    const buffer = Buffer.from(fileBase64, "base64");

    // 4. Build a unique storage path
    const ext = fileName.split(".").pop() || "png";
    const storagePath = `logos/${business_id}/logo.${ext}`;

    // 5. Upload to Supabase Storage (bucket: "business-assets")
    const supabase = getSupabaseAdmin();
    const { error: uploadError } = await supabase.storage
      .from("business-assets")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true, // overwrite if exists
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // 6. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("business-assets")
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // 7. Persist logo_url to DB
    await BusinessService.updateBusiness(business_id, {
      logo_url: publicUrl,
    });

    return { logoUrl: publicUrl };
  });

export type UploadBusinessLogoFn = typeof uploadBusinessLogo;
