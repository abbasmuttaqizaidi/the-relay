import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import {
  ExchangeActivityModal,
  type ExchangeActivityModalData,
  type ExchangeActivityEventType,
} from "./exchange-activity-modal";

// Global Event Listener Bus for Exchange Activity
type Listener = (data: ExchangeActivityModalData) => void;
const listeners = new Set<Listener>();

export const exchangeActivityBus = {
  emit: (data: ExchangeActivityModalData) => {
    listeners.forEach((listener) => listener(data));
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/**
 * Imperative trigger to open the Exchange Activity Modal from anywhere in the application.
 */
export function showExchangeActivityModal(data: ExchangeActivityModalData) {
  exchangeActivityBus.emit(data);
}

/**
 * Helper to parse notification payload and determine exchange event metadata
 */
export function parseNotificationToExchangeActivity(
  title: string,
  description?: string | null,
  extra?: Partial<ExchangeActivityModalData>
): ExchangeActivityModalData {
  const t = title.toLowerCase();
  const d = (description || "").toLowerCase();

  let eventType: ExchangeActivityEventType = "custom";
  let stageNum: 1 | 2 | 3 | 4 | 5 = 2;
  let displayTitle = title;

  if (t.includes("new interest") || t.includes("interest received") || d.includes("interested in your opportunity")) {
    eventType = "interest_received";
    stageNum = 1;
    displayTitle = "New Interest Received";
  } else if (t.includes("unlocked") || t.includes("acknowledged") || d.includes("acknowledged the exchange process")) {
    eventType = "acknowledged";
    stageNum = 2;
    displayTitle = "Exchange Protocol Acknowledged";
  } else if (t.includes("counter proposal") || d.includes("counter-proposal") || d.includes("counter proposal") || t.includes("counter offer")) {
    eventType = "proposal_received";
    stageNum = 2;
    displayTitle = "You have received a new counter offer";
  } else if (t.includes("new exchange proposal") || (t.includes("proposal") && !t.includes("declined") && !t.includes("accepted") && !t.includes("withdrawn"))) {
    eventType = "proposal_received";
    stageNum = 2;
    displayTitle = "You have received a new proposal";
  } else if (t.includes("declined") || d.includes("declined the exchange proposal") || d.includes("declined your proposal") || d.includes("declined")) {
    eventType = "proposal_declined";
    stageNum = 2;
    displayTitle = "Your offer has been declined";
  } else if (t.includes("proposal accepted") || t.includes("final confirmation") || d.includes("accepted your proposal") || d.includes("accepted the proposal")) {
    eventType = "agreement_ready";
    stageNum = 3;
    displayTitle = "Proposal Accepted — Agreement Ready";
  } else if (t.includes("withdrawn") || d.includes("withdrew")) {
    eventType = "proposal_withdrawn";
    stageNum = 2;
    displayTitle = "Proposal Withdrawn by Partner";
  } else if (t.includes("terms confirmed") || t.includes("agreement confirmed") || d.includes("mutually agreed")) {
    eventType = "agreement_confirmed";
    stageNum = 4;
    displayTitle = "Exchange Agreement Confirmed";
  } else if (t.includes("contact exchange requested") || d.includes("wants to exchange their")) {
    eventType = "contact_requested";
    stageNum = 4;
    displayTitle = "Contact Sharing Requested";
  } else if (t.includes("contact exchange completed") || t.includes("contact exchange approved") || d.includes("approved the")) {
    eventType = "contact_approved";
    stageNum = 4;
    displayTitle = "Contact Coordinates Approved";
  } else if (t.includes("follow-up") || t.includes("reminder")) {
    eventType = "follow_up";
    stageNum = 2;
    displayTitle = "Exchange Follow-Up Received";
  }

  // Extract opportunity title if in quotes
  const oppMatch = description?.match(/"([^"]+)"/);
  const oppTitle = oppMatch ? oppMatch[1] : extra?.opportunityTitle || "Bilateral Exchange Opportunity";

  // Extract company name if at beginning of description
  let partnerName = extra?.partnerName || "Counterparty Partner";
  if (description && !extra?.partnerName) {
    const firstWordPart = description.split(" ")[0];
    if (firstWordPart && firstWordPart.length > 1 && !["both", "you", "your", "please", "an"].includes(firstWordPart.toLowerCase())) {
      partnerName = description.split(" has ")[0].split(" is ")[0].split(" sent ")[0].split(" wants ")[0].split(" approved ")[0].split(" declined ")[0].split(" withdrew ")[0].split(" accepted ")[0] || partnerName;
    }
  }

  // Extract reason if present in description
  let details = extra?.details;
  if (!details && description) {
    if (description.includes("Reason:")) {
      details = description.substring(description.indexOf("Reason:"));
    }
  }

  return {
    eventType,
    stageNum,
    title: displayTitle,
    description: description || undefined,
    partnerName,
    opportunityTitle: oppTitle,
    partnerIsVerified: true,
    details,
    interestId: extra?.interestId,
    opportunityId: extra?.opportunityId,
    timestamp: "Just now",
    ...extra,
  };
}

import { createClient } from "@supabase/supabase-js";
import { getSupabaseClientConfig } from "@/functions/getSupabaseClientConfig";
import { getNotifications } from "@/functions/getNotifications";
import { executiveToast } from "./toast-notification";

/**
 * Global Component rendered at application root to show exchange activity modals.
 * Listens to in-app activity bus, live Supabase WebSocket notifications, and fallback sync.
 */
export function GlobalExchangeActivityModal() {
  const [modalData, setModalData] = useState<ExchangeActivityModalData | null>(null);
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const seenNotifIdsRef = React.useRef<Set<string>>(new Set());
  const isInitializedRef = React.useRef(false);

  // 1. In-app Activity Bus Subscription
  useEffect(() => {
    const unsubscribe = exchangeActivityBus.subscribe((data) => {
      setModalData(data);
      setOpen(true);
    });
    return unsubscribe;
  }, []);

  // 2. Global Supabase Realtime WebSocket + Periodic Sync for User Notifications
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let activeChannel: any = null;
    let isMounted = true;
    let intervalId: any = null;

    const processNewNotification = (newNotif: { id?: string; title: string; description?: string | null; is_read?: boolean }) => {
      if (!newNotif || !isMounted) return;
      if (newNotif.id) {
        if (seenNotifIdsRef.current.has(newNotif.id)) return;
        seenNotifIdsRef.current.add(newNotif.id);
      }

      try {
        const activityData = parseNotificationToExchangeActivity(
          newNotif.title,
          newNotif.description
        );
        setModalData(activityData);
        setOpen(true);
        // Notify any active page subscribers
        exchangeActivityBus.emit(activityData);
      } catch (e) {
        console.error("Failed to parse realtime exchange activity:", e);
      }

      try {
        executiveToast.success(newNotif.title, {
          badge: "Exchange Alert",
          description: newNotif.description || undefined,
        });
      } catch (_) {}
    };

    const setupGlobalNotificationsRealtime = async () => {
      try {
        const config = await getSupabaseClientConfig();
        if (!config.supabaseUrl || !config.supabaseAnonKey) return;

        const res = await getNotifications();
        if (!res || !res.userId || !isMounted) return;

        const currentUserId = res.userId;

        // Initialize seen notifications on first mount
        if (!isInitializedRef.current) {
          if (Array.isArray(res.notifications)) {
            res.notifications.forEach((n: any) => {
              if (n.id) seenNotifIdsRef.current.add(n.id);
            });
          }
          isInitializedRef.current = true;
        }

        const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

        // Listen for new notifications in real-time
        activeChannel = supabase
          .channel(`global-notifications-live-${currentUserId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `user_id=eq.${currentUserId}`,
            },
            (payload: any) => {
              if (payload?.new) {
                processNewNotification(payload.new);
              }
            }
          )
          .subscribe();

        // 3. Fallback sync poll (every 4 seconds) to guarantee delivery throughout the app
        intervalId = setInterval(async () => {
          if (!isMounted) return;
          try {
            const freshRes = await getNotifications();
            if (freshRes?.notifications && Array.isArray(freshRes.notifications)) {
              for (const n of freshRes.notifications) {
                if (n.id && !seenNotifIdsRef.current.has(n.id) && !n.is_read) {
                  processNewNotification(n);
                  break; // show one modal at a time
                }
              }
            }
          } catch (_) {}
        }, 4000);
      } catch (err) {
        console.error("Failed to setup global notifications realtime:", err);
      }
    };

    setupGlobalNotificationsRealtime();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      if (activeChannel) {
        activeChannel.unsubscribe();
      }
    };
  }, [isLoaded, isSignedIn]);

  const handleOpenExchangeHub = useCallback((interestId?: string, data?: ExchangeActivityModalData) => {
    setOpen(false);
    if (interestId) {
      navigate({ to: "/connections/$id", params: { id: interestId } });
    } else if (data?.interestId) {
      navigate({ to: "/connections/$id", params: { id: data.interestId } });
    } else {
      navigate({ to: "/requests/incoming" });
    }
  }, [navigate]);

  if (!modalData) return null;

  return (
    <ExchangeActivityModal
      open={open}
      onOpenChange={setOpen}
      data={modalData}
      onOpenExchangeHub={handleOpenExchangeHub}
    />
  );
}
