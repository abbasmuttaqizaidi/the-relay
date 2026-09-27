import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Handshake,
  MessageSquare,
  ShieldCheck,
  Building2,
  Clock,
  ArrowUpRight,
  Send,
  XCircle,
} from "lucide-react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { VerifiedBadge, PendingBadge } from "./badges";

export type ExchangeActivityEventType =
  | "interest_received"
  | "acknowledged"
  | "proposal_received"
  | "proposal_declined"
  | "proposal_withdrawn"
  | "agreement_ready"
  | "agreement_confirmed"
  | "contact_requested"
  | "contact_approved"
  | "follow_up"
  | "custom";

export interface ExchangeActivityModalData {
  id?: string;
  eventType: ExchangeActivityEventType;
  title?: string;
  description?: string;
  partnerName: string;
  partnerIsVerified?: boolean;
  opportunityTitle: string;
  opportunityId?: string;
  interestId?: string;
  stageNum?: 1 | 2 | 3 | 4 | 5;
  stageLabel?: string;
  details?: string;
  timestamp?: string;
}

export interface ExchangeActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ExchangeActivityModalData;
  onClose?: () => void;
  onOpenExchangeHub?: (interestId?: string, data?: ExchangeActivityModalData) => void;
  closeLabel?: string;
  exchangeHubLabel?: string;
  className?: string;
}

// Visual theme and meta config for each event type
interface EventConfig {
  defaultTitle: string;
  defaultDescription: string;
  badgeLabel: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  defaultStage: 1 | 2 | 3 | 4 | 5;
  stageName: string;
  calloutTitle: string;
}

const EVENT_CONFIGS: Record<ExchangeActivityEventType, EventConfig> = {
  interest_received: {
    defaultTitle: "New Interest Received",
    defaultDescription: "A verified operator has expressed interest in your opportunity. Review their pitch context to proceed.",
    badgeLabel: "STAGE 1 · PROTOCOL CLEARANCE",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    icon: Sparkles,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 1,
    stageName: "Protocol Clearance",
    calloutTitle: "Inbound Pitch Context",
  },
  acknowledged: {
    defaultTitle: "Protocol Acknowledged — Stage 2 Unlocked",
    defaultDescription: "The counterparty has acknowledged Relay bilateral exchange protocol. Mutual negotiation is now unlocked.",
    badgeLabel: "STAGE 2 · NEGOTIATION UNLOCKED",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    icon: CheckCircle2,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 2,
    stageName: "Negotiation Active",
    calloutTitle: "Protocol Status",
  },
  proposal_received: {
    defaultTitle: "Exchange Proposal / Counter-Offer Received",
    defaultDescription: "The counterparty has submitted structured exchange terms. Review the offer or submit a counter-proposal.",
    badgeLabel: "STAGE 2 · PROPOSAL PENDING",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: FileText,
    iconBg: "bg-transparent",
    iconColor: "text-amber-500",
    defaultStage: 2,
    stageName: "Negotiation Active",
    calloutTitle: "Proposed Exchange Terms",
  },
  proposal_declined: {
    defaultTitle: "Exchange Proposal Declined",
    defaultDescription: "The proposed exchange terms were declined by the counterparty. You can submit revised terms in the Exchange Hub.",
    badgeLabel: "STAGE 2 · TERMS REVISED",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
    iconBg: "bg-transparent",
    iconColor: "text-[#DC2626]",
    defaultStage: 2,
    stageName: "Negotiation Active",
    calloutTitle: "Decline Rationale",
  },
  proposal_withdrawn: {
    defaultTitle: "Exchange Proposal Withdrawn by Partner",
    defaultDescription: "The counterparty has withdrawn their active proposal. You can submit new bilateral exchange terms or await a revised proposal.",
    badgeLabel: "STAGE 2 · OFFER WITHDRAWN",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle,
    iconBg: "bg-transparent",
    iconColor: "text-amber-500",
    defaultStage: 2,
    stageName: "Negotiation Active",
    calloutTitle: "Withdrawal Notice",
  },
  agreement_ready: {
    defaultTitle: "Proposal Accepted — Agreement Ready",
    defaultDescription: "Exchange terms have been accepted. Dual sovereign confirmation is now required to ratify the agreement.",
    badgeLabel: "STAGE 3 · FINAL AGREEMENT",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: ShieldCheck,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 3,
    stageName: "Final Agreement",
    calloutTitle: "Agreed Exchange Terms",
  },
  agreement_confirmed: {
    defaultTitle: "Exchange Agreement Ratified",
    defaultDescription: "Both parties have confirmed the bilateral agreement. Reciprocal contact reveal is now active.",
    badgeLabel: "STAGE 4 · CONTACT REVEAL",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Handshake,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 4,
    stageName: "Contact Reveal",
    calloutTitle: "Ratification Notice",
  },
  contact_requested: {
    defaultTitle: "Contact Sharing Requested",
    defaultDescription: "Counterparty has initiated direct contact exchange. Choose which communication coordinates to reciprocate.",
    badgeLabel: "STAGE 4 · CONTACT REVEAL",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    icon: MessageSquare,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 4,
    stageName: "Contact Reveal",
    calloutTitle: "Shared Coordinates",
  },
  contact_approved: {
    defaultTitle: "Contact Coordinates Approved",
    defaultDescription: "Direct contact exchange is complete. You may now connect directly with the counterparty's leadership.",
    badgeLabel: "STAGE 4 · HANDSHAKE COMPLETE",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Handshake,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 4,
    stageName: "Handshake Finalized",
    calloutTitle: "Direct Connection",
  },
  follow_up: {
    defaultTitle: "Exchange Follow-Up Received",
    defaultDescription: "The counterparty has sent an SLA follow-up reminder regarding your pending exchange turn.",
    badgeLabel: "SLA ALERT · ACTION REQUIRED",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    iconBg: "bg-transparent",
    iconColor: "text-amber-500",
    defaultStage: 2,
    stageName: "Follow-Up Pending",
    calloutTitle: "Follow-Up Note",
  },
  custom: {
    defaultTitle: "Exchange Activity Update",
    defaultDescription: "An action was taken on your bilateral exchange.",
    badgeLabel: "EXCHANGE UPDATE",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    icon: ArrowUpRight,
    iconBg: "bg-transparent",
    iconColor: "text-slate-900",
    defaultStage: 2,
    stageName: "Exchange Active",
    calloutTitle: "Activity Detail",
  },
};

const STAGES = [
  { num: 1, label: "Clearance" },
  { num: 2, label: "Negotiate" },
  { num: 3, label: "Agreement" },
  { num: 4, label: "Reveal" },
];

export function ExchangeActivityModal({
  open,
  onOpenChange,
  data,
  onClose,
  onOpenExchangeHub,
  closeLabel = "Close",
  exchangeHubLabel = "Exchange Hub >",
  className,
}: ExchangeActivityModalProps) {
  let pathname = "";
  try {
    pathname = useRouterState({ select: (s) => s.location.pathname });
  } catch {
    if (typeof window !== "undefined") {
      pathname = window.location.pathname;
    }
  }
  const isConnectionsRoute = pathname === "/connections" || pathname.startsWith("/connections");

  let navigate: any = null;
  try {
    navigate = useNavigate();
  } catch {}

  const config = EVENT_CONFIGS[data.eventType] || EVENT_CONFIGS.custom;
  const title = data.title || config.defaultTitle;
  const description = data.description || config.defaultDescription;
  const IconComponent = config.icon;

  const handleClose = () => {
    if (onClose) onClose();
    onOpenChange(false);
  };

  const handleExchangeHub = () => {
    if (onOpenExchangeHub) {
      onOpenExchangeHub(data.interestId, data);
    } else if (navigate) {
      if (data.interestId) {
        navigate({ to: "/connections/$id", params: { id: data.interestId } });
      } else {
        navigate({ to: "/requests/incoming" });
      }
    }
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[calc(100vw-1.5rem)] max-w-[480px] flex-col bg-white text-left font-sans shadow-2xl rounded-lg border border-slate-200 overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {/* Header Bar: Direct inline icon without square box */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0 pr-3">
              <IconComponent className={cn("w-5 h-5 shrink-0", config.iconColor)} />
              <DialogPrimitive.Title className="font-display text-base font-bold text-slate-900 tracking-tight leading-snug">
                {title}
              </DialogPrimitive.Title>
            </div>

            {/* Close Cross Button */}
            <DialogPrimitive.Close
              onClick={handleClose}
              aria-label="Close modal"
              className="rounded-md p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </DialogPrimitive.Close>
          </div>

          {/* Simple Modal Body */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 text-left">
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Modal Footer: Actions (Close & optionally Exchange Hub >) */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 sm:px-6 flex flex-row items-center justify-end gap-2.5 shrink-0">
            <Button
              type="button"
              variant={isConnectionsRoute ? "monochrome" : "outline"}
              size="sm"
              onClick={handleClose}
            >
              {closeLabel}
            </Button>
            {!isConnectionsRoute && (
              <Button
                type="button"
                variant="monochrome"
                size="sm"
                onClick={handleExchangeHub}
              >
                <span>{exchangeHubLabel}</span>
              </Button>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
