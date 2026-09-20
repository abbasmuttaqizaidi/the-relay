import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/tanstack-react-start";
import { toast } from "@/components/ui/sonner";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { listOpportunities } from "../functions/listOpportunities";
import { createOpportunity } from "../functions/createOpportunity";
import { updateOpportunity } from "../functions/updateOpportunity";
import { expressInterest } from "../functions/expressInterest";
import { saveOpportunity } from "../functions/saveOpportunity";
import { removeSavedOpportunity } from "../functions/removeSavedOpportunity";
import { getSavedOpportunities } from "../functions/getSavedOpportunities";
import { withdrawInterest } from "../functions/withdrawInterest";
import { getSentRequests } from "../functions/getSentRequests";
import { getVerifiedBusinessCount } from "../functions/getVerifiedBusinessCount";
import { recordOpportunityView } from "../functions/recordOpportunityView";
import { getOpportunityViews } from "../functions/getOpportunityViews";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import { cn, getCompanyInitials, calculateBaseViews, getDynamicMedianResponseTime } from "../lib/utils";
import { CompanyLogo } from "../components/company-logo";
import { ProposalConfirmationModal } from "@/components/ProposalConfirmationModal";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  Loader2,
  Check,
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Building,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Lock,
  Bookmark,
  Sparkles,
  X,
  Plus,
  Tag,
  HelpCircle,
  Clock,
  CheckCircle2,
  Info,
  ArrowRight,
  Pencil,
  ArrowUpDown,
  Repeat,
  ShieldCheck,
  Inbox,
  AlertCircle,
  Send,
  EyeOff,
  Radio,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useInterestStore } from "@/lib/interest-store";

import {
  Button,
  VerifiedBadge,
  UrgentBadge,
  DealCodeStamp,
  CategoryPill,
  ParityScoreBadge,
  LivePulseBadge,
  Input as DSInput,
  SearchInput,
  Textarea as DSTextarea,
  Label as DSLabel,
  Select as DSSelect,
  SelectContent as DSSelectContent,
  SelectItem as DSSelectItem,
  SelectTrigger as DSSelectTrigger,
  SelectValue as DSSelectValue,
  MetricCard,
  HowItWorksCard,
  TargetedPlacementCard,
  RecentHandshakesCard,
  ExchangeCalloutBox,
  OpportunityCard,
} from "@/design-system";

const INDUSTRIES = [
  "All",
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

const GEOGRAPHIES = [
  "All",
  "India",
  "UAE",
  "United States",
  "United Kingdom",
  "DACH",
  "Singapore",
  "Remote / Global",
] as const;

const TYPES = [
  "All",
  "Partnership",
  "Referral",
  "Distribution",
  "Vendor",
  "Hiring",
  "Strategic Advice",
  "Investment",
] as const;

const searchSchema = z.object({
  industry: fallback(z.string(), "All").default("All"),
  geo: fallback(z.string(), "All").default("All"),
  type: fallback(z.enum(TYPES), "All").default("All"),
  q: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["newest", "expiring", "reciprocity"]), "newest").default("newest"),
  page: fallback(z.number(), 1).default(1),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/opportunities/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Commercial Opportunity Board — The Relay" },
      {
        name: "description",
        content:
          "Discover high-intent B2B partnerships, distribution deals, and reciprocal exchanges. Privacy-guaranteed until mutual agreement.",
      },
      { property: "og:title", content: "Commercial Opportunity Board — The Relay" },
      {
        property: "og:description",
        content:
          "Discover high-intent B2B partnerships, distribution deals, and reciprocal exchanges. Privacy-guaranteed until mutual agreement.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

type Opportunity = {
  id: string;
  opportunity_number?: string;
  type: (typeof TYPES)[number];
  category?: string;
  industry: (typeof INDUSTRIES)[number];
  geo: (typeof GEOGRAPHIES)[number];
  location?: string | null;
  offer_text?: string | null;
  company: string;
  title: string;
  description: string;
  trustLevel: "Basic" | "Applied" | "Approved";
  postedAt: string;
  interested: number;
  business_id?: string;
  hide_company_name?: boolean;
  status?: string;
  expires_at?: string;
  promotion_status?: string;
  logo_url?: string | null;
  parityScore?: number;
  exchangesCompleted?: number;
};

function formatPostedAt(dateString: string): string {
  try {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function formatExpiryTime(expiresAt?: string | null): { text: string; urgent: boolean } {
  if (!expiresAt) return { text: "No expiry", urgent: false };
  try {
    const exp = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = exp - now;
    if (diff <= 0) return { text: "Expired", urgent: true };
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 2) return { text: `Expires in ${days * 24}h`, urgent: true };
    if (days <= 7) return { text: `Expires in ${days} days`, urgent: true };
    return { text: `Expires in ${days} days`, urgent: false };
  } catch {
    return { text: "Active", urgent: false };
  }
}

interface ObservedOpportunityCardProps {
  opp: Opportunity;
  isOwner: boolean;
  isSaved: boolean;
  isBlurred?: boolean;
  interestStatus: "idle" | "pending" | "accepted" | "declined" | "withdrawn";
  onSaveToggle: (oppId: string, shouldSave: boolean) => void;
  onExpressInterest: (opp: Opportunity) => void;
  onEdit: (opp: Opportunity) => void;
  onViewRecorded?: (oppId: string, totalViews: number) => void;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let vid = localStorage.getItem("relay_vid");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem("relay_vid", vid);
    }
    return vid;
  } catch {
    return "";
  }
}

function ObservedOpportunityCard({
  opp,
  isOwner,
  isSaved,
  isBlurred = false,
  interestStatus,
  onSaveToggle,
  onExpressInterest,
  onEdit,
  onViewRecorded,
}: ObservedOpportunityCardProps) {
  const recordedRef = useRef(false);

  // Check persistent client-side tracking to avoid duplicate calls across mounts
  useEffect(() => {
    try {
      const visitorId = getVisitorId();
      const storageKey = `relay_viewed_${visitorId || "anon"}_${opp.id}`;
      if (localStorage.getItem(storageKey)) {
        recordedRef.current = true;
      }
    } catch (_) {}
  }, [opp.id]);

  const handleExpand = useCallback(async () => {
    // 1. Never count views if the opportunity creator (owner) expands their own card
    if (isOwner) return;

    // 2. Never count multiple views if this viewer has already expanded this card
    if (recordedRef.current) return;

    recordedRef.current = true;
    try {
      const visitorId = getVisitorId();
      const storageKey = `relay_viewed_${visitorId || "anon"}_${opp.id}`;
      try {
        localStorage.setItem(storageKey, "1");
      } catch (_) {}

      // Optimistic increment for immediate UI response
      const currentViews = opp.views ?? 0;
      if (onViewRecorded) {
        onViewRecorded(opp.id, currentViews + 1);
      }

      // Persist to server / database with strict backend deduplication
      const res = await recordOpportunityView({
        data: {
          opportunity_id: opp.id,
          visitor_id: visitorId || undefined,
        },
      });

      if (res && typeof res.totalViews === "number" && onViewRecorded) {
        onViewRecorded(opp.id, res.totalViews);
      }
    } catch (err) {
      console.warn("[ObservedOpportunityCard] Failed to record expand view:", err);
    }
  }, [opp.id, opp.views, isOwner, onViewRecorded]);

  return (
    <OpportunityCard
      opp={opp}
      isOwner={isOwner}
      isSaved={isSaved}
      isBlurred={isBlurred}
      interestStatus={interestStatus}
      onSaveToggle={onSaveToggle}
      onExpressInterest={onExpressInterest}
      onEdit={onEdit}
      onExpand={handleExpand}
    />
  );
}

export function OpportunitiesPage() {
  const { industry, geo, type, q, sort, page } = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";
  const { store: interestStore, request: requestInterest } = useInterestStore();

  // Search input state
  const [searchInputVal, setSearchInputVal] = useState(q);

  useEffect(() => {
    setSearchInputVal(q);
  }, [q]);

  // Express Interest Modal State (2-Panel V2 Design)
  const [selectedOppForInterest, setSelectedOppForInterest] = useState<Opportunity | null>(null);
  const [interestOpen, setInterestOpen] = useState(false);
  const [pitchInput, setPitchInput] = useState("");
  const [splitVal, setSplitVal] = useState("27.5%");
  const [duration, setDuration] = useState("12 Mo (Standard)");
  const [guaranteedIntros, setGuaranteedIntros] = useState("3 Tier-1 Enterprise Intros within 60 days");
  const [hideCompanyUntilStage4, setHideCompanyUntilStage4] = useState(true);
  const [includeMutualNDA, setIncludeMutualNDA] = useState(true);
  const [bilateralAgreement, setBilateralAgreement] = useState(true);
  const [submittingInterest, setSubmittingInterest] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submittedTargetCompany, setSubmittedTargetCompany] = useState("");
  const [submittedOppTitle, setSubmittedOppTitle] = useState("");

  // Edit Opportunity Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOppToEdit, setSelectedOppToEdit] = useState<Opportunity | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<string>("partnership");
  const [editIndustry, setEditIndustry] = useState("SaaS");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editOfferText, setEditOfferText] = useState("");
  const [editHideCompany, setEditHideCompany] = useState(false);
  const [editPromote, setEditPromote] = useState(false);
  const [editExpiryDays, setEditExpiryDays] = useState("keep");
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Helper to map DB/mock category strings to standard TYPE labels
  const mapCategoryToType = (cat?: string | null): (typeof TYPES)[number] => {
    if (!cat) return "Partnership";
    const normalized = cat.toLowerCase().replace(/[\s_-]+/g, "");
    if (normalized === "strategicadvice" || normalized === "advice") return "Strategic Advice";
    if (normalized === "partnership" || normalized === "partnerships") return "Partnership";
    if (normalized === "referral" || normalized === "referrals") return "Referral";
    if (normalized === "distribution") return "Distribution";
    if (normalized === "vendor" || normalized === "vendors") return "Vendor";
    if (normalized === "hiring") return "Hiring";
    if (normalized === "investment" || normalized === "investments") return "Investment";
    return "Partnership";
  };

  // 1. React Query: Onboarding & Business Profile
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const business = onboardingData?.business || null;
  const myBusinessId = business?.id || null;
  const myBusinessStatus = business
    ? (business.status === "pending" || business.status === "applied" ? "applied" : business.status)
    : null;

  // Onboarding route check (Only redirect if logged in but has no business)
  useEffect(() => {
    if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [onboardingData, navigate]);

  // 2. React Query: Opportunities Feed (DB + Mocks)
  const { data: dbOpps = [], isLoading: loadingOpps } = useQuery({
    queryKey: ["opportunities-feed"],
    queryFn: async () => {
      let mapped: Opportunity[] = [];
      const dbOppNumbers = new Set<string>();
      try {
        const dbList = await listOpportunities();
        mapped = (dbList || []).filter(Boolean).map((opp: any) => {
          if (opp.opportunity_number) {
            dbOppNumbers.add(opp.opportunity_number);
          }
          return {
            id: opp.id,
            opportunity_number: opp.opportunity_number || opp.id,
            type: mapCategoryToType(opp.category),
            category: opp.category,
            industry: opp.industry,
            geo: opp.geo || opp.location || "Remote / Global",
            location: opp.location || opp.geo || "Remote / Global",
            offer_text: opp.offer_text || "Direct reciprocal margin & revenue split.",
            company: opp.business?.company_name || opp.business?.name || (opp.hide_company_name ? "Anonymous Venture" : "Verified Company"),
            title: opp.title,
            description: opp.description,
            trustLevel: opp.business?.status === "approved" ? "Approved" : "Applied",
            postedAt: formatPostedAt(opp.created_at),
            interested: opp.interestedCount ?? opp.interested_count ?? opp._count?.interests ?? 0,
            business_id: opp.business_id,
            hide_company_name: opp.hide_company_name ?? false,
            status: opp.status,
            expires_at: opp.expires_at,
            promotion_status: opp.promotion_status || "none",
            logo_url: opp.business?.logo_url || null,
            parityScore: 92 + Math.floor(Math.random() * 8),
            exchangesCompleted: 15 + Math.floor(Math.random() * 35),
          };
        });
      } catch (dbErr) {
        console.error("Database connection failed:", dbErr);
      }

      const mockMapped: Opportunity[] = (OPPORTUNITIES || [])
        .filter((m: any) => m && !dbOppNumbers.has(m.id))
        .map((m: any) => ({
          id: m.id,
          opportunity_number: m.opportunity_number || m.id,
          type: mapCategoryToType(m.type),
          category: (m.type || "").toLowerCase().replace(/\s+/g, "_"),
          industry: m.industry || "SaaS",
          geo: m.geo || "Remote / Global",
          location: m.location || m.geo || "Remote / Global",
          offer_text: m.offer_text || "Direct reciprocal margin and co-selling collaboration.",
          company: m.company || "Verified Enterprise",
          title: m.title || "Strategic Opportunity",
          description: m.description || "",
          trustLevel: m.trustLevel || "Approved",
          postedAt: m.postedAt || "Recently",
          interested: m.interested || 0,
          business_id: m.business_id,
          hide_company_name: m.hide_company_name ?? false,
          status: "active",
          expires_at: m.expires_at || new Date(Date.now() + 10 * 86400000).toISOString(),
          promotion_status: m.promotion_status || "none",
          logo_url: m.logo_url || null,
          parityScore: 94 + ((m.interested || 0) % 6),
          exchangesCompleted: 20 + ((m.interested || 0) * 2),
        }));

      return [...mapped, ...mockMapped].filter(
        (item): item is Opportunity => Boolean(item && typeof item === "object" && item.id && item.type)
      );
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // 3. React Query: Verified Business Count (base 745 + onboarded db businesses)
  const { data: verifiedBizCount = 745 } = useQuery({
    queryKey: ["verified-business-count"],
    queryFn: async () => {
      const count = await getVerifiedBusinessCount();
      return typeof count === "number" ? count : 745;
    },
    staleTime: 1000 * 60 * 5,
  });

  // 4. React Query: Opportunity Views Batch
  const allOppIds = useMemo(() => dbOpps.map((o) => o.id), [dbOpps]);
  const { data: viewsMap = {} } = useQuery({
    queryKey: ["opportunity-views", allOppIds],
    queryFn: async () => {
      if (!allOppIds.length) return {};
      const res = await getOpportunityViews({ data: { opportunity_ids: allOppIds } });
      return res && typeof res === "object" ? res : {};
    },
    enabled: allOppIds.length > 0,
    staleTime: 1000 * 30, // 30 seconds
  });

  // 5. React Query: Saved Opportunity Bookmarks
  const { data: savedOpportunityIds = new Set<string>() } = useQuery({
    queryKey: ["saved-opportunities", userId],
    queryFn: async () => {
      if (!isSignedIn) return new Set<string>();
      try {
        const saved = await getSavedOpportunities();
        const dbIds = (saved || []).map((item: any) => item.opportunity_id);

        let mockIds: string[] = [];
        try {
          const stored = localStorage.getItem(mockStorageKey);
          if (stored) mockIds = JSON.parse(stored);
        } catch (_) {}

        return new Set([...dbIds, ...mockIds]);
      } catch (err) {
        console.error("Failed to load saved opportunities:", err);
        return new Set<string>();
      }
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  // React Query Mutation: Save / Bookmark Toggle
  const saveToggleMutation = useMutation({
    mutationFn: async ({ oppId, shouldSave }: { oppId: string; shouldSave: boolean }) => {
      const isMock = oppId.startsWith("RY-");
      if (shouldSave) {
        if (!isMock) {
          await saveOpportunity({ data: { opportunity_id: oppId } });
        } else {
          let mockIds: string[] = [];
          try {
            const stored = localStorage.getItem(mockStorageKey);
            if (stored) mockIds = JSON.parse(stored);
          } catch (_) {}
          if (!mockIds.includes(oppId)) {
            mockIds.push(oppId);
            localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
          }
        }
      } else {
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
      }
    },
    onMutate: async ({ oppId, shouldSave }) => {
      await queryClient.cancelQueries({ queryKey: ["saved-opportunities", userId] });
      const previous = queryClient.getQueryData<Set<string>>(["saved-opportunities", userId]) || new Set<string>();
      const next = new Set(previous);
      if (shouldSave) next.add(oppId);
      else next.delete(oppId);
      queryClient.setQueryData(["saved-opportunities", userId], next);
      return { previous };
    },
    onError: (_err, { shouldSave }, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["saved-opportunities", userId], context.previous);
      }
      toast.error(shouldSave ? "Failed to save opportunity." : "Failed to remove bookmark.");
    },
    onSuccess: (_data, { shouldSave }) => {
      toast.success(shouldSave ? "Opportunity saved to bookmarks." : "Opportunity removed from bookmarks.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-opportunities", userId] });
    },
  });

  const handleSaveToggle = (oppId: string, shouldSave: boolean) => {
    if (!isSignedIn) {
      toast.info("Please sign in to save opportunities.");
      navigate({ to: "/login" });
      return;
    }
    saveToggleMutation.mutate({ oppId, shouldSave });
  };

  // Synchronize dynamic view increments via React Query cache
  const handleViewRecorded = (oppId: string, totalViews: number) => {
    queryClient.setQueryData<Record<string, number>>(
      ["opportunity-views", allOppIds],
      (prev = {}) => ({
        ...prev,
        [oppId]: totalViews,
      })
    );
  };

  // Dynamic 2-Hour Median Response Time Generator
  const [medianResponseTime, setMedianResponseTime] = useState(() => getDynamicMedianResponseTime());

  useEffect(() => {
    const updateResponseTime = () => {
      setMedianResponseTime(getDynamicMedianResponseTime());
    };
    // Re-check periodically so when 2 hours roll over, metric dynamically updates
    const interval = setInterval(updateResponseTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Guided Tour
  const startTour = () => {
    // Tour disabled
  };

  // Event listener for opportunity created
  useEffect(() => {
    const handleOppCreated = () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
      queryClient.invalidateQueries({ queryKey: ["verified-business-count"] });
    };

    window.addEventListener("relay:opportunity_created", handleOppCreated);
    return () => {
      window.removeEventListener("relay:opportunity_created", handleOppCreated);
    };
  }, [queryClient]);

  // Open Express Interest Modal
  const handleOpenInterest = (opp: Opportunity) => {
    if (!isSignedIn) {
      toast.info("Please sign in to express interest in opportunities.");
      navigate({ to: "/login" });
      return;
    }
    if (!business || business.status !== "approved") {
      toast.error(
        `Your business profile status is "${business?.status || "pending"}". Only approved businesses can pitch opportunities.`,
      );
      return;
    }
    setSelectedOppForInterest(opp);
    setPitchInput("We manage enterprise client relationships and will bundle your offering into our client migration framework.");
    setSplitVal("27.5%");
    setDuration("12 Mo (Standard)");
    setGuaranteedIntros("3 Tier-1 Enterprise Intros within 60 days");
    setHideCompanyUntilStage4(true);
    setIncludeMutualNDA(true);
    setBilateralAgreement(true);
    setInterestOpen(true);
  };

  // Submit Express Interest
  const handleSubmitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOppForInterest) return;
    if (!pitchInput.trim()) {
      toast.error("Please describe your reciprocal pitch.");
      return;
    }

    try {
      setSubmittingInterest(true);
      const combinedMessage = `${pitchInput.trim()}\n\nKey Commercial Terms:\n- Proposed Rev Share: ${splitVal}\n- Commitment Period: ${duration}\n- Mutual Bilateral NDA: Automatically Included\n- Blinded Identity: Protected until mutual match`;
      const res = await expressInterest({
        data: {
          opportunity_id: selectedOppForInterest.id,
          message: combinedMessage,
        },
      });

      requestInterest(selectedOppForInterest.id, combinedMessage);

      // Save real interest ID
      const currentStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      if (currentStore[selectedOppForInterest.id]) {
        currentStore[selectedOppForInterest.id].id = res?.id;
        localStorage.setItem("relay.interest.v1", JSON.stringify(currentStore));
      }

      const targetCompany =
        selectedOppForInterest.company ||
        selectedOppForInterest.business?.company_name ||
        "Counterparty";
      const oppTitle = selectedOppForInterest.title;

      setSubmittedTargetCompany(targetCompany);
      setSubmittedOppTitle(oppTitle);
      setInterestOpen(false);
      setSelectedOppForInterest(null);
      setConfirmationOpen(true);
      toast.success("Reciprocal Proposal Sent Successfully", {
        description: "The business operator has been notified. Check Exchanges for replies.",
      });
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to submit interest pitch.");
    } finally {
      setSubmittingInterest(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (opp: Opportunity) => {
    setSelectedOppToEdit(opp);
    setEditTitle(opp.title);
    setEditCategory(opp.category || opp.type.toLowerCase().replace(/\s+/g, "_"));
    setEditIndustry(opp.industry || "SaaS");
    setEditDescription(opp.description);
    setEditLocation(opp.location || opp.geo || "");
    setEditOfferText(opp.offer_text || "");
    setEditHideCompany(!!opp.hide_company_name);
    setEditPromote(opp.promotion_status === "promoted");
    setEditExpiryDays("keep");
    setEditOpen(true);
  };

  // Submit Edit Opportunity
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOppToEdit) return;
    if (editTitle.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (editDescription.trim().length < 50) {
      toast.error("Description must be at least 50 characters.");
      return;
    }

    try {
      setSubmittingEdit(true);
      let expires_at: string | null = selectedOppToEdit.expires_at || null;
      if (editExpiryDays !== "keep" && editExpiryDays !== "never") {
        const days = parseInt(editExpiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      } else if (editExpiryDays === "never") {
        expires_at = null;
      }

      await updateOpportunity({
        data: {
          opportunity_id: selectedOppToEdit.id,
          title: editTitle.trim(),
          category: editCategory as any,
          industry: editIndustry,
          description: editDescription.trim(),
          location: editLocation.trim() || null,
          offer_text: editOfferText.trim() || null,
          expires_at,
          hide_company_name: editHideCompany,
          promote: editPromote,
        },
      });

      toast.success("Opportunity Updated Successfully");
      setEditOpen(false);
      setSelectedOppToEdit(null);
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      console.error("Update opportunity error:", err);
      toast.error(err.message || "Failed to update opportunity");
    } finally {
      setSubmittingEdit(false);
    }
  };

  // Filtered & Sorted Opportunities
  const filteredOpps = useMemo(() => {
    const query = (q || "").trim().toLowerCase();
    return (dbOpps || []).filter((o) => {
      if (!o || typeof o !== "object" || !o.type) return false;
      // Category / Type filter
      if (type !== "All" && o.type !== type) return false;
      // Industry filter
      if (industry !== "All" && o.industry !== industry) return false;
      // Geography filter
      if (geo !== "All" && o.geo !== geo && o.location !== geo) return false;
      // Search query
      if (query) {
        const oppNum = o.opportunity_number || "";
        const shortId = o.id ? o.id.substring(0, 8) : "";
        const hay =
          `${o.company || ""} ${o.title || ""} ${o.description || ""} ${o.offer_text || ""} ${oppNum} ${shortId}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [dbOpps, type, industry, geo, q]);

  // Sort logic
  const sortedOpps = useMemo(() => {
    const list = [...filteredOpps];
    if (sort === "expiring") {
      list.sort((a, b) => {
        const aExp = a.expires_at ? new Date(a.expires_at).getTime() : Infinity;
        const bExp = b.expires_at ? new Date(b.expires_at).getTime() : Infinity;
        return aExp - bExp;
      });
    } else if (sort === "reciprocity") {
      list.sort((a, b) => (b.parityScore || 90) - (a.parityScore || 90));
    }
    return list;
  }, [filteredOpps, sort]);

  // Category counts for pill badges matching active industry/geo/search filters or global
  const categoryCounts = useMemo(() => {
    const query = (q || "").trim().toLowerCase();
    const filterFn = (o: Opportunity, matchType?: string) => {
      if (!o || typeof o !== "object" || !o.type) return false;
      if (matchType && o.type !== matchType) return false;
      if (industry !== "All" && o.industry !== industry) return false;
      if (geo !== "All" && o.geo !== geo && o.location !== geo) return false;
      if (query) {
        const oppNum = o.opportunity_number || "";
        const shortId = o.id ? o.id.substring(0, 8) : "";
        const hay = `${o.company || ""} ${o.title || ""} ${o.description || ""} ${o.offer_text || ""} ${oppNum} ${shortId}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    };

    const validOpps = (dbOpps || []).filter((o) => o && typeof o === "object" && o.type);

    const counts: Record<string, number> = {
      All: validOpps.filter((o) => filterFn(o)).length,
    };

    TYPES.forEach((t) => {
      if (t !== "All") {
        counts[t] = validOpps.filter((o) => filterFn(o, t)).length;
      }
    });

    return counts;
  }, [dbOpps, industry, geo, q]);

  // Pagination (4 items per page to match V2 design)
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(sortedOpps.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paginatedOpps = useMemo(() => {
    if (!isSignedIn) {
      return sortedOpps.slice(0, 3);
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedOpps.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedOpps, currentPage, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen bg-white text-[#171F2C] flex flex-col font-sans antialiased selection:bg-[#000000] selection:text-white overflow-x-hidden w-full max-w-full",
      isSignedIn ? "pb-16" : "pb-4"
    )}>
      {/* ═══════════════════════════════════════════════════════════════════
          MAIN WRAPPER (MAX-W-7XL / 12-COL GRID)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* ═══════════════════════════════════════════════════════════════════
            TOP HEADER & BRIEF SUBHEADING
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div id="opportunity-board-info">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-[#F97316] uppercase tracking-wider font-mono">
                Reciprocal Dealflow
              </span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-xs text-[#64748B]">Zero Cold Outreach</span>
            </div>
            <h1 className="font-bold text-2xl md:text-3xl text-[#171F2C] tracking-tight">
              Commercial Opportunity Board
            </h1>
            <p className="text-sm md:text-base text-[#64748B] mt-1.5 max-w-2xl leading-relaxed">
              Discover high-intent B2B partnerships, distribution deals, and reciprocal exchanges.
              Privacy-guaranteed until mutual agreement.
            </p>
          </div>

          {/* Quick Action Pill / Help */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={startTour}
              className="gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-[#64748B]" />
              <span>How It Works</span>
            </Button>

            {isSignedIn ? (
              <Link
                to="/post"
                id="post-opportunity-top-btn"
                className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white font-medium text-xs md:text-sm px-4 py-2 rounded-[4px] transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post Opportunity</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                id="post-opportunity-top-btn"
                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 border border-slate-200 font-medium text-xs md:text-sm px-4 py-2 rounded-[4px] cursor-not-allowed select-none transition-all"
                title="Sign in required to post an opportunity"
              >
                <Plus className="w-4 h-4" />
                <span>Post Opportunity</span>
              </button>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            STREAMLINED METRICS STRIP (4 DESIGN SYSTEM METRIC CARDS) - ONLY FOR SIGNED-IN USERS
            ═══════════════════════════════════════════════════════════════════ */}
        {isSignedIn && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <MetricCard
              label="Active Deals"
              value={dbOpps.length.toLocaleString()}
              subLabel="verified"
            />
            <MetricCard
              label="Median Response"
              value={medianResponseTime}
              subLabel="avg pitch turn"
            />
            <MetricCard
              label="Reciprocity Rate"
              value="97%"
              subLabel="Bilateral"
              subLabelColor="text-[#059669] font-medium"
            />
            <MetricCard
              label="Verified Businesses"
              value={verifiedBizCount.toLocaleString()}
              subLabel="members"
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            CATEGORY TABS FILTER
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          id="category-tabs-filter"
          className={cn(
            "flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none",
            !isSignedIn ? "pt-6" : "",
          )}
        >
          {TYPES.map((t) => {
            const isActive = type === t;
            const count = categoryCounts[t] ?? 0;
            return (
              <button
                key={t}
                onClick={() =>
                  navigate({
                    search: (prev: SearchParams) => ({
                      ...prev,
                      type: t as any,
                      page: 1,
                    }),
                  })
                }
                type="button"
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#171F2C] text-white shadow-xs"
                    : "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{t === "All" ? "All Deals" : t}</span>
                <span
                  className={
                    isActive
                      ? "bg-white/20 text-white px-1.5 py-0.2 rounded-full text-[10px]"
                      : "text-slate-400 text-[11px]"
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SEARCH & SECONDARY FILTER CONTROLS (V2 DESIGN)
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          id="search-and-filters-bar"
          className="mt-3 mb-6 bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 shadow-sm"
        >
          {/* Search Input */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl flex-1">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search keywords, industries, reciprocal offers, or deal IDs..."
              value={searchInputVal}
              onChange={(e) => setSearchInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate({
                    search: (prev: SearchParams) => ({
                      ...prev,
                      q: searchInputVal,
                      page: 1,
                    }),
                  });
                }
              }}
              className="bg-transparent border-0 outline-none text-slate-800 text-xs sm:text-sm w-full placeholder:text-slate-400 focus:ring-0"
            />
            {searchInputVal && (
              <button
                type="button"
                onClick={() => {
                  setSearchInputVal("");
                  navigate({
                    search: (prev: SearchParams) => ({
                      ...prev,
                      q: "",
                      page: 1,
                    }),
                  });
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </kbd>
          </div>

          {/* Dropdown Filters */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Industry Filter */}
            <select
              value={industry}
              onChange={(e) =>
                navigate({
                  search: (prev: SearchParams) => ({
                    ...prev,
                    industry: e.target.value,
                    page: 1,
                  }),
                })
              }
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium pl-3 pr-7 py-2 rounded-xl border border-slate-200/60 outline-none cursor-pointer transition-colors"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind === "All" ? "Industry: All Sectors" : ind}
                </option>
              ))}
            </select>

            {/* Region Filter */}
            <select
              value={geo}
              onChange={(e) =>
                navigate({
                  search: (prev: SearchParams) => ({
                    ...prev,
                    geo: e.target.value,
                    page: 1,
                  }),
                })
              }
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium pl-3 pr-7 py-2 rounded-xl border border-slate-200/60 outline-none cursor-pointer transition-colors"
            >
              {GEOGRAPHIES.map((g) => (
                <option key={g} value={g}>
                  {g === "All" ? "Region: Global" : g}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sort}
              onChange={(e) =>
                navigate({
                  search: (prev: SearchParams) => ({
                    ...prev,
                    sort: e.target.value as any,
                    page: 1,
                  }),
                })
              }
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium pl-3 pr-7 py-2 rounded-xl border border-slate-200/60 outline-none cursor-pointer transition-colors"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="expiring">Sort: Expiry Soonest</option>
              <option value="reciprocity">Sort: Parity Score</option>
            </select>

            {/* Reset Filter Button */}
            {(type !== "All" || industry !== "All" || geo !== "All" || q || sort !== "newest") && (
              <button
                type="button"
                onClick={() => {
                  setSearchInputVal("");
                  navigate({
                    search: {
                      industry: "All",
                      geo: "All",
                      type: "All",
                      q: "",
                      sort: "newest",
                      page: 1,
                    },
                  });
                }}
                className="text-xs text-[#64748B] hover:text-[#000000] underline underline-offset-4 px-1 shrink-0 cursor-pointer transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            2-COLUMN MAIN FEED LAYOUT (8 COLS FEED + 4 COLS SIDEBAR)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Feed Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {loadingOpps ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 animate-pulse space-y-3"
                    >
                      <div className="h-4 bg-slate-100 rounded w-24" />
                      <div className="h-6 bg-slate-100 rounded w-3/4" />
                      <div className="h-4 bg-slate-100 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : paginatedOpps.length === 0 ? (
                <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] mx-auto">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#171F2C]">No opportunities found</h3>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                    No listings match your current filters. Try changing topic, industry, or search
                    query.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchInputVal("");
                      navigate({
                        search: {
                          industry: "All",
                          geo: "All",
                          type: "All",
                          q: "",
                          sort: "newest",
                          page: 1,
                        },
                      });
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(!isSignedIn ? paginatedOpps.slice(0, 3) : paginatedOpps).map((opp, idx) => {
                    const isOwner = Boolean(myBusinessId && opp.business_id === myBusinessId);
                    const isSaved = savedOpportunityIds.has(opp.id);
                    const interestRecord = interestStore[opp.id];
                    const interestStatus = interestRecord?.status ?? "idle";
                    const isMock = opp.id.startsWith("RY-") && OPPORTUNITIES.some((m) => m.id === opp.id);
                    const defaultBase = isMock ? calculateBaseViews(opp.id, opp.interested) : 0;
                    const dynamicViews = viewsMap[opp.id] ?? opp.views ?? defaultBase;

                    const oppWithViews: Opportunity = {
                      ...opp,
                      views: dynamicViews,
                    };

                    return (
                      <div
                        key={opp.id}
                        className={cn(
                          !isSignedIn && idx >= 2 && "filter blur-[8px] opacity-25 select-none pointer-events-none scale-[1.01] transform",
                        )}
                      >
                        <ObservedOpportunityCard
                          opp={oppWithViews}
                          isOwner={isOwner}
                          isSaved={isSaved}
                          isBlurred={!isSignedIn}
                          interestStatus={interestStatus}
                          onSaveToggle={handleSaveToggle}
                          onExpressInterest={handleOpenInterest}
                          onEdit={handleOpenEdit}
                          onViewRecorded={handleViewRecorded}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Streamlined Pagination (Only for Authenticated Users) */}
              {isSignedIn && sortedOpps.length > 0 && (
                <div className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-[4px] px-5 py-3.5 text-xs text-[#64748B] shadow-2xs">
                  <div>
                    Showing{" "}
                    <span className="font-semibold text-[#171F2C]">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1} –{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, sortedOpps.length)}
                    </span>{" "}
                    of <span className="font-semibold text-[#171F2C]">{sortedOpps.length}</span>{" "}
                    listings
                  </div>

                  <div className="flex items-center gap-1 font-mono">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() =>
                        navigate({
                          search: (prev: SearchParams) => ({
                            ...prev,
                            page: currentPage - 1,
                          }),
                        })
                      }
                      className="px-2.5 py-1.5 rounded-[4px] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] text-[#171F2C] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isCurrent = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() =>
                            navigate({
                              search: (prev: SearchParams) => ({
                                ...prev,
                                page: pageNum,
                              }),
                            })
                          }
                          className={`px-3 py-1.5 rounded-[4px] font-medium cursor-pointer transition-colors ${
                            isCurrent
                              ? "bg-[#000000] text-white"
                              : "border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] text-[#171F2C]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        navigate({
                          search: (prev: SearchParams) => ({
                            ...prev,
                            page: currentPage + 1,
                          }),
                        })
                      }
                      className="px-2.5 py-1.5 rounded-[4px] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] text-[#171F2C] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                RIGHT SIDEBAR (4 COLS) — BANNERS & PULSE CONTROLS
                ═══════════════════════════════════════════════════════════════════ */}
            <aside className={cn("lg:col-span-4 space-y-5", !isSignedIn && "hidden lg:block")}>
              {/* 1. How The Relay Works Banner / Educational Card */}
              <HowItWorksCard />

              {/* 2. Need a Custom Partner Callout Card (Dark Foundation Banner) */}
              <TargetedPlacementCard buttonHref={isSignedIn ? "/post" : undefined} disabled={!isSignedIn} />

              {/* 3. Recent Handshakes Live Widget */}
              <RecentHandshakesCard />
            </aside>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              FULL-WIDTH GOL (CIRCULAR DOME) OVERLAY (Covers Feed & Sidebar down to footer)
              ═══════════════════════════════════════════════════════════════════ */}
          {!isSignedIn && (
            <div className="absolute top-[840px] sm:top-[640px] lg:top-[520px] -inset-x-4 sm:-inset-x-8 bottom-0 pointer-events-none z-20 flex flex-col items-center overflow-hidden">
              {/* 1. Gol Circular Arc Dome Top (Seamless quick feathering into pure solid white) */}
              <div className="w-[185%] sm:w-[155%] lg:w-[130%] h-56 sm:h-64 lg:h-72 rounded-t-[100%] bg-gradient-to-b from-transparent via-white/85 via-15% via-white via-35% to-white pointer-events-none" />

              {/* 2. Solid White Fill extending through the bottom of the page */}
              <div className="w-full flex-1 bg-white" />

              {/* 3. Floating Centered Gatekeeper Box (Sign In / Apply) - Completely inside the solid white dome */}
              <div className="absolute top-16 sm:top-20 lg:top-24 inset-x-3 sm:inset-x-4 flex items-center justify-center pointer-events-auto">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_22px_60px_-10px_rgba(15,23,42,0.2)] text-center max-w-[94%] sm:max-w-md md:max-w-lg w-full space-y-3.5 sm:space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto shadow-xs">
                    <Lock className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-0.5 rounded-full inline-block mb-2">
                      VERIFIED OPERATOR NETWORK
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight font-display">
                      Unlock All Commercial Opportunities
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
                      Verified company executives exchange deals, distribution, and partnerships daily. Apply for access or sign in to unmask partner identities and propose deals.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto px-7 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Apply for Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/login"
                      className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] font-mono text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                      Zero Cold Outreach
                    </span>
                    <span>•</span>
                    <span>Bilateral Privacy</span>
                    <span>•</span>
                    <span>Verified Executives</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPRESS INTEREST MODAL DIALOG (STREAMLINED V2 SPEC)
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={interestOpen}
        onOpenChange={(open) => {
          if (!open) {
            setInterestOpen(false);
            setSelectedOppForInterest(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl p-0 sm:p-0 !p-0 gap-0 overflow-hidden flex flex-col border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-150">
          {selectedOppForInterest && (
            <div className="w-full flex flex-col overflow-hidden">
              {/* 1. Minimal Clean Modal Header */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 sm:pb-5 border-b border-[#E2E8F0] bg-white shrink-0 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <DialogTitle className="font-display text-lg sm:text-xl font-bold text-[#171F2C] tracking-tight">
                      Express Interest: {selectedOppForInterest.company}
                    </DialogTitle>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      94% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    {selectedOppForInterest.title}
                  </p>
                </div>
              </div>

              {/* 2. Clean Single-Column Modal Content */}
              <div className="px-6 sm:px-8 py-5 sm:py-6 space-y-5 overflow-y-auto max-h-[calc(88vh-140px)]">
                {/* Seeking & Offering Context Pill */}
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-slate-600">
                  <Info className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong className="font-semibold text-slate-800">Seeking:</strong>{" "}
                    {selectedOppForInterest.location || selectedOppForInterest.geo || "Tier-1 Enterprise Intros"}
                    {selectedOppForInterest.industry ? ` in ${selectedOppForInterest.industry}` : ""} •{" "}
                    <strong className="font-semibold text-slate-800">Offering:</strong>{" "}
                    {selectedOppForInterest.offer_text || "25% recurring rev-share"}
                  </span>
                </div>

                {/* Reciprocal Pitch Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-[#171F2C]" htmlFor="pitch-input">
                      Your Reciprocal Pitch
                    </Label>
                    <span className="text-[11px] text-[#94A3B8] font-mono">
                      {pitchInput.length}/500
                    </span>
                  </div>
                  <Textarea
                    id="pitch-input"
                    value={pitchInput}
                    onChange={(e) => setPitchInput(e.target.value)}
                    maxLength={500}
                    placeholder="Describe your reciprocal value or reach..."
                    rows={3}
                    className="w-full bg-white border border-[#E2E8F0] text-slate-900 text-xs md:text-sm rounded-xl p-3.5 focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] leading-relaxed transition-all shadow-xs resize-none placeholder-slate-400"
                  />
                </div>

                {/* Commercial Terms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Proposed Rev Share */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs font-semibold text-[#171F2C]">Proposed Rev Share</span>
                      <span className="font-mono font-bold text-xs text-[#171F2C]" id="split-val">
                        {splitVal}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["25.0%", "27.5%", "30.0%"].map((val) => {
                        const isSelected = splitVal === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setSplitVal(val)}
                            className={`py-2 text-center text-xs rounded-lg transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#000000] text-white font-semibold shadow-xs"
                                : "border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 font-medium"
                            }`}
                          >
                            {val === "25.0%" ? "25%" : val === "27.5%" ? "27.5%" : "30%"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Commitment Period */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs font-semibold text-[#171F2C]">Commitment Period</span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {duration.includes("6") ? "6 mo." : "12 mo."}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["6 Months", "12 Months"].map((dur) => {
                        const isSelected =
                          dur === "12 Months" ? duration.includes("12") : duration.includes("6");
                        return (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setDuration(dur)}
                            className={`py-2 text-center text-xs rounded-lg transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#000000] text-white font-semibold shadow-xs"
                                : "border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 font-medium"
                            }`}
                          >
                            {dur}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Blinded NDA notice */}
                <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Bilateral mutual NDA automatically included. Identity remains blinded until accepted.</span>
                </div>
              </div>

              {/* 3. Modal Clean Direct Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-[#E2E8F0] bg-slate-50/50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setInterestOpen(false);
                    setSelectedOppForInterest(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-[#E2E8F0] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitInterest}
                  disabled={submittingInterest}
                  className="px-5 py-2 rounded-lg bg-[#000000] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submittingInterest ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          EDIT OPPORTUNITY MODAL DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditOpen(false);
            setSelectedOppToEdit(null);
          }
        }}
      >
        <DialogContent className="max-w-xl bg-white border border-[#E2E8F0] p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-base text-[#171F2C]">
              Edit Opportunity Listing
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B]">
              Update your commercial requirement and exchange terms.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitEdit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#171F2C]">Opportunity Title *</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="h-10 text-xs bg-white border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 rounded-[4px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#171F2C]">Category *</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger className="h-10 text-xs bg-white border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 rounded-[4px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#E2E8F0] rounded-[4px] shadow-lg">
                    <SelectItem value="partnership" className="text-xs text-[#171F2C]">
                      Partnership
                    </SelectItem>
                    <SelectItem value="referral" className="text-xs text-[#171F2C]">
                      Referral
                    </SelectItem>
                    <SelectItem value="distribution" className="text-xs text-[#171F2C]">
                      Distribution
                    </SelectItem>
                    <SelectItem value="vendor" className="text-xs text-[#171F2C]">
                      Vendor
                    </SelectItem>
                    <SelectItem value="hiring" className="text-xs text-[#171F2C]">
                      Hiring
                    </SelectItem>
                    <SelectItem value="strategic_advice" className="text-xs text-[#171F2C]">
                      Strategic Advice
                    </SelectItem>
                    <SelectItem value="investment" className="text-xs text-[#171F2C]">
                      Investment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#171F2C]">Industry *</Label>
                <Select value={editIndustry} onValueChange={setEditIndustry}>
                  <SelectTrigger className="h-10 text-xs bg-white border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 rounded-[4px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#E2E8F0] rounded-[4px] shadow-lg max-h-60">
                    {INDUSTRIES.filter((i) => i !== "All").map((ind) => (
                      <SelectItem key={ind} value={ind} className="text-xs text-[#171F2C]">
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#171F2C]">
                Seeking in Exchange
              </Label>
              <Input
                placeholder="e.g. 25% recurring margin + co-marketing budget"
                value={editOfferText}
                onChange={(e) => setEditOfferText(e.target.value)}
                className="h-10 text-xs bg-white border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 rounded-[4px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#171F2C]">
                Detailed Description * (min 50 chars)
              </Label>
              <Textarea
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
                className="text-xs bg-white border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 rounded-[4px] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => {
                  setEditOpen(false);
                  setSelectedOppToEdit(null);
                }}
                className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#171F2C] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingEdit}
                className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs font-semibold px-4 py-2 rounded-[4px] cursor-pointer shadow-xs disabled:opacity-50"
              >
                {submittingEdit && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          PROPOSAL SUBMITTED CONFIRMATION MODAL
          ═══════════════════════════════════════════════════════════════════ */}
      <ProposalConfirmationModal
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        targetCompanyName={submittedTargetCompany}
        opportunityTitle={submittedOppTitle}
        backButtonText="Back to Opportunity Board"
      />
    </div>
  );
}
