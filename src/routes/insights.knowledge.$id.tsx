import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  ShieldCheck,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Archive,
  Lightbulb,
  ExternalLink,
  Lock,
  Layers,
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
import { getKnowledgeInsightById } from "../functions/getKnowledgeInsightById";
import { deleteKnowledgeInsight } from "../functions/deleteKnowledgeInsight";
import { archiveKnowledgeInsight } from "../functions/archiveKnowledgeInsight";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { ShareInsightDialog, BASED_ON_OPTIONS } from "../components/insights/ShareInsightDialog";
import { CompanyLogo } from "../components/company-logo";
import { KnowledgeInsight, Business, KnowledgeInsightBasedOn } from "../types";

export const Route = createFileRoute("/insights/knowledge/$id")({
  component: KnowledgeDetailPage,
});

const BASED_ON_LABELS: Record<KnowledgeInsightBasedOn, string> = {
  business_experience: "Our business experience",
  project: "A project we worked on",
  experiment: "An experiment or test",
  industry_experience: "Industry experience",
  lesson_learned: "A mistake or lesson learned",
  general_perspective: "General perspective",
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
    return formatDate(dateStr);
  } catch {
    return "";
  }
}

export function KnowledgeDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [insight, setInsight] = useState<KnowledgeInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserBusiness, setCurrentUserBusiness] = useState<Business | null>(null);

  // Dialog states
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

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

  // Fetch insight details
  const loadInsightData = async () => {
    try {
      setLoading(true);
      const data = await getKnowledgeInsightById({
        data: { id },
      });
      setInsight(data);
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
        <div className="max-w-3xl mx-auto px-4 space-y-6 animate-pulse">
          <div className="h-6 w-36 bg-slate-200 rounded" />
          <div className="h-10 w-3/4 bg-slate-200 rounded" />
          <div className="h-20 bg-slate-100 rounded" />
          <div className="space-y-3 pt-6">
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] py-20 text-center">
        <p className="text-sm text-slate-500">Knowledge insight not found.</p>
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
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-24">
      {/* Top Header / Back nav */}
      <div className="border-b border-slate-200/80 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/insights"
            search={{ tab: "knowledge" } as any}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Knowledge
          </Link>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditOpen(true)}
                className="h-8 text-xs font-mono border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
              {insight.status !== "archived" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setArchiveOpen(true)}
                  className="h-8 text-xs font-mono border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Archive className="w-3.5 h-3.5" />
                  Archive
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteOpen(true)}
                className="h-8 text-xs font-mono border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Archived Banner */}
        {insight.status === "archived" && (
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded flex items-center gap-2.5 text-xs text-amber-800">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              This insight is currently <strong>archived</strong> and not visible in the public Knowledge directory.
            </span>
          </div>
        )}

        {/* Header Block: Badges, Title, Author & Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-800 border-amber-300/60 font-mono text-[10px] uppercase font-bold tracking-wider"
            >
              INSIGHT
            </Badge>
            <Badge
              variant="outline"
              className="bg-slate-100 text-slate-700 border-slate-200 font-mono text-[10px] uppercase font-medium tracking-wider"
            >
              {insight.topic}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 leading-snug">
            {insight.title}
          </h1>

          {/* Author info row */}
          <div className="pt-2 pb-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CompanyLogo
                src={insight.business?.logo_url}
                name={insight.business?.company_name}
                className="w-10 h-10 rounded object-contain border border-slate-200 p-0.5"
                fallbackClassName="w-10 h-10 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200"
                textClassName="text-xs font-mono font-bold"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {insight.business?.company_name || "Verified Business"}
                  </span>
                  <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-sans">
                    <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                    Approved Business
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <span>{insight.business?.industry}</span>
                  {insight.business?.hq_location && (
                    <>
                      <span>·</span>
                      <span>{insight.business.hq_location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-slate-400">
              <span className="block">Posted {formatTimeAgo(insight.created_at)}</span>
              <span className="text-[11px] text-slate-400/80">({formatDate(insight.created_at)})</span>
            </div>
          </div>
        </div>

        {/* Based On Transparency Block */}
        {insight.based_on && (
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-sm flex items-center gap-2.5 text-xs text-slate-700 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Based on:
            </span>
            <span className="font-medium text-slate-800">
              {BASED_ON_LABELS[insight.based_on] || insight.based_on}
            </span>
          </div>
        )}

        {/* Insight Content Body */}
        <article className="prose prose-slate max-w-none text-slate-800 text-[15px] sm:text-base leading-relaxed whitespace-pre-line py-2">
          {insight.content}
        </article>

        {/* Author Business Summary Card (at bottom) */}
        <div className="mt-12 pt-8 border-t border-slate-200/90">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-3">
            Author Business
          </span>

          <div className="p-5 bg-white border border-slate-200/90 rounded-[4px] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <CompanyLogo
                src={insight.business?.logo_url}
                name={insight.business?.company_name}
                className="w-12 h-12 rounded object-contain border border-slate-200 p-1"
                fallbackClassName="w-12 h-12 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm uppercase border border-slate-200"
                textClassName="text-sm font-mono font-bold"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-950">
                    {insight.business?.company_name}
                  </h3>
                  <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-sans">
                    <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                    Approved
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {insight.business?.industry}
                  {insight.business?.hq_location ? ` · ${insight.business.hq_location}` : ""}
                </p>
                {insight.business?.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1 font-sans">
                    {insight.business.description}
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0 sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: "/network" })}
                className="text-xs font-mono uppercase tracking-wider h-8 px-4 border-slate-200 text-slate-800 hover:bg-slate-50 flex items-center gap-1.5"
              >
                View in Network
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
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
    </div>
  );
}
