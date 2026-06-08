import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { NotificationService } from "../services/notification.service";
import { z } from "zod";

const markReadSchema = z.object({
  notification_id: z.string().uuid(),
});

export const markNotificationRead = createServerFn({ method: "POST" })
  .inputValidator(markReadSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    await getAuthenticatedUser();

    // 2. Mark notification as read
    const n = await NotificationService.markAsRead(data.notification_id);
    return n;
  });
export type MarkNotificationReadFn = typeof markNotificationRead;
