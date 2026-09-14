import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Edit2,
  Trash2,
  Archive,
  ExternalLink,
  Lock,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { getKnowledgeInsightById } from "../functions/getKnowledgeInsightById";
import { getKnowledgeInsights } from "../functions/getKnowledgeInsights";
import { deleteKnowledgeInsight } from "../functions/deleteKnowledgeInsight";
import { archiveKnowledgeInsight } from "../functions/archiveKnowledgeInsight";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { ShareInsightDialog } from "../components/insights/ShareInsightDialog";
import { ShareModal } from "../components/insights/ShareModal";
import { CompanyLogo } from "../components/company-logo";
import { KnowledgeInsight, Business, KnowledgeInsightBasedOn } from "../types";

export const Route = createFileRoute("/insights/knowledge/$id")({
  loader: async ({ params }) => {
    try {
      const insight = await getKnowledgeInsightById({
        data: { id: params.id },
      });
      return { insight };
    } catch {
      return { insight: null };
    }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.insight?.title
      ? `${loaderData.insight.title} — The Relay Knowledge`
      : "Knowledge Article — The Relay";
    const snippet = loaderData?.insight?.content
      ? loaderData.insight.content.slice(0, 160).replace(/\n/g, " ") + "..."
      : "Practical business knowledge shared by verified operators on The Relay.";
    const author = loaderData?.insight?.business?.company_name
      ? ` By ${loaderData.insight.business.company_name}.`
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
  component: KnowledgeDetailPage,
});

const BASED_ON_LABELS: Record<string, string> = {
  business_experience: "Business Experience",
  project: "Project Experience",
  experiment: "Experiment or Test",
  industry_experience: "Industry Experience",
  lesson_learned: "Mistake or Lesson Learned",
  general_perspective: "General Business Perspective",
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

function calculateReadingTime(text: string): string {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function renderFormattedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const tokens = text.split(regex);

  tokens.forEach((token, idx) => {
    if (!token) return;

    // Link [text](url)
    const linkMatch = token.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
    if (linkMatch) {
      parts.push(
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 underline decoration-orange-300 hover:decoration-orange-600 hover:text-orange-700 transition-colors"
        >
          {linkMatch[1]}
        </a>,
      );
      return;
    }

    // Bold **text**
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      parts.push(
        <strong key={idx} className="font-bold text-slate-950">
          {token.slice(2, -2)}
        </strong>,
      );
      return;
    }

    // Italic *text*
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      parts.push(
        <em key={idx} className="italic text-slate-800">
          {token.slice(1, -1)}
        </em>,
      );
      return;
    }

    // Inline code `code`
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      parts.push(
        <code
          key={idx}
          className="font-mono text-[0.88em] bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 font-medium"
        >
          {token.slice(1, -1)}
        </code>,
      );
      return;
    }

    // Plain text with line breaks
    const lines = token.split("\n");
    lines.forEach((line, lIdx) => {
      if (lIdx > 0) parts.push(<br key={`${idx}-br-${lIdx}`} />);
      if (line) parts.push(line);
    });
  });

  return parts;
}

function renderArticleContent(rawContent: string) {
  if (!rawContent) return null;

  const rawBlocks = rawContent.split(/\n{2,}/);

  return rawBlocks.map((block, bIdx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={bIdx}
          className="text-xl sm:text-[22px] font-bold text-slate-950 mt-10 mb-3 tracking-tight font-display"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={bIdx}
          className="text-2xl sm:text-[27px] font-bold text-slate-950 mt-12 mb-4 tracking-tight leading-snug font-display"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }

    if (trimmed.startsWith("# ")) {
      return (
        <h2
          key={bIdx}
          className="text-2xl sm:text-[28px] font-bold text-slate-950 mt-12 mb-4 tracking-tight leading-snug font-display"
        >
          {trimmed.replace(/^#\s+/, "")}
        </h2>
      );
    }

    if (trimmed.startsWith(">")) {
      const quoteText = trimmed
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join("\n");
      return (
        <blockquote
          key={bIdx}
          className="border-l-[3px] border-orange-500 pl-5 sm:pl-6 py-2 my-8 text-slate-700 italic text-[18px] sm:text-[19px] leading-[1.7] bg-orange-500/[0.02]"
        >
          {renderFormattedText(quoteText)}
        </blockquote>
      );
    }

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    const isBulletList = lines.every((l) => l.startsWith("- ") || l.startsWith("* "));
    if (isBulletList && lines.length > 0) {
      return (
        <ul
          key={bIdx}
          className="list-disc list-outside ml-6 space-y-2.5 my-6 text-[17px] sm:text-[18px] text-slate-800 leading-[1.75]"
        >
          {lines.map((l, lIdx) => (
            <li key={lIdx}>{renderFormattedText(l.replace(/^[-*]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    const isNumberedList = lines.every((l) => /^\d+\.\s+/.test(l));
    if (isNumberedList && lines.length > 0) {
      return (
        <ol
          key={bIdx}
          className="list-decimal list-outside ml-6 space-y-2.5 my-6 text-[17px] sm:text-[18px] text-slate-800 leading-[1.75]"
        >
          {lines.map((l, lIdx) => (
            <li key={lIdx}>{renderFormattedText(l.replace(/^\d+\.\s+/, ""))}</li>
          ))}
        </ol>
      );
    }

    return (
      <p
        key={bIdx}
        className="text-[17px] sm:text-[18px] md:text-[19px] text-slate-800 leading-[1.8] mb-7 font-normal font-sans"
      >
        {renderFormattedText(trimmed)}
      </p>
    );
  });
}

export function KnowledgeDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [insight, setInsight] = useState<KnowledgeInsight | null>(null);
  const [relatedInsights, setRelatedInsights] = useState<KnowledgeInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserBusiness, setCurrentUserBusiness] = useState<Business | null>(null);

  // Dialog states
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
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
        console.warn("[KnowledgeDetailPage] Error fetching user:", err);
      }
    }
    loadUser();
  }, [isSignedIn]);

  // Fetch insight details & related knowledge
  const loadInsightData = async () => {
    try {
      setLoading(true);
      const data = await getKnowledgeInsightById({
        data: { id },
      });
      setInsight(data);

      // Fetch related published insights
      try {
        const relatedRes = await getKnowledgeInsights({
          data: {
            topic: data.topic,
            status: "published",
            limit: 4,
          },
        });
        const matched = (relatedRes || []).filter((item) => item.id !== data.id).slice(0, 3);
        if (matched.length < 3) {
          const generalRes = await getKnowledgeInsights({
            data: {
              status: "published",
              limit: 6,
            },
          });
          const combined = [...matched];
          for (const item of generalRes || []) {
            if (item.id !== data.id && !combined.some((c) => c.id === item.id)) {
              combined.push(item);
              if (combined.length >= 3) break;
            }
          }
          setRelatedInsights(combined);
        } else {
          setRelatedInsights(matched);
        }
      } catch (err) {
        console.warn("[KnowledgeDetailPage] Failed to load related insights:", err);
      }
    } catch (err: any) {
      console.error("[KnowledgeDetailPage] Failed to load insight:", err);
      toast.error("Failed to load insight details.");
      navigate({ to: "/insights", search: { tab: "knowledge" } as any });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsightData();
  }, [id]);

  // Computed permissions
  const isOwner =
    currentUserBusiness && insight && currentUserBusiness.id === insight.business_id;

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!insight) return;
    try {
      setActionLoading(true);
      await deleteKnowledgeInsight({
        data: { knowledge_insight_id: insight.id },
      });
      toast.success("Insight deleted.");
      navigate({ to: "/insights", search: { tab: "knowledge" } as any });
    } catch (err: any) {
      console.error("[KnowledgeDetailPage] Delete error:", err);
      toast.error(err.message || "Failed to delete insight.");
    } finally {
      setActionLoading(false);
      setDeleteOpen(false);
    }
  };

  // Handle Archive
  const handleConfirmArchive = async () => {
    if (!insight) return;
    try {
      setActionLoading(true);
      await archiveKnowledgeInsight({
        data: { knowledge_insight_id: insight.id },
      });
      toast.success("Insight archived.");
      loadInsightData();
    } catch (err: any) {
      console.error("[KnowledgeDetailPage] Archive error:", err);
      toast.error(err.message || "Failed to archive insight.");
    } finally {
      setActionLoading(false);
      setArchiveOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] py-16">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 space-y-8 animate-pulse">
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

  if (!insight) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] py-20 text-center">
        <p className="text-sm text-slate-500">Knowledge article not found.</p>
        <Link
          to="/insights"
          search={{ tab: "knowledge" } as any}
          className="mt-4 inline-block text-xs font-mono text-slate-900 underline"
        >
          Back to Knowledge
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-28">
      {/* ═══════════════════════════════════════════════════════════════════
          1. TOP NAVIGATION / BREADCRUMB
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xs sticky top-0 z-20">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/insights"
            search={{ tab: "knowledge" } as any}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Knowledge</span>
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

            {isOwner && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditOpen(true)}
                  className="h-8 text-xs font-mono border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                {insight.status !== "archived" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setArchiveOpen(true)}
                    className="h-8 text-xs font-mono border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Archive</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteOpen(true)}
                  className="h-8 text-xs font-mono border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          2. MAIN EDITORIAL ARTICLE CANVAS (NO BOXED CARD)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Archived Notice for Owner */}
        {insight.status === "archived" && (
          <div className="mb-8 p-3.5 bg-amber-50/90 border border-amber-200 rounded flex items-center gap-2.5 text-xs text-amber-800 font-sans">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              This insight is currently <strong>archived</strong> and is not visible in the public Knowledge directory.
            </span>
          </div>
        )}

        {/* 2. Topic Label */}
        <div className="mb-3 sm:mb-4">
          <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] font-bold text-orange-600">
            {insight.topic}
          </span>
        </div>

        {/* 3. Large Editorial Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-slate-950 leading-[1.18] sm:leading-[1.14] font-display mb-6">
          {insight.title}
        </h1>

        {/* 5, 6, 7, 8. Author Info, Date, Reading Time, Share */}
        <div className="py-5 border-y border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3.5">
            <CompanyLogo
              src={insight.business?.logo_url}
              name={insight.business?.company_name}
              className="w-11 h-11 rounded object-contain border border-slate-200 p-0.5 shrink-0 bg-white"
              fallbackClassName="w-11 h-11 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200 shrink-0"
              textClassName="text-xs font-mono font-bold"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-sans">
                  {insight.business?.company_name || "Verified Business"}
                </span>
                <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-sans font-medium">
                  <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                  Approved Business
                </span>
              </div>
              <div className="text-xs text-slate-500 font-sans mt-0.5 flex flex-wrap items-center gap-1.5">
                <span>{formatDate(insight.created_at)}</span>
                <span>·</span>
                <span>{calculateReadingTime(insight.content)}</span>
                {insight.business?.industry && (
                  <>
                    <span>·</span>
                    <span className="text-slate-600">{insight.business.industry}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareModalOpen(true)}
              className="h-8 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* 9. Article Content Body (Editorial Typography) */}
        <article className="font-sans text-slate-800 leading-[1.8] text-[17px] sm:text-[18.5px] pb-12">
          {renderArticleContent(insight.content)}
        </article>

        {/* 10. "Based on" Metadata Block */}
        {insight.based_on && (
          <div className="pt-8 pb-10 border-t border-slate-200/80">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-bold block mb-2.5">
              Based On
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-100 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
              <span>{BASED_ON_LABELS[insight.based_on] || insight.based_on}</span>
            </div>
          </div>
        )}

        {/* 11. About the Business / Author Section */}
        <div className="py-10 border-t border-slate-200/80">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-bold block mb-4">
            About the Business
          </span>

          <div className="p-6 sm:p-7 bg-slate-50/70 border border-slate-200/80 rounded-[4px] flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <CompanyLogo
                src={insight.business?.logo_url}
                name={insight.business?.company_name}
                className="w-14 h-14 rounded object-contain border border-slate-200 bg-white p-1 shrink-0"
                fallbackClassName="w-14 h-14 rounded bg-white text-slate-700 flex items-center justify-center font-bold text-base uppercase border border-slate-200 shrink-0"
                textClassName="text-base font-mono font-bold"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 font-display">
                    {insight.business?.company_name || "Verified Business"}
                  </h3>
                  <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-sans font-medium">
                    <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                    Approved Business
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {insight.business?.industry}
                  {insight.business?.hq_location ? ` · ${insight.business.hq_location}` : ""}
                </p>
                {insight.business?.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 max-w-xl font-sans">
                    {insight.business.description}
                  </p>
                )}
              </div>
            </div>

            {insight.business?.company_name && (
              <div className="shrink-0 sm:self-start pt-1">
                <Link
                  to="/network"
                  search={{ q: insight.business.company_name } as any}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider h-8 px-3.5 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 rounded-[2px] transition-colors shadow-2xs cursor-pointer"
                >
                  <span>View in Network</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 12. Related Knowledge */}
        {relatedInsights.length > 0 && (
          <div className="py-10 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-bold">
                Related Knowledge
              </span>
              <Link
                to="/insights"
                search={{ tab: "knowledge" } as any}
                className="text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-orange-600 font-semibold transition-colors flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {relatedInsights.map((rel) => {
                const readingTime = calculateReadingTime(rel.content);
                return (
                  <Link
                    key={rel.id}
                    to="/insights/knowledge/$id"
                    params={{ id: rel.id }}
                    className="p-5 bg-white border border-slate-200/80 hover:border-slate-300 rounded-[3px] transition-all hover:shadow-xs flex flex-col justify-between group space-y-3"
                  >
                    <div className="space-y-2">
                      <span className="text-[9.5px] font-mono uppercase font-bold text-orange-700 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded inline-block">
                        {rel.topic}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug font-sans">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                        {rel.content}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="truncate max-w-[130px] text-slate-600 font-sans font-medium">
                        {rel.business?.company_name || "Verified Business"}
                      </span>
                      <span className="shrink-0">{readingTime}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 13. The Relay Insights Conversion Block */}
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
                className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-mono uppercase tracking-wider font-semibold border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-4 py-2.5 rounded-[2px] transition-colors"
              >
                Explore Insights
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Dialog (Owner only) */}
      {isOwner && (
        <ShareInsightDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          onSuccess={loadInsightData}
          insightToEdit={insight}
        />
      )}

      {/* Archive Confirmation Dialog */}
      <AlertDialog open={archiveOpen} onOpenChange={setArchiveOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-slate-900">
              Archive this insight?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-500">
              This insight will be hidden from the public Knowledge feed, but preserved in your account records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading} className="text-xs">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmArchive}
              disabled={actionLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono uppercase"
            >
              Archive Insight
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-slate-900">
              Delete this insight?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-500">
              This insight will no longer be visible to other Relay users. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading} className="text-xs">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase"
            >
              Delete Insight
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Public Share Modal */}
      {insight && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          title={insight.title}
          topic={insight.topic}
          authorName={insight.business?.company_name}
          urlPath={`/insights/knowledge/${insight.id}`}
          type="insight"
        />
      )}
    </div>
  );
}
