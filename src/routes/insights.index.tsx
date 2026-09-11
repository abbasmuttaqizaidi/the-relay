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
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { AskQuestionDialog } from "../components/insights/AskQuestionDialog";
import { ShareInsightDialog } from "../components/insights/ShareInsightDialog";
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

export function InsightsIndexPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();

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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dialog states
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [shareInsightModalOpen, setShareInsightModalOpen] = useState(false);

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
  }, [activeTab, selectedTopic, selectedStatus]);

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

    setAskModalOpen(true);
  };

  // Handle "+ Share an Insight" click (Use Case 2)
  const handleShareInsightClick = () => {
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

    setShareInsightModalOpen(true);
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
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              {activeTab === "questions"
                ? "Pose genuine business problems and get actionable perspectives grounded in real-world company experiences."
                : "Practical business lessons, tips, observations, and experiences shared by approved operators."}
            </p>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 flex items-center gap-3">
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
                  ? "Search questions or keywords..."
                  : "Search insights, lessons, or topics..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-white border-slate-200 rounded-[3px] shadow-xs focus:bg-white focus:border-slate-800"
            />
          </form>

          {/* Topic & Status Dropdowns */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            <div className="w-56 shrink-0">
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

            {(selectedTopic !== "All" ||
              (activeTab === "questions" && selectedStatus !== "all") ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTopic("All");
                  setSelectedStatus("all");
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
                No questions found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                {searchQuery || selectedTopic !== "All" || selectedStatus !== "all"
                  ? "No questions match your filter criteria. Try adjusting your filters or search term."
                  : "Be the first verified business to ask a question and tap into the network's collective experience."}
              </p>
              <Button
                onClick={handleAskClick}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px]"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Ask a Question
              </Button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {questions.map((q) => {
                const perspectiveCount = q._count?.perspectives ?? 0;
                const isClosed = q.status === "closed";

                return (
                  <div
                    key={q.id}
                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-sm p-5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.04)] group relative"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top row: Topic badge + Closed badge + Relative time */}
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                            {q.topic}
                          </span>
                          {isClosed && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-amber-50 text-amber-700 border border-amber-200">
                              Closed
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(q.created_at)}</span>
                        </div>
                      </div>

                      {/* Question Title */}
                      <Link
                        to="/insights/$id"
                        params={{ id: q.id }}
                        className="block group-hover:text-slate-900 focus:outline-none"
                      >
                        <h2 className="text-base font-semibold text-slate-900 tracking-tight leading-snug group-hover:underline group-hover:underline-offset-2">
                          {q.title}
                        </h2>
                      </Link>

                      {/* Question Description Snippet */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {q.description}
                      </p>

                      {/* Bottom row: Business info + Perspectives count */}
                      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        {/* Business Identity */}
                        <div className="flex items-center gap-2.5">
                          <CompanyLogo
                            src={q.business?.logo_url}
                            name={q.business?.company_name}
                            className="w-5 h-5 rounded object-contain border border-slate-200"
                            fallbackClassName="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200"
                            textClassName="text-[8px] font-mono font-bold tracking-tight"
                          />
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs">
                            <span>{q.business?.company_name || "Verified Business"}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 font-normal text-[11px]">
                              {q.business?.industry}
                              {q.business?.hq_location ? ` · ${q.business.hq_location}` : ""}
                            </span>
                            <span
                              className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans"
                              title="Approved Business"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                              Approved
                            </span>
                          </div>
                        </div>

                        {/* Perspective count & Link CTA */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
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

                          <Link
                            to="/insights/$id"
                            params={{ id: q.id }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-900 hover:text-slate-700 font-bold ml-2"
                          >
                            View
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </Link>
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
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700 mx-auto mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Knowledge is just getting started.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                {isApprovedBusiness
                  ? "Be among the first businesses to share something you've learned."
                  : "Check back soon for practical lessons from businesses on Relay."}
              </p>
              {isApprovedBusiness && (
                <Button
                  onClick={handleShareInsightClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Share an Insight
                </Button>
              )}
            </div>
          ) : (
            /* Knowledge Cards */
            <div className="space-y-4">
              {knowledgeList.map((k) => (
                <article
                  key={k.id}
                  onClick={() =>
                    navigate({
                      to: "/insights/knowledge/$id",
                      params: { id: k.id },
                    })
                  }
                  className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-sm p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Labels & Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider font-bold rounded bg-amber-500/10 text-amber-800 border border-amber-300/60">
                          INSIGHT
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider font-medium rounded bg-slate-100 text-slate-700 border border-slate-200/70">
                          {k.topic}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formatTimeAgo(k.created_at)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-slate-900 group-hover:underline group-hover:underline-offset-2 leading-snug">
                      {k.title}
                    </h2>

                    {/* Short Content Preview */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                      {k.content}
                    </p>
                  </div>

                  {/* Bottom Row: Author Business Identity + Based On */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    {/* Business Identity */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CompanyLogo
                        src={k.business?.logo_url}
                        name={k.business?.company_name}
                        className="w-5 h-5 rounded object-contain border border-slate-200"
                        fallbackClassName="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200"
                        textClassName="text-[8px] font-mono font-bold"
                      />
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs min-w-0">
                        <span className="font-semibold text-slate-900 truncate">
                          {k.business?.company_name || "Verified Business"}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-normal text-[11px] truncate">
                          {k.business?.industry}
                          {k.business?.hq_location ? ` · ${k.business.hq_location}` : ""}
                        </span>
                        <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans shrink-0">
                          <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                          Approved Business
                        </span>
                      </div>
                    </div>

                    {/* Based on / Read Link */}
                    <div className="flex items-center gap-3 shrink-0">
                      {k.based_on && (
                        <span className="text-[11px] text-slate-500 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                          Based on:{" "}
                          <span className="font-medium text-slate-700">
                            {BASED_ON_LABELS[k.based_on] || k.based_on}
                          </span>
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-900 font-bold ml-1">
                        Read
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
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
    </div>
  );
}
