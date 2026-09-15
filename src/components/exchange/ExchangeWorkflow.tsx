import React, { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Handshake,
  FileText,
  Lock,
  Unlock,
  Building2,
  Share2,
  Info,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Twitter,
  Copy,
  Check,
  Send,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Award,
  Sparkles,
  Undo,
  X,
} from "lucide-react";
import { ExchangeType, ContactField, DeclineReason } from "@/types";
import { acknowledgeExchangeProcess } from "@/functions/acknowledgeExchangeProcess";
import { sendExchangeFollowUp } from "@/functions/sendExchangeFollowUp";
import { createExchangeProposal } from "@/functions/createExchangeProposal";
import { respondExchangeProposal } from "@/functions/respondExchangeProposal";
import { withdrawExchangeProposal } from "@/functions/withdrawExchangeProposal";
import { confirmExchangeAgreement } from "@/functions/confirmExchangeAgreement";
import { shareContactConsent } from "@/functions/shareContactConsent";
import { acceptContactConsent } from "@/functions/acceptContactConsent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExchangeWorkflowProps {
  data: any;
  myBusinessId: string;
  onRefresh: () => Promise<void>;
}

export function ExchangeWorkflow({
  data,
  myBusinessId,
  onRefresh,
}: ExchangeWorkflowProps) {
  const {
    interest,
    opportunity,
    requesting_business,
    owner_business,
    is_requester,
    is_owner,
    proposals,
    agreement,
    consents,
    allowed_revealed_contacts,
    is_legacy_handshake,
  } = data;

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showReliabilityInfo, setShowReliabilityInfo] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isOpportunityOpen, setIsOpportunityOpen] = useState(false);

  // Proposal form state
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [exchangeType, setExchangeType] = useState<ExchangeType>("revenue_share");
  const [exchangeDetails, setExchangeDetails] = useState("");
  const [revenuePercentage, setRevenuePercentage] = useState<string>("7");
  const [fixedAmount, setFixedAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [additionalTerms, setAdditionalTerms] = useState("");

  // Decline proposal modal state
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState<DeclineReason>("valuation_mismatch");
  const [declineNote, setDeclineNote] = useState("");

  // Contact sharing selection state
  const [selectedContacts, setSelectedContacts] = useState<ContactField[]>([
    "email",
    "linkedin",
  ]);

  const targetBusiness = is_requester ? owner_business : requesting_business;
  const myBusiness = is_requester ? requesting_business : owner_business;

  // Derive workflow steps completion
  const requesterAcknowledged = Boolean(interest.requester_acknowledged_at);
  const ownerAcknowledged = Boolean(interest.owner_acknowledged_at);
  const bothAcknowledged = requesterAcknowledged && ownerAcknowledged;
  const myAcknowledged = is_requester ? requesterAcknowledged : ownerAcknowledged;
  const otherAcknowledged = is_requester ? ownerAcknowledged : requesterAcknowledged;

  const activeProposal = proposals && proposals.length > 0 ? proposals[0] : null;
  const isAgreed = agreement?.status === "agreed";
  const isAgreementDraft = agreement?.status === "draft";

  const ownerConfirmed = Boolean(agreement?.owner_confirmed_at);
  const requesterConfirmed = Boolean(agreement?.requester_confirmed_at);
  const myConfirmed = is_requester ? requesterConfirmed : ownerConfirmed;
  const otherConfirmed = is_requester ? ownerConfirmed : requesterConfirmed;

  // Contact consents given by me to other
  const myConsents = (consents || []).filter(
    (c: any) => c.from_business_id === myBusinessId
  );
  // Contact consents received from other for me to accept
  const incomingConsents = (consents || []).filter(
    (c: any) => c.to_business_id === myBusinessId
  );
  const pendingIncomingConsents = incomingConsents.filter(
    (c: any) => c.status === "requested"
  );
  const acceptedIncomingConsents = incomingConsents.filter(
    (c: any) => c.status === "accepted"
  );

  const hasSharedAnyContact = myConsents.length > 0;
  const hasAcceptedAnyContact = acceptedIncomingConsents.length > 0;

  const isHandshakeComplete =
    is_legacy_handshake ||
    (isAgreed && (hasSharedAnyContact || myConsents.length === 0) && (hasAcceptedAnyContact || incomingConsents.length === 0));

  const isStep1Done = bothAcknowledged;
  const isStep2Done = isAgreed || isAgreementDraft;
  const isStep3Done = isAgreed;
  const isStep4Done = isHandshakeComplete;

  const currentStep = !isStep1Done ? 1 : !isStep2Done ? 2 : !isStep3Done ? 3 : 4;

  // Mobile stepper & history modal state
  const [isMobileStepperOpen, setIsMobileStepperOpen] = useState(false);
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);

  const stepNames: Record<number, string> = {
    1: "Acknowledge",
    2: "Negotiate",
    3: "Agreement",
    4: "Handshake",
  };
  const currentStepName = stepNames[currentStep] || "Acknowledge";

  const stepsData = [
    {
      step: 1,
      name: "Acknowledge",
      desc: "Review & accept exchange operating rules",
      isDone: isStep1Done,
      isActive: currentStep === 1,
    },
    {
      step: 2,
      name: "Negotiate",
      desc: "Draft, counter, or accept commercial proposal terms",
      isDone: isStep2Done,
      isActive: currentStep === 2,
    },
    {
      step: 3,
      name: "Agreement",
      desc: "Both parties confirm final mutual agreement",
      isDone: isStep3Done,
      isActive: currentStep === 3,
    },
    {
      step: 4,
      name: "Handshake",
      desc: "Consensual direct contact details exchange",
      isDone: isStep4Done,
      isActive: currentStep === 4,
    },
  ];

  // Handlers
  const handleAcknowledge = async () => {
    try {
      setLoadingAction("acknowledge");
      await acknowledgeExchangeProcess({ data: { interest_id: interest.id } });
      toast.success("Process Acknowledged", {
        description: "You have acknowledged how Relay's exchange process works.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to record acknowledgement.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleFollowUp = async () => {
    try {
      setLoadingAction("follow-up");
      await sendExchangeFollowUp({
        data: { interest_id: interest.id },
      });
      toast.success("Follow-Up Sent", {
        description: `Reminder sent to ${targetBusiness.company_name} to acknowledge the exchange process.`,
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to send follow-up.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exchangeDetails.trim()) {
      toast.error("Please provide exchange details.");
      return;
    }
    try {
      setLoadingAction("proposal");
      await createExchangeProposal({
        data: {
          interest_id: interest.id,
          exchange_type: exchangeType,
          exchange_details: exchangeDetails.trim(),
          revenue_percentage:
            exchangeType === "revenue_share" && revenuePercentage
              ? parseFloat(revenuePercentage)
              : undefined,
          fixed_amount:
            exchangeType === "fixed_amount" && fixedAmount
              ? parseFloat(fixedAmount)
              : undefined,
          currency: exchangeType === "fixed_amount" ? currency : undefined,
          additional_terms: additionalTerms.trim() || undefined,
        },
      });
      toast.success("Proposal Submitted", {
        description: "Your exchange proposal has been sent to the partner.",
      });
      setShowProposalForm(false);
      setExchangeDetails("");
      setAdditionalTerms("");
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to submit proposal.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRespondProposal = async (
    proposalId: string,
    action: "accept" | "decline",
    reason?: DeclineReason,
    note?: string
  ) => {
    try {
      setLoadingAction(`respond-${action}`);
      await respondExchangeProposal({
        data: {
          proposal_id: proposalId,
          action,
          decline_reason: action === "decline" ? reason || declineReason : undefined,
          decline_note: action === "decline" ? (note !== undefined ? note : declineNote) : undefined,
        },
      });
      if (action === "accept") {
        toast.success("Proposal Accepted", {
          description: "Please review and confirm the final exchange terms.",
        });
      } else {
        toast.info("Proposal Declined", {
          description: "You declined this exchange proposal.",
        });
        setShowDeclineModal(false);
        setDeclineNote("");
      }
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to respond to proposal.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleConfirmAgreement = async () => {
    if (!agreement?.final_proposal_id) return;
    try {
      setLoadingAction("confirm");
      await confirmExchangeAgreement({
        data: {
          interest_id: interest.id,
          proposal_id: agreement.final_proposal_id,
        },
      });
      toast.success("Exchange Terms Confirmed", {
        description: "You have officially agreed to the final exchange terms.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to confirm agreement.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleShareContacts = async () => {
    if (selectedContacts.length === 0) {
      toast.error("Please select at least one contact method to share.");
      return;
    }
    try {
      setLoadingAction("share-contacts");
      await shareContactConsent({
        data: {
          interest_id: interest.id,
          fields: selectedContacts,
        },
      });
      toast.success("Contact Details Selected", {
        description: "The other business will be prompted to accept these contact details.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to share contact fields.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAcceptIncomingContacts = async (fieldsToAccept: ContactField[]) => {
    try {
      setLoadingAction("accept-contacts");
      await acceptContactConsent({
        data: {
          interest_id: interest.id,
          fields: fieldsToAccept,
        },
      });
      toast.success("Contact Details Accepted", {
        description: "You can now view the partner's verified contact information.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to accept contact details.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleWithdrawProposal = async (proposalId: string) => {
    try {
      setLoadingAction("withdraw-proposal");
      await withdrawExchangeProposal({
        data: { proposal_id: proposalId },
      });
      toast.success("Proposal Withdrawn", {
        description: "Your exchange proposal has been withdrawn.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to withdraw proposal.");
    } finally {
      setLoadingAction(null);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getExchangeTypeLabel = (type: string) => {
    switch (type) {
      case "fixed_amount":
        return "Money / Fixed Amount";
      case "revenue_share":
        return "Revenue Share / Percentage";
      case "qualified_lead":
        return "Qualified Lead / Referral";
      case "business_opportunity":
        return "Business Opportunity";
      case "service_work":
        return "Service / Work";
      case "partnership":
        return "Partnership";
      case "introduction":
        return "Introduction / Connection";
      case "other":
      default:
        return "Other";
    }
  };

  const getDynamicSuggestionTip = (type: ExchangeType) => {
    const rawIndustry = (targetBusiness?.industry || opportunity?.industry || "").toLowerCase();
    const company = targetBusiness?.company_name || "the partner";

    if (type === "qualified_lead") {
      if (rawIndustry.includes("saas") || rawIndustry.includes("software") || rawIndustry.includes("tech")) {
        return `Introduce an enterprise decision-maker, CTO, or business looking for software solutions or tooling from ${company}.`;
      }
      if (rawIndustry.includes("market") || rawIndustry.includes("agency") || rawIndustry.includes("design") || rawIndustry.includes("media")) {
        return `Introduce a brand, e-commerce store, or business actively looking for marketing, web development, SEO, or creative services.`;
      }
      if (rawIndustry.includes("finan") || rawIndustry.includes("fintech") || rawIndustry.includes("account") || rawIndustry.includes("tax")) {
        return `Introduce a business looking for accounting, tax advisory, payment solutions, or financial planning services.`;
      }
      if (rawIndustry.includes("real estate") || rawIndustry.includes("property")) {
        return `Introduce a prospective property buyer, commercial tenant, developer, or investor to ${company}.`;
      }
      if (rawIndustry.includes("consult") || rawIndustry.includes("advis")) {
        return `Introduce a corporate client or founder looking for strategic advisory or operations consulting.`;
      }
      if (rawIndustry.includes("health") || rawIndustry.includes("med")) {
        return `Introduce a clinic, healthcare provider, or health-tech buyer relevant to ${company}.`;
      }
      return `Suggest a verified, high-intent client or customer introduction relevant to ${company}'s ${targetBusiness?.industry || "industry"} practice.`;
    }

    if (type === "business_opportunity") {
      if (rawIndustry.includes("saas") || rawIndustry.includes("software") || rawIndustry.includes("tech")) {
        return `Propose a co-development project, enterprise integration, or software build contract that ${company} can execute.`;
      }
      if (rawIndustry.includes("market") || rawIndustry.includes("agency") || rawIndustry.includes("design")) {
        return `Propose a subcontracting project, RFP client deal, or creative campaign suited for ${company}.`;
      }
      if (rawIndustry.includes("distribut") || rawIndustry.includes("retail") || rawIndustry.includes("e-commerce")) {
        return `Propose a product distribution deal, reseller channel, or catalog placement opportunity.`;
      }
      return `Propose a commercial contract, project RFP, or open client opportunity that ${company} is well-equipped to fulfill.`;
    }

    if (type === "partnership") {
      if (rawIndustry.includes("saas") || rawIndustry.includes("tech")) {
        return `Propose an API integration, joint product bundle, or co-marketing campaign to each other's tech user bases.`;
      }
      if (rawIndustry.includes("market") || rawIndustry.includes("agency")) {
        return `Propose a reciprocal referral alliance or co-branded client package with ${company}.`;
      }
      return `Propose a strategic commercial partnership, co-marketing campaign, or distribution alliance with ${company}.`;
    }

    if (type === "service_work") {
      return `Offer specialized execution support, technical implementation, or deliverables that directly benefit ${company}'s current pipeline.`;
    }

    if (type === "revenue_share") {
      return `Propose sharing a percentage of first invoice or collected contract revenue directly earned through this opportunity.`;
    }

    if (type === "fixed_amount") {
      return `Propose a defined placement fee or compensation amount for utilizing ${company}'s opportunity.`;
    }

    if (type === "introduction") {
      return `Propose introducing ${company} to a strategic investor, industry partner, or key vendor in the ${targetBusiness?.industry || "commercial"} market.`;
    }

    return `Propose structured commercial value specifically tailored to ${company}'s business goals in ${targetBusiness?.industry || "their sector"}.`;
  };

  const getAutofillExchangeDetails = (type: ExchangeType) => {
    const company = targetBusiness?.company_name || "the partner";
    const rawIndustry = (targetBusiness?.industry || opportunity?.industry || "").toLowerCase();
    const industry = targetBusiness?.industry || opportunity?.industry || "relevant";

    switch (type) {
      case "qualified_lead":
        if (rawIndustry.includes("saas") || rawIndustry.includes("software") || rawIndustry.includes("tech")) {
          return `We will provide a direct, qualified introduction to an enterprise decision-maker and CTO actively evaluating software solutions in the ${industry} space for ${company}.`;
        }
        if (rawIndustry.includes("market") || rawIndustry.includes("agency") || rawIndustry.includes("design") || rawIndustry.includes("media")) {
          return `We will introduce a high-growth brand and client actively seeking professional marketing, branding, and digital growth services from ${company}.`;
        }
        if (rawIndustry.includes("finan") || rawIndustry.includes("fintech") || rawIndustry.includes("account")) {
          return `We will introduce an established corporate client requiring specialized financial advisory, tax, and accounting solutions from ${company}.`;
        }
        if (rawIndustry.includes("real estate") || rawIndustry.includes("property")) {
          return `We will introduce a pre-qualified commercial investor and prospective property buyer looking to engage with ${company}.`;
        }
        return `We will provide a verified, high-intent client referral with direct decision-maker contact details in the ${industry} sector to ${company}.`;

      case "business_opportunity":
        if (rawIndustry.includes("saas") || rawIndustry.includes("software") || rawIndustry.includes("tech")) {
          return `We will bring an active enterprise integration project and co-development contract for ${company} to build and deliver.`;
        }
        if (rawIndustry.includes("market") || rawIndustry.includes("agency") || rawIndustry.includes("design")) {
          return `We will allocate a client subcontracting contract and creative project deliverable for ${company} to execute in their domain.`;
        }
        if (rawIndustry.includes("distribut") || rawIndustry.includes("retail") || rawIndustry.includes("e-commerce")) {
          return `We will provide a dedicated product distribution and reseller channel to market ${company}'s catalog.`;
        }
        return `We will bring a commercial contract, project RFP, and client opportunity that ${company} is well-positioned to fulfill.`;

      case "partnership":
        if (rawIndustry.includes("saas") || rawIndustry.includes("tech")) {
          return `We propose an official API integration, joint product bundle, and co-selling initiative to cross-promote ${company} across our customer base.`;
        }
        return `We propose a strategic reciprocal referral partnership and co-marketing alliance to cross-promote ${company}'s offerings.`;

      case "service_work":
        return `We will provide dedicated specialized deliverables, technical execution, and operational support to accelerate ${company}'s pipeline.`;

      case "revenue_share":
        return `We propose sharing a 7% commission on the first collected contract invoice generated from this opportunity.`;

      case "fixed_amount":
        return `We propose a one-time commercial placement compensation of $1,500 upon successful execution of this opportunity.`;

      case "introduction":
        return `We will facilitate a warm introduction to a key industry partner, strategic investor, or distribution vendor in the ${industry} market.`;

      case "other":
      default:
        return `We propose mutually agreed commercial deliverables tailored specifically to support ${company}'s business growth in ${industry}.`;
    }
  };

  const parseDeclineDetails = (terms?: string | null) => {
    if (!terms || !terms.includes("[DECLINE REASON:")) return null;
    const match = terms.match(/\[DECLINE REASON:\s*([^\]]+)\](?:\s*Note:\s*([^|]+))?/);
    if (!match) return null;
    return {
      reason: match[1]?.trim(),
      note: match[2]?.trim(),
    };
  };

  const getCleanAdditionalTerms = (terms?: string | null) => {
    if (!terms) return null;
    if (!terms.includes("[DECLINE REASON:")) return terms;
    const parts = terms.split("| Original Terms:");
    if (parts.length > 1) {
      return parts[1]?.trim() || null;
    }
    return null;
  };

  const getDeclineReasonLabel = (reason?: string | null) => {
    switch (reason) {
      case "valuation_mismatch":
        return "Commercial terms / Valuation mismatch";
      case "exchange_type_unsuitable":
        return "Not looking for this exchange type right now";
      case "timeline_conflict":
        return "Timeline / Capacity conflict";
      case "scope_unclear":
        return "Exchange scope needs more clarity";
      case "other":
        return "Other commercial reason";
      default:
        return reason || "Terms not suitable";
    }
  };

  const getProposalActorLabel = (proposal: any) => {
    const isProposerMe = proposal.proposing_business_id === myBusinessId;
    const isReceiverMe = proposal.receiving_business_id === myBusinessId;
    const partnerRole = is_owner ? "Requester" : "Opportunity Owner";

    switch (proposal.status) {
      case "accepted":
        return isReceiverMe ? "Accepted by You" : `Accepted by ${partnerRole}`;
      case "declined":
        return isReceiverMe ? "Declined by You" : `Declined by ${partnerRole}`;
      case "superseded":
      case "countered":
        return isReceiverMe ? "Countered by You" : `Countered by ${partnerRole}`;
      case "cancelled":
        return isProposerMe ? "Withdrawn by You" : `Withdrawn by ${partnerRole}`;
      case "pending_response":
        return isReceiverMe ? "Awaiting Your Response" : `Awaiting ${partnerRole} Response`;
      default:
        return proposal.status?.replace("_", " ");
    }
  };

  const renderProposalTimelineContent = (showHeader = true) => {
    if (!proposals || proposals.length === 0) {
      return (
        <div className={showHeader ? "border border-slate-200 rounded-[4px] bg-white p-5 shadow-sm space-y-3" : "py-4 space-y-3"}>
          {showHeader && (
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-slate-400" />
              <h4 className="font-display font-bold text-sm text-slate-900">
                Proposal Timeline
              </h4>
            </div>
          )}
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            No exchange proposals have been submitted yet. Once an initial proposal is created, all versions and counter-offers will appear in this timeline.
          </p>
        </div>
      );
    }

    return (
      <div className={showHeader ? "border border-slate-200 rounded-[4px] bg-white p-4 sm:p-5 shadow-sm space-y-4" : "space-y-4"}>
        {showHeader && (
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h4 className="font-display font-bold text-sm text-slate-900">
                Proposal Timeline
              </h4>
            </div>
            <span className="font-mono text-[9px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-[2px]">
              {proposals.length} {proposals.length === 1 ? "Version" : "Versions"}
            </span>
          </div>
        )}

        <div className="relative pl-7 sm:pl-8 space-y-5 before:absolute before:left-3 sm:before:left-3.5 before:top-3.5 before:bottom-3.5 before:w-0.5 before:bg-slate-200">
          {proposals.map((p: any, idx: number) => {
            const isMe = p.proposing_business_id === myBusinessId;
            const isCurrent = idx === 0;
            const isDeclinedOrSuspended =
              p.status === "declined" ||
              p.status === "cancelled" ||
              p.status === "superseded" ||
              p.status === "suspended" ||
              p.status === "countered";
            return (
              <div key={p.id} className="relative group">
                {/* Timeline Node Badge */}
                <div
                  className={`absolute -left-7 sm:-left-8 top-1.5 w-6 sm:w-7 h-6 sm:h-7 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold z-10 transition-transform ${
                    isDeclinedOrSuspended
                      ? "bg-slate-200 border-slate-300 text-slate-400 shadow-none"
                      : isCurrent
                      ? "bg-slate-900 border-white text-white shadow-sm ring-2 ring-slate-900/15"
                      : p.status === "accepted"
                      ? "bg-emerald-600 border-white text-white shadow-xs"
                      : "bg-slate-100 border-slate-300 text-slate-600"
                  }`}
                >
                  v{p.version}
                </div>

                {/* Timeline Card */}
                <div
                  className={`rounded-[4px] border p-3.5 text-xs space-y-2.5 transition-all ${
                    isDeclinedOrSuspended
                      ? "bg-slate-100/70 border-slate-200/90 opacity-60 grayscale-[0.5]"
                      : isCurrent
                      ? "bg-white border-slate-300 shadow-sm ring-1 ring-slate-900/5"
                      : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200/60 pb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wider rounded-[2px] border ${
                          isDeclinedOrSuspended
                            ? "bg-slate-200/80 text-slate-600 border-slate-300/80"
                            : "bg-slate-100 text-slate-800 border-slate-200"
                        }`}
                      >
                        {isMe ? <Send className="w-2.5 h-2.5 text-blue-600" /> : <Building2 className="w-2.5 h-2.5 text-slate-600" />}
                        <span>{isMe ? "Proposed by You" : `Proposed by ${targetBusiness.company_name}`}</span>
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[8px] font-bold uppercase rounded-[2px]">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-mono text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-[2px] ${
                          isDeclinedOrSuspended
                            ? "bg-slate-200/90 text-slate-600 border border-slate-300"
                            : p.status === "accepted"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : p.status === "pending_response"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {getProposalActorLabel(p)}
                      </span>
                    </div>
                  </div>

                  {p.created_at && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      {new Date(p.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                      Offered Terms
                    </span>
                    <div className="font-semibold text-slate-900 text-xs">
                      {getExchangeTypeLabel(p.exchange_type)}
                      {p.revenue_percentage != null && ` (${p.revenue_percentage}% Revenue Share)`}
                      {p.fixed_amount != null && ` (${p.currency || "USD"} ${p.fixed_amount.toLocaleString()})`}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                      Exchange Details
                    </span>
                    <p className="text-slate-700 font-sans leading-relaxed text-xs">
                      {p.exchange_details}
                    </p>
                  </div>

                  {p.additional_terms && (
                    <div className="text-slate-600 text-[11px] bg-white border border-slate-200/80 p-2 rounded-[2px] space-y-1">
                      {getCleanAdditionalTerms(p.additional_terms) && (
                        <div>
                          <span className="font-mono text-[7.5px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                            Additional Terms
                          </span>
                          <p className="italic font-sans text-slate-700 text-[11px]">
                            &ldquo;{getCleanAdditionalTerms(p.additional_terms)}&rdquo;
                          </p>
                        </div>
                      )}
                      {parseDeclineDetails(p.additional_terms) && (
                        <div className="text-red-800 font-mono text-[9px] flex items-center gap-1 font-bold pt-1 border-t border-slate-100 mt-1">
                          <AlertCircle className="w-3 h-3 text-red-600 shrink-0" />
                          <span>
                            Decline Reason: {getDeclineReasonLabel(parseDeclineDetails(p.additional_terms)?.reason)}
                            {parseDeclineDetails(p.additional_terms)?.note ? ` ("${parseDeclineDetails(p.additional_terms)?.note}")` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {/* 2-Column Responsive Workspace Grid (60% Left / 40% Right on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Left Column (60% Width on Desktop: Stepper + Opportunity + Current Proposal & Workflow Steps) */}
        <div className="lg:col-span-3 space-y-5 sm:space-y-6">
          {/* 1. Mobile Stepper & History Top Bar (Single row on mobile: Stage Button + History Button) */}
          <div className="lg:hidden flex items-center justify-between gap-2.5">
            {/* Stage Pill Button */}
            <button
              type="button"
              onClick={() => setIsMobileStepperOpen(true)}
              className="flex-1 min-w-0 flex items-center justify-between gap-2 px-3 py-2.5 bg-white border border-slate-200/90 rounded-[4px] shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0 truncate">
                <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold truncate">
                  <span className="text-slate-400 font-medium mr-1">Stage:</span>
                  {currentStepName}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {/* Proposal Logs Button */}
            <button
              type="button"
              onClick={() => setIsMobileHistoryOpen(true)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-[4px] shadow-sm transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span>Proposal Logs</span>
              {proposals && proposals.length > 0 && (
                <span className="px-1.5 py-0.2 bg-slate-800 text-slate-200 text-[9px] font-bold rounded-[2px] border border-slate-700">
                  {proposals.length}
                </span>
              )}
            </button>
          </div>

          {/* 1b. Desktop Integrated Workflow Progress Tracker (Stepper) */}
          <div className="hidden lg:block bg-white border border-slate-200/80 rounded-[4px] px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between min-w-[340px] sm:min-w-0">
              {/* Step 1: Acknowledge */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isStep1Done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : currentStep === 1 ? (
                  <div className="w-4 h-4 rounded-full bg-orange-500 text-white font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                )}
                <span
                  className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                    currentStep === 1
                      ? "text-orange-600"
                      : isStep1Done
                      ? "text-emerald-900"
                      : "text-slate-400"
                  }`}
                >
                  Acknowledge
                </span>
              </div>

              {/* Connector 1 -> 2 */}
              <div
                className={`flex-1 mx-2 sm:mx-3 h-[1.5px] rounded-full transition-all ${
                  isStep1Done ? "bg-emerald-500" : currentStep > 1 ? "bg-orange-500" : "bg-slate-200"
                }`}
              />

              {/* Step 2: Negotiate */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isStep2Done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : currentStep === 2 ? (
                  <div className="w-4 h-4 rounded-full bg-orange-500 text-white font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                )}
                <span
                  className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                    currentStep === 2
                      ? "text-orange-600"
                      : isStep2Done
                      ? "text-emerald-900"
                      : "text-slate-400"
                  }`}
                >
                  Negotiate
                </span>
              </div>

              {/* Connector 2 -> 3 */}
              <div
                className={`flex-1 mx-2 sm:mx-3 h-[1.5px] rounded-full transition-all ${
                  isStep2Done ? "bg-emerald-500" : currentStep > 2 ? "bg-orange-500" : "bg-slate-200"
                }`}
              />

              {/* Step 3: Agreement */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isStep3Done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : currentStep === 3 ? (
                  <div className="w-4 h-4 rounded-full bg-orange-500 text-white font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                )}
                <span
                  className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                    currentStep === 3
                      ? "text-orange-600"
                      : isStep3Done
                      ? "text-emerald-900"
                      : "text-slate-400"
                  }`}
                >
                  Agreement
                </span>
              </div>

              {/* Connector 3 -> 4 */}
              <div
                className={`flex-1 mx-2 sm:mx-3 h-[1.5px] rounded-full transition-all ${
                  isStep3Done ? "bg-emerald-500" : currentStep > 3 ? "bg-orange-500" : "bg-slate-200"
                }`}
              />

              {/* Step 4: Handshake */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isStep4Done ? (
                  <Handshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : currentStep === 4 ? (
                  <div className="w-4 h-4 rounded-full bg-orange-500 text-white font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 font-mono text-[8.5px] font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                )}
                <span
                  className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
                    currentStep === 4 && !isStep4Done
                      ? "text-orange-600"
                      : isStep4Done
                      ? "text-emerald-900"
                      : "text-slate-400"
                  }`}
                >
                  Handshake
                </span>
              </div>
            </div>
          </div>

          {/* 2. Target Opportunity Card (Collapsible) */}
          <div className="bg-white border border-slate-200/80 rounded-[4px] shadow-sm overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setIsOpportunityOpen(!isOpportunityOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {is_owner ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Opportunity You Posted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    Opportunity Posted by {targetBusiness.company_name}
                  </span>
                )}
                <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                  Listing #{opportunity.opportunity_number || "REF"}
                </span>
              </div>
              <h3
                className={`font-display font-bold text-sm sm:text-base text-slate-900 transition-all ${
                  isOpportunityOpen ? "whitespace-normal break-words" : "truncate"
                }`}
              >
                {opportunity.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block text-right">
                <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400 font-bold block">
                  Category & Industry
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {opportunity.category} · {opportunity.industry}
                </span>
              </div>
              <div className="p-1 rounded-full bg-slate-100/80 text-slate-600">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    isOpportunityOpen ? "rotate-180 text-slate-900" : "text-slate-500"
                  }`}
                />
              </div>
            </div>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpportunityOpen
                ? "grid-rows-[1fr] opacity-100 border-t border-slate-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-3 space-y-4">
                {/* Contextual Owner/Requester Notice Banner */}
                <div
                  className={`p-3 rounded-[3px] border text-xs font-sans flex items-start gap-2.5 ${
                    is_owner
                      ? "bg-blue-50/60 border-blue-200/80 text-blue-950"
                      : "bg-slate-50 border-slate-200/80 text-slate-800"
                  }`}
                >
                  <Info
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      is_owner ? "text-blue-600" : "text-slate-500"
                    }`}
                  />
                  <div>
                    {is_owner ? (
                      <p>
                        <strong className="font-semibold text-blue-900">Your Opportunity:</strong> You created and posted this listing.{" "}
                        <span className="font-medium text-blue-950">{targetBusiness.company_name}</span> has requested to negotiate an exchange with you based on these terms.
                      </p>
                    ) : (
                      <p>
                        <strong className="font-semibold text-slate-900">Partner's Opportunity:</strong> This listing was posted by{" "}
                        <span className="font-medium text-slate-950">{targetBusiness.company_name}</span>. You requested to exchange value with them for this opportunity.
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile Category & Industry */}
                <div className="sm:hidden flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400 font-bold">
                    Category & Industry
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {opportunity.category} · {opportunity.industry}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                    Description & Overview
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                    {opportunity.description}
                  </p>
                </div>

                {/* Offer Details if present */}
                {opportunity.offer_text && (
                  <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-[3px] space-y-1">
                    <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-500 font-bold block">
                      Opportunity Specifics / Offer
                    </span>
                    <p className="text-xs text-slate-700 font-sans leading-relaxed">
                      {opportunity.offer_text}
                    </p>
                  </div>
                )}

                {/* Metadata Pills */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[10.5px] text-slate-500 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded-[2px] font-semibold ${
                      is_owner
                        ? "bg-blue-100/70 text-blue-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Posted by: {is_owner ? "You" : targetBusiness.company_name}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-[2px]">
                    Category: {opportunity.category}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-[2px]">
                    Industry: {opportunity.industry}
                  </span>
                  {opportunity.location && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-[2px]">
                      Location: {opportunity.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* B. Current Status / Awaiting Partner Card */}
        {myAcknowledged && !otherAcknowledged && interest.status === "pending" && (
          <div className="bg-amber-50/70 border border-amber-300/80 rounded-[4px] p-5 sm:p-6 shadow-sm space-y-4 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 text-amber-800 rounded-[3px] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-200/60 text-amber-900 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                      <Lock className="w-3 h-3" /> AWAITING PARTNER
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-amber-950">
                    Waiting for {targetBusiness.company_name}
                  </h4>
                  <p className="text-xs text-amber-800/90 font-sans leading-relaxed">
                    You’ve acknowledged the Relay exchange process. Exchange proposals and negotiation will unlock once {targetBusiness.company_name} acknowledges it too.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-xs font-medium text-amber-950">
                    <span>⏱ They have 7 days to respond. If they don’t, we’ll suggest another relevant opportunity.</span>
                  </div>
                </div>
              </div>

              {/* Follow-Up Action */}
              {is_requester && (
                <div className="shrink-0 flex flex-col sm:items-end gap-1 pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={handleFollowUp}
                    disabled={!data?.can_follow_up || Boolean(interest.last_follow_up_at || data?.has_followed_up) || loadingAction === "follow-up"}
                    className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-wider rounded-[3px] transition-colors ${
                      Boolean(interest.last_follow_up_at || data?.has_followed_up)
                        ? "bg-amber-100 text-amber-800 cursor-not-allowed border border-amber-200"
                        : data?.can_follow_up
                        ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer shadow-sm"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/80"
                    }`}
                  >
                    {Boolean(interest.last_follow_up_at || data?.has_followed_up) ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Follow-Up Sent
                      </>
                    ) : loadingAction === "follow-up" ? (
                      "Sending..."
                    ) : data?.can_follow_up ? (
                      <>
                        <Send className="w-3.5 h-3.5" /> Follow Up
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" /> Follow Up (Available after 2 hours)
                      </>
                    )}
                  </button>
                  {!data?.can_follow_up && !Boolean(interest.last_follow_up_at || data?.has_followed_up) && (
                    <span className="text-[10px] text-amber-800/75 font-mono">
                      Available after 2 hours
                    </span>
                  )}
                  {Boolean(interest.last_follow_up_at || data?.has_followed_up) && (
                    <span className="text-[10px] text-amber-800/75 font-mono">
                      Reminder sent to partner
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Reliability policy expandable element */}
            <div className="border-t border-amber-200/60 pt-3">
              <button
                type="button"
                onClick={() => setShowReliabilityInfo(!showReliabilityInfo)}
                className="text-xs font-semibold text-amber-950 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>What happens if they don’t respond?</span>
                <span className="font-mono text-xs">{showReliabilityInfo ? "↓" : "→"}</span>
              </button>

              {showReliabilityInfo && (
                <div className="mt-3 p-4 bg-white/90 border border-amber-200 rounded-[3px] space-y-2.5 text-xs text-slate-700 font-sans leading-relaxed">
                  <p>
                    Relay gives the other business 7 days to respond to your Interest.
                  </p>
                  <div className="space-y-1 py-0.5">
                    <p className="font-semibold text-slate-800">If they don’t respond within 7 days:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      <li>We’ll mark the Interest as <strong>Unresponsive</strong>.</li>
                      <li>We’ll suggest another relevant opportunity so you don’t have to keep waiting.</li>
                      <li>The business will receive 1 <strong>Response Violation</strong>.</li>
                    </ul>
                  </div>
                  <p className="text-slate-600">
                    Businesses can Decline or Withdraw an Interest at any time. These actions do not count as a Response Violation.
                  </p>
                  <p className="text-slate-600">
                    If a business receives 3 Response Violations, its participation in Relay activities will be restricted and reviewed by Relay.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {/* 3. STEP 1: Process Acknowledgement Modal Popup (Blocking until 'I Understand' is confirmed) */}
      <Dialog open={!myAcknowledged} onOpenChange={() => {}}>
        <DialogContent
          className="w-[calc(100vw-1.5rem)] sm:w-full sm:max-w-lg p-4 sm:p-6 bg-white border border-slate-200 shadow-2xl rounded-lg font-sans max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="space-y-1.5 border-b border-slate-100 pb-3 sm:pb-4 text-left">
            <div className="flex items-start gap-2.5 sm:gap-3 text-slate-900">
              <div className="p-2 sm:p-2.5 bg-blue-50 text-blue-700 rounded-md shrink-0 mt-0.5">
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                  Mandatory Process Review
                </span>
                <DialogTitle className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                  How Relay Exchange Works
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed font-sans pt-1">
              Before discussing or proposing exchange terms on The Relay, all verified businesses must acknowledge how the exchange workflow operates.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-1.5 sm:py-2">
            <div className="p-3 sm:p-3.5 bg-slate-50 border border-slate-100 rounded-md text-[11px] sm:text-xs space-y-2.5 text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 text-slate-800 text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <p className="leading-relaxed">
                  <strong>Structured Negotiation:</strong> Discuss what will be exchanged (Revenue Share %, Business Opportunity, Qualified Lead, or Fixed Amount) with immutable version history.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 text-slate-800 text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <p className="leading-relaxed">
                  <strong>Two-Sided Agreement:</strong> Both businesses must explicitly confirm the same final proposal terms before contact details can be shared.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 text-slate-800 text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <p className="leading-relaxed">
                  <strong>Consent-Based Contact Sharing:</strong> You independently choose which contact details to share. Only mutually approved fields are revealed.
                </p>
              </div>
            </div>

            {/* Core Principle Disclosure */}
            <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 sm:p-3 rounded-md text-[10.5px] sm:text-[11px] text-amber-900 leading-relaxed font-sans flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Core Principle:</strong> Relay facilitates the connection — the businesses decide what they exchange and how they execute it. Relay does not guarantee commercial outcomes, payment, revenue, or conversion.
              </div>
            </div>
          </div>

          <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleAcknowledge}
              disabled={loadingAction === "acknowledge"}
              className="w-full bg-slate-900 hover:bg-primary text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-[3px] shadow-sm cursor-pointer transition-colors"
            >
              {loadingAction === "acknowledge" ? "Recording..." : "I Understand"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unresponsive Status Card & Suggested Opportunities */}
      {interest.status === "unresponsive" && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-[4px] p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-slate-200 text-slate-700 rounded-[3px] shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 bg-slate-200 text-slate-700 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                  Unresponsive
                </span>
                <h4 className="font-display font-bold text-base text-slate-900">
                  {targetBusiness.company_name} remained unresponsive
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  The 7-day response window expired without acknowledgement. This Interest has been marked as Unresponsive and 1 Response Violation has been recorded for the business.
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Alternative Opportunities */}
          {data.suggested_opportunities && data.suggested_opportunities.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-[4px] p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                  Relevant Alternatives
                </span>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Suggested Opportunities For You
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.suggested_opportunities.map((sug: any) => (
                  <a
                    key={sug.id}
                    href={`/opportunities/${sug.id}`}
                    className="block p-4 border border-slate-200/80 hover:border-slate-400 rounded-[3px] bg-slate-50/50 hover:bg-white transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        {sug.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        #{sug.opportunity_number || "RY"}
                      </span>
                    </div>
                    <h5 className="font-display font-bold text-sm text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                      {sug.title}
                    </h5>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {sug.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{sug.business?.company_name || "Verified Business"}</span>
                      <span className="text-primary font-mono text-[10px] font-bold group-hover:translate-x-0.5 transition-transform">
                        View Opportunity →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. STEP 2: Exchange Proposal & Versioned Negotiation */}
      {bothAcknowledged && !isAgreed && (
        <div className="space-y-6">
          {/* Active Proposal Card (if exists) */}
          {activeProposal && (
            <div className="bg-white border border-slate-200/80 rounded-[4px] p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] bg-slate-900 text-white">
                      {activeProposal.proposing_business_id === myBusinessId ? (
                        <>
                          <Send className="w-3 h-3" />
                          <span>Submitted by You</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="w-3 h-3" />
                          <span>From {targetBusiness.company_name}</span>
                        </>
                      )}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-mono text-[9px] font-bold uppercase rounded-[2px]">
                      Proposal v{activeProposal.version}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${
                        activeProposal.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : activeProposal.status === "pending_response"
                          ? activeProposal.proposing_business_id === myBusinessId
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                          : activeProposal.status === "declined"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : activeProposal.status === "cancelled"
                          ? "bg-slate-100 text-slate-500 border border-slate-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {getProposalActorLabel(activeProposal)}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    {activeProposal.receiving_business_id === myBusinessId
                      ? activeProposal.version > 1
                        ? "Counter-Proposal Received"
                        : "Exchange Proposal Received"
                      : activeProposal.version > 1
                      ? "Your Counter-Proposal"
                      : "Your Exchange Proposal"}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {activeProposal.status === "declined"
                      ? activeProposal.receiving_business_id === myBusinessId
                        ? "You declined this exchange proposal."
                        : `${targetBusiness.company_name} declined this exchange proposal. You can submit a revised counter-proposal.`
                      : activeProposal.receiving_business_id === myBusinessId
                      ? `${activeProposal.proposing_business?.company_name || targetBusiness.company_name} has proposed the following exchange for this opportunity.`
                      : `You proposed the following exchange terms. Waiting for ${targetBusiness.company_name} to review.`}
                  </p>
                </div>

                {activeProposal.created_at && (
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                      Submitted
                    </span>
                    <span className="text-xs text-slate-600 font-mono">
                      {new Date(activeProposal.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Proposal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-[3px] bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    What is offered in exchange
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {getExchangeTypeLabel(activeProposal.exchange_type)}
                  </span>
                  {activeProposal.revenue_percentage != null && (
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      {activeProposal.revenue_percentage}% Revenue Share
                    </div>
                  )}
                  {activeProposal.fixed_amount != null && (
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      {activeProposal.currency || "USD"} {activeProposal.fixed_amount.toLocaleString()}
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Exchange Details
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {activeProposal.exchange_details}
                  </p>
                </div>

                {getCleanAdditionalTerms(activeProposal.additional_terms) && (
                  <div className="md:col-span-2 border-t border-slate-200/60 pt-2.5 mt-1">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      Additional Terms / Conditions
                    </span>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      &ldquo;{getCleanAdditionalTerms(activeProposal.additional_terms)}&rdquo;
                    </p>
                  </div>
                )}

                {/* Structured Decline Reason Banner */}
                {activeProposal.status === "declined" && (
                  <div className="md:col-span-2 bg-red-50/80 border border-red-200 rounded-[3px] p-3 space-y-1 mt-1">
                    <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase font-bold text-red-900">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>
                        Decline Reason: {getDeclineReasonLabel(parseDeclineDetails(activeProposal.additional_terms)?.reason)}
                      </span>
                    </div>
                    {parseDeclineDetails(activeProposal.additional_terms)?.note && (
                      <p className="text-xs text-red-800 font-sans italic pl-5">
                        &ldquo;{parseDeclineDetails(activeProposal.additional_terms)?.note}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons for Pending Proposal */}
              {activeProposal.status === "pending_response" && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                  {activeProposal.receiving_business_id === myBusinessId ? (
                    <>
                      <Button
                        onClick={() => handleRespondProposal(activeProposal.id, "accept")}
                        disabled={Boolean(loadingAction)}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px]"
                      >
                        {loadingAction === "respond-accept" ? "Accepting..." : "Accept Proposal"}
                      </Button>
                      <Button
                        onClick={() => setShowProposalForm(true)}
                        disabled={Boolean(loadingAction)}
                        variant="outline"
                        className="w-full sm:w-auto font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px]"
                      >
                        Counter Proposal
                      </Button>
                      <Button
                        onClick={() => setShowDeclineModal(true)}
                        disabled={Boolean(loadingAction)}
                        variant="ghost"
                        className="w-full sm:w-auto text-red-600 hover:bg-red-50 font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-[2px]"
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-slate-500 font-medium">
                        Waiting for <strong className="text-slate-800">{targetBusiness.company_name}</strong> to review and respond to this proposal.
                      </div>
                      <Button
                        onClick={() => handleWithdrawProposal(activeProposal.id)}
                        disabled={loadingAction === "withdraw-proposal"}
                        variant="outline"
                        size="sm"
                        className="font-mono text-[10px] uppercase tracking-wider text-slate-600 hover:text-red-600 hover:border-red-300"
                      >
                        <Undo className="w-3.5 h-3.5 mr-1.5" />
                        {loadingAction === "withdraw-proposal" ? "Withdrawing..." : "Withdraw Proposal"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Action When Proposal is Declined */}
              {activeProposal.status === "declined" && activeProposal.proposing_business_id === myBusinessId && (
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-sans">
                    This proposal was declined. You can submit revised terms to resume negotiation.
                  </span>
                  <Button
                    onClick={() => setShowProposalForm(true)}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-5 rounded-[2px] cursor-pointer"
                  >
                    Propose Revised Terms
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Decline Proposal Dialog Modal */}
          {activeProposal && (
            <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
              <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md bg-white border border-slate-200 rounded-[4px] p-6 shadow-2xl space-y-4">
                <DialogHeader className="space-y-1 pb-3 border-b border-slate-100 text-left">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] border border-red-200">
                      Decline Proposal
                    </span>
                  </div>
                  <DialogTitle className="font-display font-bold text-base sm:text-lg text-slate-900">
                    Decline Exchange Proposal
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500 font-sans">
                    Select a structured commercial reason to help {targetBusiness.company_name} understand why these terms were declined.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1.5">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Reason for Declining
                    </Label>
                    <Select
                      value={declineReason}
                      onValueChange={(val) => setDeclineReason(val as DeclineReason)}
                    >
                      <SelectTrigger className="w-full bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus:ring-1 focus:ring-slate-900">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200">
                        <SelectItem value="valuation_mismatch">Commercial terms / Valuation mismatch</SelectItem>
                        <SelectItem value="exchange_type_unsuitable">Not looking for this exchange type right now</SelectItem>
                        <SelectItem value="timeline_conflict">Timeline / Capacity conflict</SelectItem>
                        <SelectItem value="scope_unclear">Exchange scope needs more clarity</SelectItem>
                        <SelectItem value="other">Other commercial reason</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Optional Note (Commercial Context Only)
                    </Label>
                    <Textarea
                      rows={2}
                      value={declineNote}
                      onChange={(e) => setDeclineNote(e.target.value)}
                      placeholder="e.g. Prefer revenue share or a revised timeline..."
                      className="bg-white border border-slate-300 rounded-[2px] px-3 py-2 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <Button
                    type="button"
                    onClick={() => setShowDeclineModal(false)}
                    variant="outline"
                    className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-mono text-[10px] uppercase tracking-wider font-bold py-2 px-4 rounded-[2px] cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      activeProposal &&
                      handleRespondProposal(activeProposal.id, "decline", declineReason, declineNote)
                    }
                    disabled={loadingAction === "respond-decline"}
                    className="bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2 px-5 rounded-[2px] cursor-pointer"
                  >
                    {loadingAction === "respond-decline" ? "Declining..." : "Confirm Decline"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Opportunity Owner Awaiting First Proposal (When no proposal has been submitted yet) */}
          {!activeProposal && is_owner && (
            <div className="bg-amber-50/90 border border-amber-300 rounded-[4px] p-5 sm:p-6 shadow-sm space-y-4 animate-pulse">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-100 text-amber-900 rounded-[3px] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-amber-800" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-200/80 text-amber-900 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] border border-amber-300/80">
                      Awaiting Exchange Proposal
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-amber-950">
                    Waiting for {targetBusiness.company_name} to propose an exchange
                  </h4>
                  <p className="text-xs text-amber-900/90 font-sans leading-relaxed">
                    You have provided the opportunity listing. {targetBusiness.company_name} will propose what they can offer in exchange for your review. Once submitted, you can Accept, Decline, or Counter-Propose.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Initial Proposal Form for Requester (Inline on page) */}
          {!activeProposal && is_requester && (
            <div className="bg-white border-2 border-slate-900 rounded-[4px] p-6 shadow-md space-y-5">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Propose Your Exchange
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  You’re interested in this opportunity. Tell the business what you can offer in exchange.
                </p>
              </div>

              <form onSubmit={handleCreateProposal} className="space-y-4">
                {/* Opportunity Poster Profile & Field */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-[4px] p-2.5 sm:p-3 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-display font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {targetBusiness.company_name}
                      </span>
                      {targetBusiness.hq_location && (
                        <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">
                          · {targetBusiness.hq_location}
                        </span>
                      )}
                    </div>
                    {targetBusiness.industry && (
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono font-bold uppercase rounded-[2px] border border-blue-200/60 shrink-0">
                        {targetBusiness.industry}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600 font-sans leading-relaxed pt-1.5 border-t border-slate-200/60">
                    <div className="flex items-start gap-1.5 min-w-0 flex-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-800 font-semibold">Suggestion:</strong> {getDynamicSuggestionTip(exchangeType)}
                      </span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setExchangeDetails(getAutofillExchangeDetails(exchangeType));
                        if (exchangeType === "revenue_share" && !revenuePercentage) {
                          setRevenuePercentage("7");
                        }
                        if (exchangeType === "fixed_amount" && !fixedAmount) {
                          setFixedAmount("1500");
                        }
                        toast.success("Exchange details auto-filled", {
                          description: "You can customize or edit the text before sending.",
                        });
                      }}
                      className="shrink-0 h-6 px-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] cursor-pointer"
                    >
                      Auto-fill
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                    What can you offer in exchange?
                  </Label>
                  <Select
                    value={exchangeType}
                    onValueChange={(val) => setExchangeType(val as ExchangeType)}
                  >
                    <SelectTrigger className="w-full bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus:ring-1 focus:ring-slate-900">
                      <SelectValue placeholder="Select what you can offer in exchange" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200">
                      <SelectItem value="fixed_amount">Money / Fixed Amount</SelectItem>
                      <SelectItem value="revenue_share">Revenue Share / Percentage</SelectItem>
                      <SelectItem value="qualified_lead">Qualified Lead / Referral</SelectItem>
                      <SelectItem value="business_opportunity">Business Opportunity</SelectItem>
                      <SelectItem value="service_work">Service / Work</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="introduction">Introduction / Connection</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {exchangeType === "revenue_share" && (
                  <div className="space-y-1.5">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Revenue Percentage (%)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="100"
                      value={revenuePercentage}
                      onChange={(e) => setRevenuePercentage(e.target.value)}
                      placeholder="e.g. 7"
                      className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                    />
                  </div>
                )}

                {exchangeType === "fixed_amount" && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1.5">
                      <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        Amount
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        value={fixedAmount}
                        onChange={(e) => setFixedAmount(e.target.value)}
                        placeholder="e.g. 1500"
                        className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        Currency
                      </Label>
                      <Input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="USD"
                        className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans uppercase shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Exchange Details
                    </Label>
                    <button
                      type="button"
                      onClick={() => {
                        setExchangeDetails(getAutofillExchangeDetails(exchangeType));
                        if (exchangeType === "revenue_share" && !revenuePercentage) {
                          setRevenuePercentage("7");
                        }
                        if (exchangeType === "fixed_amount" && !fixedAmount) {
                          setFixedAmount("1500");
                        }
                        toast.success("Exchange details auto-filled", {
                          description: "You can customize or edit the text before sending.",
                        });
                      }}
                      className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      Auto-fill
                    </button>
                  </div>
                  <Textarea
                    rows={3}
                    value={exchangeDetails}
                    onChange={(e) => setExchangeDetails(e.target.value)}
                    placeholder="Describe exactly what you can provide in exchange..."
                    className="bg-white border border-slate-300 rounded-[2px] px-3 py-2 text-xs text-slate-900 font-sans leading-relaxed min-h-[75px] shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                    Additional Terms / Conditions (Optional)
                  </Label>
                  <Input
                    type="text"
                    value={additionalTerms}
                    onChange={(e) => setAdditionalTerms(e.target.value)}
                    placeholder="Add any conditions or important details..."
                    className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                  />
                  <p className="text-[10px] text-slate-400 font-sans">
                    For commercial terms and contractual conditions only. General messaging is disabled to maintain structured negotiations.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={loadingAction === "proposal" || !exchangeDetails.trim()}
                    className="bg-slate-900 hover:bg-primary text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px] cursor-pointer"
                  >
                    {loadingAction === "proposal" ? "Submitting..." : "Send Proposal"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Counter-Proposal Modal (Large on Desktop) */}
          {activeProposal && (
            <Dialog open={showProposalForm} onOpenChange={setShowProposalForm}>
              <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-[4px] p-6 shadow-2xl space-y-4">
                <DialogHeader className="space-y-1 pb-3 border-b border-slate-100 text-left">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                      Counter-Proposal
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      v{activeProposal.version + 1}
                    </span>
                  </div>
                  <DialogTitle className="font-display font-bold text-lg sm:text-xl text-slate-900">
                    Submit Counter-Proposal
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500 font-sans">
                    Propose revised exchange terms to {targetBusiness.company_name}. Every counter-proposal creates a new immutable version in the negotiation history.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateProposal} className="space-y-4 pt-1">
                  {/* Target Business Profile & Suggestion Header */}
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-[4px] p-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="font-display font-bold text-sm text-slate-900 truncate">
                          {targetBusiness.company_name}
                        </span>
                        {targetBusiness.hq_location && (
                          <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">
                            · {targetBusiness.hq_location}
                          </span>
                        )}
                      </div>
                      {targetBusiness.industry && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 text-[9.5px] font-mono font-bold uppercase rounded-[2px] border border-blue-200/60 shrink-0">
                          {targetBusiness.industry}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-sans leading-relaxed pt-2 border-t border-slate-200/60">
                      <div className="flex items-start gap-1.5 min-w-0 flex-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800 font-semibold">Suggestion:</strong> {getDynamicSuggestionTip(exchangeType)}
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          setExchangeDetails(getAutofillExchangeDetails(exchangeType));
                          if (exchangeType === "revenue_share" && !revenuePercentage) {
                            setRevenuePercentage("7");
                          }
                          if (exchangeType === "fixed_amount" && !fixedAmount) {
                            setFixedAmount("1500");
                          }
                          toast.success("Exchange details auto-filled", {
                            description: "You can customize or edit the text before sending.",
                          });
                        }}
                        className="shrink-0 h-6 px-3 bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] cursor-pointer"
                      >
                        Auto-fill
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      What can you offer in exchange?
                    </Label>
                    <Select
                      value={exchangeType}
                      onValueChange={(val) => setExchangeType(val as ExchangeType)}
                    >
                      <SelectTrigger className="w-full bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus:ring-1 focus:ring-slate-900">
                        <SelectValue placeholder="Select what you can offer in exchange" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200">
                        <SelectItem value="fixed_amount">Money / Fixed Amount</SelectItem>
                        <SelectItem value="revenue_share">Revenue Share / Percentage</SelectItem>
                        <SelectItem value="qualified_lead">Qualified Lead / Referral</SelectItem>
                        <SelectItem value="business_opportunity">Business Opportunity</SelectItem>
                        <SelectItem value="service_work">Service / Work</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="introduction">Introduction / Connection</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {exchangeType === "revenue_share" && (
                    <div className="space-y-1.5">
                      <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        Revenue Percentage (%)
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100"
                        value={revenuePercentage}
                        onChange={(e) => setRevenuePercentage(e.target.value)}
                        placeholder="e.g. 7"
                        className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                      />
                    </div>
                  )}

                  {exchangeType === "fixed_amount" && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 space-y-1.5">
                        <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                          Amount
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          value={fixedAmount}
                          onChange={(e) => setFixedAmount(e.target.value)}
                          placeholder="e.g. 1500"
                          className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                          Currency
                        </Label>
                        <Input
                          type="text"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          placeholder="USD"
                          className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans uppercase shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                        Exchange Details
                      </Label>
                      <button
                        type="button"
                        onClick={() => {
                          setExchangeDetails(getAutofillExchangeDetails(exchangeType));
                          if (exchangeType === "revenue_share" && !revenuePercentage) {
                            setRevenuePercentage("7");
                          }
                          if (exchangeType === "fixed_amount" && !fixedAmount) {
                            setFixedAmount("1500");
                          }
                          toast.success("Exchange details auto-filled", {
                            description: "You can customize or edit the text before sending.",
                          });
                        }}
                        className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 cursor-pointer"
                      >
                        Auto-fill
                      </button>
                    </div>
                    <Textarea
                      rows={4}
                      value={exchangeDetails}
                      onChange={(e) => setExchangeDetails(e.target.value)}
                      placeholder="Describe exactly what you can provide in exchange..."
                      className="bg-white border border-slate-300 rounded-[2px] px-3 py-2 text-xs text-slate-900 font-sans leading-relaxed min-h-[90px] shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Additional Terms / Conditions (Optional)
                    </Label>
                    <Input
                      type="text"
                      value={additionalTerms}
                      onChange={(e) => setAdditionalTerms(e.target.value)}
                      placeholder="Add any conditions or important details..."
                      className="bg-white border border-slate-300 rounded-[2px] h-9 px-3 text-xs text-slate-900 font-sans shadow-none focus-visible:ring-1 focus-visible:ring-slate-900"
                    />
                    <p className="text-[10px] text-slate-400 font-sans">
                      For commercial terms and contractual conditions only. General messaging is disabled to maintain structured negotiations.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                    <Button
                      type="button"
                      onClick={() => setShowProposalForm(false)}
                      variant="outline"
                      className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-mono text-[10px] uppercase tracking-wider font-bold py-2.5 px-5 rounded-[2px] cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loadingAction === "proposal" || !exchangeDetails.trim()}
                      className="bg-slate-900 hover:bg-primary text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px] cursor-pointer"
                    >
                      {loadingAction === "proposal" ? "Submitting..." : "Send Counter-Proposal"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}

      {/* 5. STEP 3: Final Exchange Terms Confirmation */}
      {isAgreementDraft && agreement && (
        <div className="bg-white border-2 border-emerald-500/80 rounded-[4px] p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-[3px]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-slate-900">
                Final Exchange Terms
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Review the exact negotiated exchange terms before confirming. Both parties must independently confirm before the agreement activates.
              </p>
            </div>
          </div>

          {/* Agreed Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-[3px] space-y-4">
            {/* Opportunity Section */}
            <div className="space-y-1 pb-3 border-b border-slate-200/60">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                Opportunity
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display font-bold text-sm text-slate-900">
                  {opportunity.title}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {opportunity.category} · {opportunity.industry}
                </span>
              </div>
            </div>

            {/* Structured Dual Terms Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-white border border-slate-200/70 rounded-[3px] space-y-1.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-blue-600 font-bold block">
                  Opportunity Owner Provides
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  Access to opportunity: <strong className="font-semibold text-slate-900">{opportunity.title}</strong>
                  {opportunity.offer_text && (
                    <span className="block text-slate-600 mt-1">{opportunity.offer_text}</span>
                  )}
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200/70 rounded-[3px] space-y-1.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-emerald-600 font-bold block">
                  Interested Business Provides
                </span>
                <div className="text-xs text-slate-800 font-sans leading-relaxed space-y-1">
                  <div className="font-bold text-slate-900">
                    {getExchangeTypeLabel(agreement.exchange_type)}
                    {agreement.revenue_percentage != null && ` — ${agreement.revenue_percentage}% Revenue Share`}
                    {agreement.fixed_amount != null && ` — ${agreement.currency || "USD"} ${agreement.fixed_amount.toLocaleString()}`}
                  </div>
                  <p className="text-slate-700">{agreement.exchange_details}</p>
                </div>
              </div>
            </div>

            {/* Additional Terms / Conditions */}
            <div className="border-t border-slate-200/60 pt-3 text-xs">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Additional Terms / Conditions
              </span>
              <p className="text-slate-800 leading-relaxed font-sans">
                {agreement.additional_terms ? (
                  <span className="italic">&ldquo;{agreement.additional_terms}&rdquo;</span>
                ) : (
                  <span className="text-slate-400 italic">None specified</span>
                )}
              </p>
            </div>
          </div>

          {/* Legal Disclosure Banner */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-[3px] text-[11.5px] text-amber-900 leading-relaxed font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Disclosure:</strong> Both businesses independently agree to the exchange terms. Relay facilitates the connection and records the agreed terms but does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either business.
            </div>
          </div>

          {/* Status & Confirmation CTA */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-[3px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs space-y-1">
              <div className="font-semibold text-slate-800">
                {myConfirmed ? (
                  <span className="text-emerald-700 inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> You have confirmed these terms
                  </span>
                ) : (
                  <span className="text-amber-700 inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Waiting for your confirmation
                  </span>
                )}
              </div>
              <div className="text-slate-500">
                {otherConfirmed ? (
                  <span className="text-emerald-700 inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> {targetBusiness.company_name} has confirmed
                  </span>
                ) : (
                  <span>Waiting for {targetBusiness.company_name} to confirm</span>
                )}
              </div>
            </div>

            {!myConfirmed && (
              <Button
                onClick={handleConfirmAgreement}
                disabled={loadingAction === "confirm"}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px] cursor-pointer"
              >
                {loadingAction === "confirm" ? "Confirming..." : "I Agree to These Exchange Terms"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 6. STEP 4: Mutual Contact Sharing Consent */}
      {isAgreed && !isHandshakeComplete && (
        <div className="bg-white border-2 border-blue-200 rounded-[4px] p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-[3px]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-slate-900">
                Two-Sided Contact Sharing Consent
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Choose which contact channels you wish to share with {targetBusiness.company_name}. Each business independently consents to reveal specific fields.
              </p>
            </div>
          </div>

          {/* Pending Incoming Consents to Accept */}
          {pendingIncomingConsents.length > 0 && (
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-[3px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">
                  {targetBusiness.company_name} wants to share the following contact details with you:
                </span>
                <span className="font-mono text-[9px] font-bold uppercase text-emerald-700">
                  {pendingIncomingConsents.length} Available
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pendingIncomingConsents.map((c: any) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-[2px]"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {c.contact_field.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="pt-1 flex justify-end">
                <Button
                  onClick={() =>
                    handleAcceptIncomingContacts(
                      pendingIncomingConsents.map((c: any) => c.contact_field)
                    )
                  }
                  disabled={loadingAction === "accept-contacts"}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2 px-5 rounded-[2px]"
                >
                  {loadingAction === "accept-contacts" ? "Accepting..." : "Accept Contact Details"}
                </Button>
              </div>
            </div>
          )}

          {/* Outgoing Sharing Form */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
              Choose What You Want to Share
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { field: "email" as ContactField, label: "Business Email", icon: Mail },
                { field: "linkedin" as ContactField, label: "LinkedIn Profile", icon: Linkedin },
                { field: "twitter" as ContactField, label: "Twitter / X Profile", icon: Twitter },
              ].map(({ field, label, icon: Icon }) => {
                const isChecked = selectedContacts.includes(field);
                return (
                  <label
                    key={field}
                    className={`flex items-center gap-3 p-3.5 rounded-[3px] border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContacts([...selectedContacts, field]);
                        } else {
                          setSelectedContacts(selectedContacts.filter((f) => f !== field));
                        }
                      }}
                      className="sr-only"
                    />
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold">{label}</span>
                  </label>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleShareContacts}
                disabled={loadingAction === "share-contacts" || selectedContacts.length === 0}
                className="bg-slate-900 hover:bg-primary text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px]"
              >
                {loadingAction === "share-contacts" ? "Saving..." : "Share Selected Contact Details"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. STEP 5: Handshake Complete */}
      {isHandshakeComplete && (
        <div className="bg-white border-2 border-emerald-500 rounded-[4px] p-6 sm:p-8 shadow-md space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 shadow-inner">
                <Handshake className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded-[2px] mb-1">
                  <CheckCircle2 className="w-3 h-3" /> Handshake Complete
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  Direct Connection Established
                </h3>
              </div>
            </div>

            {is_legacy_handshake && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-[2px] font-semibold">
                Legacy Handshake Record
              </span>
            )}
          </div>

          {/* Agreed Terms Summary */}
          {agreement && (
            <div className="bg-emerald-50/50 border border-emerald-200/80 p-4 rounded-[3px] space-y-2 text-xs">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-emerald-800 font-bold block">
                Agreed Exchange Terms
              </span>
              <p className="font-bold text-slate-900">
                {getExchangeTypeLabel(agreement.exchange_type)}
                {agreement.revenue_percentage != null && ` · ${agreement.revenue_percentage}% Revenue Share`}
                {agreement.fixed_amount != null && ` · ${agreement.currency} ${agreement.fixed_amount.toLocaleString()}`}
              </p>
              <p className="text-slate-700 leading-relaxed font-sans">
                {agreement.exchange_details}
              </p>
            </div>
          )}

          {/* Revealed Authorized Contacts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Verified Contact Details for {targetBusiness.company_name}
              </span>
              <span className="font-mono text-[8.5px] text-emerald-700 font-bold uppercase">
                Mutually Approved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Email */}
              {allowed_revealed_contacts.email ? (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-[3px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                        Business Email
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {allowed_revealed_contacts.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      onClick={() => copyToClipboard(allowed_revealed_contacts.email!, "Email")}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5"
                    >
                      {copiedField === "Email" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </Button>
                    <a
                      href={`mailto:${allowed_revealed_contacts.email}?subject=${encodeURIComponent(
                        `The Relay Handshake: ${opportunity.title}`
                      )}`}
                      className="inline-flex items-center justify-center h-8 px-3 bg-slate-900 hover:bg-primary text-white text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px]"
                    >
                      Email Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50/50 border border-slate-200/60 p-3.5 rounded-[3px] flex items-center gap-2.5 text-slate-400 text-xs italic">
                  <Lock className="w-4 h-4 shrink-0" /> Email not shared by partner
                </div>
              )}

              {/* LinkedIn */}
              {allowed_revealed_contacts.linkedin ? (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-[3px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                        LinkedIn Profile
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {allowed_revealed_contacts.linkedin}
                      </span>
                    </div>
                  </div>
                  <a
                    href={allowed_revealed_contacts.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-8 px-3 bg-blue-600 hover:bg-blue-500 text-white text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px]"
                  >
                    Open LinkedIn
                  </a>
                </div>
              ) : (
                <div className="bg-slate-50/50 border border-slate-200/60 p-3.5 rounded-[3px] flex items-center gap-2.5 text-slate-400 text-xs italic">
                  <Lock className="w-4 h-4 shrink-0" /> LinkedIn not shared
                </div>
              )}

              {/* Twitter */}
              {allowed_revealed_contacts.twitter && (
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-[3px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Twitter className="w-4 h-4 text-sky-500 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                        Twitter / X
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {allowed_revealed_contacts.twitter}
                      </span>
                    </div>
                  </div>
                  <a
                    href={allowed_revealed_contacts.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-8 px-3 bg-slate-900 hover:bg-primary text-white text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px]"
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
        </div>

        {/* Right Column (40% Width on Desktop: Proposal Negotiation Timeline & Partner Profile) */}
        <div className="hidden lg:block lg:col-span-2 space-y-6 lg:sticky lg:top-6">
          {/* Proposal Negotiation Timeline */}
          {renderProposalTimelineContent()}

          {/* Commercial Partner Profile Summary Card */}
          <div className="border border-slate-200 rounded-[4px] bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Building2 className="w-4 h-4 text-slate-500" />
              <h4 className="font-display font-bold text-xs uppercase font-mono tracking-wider text-slate-900">
                Commercial Partner
              </h4>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 text-sm">{targetBusiness.company_name}</div>
              {targetBusiness.industry && (
                <div className="text-slate-500 font-mono text-[11px]">{targetBusiness.industry}</div>
              )}
              {targetBusiness.hq_location && (
                <div className="text-slate-400 font-mono text-[10px]">{targetBusiness.hq_location}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stepper Compact Modal Dialog */}
      <Dialog open={isMobileStepperOpen} onOpenChange={setIsMobileStepperOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-sm p-4 sm:p-5 bg-white border border-slate-200 shadow-xl rounded-lg font-sans">
          <DialogHeader className="border-b border-slate-100 pb-3 text-left">
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400 block">
              Workflow Stages
            </span>
            <DialogTitle className="font-display font-bold text-base text-slate-900">
              Exchange Progress
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2.5 py-2">
            {stepsData.map((s) => {
              return (
                <div
                  key={s.step}
                  className={`flex items-start gap-3 p-3 rounded-[4px] border transition-all ${
                    s.isDone
                      ? "bg-emerald-50/50 border-emerald-200 text-slate-900"
                      : s.isActive
                      ? "bg-orange-50/60 border-orange-200 text-slate-900 shadow-xs ring-1 ring-orange-500/20"
                      : "bg-slate-50/40 border-slate-100 text-slate-400 opacity-50"
                  }`}
                >
                  {/* Step Icon / Circle */}
                  <div className="shrink-0 mt-0.5">
                    {s.isDone ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : s.isActive ? (
                      <div className="w-5 h-5 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        {s.step}
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 font-mono text-[10px] font-bold flex items-center justify-center">
                        {s.step}
                      </div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          s.isDone
                            ? "text-emerald-900"
                            : s.isActive
                            ? "text-orange-600"
                            : "text-slate-400"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`font-mono text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-[2px] ${
                          s.isDone
                            ? "bg-emerald-100 text-emerald-800"
                            : s.isActive
                            ? "bg-orange-100 text-orange-800"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {s.isDone ? "Completed" : s.isActive ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Proposal Logs Drawer (85% height, swipe-to-close with fingertip) */}
      <Drawer open={isMobileHistoryOpen} onOpenChange={setIsMobileHistoryOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh] w-full inset-x-0 rounded-t-2xl p-0 flex flex-col bg-white border-t border-slate-200 shadow-2xl font-sans overflow-hidden">
          <DrawerHeader className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border-b border-slate-200/80 text-left shrink-0 pr-12 relative block">
            <div className="flex items-center gap-2">
              <DrawerTitle className="font-display font-bold text-sm sm:text-base text-slate-900 leading-tight">
                Proposal Timeline
              </DrawerTitle>
              {proposals && (
                <span className="font-mono text-[8.5px] uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-[2px] border border-slate-200">
                  {proposals.length} {proposals.length === 1 ? "Version" : "Versions"}
                </span>
              )}
            </div>
            <DrawerDescription className="text-[11px] text-slate-500 font-sans leading-tight mt-0.5 max-w-[calc(100%-1rem)]">
              Complete chronological record of all proposed terms, counter-offers, and status changes.
            </DrawerDescription>

            {/* Close Button with safe absolute positioning */}
            <DrawerClose asChild>
              <button
                type="button"
                className="absolute right-3 top-2.5 sm:right-4 sm:top-2.5 p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 space-y-3.5 bg-white">
            {renderProposalTimelineContent(false)}

            {/* Commercial Partner Profile Summary Card inside mobile drawer */}
            <div className="border border-slate-200 rounded-[4px] bg-slate-50/70 p-3.5 shadow-sm space-y-1.5 mt-3">
              <div className="flex items-center gap-1.5 border-b border-slate-200/70 pb-1.5">
                <Building2 className="w-3 h-3 text-slate-500" />
                <h4 className="font-display font-bold text-[10px] uppercase font-mono tracking-wider text-slate-900">
                  Commercial Partner
                </h4>
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900">{targetBusiness.company_name}</div>
                {targetBusiness.industry && (
                  <div className="text-slate-500 font-mono text-[10px]">{targetBusiness.industry}</div>
                )}
                {targetBusiness.hq_location && (
                  <div className="text-slate-400 font-mono text-[9.5px]">{targetBusiness.hq_location}</div>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
