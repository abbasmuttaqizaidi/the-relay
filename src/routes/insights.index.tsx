import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  Lightbulb,
  Share2,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ArrowLeftRight,
  ThumbsUp,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Pin,
  TrendingUp,
  Lock,
  Scale,
  FileText,
  Check,
  Zap,
  Award,
  Gavel,
  Timer,
  User,
  Shield,
  Eye,
  BookOpen,
  ChevronDown,
  SlidersHorizontal,
  Filter,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  SearchInput,
  Button as DSButton,
  Select as DSSelect,
  SelectTrigger as DSSelectTrigger,
  SelectContent as DSSelectContent,
  SelectItem as DSSelectItem,
  SelectValue as DSSelectValue,
} from "@/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getQuestions } from "../functions/getQuestions";
import { getKnowledgeInsights } from "../functions/getKnowledgeInsights";
import { getAdminInsights } from "../functions/getAdminInsights";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { getCommunityProfile } from "../functions/communityProfile";
import { AskQuestionDialog } from "../components/insights/AskQuestionDialog";
import { ShareInsightDialog } from "../components/insights/ShareInsightDialog";
import { ShareModal } from "../components/insights/ShareModal";
import { AdminCreateQuestionDialog } from "../components/admin/AdminCreateQuestionDialog";
import { AdminCreateKnowledgeDialog } from "../components/admin/AdminCreateKnowledgeDialog";
import {
  AdminIncreaseViewsDialog,
  AdminIncreaseViewsTarget,
} from "../components/admin/AdminIncreaseViewsDialog";
import { CompanyLogo } from "../components/company-logo";
import { InsightsPublicAuthPromptModal } from "../components/insights/InsightsPublicAuthPromptModal";
import { CommunityContributorAuthModal } from "../components/insights/CommunityContributorAuthModal";
import { cn, getCompanyInitials } from "@/lib/utils";
import { createSeoMeta } from "@/lib/seo";
import {
  hasGlobalAuthPromptBeenShown,
  markGlobalAuthPromptShown,
  shouldSkipAuthPrompt,
  isUserLikelyAuthenticated,
} from "@/lib/discussion-session";
import {
  Question,
  KnowledgeInsight,
  Business,
} from "../types";

const insightsSearchSchema = z.object({
  tab: fallback(z.enum(["questions", "knowledge"]), "questions").default("questions"),
  filter: z.string().optional(),
});

export const Route = createFileRoute("/insights/")({
  validateSearch: zodValidator(insightsSearchSchema),
  head: () => ({
    meta: createSeoMeta({
      title: "Questions & Peer Advisory — The Relay",
      description:
        "Real-time commercial deal structuring and bilateral guidance from verified enterprise operators.",
      canonicalPath: "/insights",
    }),
  }),
  component: InsightsIndexPage,
});

const TOPIC_OPTIONS = [
  { value: "All", label: "Topic: All (11 Categories)" },
  { value: "Partnerships", label: "Partnerships & Alliances" },
  { value: "Sales", label: "Sales & Pipeline" },
  { value: "Operations", label: "Operations & Logistics" },
  { value: "Finance", label: "Finance & Unit Economics" },
  { value: "Technology", label: "Technology & Infrastructure" },
  { value: "Product", label: "Product Strategy" },
  { value: "Marketing", label: "Marketing & Growth" },
  { value: "Hiring", label: "Hiring & Talent" },
  { value: "Legal", label: "Legal & Compliance" },
  { value: "Building a System / Business", label: "Building a System / Business" },
  { value: "Other", label: "Other" },
];

const CATEGORY_PILLS = [
  { label: "All Topics", value: "All" },
  { label: "Hiring & Talent", value: "Hiring" },
  { label: "Distribution & Channel", value: "Partnerships" },
  { label: "Sales & Pipeline", value: "Sales" },
  { label: "Operations & Logistics", value: "Operations" },
  { label: "Rev-Share & Finance", value: "Finance" },
  { label: "Compute & Tech", value: "Technology" },
  { label: "Product Strategy", value: "Product" },
  { label: "Marketing & Growth", value: "Marketing" },
  { label: "Compliance & Legal", value: "Legal" },
  { label: "Deal Structuring & Barter", value: "Building a System / Business" },
];

const TRENDING_TOPICS = [
  { tag: "#RevShareTiers", label: "RevShare Tiers", count: 48, change: "+42%", topic: "Finance" },
  { tag: "#ComputeBarter", label: "Compute Barter", count: 33, change: "+28%", topic: "Technology" },
  { tag: "#JointBidEscrow", label: "Joint Bid Escrow", count: 26, change: "+19%", topic: "Partnerships" },
  { tag: "#DACHCoSelling", label: "DACH Co-Selling", count: 21, change: "+15%", topic: "Sales" },
];

const TOP_CONTRIBUTING_OPERATORS = [
  { initials: "NT", name: "Nordic Tech Bank", role: "42 Accepted Answers", parity: "99% Parity" },
  { initials: "AL", name: "Apex Logistics Group", role: "36 Accepted Answers", parity: "98% Parity" },
  { initials: "SY", name: "Synapse Corp Advisory", role: "29 Accepted Answers", parity: "96% Parity" },
];

const TRENDING_CATEGORIES = [
  { name: "Partnerships & Alliances", filterValue: "Partnerships" },
  { name: "Sales & Pipeline", filterValue: "Sales" },
  { name: "Finance & Unit Economics", filterValue: "Finance" },
  { name: "Tech & Infrastructure", filterValue: "Technology" },
  { name: "Operations & Logistics", filterValue: "Operations" },
];

const BASED_ON_LABELS: Record<string, string> = {
  business_experience: "Our business experience",
  project: "A project we worked on",
  experiment: "An experiment or test",
  industry_experience: "Industry experience",
  lesson_learned: "A mistake or lesson learned",
  general_perspective: "General perspective",
};

function formatTimeAgo(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

function calculateReadingTime(text?: string): string {
  if (!text) return "3 min read";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export function formatCompactNumber(num: number = 0): string {
  if (!num) return "0";
  if (num < 1000) return num.toString();
  if (num < 1000000) {
    const val = num / 1000;
    return `${parseFloat(val.toFixed(1))}k`;
  }
  const val = num / 1000000;
  return `${parseFloat(val.toFixed(1))}m`;
}

export function formatPublishedDate(dateStr?: string | Date | null): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[d.getMonth()] || "Sept";
    const year = d.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  } catch {
    return "";
  }
}

const getAdminToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/relay_admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const ITEMS_PER_PAGE = 6;

export function InsightsIndexPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

  // Admin session state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState<any[]>([]);
  const [adminCreateQuestionOpen, setAdminCreateQuestionOpen] = useState(false);
  const [adminCreateKnowledgeOpen, setAdminCreateKnowledgeOpen] = useState(false);
  const [increaseViewsTarget, setIncreaseViewsTarget] = useState<AdminIncreaseViewsTarget | null>(null);

  // Tab state: "questions" or "knowledge"
  const [activeTab, setActiveTab] = useState<"questions" | "knowledge">(
    searchParams.tab || "questions",
  );

  // Public user discussion authentication prompt modal state
  const [publicAuthPromptOpen, setPublicAuthPromptOpen] = useState(false);
  const [contributorModalOpen, setContributorModalOpen] = useState(false);

  // Automatically prompt public users once per session to sign in so they can comment
  useEffect(() => {
    // Edge case guard: Wait until Clerk is fully loaded to avoid false prompt for logged-in users
    if (!isLoaded || isSignedIn) return;
    if (shouldSkipAuthPrompt({ isSignedIn })) return;

    const timer = setTimeout(() => {
      if (!isSignedIn && !shouldSkipAuthPrompt({ isSignedIn })) {
        setPublicAuthPromptOpen(true);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn]);

  // Guard: If authenticated, immediately close any auth prompt modal
  useEffect(() => {
    if (isSignedIn) {
      setPublicAuthPromptOpen(false);
      setContributorModalOpen(false);
    }
  }, [isSignedIn]);

  // Check if user returned from Google/Phone login initiated from the public prompt modal
  useEffect(() => {
    if (isLoaded && isSignedIn && typeof window !== "undefined") {
      const pendingContributor = sessionStorage.getItem("relay_pending_contributor_onboarding");
      if (pendingContributor) {
        sessionStorage.removeItem("relay_pending_contributor_onboarding");
        sessionStorage.removeItem("relay_auth_return_url");
        markGlobalAuthPromptShown();

        getCommunityProfile()
          .then((profile) => {
            if (profile?.name || profile?.handle) {
              toast.success(`Welcome back, ${profile.name}! You are ready to join discussions.`);
            } else {
              toast.success("Signed in successfully! You are ready to join discussions.");
            }
          })
          .catch(() => {
            toast.success("Signed in successfully!");
          });
      }
    }
  }, [isLoaded, isSignedIn]);

  const queryClient = useQueryClient();

  // Filters state
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<"newest" | "perspectives">("newest");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");
  const [filterOnlyVerified, setFilterOnlyVerified] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<"all" | "my" | "saved">(() => {
    const f = searchParams.filter;
    if (f === "my" || f === "saved") return f;
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mobile Bottom Sheet state for Filters (Status, Sort, Verified)
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState<"all" | "open" | "closed">(statusFilter);
  const [draftSort, setDraftSort] = useState<"newest" | "perspectives">(selectedSort);
  const [draftVerified, setDraftVerified] = useState<boolean>(filterOnlyVerified);

  // Mobile Inline Expandable Search state
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when search expands on mobile
  useEffect(() => {
    if (mobileSearchExpanded) {
      const timer = setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mobileSearchExpanded]);

  // Click outside to restore / collapse mobile search
  useEffect(() => {
    if (!mobileSearchExpanded) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        mobileSearchContainerRef.current &&
        !mobileSearchContainerRef.current.contains(e.target as Node)
      ) {
        setMobileSearchExpanded(false);
        setSearchQuery(appliedSearch);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [mobileSearchExpanded, appliedSearch]);

  // Sync draft states whenever sheet opens
  useEffect(() => {
    if (filtersSheetOpen) {
      setDraftStatus(statusFilter);
      setDraftSort(selectedSort);
      setDraftVerified(filterOnlyVerified);
    }
  }, [filtersSheetOpen, statusFilter, selectedSort, filterOnlyVerified]);

  const handleApplyMobileFilters = () => {
    setStatusFilter(draftStatus);
    setSelectedSort(draftSort);
    setFilterOnlyVerified(draftVerified);
    setCurrentPage(1);
    setFiltersSheetOpen(false);
  };

  const handleResetDraftFilters = () => {
    setDraftStatus("all");
    setDraftSort("newest");
    setDraftVerified(false);
  };

  // Peer Advisory Protocol & Sidebar Collapsible states
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const [isTopOperatorsOpen, setIsTopOperatorsOpen] = useState(false);

  // Active filter count for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all" && activeTab === "questions") count++;
    if (selectedSort !== "newest") count++;
    if (filterOnlyVerified) count++;
    return count;
  }, [statusFilter, selectedSort, filterOnlyVerified, activeTab]);

  // Onboarding Status Query
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      return await checkOnboardingStatus();
    },
    enabled: !!isSignedIn,
    staleTime: 1000 * 60 * 3,
  });
  const currentUserBusiness = (onboardingData?.business as Business) || null;

  // Global counts & collections for stats calculation
  const { data: allQuestionsForStats = [] } = useQuery<Question[]>({
    queryKey: ["all-questions-stats"],
    queryFn: async () => {
      const data = await getQuestions({ data: {} });
      return (data as Question[]) || [];
    },
    staleTime: 1000 * 60 * 2,
  });

  const { data: allKnowledgeForStats = [] } = useQuery<KnowledgeInsight[]>({
    queryKey: ["all-knowledge-stats"],
    queryFn: async () => {
      const data = await getKnowledgeInsights({ data: { limit: 200 } });
      return (data as KnowledgeInsight[]) || [];
    },
    staleTime: 1000 * 60 * 2,
  });

  const totalQuestionsCount = allQuestionsForStats.length;
  const totalKnowledgeCount = allKnowledgeForStats.length;

  // Filtered Questions Query
  const {
    data: questions = [],
    isLoading: questionsLoading,
  } = useQuery<Question[]>({
    queryKey: ["questions-list", selectedTopic, appliedSearch, selectedSort],
    queryFn: async () => {
      const filterData: any = {};
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (appliedSearch && appliedSearch.trim()) {
        filterData.search = appliedSearch.trim();
      }
      if (selectedSort) {
        filterData.sortBy = selectedSort;
      }
      const data = await getQuestions({ data: filterData });
      return (data as Question[]) || [];
    },
    staleTime: 1000 * 60 * 2,
  });

  // Filtered Knowledge Insights Query
  const {
    data: knowledgeList = [],
    isLoading: knowledgeLoading,
  } = useQuery<KnowledgeInsight[]>({
    queryKey: ["knowledge-list", selectedTopic, appliedSearch, selectedSort],
    queryFn: async () => {
      const filterData: any = { limit: 100 };
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (appliedSearch && appliedSearch.trim()) {
        filterData.search = appliedSearch.trim();
      }
      if (selectedSort) {
        filterData.sortBy = selectedSort;
      }
      const data = await getKnowledgeInsights({ data: filterData });
      return (data as KnowledgeInsight[]) || [];
    },
    staleTime: 1000 * 60 * 2,
  });

  const loading = activeTab === "questions" ? questionsLoading : knowledgeLoading;

  // Bookmarking state (stored in localStorage)
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("relay_saved_insights");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Upvoting state (stored in localStorage)
  const [upvotedQuestionIds, setUpvotedQuestionIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("relay_upvoted_questions");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Dialog states
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [shareInsightModalOpen, setShareInsightModalOpen] = useState(false);
  const [shareItem, setShareItem] = useState<{
    title: string;
    topic?: string;
    authorName?: string;
    urlPath: string;
    type: "insight" | "question";
  } | null>(null);

  // Check admin session on mount
  useEffect(() => {
    const token = getAdminToken();
    if (token) {
      getAdminInsights()
        .then((res) => {
          setIsAdmin(true);
          if (res?.businesses) {
            setAdminBusinesses(res.businesses);
          }
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, []);

  // Sync activeTab from URL search params
  useEffect(() => {
    if (searchParams.tab && searchParams.tab !== activeTab) {
      setActiveTab(searchParams.tab);
      setCurrentPage(1);
    }
  }, [searchParams.tab]);

  // Sync filterMode from URL search params
  useEffect(() => {
    const f = searchParams.filter;
    if (f === "my" || f === "saved") {
      setFilterMode(f);
      setCurrentPage(1);
    } else if (!f && filterMode !== "all") {
      setFilterMode("all");
      setCurrentPage(1);
    }
  }, [searchParams.filter]);

  // Tab switcher helper
  const handleTabChange = (newTab: "questions" | "knowledge") => {
    setActiveTab(newTab);
    setCurrentPage(1);
    setFilterMode("all");
    setSelectedTopic("All");
    setSearchQuery("");
    setAppliedSearch("");
    navigate({
      to: "/insights",
      search: { tab: newTab },
      replace: true,
    });
  };

  // Trigger search handler: updates appliedSearch (triggering API call) and collapses mobile search view
  const handleTriggerSearch = (overrideQuery?: string) => {
    const q = (overrideQuery !== undefined ? overrideQuery : searchQuery).trim();
    setAppliedSearch(q);
    setSearchQuery(q);
    setCurrentPage(1);
    setMobileSearchExpanded(false);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mobileSearchInputRef.current?.blur();
    handleTriggerSearch();
  };

  // Toggle bookmark / save
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info("Removed from saved items");
      } else {
        next.add(id);
        toast.success("Saved to your bookmarks");
      }
      try {
        localStorage.setItem("relay_saved_insights", JSON.stringify([...next]));
        window.dispatchEvent(new Event("relay:saved_insights"));
      } catch (_) {}
      return next;
    });
  };

  // Toggle upvote
  const toggleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUpvotedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        toast.success("Perspective upvoted");
      }
      try {
        localStorage.setItem("relay_upvoted_questions", JSON.stringify([...next]));
      } catch (_) {}
      return next;
    });
  };

  // Handle "+ Ask Question" click
  const handleAskClick = () => {
    if (isAdmin) {
      setAdminCreateQuestionOpen(true);
      return;
    }

    if (!isSignedIn) {
      toast.info("Please sign in to ask a question.");
      navigate({ to: "/login" });
      return;
    }

    if (!currentUserBusiness) {
      toast.info("Please register your business profile before asking questions.");
      navigate({ to: "/onboarding" });
      return;
    }

    if (currentUserBusiness.status !== "approved") {
      toast.error(
        `Your business profile is currently "${currentUserBusiness.status}". Only approved businesses can ask questions on The Relay.`,
      );
      return;
    }

    navigate({ to: "/insights/ask" });
  };

  // Handle "+ Share Knowledge" click
  const handleShareKnowledgeClick = () => {
    if (isAdmin) {
      setAdminCreateKnowledgeOpen(true);
      return;
    }

    if (!isSignedIn) {
      toast.info("Please sign in to share knowledge.");
      navigate({ to: "/login" });
      return;
    }

    if (!currentUserBusiness) {
      toast.info("Please register your business profile first.");
      navigate({ to: "/onboarding" });
      return;
    }

    if (currentUserBusiness.status !== "approved") {
      toast.error(
        "Your business is awaiting approval. You can read Insights, but publishing is available to approved businesses.",
      );
      return;
    }

    navigate({ to: "/insights/knowledge/new" });
  };

  const isApprovedBusiness = currentUserBusiness?.status === "approved";

  // Category counts calculated dynamically from live database items based on activeTab
  const categoryCounts = useMemo(() => {
    const list = activeTab === "questions" ? allQuestionsForStats : allKnowledgeForStats;
    const map: Record<string, number> = { All: list.length };
    for (const item of list) {
      const t = item.topic || "Other";
      map[t] = (map[t] || 0) + 1;
    }
    return map;
  }, [activeTab, allQuestionsForStats, allKnowledgeForStats]);

  const getPillCount = (val: string) => {
    if (val === "All") {
      return activeTab === "questions" ? allQuestionsForStats.length : allKnowledgeForStats.length;
    }
    return categoryCounts[val] || 0;
  };

  // User-specific stats for questions
  const myQuestionsCount = useMemo(() => {
    if (!currentUserBusiness) return 0;
    return allQuestionsForStats.filter((q) => q.business_id === currentUserBusiness.id).length;
  }, [allQuestionsForStats, currentUserBusiness]);

  const savedQuestionsCount = useMemo(() => {
    return allQuestionsForStats.filter((q) => savedItemIds.has(q.id)).length;
  }, [allQuestionsForStats, savedItemIds]);

  // User-specific stats for knowledge articles
  const myKnowledgeCount = useMemo(() => {
    if (!currentUserBusiness) return 0;
    return allKnowledgeForStats.filter((k) => k.business_id === currentUserBusiness.id).length;
  }, [allKnowledgeForStats, currentUserBusiness]);

  const savedKnowledgeCount = useMemo(() => {
    return allKnowledgeForStats.filter((k) => savedItemIds.has(k.id)).length;
  }, [allKnowledgeForStats, savedItemIds]);

  // Filtered Questions with Mode & Status
  const filteredQuestions = useMemo(() => {
    let list = [...questions];

    if (filterMode === "my" && currentUserBusiness) {
      list = list.filter((q) => q.business_id === currentUserBusiness.id);
    } else if (filterMode === "saved") {
      list = list.filter((q) => savedItemIds.has(q.id));
    }

    if (statusFilter !== "all") {
      list = list.filter((q) => q.status === statusFilter);
    }

    if (filterOnlyVerified) {
      list = list.filter((q) => q.business?.status === "approved");
    }

    return list;
  }, [questions, filterMode, currentUserBusiness, savedItemIds, statusFilter, filterOnlyVerified]);

  // Filtered Knowledge Insights with Mode, Verified, and Sort
  const filteredKnowledge = useMemo(() => {
    let list = [...knowledgeList];

    if (filterMode === "my" && currentUserBusiness) {
      list = list.filter((k) => k.business_id === currentUserBusiness.id);
    } else if (filterMode === "saved") {
      list = list.filter((k) => savedItemIds.has(k.id));
    }

    if (filterOnlyVerified) {
      list = list.filter((k) => k.business?.status === "approved");
    }

    // Apply sorting
    if (selectedSort === "perspectives") {
      // Sort by views descending
      list.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    } else {
      // Default: Most Recent
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return list;
  }, [knowledgeList, filterMode, currentUserBusiness, savedItemIds, filterOnlyVerified, selectedSort]);

  // Filtered and paginated list calculation
  const currentList = activeTab === "questions" ? filteredQuestions : filteredKnowledge;
  const totalCount = currentList.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentList.slice(start, start + ITEMS_PER_PAGE);
  }, [currentList, currentPage]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]/50 text-[#0b1c30] antialiased selection:bg-[#9d4300] selection:text-white pb-24 overflow-x-hidden w-full max-w-full">
      <main className="w-full pt-6">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 space-y-6">

          {/* ═══════════════════════════════════════════════════════════════
              1. HEADER & HERO
              ═══════════════════════════════════════════════════════════════ */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2.5 sm:gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#64748B] text-xs uppercase tracking-widest font-bold">
                  <span>INSIGHTS</span>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="text-[#0F172A]">
                    {activeTab === "questions" ? "PEER ADVISORY" : "KNOWLEDGE REPOSITORY"}
                  </span>
                  {isAdmin && (
                    <>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/10 text-orange-700 border border-orange-300/60">
                        Admin Mode Active
                      </span>
                    </>
                  )}
                </div>
                <h1 className="font-display text-2xl lg:text-[28px] text-[#0F172A] tracking-tight font-extrabold">
                  {activeTab === "questions" ? "Questions & Peer Advisory" : "Knowledge & Field Cases"}
                </h1>
                <p className="text-sm text-[#64748B] max-w-3xl leading-relaxed">
                  {activeTab === "questions"
                    ? "Real-time commercial deal structuring, and bilateral guidance from verified enterprise operators."
                    : "In-depth case studies, structural playbooks, and operating frameworks contributed by verified operators."}
                </p>
              </div>

              {/* Action Group: Wrapped div moved up */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col items-end -mt-3 sm:-mt-4 lg:-mt-3.5">
                {activeTab === "questions" ? (
                  <div className="w-full sm:w-auto flex flex-col items-end">
                    {/* Curved Arrow Callout appearing from the upper side in orange theme with 'or' at top-right */}
                    <button
                      type="button"
                      id="btn-switch-to-knowledge"
                      onClick={() => handleTabChange("knowledge")}
                      className="group inline-flex items-center gap-1 cursor-pointer mb-1.5 pr-2 transition-all select-none self-end active:scale-95"
                      title="Switch to Knowledge"
                    >
                      <span
                        style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                        className="text-base sm:text-lg font-bold italic text-[#EA580C] group-hover:text-[#C2410C] transition-colors whitespace-nowrap tracking-wide leading-none"
                      >
                        Share knowledge
                      </span>
                      <div className="relative inline-flex items-center shrink-0">
                        <svg
                          className="w-6 h-3.5 text-[#EA580C] group-hover:text-[#C2410C] transition-all shrink-0 group-hover:-translate-y-0.5"
                          viewBox="0 0 32 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M 26 23 C 26 11, 16 6, 6 6" />
                          <path d="M 11 2 L 5 6 L 11 10" />
                        </svg>
                        <span
                          style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                          className="absolute -top-2 -right-0.5 text-sm sm:text-base font-bold italic text-[#EA580C] group-hover:text-[#C2410C] transition-colors leading-none select-none pointer-events-none"
                        >
                          or
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      id="btn-ask-question"
                      onClick={handleAskClick}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-md bg-[#0F172A] text-white text-xs border border-[#0F172A] hover:bg-[#1E293B] transition-all flex items-center justify-center gap-1.5 shadow-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5 shrink-0" />
                      <span>Ask Question</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full sm:w-auto flex flex-col items-end">
                    {/* Curved Arrow Callout appearing from the upper side in orange theme with 'or' at top-right */}
                    <button
                      type="button"
                      id="btn-switch-to-questions"
                      onClick={() => handleTabChange("questions")}
                      className="group inline-flex items-center gap-1 cursor-pointer mb-1.5 pr-2 transition-all select-none self-end active:scale-95"
                      title="Switch to Questions"
                    >
                      <span
                        style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                        className="text-base sm:text-lg font-bold italic text-[#EA580C] group-hover:text-[#C2410C] transition-colors whitespace-nowrap tracking-wide leading-none"
                      >
                        Ask question
                      </span>
                      <div className="relative inline-flex items-center shrink-0">
                        <svg
                          className="w-6 h-3.5 text-[#EA580C] group-hover:text-[#C2410C] transition-all shrink-0 group-hover:-translate-y-0.5"
                          viewBox="0 0 32 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M 26 23 C 26 11, 16 6, 6 6" />
                          <path d="M 11 2 L 5 6 L 11 10" />
                        </svg>
                        <span
                          style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                          className="absolute -top-2 -right-0.5 text-sm sm:text-base font-bold italic text-[#EA580C] group-hover:text-[#C2410C] transition-colors leading-none select-none pointer-events-none"
                        >
                          or
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      id="btn-share-knowledge"
                      onClick={handleShareKnowledgeClick}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-md bg-[#0F172A] text-white text-xs border border-[#0F172A] hover:bg-[#1E293B] transition-all flex items-center justify-center gap-1.5 shadow-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>Share Knowledge</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Controls Row: Topics Dropdown + Magnifying Glass + Filters / Expandable Search */}
            <div ref={mobileSearchContainerRef} className="relative flex sm:hidden items-center pt-4 mt-4 border-t border-[#E2E8F0]/80 min-h-[53px]">
              {/* Default Row: Topics Dropdown + Magnifying Glass + Filter + Reset */}
              <div
                className={cn(
                  "flex items-center gap-2 w-full transition-all duration-300 ease-in-out",
                  mobileSearchExpanded
                    ? "opacity-0 scale-95 pointer-events-none invisible"
                    : "opacity-100 scale-100 pointer-events-auto visible"
                )}
              >
                <div className="relative flex-1 min-w-0">
                  <DSSelect
                    value={selectedTopic}
                    onValueChange={(val) => {
                      setSelectedTopic(val);
                      setCurrentPage(1);
                    }}
                  >
                    <DSSelectTrigger className="h-9 text-xs rounded-md bg-[#F8FAFC] border-[#E2E8F0] font-semibold text-[#0F172A]">
                      <DSSelectValue placeholder="All Topics" />
                    </DSSelectTrigger>
                    <DSSelectContent className="max-h-72">
                      {CATEGORY_PILLS.map((pill) => (
                        <DSSelectItem key={pill.value} value={pill.value} className="text-xs">
                          {pill.label}
                        </DSSelectItem>
                      ))}
                    </DSSelectContent>
                  </DSSelect>
                </div>

                {/* Magnifying Glass Search Icon Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery(appliedSearch);
                    setMobileSearchExpanded(true);
                  }}
                  aria-label="Open Search"
                  title="Search"
                  className={cn(
                    "w-9 h-9 flex items-center justify-center border rounded-md transition-colors shrink-0 cursor-pointer shadow-2xs relative",
                    appliedSearch
                      ? "bg-[#0F172A] text-white border-[#0F172A]"
                      : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-slate-100 hover:text-[#0F172A]"
                  )}
                >
                  <Search className="w-4 h-4" />
                  {appliedSearch && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                  )}
                </button>

                {/* Filters Icon Button */}
                <button
                  type="button"
                  onClick={() => setFiltersSheetOpen(true)}
                  aria-label="Open Filters"
                  title="Filters"
                  className={cn(
                    "w-9 h-9 flex items-center justify-center border rounded-md transition-colors shrink-0 cursor-pointer shadow-2xs relative",
                    activeFilterCount > 0
                      ? "bg-[#0F172A] text-white border-[#0F172A]"
                      : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-slate-100 hover:text-[#0F172A]"
                  )}
                >
                  <Filter className="w-4 h-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {(selectedTopic !== "All" || selectedSort !== "newest" || appliedSearch || searchQuery || filterMode !== "all" || statusFilter !== "all" || filterOnlyVerified) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic("All");
                      setSelectedSort("newest");
                      setStatusFilter("all");
                      setFilterOnlyVerified(false);
                      setFilterMode("all");
                      setSearchQuery("");
                      setAppliedSearch("");
                      setCurrentPage(1);
                    }}
                    className="text-xs text-[#575f6e] hover:text-[#0b1c30] underline px-1 shrink-0 cursor-pointer font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Animated Expandable Search Bar: Expands Left & Right to Cover the Entire Row */}
              <form
                onSubmit={handleSearchSubmit}
                className={cn(
                  "absolute inset-x-0 bottom-0 top-4 flex items-center gap-2 transition-all duration-300 ease-out z-10",
                  mobileSearchExpanded
                    ? "opacity-100 scale-x-100 pointer-events-auto"
                    : "opacity-0 scale-x-0 pointer-events-none origin-center"
                )}
              >
                <div className="relative flex-1 flex items-center bg-[#F8FAFC] border border-[#0F172A] rounded-md h-9 px-2.5 shadow-2xs transition-all">
                  <Search className="w-4 h-4 text-[#0F172A] shrink-0 mr-2" />
                  <input
                    ref={mobileSearchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder={
                      activeTab === "questions"
                        ? "Search questions by topic, keyword..."
                        : "Search practical insight articles..."
                    }
                    className="w-full h-full bg-transparent text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none font-medium"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchQuery(appliedSearch);
                        setMobileSearchExpanded(false);
                      }
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        mobileSearchInputRef.current?.focus();
                      }}
                      aria-label="Clear search text"
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  aria-label="Search"
                  title="Search"
                  className="h-9 px-3 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Active Search Query display below row (Mobile) */}
            {appliedSearch && (
              <div className="flex sm:hidden items-center gap-1.5 pt-2 text-xs">
                <span className="text-black font-semibold">Results:</span>
                <span className="text-slate-500 font-medium">{appliedSearch}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setAppliedSearch("");
                    setCurrentPage(1);
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                  className="inline-flex items-center justify-center p-0.5 ml-0.5 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Desktop Controls (hidden on mobile, visible on sm and up) */}
            <div className="hidden sm:flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#E2E8F0]/80">
              {/* Search Input Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex-1 flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
                  <input
                    type="text"
                    placeholder={
                      activeTab === "questions"
                        ? "Search questions by operational topic, deal structure, or keywords..."
                        : "Search knowledge articles, case studies, or frameworks..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#0F172A] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        if (appliedSearch) {
                          setAppliedSearch("");
                          setCurrentPage(1);
                        }
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-10 px-3.5 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </form>

              {/* Desktop Secondary Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Topics Dropdown (Design System) */}
                <div className="w-52">
                  <DSSelect
                    value={selectedTopic}
                    onValueChange={(val) => {
                      setSelectedTopic(val);
                      setCurrentPage(1);
                    }}
                  >
                    <DSSelectTrigger className="h-10 text-xs rounded-md bg-[#F8FAFC] border-[#E2E8F0] font-semibold text-[#0F172A] hover:bg-slate-50">
                      <DSSelectValue placeholder="All Topics" />
                    </DSSelectTrigger>
                    <DSSelectContent className="max-h-72">
                      {CATEGORY_PILLS.map((pill) => (
                        <DSSelectItem key={pill.value} value={pill.value} className="text-xs">
                          {pill.label}
                        </DSSelectItem>
                      ))}
                    </DSSelectContent>
                  </DSSelect>
                </div>

                {activeTab === "questions" && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#475569] text-xs">
                    <span className="text-[#64748B] font-medium">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value as any);
                        setCurrentPage(1);
                      }}
                      className="bg-transparent text-[#0F172A] focus:outline-none cursor-pointer font-semibold text-xs border-none p-0 pr-1"
                    >
                      <option value="all">All Statuses</option>
                      <option value="open">Open for Perspectives</option>
                      <option value="closed">Consensus Reached</option>
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#475569] text-xs">
                  <span className="text-[#64748B] font-medium">Sort:</span>
                  <select
                    value={selectedSort}
                    onChange={(e) => {
                      setSelectedSort(e.target.value as any);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent text-[#0F172A] focus:outline-none cursor-pointer font-semibold text-xs border-none p-0 pr-1"
                  >
                    <option value="newest">Most Recent</option>
                    <option value="perspectives">
                      {activeTab === "questions" ? "Highest Engagement" : "Most Viewed"}
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#475569] text-xs">
                  <span className="text-[#64748B] font-medium">Filter:</span>
                  <select
                    value={filterOnlyVerified ? "verified" : "all"}
                    onChange={(e) => {
                      setFilterOnlyVerified(e.target.value === "verified");
                      setCurrentPage(1);
                    }}
                    className="bg-transparent text-[#0F172A] focus:outline-none cursor-pointer font-semibold text-xs border-none p-0 pr-1"
                  >
                    <option value="all">
                      {activeTab === "questions" ? "All Operator Answers" : "All Authors"}
                    </option>
                    <option value="verified">
                      {activeTab === "questions" ? "Verified Answers Only" : "Verified Businesses Only"}
                    </option>
                  </select>
                </div>

                {(selectedTopic !== "All" || selectedSort !== "newest" || appliedSearch || searchQuery || filterMode !== "all" || statusFilter !== "all" || filterOnlyVerified) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic("All");
                      setSelectedSort("newest");
                      setStatusFilter("all");
                      setFilterOnlyVerified(false);
                      setFilterMode("all");
                      setSearchQuery("");
                      setAppliedSearch("");
                      setCurrentPage(1);
                    }}
                    className="text-xs text-[#575f6e] hover:text-[#0b1c30] underline px-2 shrink-0 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Active Search Query display below row (Desktop) */}
            {appliedSearch && (
              <div className="hidden sm:flex items-center gap-1.5 pt-2 text-xs">
                <span className="text-black font-semibold">Results:</span>
                <span className="text-slate-500 font-medium">{appliedSearch}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setAppliedSearch("");
                    setCurrentPage(1);
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                  className="inline-flex items-center justify-center p-0.5 ml-0.5 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              3. TWO-COLUMN OPERATIONAL LAYOUT (8-COL FEED + 4-COL SIDEBAR)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Feed Column (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {activeTab === "knowledge" && filterMode !== "all" && (
                <div className="flex items-center justify-between bg-white border border-[#E2E8F0] px-4 py-3 rounded-xl text-xs shadow-2xs">
                  <div className="flex items-center gap-2">
                    {filterMode === "my" ? (
                      <User className="w-4 h-4 text-slate-700 shrink-0" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-700 shrink-0" />
                    )}
                    <span className="text-slate-600 font-medium">
                      Filtered by:{" "}
                      <span className="text-slate-900 font-bold">
                        {filterMode === "my" ? "My Articles" : "Saved Articles"}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                      {totalCount} {totalCount === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterMode("all");
                      navigate({
                        to: "/insights",
                        search: { tab: "knowledge" } as any,
                      });
                    }}
                    className="text-xs text-slate-600 hover:text-slate-950 font-semibold underline cursor-pointer"
                  >
                    Show All Articles
                  </button>
                </div>
              )}

              {loading ? (
                /* Skeleton Loader */
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#e2e8f0] rounded-xl p-5 md:p-6 animate-pulse space-y-3"
                    >
                      <div className="h-4 bg-[#f1f5f9] rounded w-28" />
                      <div className="h-6 bg-[#f1f5f9] rounded w-3/4" />
                      <div className="h-4 bg-[#f1f5f9] rounded w-full" />
                      <div className="h-4 bg-[#f1f5f9] rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : activeTab === "questions" ? (
                /* ═══════════════════════════════════════════════════════════
                    QUESTIONS FEED (WITH PINNED CASE & CARDS)
                    ═══════════════════════════════════════════════════════════ */
                paginatedItems.length === 0 ? (
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#575f6e] mx-auto mb-4">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c30] mb-1">
                      {appliedSearch || selectedTopic !== "All" || filterMode !== "all"
                        ? "No questions match your current filters"
                        : "No peer questions shared yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {appliedSearch || selectedTopic !== "All" || filterMode !== "all"
                        ? "Try clearing your search query or selecting 'All Topics' to see more."
                        : "Verified operators ask specific, tactical questions to resolve growth bottlenecks."}
                    </p>
                    <Button
                      type="button"
                      onClick={handleAskClick}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Ask First Question
                    </Button>
                  </div>
                ) : (
                  (paginatedItems as Question[]).map((q) => {
                    const perspectiveCount = q._count?.perspectives ?? 0;
                    const isClosed = q.status === "closed";
                    const isSaved = savedItemIds.has(q.id);
                    const isUpvoted = upvotedQuestionIds.has(q.id);
                    const baseUpvotes = Math.max(1, (q.title.length % 15) + perspectiveCount * 3);

                    return (
                      <article
                        key={q.id}
                        className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-3.5 group"
                      >
                        {/* 1. First Row: Logo, Business Name, Verified Seal, and Topic / Status Badges */}
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <CompanyLogo
                              src={q.business?.logo_url}
                              name={q.business?.company_name}
                              className="w-5 h-5 rounded object-contain border border-[#e2e8f0] shrink-0"
                              fallbackClassName="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0"
                              textClassName="text-[9px] font-mono font-bold"
                            />
                            <span className="font-semibold text-xs text-[#0b1c30] truncate">
                              {q.business?.company_name || "Verified Business"}
                            </span>
                            <span title="Verified Enterprise" className="hidden sm:inline-block">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isClosed && (
                              <span className="font-semibold text-[10px] text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded uppercase tracking-wider">
                                Closed
                              </span>
                            )}
                            {q.topic && (
                              <span className="font-semibold text-[10px] text-[#0b1c30] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
                                {q.topic}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 2. Second Line: Asked and formatted date */}
                        <div className="text-[11px] text-[#64748B] -mt-1 font-sans">
                          Asked {formatPublishedDate(q.created_at)}
                        </div>

                        {/* 3. Title */}
                        <Link
                          to="/insights/$id"
                          params={{ id: q.slug || q.id }}
                          className="block"
                        >
                          <h2 className="font-display font-bold text-base md:text-lg text-[#0b1c30] group-hover:text-slate-800 transition-colors leading-snug cursor-pointer">
                            {q.title}
                          </h2>
                        </Link>

                        {/* 4. Description / Excerpt */}
                        <p className="text-xs text-[#575f6e] leading-relaxed line-clamp-2">
                          {q.description}
                        </p>

                        {/* 5. Footer: Save, views, answers, upvotes on left; Join Discussion CTA on right */}
                        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#f1f5f9] text-xs">
                          <div className="flex items-center gap-2 sm:gap-3 text-[#575f6e] flex-wrap">
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(q.id, e)}
                              className="inline-flex items-center gap-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
                              title={isSaved ? "Saved" : "Save"}
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                            </button>

                            <span>•</span>

                            {isAdmin ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setIncreaseViewsTarget({
                                    id: q.id,
                                    title: q.title,
                                    type: "question",
                                    currentViews: q.views || 0,
                                  })
                                }
                                className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200 px-1.5 sm:px-2 py-0.5 rounded cursor-pointer transition-colors"
                                title="Admin: Boost Views"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>{formatCompactNumber(q.views ?? 0)}</span>
                                <TrendingUp className="w-3 h-3 text-emerald-600 ml-0.5" />
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#64748B]">
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>{formatCompactNumber(q.views ?? 0)}</span>
                              </span>
                            )}

                            <span>•</span>

                            <span className="inline-flex items-center gap-1 text-[#575f6e] font-sans">
                              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                              <span>
                                {perspectiveCount} {perspectiveCount === 1 ? "Answer" : "Answers"}
                              </span>
                            </span>

                            <span>•</span>

                            <button
                              type="button"
                              onClick={(e) => toggleUpvote(q.id, e)}
                              className="inline-flex items-center gap-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
                              title="Upvote"
                            >
                              <ThumbsUp
                                className={cn(
                                  "w-3.5 h-3.5",
                                  isUpvoted ? "text-[#059669] fill-[#059669]" : "text-slate-400"
                                )}
                              />
                              <span className="font-mono text-[11px]">{baseUpvotes + (isUpvoted ? 1 : 0)}</span>
                            </button>
                          </div>

                          <Link
                            to="/insights/$id"
                            params={{ id: q.slug || q.id }}
                            className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-xs shrink-0"
                          >
                            <span>Join Discussion</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </article>
                    );
                  })
                )
              ) : (
                /* ═══════════════════════════════════════════════════════════
                    KNOWLEDGE ARTICLES FEED (TAB 2)
                    ═══════════════════════════════════════════════════════════ */
                paginatedItems.length === 0 ? (
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#575f6e] mx-auto mb-4">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c30] mb-1">
                      {appliedSearch || selectedTopic !== "All" || filterMode !== "all" || filterOnlyVerified
                        ? "No knowledge articles match your current filters"
                        : "No operator knowledge published yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {appliedSearch || selectedTopic !== "All" || filterMode !== "all" || filterOnlyVerified
                        ? "Try resetting your filters or clearing your search query to see more."
                        : "Approved businesses document their operational wins, distribution playbooks, and battle-tested frameworks."}
                    </p>
                    <Button
                      type="button"
                      onClick={handleShareKnowledgeClick}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Publish First Article
                    </Button>
                  </div>
                ) : (
                  (paginatedItems as KnowledgeInsight[]).map((k) => {
                    const isSaved = savedItemIds.has(k.id);
                    const readTime = calculateReadingTime(k.content);
                    const basedOnLabel =
                      (k.based_on && BASED_ON_LABELS[k.based_on]) || "Verified Business Trial";

                    return (
                      <article
                        key={k.id}
                        className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-3.5 group"
                      >
                        {/* 1. First Row: On mobile strictly only logo & business name; on desktop also topic */}
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <CompanyLogo
                              src={k.business?.logo_url}
                              name={k.business?.company_name}
                              className="w-5 h-5 rounded object-contain border border-[#e2e8f0] shrink-0"
                              fallbackClassName="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0"
                              textClassName="text-[9px] font-mono font-bold"
                            />
                            <span className="font-semibold text-xs text-[#0b1c30] truncate">
                              {k.business?.company_name || "Verified Business"}
                            </span>
                            <span title="Verified Enterprise" className="hidden sm:inline-block">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            </span>
                          </div>

                          {k.topic && (
                            <span className="font-semibold text-[10px] text-[#0b1c30] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 hidden sm:inline-block">
                              {k.topic}
                            </span>
                          )}
                        </div>

                        {/* 2. Second Line: Published and date with capitalized month */}
                        <div className="text-[11px] text-[#64748B] -mt-1 font-sans">
                          Published {formatPublishedDate(k.published_at || k.created_at)}
                        </div>

                        {/* 2. Below Row 1: Title */}
                        <Link
                          to="/insights/knowledge/$id"
                          params={{ id: k.slug || k.id }}
                          className="block"
                        >
                          <h2 className="font-display font-bold text-base md:text-lg text-[#0b1c30] group-hover:text-slate-800 transition-colors leading-snug cursor-pointer">
                            {k.title}
                          </h2>
                        </Link>

                        {/* 3. Below Title: Smaller text article description with ellipses on 2nd line for both mobile & desktop */}
                        <p className="text-xs text-[#575f6e] leading-relaxed line-clamp-2">
                          {(k as any).summary || k.content}
                        </p>

                        {/* 4. Footer: Save icon, views icon on left (no text on mobile, 1.7k format), Read Case study on right */}
                        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#f1f5f9] text-xs">
                          <div className="flex items-center gap-2 sm:gap-3 text-[#575f6e]">
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(k.id, e)}
                              className="inline-flex items-center gap-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
                              title={isSaved ? "Saved" : "Save"}
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                            </button>
                            <span>•</span>
                            {isAdmin ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setIncreaseViewsTarget({
                                    id: k.id,
                                    title: k.title,
                                    type: "knowledge",
                                    currentViews: k.views || 0,
                                  })
                                }
                                className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200 px-1.5 sm:px-2 py-0.5 rounded cursor-pointer transition-colors"
                                title="Admin: Boost Views"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>{formatCompactNumber(k.views ?? 0)}</span>
                                <TrendingUp className="w-3 h-3 text-emerald-600 ml-0.5" />
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#64748B]">
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>{formatCompactNumber(k.views ?? 0)}</span>
                              </span>
                            )}
                          </div>

                          <Link
                            to="/insights/knowledge/$id"
                            params={{ id: k.slug || k.id }}
                            className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-xs shrink-0"
                          >
                            <span>Read Case study</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </article>
                    );
                  })
                )
              )}

              {/* Streamlined Pagination Bar */}
              {totalCount > 0 && (
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs text-xs text-[#575f6e]">
                  <div>
                    Showing{" "}
                    <span className="font-semibold text-[#0b1c30]">
                      {Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, totalCount)} –{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                    </span>{" "}
                    of <span className="font-semibold text-[#0b1c30]">{totalCount}</span> {activeTab === "questions" ? "advisories" : "articles"}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#0b1c30] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                          currentPage === p
                            ? "bg-slate-900 text-white"
                            : "border border-[#e2e8f0] hover:bg-slate-50 text-[#0b1c30]"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#0b1c30] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                Right Column: Advisory & Intelligence Rail (4 Cols)
                ═══════════════════════════════════════════════════════════════ */}
            <aside className="lg:col-span-4 flex flex-col gap-5">
              
              {/* 1. PEER ADVISORY PROTOCOL (CDOES 3.1) - COLLAPSIBLE */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-2xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsProtocolOpen(!isProtocolOpen)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold uppercase tracking-tight">
                      Peer Advisory Protocol
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#475569] text-[10px] font-mono font-bold">
                      CDOES 3.1
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-500 transition-transform duration-200",
                        isProtocolOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>
                {isProtocolOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3.5 text-xs text-[#334155] border-t border-[#E2E8F0]/70 pt-3.5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F172A]">Strict Bilateral Integrity</span>
                        <span className="text-[#64748B] leading-relaxed">
                          Zero cold prospecting, unsolicited sales links, or affiliate vendor promotion. Violations trigger immediate revoke.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F172A]">Grounded Commercial Reality</span>
                        <span className="text-[#64748B] leading-relaxed">
                          All answers must reflect real deal mechanics, verified contract clauses, or active institutional experience.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F172A]">Blinded Confidentiality</span>
                        <span className="text-[#64748B] leading-relaxed">
                          Preserve customer entity privacy and NDA confidentiality prior to official Stage 4 Handshake execution.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. TRENDING TOPICS & VELOCITY (WoW) - COLLAPSIBLE */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-2xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsTrendingOpen(!isTrendingOpen)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold">
                      Trending Topics &amp; Velocity
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#64748B]">WoW</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-500 transition-transform duration-200",
                        isTrendingOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>
                {isTrendingOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5 text-xs border-t border-[#E2E8F0]/70 pt-3.5">
                    {TRENDING_TOPICS.map((item) => (
                      <button
                        key={item.tag}
                        type="button"
                        onClick={() => {
                          setSelectedTopic(item.topic);
                          setSearchQuery(item.label);
                          setCurrentPage(1);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E2E8F0] text-left cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0F172A] font-mono">{item.tag}</span>
                          <span className="text-[11px] text-[#64748B]">{item.count} active discussions</span>
                        </div>
                        <span className="inline-flex items-center gap-0.5 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          <TrendingUp className="w-3 h-3" />
                          {item.change}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. TOP CONTRIBUTING OPERATORS (30 Days) - COLLAPSIBLE */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-2xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsTopOperatorsOpen(!isTopOperatorsOpen)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold">
                      Top Contributing Operators
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#64748B]">30 Days</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-500 transition-transform duration-200",
                        isTopOperatorsOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>
                {isTopOperatorsOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3 text-xs border-t border-[#E2E8F0]/70 pt-3.5">
                    {TOP_CONTRIBUTING_OPERATORS.map((op, idx) => (
                      <div
                        key={op.name}
                        className={cn(
                          "flex items-center justify-between gap-2.5",
                          idx < TOP_CONTRIBUTING_OPERATORS.length - 1 && "pb-2.5 border-b border-[#F1F5F9]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                            {op.initials}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-xs text-[#0F172A]">{op.name}</span>
                              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                            </div>
                            <span className="text-[11px] text-[#64748B]">{op.role}</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 bg-slate-50 border border-[#E2E8F0] rounded text-[11px] font-semibold text-[#0F172A]">
                          {op.parity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. CONFIDENTIAL DEAL INQUIRIES (Dark Banner) */}
              <div className="bg-[#1E293B] text-white rounded-xl p-5 shadow-xs border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300 text-[11px] uppercase tracking-wider font-bold mb-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Confidential Deal Inquiries</span>
                </div>
                <h4 className="font-display text-base font-bold text-white mb-2 leading-snug">
                  Can&apos;t share deal metrics publicly?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Post a Blinded Question to accredited syndicate partners. Your corporate identity remains fully masked until you accept an operational NDA.
                </p>
                <button
                  type="button"
                  onClick={handleAskClick}
                  className="w-full py-2 px-3.5 bg-white text-[#0F172A] text-xs font-bold rounded hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>Post Blinded Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </aside>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          4. DIALOGS & MODALS
          ═══════════════════════════════════════════════════════════════════ */}
      {/* Mobile Filters Bottom Sheet (Covers 90% of screen) */}
      <Sheet open={filtersSheetOpen} onOpenChange={setFiltersSheetOpen}>
        <SheetContent
          side="bottom"
          className="h-[90vh] max-h-[90vh] rounded-t-2xl p-5 flex flex-col justify-between overflow-y-auto bg-white border-t border-[#E2E8F0] z-50"
        >
          <div className="space-y-4">
            <SheetHeader className="text-left pb-3 border-b border-[#E2E8F0]">
              <SheetTitle className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#0F172A]" />
                <span>Filters &amp; Sorting</span>
              </SheetTitle>
              <SheetDescription className="text-xs text-[#64748B]">
                Configure advisory status, ranking order, and author verification.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 pt-1">
              {/* 1. Status Filter (Only on Questions) */}
              {activeTab === "questions" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#475569]">Advisory Status</label>
                  <select
                    value={draftStatus}
                    onChange={(e) => setDraftStatus(e.target.value as any)}
                    className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open for Perspectives</option>
                    <option value="closed">Consensus Reached</option>
                  </select>
                </div>
              )}

              {/* 2. Sort Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475569]">Sort By</label>
                <select
                  value={draftSort}
                  onChange={(e) => setDraftSort(e.target.value as any)}
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                >
                  <option value="newest">Most Recent</option>
                  <option value="perspectives">
                    {activeTab === "questions" ? "Highest Engagement" : "Most Viewed"}
                  </option>
                </select>
              </div>

              {/* 3. Verification Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475569]">Author Verification</label>
                <select
                  value={draftVerified ? "verified" : "all"}
                  onChange={(e) => setDraftVerified(e.target.value === "verified")}
                  className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                >
                  <option value="all">
                    {activeTab === "questions" ? "All Operator Answers" : "All Authors"}
                  </option>
                  <option value="verified">
                    {activeTab === "questions" ? "Verified Answers Only" : "Verified Businesses Only"}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={handleResetDraftFilters}
              className="px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Reset All
            </button>
            <button
              type="button"
              onClick={handleApplyMobileFilters}
              className="flex-1 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-[#1E293B] transition-colors shadow-xs cursor-pointer text-center"
            >
              Apply Filters
            </button>
          </div>
        </SheetContent>
      </Sheet>


      <AskQuestionDialog
        open={askModalOpen}
        onOpenChange={setAskModalOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["questions-list"] });
          queryClient.invalidateQueries({ queryKey: ["all-questions-stats"] });
        }}
      />

      <ShareInsightDialog
        open={shareInsightModalOpen}
        onOpenChange={setShareInsightModalOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
          queryClient.invalidateQueries({ queryKey: ["all-knowledge-stats"] });
        }}
      />

      {isAdmin && (
        <>
          <AdminCreateQuestionDialog
            open={adminCreateQuestionOpen}
            onOpenChange={setAdminCreateQuestionOpen}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["questions-list"] });
              queryClient.invalidateQueries({ queryKey: ["all-questions-stats"] });
              getAdminInsights()
                .then((res) => {
                  if (res?.businesses) setAdminBusinesses(res.businesses);
                })
                .catch(() => {});
            }}
            businesses={adminBusinesses}
          />
          <AdminCreateKnowledgeDialog
            open={adminCreateKnowledgeOpen}
            onOpenChange={setAdminCreateKnowledgeOpen}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
              queryClient.invalidateQueries({ queryKey: ["all-knowledge-stats"] });
              getAdminInsights()
                .then((res) => {
                  if (res?.businesses) setAdminBusinesses(res.businesses);
                })
                .catch(() => {});
            }}
            businesses={adminBusinesses}
          />
          <AdminIncreaseViewsDialog
            open={!!increaseViewsTarget}
            onOpenChange={(open) => !open && setIncreaseViewsTarget(null)}
            item={increaseViewsTarget}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["questions-list"] });
              queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
              queryClient.invalidateQueries({ queryKey: ["all-questions-stats"] });
              queryClient.invalidateQueries({ queryKey: ["all-knowledge-stats"] });
            }}
          />
        </>
      )}

      {shareItem && (
        <ShareModal
          open={!!shareItem}
          onOpenChange={(open) => !open && setShareItem(null)}
          title={shareItem.title}
          topic={shareItem.topic}
          authorName={shareItem.authorName}
          urlPath={shareItem.urlPath}
          type={shareItem.type}
        />
      )}

      {/* Public user discussion login prompt modal */}
      <InsightsPublicAuthPromptModal
        open={publicAuthPromptOpen}
        onOpenChange={(val) => {
          setPublicAuthPromptOpen(val);
          if (!val) {
            markGlobalAuthPromptShown();
          }
        }}
        onOpenContributorSetup={() => setContributorModalOpen(true)}
        tabName={activeTab}
      />

      {/* 3-Screen Contributor Profile Setup Modal */}
      <CommunityContributorAuthModal
        open={contributorModalOpen}
        onOpenChange={setContributorModalOpen}
        pendingComment=""
        itemType={activeTab === "knowledge" ? "knowledge" : "question"}
        itemId={`insights-${activeTab}`}
        itemTitle={activeTab === "knowledge" ? "The Relay Knowledge Base" : "The Relay Questions & Discussions"}
        onCommentPublished={() => {
          queryClient.invalidateQueries({ queryKey: ["questions-list"] });
          queryClient.invalidateQueries({ queryKey: ["knowledge-list"] });
        }}
      />
    </div>
  );
}
