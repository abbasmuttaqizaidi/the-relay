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
import { cn, getCompanyInitials } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import { TooltipSimple } from "@/components/ui/tooltip";
import { PostTypeSelectionModal } from "@/components/post/PostTypeSelectionModal";
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
  Coins,
  Repeat,
  FileText,
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
  UrgentBadge,
  ExecutiveTabs,
} from "@/design-system";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";

const myRelaySearchSchema = z.object({
  tab: z
    .enum([
      "listings",
      "requests",
      "saved",
      "incoming",
      "sent",
      "executed",
      "inbound",
      "outbound",
    ])
    .optional(),
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
      { name: "robots", content: "noindex, nofollow" },
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
    staleTime: 1000 * 60 * 1,
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

  const activeTabStorageKey = userId
    ? `relay_my_relay_active_tab_${userId}`
    : "relay_my_relay_active_tab";

  const originStorageKey = userId
    ? `relay_pipeline_origin_${userId}`
    : "relay_pipeline_origin";

  const [activeTab, setActiveTab] = useState<"listings" | "requests" | "saved">(() => {
    if (tab === "listings") return "listings";
    if (tab === "saved") return "saved";
    if (
      tab === "inbound" ||
      tab === "outbound" ||
      tab === "incoming" ||
      tab === "sent" ||
      tab === "executed" ||
      tab === "requests"
    ) {
      return "requests";
    }
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(activeTabStorageKey);
        if (stored === "listings") return "listings";
        if (stored === "saved") return "saved";
        if (stored === "inbound" || stored === "outbound" || stored === "requests") return "requests";
      } catch {}
    }
    return "requests";
  });

  const handleTabChange = (newTab: "listings" | "requests" | "saved") => {
    setActiveTab(newTab);
    const targetSearchTab =
      newTab === "requests"
        ? originFilter === "requested"
          ? "outbound"
          : "inbound"
        : newTab;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(activeTabStorageKey, targetSearchTab);
      } catch {}
    }
    navigate({ to: "/my-relay", search: { tab: targetSearchTab as any } });
  };

  // Request Filter states for My Opportunities Table
  const [opportunitySection, setOpportunitySection] = useState<"all" | "posted" | "requested">(
    () => {
      if (tab === "sent" || tab === "outbound") return "requested";
      if (tab === "incoming" || tab === "inbound") return "posted";
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
  const [originFilter, setOriginFilter] = useState<"posted" | "requested">(() => {
    if (tab === "outbound" || tab === "sent") return "requested";
    if (tab === "inbound" || tab === "incoming") return "posted";
    if (typeof window !== "undefined") {
      try {
        const storedOrigin = localStorage.getItem(originStorageKey);
        if (storedOrigin === "requested" || storedOrigin === "posted") {
          return storedOrigin;
        }
        const storedTab = localStorage.getItem(activeTabStorageKey);
        if (storedTab === "outbound") return "requested";
      } catch {
        // ignore
      }
    }
    return "posted";
  });

  const handleSetOriginFilter = (filter: "posted" | "requested") => {
    setOriginFilter(filter);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(originStorageKey, filter);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      try {
        const stored = localStorage.getItem(`relay_pipeline_origin_${userId}`);
        if (stored === "requested" || stored === "posted") {
          setOriginFilter(stored);
        }
      } catch {
        // ignore
      }
    }
  }, [userId]);

  const [selectedStageTab, setSelectedStageTab] = useState<
    "stage_1" | "stage_2" | "stage_3" | "stage_4"
  >("stage_1");
  const [directionFilter, setDirectionFilter] = useState<"all" | "posted" | "requested">(() => {
    if (tab === "outbound" || tab === "sent") return "requested";
    if (tab === "inbound" || tab === "incoming") return "posted";
    return "all";
  });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<
    "action_first" | "stage_asc" | "stage_desc" | "recent"
  >("action_first");
  const [protocolModalOpen, setProtocolModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
  const [postTypeModalOpen, setPostTypeModalOpen] = useState(false);
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
    if (tab === "listings") {
      setActiveTab("listings");
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(activeTabStorageKey, "listings");
        } catch {}
      }
    } else if (tab === "saved") {
      setActiveTab("saved");
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(activeTabStorageKey, "saved");
        } catch {}
      }
    } else if (tab === "inbound" || tab === "incoming") {
      setActiveTab("requests");
      setOriginFilter("posted");
      setDirectionFilter("posted");
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(activeTabStorageKey, "inbound");
          localStorage.setItem(originStorageKey, "posted");
        } catch {}
      }
      if (tab === "incoming") {
        setOpportunitySection("posted");
        setRequestStateFilter("action_needed");
      }
    } else if (tab === "outbound" || tab === "sent") {
      setActiveTab("requests");
      setOriginFilter("requested");
      setDirectionFilter("requested");
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(activeTabStorageKey, "outbound");
          localStorage.setItem(originStorageKey, "requested");
        } catch {}
      }
      if (tab === "sent") {
        setOpportunitySection("requested");
        setRequestStateFilter("waiting");
      }
    } else if (tab === "executed" || tab === "requests") {
      setActiveTab("requests");
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            activeTabStorageKey,
            originFilter === "requested" ? "outbound" : "inbound"
          );
        } catch {}
      }
      if (tab === "executed") {
        setRequestStateFilter("completed");
      }
    } else if (!tab) {
      // Direct navigation to /my-relay without tab param -> Restore from storage or default to inbound
      if (typeof window !== "undefined") {
        try {
          const storedTab = localStorage.getItem(activeTabStorageKey);
          if (storedTab === "listings") {
            setActiveTab("listings");
            return;
          }
          if (storedTab === "saved") {
            setActiveTab("saved");
            return;
          }
          if (storedTab === "outbound") {
            setActiveTab("requests");
            setOriginFilter("requested");
            setDirectionFilter("requested");
            return;
          }
        } catch {}
      }
      // Default to inbound
      setActiveTab("requests");
      setOriginFilter("posted");
      setDirectionFilter("all");
    }
  }, [tab, activeTabStorageKey, originStorageKey, navigate]);

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

  // Trigger create flow if ?create=true
  useEffect(() => {
    if (create && business) {
      if (business.status === "approved") {
        setPostTypeModalOpen(true);
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
  // Withdrawn requests are excluded from active pipeline & opportunities view
  const allCombinedRequests = useMemo(() => {
    const inbound = incomingRequests
      .filter((r) => r.status !== "withdrawn" && r.status !== "pending")
      .map((r) => ({
        ...r,
        direction: "inbound" as const,
        partnerBusiness: r.requesting_business,
      }));
    const outbound = sentRequests
      .filter((r) => r.status !== "withdrawn")
      .map((r) => ({
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

  const actionNeededCount = postedActionNeededCount + requestedActionNeededCount;
  const waitingCount = postedWaitingCount + requestedWaitingCount;
  const completedCount = postedCompletedCount + requestedCompletedCount;

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

    return dynamicDeals;
  }, [allCombinedRequestsWithWorkflow, business?.id]);

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

  // Scope workspace deals by direction filter for stage tab counters and metrics
  const directionScopedWorkspaceDeals = useMemo(() => {
    return allCombinedRequestsWithWorkflow.filter((deal) => {
      if (directionFilter === "posted" && deal.direction !== "inbound") return false;
      if (directionFilter === "requested" && deal.direction !== "outbound") return false;
      if (categoryFilter !== "all") {
        const cat = (deal.opportunity?.category || deal.opportunity?.type || "").toLowerCase();
        if (!cat.includes(categoryFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [allCombinedRequestsWithWorkflow, directionFilter, categoryFilter]);

  const workspaceStage1Deals = useMemo(
    () => directionScopedWorkspaceDeals.filter((d) => d.workflow.stageNum <= 2),
    [directionScopedWorkspaceDeals]
  );
  const workspaceStage2Deals = useMemo(
    () => directionScopedWorkspaceDeals.filter((d) => d.workflow.stageNum === 3),
    [directionScopedWorkspaceDeals]
  );
  const workspaceStage3Deals = useMemo(
    () => directionScopedWorkspaceDeals.filter((d) => d.workflow.stageNum === 4),
    [directionScopedWorkspaceDeals]
  );
  const workspaceStage4Deals = useMemo(
    () =>
      directionScopedWorkspaceDeals.filter(
        (d) => d.workflow.stageNum === 5 || d.workflow.isHandshakeComplete
      ),
    [directionScopedWorkspaceDeals]
  );

  const stage1Count = workspaceStage1Deals.length;
  const stage2Count = workspaceStage2Deals.length;
  const stage3Count = workspaceStage3Deals.length;
  const stage4Count = workspaceStage4Deals.length;

  const totalActionNeededCount = useMemo(
    () => directionScopedWorkspaceDeals.filter((r) => r.workflow.stateCategory === "action_needed").length,
    [directionScopedWorkspaceDeals]
  );
  const totalWaitingCount = useMemo(
    () => directionScopedWorkspaceDeals.filter((r) => r.workflow.stateCategory === "waiting").length,
    [directionScopedWorkspaceDeals]
  );
  const totalCompletedCount = useMemo(
    () => directionScopedWorkspaceDeals.filter((r) => r.workflow.stateCategory === "completed").length,
    [directionScopedWorkspaceDeals]
  );

  const filteredWorkspaceDeals = useMemo(() => {
    return allCombinedRequestsWithWorkflow
      .filter((deal) => {
        // 1. Stage Tab Filter
        if (selectedStageTab === "stage_1" && deal.workflow.stageNum > 2) return false;
        if (selectedStageTab === "stage_2" && deal.workflow.stageNum !== 3) return false;
        if (selectedStageTab === "stage_3" && deal.workflow.stageNum !== 4) return false;
        if (
          selectedStageTab === "stage_4" &&
          deal.workflow.stageNum !== 5 &&
          !deal.workflow.isHandshakeComplete
        )
          return false;

        // 2. Direction Filter
        if (directionFilter === "posted" && deal.direction !== "inbound") return false;
        if (directionFilter === "requested" && deal.direction !== "outbound") return false;

        // 3. Category Filter
        if (categoryFilter !== "all") {
          const cat = (deal.opportunity?.category || deal.opportunity?.type || "").toLowerCase();
          if (!cat.includes(categoryFilter.toLowerCase())) return false;
        }

        // 4. Search Query Filter
        if (dealSearchInput.trim()) {
          const q = dealSearchInput.toLowerCase().trim();
          const oppTitle = (deal.opportunity?.title || "").toLowerCase();
          const dealCode = (
            deal.opportunity?.opportunity_number
              ? `ry-${deal.opportunity.opportunity_number}`
              : deal.id || ""
          ).toLowerCase();
          const partner = (
            deal.workflow?.partnerName ||
            deal.partnerBusiness?.company_name ||
            ""
          ).toLowerCase();
          const msg = (deal.message || "").toLowerCase();
          const offer = (deal.opportunity?.offer_text || "").toLowerCase();

          if (
            !oppTitle.includes(q) &&
            !dealCode.includes(q) &&
            !partner.includes(q) &&
            !msg.includes(q) &&
            !offer.includes(q)
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortFilter === "action_first") {
          const aAction = a.workflow.stateCategory === "action_needed" ? 1 : 0;
          const bAction = b.workflow.stateCategory === "action_needed" ? 1 : 0;
          if (aAction !== bAction) return bAction - aAction;
        }
        if (sortFilter === "stage_asc") {
          return a.workflow.stageNum - b.workflow.stageNum;
        }
        if (sortFilter === "stage_desc") {
          return b.workflow.stageNum - a.workflow.stageNum;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [
    allCombinedRequestsWithWorkflow,
    selectedStageTab,
    directionFilter,
    categoryFilter,
    dealSearchInput,
    sortFilter,
  ]);

  const DEALS_PER_PAGE = 4;
  const totalDealsCount = filteredWorkspaceDeals.length;
  const totalPages = Math.max(1, Math.ceil(totalDealsCount / DEALS_PER_PAGE));
  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * DEALS_PER_PAGE;
    return filteredWorkspaceDeals.slice(start, start + DEALS_PER_PAGE);
  }, [filteredWorkspaceDeals, currentPage]);

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
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["sent-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-handshake-count"] });
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
    setPostTypeModalOpen(true);
  };

  const handleOpenEdit = (opp: any) => {
    if (!business || business.status !== "approved") {
      toast.error("Forbidden: Only approved businesses can edit opportunities.");
      return;
    }
    navigate({ to: "/post", search: { type: "opportunity", edit: opp.id } as any });
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
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#171F2C] uppercase tracking-tight">
                  {activeTab === "listings"
                    ? "My Listings"
                    : activeTab === "saved"
                      ? "Saved Opportunities"
                      : "My Opportunities"}
                </h1>
                <span className="px-2 py-0.5 bg-[#171F2C] text-white font-mono text-[9px] uppercase tracking-widest font-bold rounded-[2px]">
                  {activeTab === "listings"
                    ? "POSTED"
                    : activeTab === "saved"
                      ? "BOOKMARKS"
                      : "BILATERAL HUB"}
                </span>
              </div>
              <p className="text-[#64748B] text-xs md:text-sm max-w-2xl leading-relaxed">
                {activeTab === "listings"
                  ? "Manage, edit, and track all opportunities and requirements posted by your organization."
                  : activeTab === "saved"
                    ? "Quick access to opportunity memorandums you have bookmarked from the commercial board."
                    : "Centralized workspace for your active bilateral opportunities, reciprocal requests, and verified lifecycle stages."}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {activeTab === "requests" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={handleExportSummary}
                    className="gap-1.5 text-[#171F2C]"
                  >
                    <Download className="w-4 h-4 text-[#64748B]" />
                    <span>Export Summary</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => setProtocolModalOpen(true)}
                    className="gap-1.5 text-[#171F2C]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#64748B]" />
                    <span>Protocol Rules</span>
                  </Button>
                </>
              )}
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

          {/* MAIN CONTENT AREA */}
          <div id="my-relay-content-area" className="w-full">
            {/* ════════════════════════════════════════════════════════════════
                TAB 1: MY LISTINGS (Posted by current user)
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "listings" && (
              loadingListings ? (
                <div className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Fetching your posted listings...
                  </span>
                </div>
              ) : myOpps.length === 0 ? (
                <div className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs py-20 text-center flex flex-col items-center justify-center space-y-4 px-4">
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
                <div className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs">
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
                    ))}                    </div>
                  </div>
                )
              )}

            {/* ════════════════════════════════════════════════════════════════
                TAB 2: MY OPPORTUNITIES / BILATERAL DEALROOM WORKSPACE
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "requests" && (
              loadingIncoming || loadingSent ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#75777c]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#75777c] font-semibold">
                    Loading bilateral workspace &amp; deal ledger...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full space-y-6">
                  {/* Navigation Tabs & Filtration Bar */}
                  <div className="space-y-4">
                    {/* 4 Stage Tabs Strip using Design System */}
                    <div className="overflow-x-auto">
                      <div className="min-w-[500px]">
                        <ExecutiveTabs
                          variant="boxed"
                          fullWidth
                          activeTab={selectedStageTab}
                          onTabChange={(tabId) => {
                            setSelectedStageTab(tabId as any);
                            setCurrentPage(1);
                          }}
                          tabs={[
                            { id: "stage_1", label: "1. Acknowledgement", count: stage1Count },
                            { id: "stage_2", label: "2. Negotiation", count: stage2Count },
                            { id: "stage_3", label: "3. Agreement", count: stage3Count },
                            { id: "stage_4", label: "4. Handshake", count: stage4Count },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Filtration Bar (Only Search Bar Active, Other Filters Commented) */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 bg-white border border-[#E2E8F0] rounded-[4px] p-2.5 shadow-2xs">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] focus-within:border-[#171F2C] rounded-[4px] flex-1 transition-colors">
                        <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
                        <input
                          type="text"
                          value={dealSearchInput}
                          onChange={(e) => {
                            setDealSearchInput(e.target.value);
                            setCurrentPage(1);
                          }}
                          placeholder="Search by ID, deal title, counterparty, or terms..."
                          className="bg-transparent border-0 outline-none text-[#171F2C] text-xs sm:text-sm w-full placeholder:text-[#94A3B8] focus:ring-0"
                        />
                        {dealSearchInput && (
                          <button
                            type="button"
                            onClick={() => {
                              setDealSearchInput("");
                              setCurrentPage(1);
                            }}
                            className="text-[#94A3B8] hover:text-[#171F2C] p-0.5 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      {/*
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] px-3 py-1.5 text-xs text-[#171F2C]">
                          <span className="font-mono text-[10px] uppercase text-[#64748B] tracking-wider font-semibold">
                            DIRECTION:
                          </span>
                          <select
                            value={directionFilter}
                            onChange={(e: any) => {
                              setDirectionFilter(e.target.value);
                              setCurrentPage(1);
                            }}
                            className="bg-transparent border-none focus:outline-none font-medium text-xs cursor-pointer pr-1 text-[#171F2C]"
                          >
                            <option value="all">All (Inbound &amp; Outbound)</option>
                            <option value="posted">Inbound Only</option>
                            <option value="requested">Outbound Only</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] px-3 py-1.5 text-xs text-[#171F2C]">
                          <span className="font-mono text-[10px] uppercase text-[#64748B] tracking-wider font-semibold">
                            CATEGORY:
                          </span>
                          <select
                            value={categoryFilter}
                            onChange={(e) => {
                              setCategoryFilter(e.target.value);
                              setCurrentPage(1);
                            }}
                            className="bg-transparent border-none focus:outline-none font-medium text-xs cursor-pointer pr-1 text-[#171F2C]"
                          >
                            <option value="all">All Categories</option>
                            <option value="distribution">Distribution &amp; Resell</option>
                            <option value="referral">Client Referral</option>
                            <option value="partnership">Strategic Partnership</option>
                            <option value="vendor">Vendor / Services</option>
                            <option value="hiring">Hiring / Co-Founder</option>
                            <option value="investment">Investment / Capital</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] px-3 py-1.5 text-xs text-[#171F2C]">
                          <span className="font-mono text-[10px] uppercase text-[#64748B] tracking-wider font-semibold">
                            SORT:
                          </span>
                          <select
                            value={sortFilter}
                            onChange={(e: any) => {
                              setSortFilter(e.target.value);
                              setCurrentPage(1);
                            }}
                            className="bg-transparent border-none focus:outline-none font-medium text-xs cursor-pointer pr-1 text-[#171F2C]"
                          >
                            <option value="action_first">Action Required First</option>
                            <option value="stage_asc">Stage (1 → 4)</option>
                            <option value="stage_desc">Stage (4 → 1)</option>
                            <option value="recent">Recently Updated</option>
                          </select>
                        </div>
                      </div>
                      */}
                    </div>
                  </div>

                  {/* Workspace Main Grid: 12 Columns (8 Col Cards Stream + 4 Col Right Rail) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left 8 Columns: Dynamic Deal Stage Cards Stream */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* If in Stage 1 & live triage requests exist, show Inbound Triage banner */}
                      {selectedStageTab === "stage_1" && liveTriageItems.length > 0 && (
                        <Collapsible
                          open={isTriageOpen}
                          onOpenChange={setIsTriageOpen}
                          className="bg-white rounded-[4px] border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs flex flex-col gap-3 transition-all"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <CollapsibleTrigger asChild>
                              <button
                                type="button"
                                className="flex items-center gap-3 flex-wrap cursor-pointer text-left hover:opacity-85 transition-opacity"
                              >
                                <div className="flex items-center gap-2">
                                  <Inbox className="w-5 h-5 text-[#171F2C]" />
                                  <h3 className="font-display font-bold text-sm sm:text-base text-[#171F2C] tracking-tight">
                                    New Incoming Pitches / Inbound Triage
                                  </h3>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-[4px] bg-[#171F2C] text-white font-mono text-[11px] font-bold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  {liveTriageItems.length} New Inbound
                                </span>
                              </button>
                            </CollapsibleTrigger>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 text-[#64748B] font-mono text-xs">
                                <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                                <span>Response SLA: &lt; 48 hrs</span>
                              </div>
                              <CollapsibleTrigger asChild>
                                <button
                                  type="button"
                                  className="w-7 h-7 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center cursor-pointer hover:bg-[#F1F5F9]"
                                >
                                  {isTriageOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              </CollapsibleTrigger>
                            </div>
                          </div>

                          <CollapsibleContent className="flex flex-col gap-4 pt-3 border-t border-[#E2E8F0]">
                            <p className="text-xs text-[#64748B] font-sans">
                              Inbound proposals and intro inquiries received on your posted listings awaiting your acceptance into Stage 1 (Acknowledgement) or direct decline.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {liveTriageItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="bg-[#F8FAFC] rounded-[4px] p-4 border border-[#E2E8F0] flex flex-col justify-between gap-3 text-left"
                                >
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <span className="px-2 py-0.5 rounded-[4px] font-mono font-bold text-[10px] bg-white text-[#171F2C] border border-[#E2E8F0]">
                                        {item.code}
                                      </span>
                                      <span className="text-[11px] text-[#94A3B8] font-medium">
                                        {item.timeAgo}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-[#171F2C] font-display font-bold text-sm flex items-center gap-1.5">
                                        <span>{item.partnerName}</span>
                                        {item.isVerified && (
                                          <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                                        )}
                                      </div>
                                      <div className="text-[#64748B] text-xs flex items-center gap-1 mt-0.5">
                                        <ExternalLink className="w-3 h-3 text-[#94A3B8] shrink-0" />
                                        <span className="truncate">
                                          Target: {item.targetTitle} ({item.targetCode})
                                        </span>
                                      </div>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-[4px] border border-[#E2E8F0] text-xs">
                                      <span className="text-[#94A3B8] block text-[10px] font-bold uppercase tracking-wide mb-1 font-mono">
                                        Proposed Pitch / Terms
                                      </span>
                                      <p className="text-[#171F2C] leading-relaxed font-sans">
                                        {item.proposedTerms}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0]">
                                    <Button
                                      type="button"
                                      variant="monochrome"
                                      size="sm"
                                      onClick={() => handleAcceptTriage(item)}
                                      className="flex-1 gap-1"
                                    >
                                      <span>Accept Pitch</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeclineTriage(item)}
                                      className="text-[#64748B] hover:text-[#BA1A1A] hover:border-[#BA1A1A]"
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}

                      {/* Paginated Deal Cards Stream */}
                      {paginatedDeals.length === 0 ? (
                        <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-2xs">
                          <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
                            <Shield className="w-6 h-6" />
                          </div>
                          <h3 className="font-display font-bold text-base text-[#171F2C]">
                            No bilateral opportunities in this view
                          </h3>
                          <p className="text-xs text-[#64748B] max-w-md">
                            There are currently no active deals matching the selected stage and filter criteria. Adjust your filters or explore the Commercial Board.
                          </p>
                          <div className="flex items-center gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedStageTab("stage_1");
                                setDirectionFilter("all");
                                setCategoryFilter("all");
                                setDealSearchInput("");
                                setCurrentPage(1);
                              }}
                            >
                              Reset Filters
                            </Button>
                            <Button
                              variant="authoritative"
                              size="sm"
                              onClick={handleOpenCreate}
                            >
                              Post Opportunity
                            </Button>
                          </div>
                        </div>
                      ) : (
                        paginatedDeals.map((deal) => {
                          const isInbound = deal.direction === "inbound";
                          const stageNum = deal.workflow?.stageNum ?? 1;
                          const isActionRequired = deal.workflow?.stateCategory === "action_needed";
                          const dealCode = deal.opportunity?.opportunity_number
                            ? `RY-${String(deal.opportunity.opportunity_number).padStart(4, "0")}`
                            : `RY-${String(deal.id || "0000").substring(0, 4).toUpperCase()}`;
                          const categoryName = (
                            deal.opportunity?.category === "strategic_advice"
                              ? "Strategic Advice"
                              : deal.opportunity?.category || deal.opportunity?.type || "Bilateral Exchange"
                          ).replace("_", " ").toUpperCase();
                          const partnerName =
                            deal.workflow?.partnerName ||
                            (isInbound
                              ? deal.requesting_business?.company_name
                              : deal.opportunity?.business?.company_name) ||
                            "Verified Counterparty";
                          const matchPercentage = Math.min(99, 92 + (dealCode.length % 7));
                          const headline = deal.opportunity?.title || deal.title || "Bilateral Commercial Opportunity";
                          const contextText =
                            deal.workflow?.stageContext ||
                            deal.message ||
                            deal.opportunity?.description ||
                            "Mutual bilateral exchange protocol active.";
                          const scopeTerms =
                            deal.exchange_proposals?.[0]?.exchange_details ||
                            (deal.exchange_proposals?.[0]?.revenue_percentage
                              ? `${deal.exchange_proposals[0].revenue_percentage}% Net Rev-Share`
                              : deal.opportunity?.offer_text || "Reciprocal lead exchange & bilateral engagement terms");
                          const contractVal = deal.opportunity?.offer_text || (isInbound ? "€420,000 / YR" : "$1,850,000 TCV");

                          // Progress bar calculation
                          const pStage = stageNum <= 2 ? 1 : stageNum === 3 ? 2 : stageNum === 4 ? 3 : 4;

                          const normalizedPipelineDeal: PipelineOpportunity = {
                            id: deal.id,
                            dealCode,
                            title: headline,
                            origin: isInbound ? "posted" : "requested",
                            partner: partnerName,
                            isVerified: Boolean(deal.workflow?.isVerified),
                            isUnblinded: Boolean(stageNum >= 5 || deal.workflow?.isHandshakeComplete),
                            stage: pStage as 1 | 2 | 3 | 4,
                            metricLabel1: "Scope",
                            metricValue1: scopeTerms,
                            metricLabel2: "Value",
                            metricValue2: contractVal,
                            actionLabel: isActionRequired ? "Action Required" : "Awaiting Turn",
                            actionType: isActionRequired ? "high-intent" : "view",
                            actionLink: `/connections/${deal.id}`,
                            rawRequest: deal,
                          };

                          return (
                            <Collapsible key={deal.id} defaultOpen={isActionRequired} asChild>
                              <article
                                className={cn(
                                  "bg-white rounded-[4px] border border-[#E2E8F0] shadow-2xs overflow-hidden transition-all hover:border-[#CBD5E1] flex flex-col select-none",
                                  isActionRequired && "border-[#171F2C]/40 shadow-xs",
                                )}
                              >
                                {/* ══════════════════════════════════════════════════════════════════
                                    1. COLLAPSED STATE (CLICKABLE CARD HEADER)
                                    ══════════════════════════════════════════════════════════════════ */}
                                <CollapsibleTrigger asChild>
                                  <div className="w-full p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-[#F8FAFC]/70 transition-colors text-left">
                                    <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
                                      {/* Company Logo / Initials Avatar */}
                                      <div className="relative shrink-0 mt-0.5 md:mt-0">
                                        <CompanyLogo
                                          src={deal.opportunity?.business?.logo_url || deal.requesting_business?.logo_url}
                                          name={partnerName}
                                          className="w-9 h-9 rounded-[4px] object-contain border border-[#E2E8F0] shrink-0 bg-white"
                                          fallbackClassName="w-9 h-9 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#171F2C]"
                                          textClassName="text-xs font-mono font-bold"
                                        />
                                      </div>

                                      {/* Core 3-Row Content Block */}
                                      <div className="min-w-0 flex-1 flex flex-col gap-1">
                                        {/* ── ROW 1: Opportunity ID & Category Tags ── */}
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                          <DealCodeStamp code={dealCode} />
                                          <CategoryPill category={deal.opportunity?.category === "strategic_advice" ? "Strategic Advice" : (deal.opportunity?.category || deal.opportunity?.type || "Bilateral Exchange")} />
                                          <span
                                            className={cn(
                                              "text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-[4px] inline-flex items-center gap-1.5 shadow-2xs font-mono",
                                              isInbound ? "bg-[#171F2C] text-white" : "bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]",
                                            )}
                                          >
                                            {isInbound ? <ArrowDown className="w-3 h-3 text-white" /> : <ArrowUp className="w-3 h-3 text-[#171F2C]" />}
                                            <span>{isInbound ? "Inbound" : "Outbound"}</span>
                                          </span>
                                          {isActionRequired && (
                                            <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white inline-flex items-center gap-1.5 shadow-2xs">
                                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                              Action Required: 18h left
                                            </span>
                                          )}
                                          {deal.workflow?.isHandshakeComplete && (
                                            <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                              Handshake Complete
                                            </span>
                                          )}
                                        </div>

                                        {/* ── ROW 2: Opportunity Title ── */}
                                        <h2 className="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight pt-0.5">
                                          {headline}
                                        </h2>

                                        {/* ── ROW 3: Business Name | Verified Icon | Location ── */}
                                        <div className="flex items-center gap-2 text-xs text-[#64748B] truncate">
                                          <span className="font-medium text-[#171F2C] truncate">{partnerName}</span>

                                          {deal.workflow?.isVerified && (
                                            <span className="inline-flex items-center gap-1 text-emerald-700 text-[10px] font-medium shrink-0">
                                              <VerifiedBadge size={14} /> Verified
                                            </span>
                                          )}

                                          <span className="text-[#CBD5E1]">|</span>

                                          <span className="truncate">{deal.opportunity?.location || deal.opportunity?.geo || "Remote / Global"}</span>

                                          {deal.opportunity?.industry && (
                                            <>
                                              <span className="text-[#CBD5E1]">•</span>
                                              <span className="truncate text-[#64748B]">{deal.opportunity.industry}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Side: Parity Score, Expiry & Expand/Collapse Icon */}
                                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
                                      <div className="flex items-center gap-3 text-right">
                                        <div className="flex flex-col items-end">
                                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                            Parity Score
                                          </span>
                                          <span className="font-mono text-xs font-bold text-[#171F2C]">
                                            {matchPercentage}%
                                          </span>
                                        </div>
                                        <div className="hidden sm:flex flex-col items-end">
                                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                            {isActionRequired ? "SLA Timer" : "Status"}
                                          </span>
                                          <span className="text-xs text-[#64748B] font-medium font-mono">
                                            {isActionRequired ? "18h left" : stageNum >= 5 || deal.workflow?.isHandshakeComplete ? "Ratified" : "Active"}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Chevron Expand/Collapse Indicator */}
                                      <div className="w-8 h-8 rounded-full bg-[#171F2C] hover:bg-black border border-[#171F2C] flex items-center justify-center text-white transition-transform duration-200 shrink-0 shadow-xs group-data-[state=open]:rotate-180">
                                        <ChevronDown className="w-4 h-4 text-white stroke-[2.2]" />
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleTrigger>

                                {/* ══════════════════════════════════════════════════════════════════
                                    2. EXPANDED STATE (COLLAPSIBLE DETAILS BODY)
                                    ══════════════════════════════════════════════════════════════════ */}
                                <CollapsibleContent className="border-t border-[#E2E8F0] p-5 sm:p-6 flex flex-col gap-4 bg-white transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
                                  {/* A. Counterparty Detail Strip */}
                                  <div className="flex items-center justify-between gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-8 h-8 rounded-[4px] bg-[#171F2C] text-white text-xs font-semibold flex items-center justify-center shrink-0 border border-[#171F2C]">
                                        {getCompanyInitials(partnerName)}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="font-semibold text-xs sm:text-sm text-[#171F2C] truncate">
                                            {partnerName}
                                          </span>
                                          {deal.workflow?.isVerified && (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium shrink-0">
                                              <VerifiedBadge size={13} /> Verified
                                            </span>
                                          )}
                                          <span className="text-[#CBD5E1]">•</span>
                                          <span className="text-xs text-[#64748B] shrink-0">
                                            {stageNum >= 5 || deal.workflow?.isHandshakeComplete ? "Direct Unblinded Partner" : "Blinded Bilateral Partner"}
                                          </span>
                                        </div>
                                        <div className="text-xs text-[#64748B] truncate mt-0.5">
                                          {deal.opportunity?.location || deal.opportunity?.geo || "Remote / Global"} {deal.opportunity?.industry ? `• ${deal.opportunity.industry}` : ""}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right text-xs text-[#64748B] shrink-0">
                                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                                        Contract Value
                                      </span>
                                      <span className="font-medium text-[#171F2C] font-mono">{contractVal}</span>
                                    </div>
                                  </div>

                                  {/* B. Opportunity Description & Requirements */}
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                      Opportunity Overview &amp; Requirements
                                    </span>
                                    <p className="text-sm text-[#334155] leading-relaxed">{contextText}</p>
                                  </div>

                                  {/* C. Bilateral Value Proposition (What We Offer) */}
                                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-4 flex flex-col gap-1.5">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
                                      <Repeat className="w-4 h-4 text-[#F97316]" />
                                      <span>What We Are Expecting</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                                      {scopeTerms}
                                    </p>
                                  </div>

                                  {/* D. Lifecycle Stage Progress Tracker */}
                                  <div className="border-t border-[#E2E8F0] pt-3 flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="uppercase tracking-wider text-[#94A3B8] font-mono text-[10px] font-semibold">
                                        Current Lifecycle Stage
                                      </span>
                                      <span className="font-semibold text-[#171F2C] text-xs">
                                        {deal.workflow?.stageHeadline || "Protocol Clearance"}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                      <div className={`h-1.5 rounded-[2px] ${pStage >= 1 ? "bg-[#171F2C]" : "bg-[#E2E8F0]"}`} />
                                      <div className={`h-1.5 rounded-[2px] ${pStage >= 2 ? "bg-[#171F2C]" : "bg-[#E2E8F0]"}`} />
                                      <div className={`h-1.5 rounded-[2px] ${pStage >= 3 ? "bg-[#171F2C]" : "bg-[#E2E8F0]"}`} />
                                      <div className={`h-1.5 rounded-[2px] ${pStage >= 4 ? "bg-[#171F2C]" : "bg-[#E2E8F0]"}`} />
                                    </div>
                                    <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                                      <span className={pStage === 1 ? "text-[#171F2C] font-bold" : "font-medium"}>
                                        1. Acknowledged
                                      </span>
                                      <span className={pStage === 2 ? "text-[#171F2C] font-bold" : "font-medium"}>
                                        2. Negotiation
                                      </span>
                                      <span className={pStage === 3 ? "text-[#171F2C] font-bold" : "font-medium"}>
                                        3. Agreement
                                      </span>
                                      <span className={pStage === 4 ? "text-[#171F2C] font-bold" : "font-medium"}>
                                        4. Handshake
                                      </span>
                                    </div>
                                  </div>

                                  {/* E. Bottom Actions & Metadata */}
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
                                    <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
                                      <span className="flex items-center gap-1 font-mono text-xs text-[#64748B]">
                                        <Clock className="w-3.5 h-3.5 text-[#171F2C]" />
                                        <span>
                                          {isActionRequired
                                            ? "Awaiting your countersignature or response within SLA"
                                            : "Dual binding verification active • Legal hold applied"}
                                        </span>
                                      </span>
                                      <span className="text-[#CBD5E1]">•</span>
                                      <span className="text-[11px] font-medium text-[#64748B] uppercase font-mono">
                                        {stageNum <= 2
                                          ? "SHA256 Encrypted Protocol"
                                          : stageNum === 3
                                            ? "Dual-Signed Escrow Pending"
                                            : stageNum === 4
                                              ? "50% Signed (1/2)"
                                              : "Permanent Audit Ledger #0x9F42"}
                                      </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                      {stageNum <= 2 ? (
                                        isInbound ? (
                                          <>
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleDeclineIncoming(deal.id, partnerName)}
                                              className="text-[#64748B] hover:text-[#BA1A1A] hover:border-[#BA1A1A]"
                                            >
                                              Decline
                                            </Button>
                                            <Button
                                              type="button"
                                              variant="monochrome"
                                              size="sm"
                                              onClick={() => {
                                                setSelectedPipelineDeal(normalizedPipelineDeal);
                                                setNcndModalOpen(true);
                                              }}
                                              className="gap-1.5"
                                            >
                                              <span>Acknowledge Exchange</span>
                                              <ArrowRight className="w-3.5 h-3.5" />
                                            </Button>
                                          </>
                                        ) : (
                                          <Button
                                            type="button"
                                            variant="monochrome"
                                            size="sm"
                                            onClick={() => navigate({ to: "/connections/$id", params: { id: deal.id } })}
                                            className="gap-1.5"
                                          >
                                            <span>View in Dealroom</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                          </Button>
                                        )
                                      ) : stageNum === 3 ? (
                                        <>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedPipelineDeal(normalizedPipelineDeal);
                                              setCounterOfferModalOpen(true);
                                            }}
                                          >
                                            Propose Terms
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="monochrome"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedPipelineDeal(normalizedPipelineDeal);
                                              setCounterOfferModalOpen(true);
                                            }}
                                            className="gap-1.5"
                                          >
                                            <span>Review Counter-Offer</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                          </Button>
                                        </>
                                      ) : stageNum === 4 ? (
                                        <>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedPipelineDeal(normalizedPipelineDeal);
                                              setRedlinesModalOpen(true);
                                            }}
                                            className="gap-1.5"
                                          >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>View Agreement</span>
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="monochrome"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedPipelineDeal(normalizedPipelineDeal);
                                              setCountersignModalOpen(true);
                                            }}
                                            className="gap-1.5"
                                          >
                                            <span>Open Escrow Vault</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedDetailOpp(deal.opportunity || deal)}
                                            className="gap-1.5"
                                          >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>Review Terms</span>
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="monochrome"
                                            size="sm"
                                            onClick={() => navigate({ to: "/connections/$id", params: { id: deal.id } })}
                                            className="gap-1.5"
                                          >
                                            <span>Open Dealroom</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </article>
                            </Collapsible>
                          );
                        })
                      )}

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-3.5 sm:px-5 sm:py-3.5 text-xs text-[#64748B] shadow-2xs flex flex-wrap items-center justify-between gap-3 font-mono">
                          <span className="font-medium">
                            Showing {Math.min((currentPage - 1) * DEALS_PER_PAGE + 1, totalDealsCount)} to{" "}
                            {Math.min(currentPage * DEALS_PER_PAGE, totalDealsCount)} of {totalDealsCount} bilateral opportunities
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                              className="px-3 py-1.5 rounded-[4px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#171F2C] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors text-xs font-medium"
                            >
                              Previous
                            </button>
                            {Array.from({ length: totalPages }).map((_, idx) => {
                              const p = idx + 1;
                              const isCurrent = currentPage === p;
                              return (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setCurrentPage(p)}
                                  className={cn(
                                    "min-w-[32px] h-8 px-2.5 flex items-center justify-center rounded-[4px] font-mono text-xs font-medium cursor-pointer transition-colors shrink-0",
                                    isCurrent
                                      ? "bg-[#171F2C] text-white border border-[#171F2C]"
                                      : "border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#171F2C]",
                                  )}
                                >
                                  {p}
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                              className="px-3 py-1.5 rounded-[4px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#171F2C] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors text-xs font-medium"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right 4 Columns: Symmetrical Complementary Modules */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* Module 1: Bilateral Dealroom Status (Vertical 4-Stage Stepper) */}
                      <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                          <h4 className="font-display font-bold text-sm sm:text-base text-[#171F2C] tracking-tight">
                            Bilateral Dealroom Status
                          </h4>
                          <Layers className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                          Every exchange proceeds under strict mutual assent. Identities remain blinded until Stage 4 agreement.
                        </p>
                        <div className="relative pt-2 pb-1">
                          <div className="absolute left-[13px] top-5 bottom-6 w-0.5 bg-[#E2E8F0] z-0" />
                          <div className="space-y-5 relative z-10">
                            {/* Step 1 */}
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                1
                              </div>
                              <div className="min-w-0 flex-1 pt-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-xs text-[#171F2C]">
                                    Acknowledgment
                                  </span>
                                  <span className="font-mono text-[11px] text-[#64748B] font-medium">
                                    {stage1Count > 0 ? `${stage1Count} Active` : "Blind Match"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#64748B] leading-snug mt-0.5 font-sans">
                                  Mutual NCND generation &amp; handshake intent.
                                </p>
                              </div>
                            </div>
                            {/* Step 2 */}
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                2
                              </div>
                              <div className="min-w-0 flex-1 pt-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-xs text-[#171F2C]">
                                    Negotiation
                                  </span>
                                  <span className="font-mono text-[11px] text-[#171F2C] font-bold bg-[#F1F5F9] px-2 py-0.5 rounded-[4px]">
                                    {stage2Count} Active
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#64748B] leading-snug mt-0.5 font-sans">
                                  Reciprocal terms revisions &amp; SLA timers.
                                </p>
                              </div>
                            </div>
                            {/* Step 3 */}
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-[4px] bg-[#F1F5F9] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                3
                              </div>
                              <div className="min-w-0 flex-1 pt-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-xs text-[#171F2C]">
                                    Agreement
                                  </span>
                                  <span className="font-mono text-[11px] text-[#64748B] font-medium">
                                    {stage3Count} In Escrow
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#64748B] leading-snug mt-0.5 font-sans">
                                  Dual sovereign escrow signing.
                                </p>
                              </div>
                            </div>
                            {/* Step 4 */}
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-[4px] bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                4
                              </div>
                              <div className="min-w-0 flex-1 pt-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-xs text-[#64748B]">
                                    Handshake
                                  </span>
                                  <span className="font-mono text-[11px] text-[#64748B] font-medium">
                                    {stage4Count} Ratified
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#64748B] leading-snug mt-0.5 font-sans">
                                  Direct unblinded C-suite exchange.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-[#E2E8F0]">
                          <button
                            type="button"
                            onClick={() => setProtocolModalOpen(true)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#171F2C] hover:underline group cursor-pointer"
                          >
                            <span>View Protocol Governance</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#94A3B8]" />
                          </button>
                        </div>
                      </div>

                      {/* Module 2: Active SLA Telemetry */}
                      <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                          <h4 className="font-display font-bold text-sm sm:text-base text-[#171F2C] tracking-tight">
                            Active SLA Telemetry
                          </h4>
                          <Clock className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                                Action Required
                              </div>
                              <div className="text-xs font-bold text-[#171F2C] mt-0.5">
                                {totalActionNeededCount} deal{totalActionNeededCount === 1 ? "" : "s"} awaiting your turn
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-[4px] bg-[#171F2C] text-white font-mono text-[10px] font-bold">
                              18H REMAINING
                            </span>
                          </div>

                          <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                                Counterparty Turn
                              </div>
                              <div className="text-xs font-bold text-[#171F2C] mt-0.5">
                                {totalWaitingCount} deal{totalWaitingCount === 1 ? "" : "s"} in review
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-[4px] bg-[#F1F5F9] text-[#64748B] font-mono text-[10px] font-medium border border-[#E2E8F0]">
                              WITHIN SLA
                            </span>
                          </div>

                          <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                                Average Turnaround
                              </div>
                              <div className="text-xs font-bold text-[#171F2C] mt-0.5">
                                3.2 hours
                              </div>
                            </div>
                            <span className="font-mono text-[#64748B] text-[10px] font-medium bg-[#F1F5F9] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                              Top 5% Network
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Module 3: Workspace Operations */}
                      <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                          <h4 className="font-display font-bold text-sm sm:text-base text-[#171F2C] tracking-tight">
                            Workspace Operations
                          </h4>
                          <Sparkles className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div className="space-y-2.5">
                          <Button
                            type="button"
                            variant="authoritative"
                            size="default"
                            onClick={handleOpenCreate}
                            className="w-full gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Post New Opportunity</span>
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleExportSummary}
                            className="w-full gap-2 text-[#171F2C]"
                          >
                            <Download className="w-4 h-4 text-[#64748B]" />
                            <span>Export Deal Ledger (CSV)</span>
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={() => setProtocolModalOpen(true)}
                            className="w-full gap-2 text-[#64748B] hover:text-[#171F2C]"
                          >
                            <Lock className="w-4 h-4 text-[#94A3B8]" />
                            <span>Rotate Cryptographic Keys</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
            )}

            {/* ════════════════════════════════════════════════════════════════
                TAB 5: SAVED / BOOKMARKED (Available to all users)
                ════════════════════════════════════════════════════════════════ */}
            {activeTab === "saved" && (
              loadingSaved ? (
                <div className="border border-slate-200/80 bg-white rounded-[4px] shadow-xs py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Loading bookmarked memos...
                  </span>
                </div>
              ) : savedItems.length === 0 ? (
                <div className="border border-slate-200/80 bg-white rounded-[4px] shadow-xs py-20 text-center flex flex-col items-center justify-center space-y-4 px-4">
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
                <div className="border border-slate-200/80 bg-white rounded-[4px] shadow-xs p-4 sm:p-6 space-y-4">
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

      {/* 5. PROTOCOL RULES MODAL */}
      <Dialog open={protocolModalOpen} onOpenChange={setProtocolModalOpen}>
        <DialogContent className="max-w-xl bg-white border-slate-200 text-slate-900 shadow-xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#010611]"></span>
              <DialogTitle className="font-sans font-bold text-lg text-[#010611]">
                Bilateral Protocol Governance &amp; Rules
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 font-sans">
              Cryptographic and legal execution standards governing all private dealrooms on The Relay.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2 text-xs font-sans text-slate-700 max-h-[60vh] overflow-y-auto pr-1">
            <div className="p-3 bg-[#f2f4f6] border border-[#c5c6cc] rounded-[2px] space-y-1">
              <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#010611]">
                Rule 1: Bilateral Non-Circumvention (NCND)
              </h5>
              <p className="text-[#45474c] leading-relaxed">
                Prior to Stage 2 term disclosure, both counterparties must execute the mutual digital NCND. Disintermediation or circumvention of introductions is subject to automated audit trails and legal covenant enforcement.
              </p>
            </div>

            <div className="p-3 bg-[#f2f4f6] border border-[#c5c6cc] rounded-[2px] space-y-1">
              <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#010611]">
                Rule 2: Dual Escrow Verification
              </h5>
              <p className="text-[#45474c] leading-relaxed">
                Stage 3 agreements require cryptographic dual-signing (2/2 signatures). Neither party receives executed credentials or unblinded counterparty identities until both authorizations are ratified.
              </p>
            </div>

            <div className="p-3 bg-[#f2f4f6] border border-[#c5c6cc] rounded-[2px] space-y-1">
              <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#010611]">
                Rule 3: 48-Hour Strict SLA Turnaround
              </h5>
              <p className="text-[#45474c] leading-relaxed">
                Counterparty turns and response SLAs are metered in real-time. Proposals with unanswered action items past SLA windows are subject to automatic escalation or bilateral expiration.
              </p>
            </div>

            <div className="p-3 bg-[#f2f4f6] border border-[#c5c6cc] rounded-[2px] space-y-1">
              <h5 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#010611]">
                Rule 4: Zero Cold Outreach Standard
              </h5>
              <p className="text-[#45474c] leading-relaxed">
                Unsolicited spam is cryptographically filtered. Deals only exist upon mutual intent confirmation, preventing unsolicited pitch degradation.
              </p>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="high-intent"
              size="sm"
              onClick={() => setProtocolModalOpen(false)}
            >
              Understood &amp; Acknowledged
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Post Type Selection Modal */}
      <PostTypeSelectionModal
        open={postTypeModalOpen}
        onOpenChange={setPostTypeModalOpen}
      />
    </div>
  );
}
