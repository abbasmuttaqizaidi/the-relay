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
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { VerifiedBadge, PendingBadge } from "./badges";

export type ExchangeActivityEventType =
  | "interest_received"
  | "acknowledged"
  | "proposal_received"
  | "proposal_declined"
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
    iconBg: "bg-slate-100 border-slate-200",
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
    iconBg: "bg-slate-100 border-slate-200",
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
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
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
    iconBg: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-600",
    defaultStage: 2,
    stageName: "Negotiation Active",
    calloutTitle: "Decline Rationale",
  },
  agreement_ready: {
    defaultTitle: "Proposal Accepted — Agreement Ready",
    defaultDescription: "Exchange terms have been accepted. Dual sovereign confirmation is now required to ratify the agreement.",
    badgeLabel: "STAGE 3 · FINAL AGREEMENT",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
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
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
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
    iconBg: "bg-slate-100 border-slate-200",
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
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
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
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
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
    iconBg: "bg-slate-100 border-slate-200",
    iconColor: "text-slate-700",
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
  const config = EVENT_CONFIGS[data.eventType] || EVENT_CONFIGS.custom;
  const title = data.title || config.defaultTitle;
  const description = data.description || config.defaultDescription;
  const stageNum = (data.stageNum || config.defaultStage) as 1 | 2 | 3 | 4 | 5;
  const IconComponent = config.icon;

  const handleClose = () => {
    if (onClose) onClose();
    onOpenChange(false);
  };

  const handleExchangeHub = () => {
    if (onOpenExchangeHub) {
      onOpenExchangeHub(data.interestId, data);
    }
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] w-[calc(100vw-1.5rem)] max-w-[540px] flex-col bg-white text-left font-sans shadow-2xl rounded-[4px] border border-slate-200 overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6 bg-slate-50/50 shrink-0">
            <div className="flex items-start gap-3 min-w-0 pr-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5 shadow-xs",
                  config.iconBg
                )}
              >
                <IconComponent className={cn("w-4.5 h-4.5", config.iconColor)} />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-[2px] border",
                      config.badgeColor
                    )}
                  >
                    {data.stageLabel || config.badgeLabel}
                  </span>
                  {data.timestamp && (
                    <span className="font-mono text-[9px] text-slate-400 font-medium">
                      {data.timestamp}
                    </span>
                  )}
                </div>
                <DialogPrimitive.Title className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {title}
                </DialogPrimitive.Title>
              </div>
            </div>

            {/* Close Cross Button */}
            <DialogPrimitive.Close
              onClick={handleClose}
              aria-label="Close modal"
              className="rounded-[2px] p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </DialogPrimitive.Close>
          </div>

          {/* Modal Body */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 space-y-4 text-left">
            {/* Opportunity & Counterparty Ribbon */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-[4px] p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-[2px] bg-slate-900 text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                    {data.partnerName ? data.partnerName.charAt(0).toUpperCase() : "P"}
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-sans text-xs font-bold text-slate-900 truncate">
                      {data.partnerName || "Counterparty Partner"}
                    </span>
                    {data.partnerIsVerified !== false ? <VerifiedBadge /> : <PendingBadge />}
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold shrink-0">
                  Bilateral Partner
                </span>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                  Target Opportunity
                </span>
                <p className="font-sans text-xs font-semibold text-slate-800 line-clamp-1">
                  {data.opportunityTitle || "Bilateral Exchange Opportunity"}
                </p>
              </div>
            </div>

            {/* Narrative Explanation */}
            <div className="space-y-1.5">
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Highlight Details / Terms Box (if provided) */}
            {data.details && (
              <div className="bg-white border border-slate-200 rounded-[3px] p-3 space-y-1 shadow-2xs">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                  {config.calloutTitle}
                </span>
                <p className="font-sans text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">
                  {data.details}
                </p>
              </div>
            )}

            {/* 4-Stage Mini Stepper Progress */}
            <div className="pt-1 space-y-1.5 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                  Exchange Lifecycle Stage
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-700 font-bold">
                  Stage {stageNum > 4 ? 4 : stageNum} of 4: {config.stageName}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {STAGES.map((stg) => {
                  const isCurrent = (stageNum > 4 ? 4 : stageNum) === stg.num;
                  const isPassed = (stageNum > 4 ? 4 : stageNum) > stg.num;
                  return (
                    <div
                      key={stg.num}
                      className={cn(
                        "rounded-[2px] py-1 px-1.5 text-center border transition-all",
                        isCurrent
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : isPassed
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      )}
                    >
                      <div className="flex items-center justify-center gap-1 font-mono text-[8.5px] uppercase tracking-wider font-bold">
                        {isPassed && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />}
                        <span>
                          {stg.num}. {stg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer: EXACTLY 2 Actions (Close & Exchange Hub >) */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 sm:px-6 flex flex-row items-center justify-end gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="text-xs h-8 px-3.5 border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold"
            >
              {closeLabel}
            </Button>
            <Button
              type="button"
              variant="authoritative"
              size="sm"
              onClick={handleExchangeHub}
              className="text-xs h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold uppercase tracking-wider font-mono gap-1.5 shadow-sm"
            >
              <span>{exchangeHubLabel}</span>
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
