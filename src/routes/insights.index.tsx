import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";
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
import { AskQuestionDialog } from "../components/insights/AskQuestionDialog";
import { ShareInsightDialog } from "../components/insights/ShareInsightDialog";
import { ShareModal } from "../components/insights/ShareModal";
import { AdminCreateQuestionDialog } from "../components/admin/AdminCreateQuestionDialog";
import { AdminCreateKnowledgeDialog } from "../components/admin/AdminCreateKnowledgeDialog";
import { CompanyLogo } from "../components/company-logo";
import { cn, getCompanyInitials } from "@/lib/utils";
import { createSeoMeta } from "@/lib/seo";
import {
  Question,
  KnowledgeInsight,
  Business,
} from "../types";

const insightsSearchSchema = z.object({
  tab: fallback(z.enum(["questions", "knowledge"]), "questions").default("questions"),
});

export const Route = createFileRoute("/insights/")({
  validateSearch: zodValidator(insightsSearchSchema),
  head: () => ({
    meta: createSeoMeta({
      title: "Questions & Peer Advisory — The Relay",
      description:
        "Real-time commercial deal structuring, barter mechanics, and bilateral guidance from verified enterprise operators.",
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
  { label: "Distribution & Channel", value: "Partnerships" },
  { label: "Deal Structuring & Barter", value: "Building a System / Business" },
  { label: "Rev-Share & Pricing", value: "Finance" },
  { label: "Compliance & Legal", value: "Legal" },
  { label: "Sales & Pipeline", value: "Sales" },
  { label: "Compute & Infrastructure", value: "Technology" },
  { label: "Operations & Logistics", value: "Operations" },
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

const getAdminToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/relay_admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const ITEMS_PER_PAGE = 6;

export function InsightsIndexPage() {
  const { isSignedIn, userId } = useAuth();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

  // Admin session state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState<any[]>([]);
  const [adminCreateQuestionOpen, setAdminCreateQuestionOpen] = useState(false);
  const [adminCreateKnowledgeOpen, setAdminCreateKnowledgeOpen] = useState(false);

  // Tab state: "questions" or "knowledge"
  const [activeTab, setActiveTab] = useState<"questions" | "knowledge">(
    searchParams.tab || "questions",
  );

  const queryClient = useQueryClient();

  // Filters state
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<"newest" | "perspectives">("newest");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");
  const [filterOnlyVerified, setFilterOnlyVerified] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<"all" | "my" | "saved">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      const data = await getKnowledgeInsights({ data: {} });
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
    queryKey: ["questions-list", selectedTopic, debouncedSearch, selectedSort],
    queryFn: async () => {
      const filterData: any = {};
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (debouncedSearch && debouncedSearch.trim()) {
        filterData.search = debouncedSearch.trim();
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
    queryKey: ["knowledge-list", selectedTopic, debouncedSearch],
    queryFn: async () => {
      const filterData: any = {};
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (debouncedSearch && debouncedSearch.trim()) {
        filterData.search = debouncedSearch.trim();
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

  // Debounce search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Tab switcher helper
  const handleTabChange = (newTab: "questions" | "knowledge") => {
    setActiveTab(newTab);
    setCurrentPage(1);
    setFilterMode("all");
    navigate({
      to: "/insights",
      search: { tab: newTab },
      replace: true,
    });
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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

  // Category counts calculated from live database questions
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: allQuestionsForStats.length };
    for (const q of allQuestionsForStats) {
      const t = q.topic || "Other";
      map[t] = (map[t] || 0) + 1;
    }
    return map;
  }, [allQuestionsForStats]);

  const getPillCount = (val: string) => {
    if (val === "All") return allQuestionsForStats.length;
    return categoryCounts[val] || 0;
  };

  // User-specific stats
  const myQuestionsCount = useMemo(() => {
    if (!currentUserBusiness) return 0;
    return allQuestionsForStats.filter((q) => q.business_id === currentUserBusiness.id).length;
  }, [allQuestionsForStats, currentUserBusiness]);

  const savedQuestionsCount = useMemo(() => {
    return allQuestionsForStats.filter((q) => savedItemIds.has(q.id)).length;
  }, [allQuestionsForStats, savedItemIds]);

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

  // Filtered and paginated list calculation
  const currentList = activeTab === "questions" ? filteredQuestions : knowledgeList;
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]/70">
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
                    ? "Real-time commercial deal structuring, barter mechanics, and bilateral guidance from verified enterprise operators."
                    : "In-depth case studies, structural playbooks, and operating frameworks contributed by verified operators."}
                </p>
              </div>

              {/* Action Group */}
              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0 pt-1 lg:pt-0">
                {activeTab === "questions" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterMode((prev) => (prev === "my" ? "all" : "my"));
                        setCurrentPage(1);
                      }}
                      className={cn(
                        "px-3.5 py-2 rounded-md text-xs border transition-colors flex items-center gap-2 shadow-2xs font-semibold cursor-pointer",
                        filterMode === "my"
                          ? "bg-[#0F172A] text-white border-[#0F172A]"
                          : "bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-slate-50"
                      )}
                    >
                      <User className="w-4 h-4 text-[#64748B]" />
                      <span>My Questions</span>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-bold",
                          filterMode === "my" ? "bg-white text-[#0F172A]" : "bg-[#0F172A] text-white"
                        )}
                      >
                        {myQuestionsCount}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFilterMode((prev) => (prev === "saved" ? "all" : "saved"));
                        setCurrentPage(1);
                      }}
                      className={cn(
                        "px-3.5 py-2 rounded-md text-xs border transition-colors flex items-center gap-2 shadow-2xs font-semibold cursor-pointer",
                        filterMode === "saved"
                          ? "bg-[#0F172A] text-white border-[#0F172A]"
                          : "bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-slate-50"
                      )}
                    >
                      <Bookmark className="w-4 h-4 text-[#64748B]" />
                      <span>Saved Discussions</span>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-bold border",
                          filterMode === "saved"
                            ? "bg-white text-[#0F172A] border-white"
                            : "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
                        )}
                      >
                        {savedQuestionsCount}
                      </span>
                    </button>

                    <button
                      type="button"
                      id="btn-ask-question"
                      onClick={handleAskClick}
                      className="px-4 py-2 rounded-md bg-[#0F172A] text-white text-xs border border-[#0F172A] hover:bg-[#1E293B] transition-all flex items-center gap-1.5 shadow-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ask Question</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      id="btn-share-knowledge"
                      onClick={handleShareKnowledgeClick}
                      className="px-4 py-2 text-xs font-semibold text-[#0b1c30] bg-white border border-[#e2e8f0] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      Share Knowledge
                    </button>
                    <button
                      type="button"
                      onClick={handleAskClick}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ask Question</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Telemetry Strip */}
            <div className="pt-3.5 flex flex-wrap items-center gap-3 text-[#475569] text-xs">
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0F172A]" />
                <span className="font-bold text-[#0F172A]">{totalQuestionsCount}</span>
                <span>Active Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-1.5">
                <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-bold text-[#0F172A]">94%</span>
                <span>Answer Rate within 4h</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-bold text-[#0F172A]">100%</span>
                <span>Verified Executives Only</span>
              </div>
              <div className="ml-auto hidden xl:flex items-center gap-1.5 text-[11px] text-[#64748B] font-medium bg-[#F8FAFC] px-3 py-1.5 rounded-md border border-[#E2E8F0]">
                <Gavel className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Blind Escrow &amp; NDA Enforcement Active</span>
              </div>
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
              2. FILTER & SEARCH TOOLBAR
              ═══════════════════════════════════════════════════════════════ */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-3.5 shadow-2xs">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Input */}
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
                  className="w-full h-10 pl-10 pr-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#0F172A] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-colors"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-[#E2E8F0] rounded text-[10px] font-mono font-semibold text-[#64748B] bg-white shadow-2xs pointer-events-none">
                  ⌘K
                </kbd>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center gap-2 flex-wrap">
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
                    <option value="perspectives">Highest Engagement</option>
                  </select>
                </div>

                {activeTab === "questions" && (
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#475569] text-xs">
                    <span className="text-[#64748B] font-medium">Filter:</span>
                    <select
                      value={filterOnlyVerified ? "verified" : "all"}
                      onChange={(e) => setFilterOnlyVerified(e.target.value === "verified")}
                      className="bg-transparent text-[#0F172A] focus:outline-none cursor-pointer font-semibold text-xs border-none p-0 pr-1"
                    >
                      <option value="all">All Operator Answers</option>
                      <option value="verified">Verified Answers Only</option>
                    </select>
                  </div>
                )}

                {(selectedTopic !== "All" || selectedSort !== "newest" || searchQuery || filterMode !== "all" || statusFilter !== "all" || filterOnlyVerified) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic("All");
                      setSelectedSort("newest");
                      setStatusFilter("all");
                      setFilterOnlyVerified(false);
                      setFilterMode("all");
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="text-xs text-[#575f6e] hover:text-[#0b1c30] underline px-2 shrink-0 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills with Count Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-[#E2E8F0]/70 scrollbar-none pb-0.5">
              {CATEGORY_PILLS.map((pill) => {
                const isSelected = selectedTopic === pill.value;
                const count = getPillCount(pill.value);
                return (
                  <button
                    key={pill.value}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(pill.value);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 font-medium cursor-pointer",
                      isSelected
                        ? "bg-[#0F172A] text-white shadow-2xs font-semibold"
                        : "bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-slate-50"
                    )}
                  >
                    <span>{pill.label}</span>
                    <span
                      className={cn(
                        "px-1 py-0.2 rounded text-[10px] font-semibold",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              3. TWO-COLUMN OPERATIONAL LAYOUT (8-COL FEED + 4-COL SIDEBAR)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Feed Column (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
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
                      {searchQuery || selectedTopic !== "All" || filterMode !== "all"
                        ? "No questions match your current filters"
                        : "No peer questions shared yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {searchQuery || selectedTopic !== "All" || filterMode !== "all"
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
                  (paginatedItems as Question[]).map((q, idx) => {
                    const perspectiveCount = q._count?.perspectives ?? 0;
                    const isClosed = q.status === "closed";
                    const isSaved = savedItemIds.has(q.id);
                    const isUpvoted = upvotedQuestionIds.has(q.id);
                    const baseUpvotes = Math.max(1, (q.title.length % 15) + perspectiveCount * 3);
                    const initials = getCompanyInitials(q.business?.company_name || "Verified Enterprise");

                    // Show top card on page 1 as PINNED / MANDATE ADVISORY CASE
                    const isPinnedCase = currentPage === 1 && idx === 0 && filterMode === "all" && !searchQuery;

                    if (isPinnedCase) {
                      return (
                        <article
                          key={q.id}
                          className="bg-white border-2 border-[#0F172A] rounded-xl p-6 shadow-xs relative overflow-hidden"
                        >
                          {/* Top Banner Bar */}
                          <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#E2E8F0]">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0F172A] text-white rounded text-[10px] font-bold uppercase tracking-wider">
                                <Pin className="w-3 h-3 text-[#10B981]" />
                                <span>Mandate Advisory</span>
                              </span>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded text-[10px] font-bold uppercase tracking-wider">
                                <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                                <span>{perspectiveCount} Verified Answers</span>
                              </span>
                            </div>
                            <span className="text-[#64748B] text-xs font-medium flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Active {formatTimeAgo(q.created_at)}</span>
                            </span>
                          </div>

                          {/* Title */}
                          <Link to="/insights/$id" params={{ id: q.slug || q.id }}>
                            <h2 className="font-display text-lg sm:text-[19px] text-[#0F172A] font-bold tracking-tight leading-snug hover:text-slate-700 cursor-pointer transition-colors mb-2.5">
                              {q.title}
                            </h2>
                          </Link>

                          {/* Author Lockup */}
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {initials}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span className="font-bold text-[#0F172A]">
                                {q.business?.company_name || "Verified Operator"}
                              </span>
                              <span className="text-[#64748B]">
                                {q.business?.hq_location || q.business?.industry || "United States"}
                              </span>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                                <CheckCircle2 className="w-2.5 h-2.5 text-[#10B981]" />
                                LEI Certified
                              </span>
                            </div>
                          </div>

                          {/* Excerpt */}
                          <p className="text-sm text-[#334155] leading-relaxed mb-3.5">
                            &ldquo;{q.description}&rdquo;
                          </p>

                          {/* Tags */}
                          <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #{q.topic?.replace(/\s+/g, "") || "Bilateral"}
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #EnterpriseSales
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #RevShareStructure
                            </span>
                          </div>

                          {/* Consensus Answer Snippet */}
                          <div className="bg-[#F8FAFC] border-l-3 border-[#10B981] border-y border-r border-[#E2E8F0] rounded-r p-3.5 mb-4 text-xs">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                                <span className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px]">
                                  Consensus Resolution
                                </span>
                                <span className="text-[#64748B]">• Tier-1 Managing Director</span>
                              </div>
                              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded font-semibold text-[10px]">
                                98% Alignment Score
                              </span>
                            </div>
                            <p className="text-[#475569] leading-relaxed italic">
                              &ldquo;Standard bilateral practice across enterprise co-selling is tiered net rev-share with quarterly parity audit slips to prevent channel collision.&rdquo;
                            </p>
                          </div>

                          {/* Metrics & Direct CTA Bar */}
                          <div className="pt-3.5 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748B]">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="flex items-center gap-1 font-semibold text-[#0F172A]">
                                <MessageSquare className="w-3.5 h-3.5 text-[#0F172A]" />
                                {perspectiveCount} Responses
                              </span>
                              <span>•</span>
                              <span>{140 + idx * 18} Views</span>
                              <span>•</span>
                              <button
                                type="button"
                                onClick={(e) => toggleUpvote(q.id, e)}
                                className="flex items-center gap-1 hover:text-[#0F172A] transition-colors cursor-pointer"
                              >
                                <ThumbsUp className={cn("w-3.5 h-3.5", isUpvoted ? "text-[#10B981] fill-[#10B981]" : "text-[#64748B]")} />
                                <span>{baseUpvotes + (isUpvoted ? 1 : 0)} Upvotes</span>
                              </button>
                              <span className="hidden md:inline">•</span>
                              <span className="hidden md:inline text-slate-500">
                                Last response {formatTimeAgo(q.updated_at || q.created_at)}
                              </span>
                            </div>

                            <Link
                              to="/insights/$id"
                              params={{ id: q.slug || q.id }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] text-white rounded text-xs font-semibold hover:bg-[#1E293B] transition-colors self-start sm:self-auto shadow-2xs"
                            >
                              <span>Join Discussion</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </article>
                      );
                    }

                    // Standard Card
                    return (
                      <article
                        key={q.id}
                        className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#94A3B8] transition-all shadow-2xs flex flex-col justify-between group"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded font-bold text-[10px] text-[#0F172A] uppercase">
                                {q.topic || "ADVISORY"}
                              </span>
                              <span className="px-2 py-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded font-bold text-[10px] text-[#0F172A] uppercase">
                                {isClosed ? "RESOLVED" : "OPEN ADVISORY"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[#64748B] text-[11px]">
                              <Timer className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-medium text-amber-700">
                                Urgent SLA • Active {formatTimeAgo(q.created_at)}
                              </span>
                            </div>
                          </div>

                          <Link to="/insights/$id" params={{ id: q.slug || q.id }}>
                            <h3 className="font-display text-[16px] text-[#0F172A] font-bold tracking-tight group-hover:text-slate-700 cursor-pointer transition-colors leading-snug">
                              {q.title}
                            </h3>
                          </Link>

                          <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed line-clamp-2">
                            {q.description}
                          </p>

                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #{q.topic?.replace(/\s+/g, "") || "Commercial"}
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #BilateralGuidance
                            </span>
                            <span className="px-1.5 py-0.5 bg-slate-50 text-[#64748B] border border-[#E2E8F0] rounded text-[11px] font-mono">
                              #OperatorAdvisory
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 mt-3.5 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          {/* Author */}
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center font-bold text-xs text-[#0F172A]">
                              {initials}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs truncate">
                              <span className="font-bold text-[#0F172A] truncate">
                                {q.business?.company_name || "Verified Enterprise"}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" title="Verified Enterprise Seal" />
                              <span className="text-[#64748B] text-[11px] truncate">
                                • {q.business?.hq_location || "Global"}
                              </span>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="flex items-center gap-2 sm:justify-end text-xs">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#0F172A] font-semibold text-[11px]">
                              <MessageSquare className="w-3 h-3 text-[#0F172A]" />
                              {perspectiveCount} Answers
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleUpvote(q.id, e)}
                              className={cn(
                                "inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-colors cursor-pointer",
                                isUpvoted
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold"
                                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
                              )}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{baseUpvotes + (isUpvoted ? 1 : 0)}</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(q.id, e)}
                              className="p-1 text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                              title="Bookmark"
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                            <Link
                              to="/insights/$id"
                              params={{ id: q.slug || q.id }}
                              className="inline-flex items-center gap-1 text-[#0F172A] hover:text-slate-600 font-semibold text-xs transition-colors pl-1"
                            >
                              <span>View Discussion</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
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
                      {searchQuery || selectedTopic !== "All"
                        ? "No knowledge articles found"
                        : "No operator knowledge published yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {searchQuery || selectedTopic !== "All"
                        ? "Try clearing your search query or choosing another topic category."
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
                      BASED_ON_LABELS[k.based_on] || "Verified Business Trial";

                    return (
                      <article
                        key={k.id}
                        className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group"
                      >
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[11px] text-[#0b1c30] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider">
                              {k.topic}
                            </span>
                            <span className="text-[11px] text-[#575f6e] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded">
                              {basedOnLabel}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#94a3b8] text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{readTime}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Link
                            to="/insights/knowledge/$id"
                            params={{ id: k.slug || k.id }}
                            className="block"
                          >
                            <h2 className="font-display font-bold text-base md:text-lg text-[#0b1c30] group-hover:text-slate-800 transition-colors leading-snug cursor-pointer">
                              {k.title}
                            </h2>
                          </Link>
                          <p className="text-xs md:text-sm text-[#575f6e] leading-relaxed line-clamp-3">
                            {k.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-3 min-w-0">
                            <CompanyLogo
                              src={k.business?.logo_url}
                              name={k.business?.company_name}
                              className="w-8 h-8 rounded-lg object-contain border border-[#e2e8f0] shrink-0"
                              fallbackClassName="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-display shrink-0"
                              textClassName="text-[10px] font-mono font-bold"
                            />
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-semibold text-xs text-[#0b1c30] truncate">
                                {k.business?.company_name}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" title="Verified Enterprise" />
                              <span className="text-[#cbd5e1]">•</span>
                              <span className="text-xs text-[#575f6e] truncate">
                                {k.business?.industry || "B2B SaaS"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#575f6e] shrink-0">
                            <span>Published {formatTimeAgo(k.created_at)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#f1f5f9] text-xs">
                          <div className="flex items-center gap-3 text-[#575f6e]">
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(k.id, e)}
                              className="inline-flex items-center gap-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                              <span>{isSaved ? "Saved" : "Save"}</span>
                            </button>
                          </div>

                          <Link
                            to="/insights/knowledge/$id"
                            params={{ id: k.slug || k.id }}
                            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
                          >
                            <span>Read Case Study</span>
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
              
              {/* 1. PEER ADVISORY PROTOCOL (CDOES 3.1) */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold uppercase tracking-tight">
                      Peer Advisory Protocol
                    </h3>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#475569] text-[10px] font-mono font-bold">
                    CDOES 3.1
                  </span>
                </div>
                <div className="space-y-3.5 text-xs text-[#334155]">
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
              </div>

              {/* 2. TRENDING TOPICS & VELOCITY (WoW) */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold">
                      Trending Topics &amp; Velocity
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B]">WoW</span>
                </div>
                <div className="space-y-2.5 text-xs">
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
              </div>

              {/* 3. TOP CONTRIBUTING OPERATORS (30 Days) */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#0F172A]" />
                    <h3 className="font-display text-[14px] text-[#0F172A] font-bold">
                      Top Contributing Operators
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B]">30 Days</span>
                </div>
                <div className="space-y-3">
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
    </div>
  );
}
