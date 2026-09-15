import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Lightbulb, Building2, ArrowRight } from "lucide-react";
import { createAdminKnowledgeInsight } from "../../functions/createAdminKnowledgeInsight";
import { KnowledgeInsightTopic, KnowledgeInsightBasedOn } from "../../types";

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

const CUSTOM_INDUSTRIES = [
  "SaaS",
  "Technology & Software",
  "AI & Automation",
  "Marketing Agency",
  "Development Agency",
  "Fintech",
  "Consulting & Advisory",
  "E-commerce & Retail",
  "Healthcare",
  "Logistics & Supply Chain",
  "Legal",
  "Cybersecurity",
  "Manufacturing",
  "Media & Advertising",
  "Real Estate",
  "Other",
];

interface BusinessOption {
  id: string;
  company_name: string;
  status: string;
  industry?: string | null;
}

interface AdminCreateKnowledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  businesses: BusinessOption[];
}

export function AdminCreateKnowledgeDialog({
  open,
  onOpenChange,
  onSuccess,
  businesses,
}: AdminCreateKnowledgeDialogProps) {
  const navigate = useNavigate();
  const [businessMode, setBusinessMode] = useState<"existing" | "custom">("existing");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [customCompanyName, setCustomCompanyName] = useState("");
  const [customIndustry, setCustomIndustry] = useState("SaaS");
  const [customWebsite, setCustomWebsite] = useState("");

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState<KnowledgeInsightTopic>("Operations");
  const [content, setContent] = useState("");
  const [basedOn, setBasedOn] = useState<string>("business_experience");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinueInFullEditor = () => {
    try {
      sessionStorage.setItem(
        "relay_knowledge_draft_init",
        JSON.stringify({
          title: title.trim(),
          topic,
          based_on: basedOn,
          content: content.trim(),
        }),
      );
    } catch {
      // Ignore
    }
    onOpenChange(false);
    navigate({ to: "/insights/knowledge/new" });
  };

  useEffect(() => {
    if (open) {
      const defaultBiz =
        businesses.find((b) => b.status === "approved") || businesses[0];
      if (defaultBiz) {
        setSelectedBusinessId(defaultBiz.id);
        setBusinessMode("existing");
      } else {
        setBusinessMode("custom");
      }
      setCustomCompanyName("");
      setCustomIndustry("SaaS");
      setCustomWebsite("");
      setTitle("");
      setTopic("Operations");
      setContent("");
      setBasedOn("business_experience");
      setErrors({});
    }
  }, [open, businesses]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (businessMode === "existing") {
      if (!selectedBusinessId) {
        newErrors.business = "Please select an author business.";
      }
    } else {
      if (!customCompanyName.trim() || customCompanyName.trim().length < 2) {
        newErrors.business = "Please enter a company name (at least 2 characters).";
      } else if (customCompanyName.trim().length > 100) {
        newErrors.business = "Company name cannot exceed 100 characters.";
      }
    }

    if (!title.trim() || title.trim().length < 10) {
      newErrors.title = "Insight title must be at least 10 characters.";
    } else if (title.trim().length > 200) {
      newErrors.title = "Insight title cannot exceed 200 characters.";
    }

    if (!content.trim() || content.trim().length < 50) {
      newErrors.content = "Insight content must be at least 50 characters.";
    } else if (content.trim().length > 5000) {
      newErrors.content = "Content cannot exceed 5000 characters.";
    }

    if (!topic) {
      newErrors.topic = "Please select a topic.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createAdminKnowledgeInsight({
        data: {
          business_id: businessMode === "existing" ? selectedBusinessId : undefined,
          custom_company_name:
            businessMode === "custom" ? customCompanyName.trim() : undefined,
          custom_industry: businessMode === "custom" ? customIndustry : undefined,
          custom_website:
            businessMode === "custom" ? customWebsite.trim() : undefined,
          title: title.trim(),
          content: content.trim(),
          topic,
          based_on: (basedOn || null) as any,
          status: "published",
        },
      });

      toast.success("Knowledge insight published successfully via Admin.");
      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      console.error("[AdminCreateKnowledgeDialog] Error:", err);
      toast.error(err?.message || "Failed to publish knowledge insight.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white border border-slate-200 rounded-[3px] p-6 shadow-xl">
        <DialogHeader className="space-y-1.5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[2px] bg-slate-100 text-slate-900 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900 font-sans">
                Publish Knowledge Insight (Admin)
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Post a practical lesson, tip, or business insight on behalf of any company.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Author Business Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                Post as Business *
              </Label>

              {/* Business Mode Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-[3px] border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setBusinessMode("existing");
                    if (errors.business) setErrors((prev) => ({ ...prev, business: "" }));
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-[2px] transition-all cursor-pointer ${
                    businessMode === "existing"
                      ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Existing ({businesses.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBusinessMode("custom");
                    if (errors.business) setErrors((prev) => ({ ...prev, business: "" }));
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-[2px] transition-all cursor-pointer flex items-center gap-1 ${
                    businessMode === "custom"
                      ? "bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>+</span> Custom Name
                </button>
              </div>
            </div>

            {businessMode === "existing" ? (
              <div className="space-y-1.5">
                <Select
                  value={selectedBusinessId}
                  onValueChange={(val) => {
                    if (val === "__custom__") {
                      setBusinessMode("custom");
                      return;
                    }
                    setSelectedBusinessId(val);
                    if (errors.business) setErrors((prev) => ({ ...prev, business: "" }));
                  }}
                >
                  <SelectTrigger className="h-10 text-xs bg-white border-slate-200 rounded-[2px] focus:ring-1 focus:ring-slate-900">
                    <SelectValue placeholder="Select registered business..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 max-h-56">
                    {businesses.map((b) => (
                      <SelectItem key={b.id} value={b.id} className="text-xs">
                        <span className="font-semibold text-slate-900">{b.company_name}</span>
                        <span className="text-slate-400 text-[10px] ml-2 font-mono">
                          ({b.status}) {b.industry ? `• ${b.industry}` : ""}
                        </span>
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="__custom__"
                      className="text-xs text-blue-600 font-mono font-medium border-t border-slate-100 mt-1 cursor-pointer"
                    >
                      + Type any custom business name...
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.business && (
                  <p className="text-[11px] text-red-500 font-mono">{errors.business}</p>
                )}
              </div>
            ) : (
              <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-[3px] space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-mono text-slate-700 font-semibold">
                      Company / Business Name *
                    </Label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Type any name you want
                    </span>
                  </div>
                  <Input
                    value={customCompanyName}
                    onChange={(e) => {
                      setCustomCompanyName(e.target.value);
                      if (errors.business) setErrors((prev) => ({ ...prev, business: "" }));
                    }}
                    placeholder="e.g. Stripe, Acme Corp, Bain & Co, Postman"
                    className="h-9 text-xs bg-white border-slate-200 rounded-[2px]"
                    maxLength={100}
                    autoFocus
                  />
                  {errors.business && (
                    <p className="text-[11px] text-red-500 font-mono">{errors.business}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Industry (Optional)
                    </Label>
                    <Select value={customIndustry} onValueChange={setCustomIndustry}>
                      <SelectTrigger className="h-8 text-xs bg-white border-slate-200 rounded-[2px]">
                        <SelectValue placeholder="Select industry..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 max-h-48">
                        {CUSTOM_INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind} className="text-xs">
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Website (Optional)
                    </Label>
                    <Input
                      value={customWebsite}
                      onChange={(e) => setCustomWebsite(e.target.value)}
                      placeholder="https://company.com"
                      className="h-8 text-xs bg-white border-slate-200 rounded-[2px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Topic Select */}
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Business Topic *
            </Label>
            <Select
              value={topic}
              onValueChange={(val) => {
                setTopic(val as KnowledgeInsightTopic);
                if (errors.topic) setErrors((prev) => ({ ...prev, topic: "" }));
              }}
            >
              <SelectTrigger className="h-10 text-xs bg-white border-slate-200 rounded-[2px]">
                <SelectValue placeholder="Select topic..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {TOPICS.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-xs">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.topic && (
              <p className="text-[11px] text-red-500 font-mono">{errors.topic}</p>
            )}
          </div>

          {/* Insight Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Insight Title *
              </Label>
              <span
                className={`text-[10px] font-mono ${
                  title.length > 200
                    ? "text-red-500 font-bold"
                    : title.length >= 10
                      ? "text-emerald-600 font-bold"
                      : "text-slate-400"
                }`}
              >
                {title.length}/200
              </span>
            </div>
            <Input
              type="text"
              placeholder="e.g., How we reduced customer churn by 40% using automated feedback loops"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              className="h-10 text-xs bg-white border-slate-200 rounded-[2px] focus:ring-1 focus:ring-slate-900"
              maxLength={200}
            />
            {errors.title && (
              <p className="text-[11px] text-red-500 font-mono">{errors.title}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                Practical Insight / Lesson *
              </Label>
              <span
                className={`text-[10px] font-mono ${
                  content.length > 5000
                    ? "text-red-500 font-bold"
                    : content.length >= 50
                      ? "text-emerald-600 font-bold"
                      : "text-slate-400"
                }`}
              >
                {content.length}/5000
              </span>
            </div>
            <Textarea
              placeholder="Share the practical takeaway, context, what worked, and what other operators should look out for..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors((prev) => ({ ...prev, content: "" }));
              }}
              className="min-h-[140px] text-xs bg-white border-slate-200 rounded-[2px] leading-relaxed resize-y focus:ring-1 focus:ring-slate-900"
              maxLength={5000}
            />
            {errors.content && (
              <p className="text-[11px] text-red-500 font-mono">{errors.content}</p>
            )}
          </div>

          {/* Based On */}
          <div className="space-y-1.5">
            <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Based On (Transparency Tag)
            </Label>
            <Select value={basedOn} onValueChange={setBasedOn}>
              <SelectTrigger className="h-10 text-xs bg-white border-slate-200 rounded-[2px]">
                <SelectValue placeholder="Select basis..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {BASED_ON_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={handleContinueInFullEditor}
              className="text-xs font-mono border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs h-10 px-4"
            >
              <span>Continue in Full Editor</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
            </Button>

            <div className="flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
                className="text-xs font-mono uppercase tracking-wider h-10 px-4 rounded-[2px] border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || businesses.length === 0}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-10 px-6 rounded-[2px] shadow-sm flex items-center gap-2 cursor-pointer font-bold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing Insight...
                  </>
                ) : (
                  "Publish Insight"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
