import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { resolveOrCreateUserDuringOnboarding } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { getSupabaseAdmin } from "../db/supabase";

const uploadBusinessLogoSchema = z.object({
  business_id: z.string().optional().nullable(),
  // Base64-encoded file content
  fileBase64: z.string().min(1, "File content is required"),
  // MIME type e.g. "image/png"
  mimeType: z.string().min(1, "MIME type is required"),
  // Original file name e.g. "logo.png"
  fileName: z.string().min(1, "File name is required"),
});

export const uploadBusinessLogo = createServerFn({ method: "POST" })
  .inputValidator(uploadBusinessLogoSchema)
  .handler(async ({ data }) => {
    const { business_id, fileBase64, mimeType, fileName } = data;
    const targetBusinessId = business_id && business_id.trim() !== "" ? business_id.trim() : null;

    // 1. Authenticate user
    const user = await resolveOrCreateUserDuringOnboarding();

    // 2. If business_id is provided, verify ownership or membership
    if (targetBusinessId) {
      const business = await BusinessService.getBusinessById(targetBusinessId);
      if (business) {
        const userBizIds = await BusinessService.getUserBusinessIds(user.id);
        const hasAccess = business.owner_user_id === user.id || userBizIds.includes(targetBusinessId);
        if (!hasAccess) {
          throw new Error("Unauthorized: You do not own this business profile.");
        }
      }
    }

    // 3. Decode base64 to buffer
    const buffer = Buffer.from(fileBase64, "base64");

    // 4. Validate file size (max 5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      throw new Error("Payload Too Large: Logo size must be under 5MB.");
    }

    // 5. Build storage path
    const ext = fileName.split(".").pop()?.toLowerCase() || "png";
    const storagePath = targetBusinessId
      ? `logos/${targetBusinessId}/logo.${ext}`
      : `logos/user_${user.id}/logo_${Date.now()}.${ext}`;

    // 6. Ensure 'business-assets' bucket exists and is public in Supabase
    const supabase = getSupabaseAdmin();
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === "business-assets");
      if (!bucketExists) {
        await supabase.storage.createBucket("business-assets", {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"],
        });
      }
    } catch (bucketErr) {
      console.warn("[uploadBusinessLogo] Bucket check warning (proceeding):", bucketErr);
    }

    // 7. Clean up existing logo files in this business's folder to avoid orphaned files
    if (targetBusinessId) {
      try {
        const { data: existingFiles } = await supabase.storage
          .from("business-assets")
          .list(`logos/${targetBusinessId}`);
        if (existingFiles && existingFiles.length > 0) {
          const filesToDelete = existingFiles.map((f) => `logos/${targetBusinessId}/${f.name}`);
          await supabase.storage.from("business-assets").remove(filesToDelete);
        }
      } catch (cleanErr) {
        console.warn("[uploadBusinessLogo] Old logo cleanup warning:", cleanErr);
      }
    }

    // 8. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("business-assets")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error("[uploadBusinessLogo] Supabase upload error:", uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // 8. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("business-assets")
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // 9. Persist logo_url to DB if business_id already exists
    if (targetBusinessId) {
      await BusinessService.updateBusiness(targetBusinessId, {
        logo_url: publicUrl,
      });
    }

    return { logoUrl: publicUrl };
  });

export type UploadBusinessLogoFn = typeof uploadBusinessLogo;
