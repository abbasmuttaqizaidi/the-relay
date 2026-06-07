import { prisma } from "../db/prisma.server";
import { Notification, CreateNotificationDTO } from "../types";

export class NotificationService {
  /**
   * Creates an internal system notification for a user via Prisma.
   */
  static async createNotification(dto: CreateNotificationDTO): Promise<Notification> {
    try {
      const notification = await prisma.notification.create({
        data: {
          user_id: dto.user_id,
          title: dto.title,
          description: dto.description || null,
          is_read: false,
        },
      });

      return {
        id: notification.id,
        user_id: notification.user_id,
        title: notification.title,
        description: notification.description,
        is_read: notification.is_read,
        created_at: notification.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[NotificationService.createNotification] Error:", error);
      throw new Error(`Failed to create notification: ${error.message || error}`);
    }
  }

  /**
   * Marks a specific notification as read.
   */
  static async markAsRead(notificationId: string): Promise<Notification> {
    try {
      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { is_read: true },
      });

      return {
        id: notification.id,
        user_id: notification.user_id,
        title: notification.title,
        description: notification.description,
        is_read: notification.is_read,
        created_at: notification.created_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[NotificationService.markAsRead] Error:", error);
      throw new Error(`Failed to mark notification as read: ${error.message || error}`);
    }
  }

  /**
   * Lists notifications for a specific user.
   */
  static async listNotificationsForUser(userId: string): Promise<Notification[]> {
    try {
      const notifications = await prisma.notification.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
      });

      return notifications.map((n) => ({
        id: n.id,
        user_id: n.user_id,
        title: n.title,
        description: n.description,
        is_read: n.is_read,
        created_at: n.created_at.toISOString(),
      }));
    } catch (error: any) {
      console.error("[NotificationService.listNotificationsForUser] Error:", error);
      throw new Error(`Failed to list notifications: ${error.message || error}`);
    }
  }
}
