import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Shield,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Building2,
  Send,
  AlertCircle,
  Eye,
  ExternalLink,
  Edit3,
  Lock,
  X,
  FileText,
  Handshake,
  Hourglass,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  ExchangePipelineRibbon,
  ExecutiveAlertBanner,
  SemanticStatusPill,
  ExecutiveDarkBadge,
  SolidStatusChip,
  VerifiedBadge,
} from "@/design-system";
import { highlightMatchedText, FormattedDeliveryMethod } from "@/lib/terms-formatter";
import { TooltipSimple } from "@/components/ui/tooltip";

export interface ExchangeHubRound {
  roundNum: number;
  versionBadge: string;
  badge: string;
  title: string;
  timestamp: string;
  proposerName: string;
  isMe: boolean;
  dimension: string;
  archetype: string;
  settlement: string;
  rate: string;
  narrative: string;
  additionalTerms?: string | null;
  valueCategories?: string[];
  deliveryMethods?: FormattedDeliveryMethod[];
  highlightedTerms?: string[];
  isCurrent: boolean;
  status: "active" | "superseded" | "declined" | "withdrawn" | "accepted";
  statusLabel: string;
  declineReason?: string | null;
  declineNote?: string | null;
  proposalId?: string | null;
}

export interface ExchangeHubDefaultViewProps {
  data: any;
  myBusinessId: string;
  rounds: ExchangeHubRound[];
  activeRound: ExchangeHubRound | null;
  selectedDrawerRound: ExchangeHubRound | null;
  onSelectDrawerRound: (round: ExchangeHubRound | null) => void;
  onAcceptProposal: (proposalId?: string) => Promise<void>;
  onOpenCounterProposalModal: () => void;
  onOpenDeclineModal: () => void;
  onWithdrawProposal?: (proposalId: string) => Promise<void>;
  onQuickDispatch: (termsText: string) => Promise<void>;
  loadingAction: string | null;
  isStep1Done: boolean;
  isStep2Done: boolean;
  isStep3Done: boolean;
  isStep4Done: boolean;
  currentStep: number;
  handleAcknowledge: () => Promise<void>;
  handleFollowUp: () => Promise<void>;
  renderStage1Content: () => React.ReactNode;
  renderStage3Content: () => React.ReactNode;
  renderStage4Content: () => React.ReactNode;
}

export function ExchangeHubDefaultView({
  data,
  myBusinessId,
  rounds,
  activeRound,
  selectedDrawerRound,
  onSelectDrawerRound,
  onAcceptProposal,
  onOpenCounterProposalModal,
  onOpenDeclineModal,
  onWithdrawProposal,
  onQuickDispatch,
  loadingAction,
  isStep1Done,
  isStep2Done,
  isStep3Done,
  isStep4Done,
  currentStep,
  renderStage1Content,
  renderStage3Content,
  renderStage4Content,
}: ExchangeHubDefaultViewProps) {
  const {
    opportunity,
    requesting_business,
    owner_business,
    is_requester,
    is_owner,
  } = data;

  const targetBusiness = (is_requester ? owner_business : requesting_business) || {};
  const myBusiness = (is_requester ? requesting_business : owner_business) || {};
  const [quickInput, setQuickInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // The round to display in side drawer (selected or active)
  const drawerRound = selectedDrawerRound || activeRound || rounds[rounds.length - 1] || null;

  // Declined offer states
  const latestRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;
  const isLatestDeclined = latestRound?.status === "declined";
  const wasMyOfferDeclined = isLatestDeclined && Boolean(latestRound?.isMe);
  const didIDeclineLatest = isLatestDeclined && !latestRound?.isMe;

  // Withdrawn offer states
  const isLatestWithdrawn = latestRound?.status === "withdrawn";
  const wasMyOfferWithdrawn = isLatestWithdrawn && Boolean(latestRound?.isMe);
  const didPartnerWithdrawLatest = isLatestWithdrawn && !latestRound?.isMe;

  const handleDispatch = async () => {
    if (!quickInput.trim()) return;
    await onQuickDispatch(quickInput.trim());
    setQuickInput("");
  };

  const getInitials = (name?: string) => {
    if (!name) return "RL";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Central Stepper Pipeline Ribbon (Design System) */}
      <ExchangePipelineRibbon
        currentStage={currentStep as 1 | 2 | 3 | 4}
        isStep1Done={isStep1Done}
        isStep2Done={isStep2Done}
        isStep3Done={isStep3Done}
        isStep4Done={isStep4Done}
      />

      {/* Stage 1: Acknowledgement View */}
      {currentStep === 1 && renderStage1Content()}

      {/* Stage 3: Agreement Confirmation View */}
      {currentStep === 3 && renderStage3Content()}

      {/* Stage 4: Contact Exchange & Handshake View */}
      {currentStep === 4 && renderStage4Content()}

      {/* Stage 2: Bilateral Negotiation Workspace (Default Feed + Drawer from seo_code_guide.md) */}
      {currentStep === 2 && (
        <div className="space-y-5">
          {/* Top Banner: Awaiting Counterparty Turn (Official Design System ExecutiveAlertBanner) */}
          {activeRound && activeRound.isMe && (
            <ExecutiveAlertBanner
              variant="warning"
              title="Awaiting Counterparty Turn"
              badgeText="41h SLA Remaining"
              badgeFormat="mono"
              icon={<Hourglass className="w-5 h-5 text-amber-700 animate-hourglass" />}
              description={
                <span>
                  <strong className="font-semibold text-slate-900">{targetBusiness?.company_name || "Partner"}</strong> holds the active decision turn. Your Round 0{activeRound.roundNum} proposal ({activeRound.rate}) is pending their review. You may edit your proposal at any time before they respond.
                </span>
              }
              primaryAction={{
                label: "Edit Proposal",
                onClick: onOpenCounterProposalModal,
              }}
              secondaryAction={
                activeRound.proposalId && onWithdrawProposal
                  ? {
                      label: "Withdraw Offer",
                      onClick: () => onWithdrawProposal(activeRound.proposalId!),
                    }
                  : undefined
              }
            />
          )}

          {/* Top Banner: Offer Declined - Revision Available for Proposer */}
          {wasMyOfferDeclined && latestRound && (
            <ExecutiveAlertBanner
              variant="warning"
              title="Proposal Declined • Submit New Offer"
              badgeText="Action Required"
              badgeFormat="mono"
              icon={<AlertCircle className="w-5 h-5 text-amber-700" />}
              description={
                <span>
                  <strong className="font-semibold text-slate-900">{targetBusiness?.company_name || "Partner"}</strong> declined your Round 0{latestRound.roundNum} offer{latestRound.declineReason ? ` (${latestRound.declineReason})` : ""}. You can adjust commercial terms and submit a new offer to continue bilateral negotiations.
                </span>
              }
              primaryAction={{
                label: "Send New Offer",
                onClick: onOpenCounterProposalModal,
              }}
            />
          )}

          {/* Top Banner: You Declined Partner's Offer */}
          {didIDeclineLatest && latestRound && (
            <ExecutiveAlertBanner
              variant="neutral"
              title="Proposal Declined • Awaiting Partner Counter-Offer"
              badgeText="Awaiting Partner"
              badgeFormat="mono"
              icon={<Clock className="w-5 h-5 text-slate-600" />}
              description={
                <span>
                  You declined <strong className="font-semibold text-slate-900">{targetBusiness?.company_name || "Partner"}&apos;s</strong> Round 0{latestRound.roundNum} proposal. Awaiting their revised terms.
                </span>
              }
            />
          )}

          {/* Top Banner: You Withdrew Your Offer */}
          {wasMyOfferWithdrawn && latestRound && (
            <ExecutiveAlertBanner
              variant="neutral"
              title="Proposal Withdrawn • Submit New Offer"
              badgeText="Withdrawn by You"
              badgeFormat="mono"
              icon={<X className="w-5 h-5 text-slate-600" />}
              description={
                <span>
                  You withdrew your Round 0{latestRound.roundNum} proposal. You can adjust terms and submit a new offer whenever you are ready.
                </span>
              }
              primaryAction={{
                label: "Send New Offer",
                onClick: onOpenCounterProposalModal,
              }}
            />
          )}



          <div className="relative w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pb-8">
          {/* Central Feed (8 cols on large screens) */}
          <div className="w-full xl:col-span-8 flex flex-col gap-5">
            {/* Feed Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900 tracking-tight">
                  Negotiation Feed & Logs
                </h2>
                <p className="font-sans text-xs text-slate-500">
                  Chronological proposal logs, counter-offers, and bilateral dispatches
                </p>
              </div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                {rounds.length} {rounds.length === 1 ? "Revision" : "Revisions"}
              </span>
            </div>

            {/* Timeline Date Divider */}
            <div className="relative flex items-center justify-center my-0.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative bg-white px-3 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Activity Log • {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>

            {/* Render Chronological Rounds History */}
            {rounds.map((r) => {
              const isTurnActive = r.isCurrent;
              const isDeclined = r.status === "declined";
              const isSuperseded = r.status === "superseded" || r.status === "withdrawn";

              // If it is the current active turn, render the High-Impact Elevated Card (from seo_code_guide.md Message 4)
              if (isTurnActive) {
                return (
                  <div key={`round-card-${r.roundNum}`} className="w-full flex flex-col gap-2">
                    {/* Active Turn Divider */}
                    {rounds.length > 1 && (
                      <div className="relative flex items-center justify-center my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t-2 border-slate-900/15" />
                        </div>
                        <div className="relative bg-slate-900 text-white px-3 py-0.5 rounded font-mono text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>Active Actionable Turn</span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`w-full max-w-[92%] sm:max-w-[85%] flex flex-col ${
                        r.isMe ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1.5 px-1 ${
                          r.isMe ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span className="font-sans text-xs font-bold text-slate-900">
                          {r.isMe ? `${myBusiness?.company_name || "You"} (You)` : r.proposerName}
                        </span>
                        <span className="text-slate-300 text-[10px]">•</span>
                        <span className="font-mono text-[11px] text-slate-500">{r.timestamp}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></span>
                      </div>

                      {/* High-Impact Solid Border Active Card (No drop shadow, only black border) */}
                      <Card
                        variant="active"
                        className={`w-full !p-5 sm:!p-6 border-2 border-black !shadow-none !space-y-4 cursor-default !ring-0 text-left ${
                          r.isMe ? "bg-slate-50/50" : "bg-white"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-900 font-bold">
                              Round 0{r.roundNum} Specification • {r.isMe ? "Awaiting Partner Review" : "In Your Court"}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 text-white font-mono text-[9px] font-bold uppercase tracking-wider select-none shadow-sm ring-1 ring-slate-900/20">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                            </span>
                            <span>{r.isMe ? "Waiting for Partner" : "Awaiting Your Decision"}</span>
                            <span className="inline-flex items-center gap-0.5 shrink-0 pl-0.5">
                              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                              <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:200ms]" />
                              <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:400ms]" />
                            </span>
                          </span>
                        </div>

                        {/* New Active Card Content Layout */}
                        <div className="flex flex-col gap-4 pt-1">
                          {/* Row 1: Heading -> Company Name proposed highlighted_substring or Terms */}
                          <div>
                            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                              {r.proposerName} proposed{" "}
                              {r.highlightedTerms && r.highlightedTerms.length > 0
                                ? r.highlightedTerms.join(", ")
                                : "Terms"}
                            </h2>
                          </div>

                          {/* Row 2 & 3: Proposed Terms label & full narrative string with highlighted substring */}
                          {r.narrative && (
                            <div className="space-y-1.5">
                              <span className="font-mono text-[9.5px] uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80 inline-block">
                                Proposed Terms:
                              </span>
                              <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                                {highlightMatchedText(r.narrative, r.highlightedTerms)}
                              </p>
                            </div>
                          )}

                          {/* Row 4 & 5: Value Categories & tags */}
                          <div className="space-y-1.5">
                            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-slate-600" />
                              Value Categories
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {r.valueCategories && r.valueCategories.length > 0 ? (
                                r.valueCategories.map((cat, idx) => (
                                  <SemanticStatusPill
                                    key={`active-cat-${idx}`}
                                    variant="neutral"
                                    format="rounded"
                                  >
                                    {cat}
                                  </SemanticStatusPill>
                                ))
                              ) : (
                                <SemanticStatusPill variant="neutral" format="rounded">
                                  {r.dimension}
                                </SemanticStatusPill>
                              )}
                            </div>
                          </div>

                          {/* Row 6 & 7: Delivery Methods & tags (with tooltip on other/custom values) */}
                          <div className="space-y-1.5">
                            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                              <Handshake className="w-3.5 h-3.5 text-slate-600" />
                              Delivery Methods
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {r.deliveryMethods && r.deliveryMethods.length > 0 ? (
                                r.deliveryMethods.map((dm, idx) => {
                                  const pillNode = (
                                    <SemanticStatusPill
                                      variant={dm.isOther ? "warning" : "neutral"}
                                      format="rounded"
                                      className={dm.isOther ? "cursor-help" : undefined}
                                    >
                                      {dm.label}
                                    </SemanticStatusPill>
                                  );

                                  if (dm.isOther && dm.customValue) {
                                    return (
                                      <TooltipSimple
                                        key={`active-dm-${idx}`}
                                        content={
                                          <div className="space-y-0.5">
                                            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Custom Delivery Specification:</div>
                                            <div className="font-sans text-xs text-white">{dm.customValue}</div>
                                          </div>
                                        }
                                      >
                                        <div>{pillNode}</div>
                                      </TooltipSimple>
                                    );
                                  }

                                  return <React.Fragment key={`active-dm-${idx}`}>{pillNode}</React.Fragment>;
                                })
                              ) : (
                                <SemanticStatusPill variant="neutral" format="rounded">
                                  {r.archetype}
                                </SemanticStatusPill>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons & Waiting Sub-box */}
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                          {!r.isMe ? (
                            <div className="flex flex-wrap items-center justify-end gap-2.5">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={onOpenDeclineModal}
                                disabled={Boolean(loadingAction)}
                                className="text-slate-500 hover:text-slate-900"
                              >
                                Decline Offer
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onOpenCounterProposalModal}
                                disabled={Boolean(loadingAction)}
                              >
                                Propose Counter-Offer
                              </Button>
                              <Button
                                type="button"
                                variant="monochrome"
                                size="sm"
                                onClick={() => onAcceptProposal(r.proposalId || undefined)}
                                disabled={Boolean(loadingAction)}
                              >
                                {loadingAction === "respond-accept" ? "Accepting..." : `Accept Offer (${r.rate})`}
                              </Button>
                            </div>
                          ) : (
                            /* Sub-box when sender is waiting for partner response (from seo_code_guide.md waiting-for-replay) */
                            <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2.5 border border-slate-200">
                              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/70">
                                <div className="flex items-center gap-2">
                                  <Hourglass className="w-4 h-4 text-slate-900 animate-pulse" />
                                  <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                                    Waiting for {targetBusiness?.company_name || "Partner"}&apos;s Response
                                  </span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-slate-200/80 font-mono text-[9.5px] font-semibold text-slate-700 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                                  Active SLA: 41h remaining
                                </span>
                              </div>

                              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                                {targetBusiness?.company_name || "Partner"} currently holds the active decision turn. While their bilateral review window is open, you can revise the commercial terms or withdraw the proposition.
                              </p>

                              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="monochrome"
                                    size="sm"
                                    onClick={onOpenCounterProposalModal}
                                    disabled={Boolean(loadingAction)}
                                    className="gap-1.5"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit Active Proposal</span>
                                  </Button>
                                  {r.proposalId && onWithdrawProposal && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onWithdrawProposal(r.proposalId!)}
                                      disabled={Boolean(loadingAction)}
                                      className="text-slate-500 hover:text-red-700 hover:bg-red-50 gap-1"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                      <span>Withdraw Offer</span>
                                    </Button>
                                  )}
                                </div>

                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    onSelectDrawerRound(r);
                                    setIsDrawerOpen(true);
                                  }}
                                  className="text-slate-900 font-semibold gap-1"
                                >
                                  <span>Open Full Specification</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              }

              // Otherwise, render historical round bubble (from seo_code_guide.md Messages 1, 2, 3)
              return (
                <div
                  key={`round-bubble-${r.roundNum}`}
                  className={`w-full max-w-[88%] sm:max-w-[80%] flex flex-col ${
                    r.isMe ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 mb-1 px-1 ${
                      r.isMe ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span className="font-sans text-xs font-semibold text-slate-900">
                      {r.isMe ? `${myBusiness?.company_name || "You"} (You)` : r.proposerName}
                    </span>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="font-mono text-[11px] text-slate-500">{r.timestamp}</span>
                  </div>

                  <Card
                    variant={isDeclined ? "locked" : "resting"}
                    className={`w-full !p-4 sm:!p-5 shadow-xs transition-all !space-y-0 text-left ${
                      r.isMe ? "bg-slate-50/70 border-slate-200" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/70">
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-500 font-bold">
                        Round 0{r.roundNum} • {r.badge}
                      </span>
                      <SemanticStatusPill
                        variant={isDeclined ? "danger" : "neutral"}
                        format="mono"
                      >
                        {r.statusLabel}
                      </SemanticStatusPill>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2">
                      <span
                        className={`font-display text-base sm:text-lg ${
                          isSuperseded || isDeclined
                            ? "line-through text-slate-400 font-normal"
                            : "font-bold text-slate-900"
                        }`}
                      >
                        {r.rate}
                      </span>
                      {r.declineReason ? (
                        <span className="font-sans text-xs text-slate-500 italic">
                          (Decline reason: {r.declineReason})
                        </span>
                      ) : (
                        <span className="font-sans text-xs text-slate-500">
                          {r.archetype}
                        </span>
                      )}
                    </div>

                    {r.narrative && (
                      <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                        {highlightMatchedText(r.narrative, r.highlightedTerms)}
                      </p>
                    )}

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-slate-500">
                      <div className="flex flex-wrap items-center gap-1.5 font-sans text-xs">
                        {r.valueCategories && r.valueCategories.length > 0 ? (
                          r.valueCategories.map((cat, idx) => (
                            <span key={`past-cat-${idx}`} className="px-2 py-0.5 rounded bg-white font-mono text-[9px] text-slate-600 border border-slate-200 font-semibold">
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-white font-mono text-[9px] text-slate-600 border border-slate-200 font-semibold">
                            {r.dimension}
                          </span>
                        )}

                        {r.deliveryMethods && r.deliveryMethods.length > 0 && (
                          r.deliveryMethods.map((dm, idx) => (
                            <span key={`past-dm-${idx}`} className={`px-2 py-0.5 rounded font-mono text-[9px] border ${
                              dm.isOther
                                ? "bg-slate-100 text-slate-900 border-slate-300 font-semibold"
                                : "bg-white text-slate-600 border border-slate-200 font-semibold"
                            }`}>
                              {dm.label}
                            </span>
                          ))
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onSelectDrawerRound(r);
                          setIsDrawerOpen(true);
                        }}
                        className="text-slate-900 font-semibold gap-1"
                      >
                        <span>View Terms &amp; Audit Sheet</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}

            {/* If the latest offer was declined and I proposed it, show actionable Revised Offer Card */}
            {wasMyOfferDeclined && latestRound && (
              <div className="w-full flex flex-col gap-2 pt-2">
                <div className="relative flex items-center justify-center my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-amber-300" />
                  </div>
                  <div className="relative bg-amber-50 border border-amber-200 text-amber-900 px-3 py-0.5 rounded font-mono text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Your Turn • Revised Offer</span>
                  </div>
                </div>

                <div className="w-full max-w-[88%] sm:max-w-[80%] ml-auto flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1 px-1 flex-row-reverse">
                    <span className="font-sans text-xs font-bold text-slate-900">
                      {myBusiness?.company_name || "You"} (You)
                    </span>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="font-mono text-[11px] text-amber-700 font-semibold">Action Required</span>
                  </div>

                  <Card variant="active" className="w-full !p-5 sm:!p-6 border-2 border-amber-500/80 bg-amber-50/20 !shadow-none !space-y-4 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-900 font-bold">
                          Round 0{latestRound.roundNum + 1} Revision Opportunity
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 font-mono text-[9px] font-bold uppercase text-amber-800 border border-amber-200">
                        Proposal Revision
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        Propose Revised Commercial Terms
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {targetBusiness?.company_name || "Partner"} declined your previous offer{latestRound.declineReason ? ` (${latestRound.declineReason})` : ""}{latestRound.declineNote ? ` with note: "${latestRound.declineNote}"` : ""}. Adjust your value categories, rate, or delivery specifications to bridge the gap.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-200/60 flex items-center justify-end gap-2.5">
                      <Button
                        type="button"
                        variant="high-intent"
                        size="sm"
                        onClick={onOpenCounterProposalModal}
                        disabled={Boolean(loadingAction)}
                        className="gap-1.5 font-semibold"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Send New Offer / Counter-Proposal</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* If the latest offer was withdrawn, show actionable New Offer Card */}
            {isLatestWithdrawn && latestRound && (
              <div className="w-full flex flex-col gap-2 pt-2">
                <div className="relative flex items-center justify-center my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-amber-300" />
                  </div>
                  <div className="relative bg-amber-50 border border-amber-200 text-amber-900 px-3 py-0.5 rounded font-mono text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>{latestRound.isMe ? "Your Turn • Submit New Offer" : "Bilateral Turn • Submit Terms"}</span>
                  </div>
                </div>

                <div className="w-full max-w-[88%] sm:max-w-[80%] ml-auto flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1 px-1 flex-row-reverse">
                    <span className="font-sans text-xs font-bold text-slate-900">
                      {myBusiness?.company_name || "You"} (You)
                    </span>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="font-mono text-[11px] text-amber-700 font-semibold">Action Available</span>
                  </div>

                  <Card variant="active" className="w-full !p-5 sm:!p-6 border-2 border-amber-500/80 bg-amber-50/20 !shadow-none !space-y-4 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-900 font-bold">
                          Round 0{latestRound.roundNum + 1} Proposal Opportunity
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 font-mono text-[9px] font-bold uppercase text-amber-800 border border-amber-200">
                        New Proposal
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {latestRound.isMe ? "Propose Revised Commercial Terms" : "Propose New Exchange Terms"}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {latestRound.isMe
                          ? "You withdrew your previous proposal. You can adjust your value categories, rate, or delivery specifications and submit a new offer whenever you are ready."
                          : `${targetBusiness?.company_name || "Partner"} withdrew their previous proposal. You can submit new bilateral exchange terms to continue negotiations.`}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-200/60 flex items-center justify-end gap-2.5">
                      <Button
                        type="button"
                        variant="high-intent"
                        size="sm"
                        onClick={onOpenCounterProposalModal}
                        disabled={Boolean(loadingAction)}
                        className="gap-1.5 font-semibold"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{latestRound.isMe ? "Send New Offer / Counter-Proposal" : "Propose Exchange Terms"}</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Quick Bilateral Dispatch Input Bar vs Locked Input Box when waiting */}
            {activeRound && activeRound.isMe ? (
              /* Locked Turn Input Box (from seo_code_guide.md waiting-for-replay Message 4/Locked Bar) */
              <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-3 mt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-900 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-700" />
                      Bilateral Turn Locked
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 font-mono text-[9.5px] font-semibold text-slate-600 flex items-center gap-1">
                    <Hourglass className="w-3 h-3 text-slate-500" />
                    {targetBusiness?.company_name || "Partner"} Turn
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-display font-bold text-sm text-slate-900">
                    Waiting for {targetBusiness?.company_name || "Partner"}&apos;s response
                  </p>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    You cannot submit a new offer until {targetBusiness?.company_name || "Partner"} responds (Accepts, Declines, or Counters). You may update the current active proposal terms or withdraw the offer before their decision.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="monochrome"
                      size="sm"
                      onClick={onOpenCounterProposalModal}
                      disabled={Boolean(loadingAction)}
                      className="gap-1.5 shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Active Proposal</span>
                    </Button>
                    {activeRound.proposalId && onWithdrawProposal && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onWithdrawProposal(activeRound.proposalId!)}
                        disabled={Boolean(loadingAction)}
                        className="text-slate-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Withdraw Offer</span>
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                    <span>Bilateral SLA Active: 41h</span>
                  </div>
                </div>
              </div>
            ) : activeRound && !activeRound.isMe ? (
              <div className="w-full bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200 mt-2 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-500 font-bold">
                    Direct Bilateral Dispatch
                  </span>
                  <span className="font-mono text-[9.5px] text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Encrypted Bilateral Session</span>
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleDispatch();
                      }
                    }}
                    placeholder="Type counter-terms (e.g. 'Proposing 7.5% revenue share with Net 30 days settlement')..."
                    className="w-full h-8.5 px-3 bg-slate-50 font-sans text-xs text-slate-900 rounded-[4px] border border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                  />
                  <Button
                    type="button"
                    variant="monochrome"
                    size="sm"
                    onClick={handleDispatch}
                    disabled={!quickInput.trim() || Boolean(loadingAction)}
                    className="shrink-0"
                  >
                    <span>Send Proposal</span>
                    <Send className="w-3.5 h-3.5 text-slate-200" />
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Side Drawer Panel (4 cols on desktop sticky from seo_code_guide.md) */}
          <aside
            className={`w-full xl:col-span-4 bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-200 flex flex-col gap-4 sticky top-20 transition-all duration-300 ${
              !isDrawerOpen ? "opacity-60 pointer-events-none" : "opacity-100"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[9px] font-bold text-slate-700 uppercase tracking-wider border border-slate-200">
                    Round 0{drawerRound?.roundNum || "1"} {drawerRound?.isCurrent ? (drawerRound.isMe ? "(Pending Review)" : "(Actionable Turn)") : "(Audit Record)"}
                  </span>
                  {drawerRound?.isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></span>}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 tracking-tight mt-0.5">
                  Round 0{drawerRound?.roundNum || "1"} Proposal Specification
                </h3>
                <span className="font-mono text-[10px] text-slate-400">
                  Recorded {drawerRound?.timestamp || "Recently"}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="w-7 h-7 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                title="Toggle Drawer View"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Counterparty Lockup */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[3px] bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {getInitials(targetBusiness.company_name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {targetBusiness.company_name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  </div>
                  <span className="font-sans text-[11px] text-slate-500 truncate">
                    {targetBusiness.hq_location || "Global"} • {targetBusiness.industry || "Enterprise"}
                  </span>
                </div>
              </div>
              <VerifiedBadge size={14} />
            </div>

            {/* Turn Status Notice in Drawer when sender is waiting */}
            {drawerRound?.isCurrent && drawerRound?.isMe && (
              <div className="p-3 bg-slate-50 rounded-lg border-l-2 border-slate-900 border-t border-r border-b border-slate-200 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-900 font-bold flex items-center gap-1.5">
                    <Hourglass className="w-3 h-3 text-slate-700" />
                    Turn Status: Awaiting Counterparty
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200/80 font-mono text-[8.5px] font-semibold text-slate-700 uppercase">
                    41h SLA
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-600 leading-relaxed">
                  {targetBusiness?.company_name || "Partner"} currently holds the active turn to Accept, Decline, or Counter. As the sender, you may modify terms via <strong>Edit Active Proposal</strong> or retract using <strong>Withdraw Offer</strong> at any point prior to their reply.
                </p>
              </div>
            )}

            {/* Commercial Terms Breakdown */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Commercial Terms Breakdown
              </span>
              <div className="bg-slate-50 rounded-lg border border-slate-200 divide-y divide-slate-200/70 text-xs">
                <div className="px-3 py-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">Value Categories</span>
                    <span className="font-sans font-semibold text-slate-900 text-right">
                      {drawerRound?.valueCategories && drawerRound.valueCategories.length > 0
                        ? drawerRound.valueCategories.join(", ")
                        : drawerRound?.dimension || "Distribution & Sales"}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">Delivery Methods</span>
                    <span className="font-sans font-medium text-slate-900 text-right max-w-[200px] truncate">
                      {drawerRound?.deliveryMethods && drawerRound.deliveryMethods.length > 0
                        ? drawerRound.deliveryMethods.map((dm) => dm.label).join("; ")
                        : drawerRound?.archetype || "Authorized VAR Reseller"}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2 flex items-center justify-between bg-white/60">
                  <span className="text-slate-500 font-sans">Target Share / Rate</span>
                  <span className="font-sans font-bold text-slate-950 text-sm">
                    {drawerRound?.rate || "Standard Terms"}
                  </span>
                </div>
              </div>
            </div>

            {/* Commercial Narrative Excerpt */}
            {drawerRound?.narrative && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                  Commercial Narrative
                </span>
                <div className="p-3 bg-slate-50 rounded-lg border-l-2 border-slate-900 border-t border-r border-b border-slate-200">
                  <p className="font-sans text-xs text-slate-700 leading-relaxed">
                    &ldquo;{highlightMatchedText(drawerRound.narrative, drawerRound.highlightedTerms)}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* Offer Trajectory Audit List */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                Offer Trajectory
              </span>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col gap-2 font-mono text-xs">
                {rounds.map((rItem) => (
                  <div
                    key={`trajectory-r-${rItem.roundNum}`}
                    className={`flex items-center justify-between ${
                      rItem.isCurrent
                        ? "font-bold text-slate-900 pt-1 border-t border-slate-200"
                        : rItem.status === "declined"
                        ? "text-slate-500 line-through"
                        : "text-slate-400 line-through"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          rItem.isCurrent ? "bg-slate-900" : "bg-slate-400 opacity-60"
                        }`}
                      ></span>
                      <span>
                        R0{rItem.roundNum} ({rItem.isMe ? "You" : rItem.proposerName.split(" ")[0]})
                      </span>
                    </div>
                    <span>
                      {rItem.rate} {rItem.isCurrent ? "• Active" : rItem.status === "declined" ? "• Declined" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Discreet Integrity Note */}
            <div className="flex items-start gap-2 text-slate-500 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              <Shield className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Contact Leakage:</strong> Counterparty direct credentials remain masked until Stage 04 agreement.
              </span>
            </div>

            {/* Footer Actions */}
            {drawerRound?.isCurrent && (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-auto">
                {!drawerRound.isMe ? (
                  <>
                    <Button
                      type="button"
                      variant="monochrome"
                      size="sm"
                      onClick={() => onAcceptProposal(drawerRound.proposalId || undefined)}
                      disabled={Boolean(loadingAction)}
                      className="w-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Accept Terms</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onOpenCounterProposalModal}
                      disabled={Boolean(loadingAction)}
                      className="w-full"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-700" />
                      <span>Propose Counter</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="monochrome"
                      size="sm"
                      onClick={onOpenCounterProposalModal}
                      disabled={Boolean(loadingAction)}
                      className="w-full gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Active Proposal</span>
                    </Button>
                    {drawerRound.proposalId && onWithdrawProposal && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onWithdrawProposal(drawerRound.proposalId!)}
                        disabled={Boolean(loadingAction)}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200 gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Withdraw Offer</span>
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
      )}
    </div>
  );
}
