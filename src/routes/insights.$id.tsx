import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Clock,
  MessageSquareQuote,
  MessageSquare,
  Building2,
  Lock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Users,
  Share2,
  Briefcase,
  MapPin,
  Calendar,
  Globe,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Eye,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getQuestionById } from "../functions/getQuestionById";
import { getQuestions } from "../functions/getQuestions";
import { closeQuestion } from "../functions/closeQuestion";
import { deletePerspective } from "../functions/deletePerspective";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { getCommunityProfile } from "../functions/communityProfile";
import { checkAdminSession } from "../functions/checkAdminSession";
import { recordInsightView } from "../functions/recordInsightView";
import { getOrCreateVisitorId, getDeviceHardwareFingerprint, hasViewedLocally, markViewedLocally } from "@/lib/visitor";
import { getSessionReferrer } from "@/lib/traffic-source";
import { AskQuestionDialog } from "../components/insights/AskQuestionDialog";
import { SharePerspectiveDialog } from "../components/insights/SharePerspectiveDialog";
import { ShareModal } from "../components/insights/ShareModal";
import { QuestionContentRenderer } from "../components/insights/QuestionContentRenderer";
import { AdminIncreaseViewsDialog } from "../components/admin/AdminIncreaseViewsDialog";
import { CompanyLogo } from "../components/company-logo";
import { InsightDiscussionSection } from "../components/insights/InsightDiscussionSection";
import { InsightsPublicAuthPromptModal } from "../components/insights/InsightsPublicAuthPromptModal";
import { CommunityContributorAuthModal } from "../components/insights/CommunityContributorAuthModal";
import {
  hasGlobalAuthPromptBeenShown,
  markGlobalAuthPromptShown,
  shouldSkipAuthPrompt,
  isUserLikelyAuthenticated,
  getPendingCommentSession,
  getArticleCommentDraft,
  clearArticleCommentDraft,
  clearPendingCommentSession,
} from "@/lib/discussion-session";
import { Question, Perspective, Business, DesiredPerspective } from "../types";
import { createSeoMeta, createArticleSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/insights/$id")({
  loader: async ({ params }) => {
    try {
      const question = await getQuestionById({
        data: { question_id: params.id },
      });
      return { question };
    } catch {
      return { question: null };
    }
  },
  head: ({ loaderData, params }) => {
    const title = loaderData?.question?.title
      ? `${loaderData.question.title} — The Relay Insights`
      : "Business Question & Perspectives — The Relay";
    const snippet = loaderData?.question?.description
      ? loaderData.question.description.slice(0, 160).replace(/\n/g, " ") + "..."
      : "Peer perspectives and practical business answers from verified operators on The Relay.";
    const author = loaderData?.question?.business?.company_name
      ? ` Asked by ${loaderData.question.business.company_name}.`
      : "";
    const description = `${snippet}${author}`;

    const canonicalSlug = loaderData?.question?.slug || params.id;
    return {
      meta: createSeoMeta({
        title,
        description,
        canonicalPath: `/insights/${canonicalSlug}`,
        ogType: "article",
      }),
    };
  },
  component: QuestionDetailPage,
});

const DESIRED_PERSPECTIVE_LABELS: Record<DesiredPerspective, string> = {
  any_business: "Any business with relevant insights",
  same_industry: "Businesses in the same industry only",
  similar_customers: "Businesses serving similar customers",
  relevant_experience: "Businesses with direct relevant experience",
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatCompactNumber(num: number = 0): string {
  if (!num) return "0";
  if (num < 1000) return num.toString();
  if (num < 1000000) {
    const val = num / 1000;
    return `${parseFloat(val.toFixed(1))}k`;
  }
  const val = num / 1000000;
  return `${parseFloat(val.toFixed(1))}m`;
}

function formatPublishedDate(dateStr?: string | Date | null): string {
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
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  } catch {
    return "";
  }
}

export function QuestionDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserBusiness, setCurrentUserBusiness] = useState<Business | null>(null);
  const [viewsCount, setViewsCount] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [increaseViewsOpen, setIncreaseViewsOpen] = useState(false);

  // Public user discussion authentication prompt modal state
  const [publicAuthPromptOpen, setPublicAuthPromptOpen] = useState(false);
  const [contributorModalOpen, setContributorModalOpen] = useState(false);

  // Automatically prompt public users once per session across the entire app
  useEffect(() => {
    if (!isLoaded || isSignedIn || isUserLikelyAuthenticated()) return;
    if (shouldSkipAuthPrompt({ isAdmin, isSignedIn })) return;

    const timer = setTimeout(() => {
      if (!isSignedIn && !isUserLikelyAuthenticated() && !shouldSkipAuthPrompt({ isAdmin, isSignedIn })) {
        setPublicAuthPromptOpen(true);
        markGlobalAuthPromptShown();
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, id, isAdmin]);

  // Guard: If authenticated, immediately close any auth prompt modal and mark shown
  useEffect(() => {
    if (isSignedIn || isUserLikelyAuthenticated()) {
      setPublicAuthPromptOpen(false);
      setContributorModalOpen(false);
      markGlobalAuthPromptShown();
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

  // Check admin session
  useEffect(() => {
    const hasAdminCookie =
      typeof document !== "undefined" && document.cookie.includes("relay_admin_token=");
    if (hasAdminCookie) {
      checkAdminSession()
        .then((res) => {
          if (res?.isAdmin) setIsAdmin(true);
        })
        .catch(() => {});
    }
  }, []);

  // Dialog states
  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const [sharePerspectiveOpen, setSharePerspectiveOpen] = useState(false);
  const [perspectiveToEdit, setPerspectiveToEdit] = useState<Perspective | null>(null);
  const [deletePerspectiveId, setDeletePerspectiveId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [businessSheetOpen, setBusinessSheetOpen] = useState(false);
  const [expandedPerspectiveIds, setExpandedPerspectiveIds] = useState<Set<string>>(new Set());

  // Fetch current user business profile
  useEffect(() => {
    async function loadUser() {
      if (!isSignedIn) return;
      try {
        const res = await checkOnboardingStatus();
        if (res.business) {
          setCurrentUserBusiness(res.business);
        }
      } catch (err) {
        console.warn("[QuestionDetailPage] Error fetching user:", err);
      }
    }
    loadUser();
  }, [isSignedIn]);

  // Fetch question details & related questions
  const loadQuestionData = async () => {
    try {
      setLoading(true);
      const data = await getQuestionById({
        data: { question_id: id },
      });
      setQuestion(data);
      setViewsCount(data?.views ?? 0);

      // Fetch related questions based on topic
      if (data?.topic) {
        try {
          const related = await getQuestions({
            data: { topic: data.topic, limit: 4 },
          });
          setRelatedQuestions(
            (related || []).filter((q) => q.id !== data.id).slice(0, 3),
          );
        } catch (relErr) {
          console.warn("[QuestionDetailPage] Error fetching related questions:", relErr);
        }
      }
    } catch (err: any) {
      console.error("[QuestionDetailPage] Failed to load question:", err);
      toast.error("Failed to load question details.");
      navigate({ to: "/insights", search: { tab: "questions" } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestionData();
  }, [id]);

  // Record strictly deduplicated view for members and non-members
  useEffect(() => {
    if (!question?.id) return;
    // Poster / owner viewing their own question does not count as a view
    if (currentUserBusiness && currentUserBusiness.id === question.business_id) return;

    if (hasViewedLocally("question", question.id)) return;

    const vid = getOrCreateVisitorId();
    const dfp = getDeviceHardwareFingerprint();
    const ref = getSessionReferrer();
    markViewedLocally("question", question.id);

    recordInsightView({
      data: {
        item_id: question.id,
        item_type: "question",
        visitor_id: vid,
        device_fingerprint: dfp,
        referrer: ref,
      },
    })
      .then((res) => {
        if (res?.success && typeof res.totalViews === "number") {
          setViewsCount(res.totalViews);
        }
      })
      .catch((err) => {
        console.warn("[QuestionDetailPage] View record failed:", err);
      });
  }, [question?.id, currentUserBusiness?.id]);

  // Computed permissions
  const isQuestionOwner = currentUserBusiness && question && currentUserBusiness.id === question.business_id;
  const isQuestionClosed = question?.status === "closed";
  const userPerspective = question?.perspectives?.find(
    (p) => currentUserBusiness && p.business_id === currentUserBusiness.id,
  );
  const hasUserResponded = !!userPerspective;
  const isPublicVisitor = !isSignedIn || !currentUserBusiness || currentUserBusiness.status !== "approved";

  // Handle closing question
  const handleConfirmCloseQuestion = async () => {
    if (!question) return;
    try {
      setClosing(true);
      await closeQuestion({
        data: { question_id: question.id },
      });
      toast.success("Question closed to new perspectives.");
      setCloseConfirmOpen(false);
      loadQuestionData();
    } catch (err: any) {
      console.error("[QuestionDetailPage] Failed to close question:", err);
      toast.error(err.message || "Failed to close question.");
    } finally {
      setClosing(false);
    }
  };

  // Handle deleting perspective
  const handleConfirmDeletePerspective = async () => {
    if (!deletePerspectiveId) return;
    try {
      setDeleting(true);
      await deletePerspective({
        data: { perspective_id: deletePerspectiveId },
      });
      toast.success("Perspective deleted.");
      setDeletePerspectiveId(null);
      loadQuestionData();
    } catch (err: any) {
      console.error("[QuestionDetailPage] Failed to delete perspective:", err);
      toast.error(err.message || "Failed to delete perspective.");
    } finally {
      setDeleting(false);
    }
  };

  // Handle "+ Share Your Perspective" click
  const handleSharePerspectiveClick = () => {
    if (!isSignedIn) {
      toast.info("Please sign in to share a perspective.");
      navigate({ to: "/login" });
      return;
    }

    if (!currentUserBusiness) {
      toast.info("Please complete your business profile before sharing a perspective.");
      navigate({ to: "/onboarding" });
      return;
    }

    if (currentUserBusiness.status !== "approved") {
      toast.error(
        `Your business profile is currently "${currentUserBusiness.status}". Only approved businesses can share perspectives.`,
      );
      return;
    }

    if (isQuestionOwner) {
      toast.error("You cannot share a perspective on your own question.");
      return;
    }

    if (isQuestionClosed) {
      toast.error("This question is closed to new perspectives.");
      return;
    }

    if (hasUserResponded) {
      // Open edit instead
      setPerspectiveToEdit(userPerspective);
      setSharePerspectiveOpen(true);
      return;
    }

    setPerspectiveToEdit(null);
    setSharePerspectiveOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 animate-pulse">
          <div className="h-4 w-28 bg-slate-200 rounded" />
          <div className="space-y-3">
            <div className="h-10 w-full bg-slate-200 rounded" />
            <div className="h-10 w-4/5 bg-slate-200 rounded" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-11 h-11 bg-slate-200 rounded shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-36 bg-slate-200 rounded" />
              <div className="h-3 w-48 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-11/12" />
            <div className="h-4 bg-slate-100 rounded w-4/5" />
            <div className="h-4 bg-slate-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-white py-20 text-center">
        <p className="text-sm text-slate-500">Question not found.</p>
        <Link
          to="/insights"
          search={{ tab: "questions" } as any}
          className="mt-4 inline-block text-xs font-mono text-slate-900 underline"
        >
          Back to Questions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-28">
      {/* Article JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createArticleSchema({
              title: question.title,
              description: question.description?.slice(0, 160) || "",
              path: `/insights/${id}`,
              datePublished: question.created_at,
              dateModified: question.updated_at || question.created_at,
              authorName: question.business?.company_name || "The Relay Editorial Team",
            })
          ),
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          1. TOP NAVIGATION / BREADCRUMB
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xs sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/insights"
            search={{ tab: "questions" } as any}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Questions</span>
          </Link>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="h-8 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Share</span>
            </Button>

            {isQuestionOwner && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate({ to: "/insights/ask", search: { edit: question.id } })}
                  className="h-8 text-xs font-mono border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit Question</span>
                </Button>
                {!isQuestionClosed && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCloseConfirmOpen(true)}
                    className="h-8 text-xs font-mono border-amber-200 text-amber-800 hover:bg-amber-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Close</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          2. MAIN EDITORIAL ARTICLE CANVAS (NO BOXED CARD)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN: MAIN ARTICLE CANVAS & DISCUSSION (8 cols)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 min-w-0">
            {/* Closed Notice */}
            {isQuestionClosed && (
              <div className="mb-6 p-3.5 bg-amber-50/90 border border-amber-200 rounded flex items-center gap-2.5 text-xs text-amber-800 font-sans">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  This question is currently <strong>closed</strong> to new perspectives. Existing perspectives remain visible for reference.
                </span>
              </div>
            )}

            {/* Topic & Status Label */}
            <div className="mb-1.5 sm:mb-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] font-bold text-orange-600">
                {question.topic}
              </span>
              {isQuestionClosed && (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Closed
                </span>
              )}
              {isQuestionOwner && (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-orange-50 text-orange-700 border border-orange-200">
                  Your Question
                </span>
              )}
            </div>

            {/* Large Editorial Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-slate-950 leading-[1.18] sm:leading-[1.14] font-display mb-3.5 sm:mb-4">
              {question.title}
            </h1>

            {/* Author Info, Date, Perspectives, Views */}
            <div className="py-3 sm:py-3.5 border-y border-slate-200/80 flex items-center mb-4 sm:mb-5">
              <div className="flex items-center gap-3.5">
                <CompanyLogo
                  src={question.business?.logo_url}
                  name={question.business?.company_name}
                  className="w-11 h-11 rounded object-contain border border-slate-200 p-0.5 shrink-0 bg-white"
                  fallbackClassName="w-11 h-11 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200 shrink-0"
                  textClassName="text-xs font-mono font-bold"
                />
                <div>
                  {/* Row 1: Business identity + seal */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 font-sans">
                      {question.business?.company_name || "Verified Business"}
                    </span>
                    <span title="Verified Enterprise">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    </span>
                    <span className="hidden sm:inline text-[11px] font-mono text-slate-400">Approved Business</span>
                  </div>

                  {/* Row 2: Date · Perspectives · Views */}
                  <div className="text-xs text-slate-500 font-sans mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>{formatPublishedDate(question.created_at)}</span>
                    <span>·</span>
                    <span>
                      {question.perspectives?.length || 0} {(question.perspectives?.length || 0) === 1 ? "Perspective" : "Perspectives"}
                    </span>
                    <span>·</span>
                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={() => setIncreaseViewsOpen(true)}
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-1.5 py-0.5 rounded font-mono text-[11px] cursor-pointer transition-colors"
                        title="Admin: Boost Views"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatCompactNumber(viewsCount)}</span>
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatCompactNumber(viewsCount)}</span>
                      </span>
                    )}
                  </div>

                  {/* Row 3: Industry or topic */}
                  {(question.business?.industry || question.topic) && (
                    <div className="text-xs text-slate-500 font-sans mt-0.5">
                      <span>{question.business?.industry || question.topic}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Content Body */}
            <article className="pb-8 [&_p:first-child]:mt-0 [&>*:first-child]:mt-0">
              <QuestionContentRenderer
                contentJson={question.context_content_json}
                plainTextFallback={question.description}
                className="text-base text-slate-800 leading-relaxed font-normal"
              />
            </article>

            {/* Desired Perspective Callout */}
            {question.desired_perspective && (
              <div className="mb-8 p-4 bg-slate-50 border border-slate-200/80 rounded flex items-start gap-3">
                <Users className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 block mb-0.5">
                    Who I'd most like to hear from:
                  </span>
                  <span className="text-xs text-slate-600">
                    {DESIRED_PERSPECTIVE_LABELS[question.desired_perspective] ||
                      question.desired_perspective}
                  </span>
                </div>
              </div>
            )}

            {/* Perspectives Section */}
            <div className="space-y-4 pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="w-5 h-5 text-slate-600" />
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 font-sans">
                    Perspectives
                    <span className="ml-2 text-xs font-mono font-normal text-slate-400">
                      ({question.perspectives?.length || 0})
                    </span>
                  </h2>
                </div>

                {/* Share Perspective CTA Button */}
                {!isQuestionClosed && !isQuestionOwner && (
                  <div className={isPublicVisitor ? "hidden sm:block" : "block"}>
                    {hasUserResponded ? (
                      <Button
                        onClick={() => {
                          setPerspectiveToEdit(userPerspective || null);
                          setSharePerspectiveOpen(true);
                        }}
                        variant="outline"
                        className="h-9 text-xs font-mono uppercase tracking-wider border-slate-300 text-slate-800 hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                        Edit Your Perspective
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSharePerspectiveClick}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-4 rounded-[2px] shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Share Your Perspective
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Perspectives List */}
              {(!question.perspectives || question.perspectives.length === 0) ? (
                /* Empty state */
                <div className="bg-white border border-slate-200/80 rounded-sm p-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    No perspectives shared yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
                    Be the first approved business to share practical lessons, experiences, or recommendations.
                  </p>
                  {!isQuestionClosed && !isQuestionOwner && (
                    <Button
                      onClick={handleSharePerspectiveClick}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-8 px-4 rounded-[2px] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Share Your Perspective
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {question.perspectives.map((perspective) => {
                    const isMyPerspective =
                      currentUserBusiness && perspective.business_id === currentUserBusiness.id;

                    return (
                      <div
                        key={perspective.id}
                        className={`bg-white border rounded-sm p-6 sm:p-7 space-y-4 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
                          isMyPerspective
                            ? "border-slate-400/80 ring-1 ring-slate-400/20"
                            : "border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        {/* Perspective Author Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <CompanyLogo
                              src={perspective.business?.logo_url}
                              name={perspective.business?.company_name}
                              className="w-8 h-8 rounded object-contain border border-slate-200 p-0.5"
                              fallbackClassName="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] uppercase border border-slate-200"
                              textClassName="text-[10px] font-mono font-bold"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                                  {perspective.business?.company_name}
                                </span>
                                <span title="Verified Business">
                                  <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" />
                                </span>
                                {isMyPerspective && (
                                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-white px-1.5 py-0.2 rounded font-semibold ml-1">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                                {perspective.business?.industry}
                                {perspective.business?.hq_location
                                  ? ` · ${perspective.business.hq_location}`
                                  : ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-start sm:self-auto text-xs text-slate-400">
                            <span className="text-[11px] font-mono">
                              {formatDate(perspective.created_at)}
                            </span>

                            {isMyPerspective && (
                              <div className="flex items-center gap-1.5 ml-1">
                                <button
                                  onClick={() => {
                                    setPerspectiveToEdit(perspective);
                                    setSharePerspectiveOpen(true);
                                  }}
                                  className="text-slate-500 hover:text-slate-900 p-1 transition-colors cursor-pointer"
                                  title="Edit perspective"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeletePerspectiveId(perspective.id)}
                                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                                  title="Delete perspective"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Perspective Content */}
                        {(() => {
                          const isLongContent =
                            perspective.content.length > 320 ||
                            (perspective.content.match(/\n/g) || []).length >= 4;
                          const isExpanded = expandedPerspectiveIds.has(perspective.id);

                          return (
                            <div className="py-1">
                              <div
                                className={`text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line space-y-3 font-normal ${
                                  isLongContent && !isExpanded ? "line-clamp-4" : ""
                                }`}
                              >
                                {perspective.content}
                              </div>

                              {isLongContent && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setExpandedPerspectiveIds((prev) => {
                                      const next = new Set(prev);
                                      if (next.has(perspective.id)) next.delete(perspective.id);
                                      else next.add(perspective.id);
                                      return next;
                                    });
                                  }}
                                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer select-none"
                                >
                                  <span>{isExpanded ? "Show less" : "See more"}</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })()}

                        {/* Context & Qualification Section */}
                        <div className="pt-3 border-t border-slate-100 space-y-2.5">
                          {/* Why we're qualified */}
                          <div className="p-3 bg-slate-50/80 border border-slate-200/70 rounded space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-700 block">
                              Why We're Qualified
                            </span>
                            <p className="text-xs text-slate-700 italic leading-relaxed">
                              "{perspective.qualification}"
                            </p>
                          </div>

                          {/* Based on context */}
                          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
                              Based on:
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80 text-[11px] font-medium font-sans">
                              {perspective.based_on}
                            </span>
                            {perspective.relevant_experience && (
                              <>
                                <span className="text-slate-300">·</span>
                                <span className="text-slate-500 text-xs font-normal">
                                  {perspective.relevant_experience}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Discussion & Comments Section */}
            <div className="pt-8">
              <InsightDiscussionSection
                itemType="question"
                itemId={question.id}
                itemTitle={question.title}
                currentUserBusiness={currentUserBusiness}
                isSignedIn={isSignedIn}
                isAdmin={isAdmin}
              />
            </div>

            {/* The Relay Insights Conversion Block */}
            <div className="py-12 border-t border-slate-200/80">
              <div className="p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-[4px] text-center space-y-4 shadow-sm">
                <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-orange-400 font-bold block">
                  The Relay Insights
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Practical knowledge and perspectives from verified businesses.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
                  Connect with vetted operators, exchange high-value business opportunities, and share lessons without social media noise.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-[2px] transition-colors shadow-xs"
                  >
                    Join The Relay
                  </Link>
                  <Link
                    to="/insights"
                    search={{ tab: "questions" } as any}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-semibold border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-4 py-2.5 rounded-[2px] transition-colors"
                  >
                    Explore Insights
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT SIDEBAR: ASKED BY & RELATED QUESTIONS (4 cols)
              ═══════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* 1. Author / Asked By Profile Card */}
            {question.business && (
              <div className="bg-white border border-slate-200/90 rounded-sm p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    Asked By
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CompanyLogo
                    src={question.business.logo_url}
                    name={question.business.company_name}
                    className="w-10 h-10 rounded object-contain border border-slate-200 p-0.5 shrink-0 bg-white"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-semibold text-sm text-slate-900 truncate">
                        {question.business.company_name}
                      </h3>
                      <span title="Verified Enterprise">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {question.business.industry || "Relay Verified Member"}
                    </div>
                  </div>
                </div>
                {question.business.description && (
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-2 border-t border-slate-100">
                    {question.business.description}
                  </p>
                )}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-sans">
                  {question.business.hq_location && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{question.business.hq_location}</span>
                    </div>
                  )}
                  {question.business.company_size && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{question.business.company_size} employees</span>
                    </div>
                  )}
                  {question.business.founded_year && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Founded in {question.business.founded_year}</span>
                    </div>
                  )}
                  {question.business.website && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a
                        href={
                          question.business.website.startsWith("http")
                            ? question.business.website
                            : `https://${question.business.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {question.business.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </div>
                  )}
                </div>

                {/* Opportunities CTA Box */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded space-y-2.5 mt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block">
                      Opportunities
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      Join to know opportunities posted by this business
                    </p>
                  </div>
                  {isSignedIn ? (
                    <Link
                      to="/opportunities"
                      search={{ search: question.business?.company_name } as any}
                      className="inline-flex items-center justify-center w-full text-xs font-mono uppercase tracking-wider font-bold bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-[2px] transition-colors"
                    >
                      View Opportunities
                    </Link>
                  ) : (
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center w-full text-xs font-mono uppercase tracking-wider font-bold bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-[2px] transition-colors"
                    >
                      Join The Relay
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* 2. Related Questions Sidebar Card (matches Related Knowledge) */}
            {relatedQuestions.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-sm p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-bold">
                    Related Questions
                  </span>
                  <Link
                    to="/insights"
                    search={{ tab: "questions" } as any}
                    className="text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-orange-600 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {relatedQuestions.map((rq) => {
                    const pCount = rq._count?.perspectives ?? 0;
                    return (
                      <Link
                        key={rq.id}
                        to="/insights/$id"
                        params={{ id: rq.slug || rq.id }}
                        className="block pt-4 first:pt-0 group space-y-2 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[9.5px] font-mono uppercase font-bold text-orange-700 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded">
                            {rq.topic}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            • {pCount} {pCount === 1 ? "answer" : "answers"}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug font-sans">
                          {rq.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                          {rq.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                          <span className="truncate max-w-[200px] text-slate-600 font-sans font-medium">
                            {rq.business?.company_name || "Verified Business"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Target Perspective Metadata Card */}
            {question.desired_perspective && (
              <div className="bg-white border border-slate-200/90 rounded-sm p-4 space-y-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-bold block">
                  Target Perspective
                </span>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                  <span>
                    {DESIRED_PERSPECTIVE_LABELS[question.desired_perspective] ||
                      question.desired_perspective}
                  </span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          MODALS & CONFIRMATIONS
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Edit Question Dialog */}
      <AskQuestionDialog
        open={editQuestionOpen}
        onOpenChange={setEditQuestionOpen}
        questionToEdit={question}
        onSuccess={() => {
          loadQuestionData();
        }}
      />

      {/* Share / Edit Perspective Dialog */}
      <SharePerspectiveDialog
        open={sharePerspectiveOpen}
        onOpenChange={setSharePerspectiveOpen}
        questionId={question.id}
        questionTitle={question.title}
        perspectiveToEdit={perspectiveToEdit}
        onSuccess={() => {
          loadQuestionData();
        }}
      />

      {/* Close Question Confirmation Dialog */}
      <AlertDialog open={closeConfirmOpen} onOpenChange={setCloseConfirmOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Close Question?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-xs leading-relaxed">
              Once closed, no new perspectives can be posted to this question. Existing perspectives will remain publicly visible for reference.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={closing}
              className="text-xs uppercase font-mono tracking-wider"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCloseQuestion}
              disabled={closing}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs uppercase font-mono tracking-wider"
            >
              {closing ? "Closing..." : "Close Question"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Perspective Confirmation Dialog */}
      <AlertDialog
        open={!!deletePerspectiveId}
        onOpenChange={(open) => !open && setDeletePerspectiveId(null)}
      >
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete Perspective?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-xs leading-relaxed">
              Are you sure you want to delete your perspective? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              className="text-xs uppercase font-mono tracking-wider"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeletePerspective}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase font-mono tracking-wider"
            >
              {deleting ? "Deleting..." : "Delete Perspective"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Public Share Modal */}
      {question && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          title={question.title}
          topic={question.topic}
          authorName={question.business?.company_name}
          urlPath={`/insights/${question.slug || question.id}`}
          type="question"
        />
      )}

      {/* Mobile Business Details Slider / Popup */}
      <Sheet open={businessSheetOpen} onOpenChange={setBusinessSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl max-h-[85vh] overflow-y-auto p-6 bg-white border-slate-200 shadow-2xl max-w-lg mx-auto font-sans"
        >
          {/* Drag handle */}
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-2 mb-4" />

          <SheetHeader className="text-left space-y-3 pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3.5">
              <CompanyLogo
                src={question?.business?.logo_url}
                name={question?.business?.company_name}
                className="w-12 h-12 rounded object-contain border border-slate-200 p-0.5 shrink-0 bg-white"
                fallbackClassName="w-12 h-12 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm uppercase border border-slate-200 shrink-0"
                textClassName="text-sm font-mono font-bold"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <SheetTitle className="text-base sm:text-lg font-bold text-slate-900 truncate font-sans">
                    {question?.business?.company_name}
                  </SheetTitle>
                  <BadgeCheck className="w-4 h-4 text-white fill-[#1877f2] shrink-0 animate-badge-shine" />
                </div>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded font-sans">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#1877f2] shrink-0" />
                    Approved by Relay manually
                  </span>
                </div>
              </div>
            </div>
            <SheetDescription className="text-xs text-slate-500 font-sans">
              Verified business operator profile on The Relay B2B Network.
            </SheetDescription>
          </SheetHeader>

          <div className="py-4 space-y-4 font-sans text-xs text-slate-600">
            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded border border-slate-200/70">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                  Industry
                </span>
                <span className="font-semibold text-slate-800 text-xs">
                  {question?.business?.industry || "—"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                  Location
                </span>
                <span className="font-semibold text-slate-800 text-xs">
                  {question?.business?.hq_location || "—"}
                </span>
              </div>
              {question?.business?.company_size && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                    Team Size
                  </span>
                  <span className="font-semibold text-slate-800 text-xs">
                    {question.business.company_size} employees
                  </span>
                </div>
              )}
              {question?.business?.founded_year && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                    Founded
                  </span>
                  <span className="font-semibold text-slate-800 text-xs">
                    {question.business.founded_year}
                  </span>
                </div>
              )}
            </div>

            {/* Website */}
            {question?.business?.website && (
              <div className="flex items-center gap-2 text-xs">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a
                  href={
                    question.business.website.startsWith("http")
                      ? question.business.website
                      : `https://${question.business.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {question.business.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </div>
            )}

            {/* Description */}
            {question?.business?.description && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  About Company
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {question.business.description}
                </p>
              </div>
            )}

            {/* Opportunities Card */}
            <div className="p-4 bg-slate-900 text-white rounded-[4px] space-y-3 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold block">
                  Opportunities
                </span>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  Join to know opportunities posted by this business
                </p>
              </div>
              {isSignedIn ? (
                <Link
                  to="/opportunities"
                  search={{ search: question?.business?.company_name } as any}
                  onClick={() => setBusinessSheetOpen(false)}
                  className="inline-flex items-center justify-center w-full text-xs font-mono uppercase tracking-wider font-bold bg-orange-600 hover:bg-orange-500 text-white px-3 py-2.5 rounded-[2px] transition-colors"
                >
                  Explore Opportunities
                </Link>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setBusinessSheetOpen(false)}
                  className="inline-flex items-center justify-center w-full text-xs font-mono uppercase tracking-wider font-bold bg-orange-600 hover:bg-orange-500 text-white px-3 py-2.5 rounded-[2px] transition-colors"
                >
                  Join The Relay
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {isAdmin && question && (
        <AdminIncreaseViewsDialog
          open={increaseViewsOpen}
          onOpenChange={setIncreaseViewsOpen}
          item={{
            id: question.id,
            title: question.title,
            type: "question",
            currentViews: viewsCount,
          }}
          onSuccess={loadQuestionData}
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
        tabName="questions"
      />

      {/* 3-Screen Contributor Profile Setup Modal */}
      <CommunityContributorAuthModal
        open={contributorModalOpen}
        onOpenChange={setContributorModalOpen}
        pendingComment={getPendingCommentSession(id)?.content || getArticleCommentDraft(id) || ""}
        parentId={getPendingCommentSession(id)?.parentId || null}
        itemType="question"
        itemId={id}
        itemTitle={question?.title || "Business Question"}
        onCommentPublished={() => {
          clearArticleCommentDraft(id);
          clearPendingCommentSession(id);
          loadQuestionData();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("relay_comment_published", { detail: { itemId: id } }));
          }
        }}
      />
    </div>
  );
}
