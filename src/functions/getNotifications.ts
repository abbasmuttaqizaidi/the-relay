import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { NotificationService } from "../services/notification.service";

export const getNotifications = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const user = await getAuthenticatedUser();
      console.log(`[getNotifications Server] User "${user.email}" (DB ID: ${user.id}) is fetching notifications.`);
      const list = await NotificationService.listNotificationsForUser(user.id);
      console.log(`[getNotifications Server] Found ${list.length} notifications for user "${user.email}".`);
      return {
        userId: user.id,
        notifications: list,
      };
    } catch (err: any) {
      console.error("[getNotifications Server ERROR] Failed to fetch notifications:", err.message || err);
      return { userId: "", notifications: [] };
    }
  });
export type GetNotificationsFn = typeof getNotifications;
