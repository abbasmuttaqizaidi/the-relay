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
import { getCompanyInitials } from "@/lib/utils";
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
      title: "Insights & Peer Intelligence — The Relay",
      description:
        "Tactical lessons and peer advice from verified B2B operators. Every perspective requires authenticated corporate attribution.",
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

  // Dynamic Trending Topics calculation from active records
  const dynamicTrendingTopics = useMemo(() => {
    return TRENDING_CATEGORIES.map((cat) => {
      const qCount = allQuestionsForStats.filter(
        (q) => (q.topic || "").toLowerCase().includes(cat.filterValue.toLowerCase())
      ).length;
      const kCount = allKnowledgeForStats.filter(
        (k) => (k.topic || "").toLowerCase().includes(cat.filterValue.toLowerCase())
      ).length;
      const activeCount = activeTab === "questions" ? qCount : (activeTab === "knowledge" ? kCount : qCount + kCount);
      return {
        ...cat,
        count: `${activeCount} active`,
        rawCount: activeCount,
      };
    });
  }, [allQuestionsForStats, allKnowledgeForStats, activeTab]);

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

  // Filtered and paginated list calculation
  const currentList = activeTab === "questions" ? questions : knowledgeList;
  const totalCount = currentList.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentList.slice(start, start + ITEMS_PER_PAGE);
  }, [currentList, currentPage]);

  return (
    <div className="min-h-screen bg-white text-[#0b1c30] antialiased selection:bg-[#9d4300] selection:text-white pb-24 overflow-x-hidden w-full max-w-full">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO HEADER & OVERVIEW SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-8 pb-6 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                Peer Intelligence
              </span>
              <span className="text-[#cbd5e1]">•</span>
              <span className="text-xs text-[#575f6e]">Verified Operator Logs</span>
              {isAdmin && (
                <>
                  <span className="text-[#cbd5e1]">•</span>
                  <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/10 text-orange-700 border border-orange-300/60">
                    Admin Mode Active
                  </span>
                </>
              )}
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#0b1c30] tracking-tight">
              Insights &amp; Peer Intelligence
            </h1>
            <p className="text-sm text-[#575f6e] mt-1.5 max-w-2xl leading-relaxed">
              Tactical lessons and peer advice from verified B2B operators. Every perspective requires authenticated corporate attribution.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              id="btn-share-knowledge"
              onClick={handleShareKnowledgeClick}
              className="px-4 py-2 text-xs font-semibold text-[#0b1c30] bg-white border border-[#e2e8f0] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Share Knowledge
            </button>
            <button
              id="btn-ask-question"
              onClick={handleAskClick}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. CONTROLS & CONTENT SECTION (2-COLUMN LAYOUT)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
          
          {/* Tab Switcher & Sleek Filter Bar */}
          <div className="flex flex-col gap-4">
            {/* Tab Switcher */}
            <div className="flex items-center gap-6 border-b border-[#e2e8f0] overflow-x-auto scrollbar-none">
              <button
                id="tab-questions"
                onClick={() => handleTabChange("questions")}
                className={`category-pill flex items-center gap-2 pb-3 pt-1 text-sm font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${
                  activeTab === "questions"
                    ? "text-[#0b1c30] border-[#0b1c30]"
                    : "text-[#575f6e] hover:text-[#0b1c30] border-transparent hover:border-[#cbd5e1]"
                }`}
              >
                <span>Questions</span>
                <span
                  className={`font-mono text-xs font-medium px-2 py-0.5 rounded-full ${
                    activeTab === "questions"
                      ? "bg-slate-900 text-white"
                      : "bg-[#f1f5f9] text-[#575f6e]"
                  }`}
                >
                  {totalQuestionsCount}
                </span>
              </button>

              <button
                id="tab-knowledge"
                onClick={() => handleTabChange("knowledge")}
                className={`category-pill flex items-center gap-2 pb-3 pt-1 text-sm font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${
                  activeTab === "knowledge"
                    ? "text-[#0b1c30] border-[#0b1c30]"
                    : "text-[#575f6e] hover:text-[#0b1c30] border-transparent hover:border-[#cbd5e1]"
                }`}
              >
                <span>Knowledge Articles</span>
                <span
                  className={`font-mono text-xs font-medium px-2 py-0.5 rounded-full ${
                    activeTab === "knowledge"
                      ? "bg-slate-900 text-white"
                      : "bg-[#f1f5f9] text-[#575f6e]"
                  }`}
                >
                  {totalKnowledgeCount}
                </span>
              </button>
            </div>

            {/* Single Sleek Search and Filter Bar */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 flex flex-col md:flex-row items-center gap-3 shadow-2xs">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  id="insight-search"
                  type="text"
                  placeholder={
                    activeTab === "questions"
                      ? "Search questions, operational hurdles, or keywords..."
                      : "Search knowledge articles, case studies, or frameworks..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 text-xs md:text-sm bg-[#f8fafc] text-[#0b1c30] placeholder-[#94a3b8] rounded-lg border border-transparent focus:border-[#e2e8f0] focus:bg-white focus:outline-none transition-colors"
                />
              </form>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap sm:flex-nowrap">
                <div className="w-full sm:w-56 shrink-0">
                  <Select value={selectedTopic} onValueChange={(val) => { setSelectedTopic(val); setCurrentPage(1); }}>
                    <SelectTrigger id="topic-filter" className="h-10 text-xs font-semibold bg-[#f8fafc] border-0 text-[#0b1c30] rounded-lg focus:ring-1 focus:ring-slate-900">
                      <SelectValue placeholder="Topic: All (11 Categories)" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e2e8f0]">
                      {TOPIC_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-44 shrink-0">
                  <Select value={selectedSort} onValueChange={(val: any) => setSelectedSort(val)}>
                    <SelectTrigger className="h-10 text-xs font-semibold bg-[#f8fafc] border-0 text-[#0b1c30] rounded-lg focus:ring-1 focus:ring-slate-900">
                      <SelectValue placeholder="Sort: Newest First" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#e2e8f0]">
                      <SelectItem value="newest" className="text-xs">
                        Sort: Newest First
                      </SelectItem>
                      <SelectItem value="perspectives" className="text-xs">
                        Sort: Most Perspectives
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(selectedTopic !== "All" || selectedSort !== "newest" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedTopic("All");
                      setSelectedSort("newest");
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
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              MAIN 2-COLUMN GRID (8 COLS FEED + 4 COLS SIDEBAR)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Feed Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
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
                    QUESTIONS FEED (USE CASE 1)
                    ═══════════════════════════════════════════════════════════ */
                paginatedItems.length === 0 ? (
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#575f6e] mx-auto mb-4">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c30] mb-1">
                      {searchQuery || selectedTopic !== "All"
                        ? "No questions found"
                        : "No peer questions shared yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {searchQuery || selectedTopic !== "All"
                        ? "Try clearing your search query or choosing another topic category."
                        : "Verified operators ask specific, tactical questions to resolve growth bottlenecks."}
                    </p>
                    <Button
                      onClick={handleAskClick}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
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
                    const dealCode = `#RY-Q${q.id.replace(/-/g, "").slice(0, 3).toUpperCase()}${idx + 10}`;
                    const initials = getCompanyInitials(q.business?.company_name || "Verified Business");

                    return (
                      <article
                        key={q.id}
                        className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group"
                      >
                        {/* Top Meta Header */}
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[11px] text-[#0b1c30] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider">
                              {q.topic || "Partnerships"}
                            </span>
                            <span className="font-mono font-medium text-[#575f6e] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded text-[11px]">
                              {dealCode}
                            </span>
                            {isClosed && (
                              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                Closed
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[#94a3b8] text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatTimeAgo(q.created_at)}</span>
                          </div>
                        </div>

                        {/* Title & Description Excerpt */}
                        <div className="space-y-1.5">
                          <Link
                            to="/insights/$id"
                            params={{ id: q.id }}
                            className="block"
                          >
                            <h2 className="font-display font-bold text-base md:text-lg text-[#0b1c30] group-hover:text-slate-800 transition-colors leading-snug cursor-pointer">
                              {q.title}
                            </h2>
                          </Link>
                          <p className="text-xs md:text-sm text-[#575f6e] leading-relaxed line-clamp-2">
                            {q.description}
                          </p>
                        </div>

                        {/* Author Info Row */}
                        <div className="flex items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-3 min-w-0">
                            <CompanyLogo
                              src={q.business?.logo_url}
                              name={q.business?.company_name}
                              className="w-8 h-8 rounded-lg object-contain border border-[#e2e8f0] shrink-0"
                              fallbackClassName="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-display shrink-0"
                              textClassName="text-[10px] font-mono font-bold"
                            />
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-semibold text-xs text-[#0b1c30] truncate">
                                {q.business?.company_name || "Verified Enterprise"}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" title="Verified Enterprise" />
                              <span className="text-[#cbd5e1]">•</span>
                              <span className="text-xs text-[#575f6e] truncate">
                                {q.business?.hq_location || q.business?.industry || "United States"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#059669] font-medium shrink-0">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>
                              {perspectiveCount}{" "}
                              {perspectiveCount === 1 ? "perspective" : "perspectives"}
                            </span>
                          </div>
                        </div>

                        {/* Card Footer Bar */}
                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#f1f5f9] text-xs">
                          <div className="flex items-center gap-3 text-[#575f6e]">
                            <button
                              onClick={(e) => toggleBookmark(q.id, e)}
                              className="inline-flex items-center gap-1 hover:text-[#0b1c30] transition-colors cursor-pointer"
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                              <span>{isSaved ? "Saved" : "Save"}</span>
                            </button>
                            <span className="text-[11px] text-[#94a3b8] hidden sm:inline">
                              {perspectiveCount > 0 ? "Consensus active" : "Open for answers"}
                            </span>
                          </div>

                          <Link
                            to="/insights/$id"
                            params={{ id: q.id }}
                            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
                          >
                            <span>View &amp; Answer</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </article>
                    );
                  })
                )
              ) : (
                /* ═══════════════════════════════════════════════════════════
                    KNOWLEDGE ARTICLES FEED (USE CASE 2)
                    ═══════════════════════════════════════════════════════════ */
                paginatedItems.length === 0 ? (
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#575f6e] mx-auto mb-4">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c30] mb-1">
                      {searchQuery || selectedTopic !== "All"
                        ? "No knowledge articles found"
                        : "No case studies published yet."}
                    </h3>
                    <p className="text-xs text-[#575f6e] max-w-sm mx-auto mb-6 leading-relaxed">
                      {searchQuery || selectedTopic !== "All"
                        ? "Try clearing your search query or selecting another topic."
                        : "Publish your company's operational lessons, post-mortems, and playbooks."}
                    </p>
                    <Button
                      onClick={handleShareKnowledgeClick}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Publish First Case Study
                    </Button>
                  </div>
                ) : (
                  (paginatedItems as KnowledgeInsight[]).map((k) => {
                    const isSaved = savedItemIds.has(k.id);
                    const readTime = calculateReadingTime(k.content);

                    return (
                      <article
                        key={k.id}
                        className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group"
                      >
                        {/* Top Meta Header */}
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[11px] text-[#C2410C] bg-[#FFF7ED] border border-[#FFEDD5] px-2 py-0.5 rounded uppercase">
                              {k.based_on ? (BASED_ON_LABELS[k.based_on] || "Case Study") : "Case Study"}
                            </span>
                            <span className="font-semibold text-[11px] text-[#0b1c30] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider">
                              {k.topic || "Operations"}
                            </span>
                            <span className="text-[11px] text-[#575f6e]">
                              {readTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#94a3b8] text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatTimeAgo(k.published_at || k.created_at)}</span>
                          </div>
                        </div>

                        {/* Title & Description Excerpt */}
                        <div className="space-y-1.5">
                          <Link
                            to="/insights/knowledge/$id"
                            params={{ id: k.id }}
                            className="block"
                          >
                            <h2 className="font-display font-bold text-base md:text-lg text-[#0b1c30] group-hover:text-slate-800 transition-colors leading-snug cursor-pointer">
                              {k.title}
                            </h2>
                          </Link>
                          <p className="text-xs md:text-sm text-[#575f6e] leading-relaxed line-clamp-2">
                            {k.content}
                          </p>
                        </div>

                        {/* Author Info Row */}
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
                                {k.business?.company_name || "Anonymous Enterprise"}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" title="Verified Business" />
                              <span className="text-[#cbd5e1]">•</span>
                              <span className="text-xs text-[#575f6e] truncate">
                                {k.business?.hq_location || k.business?.industry || "Global Operations"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#575f6e]">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Verified Attribution</span>
                          </div>
                        </div>

                        {/* Card Footer Bar */}
                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#f1f5f9] text-xs">
                          <div className="flex items-center gap-3 text-[#575f6e]">
                            <button
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
                            params={{ id: k.id }}
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

              {/* Streamlined Pagination */}
              {totalCount > 0 && (
                <div className="flex items-center justify-between bg-white border border-[#e2e8f0] rounded-xl px-5 py-3.5 text-xs text-[#575f6e] shadow-2xs">
                  <div>
                    Showing{" "}
                    <span className="font-semibold text-[#0b1c30]">
                      {Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, totalCount)} –{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                    </span>{" "}
                    of <span className="font-semibold text-[#0b1c30]">{totalCount}</span> {activeTab === "questions" ? "inquiries" : "articles"}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#0b1c30] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
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
                Right Sidebar (4 Cols)
                ═══════════════════════════════════════════════════════════════ */}
            <aside className="lg:col-span-4 space-y-5">
              
              {/* 1. How Peer Insights Work Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowLeftRight className="w-5 h-5 text-slate-900" />
                  <h3 className="font-display font-bold text-sm text-[#0b1c30]">
                    How Peer Insights Work
                  </h3>
                </div>
                <p className="text-xs text-[#575f6e] mb-4 leading-relaxed">
                  A high-trust bilateral network built to eliminate vendor pitches, algorithmic bias, and anonymous noise.
                </p>
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0b1c30]">Verified Operators Only</div>
                      <div className="text-[11px] text-[#575f6e] mt-0.5 leading-relaxed">
                        Only authenticated business operators can post inquiries or respond with perspectives.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] text-[#0b1c30] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0b1c30]">Grounded Attribution</div>
                      <div className="text-[11px] text-[#575f6e] mt-0.5 leading-relaxed">
                        Perspectives must declare operator qualification and provenance from real trials or metrics.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0b1c30]">Zero Vendor Pitching</div>
                      <div className="text-[11px] text-[#575f6e] mt-0.5 leading-relaxed">
                        Self-promotion and vendor sales decks are strictly screened out by bilateral review.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Trending Topics Minimal Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-sm text-[#0b1c30]">
                    Trending Topics
                  </h3>
                  <span className="text-[10px] font-semibold text-[#575f6e] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider">
                    THIS WEEK
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {dynamicTrendingTopics.map((topic) => (
                    <button
                      key={topic.name}
                      onClick={() => {
                        setSelectedTopic(topic.filterValue);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors text-xs text-left cursor-pointer ${
                        selectedTopic === topic.filterValue
                          ? "bg-slate-100 font-semibold text-[#0b1c30]"
                          : "hover:bg-[#f8fafc] text-[#0b1c30]"
                      }`}
                    >
                      <span className="font-medium">{topic.name}</span>
                      <span className="font-mono text-[11px] text-[#575f6e] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded shrink-0">
                        {topic.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Opportunity Board Callout Card */}
              <div className="bg-[#171F2C] text-white rounded-xl p-5 shadow-sm">
                <span className="text-[10px] font-semibold tracking-wider text-[#94a3b8] uppercase">
                  Reciprocal Dealflow
                </span>
                <h4 className="font-display font-bold text-base text-white mt-1">
                  Need Strategic Partners?
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                  The Relay connects vetted corporate teams through bilateral mutual unmasking on the live board.
                </p>
                <Link
                  to="/opportunities"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-slate-100 text-[#0b1c30] text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  <span>Go to Opportunity Board</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </section>

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
