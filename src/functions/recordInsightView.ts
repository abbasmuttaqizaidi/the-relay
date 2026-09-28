import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { auth } from "@clerk/tanstack-react-start/server";
import { InsightViewService } from "../services/insight-view.service";

const recordInsightViewSchema = z.object({
  item_id: z.string().min(1),
  item_type: z.enum(["question", "knowledge"]),
  visitor_id: z.string().optional(),
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

      const result = await InsightViewService.recordUniqueView({
        itemId: data.item_id,
        itemType: data.item_type,
        userId: clerkUserId,
        visitorId: data.visitor_id || null,
      });

      return { success: true, ...result };
    } catch (err: any) {
      console.warn("[recordInsightView] Error recording view:", err);
      return { success: false, isNew: false, totalViews: 0 };
    }
  });

export type RecordInsightViewFn = typeof recordInsightView;
