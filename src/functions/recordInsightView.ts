import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { auth } from "@clerk/tanstack-react-start/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { InsightViewService } from "../services/insight-view.service";

const recordInsightViewSchema = z.object({
  item_id: z.string().min(1),
  item_type: z.enum(["question", "knowledge"]),
  visitor_id: z.string().optional(),
  device_fingerprint: z.string().optional(),
  referrer: z.string().optional(),
});

export const recordInsightView = createServerFn({ method: "POST" })
  .inputValidator(recordInsightViewSchema)
  .handler(async ({ data }) => {
    try {
      let clerkUserId: string | null = null;
      try {
        const session = await auth();
        if (session?.userId) {
          clerkUserId = session.userId;
        }
      } catch (_) {}

      // Extract client IP address and HTTP referrer from request headers
      let clientIp: string | null = null;
      let headerReferrer: string | null = null;
      try {
        const headers = getRequestHeaders();
        const forwarded = headers.get("x-forwarded-for");
        if (forwarded) {
          clientIp = forwarded.split(",")[0].trim();
        } else {
          clientIp =
            headers.get("x-real-ip")?.trim() ||
            headers.get("cf-connecting-ip")?.trim() ||
            null;
        }
        headerReferrer = headers.get("referer") || headers.get("referrer") || null;
      } catch (_) {}

      const effectiveReferrer = data.referrer || headerReferrer || null;

      const result = await InsightViewService.recordUniqueView({
        itemId: data.item_id,
        itemType: data.item_type,
        userId: clerkUserId,
        visitorId: data.visitor_id || null,
        deviceFingerprint: data.device_fingerprint || null,
        clientIp: clientIp,
        source: effectiveReferrer,
      });

      return { success: true, ...result };
    } catch (err: any) {
      console.warn("[recordInsightView] Error recording view:", err);
      return { success: false, isNew: false, totalViews: 0 };
    }
  });

export type RecordInsightViewFn = typeof recordInsightView;
