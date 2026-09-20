import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useAuth } from "@clerk/tanstack-react-start";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Building2,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Plus,
} from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { checkAdminSession } from "@/functions/checkAdminSession";
import { getAdminInsights } from "@/functions/getAdminInsights";
import { createAdminQuestion } from "@/functions/createAdminQuestion";
import { createQuestion } from "../functions/createQuestion";
import { updateQuestion } from "../functions/updateQuestion";
import { getQuestionById } from "../functions/getQuestionById";
import { QuestionRichTextEditor } from "../components/insights/QuestionRichTextEditor";
import { QuestionTopic, DesiredPerspective, Business, Question } from "../types";

const askSearchSchema = z.object({
  edit: z.string().uuid().optional(),
});

export const Route = createFileRoute("/insights/ask")({
  validateSearch: zodValidator(askSearchSchema),
  head: () => ({
    meta: [
      { title: "Ask the Relay — Post a Business Question" },
      {
        name: "description",
        content:
          "Pose a genuine business challenge, operational decision, or strategic problem to verified operators.",
      },
      { property: "og:title", content: "Ask the Relay — Post a Business Question" },
    ],
  }),
  component: AskQuestionPage,
});

const TOPICS: { value: QuestionTopic; label: string }[] = [
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

const DESIRED_PERSPECTIVES: { value: DesiredPerspective; label: string }[] = [
  { value: "any_business", label: "Any business with relevant insights" },
  { value: "same_industry", label: "Businesses in the same industry only" },
  { value: "similar_customers", label: "Businesses serving similar customers" },
  { value: "relevant_experience", label: "Businesses with direct relevant experience" },
];

function AskQuestionPage() {
  const { isSignedIn } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const editQuestionId = search.edit;
  const isEditing = !!editQuestionId;

  // Form states
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState<QuestionTopic>("Operations");
  const [description, setDescription] = useState("");
  const [contextContentJson, setContextContentJson] = useState<string | null>(null);
  const [desiredPerspective, setDesiredPerspective] = useState<string>("any_business");

  // Title textarea auto-resizing ref
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

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminBusinesses, setAdminBusinesses] = useState<
    Array<{ id: string; company_name: string; status: string; industry?: string | null }>
  >([]);
  const [businessMode, setBusinessMode] = useState<"existing" | "custom">("existing");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [customCompanyName, setCustomCompanyName] = useState("");
  const [customIndustry, setCustomIndustry] = useState("SaaS");
  const [customWebsite, setCustomWebsite] = useState("");

  // Loading & permission states
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingQuestion, setLoadingQuestion] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Initial Load: Check Admin Session & User Profile
  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        // Check if caller is super admin
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
          } catch (err) {
            console.warn("[AskQuestionPage] Error fetching admin businesses:", err);
          }
        }
      } catch (err) {
        console.warn("[AskQuestionPage] Error checking admin:", err);
      }

      // Check regular user onboarding
      if (isSignedIn) {
        try {
          const res = await checkOnboardingStatus();
          if (mounted && res?.business) {
            setBusiness(res.business);
          }
        } catch (err) {
          console.warn("[AskQuestionPage] Error loading profile:", err);
        }
      }

      if (mounted) setLoadingProfile(false);
    }

    init();
    return () => {
      mounted = false;
    };
  }, [isSignedIn]);

  // 2. Fetch existing question if in edit mode
  useEffect(() => {
    let mounted = true;
    async function loadExistingQuestion() {
      if (!editQuestionId) {
        setLoadingQuestion(false);
        return;
      }
      try {
        setLoadingQuestion(true);
        const data = await getQuestionById({
          data: { question_id: editQuestionId },
        });

        if (mounted && data) {
          setTitle(data.title);
          setTopic(data.topic);
          setDescription(data.description);
          setContextContentJson(data.context_content_json || null);
          setDesiredPerspective(data.desired_perspective || "any_business");
        }
      } catch (err: any) {
        console.error("[AskQuestionPage] Error loading question to edit:", err);
        toast.error("Could not load the question for editing.");
        navigate({ to: "/insights" });
      } finally {
        if (mounted) setLoadingQuestion(false);
      }
    }
    loadExistingQuestion();
    return () => {
      mounted = false;
    };
  }, [editQuestionId, navigate]);

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (isAdmin && !isEditing) {
      if (businessMode === "existing" && !selectedBusinessId) {
        newErrors.business = "Please select a business to post as.";
      }
      if (
        businessMode === "custom" &&
        (!customCompanyName.trim() || customCompanyName.trim().length < 2)
      ) {
        newErrors.business = "Please enter a company name (at least 2 characters).";
      }
    }

    if (!title.trim() || title.trim().length < 10) {
      newErrors.title = "Question title must be at least 10 characters.";
    } else if (title.trim().length > 200) {
      newErrors.title = "Question title cannot exceed 200 characters.";
    }

    if (!description.trim() || description.trim().length < 30) {
      newErrors.description = "Please describe your question in at least 30 characters.";
    } else if (description.trim().length > 10000) {
      newErrors.description = "Description cannot exceed 10,000 characters.";
    }

    if (!topic) {
      newErrors.topic = "Please select a topic.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) {
      toast.error("Please fill out all required fields properly.");
      return;
    }

    try {
      setSubmitting(true);

      // 1. Admin creation
      if (isAdmin && !isEditing) {
        const res = await createAdminQuestion({
          data: {
            business_id: businessMode === "existing" ? selectedBusinessId : undefined,
            custom_company_name:
              businessMode === "custom" ? customCompanyName.trim() : undefined,
            custom_industry: businessMode === "custom" ? customIndustry.trim() : undefined,
            custom_website: businessMode === "custom" ? customWebsite.trim() : undefined,
            title: title.trim(),
            description: description.trim(),
            topic,
            desired_perspective: (desiredPerspective as DesiredPerspective) || null,
            context_content_json: contextContentJson || null,
            status: "open",
          },
        });
        toast.success("Question posted via Admin.");
        if (res?.question?.id) {
          navigate({ to: "/insights/$id", params: { id: res.question.id } });
        } else {
          navigate({ to: "/insights" });
        }
        return;
      }

      // 2. Editing existing question
      if (isEditing && editQuestionId) {
        await updateQuestion({
          data: {
            question_id: editQuestionId,
            title: title.trim(),
            description: description.trim(),
            topic,
            desired_perspective: (desiredPerspective as DesiredPerspective) || null,
            context_content_json: contextContentJson || null,
          },
        });
        toast.success("Question updated successfully.");
        navigate({ to: "/insights/$id", params: { id: editQuestionId } });
        return;
      }

      // 3. Regular user question creation
      const created = await createQuestion({
        data: {
          title: title.trim(),
          description: description.trim(),
          topic,
          desired_perspective: (desiredPerspective as DesiredPerspective) || null,
          context_content_json: contextContentJson || null,
        },
      });
      toast.success("Question posted to The Relay.");
      if (created?.id) {
        navigate({ to: "/insights/$id", params: { id: created.id } });
      } else {
        navigate({ to: "/insights" });
      }
    } catch (err: any) {
      console.error("[AskQuestionPage] Submission error:", err);
      toast.error(err.message || "Failed to submit question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loadingProfile || loadingQuestion) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          <span className="text-xs font-mono uppercase tracking-wider">
            Loading question workspace...
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
              Sign In to Post Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Questions on The Relay are asked by verified business operators and receive practical perspectives from approved peers.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => navigate({ to: "/login" })}
              className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10"
            >
              Sign In to The Relay
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/insights" })}
              className="text-slate-600 font-mono text-xs h-9"
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
                ? `Your business profile is currently "${business.status}". Asking questions requires an approved business status to maintain trust and credibility.`
                : "Please complete your business registration first before asking questions on The Relay."}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {!business ? (
              <Button
                onClick={() => navigate({ to: "/onboarding" })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10"
              >
                Complete Onboarding
              </Button>
            ) : (
              <Button
                onClick={() => navigate({ to: "/business-profile" })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider h-10"
              >
                View Business Profile
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/insights" })}
              className="text-slate-600 font-mono text-xs h-9"
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
              onClick={() => navigate({ to: "/insights" })}
              className="h-8 px-2.5 text-slate-600 hover:text-slate-900 font-mono text-xs gap-1.5 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </Button>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                {isEditing ? "Edit Question" : "New Question"}
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
              {description.trim().length} characters (min 30)
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/insights" })}
              disabled={submitting}
              className="h-8 text-xs font-mono text-slate-500 hover:text-slate-800"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="h-9 px-5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider shadow-xs gap-1.5"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isEditing ? "Save Changes" : "Post Question"}</span>
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
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
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
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
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

          {/* Metadata Row: Topic & Desired Perspective */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50/70 border border-slate-200/80">
            <div className="space-y-1.5">
              <Label htmlFor="post-topic" className="text-xs font-semibold text-slate-700">
                Business Topic <span className="text-red-500">*</span>
              </Label>
              <Select value={topic} onValueChange={(val: any) => setTopic(val)}>
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
              <Label htmlFor="post-desired" className="text-xs font-semibold text-slate-700">
                Who I'd most like to hear from
              </Label>
              <Select
                value={desiredPerspective}
                onValueChange={(val: string) => setDesiredPerspective(val)}
              >
                <SelectTrigger
                  id="post-desired"
                  className="h-9 text-xs bg-white border-slate-200 focus:border-slate-800"
                >
                  <SelectValue placeholder="Target perspective" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {DESIRED_PERSPECTIVES.map((dp) => (
                    <SelectItem key={dp.value} value={dp.value} className="text-xs">
                      {dp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Question Title Statement */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                Question / Problem Statement <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {title.length}/200
              </span>
            </div>
            <textarea
              ref={titleInputRef}
              rows={1}
              placeholder="e.g., How do you structure pilot agreements for enterprise SaaS without giving away IP?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              onInput={adjustTitleHeight}
              maxLength={200}
              className="w-full text-xl sm:text-2xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 border-b border-slate-200 focus:border-slate-900 pb-1.5 pt-0.5 outline-none resize-none leading-snug transition-colors overflow-hidden"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Context & Details Rich-Text Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800">
                  Context & Details <span className="text-red-500">*</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Detail your business stage, what you've tried, key constraints, and specific decisions you're weighing.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {description.trim().length} chars (min 30)
              </span>
            </div>

            <QuestionRichTextEditor
              key={editQuestionId || "new-question-canvas"}
              contentJson={contextContentJson}
              initialPlainText={description}
              questionId={editQuestionId}
              businessId={business?.id || selectedBusinessId || "admin"}
              minHeight="520px"
              onChange={({ json, text }) => {
                setContextContentJson(json);
                setDescription(text);
                if (errors.description && text.trim().length >= 30) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.description;
                    return next;
                  });
                }
              }}
              placeholder="Provide complete context: current company size/metrics, trade-offs under consideration, architecture diagrams, or comparison tables..."
            />

            {errors.description && (
              <p className="text-xs text-red-500 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Helpful Tips Card */}
          <div className="p-4 rounded-lg bg-orange-50/30 border border-orange-200/60 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 text-orange-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Tips for high-response business questions</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
              <li>State your constraints clearly (e.g. tech stack, team bandwidth, or timeline).</li>
              <li>Insert diagrams, screenshots, or data tables using the rich-text toolbar.</li>
              <li>Verified operators provide deeper perspectives when the context is rich and transparent.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
