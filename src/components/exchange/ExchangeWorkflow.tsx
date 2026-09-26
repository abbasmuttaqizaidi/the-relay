import React, { useState } from "react";
import { toast } from "sonner";
import { executiveToast } from "@/design-system";
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
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Shield,
  Eye,
  EyeOff,
  History,
  LayoutGrid,
  Columns3,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ExchangeType, ContactField, DeclineReason } from "@/types";
import { acknowledgeExchangeProcess } from "@/functions/acknowledgeExchangeProcess";
import { sendExchangeFollowUp } from "@/functions/sendExchangeFollowUp";
import { createExchangeProposal } from "@/functions/createExchangeProposal";
import { respondExchangeProposal } from "@/functions/respondExchangeProposal";
import { withdrawExchangeProposal } from "@/functions/withdrawExchangeProposal";
import { confirmExchangeAgreement } from "@/functions/confirmExchangeAgreement";
import { shareContactConsent, requestContactExchange } from "@/functions/shareContactConsent";
import { acceptContactConsent, respondContactExchange } from "@/functions/acceptContactConsent";
import { declineInterest } from "@/functions/declineInterest";
import { declineContactConsent } from "@/functions/declineContactConsent";
import { createCustomContactDetail } from "@/functions/createCustomContactDetail";
import { updateCustomContactDetail } from "@/functions/updateCustomContactDetail";
import { deleteCustomContactDetail } from "@/functions/deleteCustomContactDetail";
import {
  formatDeliveryMethods,
  formatValueCategories,
  extractTermsMetadataFromText,
  extractHighlightedTermsFromText,
  FormattedDeliveryMethod,
} from "@/lib/terms-formatter";
import { updateBusiness } from "@/functions/updateBusiness";
import { ExpressInterestModal } from "@/components/opportunities/ExpressInterestModal";
import {
  ExchangeHubDefaultView,
  ExchangeHubRound,
} from "./ExchangeHubDefaultView";
import { ExchangeHubSimplifiedView } from "./ExchangeHubSimplifiedView";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Modal,
  Button,
  ExecutiveTabs,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system";

export const getExchangeTypeLabel = (type: string) => {
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

export const parseDeclineDetails = (terms?: string | null) => {
  if (!terms || !terms.includes("[DECLINE REASON:")) return null;
  const match = terms.match(/\[DECLINE REASON:\s*([^\]]+)\](?:\s*Note:\s*([^|]+))?/);
  if (!match) return null;
  return {
    reason: match[1]?.trim(),
    note: match[2]?.trim(),
  };
};

export const getCleanAdditionalTerms = (terms?: string | null) => {
  if (!terms) return null;
  if (terms.startsWith("{")) {
    try {
      const parsed = JSON.parse(terms);
      if (parsed.note) return parsed.note;
      if (parsed.message) return parsed.message;
      return null;
    } catch {
      return terms;
    }
  }
  if (!terms.includes("[DECLINE REASON:")) return terms;
  const parts = terms.split("| Original Terms:");
  if (parts.length > 1) {
    return parts[1]?.trim() || null;
  }
  return null;
};

export const getDeclineReasonLabel = (reason?: string | null) => {
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
  const [showInlineAuditLog, setShowInlineAuditLog] = useState(true);
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
  const [selectedContacts, setSelectedContacts] = useState<string[]>([
    "email",
    "linkedin",
  ]);

  // Contact sharing modals & Manage Sheet state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [editingCustomId, setEditingCustomId] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Active Field for Manage Sheet
  const [activeManageField, setActiveManageField] = useState<{
    key: string;
    name: string;
    label: string;
    type: "standard" | "custom";
    myValue: string | null;
    partnerValue: string | null;
    status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined";
    customId?: string;
  } | null>(null);
  const [manageInputValue, setManageInputValue] = useState<string>("");

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

  const [isLinkedinModalOpen, setIsLinkedinModalOpen] = useState(false);
  const [linkedinInput, setLinkedinInput] = useState("");

  const targetBusiness = is_requester ? owner_business : requesting_business;
  const myBusiness = is_requester ? requesting_business : owner_business;

  const myContacts = data?.my_contacts || {
    email: myBusiness?.contact_email || myBusiness?.owner?.email || null,
    phone: myBusiness?.phone_number || null,
    linkedin: myBusiness?.linkedin_url || null,
    twitter: myBusiness?.twitter_url || null,
    custom: myBusiness?.custom_contact_details || [],
  };

  // Derive workflow steps completion
  // The business that expressed interest (requester) has already acknowledged the protocol upon pitch submission.
  const requesterAcknowledged = Boolean(interest.requester_acknowledged_at) || is_requester;
  const ownerAcknowledged = Boolean(interest.owner_acknowledged_at);
  const bothAcknowledged = requesterAcknowledged && ownerAcknowledged;
  const myAcknowledged = is_requester ? true : ownerAcknowledged;
  const otherAcknowledged = is_requester ? ownerAcknowledged : true;

  const activeProposal = proposals && proposals.length > 0 ? proposals[0] : null;
  const isAgreed = agreement?.status === "agreed";
  const isAgreementDraft = agreement?.status === "draft";

  const ownerConfirmed = Boolean(agreement?.owner_confirmed_at);
  const requesterConfirmed = Boolean(agreement?.requester_confirmed_at);
  const myConfirmed = is_requester ? requesterConfirmed : ownerConfirmed;
  const otherConfirmed = is_requester ? ownerConfirmed : requesterConfirmed;

  const effectiveMyBizId = is_requester ? requesting_business?.id : owner_business?.id;

  // Contact consents given by me to partner
  const myConsents = (consents || []).filter(
    (c: any) => c.from_business_id === effectiveMyBizId
  );
  // Contact consents received from partner for me to accept
  const incomingConsents = (consents || []).filter(
    (c: any) => c.to_business_id === effectiveMyBizId
  );

  const consentsReceivedList: Array<{
    id: string;
    contact_field: string;
    label: string;
    value: string | null;
    status: string;
    requested_at: string;
    accepted_at?: string | null;
  }> = (data?.consents_received && data.consents_received.length > 0)
    ? data.consents_received
    : incomingConsents.map((c: any) => ({
        id: c.id,
        contact_field: c.contact_field,
        label: c.contact_field.toUpperCase(),
        value: c.status === "accepted" ? (allowed_revealed_contacts?.[c.contact_field] || null) : null,
        status: c.status,
        requested_at: c.requested_at,
        accepted_at: c.accepted_at,
      }));

  const pendingIncomingConsentsList = consentsReceivedList.filter(
    (c: any) => c.status === "requested"
  );
  const acceptedIncomingConsentsList = consentsReceivedList.filter(
    (c: any) => c.status === "accepted"
  );

  const hasSharedAnyContact = myConsents.length > 0;
  const hasAcceptedAnyContact = acceptedIncomingConsentsList.length > 0 || (allowed_revealed_contacts && (allowed_revealed_contacts.email || allowed_revealed_contacts.phone || allowed_revealed_contacts.linkedin || (allowed_revealed_contacts.custom && allowed_revealed_contacts.custom.length > 0)));

  const isHandshakeComplete =
    is_legacy_handshake ||
    (isAgreed && hasSharedAnyContact && hasAcceptedAnyContact);

  const isStep1Done = bothAcknowledged;
  const isStep2Done = isAgreed || isAgreementDraft;
  const isStep3Done = isAgreed;
  const isStep4Done = isHandshakeComplete;

  const currentStep = !isStep1Done ? 1 : !isStep2Done ? 2 : !isStep3Done ? 3 : 4;

  // Sync selectedContacts from existing consents if present
  React.useEffect(() => {
    if (myConsents && myConsents.length > 0) {
      setSelectedContacts(myConsents.map((c: any) => c.contact_field));
    } else {
      const defaults: string[] = ["email"];
      if (myContacts.phone) defaults.push("phone");
      if (myContacts.linkedin) defaults.push("linkedin");
      setSelectedContacts(defaults);
    }
  }, [consents]);

  // Top right view mode switcher state (Default Interactive Workspace vs Simplified 2-Column from seo_code_guide.md)
  const [viewMode, setViewMode] = useState<"default" | "simplified">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("relay_exchange_hub_view_mode");
      if (saved === "default" || saved === "simplified") return saved;
    }
    return "default";
  });

  const handleViewModeChange = (mode: "default" | "simplified") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("relay_exchange_hub_view_mode", mode);
    }
  };

  const [selectedDrawerRound, setSelectedDrawerRound] = useState<ExchangeHubRound | null>(null);

  // Construct ExchangeHubRound array from live data
  const rounds: ExchangeHubRound[] = React.useMemo(() => {
    const rList: ExchangeHubRound[] = [];

    // Round 1: Origin Pitch (v0)
    if (interest) {
      const hasProposals = Boolean(proposals && proposals.length > 0);
      const isInterestDeclined = interest.status === "declined";
      const originProposer = is_requester
        ? (myBusiness?.company_name || "You")
        : (targetBusiness?.company_name || "Partner");

      const rawInterestText = interest.proposed_terms || interest.message || "";
      const extractedMetadata = extractTermsMetadataFromText(rawInterestText);
      const dbValCats = formatValueCategories(interest.value_categories);
      const valCats = dbValCats.length > 0 ? dbValCats : extractedMetadata.valueCategories;
      const dbDelMethods = formatDeliveryMethods(interest.delivery_methods);
      const delMethods = dbDelMethods.length > 0 ? dbDelMethods : extractedMetadata.deliveryMethods;

      rList.push({
        roundNum: 1,
        versionBadge: "v0",
        badge: "Originating Mandate",
        title: opportunity?.title || "Opportunity Proposal",
        timestamp: interest.created_at
          ? new Date(interest.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Initial",
        proposerName: originProposer,
        isMe: is_requester,
        dimension: valCats[0] || opportunity?.category || "Distribution & Sales",
        archetype: delMethods[0]?.label || "Authorized VAR Reseller",
        settlement: "Net 30 Days",
        rate: interest.proposed_terms ? interest.proposed_terms.split("\n")[0] : "Initial Mandate",
        narrative: extractedMetadata.cleanText || interest.proposed_terms || interest.message || "Submitted commercial terms and pitch.",
        additionalTerms: interest.message || null,
        valueCategories: valCats,
        deliveryMethods: delMethods,
        highlightedTerms: Array.from(new Set([...(interest.highlighted_terms || []), ...extractedMetadata.highlightedTerms])),
        isCurrent: !hasProposals && !isInterestDeclined,
        status: hasProposals ? "superseded" : isInterestDeclined ? "declined" : "active",
        statusLabel: hasProposals
          ? "Superseded"
          : isInterestDeclined
          ? is_requester
            ? `Declined by ${targetBusiness?.company_name || "Partner"}`
            : "Declined by You"
          : "Awaiting Partner Review",
        proposalId: null,
      });
    }

    // Rounds 2+: Proposals (v1, v2, v3...)
    if (proposals && proposals.length > 0) {
      const sorted = [...proposals].sort((a, b) => (a.version || 1) - (b.version || 1));
      sorted.forEach((p: any, idx: number) => {
        const isProposerMe =
          p.proposing_business_id === effectiveMyBizId || p.proposing_business_id === myBusinessId;
        const proposerName = isProposerMe
          ? "You"
          : p.proposing_business?.company_name || targetBusiness?.company_name || "Partner";
        const isLatest = idx === sorted.length - 1;
        const declineInfo = parseDeclineDetails(p.additional_terms);

        let status: "active" | "superseded" | "declined" | "withdrawn" | "accepted" = "superseded";
        let statusLabel = "Superseded";

        if (p.status === "accepted") {
          status = "accepted";
          statusLabel = "Accepted";
        } else if (p.status === "declined") {
          status = "declined";
          statusLabel = isProposerMe
            ? `Declined by ${targetBusiness?.company_name || "Partner"}`
            : "Declined by You";
        } else if (p.status === "cancelled") {
          status = "withdrawn";
          statusLabel = "Withdrawn";
        } else if (isLatest && p.status === "pending_response") {
          status = "active";
          statusLabel = isProposerMe ? "Awaiting Partner Response" : "In Your Court";
        }

        const termsRate =
          p.revenue_percentage != null
            ? `${p.revenue_percentage}% Revenue Share`
            : p.fixed_amount != null
            ? `${p.currency || "USD"} ${p.fixed_amount.toLocaleString()}`
            : getExchangeTypeLabel(p.exchange_type);

        const roundNum = rList.length + 1;

        const rawNarrative = p.exchange_details || "";
        const rawAdditional = p.additional_terms || "";
        const extractedDetails = extractTermsMetadataFromText(rawNarrative);
        const extractedAdditional = extractTermsMetadataFromText(rawAdditional);

        let propValueCategories: string[] = [];
        let propDeliveryMethods: any[] = [];
        try {
          if (p.additional_terms && p.additional_terms.startsWith("{")) {
            const parsed = JSON.parse(p.additional_terms);
            if (parsed.value_categories) propValueCategories = formatValueCategories(parsed.value_categories);
            if (parsed.delivery_methods) propDeliveryMethods = formatDeliveryMethods(parsed.delivery_methods);
          }
        } catch {
          // ignore
        }

        const dbValCats = propValueCategories.length > 0
          ? propValueCategories
          : formatValueCategories(p.value_categories);
        const valCats = dbValCats.length > 0
          ? dbValCats
          : [...extractedDetails.valueCategories, ...extractedAdditional.valueCategories];

        const dbDelMethods = propDeliveryMethods.length > 0
          ? propDeliveryMethods
          : formatDeliveryMethods(p.delivery_methods);
        const delMethods = dbDelMethods.length > 0
          ? dbDelMethods
          : [...extractedDetails.deliveryMethods, ...extractedAdditional.deliveryMethods];

        const combinedHighlights = Array.from(
          new Set([
            ...(p.highlighted_terms || []),
            ...extractedDetails.highlightedTerms,
            ...extractedAdditional.highlightedTerms,
          ])
        );

        rList.push({
          roundNum,
          versionBadge: `v${p.version || roundNum - 1}`,
          badge: roundNum === 2 ? "First Proposal" : "Counter-Offer",
          title: `${proposerName} Proposed ${termsRate}`,
          timestamp: p.created_at
            ? new Date(p.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Recently",
          proposerName,
          isMe: isProposerMe,
          dimension: valCats[0] || opportunity?.category || "Distribution & Sales",
          archetype: delMethods[0]?.label || getExchangeTypeLabel(p.exchange_type) || "Authorized VAR Reseller",
          settlement: "Net 30 Days",
          rate: termsRate,
          narrative: extractedDetails.cleanText || p.exchange_details,
          additionalTerms: getCleanAdditionalTerms(p.additional_terms),
          valueCategories: valCats,
          deliveryMethods: delMethods,
          highlightedTerms: combinedHighlights,
          isCurrent: status === "active",
          status,
          statusLabel,
          declineReason: declineInfo?.reason ? getDeclineReasonLabel(declineInfo.reason) : null,
          declineNote: declineInfo?.note || null,
          proposalId: p.id,
        });
      });
    }

    return rList;
  }, [interest, proposals, effectiveMyBizId, is_requester, myBusiness, targetBusiness, opportunity]);

  const activeRound = rounds.find((r) => r.isCurrent) || null;

  const handleQuickDispatch = async (termsText: string) => {
    if (!termsText.trim()) return;
    try {
      setLoadingAction("proposal");
      await createExchangeProposal({
        data: {
          interest_id: interest.id,
          exchange_type: "revenue_share",
          exchange_details: termsText.trim(),
        },
      });
      executiveToast.success("Proposal Dispatched", {
        badge: "Stage 2 Transmitted",
        description: "Your bilateral terms have been transmitted to the counterparty.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Dispatch Error", {
        badge: "Submission Failed",
        description: err.message || "Failed to dispatch proposal.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAcceptFromView = async (proposalId?: string) => {
    const targetPropId = proposalId || activeProposal?.id;
    if (!targetPropId) {
      if (is_owner && !activeProposal) {
        setShowProposalForm(true);
        return;
      }
      return;
    }
    await handleRespondProposal(targetPropId, "accept");
  };

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
      executiveToast.success("Process Acknowledged", {
        badge: "Stage 1 Acknowledged",
        description: "You have acknowledged how Relay's bilateral exchange process works. Negotiation is unlocked.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Acknowledgement Error", {
        badge: "Action Failed",
        description: err.message || "Failed to record acknowledgement.",
      });
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
      executiveToast.success("Follow-Up Sent", {
        badge: "Reminder Delivered",
        description: `Reminder sent to ${targetBusiness.company_name} to acknowledge the exchange process.`,
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Follow-Up Error", {
        badge: "Delivery Failed",
        description: err.message || "Failed to send follow-up.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exchangeDetails.trim()) {
      executiveToast.warning("Incomplete Proposal", {
        badge: "Terms Required",
        description: "Please provide exchange commercial details before submitting.",
      });
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
      executiveToast.success("Proposal Submitted", {
        badge: "Stage 3 Proposal",
        description: "Your exchange proposal has been transmitted to the partner.",
      });
      setShowProposalForm(false);
      setExchangeDetails("");
      setAdditionalTerms("");
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Proposal Error", {
        badge: "Submission Failed",
        description: err.message || "Failed to submit proposal.",
      });
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
        executiveToast.success("Proposal Accepted", {
          badge: "Terms Approved",
          description: "Please review and confirm the final exchange terms.",
        });
      } else {
        executiveToast.warning("Proposal Declined", {
          badge: "Counter Needed",
          description: "You declined this exchange proposal.",
        });
        setShowDeclineModal(false);
        setDeclineNote("");
      }
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Response Error", {
        badge: "Action Failed",
        description: err.message || "Failed to respond to proposal.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeclineInitialPitch = async () => {
    try {
      setLoadingAction("decline-pitch");
      await declineInterest({ data: { interest_id: interest.id } });
      executiveToast.warning("Pitch Declined", {
        badge: "Exchange Declined",
        description: "You have declined this exchange pitch.",
      });
      setShowDeclineModal(false);
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Decline Error", {
        badge: "Action Failed",
        description: err.message || "Failed to decline pitch.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleConfirmDeclineModal = async () => {
    const currentActive = activeRound || (rounds && rounds.length > 0 ? rounds[rounds.length - 1] : null);
    if (currentActive?.proposalId) {
      await handleRespondProposal(currentActive.proposalId, "decline", declineReason, declineNote);
    } else if (activeProposal?.id) {
      await handleRespondProposal(activeProposal.id, "decline", declineReason, declineNote);
    } else {
      await handleDeclineInitialPitch();
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
      executiveToast.success("Exchange Terms Confirmed", {
        badge: "Agreement Bound",
        description: "You have officially agreed to the final bilateral terms.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Confirmation Error", {
        badge: "Action Failed",
        description: err.message || "Failed to confirm agreement.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleShareContacts = async () => {
    if (selectedContacts.length === 0) {
      executiveToast.warning("Select Channels", {
        badge: "Selection Needed",
        description: "Please select at least one contact channel to share.",
      });
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
      executiveToast.success("Contact Sharing Requested", {
        badge: "Stage 4 Handshake",
        description: "Your sharing request has been sent. Values unlock once approved.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Sharing Error", {
        badge: "Action Failed",
        description: err.message || "Failed to share contact fields.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleOpenManageSheet = (field: {
    key: string;
    name: string;
    label: string;
    type: "standard" | "custom";
    myValue: string | null;
    partnerValue: string | null;
    status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined";
    customId?: string;
  }) => {
    setActiveManageField(field);
    setManageInputValue(field.myValue || "");
  };

  const handleRequestExchangeFromSheet = async () => {
    if (!activeManageField) return;
    try {
      setLoadingAction("sheet-request-exchange");
      await requestContactExchange({
        data: {
          interest_id: interest.id,
          field: activeManageField.key,
          value: manageInputValue.trim() || undefined,
        },
      });
      executiveToast.success("Exchange Requested", {
        badge: "Privacy Protected",
        description: `We've sent an exchange request to ${targetBusiness.company_name}. Your ${activeManageField.name.toLowerCase()} remains private until mutual consent.`,
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
      setActiveManageField((prev) =>
        prev
          ? {
              ...prev,
              myValue: manageInputValue.trim() || prev.myValue,
              status: "requested_by_me",
            }
          : null
      );
    } catch (err: any) {
      executiveToast.danger("Request Error", {
        badge: "Action Failed",
        description: err.message || "Failed to request exchange.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleApproveExchangeFromSheet = async () => {
    if (!activeManageField) return;
    try {
      setLoadingAction("sheet-approve-exchange");
      await respondContactExchange({
        data: {
          interest_id: interest.id,
          field: activeManageField.key,
          action: "approve",
          value: manageInputValue.trim() || undefined,
          custom_label: activeManageField.name,
        },
      });
      executiveToast.success(`${activeManageField.name} Exchange Complete`, {
        badge: "Handshake Complete",
        description: `Both businesses have approved the exchange. You can now see each other's ${activeManageField.name.toLowerCase()}.`,
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
      setActiveManageField(null);
    } catch (err: any) {
      executiveToast.danger("Approval Error", {
        badge: "Action Failed",
        description: err.message || "Failed to complete exchange.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeclineExchangeFromSheet = async () => {
    if (!activeManageField) return;
    try {
      setLoadingAction("sheet-decline-exchange");
      await respondContactExchange({
        data: {
          interest_id: interest.id,
          field: activeManageField.key,
          action: "decline",
        },
      });
      executiveToast.warning("Exchange Request Declined", {
        badge: "Request Closed",
        description: "You declined this contact exchange request.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
      setActiveManageField(null);
    } catch (err: any) {
      executiveToast.danger("Decline Error", {
        badge: "Action Failed",
        description: err.message || "Failed to decline exchange request.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRefreshManageStatus = async () => {
    try {
      setIsCheckingStatus(true);
      await onRefresh();
      executiveToast.success("Status Updated", {
        badge: "Synchronized",
        description: "Fetched the latest exchange permissions from the server.",
      });
    } catch (err: any) {
      executiveToast.danger("Sync Error", {
        badge: "Fetch Failed",
        description: err.message || "Failed to refresh status.",
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleCheckStatus = async () => {
    try {
      setIsCheckingStatus(true);
      await onRefresh();
      executiveToast.success("Status Updated", {
        badge: "Synchronized",
        description: "Fetched the latest contact exchange status.",
      });
    } catch (err: any) {
      executiveToast.danger("Status Error", {
        badge: "Fetch Failed",
        description: err.message || "Failed to check status.",
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleAcceptIncomingContacts = async (fieldsToAccept: string[]) => {
    try {
      setLoadingAction("accept-contacts");
      await acceptContactConsent({
        data: {
          interest_id: interest.id,
          fields: fieldsToAccept,
        },
      });
      executiveToast.success("Contact Details Approved", {
        badge: "Access Granted",
        description: "You can now view the partner's verified contact information.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Approval Error", {
        badge: "Action Failed",
        description: err.message || "Failed to approve contact details.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeclineIncomingContacts = async (fieldsToDecline: string[]) => {
    try {
      setLoadingAction("decline-contacts");
      await declineContactConsent({
        data: {
          interest_id: interest.id,
          fields: fieldsToDecline,
        },
      });
      executiveToast.warning("Contact Request Declined", {
        badge: "Declined",
        description: "You chose not to accept these contact details.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Decline Error", {
        badge: "Action Failed",
        description: err.message || "Failed to decline contact request.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleOpenAddCustomModal = () => {
    setEditingCustomId(null);
    setCustomLabel("");
    setCustomValue("");
    setIsCustomModalOpen(true);
  };

  const handleOpenEditCustomModal = (id: string, label: string, value: string) => {
    setEditingCustomId(id);
    setCustomLabel(label);
    setCustomValue(value);
    setIsCustomModalOpen(true);
  };

  const handleSaveCustomContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim() || !customValue.trim()) {
      executiveToast.warning("Incomplete Channel", {
        badge: "Values Required",
        description: "Please provide both label and value for the custom contact.",
      });
      return;
    }
    try {
      setLoadingAction("save-custom-contact");
      if (editingCustomId) {
        await updateCustomContactDetail({
          data: {
            id: editingCustomId,
            label: customLabel.trim(),
            value: customValue.trim(),
          },
        });
        executiveToast.success("Custom Contact Updated", {
          badge: "Contact Saved",
          description: "Your custom contact channel has been updated.",
        });
      } else {
        const created = await createCustomContactDetail({
          data: {
            label: customLabel.trim(),
            value: customValue.trim(),
          },
        });
        setSelectedContacts((prev) => [...prev, `custom:${created.id}`]);
        executiveToast.success("Custom Contact Added", {
          badge: "Channel Ready",
          description: "Channel added and selected for mutual sharing.",
        });
      }
      setIsCustomModalOpen(false);
      setCustomLabel("");
      setCustomValue("");
      setEditingCustomId(null);
      await onRefresh();
    } catch (err: any) {
      executiveToast.danger("Save Error", {
        badge: "Action Failed",
        description: err.message || "Failed to save custom contact.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteCustomContact = async (id: string) => {
    try {
      setLoadingAction(`delete-custom-${id}`);
      await deleteCustomContactDetail({
        data: { id },
      });
      setSelectedContacts((prev) => prev.filter((f) => f !== `custom:${id}`));
      executiveToast.success("Custom Contact Removed", {
        badge: "Channel Deleted",
        description: "The custom contact detail has been deleted.",
      });
      await onRefresh();
    } catch (err: any) {
      executiveToast.danger("Delete Error", {
        badge: "Action Failed",
        description: err.message || "Failed to delete custom contact.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSavePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingAction("save-phone");
      await updateBusiness({
        data: {
          business_id: myBusinessId,
          phone_number: phoneInput.trim(),
        },
      });
      executiveToast.success("Phone Number Updated", {
        badge: "Profile Saved",
        description: "Your institutional phone number has been updated.",
      });
      setIsPhoneModalOpen(false);
      if (phoneInput.trim()) {
        setSelectedContacts((prev) => (prev.includes("phone") ? prev : [...prev, "phone"]));
      }
      await onRefresh();
    } catch (err: any) {
      executiveToast.danger("Update Error", {
        badge: "Action Failed",
        description: err.message || "Failed to update phone number.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSaveLinkedin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingAction("save-linkedin");
      await updateBusiness({
        data: {
          business_id: myBusinessId,
          linkedin_url: linkedinInput.trim(),
        },
      });
      executiveToast.success("LinkedIn URL Updated", {
        badge: "Profile Saved",
        description: "Your verified LinkedIn profile link has been saved.",
      });
      setIsLinkedinModalOpen(false);
      if (linkedinInput.trim()) {
        setSelectedContacts((prev) => (prev.includes("linkedin") ? prev : [...prev, "linkedin"]));
      }
      await onRefresh();
    } catch (err: any) {
      executiveToast.danger("Update Error", {
        badge: "Action Failed",
        description: err.message || "Failed to update LinkedIn URL.",
      });
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
      executiveToast.success("Proposal Withdrawn", {
        badge: "Proposal Revoked",
        description: "Your exchange proposal has been withdrawn.",
      });
      await onRefresh();
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      executiveToast.danger("Withdraw Error", {
        badge: "Action Failed",
        description: err.message || "Failed to withdraw proposal.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    executiveToast.success("Copied to Clipboard", {
      badge: "Copied",
      description: `${label} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
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

  const getProposalActorLabel = (proposal: any) => {
    const isProposerMe =
      proposal.proposing_business_id === myBusinessId ||
      proposal.proposing_business_id === effectiveMyBizId;
    const isReceiverMe =
      proposal.receiving_business_id === myBusinessId ||
      proposal.receiving_business_id === effectiveMyBizId;
    const partnerName = targetBusiness?.company_name || (is_owner ? "Requester" : "Opportunity Owner");

    switch (proposal.status) {
      case "accepted":
        return isReceiverMe ? "Accepted by You" : `Accepted by ${partnerName}`;
      case "declined":
        return isReceiverMe ? "Declined by You" : `Declined by ${partnerName}`;
      case "superseded":
      case "countered":
        return isReceiverMe ? "Countered by You" : `Countered by ${partnerName}`;
      case "cancelled":
        return isProposerMe ? "Withdrawn by You" : `Withdrawn by ${partnerName}`;
      case "pending_response":
        return isReceiverMe ? "Awaiting Your Response" : `Awaiting ${partnerName} Response`;
      default:
        return proposal.status?.replace("_", " ");
    }
  };

  const renderProposalTimelineContent = (showHeader = true, isInline = false) => {
    const isRequesterMe = requesting_business?.id === effectiveMyBizId || is_requester;
    const originProposer = isRequesterMe ? "You" : requesting_business?.company_name || "Requester";
    const hasProposals = Boolean(proposals && proposals.length > 0);
    const isInterestDeclined = interest.status === "declined";

    // Build unified chronological events: [Origin Pitch, Proposal v1, Counter-Proposal v2, ...]
    const events: Array<{
      id: string;
      versionLabel: string;
      versionBadge: string;
      isOriginPitch: boolean;
      proposerName: string;
      isMe: boolean;
      timestamp: string | null;
      status: "active" | "countered" | "declined" | "accepted" | "withdrawn" | "superseded";
      statusLabel: string;
      exchangeTypeLabel: string;
      commercialTermsSummary: string;
      details: string;
      additionalTerms?: string | null;
      declineReason?: string | null;
      declineNote?: string | null;
      valueCategories?: string[];
    }> = [];

    // 1. Origin Pitch
    if (interest) {
      events.push({
        id: `origin-${interest.id}`,
        versionLabel: "Initial Exchange Pitch (v0)",
        versionBadge: "v0",
        isOriginPitch: true,
        proposerName: originProposer,
        isMe: isRequesterMe,
        timestamp: interest.created_at || null,
        status: hasProposals ? "superseded" : isInterestDeclined ? "declined" : "active",
        statusLabel: hasProposals
          ? "Formalized in Proposal v1"
          : isInterestDeclined
          ? "Pitch Declined"
          : "Initial Offer Active",
        exchangeTypeLabel: "Origin Pitch",
        commercialTermsSummary: interest.proposed_terms || "Custom Commercial Pitch",
        details: interest.proposed_terms || interest.message || "Submitted commercial terms and pitch.",
        additionalTerms: interest.message && interest.proposed_terms ? interest.message : null,
        valueCategories: interest.value_categories || [],
      });
    }

    // 2. Proposals
    if (proposals && proposals.length > 0) {
      const sorted = [...proposals].sort((a, b) => (a.version || 1) - (b.version || 1));
      sorted.forEach((p: any, idx: number) => {
        const isProposerMe = p.proposing_business_id === effectiveMyBizId;
        const proposerName = isProposerMe
          ? "You"
          : p.proposing_business?.company_name || targetBusiness.company_name || "Partner";
        const isLatest = idx === sorted.length - 1;
        const declineInfo = parseDeclineDetails(p.additional_terms);

        let status: "active" | "countered" | "declined" | "accepted" | "withdrawn" | "superseded" = "superseded";
        let statusLabel = "Superseded by Counter-Proposal";

        if (p.status === "accepted") {
          status = "accepted";
          statusLabel = "Accepted";
        } else if (p.status === "declined") {
          status = "declined";
          statusLabel = "Declined";
        } else if (p.status === "cancelled") {
          status = "withdrawn";
          statusLabel = "Withdrawn";
        } else if (isLatest && p.status === "pending_response") {
          status = "active";
          statusLabel = isProposerMe ? "Awaiting Partner Response" : "Your Turn to Respond";
        }

        const termsSummary = p.revenue_percentage != null
          ? `${p.revenue_percentage}% Revenue Share`
          : p.fixed_amount != null
          ? `${p.currency || "USD"} ${p.fixed_amount.toLocaleString()}`
          : getExchangeTypeLabel(p.exchange_type);

        events.push({
          id: p.id,
          versionLabel: p.version > 1 ? `Counter-Proposal v${p.version}` : `Proposal v1`,
          versionBadge: `v${p.version || 1}`,
          isOriginPitch: false,
          proposerName,
          isMe: isProposerMe,
          timestamp: p.created_at || null,
          status,
          statusLabel,
          exchangeTypeLabel: getExchangeTypeLabel(p.exchange_type),
          commercialTermsSummary: termsSummary,
          details: p.exchange_details,
          additionalTerms: getCleanAdditionalTerms(p.additional_terms),
          declineReason: declineInfo?.reason ? getDeclineReasonLabel(declineInfo.reason) : null,
          declineNote: declineInfo?.note || null,
        });
      });
    }

    // Display newest at the top for immediate glance
    const displayEvents = [...events].reverse();

    return (
      <div className={showHeader ? "border border-slate-200 rounded-[4px] bg-white p-4 sm:p-5 shadow-sm space-y-4" : "space-y-4"}>
        {showHeader && (
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 leading-tight">
                  Negotiation Audit Log &amp; Revisions
                </h4>
                <p className="text-[11px] text-slate-500 font-sans hidden sm:block">
                  Complete chronological record of all initial terms and counter-proposals.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[2px] border border-slate-200">
                {displayEvents.length} {displayEvents.length === 1 ? "Round" : "Rounds"}
              </span>
              {isInline && (
                <button
                  type="button"
                  onClick={() => setShowInlineAuditLog(!showInlineAuditLog)}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                  title={showInlineAuditLog ? "Collapse Audit Log" : "Expand Audit Log"}
                >
                  {showInlineAuditLog ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        )}

        {(!isInline || showInlineAuditLog) && (
          <div className="relative pl-6 sm:pl-7 space-y-3 before:absolute before:left-3 before:top-2.5 before:bottom-2.5 before:w-[1px] before:bg-slate-200">
            {displayEvents.map((evt) => {
              const isCurrent = evt.status === "active";
              const isDeclined = evt.status === "declined";
              const isAccepted = evt.status === "accepted";
              const isPast = !isCurrent && !isAccepted;

              return (
                <div
                  key={evt.id}
                  className={`relative group transition-opacity duration-150 ${
                    isPast ? "opacity-60 hover:opacity-85" : "opacity-100"
                  }`}
                >
                  {/* Timeline Node */}
                  <div
                    className={`absolute -left-6 sm:-left-7 top-2 w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[8.5px] z-10 ${
                      isCurrent || isAccepted
                        ? "bg-slate-800 border-white text-white font-bold"
                        : "bg-slate-100 border-slate-300 text-slate-400 font-normal"
                    }`}
                  >
                    {evt.versionBadge}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`rounded-[3px] p-3 text-xs space-y-2 border transition-all ${
                      isCurrent || isAccepted
                        ? "bg-white border-slate-300 shadow-xs text-slate-700"
                        : "bg-slate-50/70 border-slate-200 text-slate-400"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`font-sans text-xs ${
                            isCurrent || isAccepted ? "font-semibold text-slate-700" : "font-normal text-slate-400"
                          }`}
                        >
                          {evt.versionLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.2 font-mono text-[8px] uppercase rounded-[2px] ${
                            isCurrent || isAccepted
                              ? "bg-slate-100 text-slate-600 font-medium"
                              : "bg-slate-100/60 text-slate-400 font-normal"
                          }`}
                        >
                          {evt.isMe ? (
                            <Send className="w-2.5 h-2.5 opacity-60" />
                          ) : (
                            <Building2 className="w-2.5 h-2.5 opacity-60" />
                          )}
                          <span className={isPast ? "text-slate-400" : "text-slate-600"}>
                            {evt.isMe ? "You" : evt.proposerName}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span
                          className={`font-mono text-[8px] uppercase px-1.5 py-0.2 rounded-[2px] ${
                            isCurrent || isAccepted
                              ? "bg-slate-800 text-white font-medium"
                              : isDeclined
                              ? "bg-slate-100 text-slate-400 border border-slate-200 font-normal"
                              : "bg-slate-100 text-slate-400 font-normal"
                          }`}
                        >
                          {evt.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Terms summary */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[8px] uppercase text-slate-400 font-normal">
                        Terms:
                      </span>
                      <span
                        className={`font-sans text-xs px-1.5 py-0.2 rounded-[2px] ${
                          isCurrent || isAccepted
                            ? "font-medium text-slate-700 bg-slate-50 border border-slate-200"
                            : "font-normal text-slate-400 bg-slate-100/50"
                        }`}
                      >
                        {evt.commercialTermsSummary}
                      </span>
                      {evt.exchangeTypeLabel && (
                        <span className="font-mono text-[8.5px] text-slate-400">
                          ({evt.exchangeTypeLabel})
                        </span>
                      )}
                    </div>

                    {/* Detail text */}
                    {evt.details && evt.details !== evt.commercialTermsSummary && (
                      <p
                        className={`font-sans leading-relaxed text-xs ${
                          isCurrent || isAccepted ? "text-slate-600 font-normal" : "text-slate-400 font-normal"
                        }`}
                      >
                        {evt.details}
                      </p>
                    )}

                    {/* Additional terms note */}
                    {evt.additionalTerms && (
                      <div
                        className={`p-1.5 rounded-[2px] text-[11px] italic ${
                          isCurrent || isAccepted
                            ? "bg-slate-50 text-slate-500 border border-slate-100"
                            : "bg-slate-100/40 text-slate-400"
                        }`}
                      >
                        &ldquo;{evt.additionalTerms}&rdquo;
                      </div>
                    )}

                    {/* Decline explanation if present */}
                    {evt.declineReason && (
                      <div className="p-1.5 bg-slate-100/60 border border-slate-200/60 rounded-[2px] text-[11px] text-slate-400 space-y-0.5 font-normal">
                        <div className="flex items-center gap-1 text-[9.5px] font-mono uppercase">
                          <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>Decline Reason: {evt.declineReason}</span>
                        </div>
                        {evt.declineNote && <p className="italic text-[10.5px] text-slate-400 pl-4">&ldquo;{evt.declineNote}&rdquo;</p>}
                      </div>
                    )}

                    {/* Timestamp */}
                    {evt.timestamp && (
                      <div className="text-[9px] text-slate-400 font-mono">
                        {new Date(evt.timestamp).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };


  // Stage 1 Content Renderer
  const renderStage1Content = () => (
    <div className="space-y-6">
          {/* 2. Target Opportunity Card (Collapsible, shown during Acknowledge & Negotiation) */}
          {!isStep2Done && (
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-sm overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setIsOpportunityOpen(!isOpportunityOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {is_owner ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    Opportunity You Posted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
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
                <div className="p-3 rounded-[3px] border border-slate-200 bg-slate-50 text-xs font-sans text-slate-800 flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-600" />
                  <div>
                    {is_owner ? (
                      <p>
                        <strong className="font-semibold text-slate-900">Your Opportunity:</strong> You created and posted this listing.{" "}
                        <span className="font-medium text-slate-950">{targetBusiness.company_name}</span> has requested to negotiate an exchange with you based on these terms.
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
                  <span className="px-2 py-0.5 rounded-[2px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
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
      )}

        {/* B. Current Status / Awaiting Partner Card */}
        {myAcknowledged && !otherAcknowledged && interest.status === "pending" && (
          <div className="bg-slate-50 border border-slate-300 rounded-[4px] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-200 text-slate-900 rounded-[3px] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-200/80 border border-slate-300 text-slate-900 text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
                      <Lock className="w-3 h-3 text-slate-700" /> AWAITING PARTNER
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    Waiting for {targetBusiness.company_name}
                  </h4>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    You’ve acknowledged the Relay exchange process. Exchange proposals and negotiation will unlock once {targetBusiness.company_name} acknowledges it too.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-xs font-medium text-slate-800">
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
                        ? "bg-slate-100 text-slate-600 cursor-not-allowed border border-slate-200"
                        : data?.can_follow_up
                        ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer shadow-sm"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
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
                    <span className="text-[10px] text-slate-500 font-mono">
                      Available after 2 hours
                    </span>
                  )}
                  {Boolean(interest.last_follow_up_at || data?.has_followed_up) && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      Reminder sent to partner
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Reliability policy expandable element */}
            <div className="border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={() => setShowReliabilityInfo(!showReliabilityInfo)}
                className="text-xs font-semibold text-slate-800 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>What happens if they don’t respond?</span>
                <span className="font-mono text-xs">{showReliabilityInfo ? "↓" : "→"}</span>
              </button>

              {showReliabilityInfo && (
                <div className="mt-3 p-4 bg-white border border-slate-200 rounded-[3px] space-y-2.5 text-xs text-slate-700 font-sans leading-relaxed">
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

      {/* 3. STEP 1: Process Acknowledgement Modal Popup (Only shown to counterparty if not acknowledged) */}
      <Dialog open={!myAcknowledged && !is_requester} onOpenChange={() => {}}>
        <DialogContent
          className="w-[calc(100vw-1.5rem)] sm:w-full sm:max-w-lg p-4 sm:p-6 bg-white border border-slate-200 shadow-2xl rounded-lg font-sans max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="space-y-1.5 border-b border-slate-100 pb-3 sm:pb-4 text-left">
            <div className="flex items-start gap-2.5 sm:gap-3 text-slate-900">
              <div className="p-2 sm:p-2.5 bg-slate-100 text-slate-900 rounded-md shrink-0 mt-0.5">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
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
            <div className="bg-slate-50 border border-slate-200 p-2.5 sm:p-3 rounded-md text-[10.5px] sm:text-[11px] text-slate-800 leading-relaxed font-sans flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
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
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-[3px] shadow-sm cursor-pointer transition-colors"
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


    </div>
  );

  // Stage 3 Content Renderer
  const renderStage3Content = () => (
    <>
      {/* 5. STEP 3: Final Exchange Terms Confirmation */}
      {isAgreementDraft && agreement && (
        <div className="bg-white border border-slate-200 rounded-[4px] p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 bg-slate-100 text-slate-900 rounded-[3px]">
              <FileText className="w-5 h-5 text-slate-900" />
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
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-[3px] space-y-4">
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
              <div className="p-3.5 bg-white border border-slate-200 rounded-[3px] space-y-1.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">
                  Opportunity Owner Provides
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  Access to opportunity: <strong className="font-semibold text-slate-900">{opportunity.title}</strong>
                  {opportunity.offer_text && (
                    <span className="block text-slate-600 mt-1">{opportunity.offer_text}</span>
                  )}
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-[3px] space-y-1.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">
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
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-[3px] text-[11.5px] text-slate-800 leading-relaxed font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <strong>Disclosure:</strong> Both businesses independently agree to the exchange terms. Relay facilitates the connection and records the agreed terms but does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either business.
            </div>
          </div>

          {/* Status & Confirmation CTA */}
          <div
            className={`rounded-[3px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border transition-all ${
              !myConfirmed || !otherConfirmed
                ? "bg-slate-50 border-slate-300 animate-pulse"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="text-xs space-y-1">
              <div className="font-semibold text-slate-800">
                {myConfirmed ? (
                  <span className="text-slate-900 inline-flex items-center gap-1.5 font-semibold">
                    <Check className="w-4 h-4 text-slate-900" /> You have confirmed these terms
                  </span>
                ) : (
                  <span className="text-slate-900 inline-flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-slate-700" /> Waiting for your confirmation
                  </span>
                )}
              </div>
              <div className="text-slate-500">
                {otherConfirmed ? (
                  <span className="text-slate-700 inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-900" /> {targetBusiness.company_name} has confirmed
                  </span>
                ) : (
                  <span className="text-slate-500 inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Waiting for {targetBusiness.company_name} to confirm
                  </span>
                )}
              </div>
            </div>

            {!myConfirmed && (
              <Button
                onClick={handleConfirmAgreement}
                disabled={loadingAction === "confirm"}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-[2px] cursor-pointer shrink-0"
              >
                {loadingAction === "confirm" ? "Confirming..." : "I Agree to These Exchange Terms"}
              </Button>
            )}
          </div>
        </div>
      )}


    </>
  );

  // Stage 4 Content Renderer
  const renderStage4Content = () => (
    <>
      {/* 6. STEP 4: Handshake & Reciprocal Contact Exchange */}
      {isAgreed && (
        <div className="space-y-6 font-sans">
          {/* Main Handshake Container Card */}
          <div className="bg-white border border-slate-200 rounded-[4px] p-5 sm:p-7 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-[3px] bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 text-white font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-[2px]">
                      <Share2 className="w-3 h-3 text-white" /> Step 4 · Handshake
                    </span>
                    {isHandshakeComplete && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-[2px]">
                        <Check className="w-3 h-3 text-slate-900 stroke-[3]" /> Shared
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                    Handshake & Contact Exchange
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose which contact details you want to exchange with <strong className="text-slate-800 font-semibold">{targetBusiness.company_name}</strong>.
                  </p>
                </div>
              </div>

              {/* Refresh Status Action */}
              <Button
                type="button"
                onClick={handleCheckStatus}
                disabled={isCheckingStatus}
                variant="outline"
                className="inline-flex items-center gap-1.5 h-8 px-3 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-mono text-[9.5px] font-bold uppercase tracking-wider rounded-[2px] cursor-pointer self-start sm:self-auto shadow-none transition-colors"
                title="Refresh exchange status from server"
              >
                <Clock className={`w-3.5 h-3.5 text-slate-600 ${isCheckingStatus ? "animate-spin" : ""}`} />
                {isCheckingStatus ? "Checking..." : "Refresh Status"}
              </Button>
            </div>

            {/* Compact Overall Explanation Note */}
            <div className="p-3.5 rounded-[3px] border border-slate-200 bg-slate-50 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
              <Lock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-slate-900 font-mono uppercase tracking-wider text-[10px] block mb-0.5">
                  RECIPROCAL PRIVACY RULE
                </strong>
                Each contact detail is exchanged separately. Your details remain private until both businesses complete the exchange.
              </div>
            </div>

            {/* CONTACT DETAILS LIST */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 font-bold block">
                    CONTACT DETAILS
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage direct bilateral exchange for each contact channel.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleOpenAddCustomModal}
                  variant="outline"
                  className="inline-flex items-center gap-1.5 h-8 px-3 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-mono text-[9.5px] font-bold uppercase tracking-wider rounded-[2px] cursor-pointer shadow-none transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-900" /> OTHERS
                </Button>
              </div>

              {/* Compact Contact Field Cards */}
              <div className="space-y-3">
                {/* 1. BUSINESS EMAIL CARD */}
                {(() => {
                  const myConsent = myConsents.find((c: any) => c.contact_field === "email");
                  const partnerConsent = incomingConsents.find((c: any) => c.contact_field === "email");
                  const partnerEmailRevealed = allowed_revealed_contacts?.email || null;
                  const isMutuallyShared =
                    (myConsent?.status === "accepted" && partnerConsent?.status === "accepted") ||
                    (Boolean(partnerEmailRevealed) && (myConsent?.status === "accepted" || Boolean(is_legacy_handshake))) ||
                    Boolean(is_legacy_handshake);

                  let status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined" =
                    "not_requested";

                  if (isMutuallyShared) {
                    status = "mutually_shared";
                  } else if (partnerConsent?.status === "requested" && myConsent?.status !== "declined") {
                    status = "incoming_request";
                  } else if (myConsent?.status === "requested") {
                    status = "requested_by_me";
                  } else if (myConsent?.status === "declined" || partnerConsent?.status === "declined") {
                    status = "declined";
                  }

                  const fieldData = {
                    key: "email",
                    name: "Business Email",
                    label: "Business Email",
                    type: "standard" as const,
                    myValue: myContacts.email,
                    partnerValue: partnerEmailRevealed,
                    status,
                  };

                  return (
                    <div
                      key="card-email"
                      className={`p-4 rounded-[3px] border transition-all ${
                        status === "mutually_shared"
                          ? "bg-slate-50/70 border-slate-200"
                          : status === "incoming_request"
                          ? "bg-slate-50 border-slate-900"
                          : status === "requested_by_me"
                          ? "bg-slate-50/40 border-slate-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-[2px] shrink-0 mt-0.5 ${
                              status === "mutually_shared"
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {status === "mutually_shared" ? (
                              <Check className="w-4 h-4 text-white stroke-[3]" />
                            ) : (
                              <Mail className="w-4 h-4 text-slate-700" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900">
                              BUSINESS EMAIL
                            </h5>

                            {status === "mutually_shared" ? (
                              <div className="space-y-0.5 text-xs font-mono">
                                <p className="text-slate-600 truncate">
                                  Your email: <strong className="text-slate-900">{myContacts.email || "—"}</strong>
                                </p>
                                <p className="text-slate-900 font-bold truncate">
                                  Partner: {partnerEmailRevealed}
                                </p>
                              </div>
                            ) : status === "incoming_request" ? (
                              <div className="text-xs text-slate-800 font-sans">
                                <span className="font-bold text-slate-950">
                                  Request from {targetBusiness.company_name}
                                </span>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-600 font-mono truncate">
                                {myContacts.email || (
                                  <span className="text-slate-400 italic">No email on profile</span>
                                )}
                              </p>
                            )}

                            {/* Status Indicator */}
                            <div className="pt-0.5">
                              {status === "mutually_shared" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  ✓ SHARED
                                </span>
                              ) : status === "requested_by_me" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Waiting for partner
                                </span>
                              ) : status === "incoming_request" ? (
                                <span className="font-mono text-[8.5px] text-slate-500 font-sans">
                                  Wants to exchange email with you
                                </span>
                              ) : status === "declined" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Declined
                                </span>
                              ) : (
                                <span className="font-mono text-[8.5px] uppercase text-slate-400 font-bold">
                                  Not requested
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MANAGE Button */}
                        <div className="self-end sm:self-auto shrink-0">
                          <Button
                            type="button"
                            onClick={() => handleOpenManageSheet(fieldData)}
                            variant="outline"
                            className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold tracking-wider border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900 rounded-[2px] transition-colors cursor-pointer shadow-none"
                          >
                            MANAGE
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. PHONE NUMBER CARD */}
                {(() => {
                  const myConsent = myConsents.find((c: any) => c.contact_field === "phone");
                  const partnerConsent = incomingConsents.find((c: any) => c.contact_field === "phone");
                  const partnerPhoneRevealed = allowed_revealed_contacts?.phone || null;
                  const isMutuallyShared =
                    (myConsent?.status === "accepted" && partnerConsent?.status === "accepted") ||
                    (Boolean(partnerPhoneRevealed) && myConsent?.status === "accepted");

                  let status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined" =
                    "not_requested";

                  if (isMutuallyShared) {
                    status = "mutually_shared";
                  } else if (partnerConsent?.status === "requested" && myConsent?.status !== "declined") {
                    status = "incoming_request";
                  } else if (myConsent?.status === "requested") {
                    status = "requested_by_me";
                  } else if (myConsent?.status === "declined" || partnerConsent?.status === "declined") {
                    status = "declined";
                  }

                  const fieldData = {
                    key: "phone",
                    name: "Phone Number",
                    label: "Phone Number",
                    type: "standard" as const,
                    myValue: myContacts.phone,
                    partnerValue: partnerPhoneRevealed,
                    status,
                  };

                  return (
                    <div
                      key="card-phone"
                      className={`p-4 rounded-[3px] border transition-all ${
                        status === "mutually_shared"
                          ? "bg-slate-50/70 border-slate-200"
                          : status === "incoming_request"
                          ? "bg-slate-50 border-slate-900"
                          : status === "requested_by_me"
                          ? "bg-slate-50/40 border-slate-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-[2px] shrink-0 mt-0.5 ${
                              status === "mutually_shared"
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {status === "mutually_shared" ? (
                              <Check className="w-4 h-4 text-white stroke-[3]" />
                            ) : (
                              <Phone className="w-4 h-4 text-slate-700" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900">
                              PHONE NUMBER
                            </h5>

                            {status === "mutually_shared" ? (
                              <div className="space-y-0.5 text-xs font-mono">
                                <p className="text-slate-600 truncate">
                                  Your phone: <strong className="text-slate-900">{myContacts.phone || "—"}</strong>
                                </p>
                                <p className="text-slate-900 font-bold truncate">
                                  Partner: {partnerPhoneRevealed}
                                </p>
                              </div>
                            ) : status === "incoming_request" ? (
                              <div className="text-xs text-slate-800 font-sans">
                                <span className="font-bold text-slate-950">
                                  Request from {targetBusiness.company_name}
                                </span>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-600 font-mono truncate">
                                {myContacts.phone || (
                                  <span className="text-slate-400 italic">No phone added</span>
                                )}
                              </p>
                            )}

                            {/* Status Indicator */}
                            <div className="pt-0.5">
                              {status === "mutually_shared" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  ✓ SHARED
                                </span>
                              ) : status === "requested_by_me" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Waiting for partner
                                </span>
                              ) : status === "incoming_request" ? (
                                <span className="font-mono text-[8.5px] text-slate-500 font-sans">
                                  Wants to exchange phone with you
                                </span>
                              ) : status === "declined" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Declined
                                </span>
                              ) : (
                                <span className="font-mono text-[8.5px] uppercase text-slate-400 font-bold">
                                  Not requested
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MANAGE Button */}
                        <div className="self-end sm:self-auto shrink-0">
                          <Button
                            type="button"
                            onClick={() => handleOpenManageSheet(fieldData)}
                            variant="outline"
                            className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold tracking-wider border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900 rounded-[2px] transition-colors cursor-pointer shadow-none"
                          >
                            MANAGE
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. LINKEDIN CARD */}
                {(() => {
                  const myConsent = myConsents.find((c: any) => c.contact_field === "linkedin");
                  const partnerConsent = incomingConsents.find((c: any) => c.contact_field === "linkedin");
                  const partnerLinkedinRevealed = allowed_revealed_contacts?.linkedin || null;
                  const isMutuallyShared =
                    (myConsent?.status === "accepted" && partnerConsent?.status === "accepted") ||
                    (Boolean(partnerLinkedinRevealed) && myConsent?.status === "accepted");

                  let status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined" =
                    "not_requested";

                  if (isMutuallyShared) {
                    status = "mutually_shared";
                  } else if (partnerConsent?.status === "requested" && myConsent?.status !== "declined") {
                    status = "incoming_request";
                  } else if (myConsent?.status === "requested") {
                    status = "requested_by_me";
                  } else if (myConsent?.status === "declined" || partnerConsent?.status === "declined") {
                    status = "declined";
                  }

                  const fieldData = {
                    key: "linkedin",
                    name: "LinkedIn Profile",
                    label: "LinkedIn Profile",
                    type: "standard" as const,
                    myValue: myContacts.linkedin,
                    partnerValue: partnerLinkedinRevealed,
                    status,
                  };

                  return (
                    <div
                      key="card-linkedin"
                      className={`p-4 rounded-[3px] border transition-all ${
                        status === "mutually_shared"
                          ? "bg-slate-50/70 border-slate-200"
                          : status === "incoming_request"
                          ? "bg-slate-50 border-slate-900"
                          : status === "requested_by_me"
                          ? "bg-slate-50/40 border-slate-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-[2px] shrink-0 mt-0.5 ${
                              status === "mutually_shared"
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {status === "mutually_shared" ? (
                              <Check className="w-4 h-4 text-white stroke-[3]" />
                            ) : (
                              <Linkedin className="w-4 h-4 text-slate-700" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900">
                              LINKEDIN PROFILE
                            </h5>

                            {status === "mutually_shared" ? (
                              <div className="space-y-0.5 text-xs font-mono">
                                <p className="text-slate-600 truncate">
                                  Your LinkedIn: <strong className="text-slate-900">{myContacts.linkedin || "—"}</strong>
                                </p>
                                <p className="text-slate-900 font-bold truncate">
                                  Partner: {partnerLinkedinRevealed}
                                </p>
                              </div>
                            ) : status === "incoming_request" ? (
                              <div className="text-xs text-slate-800 font-sans">
                                <span className="font-bold text-slate-950">
                                  Request from {targetBusiness.company_name}
                                </span>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-600 font-mono truncate">
                                {myContacts.linkedin || (
                                  <span className="text-slate-400 italic">No LinkedIn profile added</span>
                                )}
                              </p>
                            )}

                            {/* Status Indicator */}
                            <div className="pt-0.5">
                              {status === "mutually_shared" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  ✓ SHARED
                                </span>
                              ) : status === "requested_by_me" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Waiting for partner
                                </span>
                              ) : status === "incoming_request" ? (
                                <span className="font-mono text-[8.5px] text-slate-500 font-sans">
                                  Wants to exchange LinkedIn with you
                                </span>
                              ) : status === "declined" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Declined
                                </span>
                              ) : (
                                <span className="font-mono text-[8.5px] uppercase text-slate-400 font-bold">
                                  Not requested
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MANAGE Button */}
                        <div className="self-end sm:self-auto shrink-0">
                          <Button
                            type="button"
                            onClick={() => handleOpenManageSheet(fieldData)}
                            variant="outline"
                            className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold tracking-wider border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900 rounded-[2px] transition-colors cursor-pointer shadow-none"
                          >
                            MANAGE
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 4. CUSTOM CONTACT CARDS (Others) */}
                {(myContacts.custom || []).map((customItem: any) => {
                  const fieldKey = `custom:${customItem.id}`;
                  const myConsent = myConsents.find((c: any) => c.contact_field === fieldKey);
                  const partnerRevealedCustom = (allowed_revealed_contacts?.custom || []).find(
                    (c: any) => c.label.toLowerCase() === customItem.label.toLowerCase() || c.id === customItem.id
                  );
                  const partnerValue = partnerRevealedCustom?.value || null;
                  const isMutuallyShared = Boolean(partnerValue) && myConsent?.status === "accepted";

                  let status: "not_requested" | "requested_by_me" | "incoming_request" | "mutually_shared" | "declined" =
                    "not_requested";

                  if (isMutuallyShared) {
                    status = "mutually_shared";
                  } else if (myConsent?.status === "requested") {
                    status = "requested_by_me";
                  } else if (myConsent?.status === "declined") {
                    status = "declined";
                  }

                  const fieldData = {
                    key: fieldKey,
                    name: customItem.label,
                    label: customItem.label,
                    type: "custom" as const,
                    myValue: customItem.value,
                    partnerValue,
                    status,
                    customId: customItem.id,
                  };

                  return (
                    <div
                      key={customItem.id}
                      className={`p-4 rounded-[3px] border transition-all ${
                        status === "mutually_shared"
                          ? "bg-slate-50/70 border-slate-200"
                          : status === "requested_by_me"
                          ? "bg-slate-50/40 border-slate-300"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-[2px] shrink-0 mt-0.5 ${
                              status === "mutually_shared"
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {status === "mutually_shared" ? (
                              <Check className="w-4 h-4 text-white stroke-[3]" />
                            ) : (
                              <Sparkles className="w-4 h-4 text-slate-700" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900">
                                {customItem.label}
                              </h5>
                              {!isMutuallyShared && status !== "requested_by_me" && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Remove "${customItem.label}"?`)) {
                                      handleDeleteCustomContact(customItem.id);
                                    }
                                  }}
                                  className="text-slate-400 hover:text-slate-800 p-0.5"
                                  title="Delete Custom Channel"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            {status === "mutually_shared" ? (
                              <div className="space-y-0.5 text-xs font-mono">
                                <p className="text-slate-600 truncate">
                                  Your {customItem.label}: <strong className="text-slate-900">{customItem.value || "—"}</strong>
                                </p>
                                <p className="text-slate-900 font-bold truncate">
                                  Partner: {partnerValue}
                                </p>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-600 font-mono truncate">
                                {customItem.value}
                              </p>
                            )}

                            {/* Status Indicator */}
                            <div className="pt-0.5">
                              {status === "mutually_shared" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  ✓ SHARED
                                </span>
                              ) : status === "requested_by_me" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Waiting for partner
                                </span>
                              ) : status === "declined" ? (
                                <span className="font-mono text-[8px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-[2px]">
                                  Declined
                                </span>
                              ) : (
                                <span className="font-mono text-[8.5px] uppercase text-slate-400 font-bold">
                                  Not requested
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* MANAGE Button */}
                        <div className="self-end sm:self-auto shrink-0">
                          <Button
                            type="button"
                            onClick={() => handleOpenManageSheet(fieldData)}
                            variant="outline"
                            className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold tracking-wider border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900 rounded-[2px] transition-colors cursor-pointer shadow-none"
                          >
                            MANAGE
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* 5. INCOMING CUSTOM REQUESTS FROM PARTNER */}
                {pendingIncomingConsentsList
                  .filter((req) => req.contact_field.startsWith("custom:"))
                  .map((req) => {
                    const fieldData = {
                      key: req.contact_field,
                      name: req.label || "Custom Contact",
                      label: req.label || "Custom Contact",
                      type: "custom" as const,
                      myValue: null,
                      partnerValue: null,
                      status: "incoming_request" as const,
                    };

                    return (
                      <div
                        key={req.id}
                        className="p-4 rounded-[3px] border border-slate-900 bg-slate-50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="p-2 rounded-[2px] bg-slate-200 text-slate-800 shrink-0 mt-0.5">
                              <EyeOff className="w-4 h-4 text-slate-800" />
                            </div>
                            <div className="space-y-1 min-w-0">
                              <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900">
                                {req.label}
                              </h5>
                              <p className="text-xs text-slate-800 font-sans">
                                <span className="font-bold text-slate-950">
                                  Request from {targetBusiness.company_name}
                                </span>
                              </p>
                              <span className="font-mono text-[8.5px] text-slate-500 font-sans block">
                                Wants to exchange {req.label} with you
                              </span>
                            </div>
                          </div>

                          <div className="self-end sm:self-auto shrink-0">
                            <Button
                              type="button"
                              onClick={() => handleOpenManageSheet(fieldData)}
                              variant="outline"
                              className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold tracking-wider border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-900 rounded-[2px] transition-colors cursor-pointer shadow-none"
                            >
                              MANAGE
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* AGREED EXCHANGE TERMS REFERENCE */}
            {agreement && (
              <div className="pt-4 border-t border-slate-200">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-[3px] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">
                      Agreed Exchange Terms
                    </span>
                    <span className="font-mono text-[8px] uppercase font-bold text-slate-800 bg-slate-200/80 px-1.5 py-0.5 rounded-[2px]">
                      Confirmed
                    </span>
                  </div>
                  <p className="font-bold text-slate-900">
                    {getExchangeTypeLabel(agreement.exchange_type)}
                    {agreement.revenue_percentage != null && ` · ${agreement.revenue_percentage}% Revenue Share`}
                    {agreement.fixed_amount != null && ` · ${agreement.currency || "USD"} ${agreement.fixed_amount.toLocaleString()}`}
                  </p>
                  <p className="text-slate-700 leading-relaxed font-sans">
                    {agreement.exchange_details}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANAGE CONTACT SHEET (Desktop: Right Sheet | Mobile: Bottom Sheet) */}
      <Sheet open={Boolean(activeManageField)} onOpenChange={(open) => !open && setActiveManageField(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-white border-l border-slate-200 p-0 font-sans flex flex-col shadow-2xl overflow-y-auto max-h-screen"
        >
          {activeManageField && (
            <div className="flex flex-col h-full">
              {/* Sheet Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400 block mb-0.5">
                      Contact Exchange
                    </span>
                    <SheetTitle className="font-display font-bold text-lg text-slate-900">
                      {activeManageField.name}
                    </SheetTitle>
                  </div>
                  {activeManageField.status === "mutually_shared" && (
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-[2px]">
                      ✓ Shared
                    </span>
                  )}
                  {activeManageField.status === "requested_by_me" && (
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[2px]">
                      Waiting
                    </span>
                  )}
                  {activeManageField.status === "incoming_request" && (
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded-[2px]">
                      Incoming Request
                    </span>
                  )}
                  {activeManageField.status === "declined" && (
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[2px]">
                      Declined
                    </span>
                  )}
                </div>
                <SheetDescription className="text-xs text-slate-500 font-sans mt-1">
                  Exchange with <strong className="text-slate-800 font-medium">{targetBusiness.company_name}</strong>
                </SheetDescription>
              </div>

              {/* Sheet Body by State */}
              <div className="p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto">
                {/* 1. NOT REQUESTED STATE */}
                {activeManageField.status === "not_requested" && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="manage-input"
                        className="font-mono text-[9.5px] uppercase tracking-wider text-slate-700 font-bold block"
                      >
                        Your {activeManageField.name}
                      </Label>
                      <Input
                        id="manage-input"
                        value={manageInputValue}
                        onChange={(e) => setManageInputValue(e.target.value)}
                        placeholder={`Enter your ${activeManageField.name.toLowerCase()}`}
                        className="h-10 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-mono"
                      />
                      <p className="text-[11px] text-slate-500 font-sans">
                        Your detail remains private until {targetBusiness.company_name} completes the exchange.
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={handleRequestExchangeFromSheet}
                      disabled={loadingAction === "sheet-request-exchange" || !manageInputValue.trim()}
                      className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer shadow-sm"
                    >
                      {loadingAction === "sheet-request-exchange"
                        ? "Requesting..."
                        : `Request ${activeManageField.name} Exchange`}
                    </Button>
                  </div>
                )}

                {/* 2. REQUESTED BY ME (WAITING FOR PARTNER) */}
                {activeManageField.status === "requested_by_me" && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                        Your {activeManageField.name}
                      </span>
                      <p className="text-xs font-mono font-bold text-slate-900 bg-slate-50 p-3 rounded-[2px] border border-slate-200 truncate">
                        {activeManageField.myValue || manageInputValue || "Provided"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                        Status
                      </span>
                      <p className="text-xs text-slate-600 font-sans">
                        Waiting for <strong className="text-slate-800 font-medium">{targetBusiness.company_name}</strong> to approve and share their {activeManageField.name.toLowerCase()}.
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={handleRefreshManageStatus}
                      disabled={isCheckingStatus}
                      variant="outline"
                      className="w-full h-10 border-slate-300 hover:bg-slate-100 text-slate-900 font-mono text-[9.5px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer"
                    >
                      <Clock className={`w-3.5 h-3.5 mr-2 ${isCheckingStatus ? "animate-spin" : ""}`} />
                      {isCheckingStatus ? "Checking..." : "Refresh Status"}
                    </Button>
                  </div>
                )}

                {/* 3. INCOMING REQUEST (REQUEST RECEIVED) */}
                {activeManageField.status === "incoming_request" && (
                  <div className="space-y-5">
                    <p className="text-xs text-slate-700 font-sans">
                      <strong className="text-slate-900 font-semibold">{targetBusiness.company_name}</strong> wants to exchange {activeManageField.name.toLowerCase()} with you.
                    </p>

                    <div className="space-y-2">
                      <Label
                        htmlFor="manage-approve-input"
                        className="font-mono text-[9.5px] uppercase tracking-wider text-slate-700 font-bold block"
                      >
                        Your {activeManageField.name}
                      </Label>
                      <Input
                        id="manage-approve-input"
                        value={manageInputValue}
                        onChange={(e) => setManageInputValue(e.target.value)}
                        placeholder={`Enter your ${activeManageField.name.toLowerCase()}`}
                        className="h-10 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-mono"
                      />
                      <p className="text-[11px] text-slate-500 font-sans">
                        Approving will reveal both your and {targetBusiness.company_name}&apos;s {activeManageField.name.toLowerCase()}.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <Button
                        type="button"
                        onClick={handleApproveExchangeFromSheet}
                        disabled={loadingAction === "sheet-approve-exchange" || !manageInputValue.trim()}
                        className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer shadow-none animate-pulse transition-all"
                      >
                        {loadingAction === "sheet-approve-exchange"
                          ? "Approving..."
                          : `Approve & Exchange ${activeManageField.name}`}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleDeclineExchangeFromSheet}
                        disabled={loadingAction === "sheet-decline-exchange"}
                        variant="ghost"
                        className="w-full h-9 text-slate-600 hover:text-slate-900 font-mono text-[9px] uppercase font-bold tracking-wider rounded-[2px] cursor-pointer"
                      >
                        Decline Request
                      </Button>
                    </div>
                  </div>
                )}

                {/* 4. MUTUALLY SHARED */}
                {activeManageField.status === "mutually_shared" && (
                  <div className="space-y-5">
                    {/* Partner's Detail */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                        {targetBusiness.company_name}&apos;s {activeManageField.name}
                      </span>
                      <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-[2px] space-y-3">
                        <p className="text-sm font-mono font-extrabold text-slate-900 break-all select-all">
                          {activeManageField.partnerValue || "Verified Shared"}
                        </p>

                        {/* Quick 1-Click Action Buttons */}
                        {activeManageField.partnerValue && (
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                            <Button
                              type="button"
                              onClick={() => copyToClipboard(activeManageField.partnerValue!, activeManageField.name)}
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 font-mono text-[9px] uppercase font-bold text-slate-800 border-slate-300"
                            >
                              {copiedField === activeManageField.name ? (
                                <>
                                  <Check className="w-3.5 h-3.5 mr-1 text-slate-900" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                                </>
                              )}
                            </Button>

                            {activeManageField.key === "email" && (
                              <a
                                href={`mailto:${activeManageField.partnerValue}?subject=${encodeURIComponent(
                                  `The Relay Handshake: ${opportunity.title}`
                                )}`}
                                className="inline-flex items-center justify-center h-8 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]"
                              >
                                Email Now
                              </a>
                            )}

                            {activeManageField.key === "phone" && (
                              <a
                                href={`tel:${activeManageField.partnerValue}`}
                                className="inline-flex items-center justify-center h-8 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]"
                              >
                                Call Now
                              </a>
                            )}

                            {(activeManageField.key === "linkedin" ||
                              activeManageField.partnerValue.startsWith("http://") ||
                              activeManageField.partnerValue.startsWith("https://")) && (
                              <a
                                href={activeManageField.partnerValue}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center h-8 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]"
                              >
                                Open Link
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Your Detail */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                        Your {activeManageField.name}
                      </span>
                      <p className="text-xs font-mono text-slate-700 p-2.5 bg-slate-50 rounded-[2px] border border-slate-200 truncate">
                        {activeManageField.myValue || "—"}
                      </p>
                    </div>
                  </div>
                )}

                {/* 5. DECLINED STATE */}
                {activeManageField.status === "declined" && (
                  <div className="space-y-5">
                    <p className="text-xs text-slate-600 font-sans">
                      This exchange request was declined. You can initiate a new request whenever ready.
                    </p>

                    <div className="space-y-2">
                      <Label
                        htmlFor="manage-input-declined"
                        className="font-mono text-[9.5px] uppercase tracking-wider text-slate-700 font-bold block"
                      >
                        Your {activeManageField.name}
                      </Label>
                      <Input
                        id="manage-input-declined"
                        value={manageInputValue}
                        onChange={(e) => setManageInputValue(e.target.value)}
                        placeholder={`Enter your ${activeManageField.name.toLowerCase()}`}
                        className="h-10 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-mono"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={handleRequestExchangeFromSheet}
                      disabled={loadingAction === "sheet-request-exchange" || !manageInputValue.trim()}
                      className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer shadow-sm"
                    >
                      {loadingAction === "sheet-request-exchange"
                        ? "Requesting..."
                        : `Request ${activeManageField.name} Again`}
                    </Button>
                  </div>
                )}
              </div>

              {/* Sheet Footer */}
              <div className="p-4 border-t border-slate-100 shrink-0 flex items-center justify-end bg-slate-50/50">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveManageField(null)}
                  className="h-8 px-4 font-mono text-[9.5px] uppercase font-bold text-slate-600 rounded-[2px]"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );

  return (
    <div className="space-y-6 font-sans">
      {/* 0. Deal Header Bar & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-bold text-slate-900">Exchange #{interest.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {targetBusiness.company_name} <span className="text-slate-400 font-normal">vs</span> {myBusiness.company_name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white uppercase tracking-wider">
              {currentStepName}
            </span>
          </div>
        </div>

        {/* Top Right View Mode Switcher via Design System ExecutiveTabs */}
        <div className="self-start sm:self-auto">
          <ExecutiveTabs
            variant="pill"
            activeTab={viewMode}
            onTabChange={(tabId) => handleViewModeChange(tabId as "default" | "simplified")}
            tabs={[
              {
                id: "default",
                label: "Default View",
                icon: <LayoutGrid className="w-3.5 h-3.5" />,
              },
              {
                id: "simplified",
                label: "Simplified View",
                icon: <Columns3 className="w-3.5 h-3.5" />,
              },
            ]}
          />
        </div>
      </div>

      {/* Main View Renderer */}
      {viewMode === "default" ? (
        <ExchangeHubDefaultView
          data={data}
          myBusinessId={effectiveMyBizId}
          rounds={rounds}
          activeRound={activeRound}
          selectedDrawerRound={selectedDrawerRound}
          onSelectDrawerRound={setSelectedDrawerRound}
          onAcceptProposal={handleAcceptFromView}
          onOpenCounterProposalModal={() => setShowProposalForm(true)}
          onOpenDeclineModal={() => setShowDeclineModal(true)}
          onWithdrawProposal={handleWithdrawProposal}
          onQuickDispatch={handleQuickDispatch}
          loadingAction={loadingAction}
          isStep1Done={isStep1Done}
          isStep2Done={isStep2Done}
          isStep3Done={isStep3Done}
          isStep4Done={isStep4Done}
          currentStep={currentStep}
          handleAcknowledge={handleAcknowledge}
          handleFollowUp={handleFollowUp}
          renderStage1Content={renderStage1Content}
          renderStage3Content={renderStage3Content}
          renderStage4Content={renderStage4Content}
        />
      ) : (
        <ExchangeHubSimplifiedView
          data={data}
          myBusinessId={effectiveMyBizId}
          rounds={rounds}
          activeRound={activeRound}
          onAcceptProposal={handleAcceptFromView}
          onOpenCounterProposalModal={() => setShowProposalForm(true)}
          onOpenDeclineModal={() => setShowDeclineModal(true)}
          onWithdrawProposal={handleWithdrawProposal}
          loadingAction={loadingAction}
          isStep1Done={isStep1Done}
          isStep2Done={isStep2Done}
          isStep3Done={isStep3Done}
          isStep4Done={isStep4Done}
          currentStep={currentStep}
          handleAcknowledge={handleAcknowledge}
          handleFollowUp={handleFollowUp}
          renderStage1Content={renderStage1Content}
          renderStage3Content={renderStage3Content}
          renderStage4Content={renderStage4Content}
        />
      )}

      {/* Proposal / Counter-Proposal Modal */}
      {(() => {
        const latestRoundData = rounds && rounds.length > 0 ? rounds[rounds.length - 1] : null;
        const prefilledTerms =
          latestRoundData?.narrative ||
          (activeProposal
            ? activeProposal.exchange_details
            : interest.proposed_terms || interest.message || opportunity?.offer_text || "");
        const prefilledValCats =
          latestRoundData?.valueCategories && latestRoundData.valueCategories.length > 0
            ? latestRoundData.valueCategories
            : [opportunity?.category || "Distribution & Sales"];
        const prefilledDelMethods =
          latestRoundData?.deliveryMethods && latestRoundData.deliveryMethods.length > 0
            ? latestRoundData.deliveryMethods.map((dm: any) =>
                typeof dm === "string" ? dm : dm?.label || dm?.name || "Direct Reseller / Partner"
              )
            : ["Direct Reseller / Partner"];
        const prefilledHighlights =
          latestRoundData?.highlightedTerms && latestRoundData.highlightedTerms.length > 0
            ? latestRoundData.highlightedTerms
            : [];

        return (
          <ExpressInterestModal
            isOpen={showProposalForm}
            onClose={() => setShowProposalForm(false)}
            mode={activeProposal ? "counter_proposal" : "propose_terms"}
            proposalVersion={activeProposal ? activeProposal.version + 1 : 1}
            title={
              activeProposal
                ? "Propose Counter-Offer Terms"
                : is_owner
                ? "Propose Exchange Terms"
                : "Propose Exchange Terms"
            }
            initialProposedTerms={prefilledTerms}
            initialValueCategories={prefilledValCats}
            initialDeliveryMethods={prefilledDelMethods}
            initialHighlightedTerms={prefilledHighlights}
            opportunity={{
              id: opportunity.id,
              opportunity_number: opportunity.opportunity_number || "RY",
              title: opportunity.title,
              category: opportunity.category,
              offer_text:
                opportunity.offer_text ||
                (activeProposal ? activeProposal.exchange_details : interest.proposed_terms),
              description: opportunity.description,
              company: targetBusiness.company_name,
              business: {
                company_name: targetBusiness.company_name,
                name: targetBusiness.company_name,
                status: targetBusiness.status,
              },
              industry: targetBusiness.industry,
              location: targetBusiness.hq_location,
            }}
            counterpartyName={targetBusiness.company_name}
            customSubmitHandler={async (payload) => {
              setLoadingAction("proposal");
              try {
                await createExchangeProposal({
                  data: {
                    interest_id: interest.id,
                    exchange_type: (payload.exchange_type as ExchangeType) || "revenue_share",
                    exchange_details: payload.proposed_terms || payload.message,
                    additional_terms: JSON.stringify({
                      value_categories: payload.value_categories,
                      delivery_methods: payload.delivery_methods,
                      highlighted_terms: payload.highlighted_terms,
                    }),
                  },
                });
                executiveToast.success("Proposal Transmitted", {
                  badge: activeProposal
                    ? `Counter-Proposal v${activeProposal.version + 1}`
                    : "Proposal Submitted",
                  description: `Your exchange terms have been transmitted to ${targetBusiness.company_name}.`,
                });
                await onRefresh();
                window.dispatchEvent(new Event("relay:interest"));
              } catch (err: any) {
                executiveToast.danger("Proposal Error", {
                  badge: "Submission Failed",
                  description: err.message || "Failed to submit proposal.",
                });
                throw err;
              } finally {
                setLoadingAction(null);
              }
            }}
            onSuccess={async () => {
              await onRefresh();
              window.dispatchEvent(new Event("relay:interest"));
            }}
          />
        );
      })()}

      {/* Decline Proposal / Offer Modal using Official Design System Modal */}
      <Modal
        open={showDeclineModal}
        onOpenChange={(open) => {
          setShowDeclineModal(open);
          if (!open) setDeclineNote("");
        }}
        maxWidth="max-w-[500px]"
        title="Decline Exchange Proposal"
        description={`Specify a reason for declining this proposal. This record is logged bilaterally with ${targetBusiness?.company_name || "the counterparty"}.`}
        primaryAction={{
          label:
            loadingAction?.startsWith("respond-decline") || loadingAction === "decline-pitch"
              ? "Declining..."
              : "Confirm Decline",
          variant: "destructive",
          loading: Boolean(
            loadingAction?.startsWith("respond-decline") || loadingAction === "decline-pitch"
          ),
          disabled: Boolean(loadingAction),
          onClick: handleConfirmDeclineModal,
        }}
        secondaryAction={{
          label: "Cancel",
          disabled: Boolean(loadingAction),
          onClick: () => {
            setShowDeclineModal(false);
            setDeclineNote("");
          },
        }}
      >
        <div className="space-y-4">
          {/* Reason Field */}
          <div className="space-y-1.5">
            <Label required>Primary Decline Reason</Label>
            <Select
              value={declineReason}
              onValueChange={(val) => setDeclineReason(val as DeclineReason)}
            >
              <SelectTrigger focusAccent="black" className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valuation_mismatch">
                  Commercial terms / Valuation mismatch
                </SelectItem>
                <SelectItem value="exchange_type_unsuitable">
                  Not looking for this exchange type right now
                </SelectItem>
                <SelectItem value="timeline_conflict">Timeline / Capacity conflict</SelectItem>
                <SelectItem value="scope_unclear">Exchange scope needs more clarity</SelectItem>
                <SelectItem value="other">Other commercial reason</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clarification Note Field */}
          <div className="space-y-1.5">
            <Label>Optional Clarification Note</Label>
            <Textarea
              focusAccent="black"
              rows={3}
              placeholder="Explain what terms would make this proposal viable, or reasons for declining..."
              value={declineNote}
              onChange={(e) => setDeclineNote(e.target.value)}
            />
            <p className="text-[11px] text-[#64748B] font-sans">
              Provide context to help your partner adjust terms in a future round if applicable.
            </p>
          </div>
        </div>
      </Modal>

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
                      ? "bg-slate-50 border-slate-200 text-slate-900"
                      : s.isActive
                      ? "bg-slate-50 border-slate-900 text-slate-900 shadow-xs ring-1 ring-slate-900/20"
                      : "bg-slate-50/40 border-slate-100 text-slate-400 opacity-50"
                  }`}
                >
                  {/* Step Icon / Circle */}
                  <div className="shrink-0 mt-0.5">
                    {s.isDone ? (
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    ) : s.isActive ? (
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
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
                        className={`font-mono text-xs uppercase tracking-wider ${
                          s.isDone
                            ? "text-slate-900 font-bold"
                            : s.isActive
                            ? "text-slate-900 font-extrabold"
                            : "text-slate-400 font-bold"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`font-mono text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-[2px] ${
                          s.isDone
                            ? "bg-slate-100 text-slate-800 border border-slate-200"
                            : s.isActive
                            ? "bg-slate-900 text-white"
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
          </div>
        </DrawerContent>
      </Drawer>

      {/* Add / Edit Custom Contact Modal */}
      <Dialog open={isCustomModalOpen} onOpenChange={setIsCustomModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-[4px] font-sans p-5 sm:p-6">
          <DialogHeader className="border-b border-slate-100 pb-3 text-left">
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400 block">
              Contact Detail
            </span>
            <DialogTitle className="font-display font-bold text-base text-slate-900">
              {editingCustomId ? "EDIT CONTACT DETAIL" : "ADD CONTACT DETAIL"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans mt-0.5">
              Add another contact detail you'd like to share.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCustomContact} className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="custom-label" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                LABEL <span className="text-slate-900">*</span>
              </Label>
              <Input
                id="custom-label"
                placeholder="e.g. WhatsApp, Calendly, Skype, Office Address"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                maxLength={100}
                required
                className="h-9 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="custom-value" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                VALUE <span className="text-slate-900">*</span>
              </Label>
              <Textarea
                id="custom-value"
                placeholder="e.g. +91 XXXXX XXXXX, https://calendly.com/example, etc."
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                maxLength={1000}
                rows={3}
                required
                className="text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-sans resize-none"
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-[2px] text-[11px] text-slate-600 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <span>
                Selecting a detail only sends a sharing request. The other business must approve it before the detail is shared.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCustomModalOpen(false)}
                className="h-9 px-4 font-mono text-[9.5px] uppercase font-bold text-slate-600 rounded-[2px]"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={loadingAction === "save-custom-contact" || !customLabel.trim() || !customValue.trim()}
                className="h-9 px-5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer"
              >
                {loadingAction === "save-custom-contact" ? "Saving..." : editingCustomId ? "UPDATE DETAIL" : "ADD DETAIL"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add / Edit Phone Modal */}
      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-[4px] font-sans p-5 sm:p-6">
          <DialogHeader className="border-b border-slate-100 pb-3 text-left">
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400 block">
              Business Profile
            </span>
            <DialogTitle className="font-display font-bold text-base text-slate-900">
              {myContacts.phone ? "Edit Phone Number" : "Add Phone Number"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans mt-0.5">
              Update your business profile contact phone number.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePhone} className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="profile-phone" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                Phone Number <span className="text-slate-900">*</span>
              </Label>
              <Input
                id="profile-phone"
                placeholder="e.g. +1 (555) 234-5678"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                maxLength={50}
                required
                className="h-9 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsPhoneModalOpen(false)}
                className="h-9 px-4 font-mono text-[9.5px] uppercase font-bold text-slate-600 rounded-[2px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loadingAction === "save-phone" || !phoneInput.trim()}
                className="h-9 px-5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer"
              >
                {loadingAction === "save-phone" ? "Saving..." : "Save Phone Number"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add / Edit LinkedIn Modal */}
      <Dialog open={isLinkedinModalOpen} onOpenChange={setIsLinkedinModalOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-[4px] font-sans p-5 sm:p-6">
          <DialogHeader className="border-b border-slate-100 pb-3 text-left">
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400 block">
              Business Profile
            </span>
            <DialogTitle className="font-display font-bold text-base text-slate-900">
              {myContacts.linkedin ? "Edit LinkedIn URL" : "Add LinkedIn URL"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans mt-0.5">
              Update your company or executive LinkedIn profile URL.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveLinkedin} className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="profile-linkedin" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 font-bold block">
                LinkedIn URL <span className="text-slate-900">*</span>
              </Label>
              <Input
                id="profile-linkedin"
                placeholder="https://linkedin.com/company/yourcompany"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                required
                className="h-9 text-xs rounded-[2px] border-slate-300 focus:border-slate-900 font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLinkedinModalOpen(false)}
                className="h-9 px-4 font-mono text-[9.5px] uppercase font-bold text-slate-600 rounded-[2px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loadingAction === "save-linkedin" || !linkedinInput.trim()}
                className="h-9 px-5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9.5px] uppercase tracking-wider font-bold rounded-[2px] cursor-pointer"
              >
                {loadingAction === "save-linkedin" ? "Saving..." : "Save LinkedIn"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

