import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  SlidersHorizontal,
  BadgeCheck,
  ShieldCheck,
  Building2,
  Clock,
  MessageSquare,
  MessageSquareQuote,
  Sparkles,
  Lock,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Question,
  KnowledgeInsight,
  KnowledgeInsightBasedOn,
  Business,
} from "../types";

const insightsSearchSchema = z.object({
  tab: fallback(z.enum(["questions", "knowledge"]), "questions").default("questions"),
});

export const Route = createFileRoute("/insights/")({
  validateSearch: zodValidator(insightsSearchSchema),
  head: () => ({
    meta: [
      { title: "Business Insights & Knowledge — The Relay" },
      {
        name: "description",
        content:
          "Practical business lessons, experiments, and peer perspectives shared directly by verified operators and company founders.",
      },
      { property: "og:title", content: "Business Insights & Knowledge — The Relay" },
      {
        property: "og:description",
        content:
          "Practical business lessons, experiments, and peer perspectives shared directly by verified operators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Business Insights & Knowledge — The Relay" },
      {
        name: "twitter:description",
        content:
          "Practical business lessons, experiments, and peer perspectives shared directly by verified operators.",
      },
    ],
  }),
  component: InsightsIndexPage,
});

const TOPIC_FILTERS: { value: string; label: string }[] = [
  { value: "All", label: "All Topics" },
  { value: "Building a System / Business", label: "Building a System / Business" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Operations", label: "Operations" },
  { value: "Hiring", label: "Hiring" },
  { value: "Finance", label: "Finance" },
  { value: "Product", label: "Product" },
  { value: "Partnerships", label: "Partnerships" },
  { value: "Distribution", label: "Distribution" },
  { value: "Technology", label: "Technology" },
  { value: "Other", label: "Other" },
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
    return "";
  }
}

function calculateReadingTime(text?: string): string {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

const getAdminToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/relay_admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export function InsightsIndexPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

  // Admin session state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState<any[]>([]);
  const [adminCreateQuestionOpen, setAdminCreateQuestionOpen] = useState(false);
  const [adminCreateKnowledgeOpen, setAdminCreateKnowledgeOpen] = useState(false);

  // Tab state: "questions" (Use Case 1) or "knowledge" (Use Case 2)
  const [activeTab, setActiveTab] = useState<"questions" | "knowledge">(
    searchParams.tab || "questions",
  );

  // Data states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserBusiness, setCurrentUserBusiness] = useState<Business | null>(null);

  // Filters state
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<"newest" | "perspectives">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    }
  }, [searchParams.tab]);

  // Tab switcher helper
  const handleTabChange = (newTab: "questions" | "knowledge") => {
    setActiveTab(newTab);
    navigate({
      to: "/insights",
      search: { tab: newTab },
      replace: true,
    });
  };

  // Fetch current user business status
  useEffect(() => {
    async function loadUser() {
      if (!isSignedIn) return;
      try {
        const res = await checkOnboardingStatus();
        if (res.business) {
          setCurrentUserBusiness(res.business);
        }
      } catch (err) {
        console.warn("[Insights] Error checking user onboarding:", err);
      }
    }
    loadUser();
  }, [isSignedIn]);

  // Fetch questions (Use Case 1)
  const loadQuestions = async () => {
    try {
      setLoading(true);
      const filterData: any = {};
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (selectedStatus && selectedStatus !== "all") {
        filterData.status = selectedStatus;
      }
      if (searchQuery && searchQuery.trim()) {
        filterData.search = searchQuery.trim();
      }
      if (selectedSort) {
        filterData.sortBy = selectedSort;
      }

      const data = await getQuestions({ data: filterData });
      setQuestions(data || []);
    } catch (err: any) {
      console.error("[Insights] Failed to load questions:", err);
      toast.error(err?.message || "Failed to load questions. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch knowledge insights (Use Case 2)
  const loadKnowledge = async () => {
    try {
      setLoading(true);
      const filterData: any = {};
      if (selectedTopic && selectedTopic !== "All") {
        filterData.topic = selectedTopic;
      }
      if (searchQuery && searchQuery.trim()) {
        filterData.search = searchQuery.trim();
      }

      const data = await getKnowledgeInsights({ data: filterData });
      setKnowledgeList(data || []);
    } catch (err: any) {
      console.error("[Insights] Failed to load knowledge insights:", err);
      toast.error(err?.message || "Failed to load knowledge insights. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "questions") {
      loadQuestions();
    } else {
      loadKnowledge();
    }
  }, [activeTab, selectedTopic, selectedStatus, selectedSort]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "questions") {
      loadQuestions();
    } else {
      loadKnowledge();
    }
  };

  // Handle "+ Ask a Question" click (Use Case 1)
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

  // Handle "+ Share an Insight" click (Use Case 2)
  const handleShareInsightClick = () => {
    if (isAdmin) {
      setAdminCreateKnowledgeOpen(true);
      return;
    }

    if (!isSignedIn) {
      toast.info("Please sign in to share an insight.");
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

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      {/* ═══════════════════════════════════════════════════════════════════
          PAGE HEADER & FEED CONTAINER
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                Insights
              </h1>
              <span className="inline-flex items-center text-[9.5px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/80">
                Verified B2B
              </span>
              {isAdmin && (
                <span className="inline-flex items-center text-[9.5px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/10 text-orange-700 border border-orange-300/60">
                  Admin Mode Active
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              {activeTab === "questions"
                ? "Real business questions, answered by businesses with practical experience."
                : "Practical knowledge from businesses with real experience."}
            </p>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setShareItem({
                  title: "The Relay Business Insights Exchange",
                  topic: activeTab === "questions" ? "Peer Questions" : "Knowledge Insights",
                  urlPath: `/insights?tab=${activeTab}`,
                  type: activeTab === "questions" ? "question" : "insight",
                })
              }
              className="h-10 px-3.5 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Share Feed</span>
              <span className="sm:hidden">Share</span>
            </Button>

            {activeTab === "questions" ? (
              <Button
                onClick={handleAskClick}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-10 px-5 rounded-[2px] shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Ask a Question
              </Button>
            ) : (
              <Button
                onClick={handleShareInsightClick}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-10 px-5 rounded-[2px] shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Share an Insight
              </Button>
            )}
          </div>
        </div>

        {/* Underline Sub-Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-mono uppercase tracking-wider">
          <button
            type="button"
            onClick={() => handleTabChange("questions")}
            className={`pb-3.5 -mb-px flex items-center gap-2 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "questions"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions</span>
            {questions.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-sans ${
                  activeTab === "questions"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200/80 text-slate-600"
                }`}
              >
                {questions.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("knowledge")}
            className={`pb-3.5 -mb-px flex items-center gap-2 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "knowledge"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Knowledge</span>
            {knowledgeList.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-sans ${
                  activeTab === "knowledge"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200/80 text-slate-600"
                }`}
              >
                {knowledgeList.length}
              </span>
            )}
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FILTER & SEARCH BAR
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="py-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder={
                activeTab === "questions"
                  ? "Search business questions..."
                  : "Search business knowledge..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-white border-slate-200 rounded-[3px] shadow-xs focus:bg-white focus:border-slate-800"
            />
          </form>

          {/* Topic, Status, and Sort Dropdowns */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            <div className="w-52 shrink-0">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="h-9 text-xs bg-white border-slate-200 rounded-[3px] shadow-xs">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {TOPIC_FILTERS.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value} className="text-xs">
                      {tf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status filter only for Questions */}
            {activeTab === "questions" && (
              <div className="w-32 shrink-0">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-9 text-xs bg-white border-slate-200 rounded-[3px] shadow-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="all" className="text-xs">
                      All Status
                    </SelectItem>
                    <SelectItem value="open" className="text-xs">
                      Open
                    </SelectItem>
                    <SelectItem value="closed" className="text-xs">
                      Closed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort filter only for Questions */}
            {activeTab === "questions" && (
              <div className="w-40 shrink-0">
                <Select value={selectedSort} onValueChange={(val: any) => setSelectedSort(val)}>
                  <SelectTrigger className="h-9 text-xs bg-white border-slate-200 rounded-[3px] shadow-xs">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="newest" className="text-xs">
                      Newest
                    </SelectItem>
                    <SelectItem value="perspectives" className="text-xs">
                      Most Perspectives
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedTopic !== "All" ||
              (activeTab === "questions" && (selectedStatus !== "all" || selectedSort !== "newest")) ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTopic("All");
                  setSelectedStatus("all");
                  setSelectedSort("newest");
                  setSearchQuery("");
                }}
                className="text-xs text-slate-400 hover:text-slate-700 underline underline-offset-4 px-1 shrink-0 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FEED CONTENT (QUESTIONS OR KNOWLEDGE)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="pt-2 pb-16">
        {loading ? (
          /* Loading Skeleton */
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-sm p-6 animate-pulse space-y-3"
              >
                <div className="h-4 bg-slate-100 rounded w-24" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : activeTab === "questions" ? (
          /* ═════════════════════════════════════════════════════════════════
              QUESTIONS LIST (USE CASE 1)
              ═════════════════════════════════════════════════════════════════ */
          questions.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-sm p-12 text-center max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {searchQuery || selectedTopic !== "All" || selectedStatus !== "all" || selectedSort !== "newest"
                  ? "No questions found"
                  : "No business questions have been shared yet."}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                {searchQuery || selectedTopic !== "All" || selectedStatus !== "all" || selectedSort !== "newest"
                  ? "No questions match your filter criteria. Try adjusting your filters or search term."
                  : isApprovedBusiness || isAdmin
                  ? "Be the first approved business to ask a practical question."
                  : "Questions from businesses will appear here."}
              </p>
              {searchQuery || selectedTopic !== "All" || selectedStatus !== "all" || selectedSort !== "newest" ? (
                <Button
                  onClick={() => {
                    setSelectedTopic("All");
                    setSelectedStatus("all");
                    setSelectedSort("newest");
                    setSearchQuery("");
                  }}
                  variant="outline"
                  className="text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px]"
                >
                  Reset Filters
                </Button>
              ) : isApprovedBusiness || isAdmin ? (
                <Button
                  onClick={handleAskClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px]"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Ask a Question
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3.5">
              {questions.map((q) => {
                const perspectiveCount = q._count?.perspectives ?? 0;
                const isClosed = q.status === "closed";
                const isMyQuestion =
                  currentUserBusiness && q.business_id === currentUserBusiness.id;

                return (
                  <div
                    key={q.id}
                    onClick={() => navigate({ to: "/insights/$id", params: { id: q.id } })}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate({ to: "/insights/$id", params: { id: q.id } });
                      }
                    }}
                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-sm p-5 sm:p-6 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.04)] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top row: Topic badge + Closed badge + Your Question badge + Relative time */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                            {q.topic}
                          </span>
                          {isClosed && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-amber-50 text-amber-700 border border-amber-200">
                              Closed
                            </span>
                          )}
                          {isMyQuestion && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-orange-50 text-orange-700 border border-orange-200">
                              Your Question
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(q.created_at)}</span>
                        </div>
                      </div>

                      {/* Question Title */}
                      <h2 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                        {q.title}
                      </h2>

                      {/* Question Description Snippet */}
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {q.description}
                      </p>

                      {/* Bottom row: Business info + Perspectives count */}
                      <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        {/* Business Identity */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CompanyLogo
                            src={q.business?.logo_url}
                            name={q.business?.company_name}
                            className="w-5 h-5 rounded object-contain border border-slate-200 shrink-0"
                            fallbackClassName="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200 shrink-0"
                            textClassName="text-[8px] font-mono font-bold tracking-tight"
                          />
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs truncate">
                            <span className="truncate">{q.business?.company_name || "Verified Business"}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 font-normal text-[11px] truncate">
                              {q.business?.industry}
                              {q.business?.hq_location ? ` · ${q.business.hq_location}` : ""}
                            </span>
                            <span
                              className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans shrink-0 ml-0.5"
                              title="Approved Business"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                              Approved
                            </span>
                          </div>
                        </div>

                        {/* Perspective count & Action links */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5 font-mono">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            {perspectiveCount === 0 ? (
                              <span className="text-slate-400">0 perspectives</span>
                            ) : (
                              <span>
                                {perspectiveCount}{" "}
                                {perspectiveCount === 1 ? "perspective" : "perspectives"}
                              </span>
                            )}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShareItem({
                                title: q.title,
                                topic: q.topic,
                                authorName: q.business?.company_name,
                                urlPath: `/insights/${q.id}`,
                                type: "question",
                              });
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 font-semibold py-1 px-1.5 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Share this question"
                          >
                            <Share2 className="w-3 h-3 text-orange-600" />
                            <span>Share</span>
                          </button>

                          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-900 group-hover:text-orange-600 font-bold ml-1 transition-colors">
                            View
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* ═════════════════════════════════════════════════════════════════
              KNOWLEDGE LIST (USE CASE 2)
              ═════════════════════════════════════════════════════════════════ */
          knowledgeList.length === 0 ? (
            /* Knowledge Empty State */
            <div className="bg-white border border-slate-200/80 rounded-sm p-12 text-center max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {searchQuery || selectedTopic !== "All"
                  ? "No knowledge insights found"
                  : "No business knowledge has been shared yet."}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                {searchQuery || selectedTopic !== "All"
                  ? "No knowledge insights match your filter criteria. Try adjusting your filters or search term."
                  : isApprovedBusiness || isAdmin
                  ? "Be the first approved business to share something you've learned."
                  : "Knowledge lessons from businesses will appear here."}
              </p>
              {searchQuery || selectedTopic !== "All" ? (
                <Button
                  onClick={() => {
                    setSelectedTopic("All");
                    setSearchQuery("");
                  }}
                  variant="outline"
                  className="text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px]"
                >
                  Reset Filters
                </Button>
              ) : isApprovedBusiness || isAdmin ? (
                <Button
                  onClick={handleShareInsightClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Share an Insight
                </Button>
              ) : null}
            </div>
          ) : (
            /* Knowledge Cards */
            <div className="space-y-3.5">
              {knowledgeList.map((k) => {
                const isMyKnowledge =
                  currentUserBusiness && k.business_id === currentUserBusiness.id;

                return (
                  <div
                    key={k.id}
                    onClick={() =>
                      navigate({
                        to: "/insights/knowledge/$id",
                        params: { id: k.id },
                      })
                    }
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate({
                          to: "/insights/knowledge/$id",
                          params: { id: k.id },
                        });
                      }
                    }}
                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-sm p-5 sm:p-6 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.04)] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top row: Topic badge + Your Insight badge + Relative time & reading time */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                            {k.topic}
                          </span>
                          {isMyKnowledge && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-orange-50 text-orange-700 border border-orange-200">
                              Your Insight
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(k.published_at || k.created_at)}</span>
                          <span className="text-slate-300">·</span>
                          <span>{calculateReadingTime(k.content)}</span>
                        </div>
                      </div>

                      {/* Knowledge Title */}
                      <h2 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                        {k.title}
                      </h2>

                      {/* Knowledge Description / Content Snippet */}
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {k.content}
                      </p>

                      {/* Bottom row: Business info + Based On / Action links */}
                      <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        {/* Business Identity */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CompanyLogo
                            src={k.business?.logo_url}
                            name={k.business?.company_name}
                            className="w-5 h-5 rounded object-contain border border-slate-200 shrink-0"
                            fallbackClassName="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200 shrink-0"
                            textClassName="text-[8px] font-mono font-bold tracking-tight"
                          />
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs truncate">
                            <span className="truncate">{k.business?.company_name || "Verified Business"}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 font-normal text-[11px] truncate">
                              {k.business?.industry}
                              {k.business?.hq_location ? ` · ${k.business.hq_location}` : ""}
                            </span>
                            <span
                              className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans shrink-0 ml-0.5"
                              title="Approved Business"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                              Approved
                            </span>
                          </div>
                        </div>

                        {/* Based on / Action links */}
                        <div className="flex items-center gap-3 shrink-0">
                          {k.based_on && (
                            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5 font-mono">
                              <Lightbulb className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-500 truncate max-w-[140px] sm:max-w-none">
                                {BASED_ON_LABELS[k.based_on] || k.based_on}
                              </span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShareItem({
                                title: k.title,
                                topic: k.topic,
                                authorName: k.business?.company_name,
                                urlPath: `/insights/knowledge/${k.id}`,
                                type: "insight",
                              });
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 font-semibold py-1 px-1.5 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Share this insight"
                          >
                            <Share2 className="w-3 h-3 text-orange-600" />
                            <span>Share</span>
                          </button>

                          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-900 group-hover:text-orange-600 font-bold ml-1 transition-colors">
                            Read
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ASK QUESTION MODAL (USE CASE 1)
          ═══════════════════════════════════════════════════════════════════ */}
      <AskQuestionDialog
        open={askModalOpen}
        onOpenChange={setAskModalOpen}
        onSuccess={() => {
          loadQuestions();
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          SHARE INSIGHT MODAL (USE CASE 2)
          ═══════════════════════════════════════════════════════════════════ */}
      <ShareInsightDialog
        open={shareInsightModalOpen}
        onOpenChange={setShareInsightModalOpen}
        onSuccess={() => {
          loadKnowledge();
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          ADMIN CREATE MODALS (SUPER ADMIN)
          ═══════════════════════════════════════════════════════════════════ */}
      {isAdmin && (
        <>
          <AdminCreateQuestionDialog
            open={adminCreateQuestionOpen}
            onOpenChange={setAdminCreateQuestionOpen}
            onSuccess={() => {
              loadQuestions();
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
              loadKnowledge();
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

      {/* Public Share Modal */}
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
