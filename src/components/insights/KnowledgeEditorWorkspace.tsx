import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import {
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Save,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { KnowledgeRichTextEditor } from "./KnowledgeRichTextEditor";
import { createKnowledgeInsight } from "../../functions/createKnowledgeInsight";
import { updateKnowledgeInsight } from "../../functions/updateKnowledgeInsight";
import { getKnowledgeInsightById } from "../../functions/getKnowledgeInsightById";
import { checkOnboardingStatus } from "../../functions/checkOnboardingStatus";
import { checkAdminSession } from "../../functions/checkAdminSession";
import { getAdminInsights } from "../../functions/getAdminInsights";
import { createAdminKnowledgeInsight } from "../../functions/createAdminKnowledgeInsight";
import {
  KnowledgeInsight,
  KnowledgeInsightTopic,
  KnowledgeInsightBasedOn,
  Business,
} from "../../types";

const TOPICS: { value: KnowledgeInsightTopic; label: string }[] = [
  { value: "Building a System / Business", label: "Building a System / Business" },
  { value: "Sales", label: "Sales & Pipeline" },
  { value: "Marketing", label: "Marketing & Growth" },
  { value: "Operations", label: "Operations & Logistics" },
  { value: "Hiring", label: "Hiring & Team Building" },
  { value: "Finance", label: "Finance & Unit Economics" },
  { value: "Product", label: "Product Strategy & Development" },
  { value: "Partnerships", label: "Partnerships & Alliances" },
  { value: "Distribution", label: "Distribution & Channels" },
  { value: "Technology", label: "Technology & Infrastructure" },
  { value: "Other", label: "Other Business Topic" },
];

const BASED_ON_OPTIONS: {
  value: KnowledgeInsightBasedOn;
  label: string;
}[] = [
  { value: "business_experience", label: "Our business experience" },
  { value: "project", label: "A project we worked on" },
  { value: "experiment", label: "An experiment or test" },
  { value: "industry_experience", label: "Industry experience" },
  { value: "lesson_learned", label: "A mistake or lesson learned" },
  { value: "general_perspective", label: "General perspective" },
];

interface KnowledgeEditorWorkspaceProps {
  knowledgeId?: string | null;
  initialData?: {
    title?: string;
    topic?: KnowledgeInsightTopic;
    based_on?: KnowledgeInsightBasedOn | null;
    content?: string;
    content_json?: string | null;
    status?: "published" | "draft" | "archived";
  };
}

export function KnowledgeEditorWorkspace({
  knowledgeId: initialKnowledgeId,
  initialData,
}: KnowledgeEditorWorkspaceProps) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [currentKnowledgeId, setCurrentKnowledgeId] = useState<string | null>(
    initialKnowledgeId || null,
  );
  const isEditing = !!currentKnowledgeId;

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [topic, setTopic] = useState<KnowledgeInsightTopic>(
    initialData?.topic || "Operations",
  );
  const [basedOn, setBasedOn] = useState<string>(
    initialData?.based_on || "business_experience",
  );
  const [contentJson, setContentJson] = useState<string | null>(
    initialData?.content_json || null,
  );
  const [contentText, setContentText] = useState(initialData?.content || "");
  const [status, setStatus] = useState<"published" | "draft" | "archived">(
    initialData?.status || "published",
  );

  // Auto-resizing textarea ref
  const titleInputRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTitleHeight = () => {
    if (titleInputRef.current) {
      titleInputRef.current.style.height = "auto";
      titleInputRef.current.style.height = `${titleInputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTitleHeight();
  }, [title]);

  // Status & Dirty Tracking
  const [isDirty, setIsDirty] = useState(false);
  const [savedStatus, setSavedStatus] = useState<
    "saved" | "unsaved" | "saving" | "error"
  >("saved");
  const [submitting, setSubmitting] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(!!initialKnowledgeId);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth & Business Profile
  const [business, setBusiness] = useState<Business | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState<any[]>([]);
  const [businessMode, setBusinessMode] = useState<"existing" | "custom">("existing");
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("");
  const [customCompanyName, setCustomCompanyName] = useState("");
  const [customIndustry, setCustomIndustry] = useState("SaaS");
  const [customWebsite, setCustomWebsite] = useState("");

  // Unsaved Changes Modal
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [targetNavigateUrl, setTargetNavigateUrl] = useState<string | null>(null);

  // 1. Initial Load: Check session, retrieve prefilled sessionStorage data if new
  useEffect(() => {
    let mounted = true;

    async function init() {
      // Check Admin
      try {
        const adminRes = await checkAdminSession();
        if (mounted && adminRes?.isAdmin) {
          setIsAdmin(true);
          try {
            const insRes = await getAdminInsights();
            if (mounted && insRes?.businesses) {
              setAdminBusinesses(insRes.businesses);
              const defaultBiz =
                insRes.businesses.find((b: any) => b.status === "approved") ||
                insRes.businesses[0];
              if (defaultBiz) {
                setSelectedBusinessId(defaultBiz.id);
              }
            }
          } catch (e) {
            console.warn("[KnowledgeEditor] Error loading admin businesses:", e);
          }
        }
      } catch {
        // Not admin
      }

      // Check User Business Profile
      if (isSignedIn) {
        try {
          const res = await checkOnboardingStatus();
          if (mounted && res?.business) {
            setBusiness(res.business);
          }
        } catch (e) {
          console.warn("[KnowledgeEditor] Error checking onboarding:", e);
        }
      }

      if (mounted) setLoadingProfile(false);

      // Check sessionStorage for modal prefilled data (if new article)
      if (!initialKnowledgeId) {
        try {
          const stored = sessionStorage.getItem("relay_knowledge_draft_init");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.title) setTitle(parsed.title);
            if (parsed.topic) setTopic(parsed.topic);
            if (parsed.based_on) setBasedOn(parsed.based_on);
            if (parsed.content) setContentText(parsed.content);
            sessionStorage.removeItem("relay_knowledge_draft_init");
          }
        } catch {
          // Ignore
        }
      }

      // Fetch existing knowledge if in edit mode and initialData not complete
      if (initialKnowledgeId && !initialData?.content) {
        try {
          setLoadingInitial(true);
          const existing = await getKnowledgeInsightById({
            data: { id: initialKnowledgeId },
          });
          if (mounted && existing) {
            setTitle(existing.title);
            setTopic(existing.topic);
            setBasedOn(existing.based_on || "business_experience");
            setContentText(existing.content);
            setContentJson(existing.content_json || null);
            setStatus(existing.status);
            setSavedStatus("saved");
          }
        } catch (err: any) {
          console.error("[KnowledgeEditor] Failed to load existing article:", err);
          toast.error("Failed to load article details.");
          navigate({ to: "/insights", search: { tab: "knowledge" } as any });
        } finally {
          if (mounted) setLoadingInitial(false);
        }
      } else {
        if (mounted) setLoadingInitial(false);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [isSignedIn, initialKnowledgeId]);

  // 2. Protect from accidental window navigation when dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Navigation Guard helper
  const handleSafeNavigate = (to: string) => {
    if (isDirty) {
      setTargetNavigateUrl(to);
      setExitConfirmOpen(true);
    } else {
      navigate({ to });
    }
  };

  // Content change callback from editor
  const handleEditorChange = ({
    json,
    text,
  }: {
    json: string;
    text: string;
  }) => {
    setContentJson(json);
    setContentText(text);
    setIsDirty(true);
    setSavedStatus("unsaved");
    if (errors.content && text.trim().length >= 50) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.content;
        return next;
      });
    }
  };

  // Field change wrappers
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    setSavedStatus("unsaved");
    if (errors.title && val.trim().length >= 10) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.title;
        return next;
      });
    }
  };

  const handleTopicChange = (val: KnowledgeInsightTopic) => {
    setTopic(val);
    setIsDirty(true);
    setSavedStatus("unsaved");
    if (errors.topic) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.topic;
        return next;
      });
    }
  };

  const handleBasedOnChange = (val: string) => {
    setBasedOn(val);
    setIsDirty(true);
    setSavedStatus("unsaved");
  };

  // Validate for publish
  const validateForPublish = () => {
    const newErrors: Record<string, string> = {};

    if (isAdmin && !isEditing) {
      if (businessMode === "existing" && !selectedBusinessId) {
        newErrors.business = "Please select an author business.";
      }
      if (
        businessMode === "custom" &&
        (!customCompanyName.trim() || customCompanyName.trim().length < 2)
      ) {
        newErrors.business = "Please enter a company name (at least 2 characters).";
      }
    }

    if (!title.trim() || title.trim().length < 10) {
      newErrors.title = "Article title must be at least 10 characters.";
    } else if (title.trim().length > 200) {
      newErrors.title = "Article title cannot exceed 200 characters.";
    }

    if (!topic) {
      newErrors.topic = "Please select a topic for this article.";
    }

    const cleanLength = contentText.trim().length;
    if (cleanLength < 50) {
      newErrors.content = `Article body is too short (${cleanLength} characters). Please write at least 50 characters of practical insight.`;
    } else if (cleanLength > 5000) {
      newErrors.content = `Article body exceeds 5,000 characters limit (${cleanLength} characters).`;
    }

    if (!isAdmin && (!business || business.status !== "approved")) {
      newErrors.auth = "Only approved businesses can publish Knowledge articles.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save Draft action
  const handleSaveDraft = async () => {
    if (!title.trim() || title.trim().length < 3) {
      toast.error("Please enter at least 3 characters for the title to save a draft.");
      return;
    }

    try {
      setSubmitting(true);
      setSavedStatus("saving");

      if (isAdmin) {
        const res = await createAdminKnowledgeInsight({
          data: {
            business_id: businessMode === "existing" ? selectedBusinessId : undefined,
            custom_company_name:
              businessMode === "custom" ? customCompanyName.trim() : undefined,
            custom_industry: businessMode === "custom" ? customIndustry.trim() : undefined,
            custom_website: businessMode === "custom" ? customWebsite.trim() : undefined,
            title: title.trim(),
            content: contentText.trim() || "Draft in progress...",
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "draft",
          },
        });
        if (res?.knowledgeInsight?.id) {
          setCurrentKnowledgeId(res.knowledgeInsight.id);
        }
      } else if (isEditing && currentKnowledgeId) {
        await updateKnowledgeInsight({
          data: {
            knowledge_insight_id: currentKnowledgeId,
            title: title.trim(),
            content: contentText.trim() || "Draft in progress...",
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "draft",
          },
        });
      } else {
        const created = await createKnowledgeInsight({
          data: {
            title: title.trim(),
            content: contentText.trim() || "Draft in progress...",
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "draft",
          },
        });
        if (created?.id) {
          setCurrentKnowledgeId(created.id);
        }
      }

      setIsDirty(false);
      setStatus("draft");
      setSavedStatus("saved");
      toast.success("Draft saved successfully.");
    } catch (err: any) {
      console.error("[KnowledgeEditor] Failed to save draft:", err);
      setSavedStatus("error");
      toast.error(err.message || "Failed to save draft. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Publish action
  const handlePublish = async () => {
    if (!validateForPublish()) {
      const firstError = Object.values(errors)[0];
      if (firstError) toast.error(firstError);
      return;
    }

    try {
      setSubmitting(true);
      setSavedStatus("saving");

      let targetId = currentKnowledgeId;

      if (isAdmin && !isEditing) {
        const res = await createAdminKnowledgeInsight({
          data: {
            business_id: businessMode === "existing" ? selectedBusinessId : undefined,
            custom_company_name:
              businessMode === "custom" ? customCompanyName.trim() : undefined,
            custom_industry: businessMode === "custom" ? customIndustry.trim() : undefined,
            custom_website: businessMode === "custom" ? customWebsite.trim() : undefined,
            title: title.trim(),
            content: contentText.trim(),
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "published",
          },
        });
        targetId = res?.knowledgeInsight?.id;
      } else if (isEditing && currentKnowledgeId) {
        const updated = await updateKnowledgeInsight({
          data: {
            knowledge_insight_id: currentKnowledgeId,
            title: title.trim(),
            content: contentText.trim(),
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "published",
          },
        });
        targetId = updated.id;
      } else {
        const created = await createKnowledgeInsight({
          data: {
            title: title.trim(),
            content: contentText.trim(),
            content_json: contentJson,
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
            status: "published",
          },
        });
        targetId = created.id;
      }

      setIsDirty(false);
      setStatus("published");
      setSavedStatus("saved");
      toast.success("Knowledge article published to The Relay!");

      if (targetId) {
        navigate({ to: `/insights/knowledge/${targetId}` });
      } else {
        navigate({ to: "/insights", search: { tab: "knowledge" } as any });
      }
    } catch (err: any) {
      console.error("[KnowledgeEditor] Failed to publish article:", err);
      setSavedStatus("error");
      toast.error(err.message || "Failed to publish article. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loadingInitial || loadingProfile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          <span className="text-xs font-mono uppercase tracking-wider">
            Loading knowledge workspace...
          </span>
        </div>
      </div>
    );
  }

  // Not signed in gating (Admins bypass)
  if (!isSignedIn && !isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-lg p-8 text-center space-y-5 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Sign In to Post Knowledge
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Knowledge insights on The Relay are published by verified business operators to share operational lessons and experiments.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => navigate({ to: "/login" })}
              className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10 cursor-pointer"
            >
              Sign In to The Relay
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/insights", search: { tab: "knowledge" } as any })}
              className="text-slate-600 font-mono text-xs h-9 cursor-pointer"
            >
              Back to Insights
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Not approved business gating (Admins bypass)
  if (!isAdmin && (!business || business.status !== "approved")) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-lg p-8 text-center space-y-5 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Approved Business Profile Required
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {business
                ? `Your business profile is currently "${business.status}". Publishing Knowledge insights requires an approved business status to maintain trust and credibility.`
                : "Please complete your business registration first before publishing Knowledge on The Relay."}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {!business ? (
              <Button
                onClick={() => navigate({ to: "/onboarding" })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10 cursor-pointer"
              >
                Complete Onboarding
              </Button>
            ) : (
              <Button
                onClick={() => navigate({ to: "/business-profile" })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10 cursor-pointer"
              >
                View Business Profile
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/insights", search: { tab: "knowledge" } as any })}
              className="text-slate-600 font-mono text-xs h-9 cursor-pointer"
            >
              Back to Insights
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased">
      {/* ═══════════════════════════════════════════════════════════════════
          STICKY TOP ACTION BAR
          ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSafeNavigate("/insights?tab=knowledge")}
              className="h-8 px-2.5 text-slate-600 hover:text-slate-900 font-mono text-xs gap-1.5 rounded cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </Button>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                {isEditing ? "Edit Knowledge Article" : "New Knowledge Article"}
              </span>
              {isAdmin ? (
                <span className="inline-flex items-center text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-sans font-semibold">
                  <UserCheck className="w-3 h-3 mr-1 text-purple-600" />
                  Super Admin Mode
                </span>
              ) : business ? (
                <span className="hidden md:inline-flex items-center text-xs font-semibold text-slate-900 font-sans gap-1.5">
                  <span>{business.company_name}</span>
                  <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" title="Verified Business" />
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
              {contentText.trim().length} characters (min 50)
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSafeNavigate("/insights?tab=knowledge")}
              disabled={submitting}
              className="h-8 text-xs font-mono text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={submitting}
              className="h-8 text-xs font-mono uppercase tracking-wider border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Draft</span>
            </Button>

            <Button
              type="button"
              onClick={handlePublish}
              disabled={submitting}
              className="h-9 px-5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider shadow-xs gap-1.5 cursor-pointer"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{status === "published" ? "Save Changes" : "Publish Article"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          WRITING CANVAS (MATCHES OPPORTUNITY BOARD MAX-W-7XL)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 md:py-6">
        <div className="w-full space-y-5">
          {/* Admin Author Business Selection Bar */}
          {isAdmin && !isEditing && (
            <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-200/70 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-900 font-bold">
                    Author Business (Admin Override)
                  </span>
                </div>
                <div className="flex items-center bg-white p-0.5 rounded border border-purple-200">
                  <button
                    type="button"
                    onClick={() => setBusinessMode("existing")}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      businessMode === "existing"
                        ? "bg-purple-700 text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Select Existing
                  </button>
                  <button
                    type="button"
                    onClick={() => setBusinessMode("custom")}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      businessMode === "custom"
                        ? "bg-purple-700 text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Custom Company
                  </button>
                </div>
              </div>

              {businessMode === "existing" ? (
                <div className="space-y-1">
                  <Select
                    value={selectedBusinessId}
                    onValueChange={(val) => {
                      setSelectedBusinessId(val);
                      if (errors.business) setErrors((prev) => ({ ...prev, business: "" }));
                    }}
                  >
                    <SelectTrigger className="h-9 text-xs bg-white border-purple-200 focus:border-purple-800">
                      <SelectValue placeholder="Select business" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 max-h-64">
                      {adminBusinesses.map((b) => (
                        <SelectItem key={b.id} value={b.id} className="text-xs">
                          <span className="font-semibold text-slate-900">{b.company_name}</span>
                          <span className="text-slate-500 ml-2">
                            ({b.industry || "General"} · {b.status})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.business && (
                    <p className="text-[11px] text-red-500 font-mono">{errors.business}</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Input
                      placeholder="Company Name *"
                      value={customCompanyName}
                      onChange={(e) => setCustomCompanyName(e.target.value)}
                      className="h-9 text-xs bg-white border-purple-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Industry (e.g. Fintech)"
                      value={customIndustry}
                      onChange={(e) => setCustomIndustry(e.target.value)}
                      className="h-9 text-xs bg-white border-purple-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Website (optional)"
                      value={customWebsite}
                      onChange={(e) => setCustomWebsite(e.target.value)}
                      className="h-9 text-xs bg-white border-purple-200"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Metadata Row: Topic & Grounding / Based On */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50/70 border border-slate-200/80">
            <div className="space-y-1.5">
              <Label htmlFor="post-topic" className="text-xs font-semibold text-slate-700">
                Business Topic <span className="text-red-500">*</span>
              </Label>
              <Select value={topic} onValueChange={(val: any) => handleTopicChange(val)}>
                <SelectTrigger
                  id="post-topic"
                  className="h-9 text-xs bg-white border-slate-200 focus:border-slate-800"
                >
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {TOPICS.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-xs">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.topic && <p className="text-[11px] text-red-500">{errors.topic}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="post-based-on" className="text-xs font-semibold text-slate-700">
                Grounding / Based On
              </Label>
              <Select
                value={basedOn}
                onValueChange={(val: string) => handleBasedOnChange(val)}
              >
                <SelectTrigger
                  id="post-based-on"
                  className="h-9 text-xs bg-white border-slate-200 focus:border-slate-800"
                >
                  <SelectValue placeholder="Select grounding" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {BASED_ON_OPTIONS.map((bo) => (
                    <SelectItem key={bo.value} value={bo.value} className="text-xs">
                      {bo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Article Title Statement */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                Article Title <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {title.length}/200
              </span>
            </div>
            <textarea
              ref={titleInputRef}
              rows={1}
              placeholder="e.g., What We Learned Transitioning to Usage-Based Pricing"
              value={title}
              onChange={(e) => {
                handleTitleChange(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              onInput={adjustTitleHeight}
              maxLength={200}
              className="w-full text-xl sm:text-2xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 border-b border-slate-200 focus:border-slate-900 pb-1.5 pt-0.5 outline-none resize-none leading-snug transition-colors overflow-hidden"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Article Content & Details Rich-Text Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800">
                  Article Content <span className="text-red-500">*</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Detail actionable lessons, operating breakdowns, data, and real-world experiments.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {contentText.trim().length} chars (min 50)
              </span>
            </div>

            <KnowledgeRichTextEditor
              key={currentKnowledgeId || "new-knowledge-canvas"}
              contentJson={contentJson}
              initialPlainText={contentText}
              knowledgeId={currentKnowledgeId}
              minHeight="520px"
              onChange={handleEditorChange}
              placeholder="Write your actionable insights, real operating lessons, or technical breakdown..."
            />

            {errors.content && (
              <p className="text-xs text-red-500 font-medium">{errors.content}</p>
            )}
          </div>

          {/* Helpful Standards Card */}
          <div className="p-4 rounded-lg bg-orange-50/30 border border-orange-200/60 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 text-orange-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Relay Knowledge Standards</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
              <li>Share specific, actionable lessons rather than generic motivational quotes.</li>
              <li>Include real numbers, operational constraints, or results where appropriate.</li>
              <li>Insert diagrams, charts, or comparison tables using the rich-text toolbar.</li>
              <li>Verified operators read Knowledge to learn from peer experiments and decisions.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          UNSAVED CHANGES CONFIRMATION DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <AlertDialog open={exitConfirmOpen} onOpenChange={setExitConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-slate-900">
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600 leading-relaxed">
              You have unsaved changes in your Knowledge article. If you leave now, unsaved edits will be lost. Would you like to stay and save your draft?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDirty(false);
                if (targetNavigateUrl) navigate({ to: targetNavigateUrl });
              }}
              className="text-xs font-mono text-red-600 hover:text-red-700 cursor-pointer"
            >
              Discard & Leave
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setExitConfirmOpen(false);
                await handleSaveDraft();
              }}
              className="text-xs font-mono bg-slate-900 text-white cursor-pointer"
            >
              Save Draft
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
