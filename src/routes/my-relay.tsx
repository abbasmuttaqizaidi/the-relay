import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { getMyOpportunities } from "../functions/getMyOpportunities";
import { createOpportunity } from "../functions/createOpportunity";
import { updateOpportunity } from "../functions/updateOpportunity";
import { closeOpportunity } from "../functions/closeOpportunity";
import { countSavedOpportunities } from "../functions/countSavedOpportunities";
import { getSavedOpportunities } from "../functions/getSavedOpportunities";
import { removeSavedOpportunity } from "../functions/removeSavedOpportunity";
import { getIncomingRequests } from "../functions/getIncomingRequests";
import { getSentRequests } from "../functions/getSentRequests";
import { acceptInterest } from "../functions/acceptInterest";
import { declineInterest } from "../functions/declineInterest";
import { withdrawInterest } from "../functions/withdrawInterest";
import { expressInterest } from "../functions/expressInterest";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import { useInterestStore } from "@/lib/interest-store";
import { getCompanyInitials } from "@/lib/utils";
import { TooltipSimple } from "@/components/ui/tooltip";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  ArrowLeft,
  Plus,
  Edit2,
  XCircle,
  Lock,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
  Tag,
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Trash2,
  Eye,
  BookmarkCheck,
  Building2,
  MessageSquare,
  Shield,
  X,
  ArrowRight,
  Layers,
  Inbox,
  Send,
  Handshake,
  MoreVertical,
  ExternalLink,
  Sparkles,
  CircleDot,
  GitPullRequest,
  GitMerge,
  Search,
  RotateCcw,
  Filter,
  Hash,
  BadgeCheck,
  ArrowDown,
  ArrowUp,
  Download,
  LayoutGrid,
  List,
  LockOpen,
  History,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Button,
  Modal,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  DealCodeStamp,
  CategoryPill,
  VerifiedBadge,
} from "@/design-system";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";

const myRelaySearchSchema = z.object({
  tab: fallback(
    z.enum(["listings", "requests", "saved", "incoming", "sent", "executed"]),
    "listings"
  ).default("listings"),
  create: fallback(z.boolean(), false).default(false),
});

export const Route = createFileRoute("/my-relay")({
  validateSearch: zodValidator(myRelaySearchSchema),
  head: () => ({
    meta: [
      { title: "My Relay — The Relay" },
      {
        name: "description",
        content:
          "Manage your B2B opportunities, active bilateral requests, and saved opportunities.",
      },
    ],
  }),
  component: MyRelayPage,
});

const CATEGORIES = [
  "partnership",
  "referral",
  "distribution",
  "vendor",
  "hiring",
  "strategic_advice",
  "investment",
] as const;

const INDUSTRIES = [
  "SaaS",
  "Marketing Agency",
  "Development Agency",
  "AI & Automation",
  "Recruitment",
  "D2C Brand",
  "Legal",
  "Healthcare",
  "Logistics",
  "E-commerce",
  "Real Estate",
  "Fintech",
  "Cybersecurity",
  "Cloud & DevOps",
  "Edtech",
  "Consulting & Advisory",
  "Web3 & Blockchain",
  "HR Tech",
  "Manufacturing",
  "Media & Adtech",
] as const;

interface InboundTriageItem {
  id: string;
  code: string;
  timeAgo: string;
  partnerName: string;
  isVerified: boolean;
  targetTitle: string;
  targetCode: string;
  proposedTerms: string;
  rawRequest?: any;
}

interface PipelineOpportunity {
  id: string;
  dealCode: string;
  title: string;
  origin: "posted" | "requested";
  partner: string;
  isVerified?: boolean;
  isUnblinded?: boolean;
  stage: 1 | 2 | 3 | 4;
  metricLabel1: string;
  metricValue1: string;
  metricLabel2: string;
  metricValue2: string;
  actionLabel: string;
  actionType: "high-intent" | "waiting" | "view";
  actionLink?: string;
  rawRequest?: any;
}

function formatDistance(dateString?: string | null): string {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function MyRelayPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const isSignedInRef = useRef(isSignedIn);
  isSignedInRef.current = isSignedIn;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tab, create } = Route.useSearch();

  // Onboarding & Auth Query
  const {
    data: onboardingData,
    isLoading: onboardingLoading,
  } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      return await checkOnboardingStatus();
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 3,
  });

  const business = onboardingData?.business || null;
  const isApproved = business?.status === "approved";

  // Tab 1: My Listings Query
  const {
    data: myOpps = [],
    isLoading: loadingListings,
  } = useQuery({
    queryKey: ["my-opportunities", userId],
    queryFn: async () => {
      const data = await getMyOpportunities();
      return data || [];
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 2,
  });

  // Tab 2: Bilateral Requests Data Query
  const {
    data: incomingRequests = [],
    isLoading: loadingIncoming,
  } = useQuery({
    queryKey: ["incoming-requests", userId],
    queryFn: async () => {
      const data = await getIncomingRequests();
      return data || [];
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 2,
  });

  const {
    data: sentRequests = [],
    isLoading: loadingSent,
  } = useQuery({
    queryKey: ["sent-requests", userId],
    queryFn: async () => {
      const data = await getSentRequests();
      return data || [];
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 2,
  });

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";

  // Tab 3: Saved Memos Query
  const {
    data: savedItems = [],
    isLoading: loadingSaved,
  } = useQuery({
    queryKey: ["saved-opportunities-list", userId],
    queryFn: async () => {
      const items = await getSavedOpportunities();
      let mockIds: string[] = [];
      try {
        const stored = localStorage.getItem(mockStorageKey);
        if (stored) {
          mockIds = JSON.parse(stored);
        }
      } catch (err) {
        console.error("Error reading mock saves:", err);
      }
      const mockItems = mockIds
        .map((id) => {
          const opp = OPPORTUNITIES.find((o) => o.id === id);
          if (!opp) return null;
          return {
            id: `mock-saved-${opp.id}`,
            opportunity_id: opp.id,
            opportunity: {
              ...opp,
              category: opp.type,
              location: opp.geo,
              postedAt: opp.postedAt,
              interestedCount: opp.interested,
              business: {
                company_name: opp.company,
                status:
                  opp.trustLevel === "Approved"
                    ? "approved"
                    : opp.trustLevel === "Applied"
                      ? "applied"
                      : "pending",
                industry: opp.industry,
              },
            },
          };
        })
        .filter(Boolean);
      return [...(items || []), ...mockItems];
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 2,
  });

  const savedCount = savedItems.length;

  const [activeTab, setActiveTab] = useState<"listings" | "requests" | "saved">(() => {
    if (tab === "incoming" || tab === "sent" || tab === "executed" || tab === "requests") {
      return "requests";
    }
    if (tab === "saved") return "saved";
    return "listings";
  });

  // Request Filter states for My Opportunities Table
  const [opportunitySection, setOpportunitySection] = useState<"all" | "posted" | "requested">(
    () => {
      if (tab === "sent") return "requested";
      if (tab === "incoming") return "posted";
      return "all";
    }
  );
  const [requestStateFilter, setRequestStateFilter] = useState<
    "all" | "action_needed" | "waiting" | "completed"
  >(() => {
    if (tab === "executed") return "completed";
    return "all";
  });
  const [pipelineViewMode, setPipelineViewMode] = useState<"kanban" | "table">("kanban");
  const [originFilter, setOriginFilter] = useState<"all" | "posted" | "requested">("all");
  const [dealSearchInput, setDealSearchInput] = useState("");
  const [appliedDealSearch, setAppliedDealSearch] = useState("");

  // Verification Banners
  const approvedBannerKey = userId
    ? `relay_approved_banner_dismissed_${userId}`
    : "relay_approved_banner_dismissed";
  const [approvedBannerDismissed, setApprovedBannerDismissed] = useState(() => {
    try {
      return localStorage.getItem(approvedBannerKey) === "true";
    } catch {
      return false;
    }
  });

  // Form & Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [selectedDetailOpp, setSelectedDetailOpp] = useState<any>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Pipeline Interactive Action Modals
  const [ncndModalOpen, setNcndModalOpen] = useState(false);
  const [counterOfferModalOpen, setCounterOfferModalOpen] = useState(false);
  const [redlinesModalOpen, setRedlinesModalOpen] = useState(false);
  const [countersignModalOpen, setCountersignModalOpen] = useState(false);
  const [selectedPipelineDeal, setSelectedPipelineDeal] = useState<PipelineOpportunity | null>(null);

  // Inbound Triage Collapsible State (Collapsed by default)
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("partnership");
  const [industry, setIndustry] = useState("SaaS");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [offerText, setOfferText] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [submitting, setSubmitting] = useState(false);
  const [hideCompanyName, setHideCompanyName] = useState(false);
  const [promote, setPromote] = useState(false);

  // Handshake Interest store
  const { store } = useInterestStore();

  useEffect(() => {
    if (tab === "incoming" || tab === "sent" || tab === "executed" || tab === "requests") {
      setActiveTab("requests");
      if (tab === "sent") {
        setOpportunitySection("requested");
        setRequestStateFilter("waiting");
      } else if (tab === "executed") {
        setRequestStateFilter("completed");
      } else if (tab === "incoming") {
        setOpportunitySection("posted");
        setRequestStateFilter("action_needed");
      }
    } else if (tab === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("listings");
    }
  }, [tab]);

  // Outside click for menus
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenuId(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Auth & Onboarding verification check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in to access My Relay.", { id: "my-relay-auth-required" });
      navigate({ to: "/login", replace: true });
      return;
    }

    if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      toast.error("Please register your business profile first.", {
        id: "my-relay-onboarding-redirect",
      });
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoaded, isSignedIn, onboardingData, navigate]);

  // Trigger create modal if ?create=true
  useEffect(() => {
    if (create && business) {
      if (business.status === "approved") {
        setCreateOpen(true);
      } else {
        toast.error(
          `Forbidden: Your business profile status is "${business.status || "pending"}". Only approved businesses can create opportunities.`
        );
      }
      navigate({ to: "/my-relay", search: { tab, create: false } });
    }
  }, [create, business, navigate, tab]);

// Helper to compute individual request workflow stage & action status
function computeRequestWorkflow(req: any, currentBusinessId?: string) {
  const isInbound = req.direction === "inbound";
  const myBizId = currentBusinessId || (isInbound ? req.opportunity?.business_id : req.requesting_business_id);

  const partnerBusiness = isInbound
    ? req.requesting_business
    : req.opportunity?.business;

  const partnerName = isInbound
    ? req.requesting_business?.company_name || "Partner Business"
    : req.opportunity?.hide_company_name
    ? "Confidential Business"
    : partnerBusiness?.company_name || "Target Business";

  const isVerified = isInbound
    ? req.requesting_business?.status === "approved"
    : partnerBusiness?.status === "approved";

  // Acknowledgements
  const requesterAck = Boolean(req.requester_acknowledged_at);
  const ownerAck = Boolean(req.owner_acknowledged_at);
  const bothAck = requesterAck && ownerAck;
  const myAck = isInbound ? ownerAck : requesterAck;
  const partnerAck = isInbound ? requesterAck : ownerAck;

  // Proposals & Agreements
  const proposals = req.exchange_proposals || [];
  const latestProposal = proposals.length > 0 ? proposals[0] : null;
  const hasProposals = proposals.length > 0;
  const agreement = req.exchange_agreement;
  const isAgreed = agreement?.status === "agreed";
  const isDraftAgreement = agreement?.status === "draft" || Boolean(agreement && !isAgreed);

  const ownerConfirmedAgreement = Boolean(agreement?.owner_confirmed_at);
  const requesterConfirmedAgreement = Boolean(agreement?.requester_confirmed_at);
  const myConfirmedAgreement = isInbound ? ownerConfirmedAgreement : requesterConfirmedAgreement;
  const partnerConfirmedAgreement = isInbound ? requesterConfirmedAgreement : ownerConfirmedAgreement;

  // Contact Consents
  const consents = req.contact_consents || [];
  const myConsents = consents.filter((c: any) => c.from_business_id === myBizId);
  const acceptedIncomingConsents = consents.filter(
    (c: any) => c.to_business_id === myBizId && c.status === "accepted"
  );
  const hasSharedAnyContact = myConsents.length > 0;
  const hasAcceptedAnyContact = acceptedIncomingConsents.length > 0;

  // Handshake Complete check:
  // Legacy handshake ONLY if interest was accepted with NO workflow acknowledgements, NO proposals, and NO agreement.
  const isLegacyHandshake =
    req.status === "accepted" &&
    !requesterAck &&
    !ownerAck &&
    !hasProposals &&
    !agreement &&
    consents.length === 0;

  const isHandshakeComplete =
    isLegacyHandshake ||
    (isAgreed && hasSharedAnyContact && hasAcceptedAnyContact) ||
    (isAgreed && (hasSharedAnyContact || hasAcceptedAnyContact));

  let stageNum = 1;
  let stageHeadline = "";
  let stageContext = "";
  let stateCategory: "action_needed" | "waiting" | "completed" | "archived" = "action_needed";
  let primaryActionLabel = "View Details";

  if (req.status === "declined") {
    stageNum = 1;
    stateCategory = "archived";
    stageHeadline = "Stage Closed: Pitch Declined";
    stageContext = "This request has been declined.";
  } else if (req.status === "withdrawn") {
    stageNum = 1;
    stateCategory = "archived";
    stageHeadline = "Stage Closed: Pitch Withdrawn";
    stageContext = "This pitch was withdrawn by the sender.";
  } else if (isHandshakeComplete) {
    stageNum = 5;
    stateCategory = "completed";
    stageHeadline = "Stage 5: Handshake — Bilateral Introduction Executed";
    stageContext = req.message ? `Introduction note: "${req.message}"` : "Handshake finalized. Both parties have access to bilateral contact info and the Exchange Hub.";
    primaryActionLabel = "Exchange Hub";
  } else if (isAgreed || isDraftAgreement) {
    stageNum = 4;
    if (!myConfirmedAgreement) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 4: Final Agreement — Waiting for signature";
      stageContext = partnerConfirmedAgreement
        ? `${partnerName} has counter-signed. Confirm your signature to finalize into Completed Handshake.`
        : "Exchange agreement draft is ready. Review and sign to finalize bilateral connection.";
      primaryActionLabel = "Review Agreement";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 4: Final Agreement — Waiting for partner signature";
      stageContext = `You have counter-signed the agreement. Awaiting signature from ${partnerName}.`;
      primaryActionLabel = "Exchange Hub";
    }
  } else if (hasProposals || bothAck) {
    stageNum = 3;
    if (latestProposal && latestProposal.status === "pending_response") {
      const isReceivingProposal = latestProposal.receiving_business_id === myBizId;
      if (isReceivingProposal) {
        stateCategory = "action_needed";
        stageHeadline = "Stage 3: Negotiation — Counter-offer received";
        stageContext = `Proposed: ${latestProposal.exchange_details || (latestProposal.revenue_percentage ? `${latestProposal.revenue_percentage}% revenue share` : "Exchange terms")}. Awaiting your response.`;
        primaryActionLabel = "Review Counter-Offer";
      } else {
        stateCategory = "waiting";
        stageHeadline = "Stage 3: Negotiation — Proposal sent";
        stageContext = `Proposed terms sent to ${partnerName}. Awaiting their counter-offer or acceptance.`;
        primaryActionLabel = "Exchange Hub";
      }
    } else if (bothAck && !hasProposals) {
      // Both acknowledged protocol, ready for initial proposal
      if (!isInbound) {
        // Current user is the requesting business - they should submit proposal v1
        stateCategory = "action_needed";
        stageHeadline = "Stage 3: Negotiation — Propose Exchange Terms";
        stageContext = "Both parties have acknowledged protocol clearance. Submit your initial proposal terms in the Exchange Hub to begin negotiation.";
        primaryActionLabel = "Propose Terms";
      } else {
        // Current user is the opportunity owner - waiting for interested business to submit proposal v1
        stateCategory = "waiting";
        stageHeadline = "Stage 3: Negotiation — Waiting for initial proposal";
        stageContext = `Both parties have acknowledged protocol. Waiting for ${partnerName} to submit their exchange proposal.`;
        primaryActionLabel = "Exchange Hub";
      }
    } else {
      stateCategory = "action_needed";
      stageHeadline = "Stage 3: Negotiation — Exchange negotiation active";
      stageContext = "Both parties acknowledged protocol. Discuss terms and submit exchange proposal in the Exchange Hub.";
      primaryActionLabel = "Exchange Hub";
    }
  } else if (myAck || partnerAck) {
    stageNum = 2;
    if (!myAck) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 2: Acknowledgement — Protocol clearance required";
      stageContext = `${partnerName} acknowledged terms. Acknowledge exchange protocol to unlock mutual negotiation.`;
      primaryActionLabel = "Acknowledge Exchange";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 2: Acknowledgement — Waiting for partner acknowledgement";
      stageContext = `You acknowledged the exchange process. Waiting for ${partnerName} to acknowledge protocol.`;
      primaryActionLabel = "Exchange Hub";
    }
  } else {
    // Stage 1: Initial Interest
    stageNum = 1;
    if (isInbound) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 2: Acknowledgement — Inbound Pitch Awaiting Your Review";
      stageContext = req.message || "Partner has expressed interest in this opportunity. Review pitch context and accept to initiate exchange.";
      primaryActionLabel = "Accept Pitch";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 2: Acknowledgement — Waiting for Operator Review";
      stageContext = req.message ? `Your pitch: "${req.message}"` : "You submitted a pitch for this opportunity. Waiting for counterparty to acknowledge and respond.";
      primaryActionLabel = "Exchange Hub";
    }
  }

  return {
    isInbound,
    partnerName,
    isVerified,
    stageNum,
    stageHeadline,
    stageContext,
    stateCategory,
    primaryActionLabel,
    isHandshakeComplete,
  };
}

  // Computed All Requests (Combined Inbound & Outbound with full workflow state)
  const allCombinedRequests = useMemo(() => {
    const inbound = incomingRequests.map((r) => ({
      ...r,
      direction: "inbound" as const,
      partnerBusiness: r.requesting_business,
    }));
    const outbound = sentRequests.map((r) => ({
      ...r,
      direction: "outbound" as const,
      partnerBusiness: r.opportunity?.business,
    }));
    return [...inbound, ...outbound].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [incomingRequests, sentRequests]);

  const allCombinedRequestsWithWorkflow = useMemo(() => {
    return allCombinedRequests.map((req) => ({
      ...req,
      workflow: computeRequestWorkflow(req, business?.id),
    }));
  }, [allCombinedRequests, business?.id]);

  const postedRequests = useMemo(
    () => allCombinedRequestsWithWorkflow.filter((r) => r.direction === "inbound"),
    [allCombinedRequestsWithWorkflow]
  );
  const requestedRequests = useMemo(
    () => allCombinedRequestsWithWorkflow.filter((r) => r.direction === "outbound"),
    [allCombinedRequestsWithWorkflow]
  );

  const postedActionNeededCount = useMemo(
    () => postedRequests.filter((r) => r.workflow.stateCategory === "action_needed").length,
    [postedRequests]
  );
  const postedWaitingCount = useMemo(
    () => postedRequests.filter((r) => r.workflow.stateCategory === "waiting").length,
    [postedRequests]
  );
  const postedCompletedCount = useMemo(
    () => postedRequests.filter((r) => r.workflow.stateCategory === "completed").length,
    [postedRequests]
  );

  const requestedActionNeededCount = useMemo(
    () => requestedRequests.filter((r) => r.workflow.stateCategory === "action_needed").length,
    [requestedRequests]
  );
  const requestedWaitingCount = useMemo(
    () => requestedRequests.filter((r) => r.workflow.stateCategory === "waiting").length,
    [requestedRequests]
  );
  const requestedCompletedCount = useMemo(
    () => requestedRequests.filter((r) => r.workflow.stateCategory === "completed").length,
    [requestedRequests]
  );

  const totalActionNeededCount = useMemo(
    () => allCombinedRequestsWithWorkflow.filter((r) => r.workflow.stateCategory === "action_needed").length,
    [allCombinedRequestsWithWorkflow]
  );
  const totalWaitingCount = useMemo(
    () => allCombinedRequestsWithWorkflow.filter((r) => r.workflow.stateCategory === "waiting").length,
    [allCombinedRequestsWithWorkflow]
  );
  const totalCompletedCount = useMemo(
    () => allCombinedRequestsWithWorkflow.filter((r) => r.workflow.stateCategory === "completed").length,
    [allCombinedRequestsWithWorkflow]
  );

  const actionNeededCount = totalActionNeededCount;
  const waitingCount = totalWaitingCount;
  const completedCount = totalCompletedCount;

  const currentSectionRequests = useMemo(() => {
    if (opportunitySection === "posted") return postedRequests;
    if (opportunitySection === "requested") return requestedRequests;
    return allCombinedRequestsWithWorkflow;
  }, [opportunitySection, postedRequests, requestedRequests, allCombinedRequestsWithWorkflow]);

  const currentActionNeededCount = useMemo(
    () => currentSectionRequests.filter((r) => r.workflow.stateCategory === "action_needed").length,
    [currentSectionRequests]
  );
  const currentWaitingCount = useMemo(
    () => currentSectionRequests.filter((r) => r.workflow.stateCategory === "waiting").length,
    [currentSectionRequests]
  );
  const currentCompletedCount = useMemo(
    () => currentSectionRequests.filter((r) => r.workflow.stateCategory === "completed").length,
    [currentSectionRequests]
  );

  const hasActiveFilters =
    opportunitySection !== "all" || requestStateFilter !== "all" || appliedDealSearch.trim() !== "";

  const handleClearFilters = () => {
    setOpportunitySection("all");
    setRequestStateFilter("all");
    setDealSearchInput("");
    setAppliedDealSearch("");
  };

  const filteredRequests = useMemo(() => {
    return allCombinedRequestsWithWorkflow.filter((req) => {
      // 1. Type / Section Filter
      if (opportunitySection === "posted" && req.direction !== "inbound") {
        return false;
      }
      if (opportunitySection === "requested" && req.direction !== "outbound") {
        return false;
      }

      // 2. Primary State Filter
      if (requestStateFilter === "action_needed" && req.workflow.stateCategory !== "action_needed") {
        return false;
      }
      if (requestStateFilter === "waiting" && req.workflow.stateCategory !== "waiting") {
        return false;
      }
      if (requestStateFilter === "completed" && req.workflow.stateCategory !== "completed") {
        return false;
      }

      // 3. Search Query Filter (Title and ID / Code only on Enter)
      if (appliedDealSearch.trim()) {
        const query = appliedDealSearch.toLowerCase().trim();
        const cleanQuery = query.replace(/[^a-z0-9]/g, "");
        const queryDigits = query.replace(/\D/g, "");

        const oppTitle = (req.opportunity?.title || "").toLowerCase();
        const dealCode = (req.opportunity?.opportunity_number ? `ry-${req.opportunity.opportunity_number}` : "").toLowerCase();
        const reqId = (req.id || "").toLowerCase();
        const oppId = (req.opportunity?.id || "").toLowerCase();
        const cleanCode = dealCode.replace(/[^a-z0-9]/g, "");
        const oppNumber = req.opportunity?.opportunity_number ? String(req.opportunity.opportunity_number) : "";

        const titleMatch = oppTitle.includes(query);
        const codeMatch = dealCode.includes(query) || (cleanQuery.length > 0 && (cleanCode.includes(cleanQuery) || cleanQuery.includes(cleanCode)));
        const idMatch = reqId.includes(query) || oppId.includes(query);
        const digitsMatch = queryDigits.length > 0 && oppNumber.length > 0 && (
          oppNumber.endsWith(queryDigits) ||
          queryDigits.endsWith(oppNumber) ||
          parseInt(oppNumber, 10) === parseInt(queryDigits, 10)
        );

        if (!titleMatch && !codeMatch && !idMatch && !digitsMatch) {
          return false;
        }
      }

      return true;
    });
  }, [allCombinedRequestsWithWorkflow, opportunitySection, requestStateFilter, appliedDealSearch]);

  const allPipelineDeals = useMemo<PipelineOpportunity[]>(() => {
    const dynamicDeals = allCombinedRequestsWithWorkflow.map((req): PipelineOpportunity => {
      const {
        isInbound,
        partnerName,
        isVerified,
        stageNum,
        stageHeadline,
        stateCategory,
        isHandshakeComplete,
      } = req.workflow || computeRequestWorkflow(req, business?.id);

      const dealCode = req.opportunity?.opportunity_number
        ? `RY-${String(req.opportunity.opportunity_number).padStart(4, "0")}`
        : `RY-${req.id?.substring(0, 4)?.toUpperCase() || "0000"}`;

      let stage: 1 | 2 | 3 | 4 = 1;
      let metric1Label = "Category";
      let metric1Val = req.opportunity?.category === "strategic_advice" ? "Strategic Advice" : (req.opportunity?.category || "Partnership");
      let metric2Label = "Terms Type";
      let metric2Val = req.opportunity?.offer_text || "Bilateral Introduction";
      let actionLabel = "View Details";
      let actionType: "high-intent" | "waiting" | "view" = "view";

      if (isHandshakeComplete || stageNum >= 5) {
        stage = 4;
        metric1Label = "Transaction";
        metric1Val = "Completed";
        metric2Label = "Settlement";
        metric2Val = "Fully Released";
        actionLabel = "View Closed Transaction →";
        actionType = "view";
      } else if (stageNum === 4) {
        stage = 3;
        metric1Label = "Total Mandate";
        metric1Val = req.opportunity?.title || "Dual Covenant Mandate";
        metric2Label = "Execution Status";
        metric2Val = stateCategory === "action_needed" ? "Partner Signed (1/2)" : "Your Firm Signed (1/2)";
        actionLabel = stateCategory === "action_needed" ? "Your Turn • Countersign Agreement" : "Waiting on LP Signature";
        actionType = stateCategory === "action_needed" ? "high-intent" : "waiting";
      } else if (stageNum === 3) {
        stage = 2;
        metric1Label = "Revenue Share";
        metric1Val = req.exchange_proposals?.[0]?.revenue_percentage ? `${req.exchange_proposals[0].revenue_percentage}% Net + $15k SLA` : "25% Net Rev Share";
        metric2Label = "Status";
        metric2Val = req.exchange_proposals?.[0]?.exchange_details || "Clause 8.2 Under Review";
        actionLabel = stateCategory === "action_needed" ? "Your Turn • Review Counter-Offer" : "Waiting on Yield Modeling";
        actionType = stateCategory === "action_needed" ? "high-intent" : "waiting";
      } else {
        stage = 1;
        metric1Label = "Category";
        metric1Val = req.opportunity?.category ? `${req.opportunity.category}` : "Bilateral";
        metric2Label = "Terms Type";
        metric2Val = req.opportunity?.offer_text || "Reciprocal Terms";
        actionLabel = stateCategory === "action_needed" ? "Your Turn • Sign NCND" : "Waiting on Partner Review";
        actionType = stateCategory === "action_needed" ? "high-intent" : "waiting";
      }

      return {
        id: req.id,
        dealCode,
        title: req.opportunity?.title || "Bilateral Opportunity Brief",
        origin: isInbound ? "posted" : "requested",
        partner: partnerName,
        isVerified,
        isUnblinded: stage === 4,
        stage,
        metricLabel1: metric1Label,
        metricValue1: metric1Val,
        metricLabel2: metric2Label,
        metricValue2: metric2Val,
        actionLabel,
        actionType,
        actionLink: `/connections/${req.id}`,
        rawRequest: req,
      };
    });

    // Also include active opportunities created by this business that don't yet have active requests
    const unattachedMyOpps = myOpps
      .filter((opp) => !allCombinedRequestsWithWorkflow.some((r) => r.opportunity?.id === opp.id || r.opportunity_id === opp.id))
      .map((opp): PipelineOpportunity => {
        const dealCode = opp.opportunity_number
          ? `RY-${String(opp.opportunity_number).padStart(4, "0")}`
          : `RY-${opp.id?.substring(0, 4)?.toUpperCase() || "0000"}`;
        return {
          id: opp.id,
          dealCode,
          title: opp.title,
          origin: "posted",
          partner: "Awaiting Inbound Partner",
          isVerified: business?.status === "approved",
          isUnblinded: false,
          stage: 1,
          metricLabel1: "Category",
          metricValue1: opp.category === "strategic_advice" ? "Strategic Advice" : (opp.category || "Partnership"),
          metricLabel2: "Terms Type",
          metricValue2: opp.offer_text || "Bilateral Exchange",
          actionLabel: "View Listing",
          actionType: "view",
          rawRequest: { opportunity: opp },
        };
      });

    return [...dynamicDeals, ...unattachedMyOpps];
  }, [allCombinedRequestsWithWorkflow, myOpps, business?.id, business?.status]);

  const postedPipelineCount = useMemo(() => allPipelineDeals.filter((d) => d.origin === "posted").length, [allPipelineDeals]);
  const requestedPipelineCount = useMemo(() => allPipelineDeals.filter((d) => d.origin === "requested").length, [allPipelineDeals]);

  const filteredPipelineDeals = useMemo(() => {
    return allPipelineDeals.filter((deal) => {
      if (originFilter === "posted" && deal.origin !== "posted") return false;
      if (originFilter === "requested" && deal.origin !== "requested") return false;
      if (appliedDealSearch.trim()) {
        const rawQuery = appliedDealSearch.toLowerCase().trim();
        const cleanQuery = rawQuery.replace(/[^a-z0-9]/g, "");
        const queryDigits = rawQuery.replace(/\D/g, "");

        const titleMatch = deal.title.toLowerCase().includes(rawQuery);
        const codeMatch = deal.dealCode.toLowerCase().includes(rawQuery);
        const idMatch = deal.id.toLowerCase().includes(rawQuery);

        const cleanCode = deal.dealCode.toLowerCase().replace(/[^a-z0-9]/g, "");
        const cleanId = deal.id.toLowerCase().replace(/[^a-z0-9]/g, "");
        const cleanMatch =
          cleanQuery.length > 0 &&
          (cleanCode.includes(cleanQuery) || cleanQuery.includes(cleanCode) || cleanId.includes(cleanQuery));

        const codeDigits = deal.dealCode.replace(/\D/g, "");
        const digitsMatch =
          queryDigits.length > 0 &&
          codeDigits.length > 0 &&
          (codeDigits.endsWith(queryDigits) ||
            queryDigits.endsWith(codeDigits) ||
            parseInt(codeDigits, 10) === parseInt(queryDigits, 10));

        if (!titleMatch && !codeMatch && !idMatch && !cleanMatch && !digitsMatch) {
          return false;
        }
      }
      return true;
    });
  }, [allPipelineDeals, originFilter, appliedDealSearch]);

  const stage1Deals = useMemo(() => filteredPipelineDeals.filter((d) => d.stage === 1), [filteredPipelineDeals]);
  const stage2Deals = useMemo(() => filteredPipelineDeals.filter((d) => d.stage === 2), [filteredPipelineDeals]);
  const stage3Deals = useMemo(() => filteredPipelineDeals.filter((d) => d.stage === 3), [filteredPipelineDeals]);
  const stage4Deals = useMemo(() => filteredPipelineDeals.filter((d) => d.stage === 4), [filteredPipelineDeals]);

  const handleExportSummary = () => {
    const headers = ["Deal Code", "Title", "Origin", "Partner", "Stage", "Metric 1", "Metric 2", "Status"];
    const rows = filteredPipelineDeals.map((d) => [
      d.dealCode,
      `"${d.title.replace(/"/g, '""')}"`,
      d.origin.toUpperCase(),
      `"${d.partner.replace(/"/g, '""')}"`,
      `Stage ${d.stage}`,
      `"${d.metricLabel1}: ${d.metricValue1.replace(/"/g, '""')}"`,
      `"${d.metricLabel2}: ${d.metricValue2.replace(/"/g, '""')}"`,
      `"${d.actionLabel.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `opportunities-stage-summary-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Opportunities summary exported as CSV.");
  };

  // Request Handlers
  const handleAcceptIncoming = async (interestId: string, companyName: string) => {
    try {
      await acceptInterest({ data: { interest_id: interestId } });
      toast.success("Handshake Complete!", {
        description: `You are now connected with ${companyName}. This deal is now live in Executed Handshakes.`,
      });
      await Promise.all([loadIncomingRequests(), loadSentRequests()]);
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to accept interest.");
    }
  };

  const handleDeclineIncoming = async (interestId: string, companyName: string) => {
    try {
      await declineInterest({ data: { interest_id: interestId } });
      toast.success("Interest declined", {
        description: `You declined the request from ${companyName}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-handshake-count"] });
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to decline interest.");
    }
  };

  const handleWithdrawSent = async (interestId: string, opportunityTitle: string) => {
    try {
      await withdrawInterest({ data: { interest_id: interestId } });
      toast.success("Interest withdrawn", {
        description: `You withdrew your interest in "${opportunityTitle}".`,
      });
      queryClient.invalidateQueries({ queryKey: ["sent-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-handshake-count"] });
      window.dispatchEvent(new Event("relay:interest"));
    } catch (err: any) {
      toast.error(err.message || "Failed to withdraw request.");
    }
  };

  const liveTriageItems = useMemo<InboundTriageItem[]>(() => {
    return incomingRequests
      .filter((r) => r.status === "pending")
      .map((r): InboundTriageItem => ({
        id: r.id,
        code: `#REQ-${r.id.substring(0, 4).toUpperCase()}`,
        timeAgo: formatDistance(r.created_at),
        partnerName: r.requesting_business?.company_name || "Partner Business",
        isVerified: r.requesting_business?.status === "approved",
        targetTitle: r.opportunity?.title || "Bilateral Opportunity",
        targetCode: r.opportunity?.opportunity_number ? `RY-${String(r.opportunity.opportunity_number).padStart(4, "0")}` : "RY-0000",
        proposedTerms: r.message || r.opportunity?.offer_text || "Standard reciprocal partnership terms.",
        rawRequest: r,
      }));
  }, [incomingRequests]);

  const handleAcceptTriage = async (item: InboundTriageItem) => {
    if (item.rawRequest) {
      await handleAcceptIncoming(item.rawRequest.id, item.partnerName);
    }
  };

  const handleDeclineTriage = async (item: InboundTriageItem) => {
    if (item.rawRequest) {
      await handleDeclineIncoming(item.rawRequest.id, item.partnerName);
    }
  };

  const handleDealActionClick = (deal: PipelineOpportunity) => {
    setSelectedPipelineDeal(deal);
    if (deal.actionLabel.includes("Sign NCND")) {
      setNcndModalOpen(true);
    } else if (deal.actionLabel.includes("Review Counter-Offer")) {
      setCounterOfferModalOpen(true);
    } else if (deal.actionLabel.includes("Submit Redlines")) {
      setRedlinesModalOpen(true);
    } else if (deal.actionLabel.includes("Countersign Agreement")) {
      setCountersignModalOpen(true);
    } else if (deal.actionType === "view") {
      if (deal.actionLink) {
        navigate({ to: deal.actionLink as any });
      } else {
        setSelectedDetailOpp(deal.rawRequest?.opportunity || { title: deal.title, description: `Deal Code: ${deal.dealCode} with ${deal.partner}` });
        setDetailOpen(true);
      }
    } else {
      toast.info("Waiting on Counterparty", {
        description: `Waiting for ${deal.partner} to complete their action step for ${deal.title} (${deal.dealCode}).`,
      });
    }
  };

  // Saved Actions
  const handleRemoveSaved = async (oppId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isMock = oppId.startsWith("RY-");
    try {
      if (!isMock) {
        await removeSavedOpportunity({ data: { opportunity_id: oppId } });
      } else {
        let mockIds: string[] = [];
        try {
          const stored = localStorage.getItem(mockStorageKey);
          if (stored) mockIds = JSON.parse(stored);
        } catch (_) {}
        mockIds = mockIds.filter((id) => id !== oppId);
        localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
      }
      queryClient.invalidateQueries({ queryKey: ["saved-opportunities-list"] });
      queryClient.invalidateQueries({ queryKey: ["saved-opportunities-count"] });
      toast.success("Opportunity removed from saved.");
      if (selectedDetailOpp?.id === oppId) {
        setDetailOpen(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to remove opportunity.");
    }
  };

  // Opportunity CRUD Handlers
  const handleOpenCreate = () => {
    if (!business || business.status !== "approved") {
      toast.error(
        `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`
      );
      return;
    }
    setTitle("");
    setCategory("partnership");
    setIndustry(business?.industry || "SaaS");
    setDescription("");
    setLocation("");
    setOfferText("");
    setExpiryDays("30");
    setHideCompanyName(false);
    setPromote(false);
    setCreateOpen(true);
  };

  const handleOpenEdit = (opp: any) => {
    if (!business || business.status !== "approved") {
      toast.error("Forbidden: Only approved businesses can edit opportunities.");
      return;
    }
    setSelectedOpp(opp);
    setTitle(opp.title);
    setCategory(opp.category);
    setIndustry(opp.industry || opp.business?.industry || "SaaS");
    setDescription(opp.description);
    setLocation(opp.location || "");
    setOfferText(opp.offer_text || "");
    setExpiryDays("30");
    setHideCompanyName(opp.hide_company_name ?? false);
    setPromote(opp.promotion_status === "pending_promotion" || opp.promotion_status === "promoted");
    setEditOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(`Description must be between 50 and 3000 characters. Currently: ${description.length}`);
      return;
    }
    if (promote && hideCompanyName) {
      toast.error("Promoted opportunities cannot be confidential.");
      return;
    }

    try {
      setSubmitting(true);
      let expires_at: string | null = null;
      if (expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }

      await createOpportunity({
        data: {
          title,
          category,
          industry,
          description,
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
          promote,
        },
      });

      toast.success("Opportunity Created Successfully");
      setCreateOpen(false);
      try {
        window.dispatchEvent(new CustomEvent("relay:opportunity_created"));
      } catch (_) {}
      queryClient.invalidateQueries({ queryKey: ["my-opportunities"] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to create opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;
    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(`Description must be between 50 and 3000 characters.`);
      return;
    }

    try {
      setSubmitting(true);
      let expires_at: string | null = selectedOpp.expires_at;
      if (expiryDays !== "keep" && expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      } else if (expiryDays === "never") {
        expires_at = null;
      }

      await updateOpportunity({
        data: {
          opportunity_id: selectedOpp.id,
          title,
          category,
          industry,
          description,
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
          promote,
        },
      });

      toast.success("Opportunity Updated Successfully");
      setEditOpen(false);
      queryClient.invalidateQueries({ queryKey: ["my-opportunities"] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to update opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseOpp = async (opportunityId: string) => {
    if (!confirm("Are you sure you want to close this opportunity? It will be hidden from the feed.")) return;
    try {
      await closeOpportunity({ data: { opportunity_id: opportunityId } });
      toast.success("Opportunity Closed Successfully");
      queryClient.invalidateQueries({ queryKey: ["my-opportunities"] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to close opportunity");
    }
  };

  const activeListingsCount = myOpps.filter((o) => o.status === "active").length;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans overflow-x-hidden w-full max-w-full">
      {!isSignedIn || !isLoaded || (onboardingLoading && !onboardingData) ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-32">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-xl animate-pulse" />
              <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
                Loading My Relay Hub...
              </span>
            </div>
          </div>
        </div>
      ) : (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-24">

          {/* Header Section */}
          <header
            id="my-relay-header"
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                  My Relay
                </h1>
                <span className="px-2 py-0.5 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-widest font-bold rounded-[2px]">
                  B2B Hub
                </span>
              </div>
              <p className="text-slate-500 text-xs md:text-sm max-w-2xl leading-relaxed">
                Centralized workspace for your posted listings, active incoming/sent handshakes, executed connections, and bookmarked opportunities.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="authoritative"
                size="default"
                onClick={handleOpenCreate}
                disabled={!isApproved}
                className="hover:bg-[#F97316] font-semibold transition-all"
              >
                Post Opportunity
              </Button>
            </div>
          </header>

          {/* Business Status Check Alert banner for Unapproved Users */}
          {!isApproved && (
            <div className="mb-6 border border-amber-500/20 bg-amber-50 p-4 sm:p-5 rounded-[2px] flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-left">
                <h4 className="font-mono text-xs font-bold uppercase text-amber-800 tracking-wider">
                  Business Verification In Review
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed max-w-[85ch]">
                  Your business status is{" "}
                  <span className="font-bold uppercase">&ldquo;{business?.status || "pending"}&rdquo;</span>.
                  You can browse and <span className="font-bold">Bookmark Opportunities (Saved tab)</span> freely.
                  Opportunity posting and sending handshakes unlock once your profile is verified (usually within 24h).
                </p>
              </div>
            </div>
          )}

          {/* Unified Tab Switcher Bar */}
          <div
            id="my-relay-tabs"
            className="flex border-b border-slate-200 mb-6 font-sans text-xs uppercase tracking-wider font-bold overflow-x-auto"
          >
            {/* Tab 1: Listings */}
            <button
              onClick={() => navigate({ to: "/my-relay", search: { tab: "listings" } })}
              className={`py-3.5 px-4 sm:px-6 border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                activeTab === "listings"
                  ? "border-[#171F2C] text-[#171F2C] font-extrabold bg-slate-100/40"
                  : "border-transparent text-[#64748B] hover:text-[#171F2C] hover:bg-slate-50/50"
              }`}
            >
              <span>Listings</span>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                {myOpps.length}
              </span>
            </button>

            {/* Tab 2: My Opportunities */}
            <button
              onClick={() => navigate({ to: "/my-relay", search: { tab: "requests" } })}
              className={`py-3.5 px-4 sm:px-6 border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                activeTab === "requests"
                  ? "border-[#171F2C] text-[#171F2C] font-extrabold bg-slate-100/40"
                  : "border-transparent text-[#64748B] hover:text-[#171F2C] hover:bg-slate-50/50"
              }`}
            >
              <span>My Opportunities</span>
              <span
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded font-bold ${
                  liveTriageItems.length > 0 || actionNeededCount > 0
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {allCombinedRequests.length}
              </span>
            </button>

            {/* Tab 3: Saved */}
            <button
              onClick={() => navigate({ to: "/my-relay", search: { tab: "saved" } })}
              className={`py-3.5 px-4 sm:px-6 border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                activeTab === "saved"
                  ? "border-[#171F2C] text-[#171F2C] font-extrabold bg-slate-100/40"
                  : "border-transparent text-[#64748B] hover:text-[#171F2C] hover:bg-slate-50/50"
              }`}
            >
              <span>Saved</span>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B]">
                {savedItems.length}
              </span>
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          <div
            id="my-relay-content-area"
            className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs"
          >
            {/* ════════════════════════════════════════════════════════════════
                TAB 1: MY LISTINGS (Posted by current user)
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "listings" && (
              loadingListings ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Fetching your posted listings...
                  </span>
                </div>
              ) : myOpps.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 px-4">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 mb-1">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-slate-900 uppercase">
                      No Opportunities Posted
                    </h4>
                    <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                      Publish your partnership requirements, client referral models, or vendor requests to the network.
                    </p>
                  </div>
                  <Button
                    variant="authoritative"
                    size="default"
                    onClick={handleOpenCreate}
                    disabled={!isApproved}
                    className="mt-2 hover:bg-[#F97316] font-semibold transition-all"
                  >
                    Post Opportunity
                  </Button>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Title & Category</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Created</th>
                          <th className="py-4 px-6">Inquiries</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {myOpps.map((opp) => (
                          <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-6 font-mono font-bold text-slate-600">
                              #{opp.opportunity_number || opp.id.substring(0, 8)}
                            </td>

                            <td className="py-4 px-6 space-y-1 max-w-[300px]">
                              <div className="font-display font-bold text-slate-900 text-sm leading-snug">
                                {opp.title}
                              </div>
                              <div className="inline-flex gap-1.5 flex-wrap">
                                <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                                  {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                                </span>
                                {opp.hide_company_name && (
                                  <span className="px-2 py-0.5 border border-amber-200 bg-amber-50 text-[8px] font-mono font-bold uppercase tracking-wider text-amber-700 rounded-[2px] inline-flex items-center gap-0.5">
                                    <Lock className="w-2.5 h-2.5" /> Anonymous
                                  </span>
                                )}
                                {opp.promotion_status === "promoted" && (
                                  <span className="px-2 py-0.5 border border-orange-200 bg-orange-50 text-[8px] font-mono font-bold uppercase tracking-wider text-orange-700 rounded-[2px]">
                                    Promoted
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                                  opp.status === "active"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-500 border border-slate-200"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    opp.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                                  }`}
                                />
                                {opp.status}
                              </span>
                            </td>

                            <td className="py-4 px-6 font-mono text-slate-500">
                              {new Date(opp.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            <td className="py-4 px-6 font-mono text-slate-700 font-bold">
                              {opp.interestedCount > 0 ? (
                                <button
                                  onClick={() => navigate({ to: "/my-relay", search: { tab: "incoming" } })}
                                  className="text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                                >
                                  {opp.interestedCount} Inquiries
                                </button>
                              ) : (
                                <span className="text-slate-400">0 Inquiries</span>
                              )}
                            </td>

                            <td className="py-4 px-6 text-right space-x-2 shrink-0 whitespace-nowrap">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedDetailOpp(opp);
                                  setDetailOpen(true);
                                }}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenEdit(opp)}
                                disabled={!isApproved}
                              >
                                Edit
                              </Button>
                              {opp.status === "active" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleCloseOpp(opp.id)}
                                  disabled={!isApproved}
                                >
                                  Close
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="block md:hidden divide-y divide-slate-100 bg-white">
                    {myOpps.map((opp) => (
                      <div
                        key={opp.id}
                        className="p-4 space-y-3 cursor-pointer hover:bg-slate-50/50 transition-colors"
                        onClick={() => {
                          setSelectedDetailOpp(opp);
                          setDetailOpen(true);
                        }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="font-bold text-slate-600">
                            #{opp.opportunity_number || opp.id.substring(0, 8)}
                          </span>
                          <span className="text-slate-400">
                            {new Date(opp.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-slate-900 text-sm leading-snug">
                            {opp.title}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                              {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                            </span>
                            {opp.hide_company_name && (
                              <span className="px-2 py-0.5 border border-amber-200 bg-amber-50 text-[8px] font-mono font-bold uppercase tracking-wider text-amber-700 rounded-[2px] inline-flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> Anonymous
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                                opp.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-500 border border-slate-200"
                              }`}
                            >
                              {opp.status}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 font-bold">
                              {opp.interestedCount} Inquiries
                            </span>
                          </div>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId((prev) => (prev === opp.id ? null : opp.id));
                              }}
                              className="p-1.5 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-[2px] transition-all cursor-pointer bg-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {activeMenuId === opp.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 bottom-full mb-1 z-30 min-w-[125px] bg-white border border-slate-200 rounded-[3px] shadow-lg py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-left"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(null);
                                    handleOpenEdit(opp);
                                  }}
                                  disabled={!isApproved}
                                  className={`w-full px-3 py-2 text-left block hover:bg-slate-50 transition-colors ${
                                    isApproved ? "text-slate-700" : "opacity-30 cursor-not-allowed"
                                  }`}
                                >
                                  Edit
                                </button>
                                {opp.status === "active" && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(null);
                                      handleCloseOpp(opp.id);
                                    }}
                                    disabled={!isApproved}
                                    className={`w-full px-3 py-2 text-left block hover:bg-slate-50 transition-colors ${
                                      isApproved ? "text-red-600" : "opacity-30 cursor-not-allowed"
                                    }`}
                                  >
                                    Close
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            )}

            {/* ════════════════════════════════════════════════════════════════
                TAB 2: REQUESTS (Unified bilateral requests feed matching REQUEST_TAB.md)
                ════════════════════════════════════════════════════════════════ */}
            {/* ════════════════════════════════════════════════════════════════
                TAB 2: OPPORTUNITIES & REQUEST PIPELINE (Matching OPPORTUNITIES_FRAMEWORK.md)
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "requests" && (
              (loadingIncoming || loadingSent) ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Loading opportunities & request pipeline...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {/* Top Summary & Header */}
                  <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-display font-black text-xl sm:text-2xl text-slate-950 tracking-tight">
                          Opportunities &amp; Request Pipeline
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-sans">
                          Triage inbound requests on your listings and manage active deals across the 4 bilateral lifecycle stages.
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* View Switcher */}
                        <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setPipelineViewMode("kanban")}
                            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              pipelineViewMode === "kanban"
                                ? "bg-white text-slate-950 shadow-xs font-bold"
                                : "text-slate-500 hover:text-slate-900"
                            }`}
                            title="Kanban Pipeline View"
                          >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            <span>Pipeline</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPipelineViewMode("table")}
                            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              pipelineViewMode === "table"
                                ? "bg-white text-slate-950 shadow-xs font-bold"
                                : "text-slate-500 hover:text-slate-900"
                            }`}
                            title="Table List View"
                          >
                            <List className="w-3.5 h-3.5" />
                            <span>Table</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleExportSummary}
                          className="h-9 px-3.5 rounded bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export Summary</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Strip */}
                  <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                    {/* Origin Filter Pills */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => setOriginFilter("all")}
                        className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          originFilter === "all"
                            ? "bg-white text-slate-950 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span>All ({allPipelineDeals.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOriginFilter("posted")}
                        className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          originFilter === "posted"
                            ? "bg-white text-slate-950 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-950"></span>
                        <span>Posted ({postedPipelineCount})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOriginFilter("requested")}
                        className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          originFilter === "requested"
                            ? "bg-white text-slate-950 shadow-xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span>Requested ({requestedPipelineCount})</span>
                      </button>
                    </div>

                    {/* Quick Search on Enter (Title & ID) */}
                    <div className="relative flex items-center">
                      <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={dealSearchInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDealSearchInput(val);
                          if (!val.trim()) {
                            setAppliedDealSearch("");
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setAppliedDealSearch(dealSearchInput.trim());
                          }
                        }}
                        placeholder="Search title or ID (e.g. RY-0005)... ↵"
                        className="w-72 h-9 pl-8.5 pr-14 bg-white rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-800 outline-none transition-colors shadow-2xs"
                      />
                      <div className="absolute right-2.5 flex items-center gap-1">
                        {dealSearchInput && (
                          <button
                            type="button"
                            onClick={() => {
                              setDealSearchInput("");
                              setAppliedDealSearch("");
                            }}
                            className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer p-0.5"
                            title="Clear search"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                        <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200 pointer-events-none">
                          ↵
                        </kbd>
                      </div>
                    </div>
                  </div>

                  {/* KANBAN PIPELINE VIEW */}
                  {pipelineViewMode === "kanban" && (
                    <div className="flex flex-col w-full">
                      {/* Section 1: New Requests / Inbound Triage (Collapsible) */}
                      {liveTriageItems.length > 0 && (
                        <div className="p-4 sm:p-6 bg-white border-b border-slate-200/80">
                          <Collapsible
                            open={isTriageOpen}
                            onOpenChange={setIsTriageOpen}
                            className="bg-slate-50/80 rounded border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col gap-3 transition-all"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <CollapsibleTrigger asChild>
                                <button
                                  type="button"
                                  className="flex items-center gap-3 flex-wrap cursor-pointer text-left hover:opacity-85 transition-opacity"
                                >
                                  <div className="flex items-center gap-2">
                                    <Inbox className="w-5 h-5 text-slate-950" />
                                    <h3 className="font-display font-bold text-base text-slate-950 tracking-tight">
                                      New Requests / Inbound Triage
                                    </h3>
                                  </div>
                                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-[11px] font-bold shadow-xs flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                    {liveTriageItems.length} New
                                  </span>
                                </button>
                              </CollapsibleTrigger>

                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Response SLA: &lt; 48 hrs</span>
                                </div>
                                <CollapsibleTrigger asChild>
                                  <button
                                    type="button"
                                    className="w-7 h-7 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                                    title={isTriageOpen ? "Collapse" : "Expand"}
                                  >
                                    {isTriageOpen ? (
                                      <ChevronUp className="w-4 h-4 text-white" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-white" />
                                    )}
                                  </button>
                                </CollapsibleTrigger>
                              </div>
                            </div>

                            <CollapsibleContent className="flex flex-col gap-4 pt-2 border-t border-slate-200/80">
                              <p className="text-xs text-slate-500 font-sans">
                                Inbound proposals and intro inquiries received on your posted listings awaiting your acceptance into Stage 1 (Acknowledgement) or direct decline.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {liveTriageItems.map((item) => (
                                  <div
                                    key={item.id}
                                    className="bg-white rounded p-4 border border-slate-200 shadow-xs flex flex-col justify-between gap-3 hover:border-slate-300 transition-all text-left"
                                  >
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 font-mono border border-slate-200">
                                          {item.code}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-medium">
                                          {item.timeAgo}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-slate-950 font-display font-bold text-sm flex items-center gap-1.5">
                                          <span>{item.partnerName}</span>
                                          {item.isVerified && (
                                            <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                                          )}
                                        </div>
                                        <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                                          <span className="truncate">
                                            Target: {item.targetTitle} ({item.targetCode})
                                          </span>
                                        </div>
                                      </div>
                                      <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-xs">
                                        <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide mb-1 font-mono">
                                          Proposed Terms
                                        </span>
                                        <p className="text-slate-800 leading-relaxed font-sans">
                                          {item.proposedTerms}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                      <button
                                        type="button"
                                        onClick={() => handleAcceptTriage(item)}
                                        className="flex-1 py-1.5 px-2 rounded bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs active:scale-[0.98]"
                                      >
                                        Accept to Stage 1 →
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeclineTriage(item)}
                                        className="py-1.5 px-3 rounded bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 font-medium text-xs transition-colors text-center cursor-pointer active:scale-[0.98]"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )}

                      {/* Section 2: 4 Stage Columns (Kanban Lanes) */}
                      <div className="p-4 sm:p-6 bg-slate-50/50">
                        <div
                          id="pipeline-view"
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
                        >
                          {/* STEP 1: Acknowledgement */}
                          <div className="bg-slate-100/70 rounded p-4 flex flex-col gap-4 min-h-[640px] border border-slate-200/70">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[11px] font-bold flex items-center justify-center">
                                  1
                                </span>
                                <span className="font-display font-bold text-sm text-slate-900">
                                  Acknowledgement
                                </span>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-full font-mono text-xs font-bold transition-colors ${
                                  stage1Deals.length > 0
                                    ? "bg-red-600 text-white border border-red-700 shadow-xs"
                                    : "bg-white text-slate-900 border border-slate-200"
                                }`}
                              >
                                {stage1Deals.length}
                              </span>
                            </div>

                            {stage1Deals.length === 0 ? (
                              <div className="py-12 text-center text-xs text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded p-4">
                                No deals in Stage 1
                              </div>
                            ) : (
                              stage1Deals.map((deal) => {
                                const isPosted = deal.origin === "posted";
                                return (
                                  <div
                                    key={deal.id}
                                    className="deal-card bg-white rounded p-4 shadow-xs border border-slate-200 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all text-left"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                          isPosted
                                            ? "bg-slate-950 text-white"
                                            : "bg-slate-100 text-slate-800 border border-slate-200"
                                        }`}
                                      >
                                        {isPosted ? (
                                          <ArrowDown className="w-3 h-3 text-white" />
                                        ) : (
                                          <ArrowUp className="w-3 h-3 text-slate-700" />
                                        )}
                                        <span>{isPosted ? "Posted" : "Requested"}</span>
                                      </span>
                                      <span className="font-mono text-xs text-slate-500 font-bold">
                                        {deal.dealCode}
                                      </span>
                                    </div>

                                    <div>
                                      <h3 className="font-display font-bold text-slate-900 text-sm leading-snug">
                                        {deal.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="font-medium text-slate-700 truncate max-w-[150px]">
                                          {deal.partner}
                                        </span>
                                        {deal.isVerified && (
                                          <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                                        )}
                                      </div>
                                    </div>

                                    <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex flex-col gap-1 text-xs">
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel1}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue1}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel2}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue2}</span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-0.5">
                                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                                        <span>Stage 1 of 4</span>
                                        <span className="text-slate-900 font-semibold">Acknowledgement</span>
                                      </div>
                                      <div className="flex items-center gap-1 w-full">
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDealActionClick(deal)}
                                      className={`mt-1 w-full py-2 px-3 rounded text-xs font-semibold transition-all text-center cursor-pointer ${
                                        deal.actionType === "high-intent"
                                          ? "bg-slate-950 text-white hover:bg-slate-800 shadow-xs active:scale-[0.98]"
                                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                                      }`}
                                    >
                                      {deal.actionLabel}
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* STEP 2: Negotiation */}
                          <div className="bg-slate-100/70 rounded p-4 flex flex-col gap-4 min-h-[640px] border border-slate-200/70">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[11px] font-bold flex items-center justify-center">
                                  2
                                </span>
                                <span className="font-display font-bold text-sm text-slate-900">
                                  Negotiation
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 font-mono text-xs font-bold border border-slate-200">
                                {stage2Deals.length}
                              </span>
                            </div>

                            {stage2Deals.length === 0 ? (
                              <div className="py-12 text-center text-xs text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded p-4">
                                No deals in Stage 2
                              </div>
                            ) : (
                              stage2Deals.map((deal) => {
                                const isPosted = deal.origin === "posted";
                                return (
                                  <div
                                    key={deal.id}
                                    className="deal-card bg-white rounded p-4 shadow-xs border border-slate-200 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all text-left"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                          isPosted
                                            ? "bg-slate-950 text-white"
                                            : "bg-slate-100 text-slate-800 border border-slate-200"
                                        }`}
                                      >
                                        {isPosted ? (
                                          <ArrowDown className="w-3 h-3 text-white" />
                                        ) : (
                                          <ArrowUp className="w-3 h-3 text-slate-700" />
                                        )}
                                        <span>{isPosted ? "Posted" : "Requested"}</span>
                                      </span>
                                      <span className="font-mono text-xs text-slate-500 font-bold">
                                        {deal.dealCode}
                                      </span>
                                    </div>

                                    <div>
                                      <h3 className="font-display font-bold text-slate-900 text-sm leading-snug">
                                        {deal.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="font-medium text-slate-700 truncate max-w-[150px]">
                                          {deal.partner}
                                        </span>
                                        {deal.isVerified && (
                                          <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                                        )}
                                      </div>
                                    </div>

                                    <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex flex-col gap-1 text-xs">
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel1}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue1}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel2}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue2}</span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-0.5">
                                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                                        <span>Stage 2 of 4</span>
                                        <span className="text-slate-900 font-semibold">Negotiation</span>
                                      </div>
                                      <div className="flex items-center gap-1 w-full">
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDealActionClick(deal)}
                                      className={`mt-1 w-full py-2 px-3 rounded text-xs font-semibold transition-all text-center cursor-pointer ${
                                        deal.actionType === "high-intent"
                                          ? "bg-slate-950 text-white hover:bg-slate-800 shadow-xs active:scale-[0.98]"
                                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                                      }`}
                                    >
                                      {deal.actionLabel}
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* STEP 3: Agreement */}
                          <div className="bg-slate-100/70 rounded p-4 flex flex-col gap-4 min-h-[640px] border border-slate-200/70">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[11px] font-bold flex items-center justify-center">
                                  3
                                </span>
                                <span className="font-display font-bold text-sm text-slate-900">
                                  Agreement
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 font-mono text-xs font-bold border border-slate-200">
                                {stage3Deals.length}
                              </span>
                            </div>

                            {stage3Deals.length === 0 ? (
                              <div className="py-12 text-center text-xs text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded p-4">
                                No deals in Stage 3
                              </div>
                            ) : (
                              stage3Deals.map((deal) => {
                                const isPosted = deal.origin === "posted";
                                return (
                                  <div
                                    key={deal.id}
                                    className="deal-card bg-white rounded p-4 shadow-xs border border-slate-200 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all text-left"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                          isPosted
                                            ? "bg-slate-950 text-white"
                                            : "bg-slate-100 text-slate-800 border border-slate-200"
                                        }`}
                                      >
                                        {isPosted ? (
                                          <ArrowDown className="w-3 h-3 text-white" />
                                        ) : (
                                          <ArrowUp className="w-3 h-3 text-slate-700" />
                                        )}
                                        <span>{isPosted ? "Posted" : "Requested"}</span>
                                      </span>
                                      <span className="font-mono text-xs text-slate-500 font-bold">
                                        {deal.dealCode}
                                      </span>
                                    </div>

                                    <div>
                                      <h3 className="font-display font-bold text-slate-900 text-sm leading-snug">
                                        {deal.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="font-medium text-slate-700 truncate max-w-[150px]">
                                          {deal.partner}
                                        </span>
                                        {deal.isVerified && (
                                          <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                                        )}
                                      </div>
                                    </div>

                                    <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex flex-col gap-1 text-xs">
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel1}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue1}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel2}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue2}</span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-0.5">
                                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                                        <span>Stage 3 of 4</span>
                                        <span className="text-slate-900 font-semibold">Agreement</span>
                                      </div>
                                      <div className="flex items-center gap-1 w-full">
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDealActionClick(deal)}
                                      className={`mt-1 w-full py-2 px-3 rounded text-xs font-semibold transition-all text-center cursor-pointer ${
                                        deal.actionType === "high-intent"
                                          ? "bg-slate-950 text-white hover:bg-slate-800 shadow-xs active:scale-[0.98]"
                                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                                      }`}
                                    >
                                      {deal.actionLabel}
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* STEP 4: Handshake */}
                          <div className="bg-slate-100/70 rounded p-4 flex flex-col gap-4 min-h-[640px] border border-slate-200/70">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[11px] font-bold flex items-center justify-center">
                                  4
                                </span>
                                <span className="font-display font-bold text-sm text-slate-900">
                                  Handshake
                                </span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 font-mono text-xs font-bold border border-slate-200">
                                {stage4Deals.length}
                              </span>
                            </div>

                            {stage4Deals.length === 0 ? (
                              <div className="py-12 text-center text-xs text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded p-4">
                                No deals in Stage 4
                              </div>
                            ) : (
                              stage4Deals.map((deal) => {
                                const isPosted = deal.origin === "posted";
                                return (
                                  <div
                                    key={deal.id}
                                    className="deal-card bg-white rounded p-4 shadow-xs border border-slate-200 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all text-left"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                          isPosted
                                            ? "bg-slate-950 text-white"
                                            : "bg-slate-100 text-slate-800 border border-slate-200"
                                        }`}
                                      >
                                        {isPosted ? (
                                          <ArrowDown className="w-3 h-3 text-white" />
                                        ) : (
                                          <ArrowUp className="w-3 h-3 text-slate-700" />
                                        )}
                                        <span>{isPosted ? "Posted" : "Requested"}</span>
                                      </span>
                                      <span className="font-mono text-xs text-slate-500 font-bold">
                                        {deal.dealCode}
                                      </span>
                                    </div>

                                    <div>
                                      <h3 className="font-display font-bold text-slate-900 text-sm leading-snug">
                                        {deal.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                                        <LockOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                        <span className="font-medium text-slate-700 truncate max-w-[150px]">
                                          {deal.partner}
                                        </span>
                                        <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1 rounded font-mono font-bold uppercase">
                                          Unblinded
                                        </span>
                                      </div>
                                    </div>

                                    <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex flex-col gap-1 text-xs">
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel1}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue1}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-slate-500">{deal.metricLabel2}:</span>
                                        <span className="text-slate-900 font-semibold">{deal.metricValue2}</span>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-0.5">
                                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                                        <span>Stage 4 of 4</span>
                                        <span className="text-slate-900 font-semibold">Handshake Complete</span>
                                      </div>
                                      <div className="flex items-center gap-1 w-full">
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                        <div className="h-1.5 flex-1 bg-slate-950 rounded-full"></div>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDealActionClick(deal)}
                                      className="mt-1 w-full py-2 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all text-center cursor-pointer border border-slate-200 flex items-center justify-center gap-1 active:scale-[0.98]"
                                    >
                                      <span>View Closed Transaction</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TABLE LIST VIEW */}
                  {pipelineViewMode === "table" && (
                    <div className="p-4 sm:p-6">
                      {filteredRequests.length === 0 ? (
                        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3 px-4">
                          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                            <Inbox className="w-6 h-6" />
                          </div>
                          <h4 className="font-display font-bold text-base text-slate-900">
                            No Opportunities Found
                          </h4>
                          <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-sans">
                            {hasActiveFilters
                              ? "No bilateral opportunities matched your current filter criteria."
                              : "You don't have any bilateral opportunities or pitches yet."}
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto border border-slate-200 rounded-[4px] bg-white">
                          <table className="w-full text-left border-collapse font-sans text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold bg-slate-50">
                                <th className="py-3.5 px-4">Opportunity &amp; Category</th>
                                <th className="py-3.5 px-4">ID &amp; Code</th>
                                <th className="py-3.5 px-4">Type</th>
                                <th className="py-3.5 px-4">Partner</th>
                                <th className="py-3.5 px-4">Stage &amp; Status</th>
                                <th className="py-3.5 px-4">Date</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredRequests.map((req) => {
                                const {
                                  isInbound,
                                  partnerName,
                                  isVerified,
                                  stageNum,
                                  stageHeadline,
                                  stateCategory,
                                  isHandshakeComplete,
                                } = req.workflow || computeRequestWorkflow(req, business?.id);

                                const isDeclined = req.status === "declined";
                                const isWithdrawn = req.status === "withdrawn";

                                const oppTitle = req.opportunity?.title || "Opportunity Brief";
                                const dealCode = req.opportunity?.opportunity_number
                                  ? `RY-${req.opportunity.opportunity_number}`
                                  : (req.opportunity?.id?.substring(0, 8) || "RY-0000").toUpperCase();
                                const reqCode = req.id?.substring(0, 6)?.toUpperCase() || "0000";

                                return (
                                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-3.5 px-4 space-y-1">
                                      <Link
                                        to="/opportunities"
                                        search={{ q: req.opportunity?.opportunity_number }}
                                        className="font-display font-bold text-slate-900 text-sm hover:text-emerald-700 hover:underline block"
                                      >
                                        {oppTitle}
                                      </Link>
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        {req.opportunity?.category && (
                                          <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                                            {req.opportunity.category === "strategic_advice"
                                              ? "Strategic Advice"
                                              : req.opportunity.category}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-4 font-mono text-slate-600 font-bold whitespace-nowrap">
                                      #{dealCode.replace(/^\[|\]$/g, "")}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                                          isInbound
                                            ? "bg-slate-950 text-white"
                                            : "bg-slate-100 text-slate-800 border border-slate-200"
                                        }`}
                                      >
                                        {isInbound ? "Posted" : "Requested"}
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-4 font-display font-bold text-slate-900 whitespace-nowrap">
                                      {partnerName}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                                        Stage {stageNum}: {stageHeadline}
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-4 font-mono text-slate-500 text-xs whitespace-nowrap">
                                      {new Date(req.created_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </td>
                                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                      {stageNum === 1 && isInbound && !isDeclined && !isWithdrawn && (
                                        <Button
                                          type="button"
                                          variant="high-intent"
                                          size="sm"
                                          onClick={() => handleAcceptIncoming(req.id, partnerName)}
                                        >
                                          Accept
                                        </Button>
                                      )}
                                      <Button
                                        asChild
                                        variant="authoritative"
                                        size="sm"
                                      >
                                        <Link to="/connections/$id" params={{ id: req.id }}>
                                          Exchange Hub
                                        </Link>
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            )}

            {/* ════════════════════════════════════════════════════════════════
                TAB 5: SAVED / BOOKMARKED (Available to all users)
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "saved" && (
              loadingSaved ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Loading bookmarked memos...
                  </span>
                </div>
              ) : savedItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 px-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#E2E8F0] border-dashed flex items-center justify-center text-[#94A3B8] mb-1">
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-[#171F2C] uppercase">
                      No Saved Opportunities
                    </h4>
                    <p className="text-[#64748B] text-xs max-w-sm leading-relaxed font-sans">
                      Bookmark opportunities on the explore feed to review and track them here anytime.
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="authoritative"
                    size="sm"
                    className="mt-2 font-sans font-semibold"
                  >
                    <Link to="/opportunities">
                      Explore Opportunities
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <div className="space-y-0.5">
                      <h3 className="font-sans font-bold text-sm text-[#171F2C] uppercase tracking-tight">
                        Bookmarked Opportunities ({savedItems.length})
                      </h3>
                      <p className="text-xs text-[#64748B] font-sans">
                        Quick access to opportunity memorandums you have saved from the explore board.
                      </p>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto border border-[#E2E8F0] rounded-[4px]">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-sans uppercase tracking-wider text-[#64748B] font-semibold">
                          <th className="py-3 px-4">Deal ID</th>
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Company</th>
                          <th className="py-3 px-4">Industry / Location</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] bg-white">
                        {savedItems.map((item) => {
                          const opp = item.opportunity;
                          const isClosed = opp.status === "closed";
                          const isExpired = opp.expires_at ? new Date(opp.expires_at) < new Date() : false;
                          const isInactive = isClosed || isExpired;
                          const isConnected = store[opp.id]?.status === "accepted";
                          const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                          const displayName = shouldHide
                            ? "Confidential"
                            : opp.company || opp.business?.company_name || "Confidential";

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              onClick={() => {
                                setSelectedDetailOpp(opp);
                                setDetailOpen(true);
                              }}
                            >
                              <td className="py-3 px-4">
                                <DealCodeStamp
                                  code={
                                    opp.opportunity_number
                                      ? `RY-${opp.opportunity_number}`
                                      : opp.id.substring(0, 8).toUpperCase()
                                  }
                                />
                              </td>
                              <td className="py-3 px-4 font-semibold text-[#171F2C] max-w-xs truncate">
                                {opp.title}
                              </td>
                              <td className="py-3 px-4">
                                <CategoryPill
                                  category={opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                                />
                              </td>
                              <td className="py-3 px-4 font-semibold text-[#171F2C]">{displayName}</td>
                              <td className="py-3 px-4 space-y-0.5 text-[#64748B] text-xs">
                                <div>{opp.industry}</div>
                                <div className="text-[11px] text-[#94A3B8]">{opp.location || "Remote"}</div>
                              </td>
                              <td className="py-3 px-4">
                                {isInactive ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">
                                    {isClosed ? "Closed" : "Expired"}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">
                                    Active
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div
                                  className="flex items-center justify-end gap-1.5"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-7 px-2.5 text-[11px] font-sans font-semibold"
                                    onClick={() => {
                                      setSelectedDetailOpp(opp);
                                      setDetailOpen(true);
                                    }}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="h-7 px-2.5 text-[11px] font-sans font-semibold"
                                    onClick={(e) => handleRemoveSaved(opp.id, e)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="block md:hidden divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-[4px] bg-white">
                    {savedItems.map((item) => {
                      const opp = item.opportunity;
                      const isClosed = opp.status === "closed";
                      const isExpired = opp.expires_at ? new Date(opp.expires_at) < new Date() : false;
                      const isInactive = isClosed || isExpired;
                      const isConnected = store[opp.id]?.status === "accepted";
                      const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                      const displayName = shouldHide
                        ? "Confidential"
                        : opp.company || opp.business?.company_name || "Confidential";

                      return (
                        <div
                          key={item.id}
                          className="p-4 space-y-3 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                          onClick={() => {
                            setSelectedDetailOpp(opp);
                            setDetailOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <DealCodeStamp
                              code={
                                opp.opportunity_number
                                  ? `RY-${opp.opportunity_number}`
                                  : opp.id.substring(0, 8).toUpperCase()
                              }
                            />
                            {isInactive ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">
                                {isClosed ? "Closed" : "Expired"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-sans font-bold text-[#171F2C] text-sm leading-snug">
                              {opp.title}
                            </h4>
                            <p className="text-xs font-semibold text-[#64748B]">{displayName}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <CategoryPill
                                category={opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-[#64748B] text-xs">
                            <div className="flex flex-col gap-0.5">
                              <div>{opp.industry}</div>
                              <div className="text-[11px] text-[#94A3B8]">{opp.location || "Remote"}</div>
                            </div>
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-2.5 text-[11px] font-sans font-semibold"
                                onClick={() => {
                                  setSelectedDetailOpp(opp);
                                  setDetailOpen(true);
                                }}
                              >
                                View
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="h-7 px-2.5 text-[11px] font-sans font-semibold"
                                onClick={(e) => handleRemoveSaved(opp.id, e)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </main>
      )}

      {/* CREATE MODAL */}
      <Modal
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Post Opportunity Brief"
        description="Outline your requirement brief. Opportunities are matched with verified businesses across the network."
        onSubmit={handleCreateSubmit}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setCreateOpen(false),
        }}
        primaryAction={{
          label: "Publish Brief",
          type: "submit",
          loading: submitting,
          variant: "authoritative",
        }}
      >
        {/* Title */}
        <div className="space-y-1.5">
          <Label required>Opportunity Title</Label>
          <Input
            required
            placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label required>Exchange Category</Label>
          <Select value={category} onValueChange={(val) => setCategory(val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="partnership">Partnership (Integrations, API merges)</SelectItem>
              <SelectItem value="referral">Referral (Client exchanges, Mutual handoffs)</SelectItem>
              <SelectItem value="distribution">Distribution (IT Consultancies, Resellers)</SelectItem>
              <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
              <SelectItem value="hiring">Hiring (Recruitment, Talent pipeline requests)</SelectItem>
              <SelectItem value="strategic_advice">Strategic Advice (Advisory, Mentorship)</SelectItem>
              <SelectItem value="investment">Investment (Funding requests, Capital raises)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-1.5">
          <Label required>Industry Type</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {INDUSTRIES.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label required>Brief Description</Label>
            <span className="text-[11px] font-sans text-slate-400">
              {description.length} / 50 min chars
            </span>
          </div>
          <Textarea
            required
            rows={4}
            maxLength={3000}
            placeholder="Describe your requirement in detail. Provide background context, scope of work, timeline, and expectations (min 50 chars)."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid min-w-0 sm:grid-cols-2 gap-3.5">
          {/* Location */}
          <div className="space-y-1.5">
            <Label>Location (Optional)</Label>
            <Input
              placeholder="e.g. United States / Remote / Global"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Expiry */}
          <div className="space-y-1.5">
            <Label required>Listing Duration</Label>
            <Select value={expiryDays} onValueChange={setExpiryDays}>
              <SelectTrigger>
                <SelectValue placeholder="Select Expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="never">Never (Persistent)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Offer text */}
        <div className="space-y-1.5">
          <Label>What Can You Offer in Return? (Optional)</Label>
          <Input
            placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
            value={offerText}
            onChange={(e) => setOfferText(e.target.value)}
          />
        </div>

        {/* Anonymous Checkbox */}
        <div className="flex items-center space-x-2.5 pt-1">
          <Checkbox
            id="hide_company_name"
            checked={hideCompanyName}
            onCheckedChange={(checked) => setHideCompanyName(!!checked)}
            disabled={promote}
          />
          <label
            htmlFor="hide_company_name"
            className={`text-xs font-sans font-medium cursor-pointer select-none ${
              promote ? "text-slate-400 cursor-not-allowed" : "text-[#171F2C]"
            }`}
          >
            Post anonymously (Hide company name from public feed)
          </label>
        </div>

        {/* Promote Banner */}
        <div
          className={`p-3.5 border rounded-[4px] transition-all flex items-start space-x-3 ${
            hideCompanyName
              ? "bg-[#F8FAFC] border-[#E2E8F0] opacity-60 cursor-not-allowed"
              : promote
                ? "bg-[#FFF7ED] border-[#FED7AA]"
                : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
          }`}
        >
          <Checkbox
            id="promote"
            checked={promote}
            accent="orange"
            onCheckedChange={(checked) => setPromote(!!checked)}
            className="mt-0.5"
            disabled={hideCompanyName}
          />
          <div className="space-y-0.5 select-none flex-1">
            <label
              htmlFor="promote"
              className={`text-xs font-sans font-bold block ${
                hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-[#C2410C] cursor-pointer"
              }`}
            >
              Promote listing for 10x visibility
            </label>
            <p
              className={`text-xs font-sans leading-relaxed ${
                hideCompanyName ? "text-slate-400" : "text-[#64748B]"
              }`}
            >
              Featured listings are highlighted with an orange badge and given top priority in the dealflow feed.
            </p>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Opportunity Brief"
        description={`Update details for #${selectedOpp?.opportunity_number || selectedOpp?.id?.substring(0, 8)}.`}
        onSubmit={handleEditSubmit}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setEditOpen(false),
        }}
        primaryAction={{
          label: "Save Changes",
          type: "submit",
          loading: submitting,
          variant: "authoritative",
        }}
      >
        {/* Title */}
        <div className="space-y-1.5">
          <Label required>Opportunity Title</Label>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label required>Exchange Category</Label>
          <Select value={category} onValueChange={(val) => setCategory(val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="partnership">Partnership (Integrations, API merges)</SelectItem>
              <SelectItem value="referral">Referral (Client exchanges, Mutual handoffs)</SelectItem>
              <SelectItem value="distribution">Distribution (IT Consultancies, Resellers)</SelectItem>
              <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
              <SelectItem value="hiring">Hiring (Recruitment, Talent pipeline requests)</SelectItem>
              <SelectItem value="strategic_advice">Strategic Advice (Advisory, Mentorship)</SelectItem>
              <SelectItem value="investment">Investment (Funding requests, Capital raises)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-1.5">
          <Label required>Industry Type</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {INDUSTRIES.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label required>Brief Description</Label>
            <span className="text-[11px] font-sans text-slate-400">
              {description.length} / 50 min chars
            </span>
          </div>
          <Textarea
            required
            rows={4}
            maxLength={3000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid min-w-0 sm:grid-cols-2 gap-3.5">
          {/* Location */}
          <div className="space-y-1.5">
            <Label>Location (Optional)</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Expiry */}
          <div className="space-y-1.5">
            <Label>Expiry</Label>
            <Select value={expiryDays} onValueChange={setExpiryDays}>
              <SelectTrigger>
                <SelectValue placeholder="Keep current expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="keep">Keep Current Expiry</SelectItem>
                <SelectItem value="7">+7 Days from Now</SelectItem>
                <SelectItem value="14">+14 Days from Now</SelectItem>
                <SelectItem value="30">+30 Days from Now</SelectItem>
                <SelectItem value="60">+60 Days from Now</SelectItem>
                <SelectItem value="never">Never (Persistent)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Offer text */}
        <div className="space-y-1.5">
          <Label>What Can You Offer in Return? (Optional)</Label>
          <Input
            value={offerText}
            onChange={(e) => setOfferText(e.target.value)}
          />
        </div>

        {/* Anonymous Checkbox */}
        <div className="flex items-center space-x-2.5 pt-1">
          <Checkbox
            id="hide_company_name_edit"
            checked={hideCompanyName}
            onCheckedChange={(checked) => setHideCompanyName(!!checked)}
            disabled={promote}
          />
          <label
            htmlFor="hide_company_name_edit"
            className={`text-xs font-sans font-medium cursor-pointer select-none ${
              promote ? "text-slate-400 cursor-not-allowed" : "text-[#171F2C]"
            }`}
          >
            Post anonymously (Hide company name from public feed)
          </label>
        </div>

        {/* Promote Banner */}
        <div
          className={`p-3.5 border rounded-[4px] transition-all flex items-start space-x-3 ${
            hideCompanyName
              ? "bg-[#F8FAFC] border-[#E2E8F0] opacity-60 cursor-not-allowed"
              : promote
                ? "bg-[#FFF7ED] border-[#FED7AA]"
                : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
          }`}
        >
          <Checkbox
            id="promote_edit"
            checked={promote}
            accent="orange"
            onCheckedChange={(checked) => setPromote(!!checked)}
            className="mt-0.5"
            disabled={hideCompanyName}
          />
          <div className="space-y-0.5 select-none flex-1">
            <label
              htmlFor="promote_edit"
              className={`text-xs font-sans font-bold block ${
                hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-[#C2410C] cursor-pointer"
              }`}
            >
              Promote listing for 10x visibility
            </label>
            <p
              className={`text-xs font-sans leading-relaxed ${
                hideCompanyName ? "text-slate-400" : "text-[#64748B]"
              }`}
            >
              Featured listings are highlighted with an orange badge and given top priority in the dealflow feed.
            </p>
          </div>
        </div>
      </Modal>

      {/* DETAIL BRIEF MODAL */}
      <Modal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        title={selectedDetailOpp?.title || "Opportunity Details"}
        description={
          selectedDetailOpp && (
            <div className="pt-0.5">
              <DealCodeStamp
                code={
                  selectedDetailOpp.opportunity_number
                    ? `RY-${selectedDetailOpp.opportunity_number}`
                    : (selectedDetailOpp.id?.substring(0, 8) || "RY-0000").toUpperCase()
                }
              />
            </div>
          )
        }
        secondaryAction={{
          label: "Close",
          onClick: () => setDetailOpen(false),
        }}
      >
        {selectedDetailOpp &&
          (() => {
            const isClosed = selectedDetailOpp.status === "closed";
            const isExpired = selectedDetailOpp.expires_at
              ? new Date(selectedDetailOpp.expires_at) < new Date()
              : false;
            const isInactive = isClosed || isExpired;
            const isConnected = store[selectedDetailOpp.id]?.status === "accepted";
            const shouldHide = selectedDetailOpp.hide_company_name && !isConnected && !isApproved;
            const displayName = shouldHide
              ? "Confidential"
              : selectedDetailOpp.company ||
                selectedDetailOpp.business?.company_name ||
                "Confidential";
            const initials = shouldHide ? "🔒" : getCompanyInitials(displayName);

            return (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CategoryPill
                    category={
                      selectedDetailOpp.category === "strategic_advice"
                        ? "Strategic Advice"
                        : selectedDetailOpp.category || selectedDetailOpp.type || "Opportunity"
                    }
                  />
                  {isInactive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA]">
                      {isClosed ? "Closed" : "Expired"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">
                      Active
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-[#171F2C] leading-relaxed font-sans bg-[#F8FAFC] p-3.5 border border-[#E2E8F0] rounded-[4px]">
                  {selectedDetailOpp.description}
                </div>

                {selectedDetailOpp.offer_text && (
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">
                      What is offered:
                    </span>
                    <p className="text-xs text-[#171F2C] font-sans leading-relaxed">{selectedDetailOpp.offer_text}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-b border-[#E2E8F0] py-3">
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">
                      Company
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-[2px] bg-[#171F2C] flex items-center justify-center font-sans text-[8px] font-bold text-white uppercase">
                        {initials}
                      </div>
                      <span className="text-xs font-semibold text-[#171F2C] break-words">{displayName}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">
                      Industry
                    </span>
                    <span className="text-xs text-[#171F2C] font-sans">
                      {selectedDetailOpp.industry || selectedDetailOpp.business?.industry || "Not Specified"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">
                      Location
                    </span>
                    <span className="text-xs text-[#171F2C] font-sans">
                      {selectedDetailOpp.location || "Remote"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#64748B] font-semibold block">
                      Expires
                    </span>
                    <span className="text-xs text-[#171F2C] font-mono">
                      {selectedDetailOpp.expires_at
                        ? new Date(selectedDetailOpp.expires_at).toLocaleDateString()
                        : "Never"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
      </Modal>

      {/* 1. NCND SIGNING MODAL */}
      <Dialog open={ncndModalOpen} onOpenChange={setNcndModalOpen}>
        <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-950">
              Sign Bilateral Non-Circumvention &amp; Non-Disclosure (NCND)
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans">
              Review mutual confidentiality and non-circumvention covenants for {selectedPipelineDeal?.title} ({selectedPipelineDeal?.dealCode}).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-2 text-xs text-slate-600 bg-slate-50 p-4 rounded border border-slate-200">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-700">Counterparty Entity:</span>
              <span className="font-bold text-slate-900">{selectedPipelineDeal?.partner}</span>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-slate-800 uppercase tracking-wider font-mono text-[10px]">
                Mutual Terms &amp; Covenant Scope:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-600 leading-relaxed font-sans">
                <li>Strict mutual confidentiality regarding business metrics, facility values, and technical architectures.</li>
                <li>24-month non-circumvention protection governing introduced client, supplier, and distributor relationships.</li>
                <li>Legally binding digital execution enforceable under standard bilateral commercial protocols.</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setNcndModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="high-intent"
              size="sm"
              onClick={() => {
                setNcndModalOpen(false);
                toast.success("Bilateral NCND Signed!", {
                  description: `Mutual NCND executed with ${selectedPipelineDeal?.partner}. Deal advanced to Stage 2: Negotiation.`,
                });
              }}
            >
              Sign &amp; Authorize NCND
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. COUNTER-OFFER REVIEW MODAL */}
      <Dialog open={counterOfferModalOpen} onOpenChange={setCounterOfferModalOpen}>
        <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-950">
              Review Partner Counter-Offer
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans">
              {selectedPipelineDeal?.partner} has submitted revised terms for {selectedPipelineDeal?.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 my-2 text-xs bg-slate-50 p-4 rounded border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500">Proposed Revenue Share:</span>
              <span className="font-bold text-slate-900">{selectedPipelineDeal?.metricValue1 || "25% Net Revenue"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500">Status &amp; SLA Terms:</span>
              <span className="font-bold text-slate-900">{selectedPipelineDeal?.metricValue2 || "Clause 8.2 Under Review"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Review Stage:</span>
              <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Action Needed
              </span>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setCounterOfferModalOpen(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCounterOfferModalOpen(false);
                  toast.info("Revision Note Dispatched", {
                    description: `Counter-proposal feedback sent back to ${selectedPipelineDeal?.partner}.`,
                  });
                }}
              >
                Request Revisions
              </Button>
              <Button
                variant="high-intent"
                size="sm"
                onClick={() => {
                  setCounterOfferModalOpen(false);
                  toast.success("Counter-Offer Accepted!", {
                    description: `Terms locked. Deal advanced to Stage 3: Agreement.`,
                  });
                }}
              >
                Accept Terms
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. REDLINES SUBMISSION MODAL */}
      <Dialog open={redlinesModalOpen} onOpenChange={setRedlinesModalOpen}>
        <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-950">
              Submit Agreement Redlines &amp; Revisions
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans">
              Propose specific clause adjustments or licensing modifications to {selectedPipelineDeal?.partner}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 my-2 text-xs">
            <div className="space-y-1.5">
              <Label required>Clause Modifications / Legal Notes</Label>
              <Textarea
                placeholder="e.g. Clause 4.1: Upfront licensing tranche adjustment to $3.2M with quarterly milestones..."
                className="h-28 text-xs bg-slate-50 border-slate-200 text-slate-900"
                defaultValue={`Licensing Fee: ${selectedPipelineDeal?.metricValue1 || "$3.2M Upfront"} with ${selectedPipelineDeal?.metricValue2 || "Global Exclusive"} territory covenants as specified in brief ${selectedPipelineDeal?.dealCode || "RY-0052"}.`}
              />
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setRedlinesModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="high-intent"
              size="sm"
              onClick={() => {
                setRedlinesModalOpen(false);
                toast.success("Redlines Submitted!", {
                  description: `Your revisions have been submitted to ${selectedPipelineDeal?.partner} legal counsel.`,
                });
              }}
            >
              Submit Redlines
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. COUNTERSIGN AGREEMENT MODAL */}
      <Dialog open={countersignModalOpen} onOpenChange={setCountersignModalOpen}>
        <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-950">
              Countersign Bilateral Agreement
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-sans">
              {selectedPipelineDeal?.partner} has signed (1/2). Your signature executes the contract.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 my-2 text-xs bg-slate-50 p-4 rounded border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500">Opportunity Mandate:</span>
              <span className="font-bold text-slate-900">{selectedPipelineDeal?.title}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500">Partner Execution Status:</span>
              <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[10px]">
                ✓ Partner Signed (1/2)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Mandate Value:</span>
              <span className="font-bold text-slate-900">{selectedPipelineDeal?.metricValue1 || "$18.9M Dual Covenant"}</span>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setCountersignModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="high-intent"
              size="sm"
              onClick={() => {
                setCountersignModalOpen(false);
                toast.success("Agreement Ratified & Executed!", {
                  description: `Deal moved to Stage 4: Handshake Complete. Unblinded details are now fully unlocked.`,
                });
              }}
            >
              Countersign &amp; Execute Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
