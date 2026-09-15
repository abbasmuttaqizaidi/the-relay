import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { KnowledgeService } from "../services/knowledge.service";
import { getSupabaseAdmin } from "../db/supabase";
import { verifyAdminSession } from "../lib/admin-auth.server";

const uploadKnowledgeImageSchema = z.object({
  fileBase64: z.string().min(1, "Image data required"),
  mimeType: z.string().regex(/^image\/(png|jpe?g|webp|gif|svg\+xml)$/i, "Invalid image format"),
  fileName: z.string().min(1, "File name required"),
  knowledge_id: z.string().uuid().optional().nullable(),
});

export const uploadKnowledgeImage = createServerFn({ method: "POST" })
  .inputValidator(uploadKnowledgeImageSchema)
  .handler(async ({ data }) => {
    const { fileBase64, mimeType, fileName, knowledge_id } = data;

    // 1. Check if caller is super admin
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";
    const isAdmin = verifyAdminSession(cookieHeader);

    let businessId = "admin";

    if (!isAdmin) {
      // Authenticate regular user
      const user = await getAuthenticatedUser();
      const business = await BusinessService.getBusinessByOwner(user.id);
      if (!business) {
        throw new Error("Precondition Failed: You must register a business profile first.");
      }
      if (business.status !== "approved") {
        throw new Error(
          `Forbidden: Your business profile is "${business.status}". Image uploads require an approved business.`,
        );
      }
      businessId = business.id;

      if (knowledge_id) {
        const existing = await KnowledgeService.getKnowledgeInsightById(knowledge_id);
        if (existing && existing.business_id !== business.id) {
          throw new Error("Forbidden: You do not own this knowledge insight.");
        }
      }
    }

    // 2. Decode base64
    const buffer = Buffer.from(fileBase64, "base64");
    // Max 10MB file size limit
    if (buffer.length > 10 * 1024 * 1024) {
      throw new Error("Payload Too Large: Image size must be less than 10MB.");
    }

    // 3. Sanitize filename and determine extension
    const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : mimeType.split("/")[1] || "png";
    const cleanBaseName = fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const finalFileName = `${cleanBaseName || "image"}_${uniqueSuffix}.${ext}`;

    const folder = knowledge_id ? knowledge_id : "draft";
    const storagePath = `knowledge/${businessId}/${folder}/${finalFileName}`;

    // 4. Upload to Supabase Storage bucket "business-assets"
    const supabase = getSupabaseAdmin();
    const { error: uploadError } = await supabase.storage
      .from("business-assets")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // 5. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("business-assets")
      .getPublicUrl(storagePath);

    return {
      imageUrl: publicUrlData.publicUrl,
      storagePath,
    };
  });

export type UploadKnowledgeImageFn = typeof uploadKnowledgeImage;
