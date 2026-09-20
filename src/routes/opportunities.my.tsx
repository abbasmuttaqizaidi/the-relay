import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
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
import { listOpportunities } from "../functions/listOpportunities";
import { expressInterest } from "../functions/expressInterest";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import { useInterestStore } from "@/lib/interest-store";
import { getCompanyInitials } from "@/lib/utils";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ProposalConfirmationModal } from "@/components/ProposalConfirmationModal";
import { Menu, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  ArrowLeft,
  Plus,
  Edit2,
  XCircle,
  Lock,
  Check,
  Loader2,
  Calendar,
  MapPin,
  Users,
  Tag,
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Info,
  HelpCircle,
  Trash2,
  Eye,
  BookmarkCheck,
  ExternalLink,
  Megaphone,
  Sparkles,
  MoreVertical,
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
import { TooltipSimple } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

const mySearchSchema = z.object({
  tab: fallback(z.enum(["posted", "saved"]), "posted").default("posted"),
  create: fallback(z.boolean(), false).default(false),
});

export const Route = createFileRoute("/opportunities/my")({
  validateSearch: zodValidator(mySearchSchema),
  head: () => ({
    meta: [
      { title: "My Opportunities — The Relay" },
      {
        name: "description",
        content: "Manage your B2B opportunity listings on The Relay network.",
      },
    ],
  }),
  component: MyOpportunitiesPage,
});

const CATEGORIES = ["partnership", "referral", "distribution", "vendor", "hiring", "strategic_advice", "investment"] as const;

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

function MyOpportunitiesPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tab, create } = Route.useSearch();
  const approvedBannerKey = userId ? `relay_approved_banner_dismissed_${userId}` : "relay_approved_banner_dismissed";
  const [approvedBannerDismissed, setApprovedBannerDismissed] = useState(() => {
    try {
      return localStorage.getItem(approvedBannerKey) === "true";
    } catch { return false; }
  });

  // Tab State
  const [activeTab, setActiveTab] = useState<"posted" | "saved">(tab);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Form Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Detail Modal States
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetailOpp, setSelectedDetailOpp] = useState<any>(null);

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";

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

  // Handshake Interest flow states
  const { store, request } = useInterestStore();
  const [pitch, setPitch] = useState("");
  const [interestOpen, setInterestOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submittedTargetCompany, setSubmittedTargetCompany] = useState("");
  const [submittedOppTitle, setSubmittedOppTitle] = useState("");

  // 1. React Query: Onboarding & Business Profile
  const { data: onboardingData, isLoading: onboardingLoading } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 5,
  });

  const business = onboardingData?.business || null;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in to access this page.", { id: "my-opps-auth-required" });
      navigate({ to: "/login", replace: true });
    } else if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      toast.error("Please register your business profile first.", {
        id: "my-opps-onboarding-redirect",
      });
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoaded, isSignedIn, onboardingData, navigate]);

  useEffect(() => {
    if (create && business) {
      if (business.status === "approved") {
        setCreateOpen(true);
      } else {
        toast.error(
          `Forbidden: Your business profile status is "${business.status || "pending"}". Only approved businesses can create opportunities.`,
        );
      }
      navigate({ to: "/opportunities/my", search: { tab, create: false } });
    }
  }, [create, business, navigate, tab]);

  // 2. React Query: My Opportunities List
  const { data: myOpps = [], isLoading: loadingOpps } = useQuery({
    queryKey: ["my-opportunities", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getMyOpportunities();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  // 3. React Query: Saved Opportunities List
  const { data: savedItems = [], isLoading: loadingSaved } = useQuery({
    queryKey: ["saved-opportunities-list", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const items = await getSavedOpportunities();
      let mockIds: string[] = [];
      try {
        const stored = localStorage.getItem(mockStorageKey);
        if (stored) mockIds = JSON.parse(stored);
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
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  // 4. React Query: Saved Opportunities Count
  const { data: savedCount = 0 } = useQuery({
    queryKey: ["saved-opportunities-count", userId],
    queryFn: async () => {
      if (!isSignedIn) return 0;
      try {
        const count = await countSavedOpportunities();
        let mockCount = 0;
        try {
          const stored = localStorage.getItem(mockStorageKey);
          if (stored) mockCount = JSON.parse(stored).length;
        } catch (_) {}
        return (typeof count === "number" ? count : 0) + mockCount;
      } catch {
        return 0;
      }
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  const loadingList = loadingOpps || loadingSaved;

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenuId(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleExpressInterest = async () => {
    if (!selectedDetailOpp) return;
    const trimmed = pitch.trim();
    if (trimmed.length < 20) {
      toast.error("Add a short context note (20+ characters).");
      return;
    }
    try {
      await expressInterest({ data: { opportunity_id: selectedDetailOpp.id } });
      request(selectedDetailOpp.id, trimmed);
      const targetCompany =
        selectedDetailOpp.business?.company_name ||
        selectedDetailOpp.company ||
        "Counterparty";
      const oppTitle = selectedDetailOpp.title;
      setSubmittedTargetCompany(targetCompany);
      setSubmittedOppTitle(oppTitle);
      setInterestOpen(false);
      setPitch("");
      setConfirmationOpen(true);
      toast.success("Interest sent. Awaiting mutual acceptance.");
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to express interest.");
    }
  };

  // Remove Saved Mutation
  const removeSavedMutation = useMutation({
    mutationFn: async (oppId: string) => {
      const isMock = oppId.startsWith("RY-");
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
    },
    onMutate: async (oppId: string) => {
      await queryClient.cancelQueries({ queryKey: ["saved-opportunities-list", userId] });
      const previous = queryClient.getQueryData<any[]>(["saved-opportunities-list", userId]) || [];
      queryClient.setQueryData(
        ["saved-opportunities-list", userId],
        previous.filter((item) => item.opportunity_id !== oppId)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["saved-opportunities-list", userId], context.previous);
      }
      toast.error("Failed to remove opportunity.");
    },
    onSuccess: () => {
      toast.success("Opportunity removed from saved.");
      queryClient.invalidateQueries({ queryKey: ["saved-opportunities-count", userId] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-opportunities-list", userId] });
    },
  });

  const handleRemove = (oppId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    removeSavedMutation.mutate(oppId);
    if (selectedDetailOpp?.id === oppId) {
      setDetailOpen(false);
    }
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    if (!business || business.status !== "approved") {
      toast.error(
        `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`,
        {
          duration: 5000,
        },
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

  // Open Edit Dialog
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
    setExpiryDays("30"); // default, calculation will be made if modified
    setHideCompanyName(opp.hide_company_name ?? false);
    setPromote(opp.promotion_status === "pending_promotion" || opp.promotion_status === "promoted");
    setEditOpen(true);
  };

  // Submit Create Opportunity
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(
        `Description must be between 50 and 3000 characters. Currently: ${description.length}`,
      );
      return;
    }

    if (promote && hideCompanyName) {
      toast.error("Promoted opportunities cannot be confidential. Please uncheck 'Hide company name' or 'Promote this listing'.");
      return;
    }

    try {
      setSubmitting(true);
      // Calculate expires_at Date
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
      queryClient.invalidateQueries({ queryKey: ["my-opportunities", userId] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      console.error("Create opportunity error:", err);
      toast.error(err.message || "Failed to create opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Opportunity
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(
        `Description must be between 50 and 3000 characters. Currently: ${description.length}`,
      );
      return;
    }

    if (promote && hideCompanyName) {
      toast.error("Promoted opportunities cannot be confidential. Please uncheck 'Hide company name' or 'Promote this listing'.");
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
      queryClient.invalidateQueries({ queryKey: ["my-opportunities", userId] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      console.error("Update opportunity error:", err);
      toast.error(err.message || "Failed to update opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  // Close Opportunity
  const handleClose = async (opportunityId: string) => {
    if (
      !confirm(
        "Are you sure you want to close this opportunity? It will be hidden from the explore feed.",
      )
    )
      return;

    try {
      await closeOpportunity({
        data: { opportunity_id: opportunityId },
      });
      toast.success("Opportunity Closed Successfully");
      queryClient.invalidateQueries({ queryKey: ["my-opportunities", userId] });
      queryClient.invalidateQueries({ queryKey: ["opportunities-feed"] });
    } catch (err: any) {
      console.error("Close opportunity error:", err);
      toast.error(err.message || "Failed to close opportunity");
    }
  };

  const isApproved = business?.status === "approved";

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col overflow-x-hidden w-full max-w-full">

      {/* Main Workspace */}
      {!isLoaded || onboardingLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-xl animate-pulse" />
              <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
                Loading Operator Dashboard
              </span>
            </div>
          </div>
        </div>
      ) : (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-24">

        {/* Header Title & Action button */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div id="my-opportunities-info" className="space-y-1">
            <h1 className="font-display text-2xl font-black text-slate-950 uppercase tracking-tight">
              My Opportunities
            </h1>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl">
              Post, edit, and close opportunity exchange memos. Only approved businesses can publish
              new requests.
            </p>
          </div>

          <Link
            id="my-post-opportunity-btn"
            to="/post"
            className="inline-flex items-center gap-2 h-11 px-5 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold shadow-xs cursor-pointer bg-slate-900 text-white hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" /> Post
          </Link>
        </header>

        {/* Business Status Check Alert banner */}
        {!isApproved && (
          <>
            <div className="mb-8 border border-amber-500/20 bg-amber-50 p-5 rounded-[2px] flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <h4 className="font-mono text-xs font-bold uppercase text-amber-800 tracking-wider">
                  Operator Approval Required
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed max-w-[80ch]">
                  Your business profile current verification state is{" "}
                  <span className="font-bold uppercase">
                    &ldquo;{business?.status || "pending"}&rdquo;
                  </span>
                  . Opportunity creation, editing, and closing operations are restricted to approved
                  network nodes. Profiles are typically hand-vetted within 24 hours.
                </p>
              </div>
            </div>

            <div className="mb-8 border border-slate-200 bg-white p-5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-momentum">
              <div className="space-y-1 text-left">
                <h4 className="font-mono text-xs font-bold uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-slate-500" />
                  Saved Opportunities
                </h4>
                <p className="text-xs text-slate-600">
                  You have <span className="font-bold">{savedCount}</span> saved opportunities.
                  Review them after approval.
                </p>
              </div>
              <Link
                to="/saved-opportunities"
                className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-[2px] font-bold shadow-xs hover:shadow text-center shrink-0 cursor-pointer"
              >
                View Saved Opportunities
              </Link>
            </div>
          </>
        )}

        {isApproved && savedCount > 0 && !approvedBannerDismissed && (
          <div className="mb-8 border border-emerald-500/20 bg-emerald-50 p-5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-momentum">
            <div className="space-y-1 text-left">
              <h4 className="font-mono text-xs font-bold uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Congratulations!
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed max-w-[80ch]">
                Your business has been approved. You currently have{" "}
                <span className="font-bold text-emerald-900">{savedCount}</span> Saved
                Opportunities.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setApprovedBannerDismissed(true);
                  try { localStorage.setItem(approvedBannerKey, "true"); } catch {}
                }}
                className="border border-emerald-300 hover:border-emerald-500 text-emerald-700 hover:text-emerald-900 text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-[2px] font-bold transition-all cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => navigate({ to: "/opportunities/my", search: { tab: "saved" } })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-[2px] font-bold shadow-xs hover:shadow text-center cursor-pointer"
              >
                Review Saved Memos
              </button>
            </div>
          </div>
        )}

        {/* Tab switcher */}
        <div id="my-dashboard-tabs" className="flex border-b border-slate-200 mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => navigate({ to: "/opportunities/my", search: { tab: "posted" } })}
            className={`py-3 px-3 sm:px-6 border-b-2 transition-all cursor-pointer ${
              activeTab === "posted"
                ? "border-slate-900 text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            <span className="hidden sm:inline">My </span>Listings ({myOpps.length})
          </button>
          <button
            onClick={() => navigate({ to: "/opportunities/my", search: { tab: "saved" } })}
            className={`py-3 px-3 sm:px-6 border-b-2 transition-all cursor-pointer ${
              activeTab === "saved"
                ? "border-slate-900 text-slate-900 font-extrabold"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Saved<span className="hidden sm:inline"> Memos</span> ({savedItems.length})
          </button>
        </div>

        {/* Opportunities Table Container */}
        <div id="my-listings-container" className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs">
          {loadingList ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Fetching records...
              </span>
            </div>
          ) : activeTab === "posted" ? (
            myOpps.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <Info className="w-8 h-8 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-slate-900 uppercase">
                    No Opportunities Posted
                  </h4>
                  <p className="text-slate-500 text-xs max-w-sm">
                    You haven&apos;t posted any B2B partnerships or referral requests yet. Click
                    &ldquo;Post&rdquo; to begin.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="py-4 px-6">ID</th>
                        <th className="py-4 px-6">Title & Category</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Created Date</th>
                        <th className="py-4 px-6">Interested Count</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myOpps.map((opp) => (
                        <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                          {/* ID */}
                          <td className="py-4 px-6 font-mono font-bold text-slate-600">
                            #{opp.opportunity_number || opp.id.substring(0, 8)}
                          </td>

                          {/* Title & Category */}
                          <td className="py-4 px-6 space-y-1 max-w-[280px]">
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
                              {opp.promotion_status === "pending_promotion" && (
                                <span className="px-2 py-0.5 border border-amber-200 bg-amber-50 text-[8px] font-mono font-bold uppercase tracking-wider text-amber-700 rounded-[2px] inline-flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" /> Pending Promotion
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Status */}
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

                          {/* Created Date */}
                          <td className="py-4 px-6 font-mono text-slate-500">
                            {new Date(opp.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          {/* Interested Count */}
                          <td className="py-4 px-6 font-mono text-slate-700 font-bold">
                            {opp.interestedCount} Operators
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right space-x-2 shrink-0 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEdit(opp)}
                              disabled={!isApproved}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-all bg-white cursor-pointer ${
                                isApproved
                                  ? "text-slate-700 hover:text-slate-900"
                                  : "opacity-30 cursor-not-allowed"
                              }`}
                            >
                              <Edit2 className="w-3 h-3 text-slate-400" /> Edit
                            </button>
                            {opp.status === "active" && (
                              <button
                                onClick={() => handleClose(opp.id)}
                                disabled={!isApproved}
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 border border-red-100 hover:border-red-600 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-all bg-white cursor-pointer ${
                                  isApproved
                                    ? "text-red-600 hover:bg-red-50/50"
                                    : "opacity-30 cursor-not-allowed"
                                }`}
                              >
                                <XCircle className="w-3 h-3 text-red-400" /> Close
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
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
                          {opp.promotion_status === "promoted" && (
                            <span className="px-2 py-0.5 border border-orange-200 bg-orange-50 text-[8px] font-mono font-bold uppercase tracking-wider text-orange-700 rounded-[2px]">
                              Promoted
                            </span>
                          )}
                          {opp.promotion_status === "pending_promotion" && (
                            <span className="px-2 py-0.5 border border-amber-200 bg-amber-50 text-[8px] font-mono font-bold uppercase tracking-wider text-amber-700 rounded-[2px] inline-flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" /> Pending Promotion
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
                            {opp.interestedCount} Operators
                          </span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(prev => prev === opp.id ? null : opp.id);
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
                                className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                                  isApproved ? "text-slate-700" : "opacity-30 cursor-not-allowed"
                                }`}
                              >
                                <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                                Edit
                              </button>
                              {opp.status === "active" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(null);
                                    handleClose(opp.id);
                                  }}
                                  disabled={!isApproved}
                                  className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                                    isApproved ? "text-red-600" : "opacity-30 cursor-not-allowed"
                                  }`}
                                >
                                  <XCircle className="w-3.5 h-3.5 text-red-400" />
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
          ) : activeTab === "saved" ? (
            savedItems.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <BookmarkCheck className="w-8 h-8 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-slate-900 uppercase">
                    No Saved Opportunities
                  </h4>
                  <p className="text-slate-500 text-xs max-w-sm">
                    Bookmark B2B opportunities on the explore feed to review and access them here.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                        <th className="py-4 px-6">Opportunity #</th>
                        <th className="py-4 px-6">Title</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Company</th>
                        <th className="py-4 px-6">Industry / Location</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {savedItems.map((item) => {
                        const opp = item.opportunity;
                        const isClosed = opp.status === "closed";
                        const isExpired = opp.expires_at
                          ? new Date(opp.expires_at) < new Date()
                          : false;
                        const isInactive = isClosed || isExpired;
                        const isConnected = store[opp.id]?.status === "accepted";
                        const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                        const displayName = shouldHide ? "Confidential" : opp.company;

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedDetailOpp(opp);
                              setDetailOpen(true);
                            }}
                          >
                            <td className="py-4 px-6 font-mono text-slate-600 font-bold">
                              #{opp.opportunity_number || opp.id.substring(0, 8)}
                            </td>
                            <td className="py-4 px-6 font-semibold text-slate-900 max-w-xs truncate">
                              {opp.title}
                            </td>
                            <td className="py-4 px-6 font-mono text-[9px] uppercase tracking-wider font-bold">
                              <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-600 border border-slate-200/40">
                                {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-bold text-slate-700">{displayName}</td>
                            <td className="py-4 px-6 space-y-0.5 text-slate-500 font-mono text-[10px]">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                                {opp.industry}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                {opp.location || "Remote"}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              {isInactive ? (
                                <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200/60 rounded-[2px] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                                  {isClosed ? "Closed" : "Expired"}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-[2px] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                                  Active
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDetailOpp(opp);
                                    setDetailOpen(true);
                                  }}
                                  className="p-1.5 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-[2px] transition-all cursor-pointer bg-white"
                                  title="View Opportunity"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => handleRemove(opp.id, e)}
                                  className="p-1.5 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 rounded-[2px] transition-all cursor-pointer bg-white"
                                  title="Remove From Saved"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
                <div className="block md:hidden divide-y divide-slate-100 bg-white">
                  {savedItems.map((item) => {
                    const opp = item.opportunity;
                    const isClosed = opp.status === "closed";
                    const isExpired = opp.expires_at
                      ? new Date(opp.expires_at) < new Date()
                      : false;
                    const isInactive = isClosed || isExpired;
                    const isConnected = store[opp.id]?.status === "accepted";
                    const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                    const displayName = shouldHide ? "Confidential" : opp.company;

                    return (
                      <div
                        key={item.id}
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
                          {isInactive ? (
                            <span className="px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200/60 rounded-[2px] text-[8px] font-mono font-bold uppercase">
                              {isClosed ? "Closed" : "Expired"}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-[2px] text-[8px] font-mono font-bold uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-slate-900 text-sm leading-snug">
                            {opp.title}
                          </h4>
                          <p className="text-[11px] font-bold text-slate-700">{displayName}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                              {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 text-slate-500 font-mono text-[9px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                              {opp.industry}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-300" />
                              {opp.location || "Remote"}
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(prev => prev === opp.id ? null : opp.id);
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
                                    setSelectedDetailOpp(opp);
                                    setDetailOpen(true);
                                  }}
                                  className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors text-slate-700"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                                  View Brief
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(null);
                                    handleRemove(opp.id, e);
                                  }}
                                  className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )
          ) : null}
        </div>
      </main>
      )}

      {/* CREATE DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="flex w-[calc(100vw-1rem)] max-w-[680px] h-[85dvh] sm:h-auto max-h-[88dvh] flex-col gap-0 overflow-hidden bg-white p-0 sm:p-0 text-left font-sans shadow-xl rounded-[4px] border border-slate-200">
          <DialogHeader className="border-b border-slate-100 px-4 pb-3 pt-5 pr-12 sm:px-4 sm:pt-4 sm:pr-10">
            <DialogTitle className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-slate-950 leading-tight">
              Post Opportunity Brief
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs leading-relaxed">
              Outline your requirements. Memos are distributed to verified operators matches.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleCreateSubmit}
            className="min-h-0 flex-1 flex flex-col gap-0 overflow-hidden"
          >
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-4 sm:py-3 space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3" /> Opportunity Title *
                </span>
                <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Exchange Category *
                </span>
                <TooltipSimple content="Select the type of partnership layout (e.g. client referral exchange, distribution partner, or vendor).">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="partnership">
                    Partnership (Integrations, API merges)
                  </SelectItem>
                  <SelectItem value="referral">
                    Referral (Client exchanges, Mutual handoffs)
                  </SelectItem>
                  <SelectItem value="distribution">
                    Distribution (IT Consultancies, Resellers)
                  </SelectItem>
                  <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
                  <SelectItem value="hiring">Hiring (Recruitment, Talent pipeline requests)</SelectItem>
                  <SelectItem value="strategic_advice">
                    Strategic Advice (Advisory, Board positions, Mentorship)
                  </SelectItem>
                  <SelectItem value="investment">Investment (Funding requests, Capital raises)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3" /> Industry Type *
                </span>
                <TooltipSimple content="Select the industry that fits this opportunity best.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60 overflow-y-auto">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5 justify-between">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Info className="w-3 h-3" /> Brief Description *
                  </span>
                  <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </span>
                <span className="text-[8px] text-slate-400 font-normal lowercase">
                  {description.length} / 50 min chars
                </span>
              </label>
              <textarea
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe your request in detail. Provide background context, scope of work, timeline, and expectations. Min 50 characters required."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-w-0 p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-none"
              />
            </div>

            <div className="grid min-w-0 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location Target (Optional)
                  </span>
                  <TooltipSimple content="Optionally restrict your target partners to a specific country, region, or specify 'Remote' / 'Global'.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. India, USA, Global, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Expiry */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Clock className="w-3 h-3" /> Expiry Period (Optional)
                  </span>
                  <TooltipSimple content="Select when this listing will be automatically closed and hidden from the public feed.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                    <SelectValue placeholder="Select Expiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="never">No Expiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* What Can You Offer */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Seeking in Exchange (Optional)
                </span>
                <TooltipSimple content="Explain what value, referral pipeline, or resources you are looking to exchange in return with the partner.">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Post Anonymously Checkbox */}
            <div className="flex items-start space-x-2.5 pt-2 pb-1">
              <Checkbox
                id="hide_company_name_create"
                checked={hideCompanyName}
                onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                className="mt-0.5"
                disabled={promote}
              />
              <label
                htmlFor="hide_company_name_create"
                className={`text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer flex flex-wrap items-center gap-1.5 select-none ${
                  promote ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                }`}
              >
                <span>Post anonymously (Hide company name from public feed)</span>
                <TooltipSimple content="If checked, your company name is displayed as 'Confidential' and logo/LinkedIn links are hidden from non-owners in the public directories.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
            </div>

            {/* Promote Opportunity Banner */}
            <div className={`p-3.5 border rounded-[4px] transition-all flex items-start space-x-3 mt-2 ${
              hideCompanyName 
                ? "bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed" 
                : promote
                  ? "bg-orange-50/40 border-orange-200/80 shadow-xs"
                  : "bg-white border-slate-200 hover:border-slate-300"
            }`}>
              <Checkbox
                id="promote_create"
                checked={promote}
                onCheckedChange={(checked) => setPromote(!!checked)}
                className="mt-1 cursor-pointer"
                disabled={hideCompanyName}
              />
              <div className="space-y-1 select-none flex-1">
                <label
                  htmlFor="promote_create"
                  className={`text-[10px] font-mono font-extrabold uppercase tracking-wider block ${
                    hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-orange-600 cursor-pointer"
                  }`}
                >
                  Promote listing for 10x visibility
                </label>
                <p className={`text-[11px] font-sans leading-relaxed ${
                  hideCompanyName ? "text-slate-400" : "text-slate-500"
                }`}>
                  {hideCompanyName 
                    ? "Featured listings must show your company name and cannot be posted anonymously." 
                    : "Requests superadmin verification. Once approved, this listing is pinned to the Featured section in dark-theme with orange highlight."}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-slate-100 bg-white px-4 py-3 sm:px-4 flex flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="h-10 flex-1 px-4 py-2 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-colors cursor-pointer bg-white sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="h-10 flex-1 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] font-bold shadow-xs hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 sm:flex-none"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Publish
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="flex w-[calc(100vw-1rem)] max-w-[680px] h-[85dvh] sm:h-auto max-h-[88dvh] flex-col gap-0 overflow-hidden bg-white p-0 sm:p-0 text-left font-sans shadow-xl rounded-[4px] border border-slate-200">
          <DialogHeader className="border-b border-slate-100 px-4 pb-3 pt-5 pr-12 sm:px-4 sm:pt-4 sm:pr-10">
            <DialogTitle className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-slate-950 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4 leading-tight">
              <span className="min-w-0">Edit Opportunity Brief</span>
              {selectedOpp && (
                <span className="font-mono text-[10px] text-slate-400 font-bold tracking-wider sm:tracking-widest uppercase block mt-1 sm:mt-0 sm:pr-4 shrink-0">
                  #{selectedOpp.opportunity_number}
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs leading-relaxed">
              Modify details for this listing. Sequence number cannot be edited.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleEditSubmit}
            className="min-h-0 flex-1 flex flex-col gap-0 overflow-hidden"
          >
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-4 sm:py-3 space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3" /> Opportunity Title *
                </span>
                <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for SEO Agency"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Exchange Category *
                </span>
                <TooltipSimple content="Select the type of partnership layout (e.g. client referral exchange, distribution partner, or vendor).">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="partnership">
                    Partnership (Integrations, API merges)
                  </SelectItem>
                  <SelectItem value="referral">
                    Referral (Client exchanges, Mutual handoffs)
                  </SelectItem>
                  <SelectItem value="distribution">
                    Distribution (IT Consultancies, Resellers)
                  </SelectItem>
                  <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
                  <SelectItem value="hiring">Hiring (Recruitment, Talent pipeline requests)</SelectItem>
                  <SelectItem value="strategic_advice">
                    Strategic Advice (Advisory, Board positions, Mentorship)
                  </SelectItem>
                  <SelectItem value="investment">Investment (Funding requests, Capital raises)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3" /> Industry Type *
                </span>
                <TooltipSimple content="Select the industry that fits this opportunity best.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60 overflow-y-auto">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5 justify-between">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Info className="w-3 h-3" /> Brief Description *
                  </span>
                  <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </span>
                <span className="text-[8px] text-slate-400 font-normal lowercase">
                  {description.length} / 50 min chars
                </span>
              </label>
              <textarea
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe your request in detail. Min 50 characters required."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-w-0 p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-none"
              />
            </div>

            <div className="grid min-w-0 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location Target (Optional)
                  </span>
                  <TooltipSimple content="Optionally restrict your target partners to a specific country, region, or specify 'Remote' / 'Global'.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. India, USA, Global, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Expiry */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                  <span className="flex flex-wrap items-center gap-1">
                    <Clock className="w-3 h-3" /> Extend Expiry Period (Optional)
                  </span>
                  <TooltipSimple content="Extend when this listing will automatically close and be removed from the public directory.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer [&>span]:truncate">
                    <SelectValue placeholder="Select Expiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="keep">Keep Current Expiry</SelectItem>
                    <SelectItem value="30">Add 30 Days</SelectItem>
                    <SelectItem value="60">Add 60 Days</SelectItem>
                    <SelectItem value="90">Add 90 Days</SelectItem>
                    <SelectItem value="never">Remove Expiry (Never)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* What Can You Offer */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex flex-wrap items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Seeking in Exchange (Optional)
                </span>
                <TooltipSimple content="Explain what value, referral pipeline, or resources you are looking to exchange in return with the partner.">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                className="w-full min-w-0 h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Post Anonymously Checkbox */}
            <div className="flex items-start space-x-2.5 pt-2 pb-1">
              <Checkbox
                id="hide_company_name_edit"
                checked={hideCompanyName}
                onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                className="mt-0.5"
                disabled={promote}
              />
              <label
                htmlFor="hide_company_name_edit"
                className={`text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer flex flex-wrap items-center gap-1.5 select-none ${
                  promote ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                }`}
              >
                <span>Post anonymously (Hide company name from public feed)</span>
                <TooltipSimple content="If checked, your company name is displayed as 'Confidential' and logo/LinkedIn links are hidden from non-owners in the public directories.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
            </div>

            {/* Promote Opportunity Banner */}
            <div className={`p-3.5 border rounded-[4px] transition-all flex items-start space-x-3 mt-2 ${
              hideCompanyName 
                ? "bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed" 
                : promote
                  ? "bg-orange-50/40 border-orange-200/80 shadow-xs"
                  : "bg-white border-slate-200 hover:border-slate-300"
            }`}>
              <Checkbox
                id="promote_edit"
                checked={promote}
                onCheckedChange={(checked) => setPromote(!!checked)}
                className="mt-1 cursor-pointer"
                disabled={hideCompanyName}
              />
              <div className="space-y-1 select-none flex-1">
                <label
                  htmlFor="promote_edit"
                  className={`text-[10px] font-mono font-extrabold uppercase tracking-wider block ${
                    hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-orange-600 cursor-pointer"
                  }`}
                >
                  Promote listing for 10x visibility
                </label>
                <p className={`text-[11px] font-sans leading-relaxed ${
                  hideCompanyName ? "text-slate-400" : "text-slate-500"
                }`}>
                  {hideCompanyName 
                    ? "Featured listings must show your company name and cannot be posted anonymously." 
                    : "Requests superadmin verification. Once approved, this listing is pinned to the Featured section in dark-theme with orange highlight."}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-slate-100 bg-white px-4 py-3 sm:px-4 flex flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="h-10 flex-1 px-4 py-2 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-colors cursor-pointer bg-white sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="h-10 flex-1 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] font-bold shadow-xs hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 sm:flex-none"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Opportunity Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans text-left">
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
              const initials = shouldHide
                ? "🔒"
                : getCompanyInitials(displayName);

              const interestStatus = store[selectedDetailOpp.id]?.status ?? "idle";

              return (
                <>
                  <DialogHeader className="space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
                        Opportunity Details
                      </span>
                      <span className="font-mono text-[9px] text-slate-400 font-semibold">
                        #
                        {selectedDetailOpp.opportunity_number ||
                          selectedDetailOpp.id.substring(0, 8)}
                      </span>
                    </div>
                    <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                      {selectedDetailOpp.title}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                        {selectedDetailOpp.category === "strategic_advice" ? "Strategic Advice" : (selectedDetailOpp.category || selectedDetailOpp.type)}
                      </span>
                      {isInactive ? (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                          {isClosed ? "Closed" : "Expired"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-4 border border-slate-200/40 rounded-[2px]">
                      {selectedDetailOpp.description}
                    </p>

                    {selectedDetailOpp.offer_text && (
                      <div className="space-y-1">
                        <h4 className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                          Seeking in exchange:
                        </h4>
                        <p className="text-xs text-slate-600 font-sans">
                          {selectedDetailOpp.offer_text}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-100 py-3.5">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                          Company
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-[2px] bg-slate-950 border border-slate-900 flex items-center justify-center font-sans text-[8px] font-bold text-white uppercase">
                            {initials}
                          </div>
                          <span className="text-xs font-bold text-slate-900 break-words">
                            {displayName}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                          Industry
                        </span>
                        <span className="text-xs text-slate-700 font-mono">
                          {selectedDetailOpp.industry || selectedDetailOpp.business?.industry}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                          Location
                        </span>
                        <span className="text-xs text-slate-700 font-mono">
                          {selectedDetailOpp.location || "Remote"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                          Expires
                        </span>
                        <span className="text-xs text-slate-700 font-mono">
                          {selectedDetailOpp.expires_at
                            ? new Date(selectedDetailOpp.expires_at).toLocaleDateString()
                            : "Never"}
                        </span>
                      </div>
                    </div>

                    {/* Unlocked Contact Details for accepted handshakes */}
                    {interestStatus === "accepted" && store[selectedDetailOpp.id]?.contact && (
                      <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2 rounded-[2px] shadow-sm animate-momentum">
                        <div className="flex items-center justify-between gap-4 border-b border-emerald-500/10 pb-1.5">
                          <div className="font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-emerald-600 font-bold break-words">
                            [ Contact unlocked · mutual acceptance ]
                          </div>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="font-display text-sm font-bold text-slate-900">
                            {store[selectedDetailOpp.id]?.contact?.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 font-bold">
                            · {store[selectedDetailOpp.id]?.contact?.role}
                          </span>
                        </div>
                        <a
                          href={`mailto:${store[selectedDetailOpp.id]?.contact?.email}`}
                          className="font-mono text-[11px] text-emerald-600 hover:underline transition-colors break-all flex items-center gap-1.5"
                        >
                          {store[selectedDetailOpp.id]?.contact?.email}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between gap-3 flex-wrap">
                    {/* Show Remove button only if in Saved items list */}
                    {savedItems.some((item) => item.opportunity_id === selectedDetailOpp.id) ? (
                      <button
                        onClick={() => handleRemove(selectedDetailOpp.id)}
                        className="py-2.5 px-4 border border-slate-200 text-slate-500 hover:border-red-600 hover:text-red-600 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    ) : (
                      <div />
                    )}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setDetailOpen(false)}
                        className="py-2.5 px-4 border border-slate-200 hover:border-slate-800 text-slate-700 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer"
                      >
                        Close
                      </button>

                      {/* Conditional Action based on approval status */}
                      {!isInactive && (
                        isApproved ? (
                          <>
                            {interestStatus === "idle" && (
                              <button
                                onClick={() => {
                                  setDetailOpen(false);
                                  setInterestOpen(true);
                                }}
                                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold"
                              >
                                Express Interest
                              </button>
                            )}
                            {interestStatus === "pending" && (
                              <span className="px-3.5 py-2.5 border border-amber-500/20 bg-amber-50/5 text-amber-600 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default">
                                Pending Handshake
                              </span>
                            )}
                            {interestStatus === "accepted" && (
                              <span className="px-3.5 py-2.5 bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default">
                                Connected
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[9.5px] font-mono text-slate-400 font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 px-3 py-2 rounded-[2px]">
                            Interest locked (Applied)
                          </span>
                        )
                      )}
                    </div>
                  </DialogFooter>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* Express Interest Modal (For Approved Users) */}
      <Dialog open={interestOpen} onOpenChange={setInterestOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans">
          {selectedDetailOpp && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                  Request Introducing Context
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 leading-relaxed font-sans">
                  Contact details will be unlocked once <span className="text-slate-950 font-bold">{selectedDetailOpp.company || selectedDetailOpp.business?.company_name || "Confidential"}</span> accepts your handshake. Add a short context note on why this is a strategic fit.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold border-b border-slate-100 pb-1">
                  <span>Selected Listing</span>
                  <span>#{selectedDetailOpp.opportunity_number || selectedDetailOpp.id.substring(0, 8)}</span>
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
                    Strategic Context Pitch (20+ chars)
                  </label>
                  <textarea
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder="e.g., We have organic distribution channels in India matching your apparel requirements..."
                    className="w-full h-32 px-3.5 py-2.5 border border-slate-200 focus:border-slate-800 focus:ring-0 font-mono text-xs rounded-[2px] transition-all bg-slate-50/20 outline-none resize-none"
                    maxLength={300}
                  />
                  <div className="flex flex-wrap justify-between items-center font-mono text-[9px] text-slate-400 font-medium gap-1">
                    <span>{pitch.trim().length} / 300 characters</span>
                    <span>Min 20 characters</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setInterestOpen(false);
                    setPitch("");
                    setDetailOpen(true);
                  }}
                  className="py-2.5 px-4 border border-slate-200 hover:border-slate-800 text-slate-700 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExpressInterest}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold"
                >
                  Submit Handshake
                </button>
              </DialogFooter>
            </>
          )}
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
        backButtonText="Back to My Opportunities"
      />
    </div>
  );
}
