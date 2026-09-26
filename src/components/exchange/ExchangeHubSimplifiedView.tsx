import React from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Shield,
  ShieldCheck,
  Building2,
  Send,
  AlertCircle,
  Eye,
  ExternalLink,
  Edit3,
  Lock,
  Handshake,
  FileText,
  Hourglass,
  X,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  ExecutiveAlertBanner,
  ExecutiveGridStepper,
  ExecutiveDarkBadge,
  SemanticStatusPill,
  SolidStatusChip,
  VerifiedBadge,
} from "@/design-system";
import { highlightMatchedText } from "@/lib/terms-formatter";
import { TooltipSimple } from "@/components/ui/tooltip";
import { ExchangeHubRound } from "./ExchangeHubDefaultView";

export interface ExchangeHubSimplifiedViewProps {
  data: any;
  myBusinessId: string;
  rounds: ExchangeHubRound[];
  activeRound: ExchangeHubRound | null;
  onAcceptProposal: (proposalId?: string) => Promise<void>;
  onOpenCounterProposalModal: () => void;
  onOpenDeclineModal: () => void;
  onWithdrawProposal?: (proposalId: string) => Promise<void>;
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

export function ExchangeHubSimplifiedView({
  data,
  myBusinessId,
  rounds,
  activeRound,
  onAcceptProposal,
  onOpenCounterProposalModal,
  onOpenDeclineModal,
  onWithdrawProposal,
  loadingAction,
  isStep1Done,
  isStep2Done,
  isStep3Done,
  isStep4Done,
  currentStep,
  renderStage1Content,
  renderStage3Content,
  renderStage4Content,
}: ExchangeHubSimplifiedViewProps) {
  const {
    opportunity,
    requesting_business,
    owner_business,
    is_requester,
  } = data;

  const targetBusiness = (is_requester ? owner_business : requesting_business) || {};
  const myBusiness = (is_requester ? requesting_business : owner_business) || {};

  // Historical past rounds (excluding active / current displayed round)
  const currentActiveRound = activeRound || rounds[rounds.length - 1] || null;
  const pastRounds = currentActiveRound
    ? rounds.filter((r) => r.roundNum !== currentActiveRound.roundNum)
    : rounds;

  // Declined offer states
  const latestRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;
  const isLatestDeclined = latestRound?.status === "declined";
  const wasMyOfferDeclined = isLatestDeclined && Boolean(latestRound?.isMe);
  const didIDeclineLatest = isLatestDeclined && !latestRound?.isMe;

  // Withdrawn offer states
  const isLatestWithdrawn = latestRound?.status === "withdrawn";
  const wasMyOfferWithdrawn = isLatestWithdrawn && Boolean(latestRound?.isMe);
  const didPartnerWithdrawLatest = isLatestWithdrawn && !latestRound?.isMe;

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
      {/* 4-Step Executive Progress Bar (Design System) */}
      <ExecutiveGridStepper
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

      {/* Stage 2: Bilateral Negotiation (Simplified Layout from seo_code_guide.md) */}
      {currentStep === 2 && (
        <div className="space-y-6">
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



          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pb-8">
          {/* LEFT: Current Offer + Clean History (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
            {/* PRIMARY FOCUS: Active Offer Card (Chat-style orientation based on sender/receiver) */}
            {currentActiveRound && (
              <div
                className={`w-full max-w-[94%] sm:max-w-[88%] flex flex-col ${
                  currentActiveRound.isMe ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`flex items-center gap-2 mb-1.5 px-1 ${
                    currentActiveRound.isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="font-sans text-xs font-bold text-slate-900">
                    {currentActiveRound.isMe ? `${myBusiness?.company_name || "You"} (You)` : currentActiveRound.proposerName}
                  </span>
                  <span className="text-slate-300 text-[10px]">•</span>
                  <span className="font-mono text-[11px] text-slate-500">{currentActiveRound.timestamp}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></span>
                </div>

                <Card
                  variant="active"
                  className={`w-full !p-5 sm:!p-7 border-2 border-black !shadow-none !space-y-5 cursor-default !ring-0 text-left ${
                    currentActiveRound.isMe ? "bg-slate-50/50" : "bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 text-white font-mono text-[9px] font-bold uppercase tracking-wider select-none shadow-sm ring-1 ring-slate-900/20">
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                        </span>
                      <span>{currentActiveRound.isMe ? "Waiting for Partner" : "Awaiting Your Decision"}</span>
                      <span className="inline-flex items-center gap-0.5 shrink-0 pl-0.5">
                        <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                        <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:200ms]" />
                        <span className="w-1 h-1 rounded-full bg-white animate-pulse [animation-delay:400ms]" />
                      </span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      • Round 0{currentActiveRound.roundNum} of 0{rounds.length}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Received {currentActiveRound.timestamp}
                  </span>
                </div>

                {/* New Active Card Content Layout */}
                <div className="flex flex-col gap-4 pt-1">
                  {/* Row 1: Heading -> Company Name proposed highlighted_substring or Terms */}
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {currentActiveRound.proposerName} proposed{" "}
                      {currentActiveRound.highlightedTerms && currentActiveRound.highlightedTerms.length > 0
                        ? currentActiveRound.highlightedTerms.join(", ")
                        : "Terms"}
                    </h2>
                  </div>

                  {/* Row 2 & 3: Proposed Terms label & full narrative string with highlighted substring */}
                  {currentActiveRound.narrative && (
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9.5px] uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80 inline-block">
                        Proposed Terms:
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {highlightMatchedText(currentActiveRound.narrative, currentActiveRound.highlightedTerms)}
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
                      {currentActiveRound.valueCategories && currentActiveRound.valueCategories.length > 0 ? (
                        currentActiveRound.valueCategories.map((cat, idx) => (
                          <SemanticStatusPill
                            key={`simplified-active-cat-${idx}`}
                            variant="neutral"
                            format="rounded"
                          >
                            {cat}
                          </SemanticStatusPill>
                        ))
                      ) : (
                        <SemanticStatusPill variant="neutral" format="rounded">
                          {currentActiveRound.dimension}
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
                      {currentActiveRound.deliveryMethods && currentActiveRound.deliveryMethods.length > 0 ? (
                        currentActiveRound.deliveryMethods.map((dm, idx) => {
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
                                key={`simplified-active-dm-${idx}`}
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

                          return <React.Fragment key={`simplified-active-dm-${idx}`}>{pillNode}</React.Fragment>;
                        })
                      ) : (
                        <SemanticStatusPill variant="neutral" format="rounded">
                          {currentActiveRound.archetype}
                        </SemanticStatusPill>
                      )}
                    </div>
                  </div>
                </div>

                  {/* Action Buttons & Waiting Sub-box */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                    {currentActiveRound.status === "declined" ? (
                      currentActiveRound.isMe ? (
                        <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2.5 border border-amber-200">
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-200/70">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-700" />
                              <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                                Proposal Declined • Submit Revised Offer
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-amber-100 font-mono text-[9.5px] font-bold text-amber-800 border border-amber-200">
                              Action Required
                            </span>
                          </div>

                          <p className="font-sans text-xs text-slate-600 leading-relaxed">
                            {targetBusiness?.company_name || "Partner"} declined your previous offer{currentActiveRound.declineReason ? ` (${currentActiveRound.declineReason})` : ""}{currentActiveRound.declineNote ? ` with note: "${currentActiveRound.declineNote}"` : ""}. You can adjust commercial terms and submit a new offer.
                          </p>

                          <div className="pt-1 flex items-center justify-end">
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
                        </div>
                      ) : (
                        <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2 border border-slate-200 text-xs text-slate-600 font-sans">
                          You declined this offer. Awaiting revised proposal from {targetBusiness?.company_name || "Partner"}.
                        </div>
                      )
                    ) : currentActiveRound.status === "withdrawn" ? (
                      <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2.5 border border-amber-200">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-200/70">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-700" />
                            <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                              {currentActiveRound.isMe
                                ? "Offer Withdrawn • Submit New Offer"
                                : "Partner Withdrew Offer • Submit New Terms"}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-100 font-mono text-[9.5px] font-bold text-amber-800 border border-amber-200">
                            {currentActiveRound.isMe ? "Action Required" : "Action Available"}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          {currentActiveRound.isMe
                            ? "You withdrew your previous proposal. The counterparty can no longer accept these terms. You can adjust your commercial terms and submit a new offer whenever you are ready."
                            : `${targetBusiness?.company_name || "Partner"} withdrew their previous proposal before a bilateral response was submitted. You can propose new exchange terms to re-open negotiations.`}
                        </p>

                        <div className="pt-1 flex items-center justify-end">
                          <Button
                            type="button"
                            variant="high-intent"
                            size="sm"
                            onClick={onOpenCounterProposalModal}
                            disabled={Boolean(loadingAction)}
                            className="gap-1.5 font-semibold"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{currentActiveRound.isMe ? "Send New Offer / Counter-Proposal" : "Propose Exchange Terms"}</span>
                          </Button>
                        </div>
                      </div>
                    ) : currentActiveRound.status === "active" && !currentActiveRound.isMe ? (
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
                          onClick={() => onAcceptProposal(currentActiveRound.proposalId || undefined)}
                          disabled={Boolean(loadingAction)}
                        >
                          {loadingAction === "respond-accept" ? "Accepting..." : `Accept Counter-Offer (${currentActiveRound.rate})`}
                        </Button>
                      </div>
                    ) : currentActiveRound.status === "active" && currentActiveRound.isMe ? (
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
                            {currentActiveRound.proposalId && onWithdrawProposal && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onWithdrawProposal(currentActiveRound.proposalId!)}
                                disabled={Boolean(loadingAction)}
                                className="text-slate-500 hover:text-red-700 hover:bg-red-50 gap-1"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Withdraw Offer</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2 border border-slate-200 text-xs text-slate-600 font-sans">
                        This proposal is no longer active.
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* Negotiation History (Past Rounds from seo_code_guide.md Simplified) */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Negotiation History
                </h3>
                <span className="font-mono text-[10px] text-slate-400">
                  {pastRounds.length} Previous {pastRounds.length === 1 ? "Round" : "Rounds"}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {pastRounds.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-xs text-center font-sans">
                    No previous counter-offer revisions recorded yet.
                  </div>
                ) : (
                  pastRounds.map((r) => {
                    const isDeclined = r.status === "declined";

                    return (
                      <div
                        key={`simplified-past-${r.roundNum}`}
                        className={`w-full max-w-[90%] sm:max-w-[82%] flex flex-col ${
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
                          <span className="text-xs text-slate-400 font-mono">{r.timestamp}</span>
                        </div>

                        <Card
                          variant={isDeclined ? "locked" : "resting"}
                          className={`w-full !p-4 !space-y-0 transition-all text-left ${
                            r.isMe ? "bg-slate-50/70 border-slate-200" : "bg-white border-slate-200"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-slate-500">
                                Round 0{r.roundNum}
                              </span>
                              <SemanticStatusPill
                                variant={isDeclined ? "danger" : "neutral"}
                                format="mono"
                              >
                                {r.statusLabel}
                              </SemanticStatusPill>
                            </div>
                          </div>

                          <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-mono uppercase text-slate-400 mr-1">
                                Proposed Terms:
                              </span>
                              <span className="line-through font-mono text-slate-400 font-medium mr-2">
                                {r.rate}
                              </span>
                              {r.valueCategories && r.valueCategories.length > 0 && (
                                <span className="px-2 py-0.5 rounded bg-slate-200/60 font-mono text-[9px] text-slate-600 font-semibold">
                                  {r.valueCategories.join(", ")}
                                </span>
                              )}
                              {r.deliveryMethods && r.deliveryMethods.length > 0 && (
                                <span className="px-2 py-0.5 rounded bg-slate-200/60 font-mono text-[9px] text-slate-600 font-semibold">
                                  {r.deliveryMethods.map((dm) => dm.label).join("; ")}
                                </span>
                              )}
                            </div>
                            {r.declineReason && (
                              <span className="text-xs text-slate-500 italic">
                                Reason: {r.declineReason}
                              </span>
                            )}
                          </div>

                          {r.narrative && (
                            <p className="mt-2 text-xs text-slate-600 bg-white/70 p-2.5 rounded border border-slate-200/60 leading-relaxed">
                              {highlightMatchedText(r.narrative, r.highlightedTerms)}
                            </p>
                          )}

                          {r.declineNote && (
                            <p className="mt-2 text-xs text-slate-600 italic bg-white/70 p-2.5 rounded border border-slate-200/60">
                              Note: &ldquo;{r.declineNote}&rdquo;
                            </p>
                          )}
                        </Card>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Clean Side Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Counterparty Profile */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                  Counterparty Summary
                </span>
                <VerifiedBadge size={14} />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[3px] bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                  {getInitials(targetBusiness.company_name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {targetBusiness.company_name}
                  </h4>
                  <span className="text-xs text-slate-500 truncate">
                    {targetBusiness.hq_location || "Global"} • {targetBusiness.industry || "Enterprise"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-mono text-[9px] text-slate-400 block uppercase font-bold">
                    Match Score
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    98%
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-mono text-[9px] text-slate-400 block uppercase font-bold">
                    Track Record
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    42 Deals
                  </span>
                </div>
              </div>
            </div>

            {/* Negotiation Trajectory Audit Trail */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                  Offer Trajectory
                </span>
                <span className="font-mono text-[9px] text-slate-400">
                  R1 → R{rounds.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 font-mono text-xs">
                {rounds.map((rItem) => (
                  <div
                    key={`simplified-traj-${rItem.roundNum}`}
                    className={`flex items-center justify-between py-1.5 px-3 rounded-lg transition-all ${
                      rItem.isCurrent
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : rItem.status === "declined"
                        ? "bg-slate-100 text-slate-600 border border-slate-200"
                        : "bg-slate-50 text-slate-400 line-through"
                    }`}
                  >
                    <span>
                      R{rItem.roundNum}: {rItem.rate}
                    </span>
                    <span
                      className={`text-[10px] font-sans ${
                        rItem.isCurrent ? "text-slate-300 font-medium" : "text-slate-500"
                      }`}
                    >
                      {rItem.isMe ? "You" : rItem.proposerName.split(" ")[0]} •{" "}
                      {rItem.isCurrent
                        ? "Current"
                        : rItem.status === "declined"
                        ? "Declined"
                        : "Superseded"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero Contact Leakage Guarantee */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3 shadow-sm">
              <Lock className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Zero Contact Leakage Guarantee
                </span>
                <p className="leading-relaxed text-slate-500 text-[11px]">
                  Direct contacts and sensitive credentials remain protected and are unlocked only upon mutual Stage 4 agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
