import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { AskQuestionDialog } from "../components/insights/AskQuestionDialog";
import { SharePerspectiveDialog } from "../components/insights/SharePerspectiveDialog";
import { ShareModal } from "../components/insights/ShareModal";
import { QuestionContentRenderer } from "../components/insights/QuestionContentRenderer";
import { CompanyLogo } from "../components/company-logo";
import { Question, Perspective, Business, DesiredPerspective } from "../types";

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
  head: ({ loaderData }) => {
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

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
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

export function QuestionDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserBusiness, setCurrentUserBusiness] = useState<Business | null>(null);

  // Dialog states
  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const [sharePerspectiveOpen, setSharePerspectiveOpen] = useState(false);
  const [perspectiveToEdit, setPerspectiveToEdit] = useState<Perspective | null>(null);
  const [deletePerspectiveId, setDeletePerspectiveId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

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
      <div className="min-h-screen bg-[#FDFDFD] py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-6 w-36 bg-slate-100 rounded animate-pulse" />
          <div className="bg-white border border-slate-200 rounded-sm p-8 space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-20" />
            <div className="h-8 bg-slate-100 rounded w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="h-20 bg-slate-100 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-24">
      {/* ═══════════════════════════════════════════════════════════════════
          BREADCRUMB & TOP NAV
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/insights"
            search={{ tab: "questions" }}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-slate-900 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Questions
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
              {question.topic}
            </span>
            {isQuestionClosed ? (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-amber-50 text-amber-700 border border-amber-200">
                Closed
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Open
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="h-7 text-[10px] font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer ml-1 shadow-2xs"
            >
              <Share2 className="w-3 h-3 text-orange-600" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* ═══════════════════════════════════════════════════════════════════
            MAIN QUESTION CARD
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200/90 rounded-sm p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          {/* Top row: Topic badge, Status, Your Question indicator, and Owner actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                {question.topic}
              </span>
              {isQuestionClosed ? (
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Closed
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Open
                </span>
              )}
              {isQuestionOwner && (
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded bg-orange-50 text-orange-700 border border-orange-200">
                  Your Question
                </span>
              )}
            </div>

            {/* Owner action controls */}
            {isQuestionOwner && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate({ to: "/insights/ask", search: { edit: question.id } })}
                  className="h-7 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                {!isQuestionClosed && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCloseConfirmOpen(true)}
                    className="h-7 text-xs font-mono uppercase tracking-wider border-amber-200 text-amber-800 hover:bg-amber-50 cursor-pointer"
                  >
                    <Lock className="w-3 h-3 mr-1" />
                    Close Question
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Dominant Question Title & Description */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight font-sans">
              {question.title}
            </h1>
            <QuestionContentRenderer
              contentJson={question.context_content_json}
              plainTextFallback={question.description}
              className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
            />
          </div>

          {/* Asking Business Credentials Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CompanyLogo
                src={question.business?.logo_url}
                name={question.business?.company_name}
                className="w-10 h-10 rounded object-contain border border-slate-200 p-0.5"
                fallbackClassName="w-10 h-10 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200"
                textClassName="text-xs font-mono font-bold"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-900">
                    {question.business?.company_name}
                  </span>
                  <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-sans">
                    <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                    Approved Business
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-normal">
                  <span>{question.business?.industry}</span>
                  {question.business?.hq_location && (
                    <>
                      <span>·</span>
                      <span>{question.business.hq_location}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>Posted {formatDate(question.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Share button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="h-8 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Share</span>
            </Button>
          </div>

          {/* Desired Perspective section (if set) */}
          {question.desired_perspective && (
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded flex items-start gap-3">
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

          {/* Closed status banner */}
          {isQuestionClosed && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded flex items-center gap-2.5 text-xs text-amber-800">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                This question is closed to new perspectives. Existing perspectives remain visible.
              </span>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            PERSPECTIVES SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
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
                            <span className="inline-flex items-center text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans">
                              <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                              Approved
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
                    <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line space-y-3 font-normal py-1">
                      {perspective.content}
                    </div>

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

          {/* Related Questions */}
          {relatedQuestions.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700">
                  Related Questions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedQuestions.map((rq) => {
                  const pCount = rq._count?.perspectives ?? 0;
                  return (
                    <Link
                      key={rq.id}
                      to="/insights/$id"
                      params={{ id: rq.id }}
                      className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-sm p-4 transition-all shadow-2xs hover:shadow-xs group flex flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider font-semibold text-slate-500">
                          {rq.topic}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                          {rq.title}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span className="truncate max-w-[120px]">
                          {rq.business?.company_name || "Verified Business"}
                        </span>
                        <span>
                          {pCount} {pCount === 1 ? "perspective" : "perspectives"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Public Visitor Welcome Banner */}
          {(!isSignedIn || (currentUserBusiness && currentUserBusiness.status !== "approved")) && (
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
                    The Relay Insights
                  </span>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-mono font-medium">
                    Verified Operators Only
                  </span>
                </div>
                <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                  Real business questions answered by verified businesses.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold bg-slate-900 hover:bg-orange-600 text-white px-4 py-2 rounded-[2px] transition-colors"
                >
                  Join The Relay
                </Link>
                <Link
                  to="/insights"
                  search={{ tab: "questions" }}
                  className="inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-semibold border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-3.5 py-2 rounded-[2px] transition-colors"
                >
                  Explore Insights
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

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
          urlPath={`/insights/${question.id}`}
          type="question"
        />
      )}
    </div>
  );
}
