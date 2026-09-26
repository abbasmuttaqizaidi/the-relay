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

  if (t.includes("new interest") || t.includes("interest received") || d.includes("interested in your opportunity")) {
    eventType = "interest_received";
    stageNum = 1;
  } else if (t.includes("unlocked") || t.includes("acknowledged") || d.includes("acknowledged the exchange process")) {
    eventType = "acknowledged";
    stageNum = 2;
  } else if (t.includes("counter proposal") || t.includes("new exchange proposal") || t.includes("proposal") && !t.includes("declined") && !t.includes("accepted")) {
    eventType = "proposal_received";
    stageNum = 2;
  } else if (t.includes("declined") || d.includes("declined the exchange proposal")) {
    eventType = "proposal_declined";
    stageNum = 2;
  } else if (t.includes("proposal accepted") || t.includes("final confirmation") || d.includes("accepted your proposal")) {
    eventType = "agreement_ready";
    stageNum = 3;
  } else if (t.includes("terms confirmed") || t.includes("agreement confirmed") || d.includes("mutually agreed")) {
    eventType = "agreement_confirmed";
    stageNum = 4;
  } else if (t.includes("contact exchange requested") || d.includes("wants to exchange their")) {
    eventType = "contact_requested";
    stageNum = 4;
  } else if (t.includes("contact exchange completed") || t.includes("contact exchange approved") || d.includes("approved the")) {
    eventType = "contact_approved";
    stageNum = 4;
  } else if (t.includes("follow-up") || t.includes("reminder")) {
    eventType = "follow_up";
    stageNum = 2;
  }

  // Extract opportunity title if in quotes
  const oppMatch = description?.match(/"([^"]+)"/);
  const oppTitle = oppMatch ? oppMatch[1] : extra?.opportunityTitle || "Bilateral Exchange Opportunity";

  // Extract company name if at beginning of description
  let partnerName = extra?.partnerName || "Counterparty Partner";
  if (description && !extra?.partnerName) {
    const firstWordPart = description.split(" ")[0];
    if (firstWordPart && firstWordPart.length > 1 && !["both", "you", "your", "please", "an"].includes(firstWordPart.toLowerCase())) {
      partnerName = description.split(" has ")[0].split(" is ")[0].split(" sent ")[0].split(" wants ")[0].split(" approved ")[0].split(" declined ")[0] || partnerName;
    }
  }

  return {
    eventType,
    stageNum,
    title,
    description: description || undefined,
    partnerName,
    opportunityTitle: oppTitle,
    partnerIsVerified: true,
    details: extra?.details,
    interestId: extra?.interestId,
    opportunityId: extra?.opportunityId,
    timestamp: "Just now",
    ...extra,
  };
}

/**
 * Global Component rendered at application root to show exchange activity modals.
 */
export function GlobalExchangeActivityModal() {
  const [modalData, setModalData] = useState<ExchangeActivityModalData | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = exchangeActivityBus.subscribe((data) => {
      setModalData(data);
      setOpen(true);
    });
    return unsubscribe;
  }, []);

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
