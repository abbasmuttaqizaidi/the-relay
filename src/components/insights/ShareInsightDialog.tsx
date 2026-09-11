import { useState, useEffect } from "react";
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
import { Loader2, Lightbulb, ShieldCheck } from "lucide-react";
import { createKnowledgeInsight } from "../../functions/createKnowledgeInsight";
import { updateKnowledgeInsight } from "../../functions/updateKnowledgeInsight";
import {
  KnowledgeInsight,
  KnowledgeInsightTopic,
  KnowledgeInsightBasedOn,
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

export const BASED_ON_OPTIONS: {
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

interface ShareInsightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  insightToEdit?: KnowledgeInsight | null;
}

export function ShareInsightDialog({
  open,
  onOpenChange,
  onSuccess,
  insightToEdit,
}: ShareInsightDialogProps) {
  const isEditing = !!insightToEdit;
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState<KnowledgeInsightTopic>("Operations");
  const [content, setContent] = useState("");
  const [basedOn, setBasedOn] = useState<string>("business_experience");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (insightToEdit) {
      setTitle(insightToEdit.title);
      setTopic(insightToEdit.topic);
      setContent(insightToEdit.content);
      setBasedOn(insightToEdit.based_on || "business_experience");
    } else {
      setTitle("");
      setTopic("Operations");
      setContent("");
      setBasedOn("business_experience");
    }
    setErrors({});
  }, [insightToEdit, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 10) {
      newErrors.title = "Insight title must be at least 10 characters.";
    } else if (title.trim().length > 200) {
      newErrors.title = "Insight title cannot exceed 200 characters.";
    }

    if (!content.trim() || content.trim().length < 50) {
      newErrors.content = "Please write at least 50 characters sharing your insight.";
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

    try {
      setSubmitting(true);

      if (isEditing && insightToEdit) {
        await updateKnowledgeInsight({
          data: {
            knowledge_insight_id: insightToEdit.id,
            title: title.trim(),
            content: content.trim(),
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
          },
        });
        toast.success("Insight updated successfully.");
      } else {
        await createKnowledgeInsight({
          data: {
            title: title.trim(),
            content: content.trim(),
            topic,
            based_on: (basedOn as KnowledgeInsightBasedOn) || null,
          },
        });
        toast.success("Insight published to The Relay.");
      }

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      console.error("[ShareInsightDialog] Submission failed:", err);
      toast.error(err.message || "Failed to publish insight. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                  {isEditing ? "Edit Insight" : "Share an Insight"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Share something your business has learned that could be useful to others.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Topic & Based On grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="insight-topic" className="text-xs font-semibold text-slate-700">
                Topic <span className="text-red-500">*</span>
              </Label>
              <Select value={topic} onValueChange={(val: any) => setTopic(val)}>
                <SelectTrigger id="insight-topic" className="h-10 text-sm bg-white border-slate-200">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {TOPICS.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-sm">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.topic && <p className="text-[11px] text-red-500">{errors.topic}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="insight-based-on" className="text-xs font-semibold text-slate-700">
                Based On
              </Label>
              <Select value={basedOn} onValueChange={(val: string) => setBasedOn(val)}>
                <SelectTrigger id="insight-based-on" className="h-10 text-sm bg-white border-slate-200">
                  <SelectValue placeholder="Source of insight" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {BASED_ON_OPTIONS.map((bo) => (
                    <SelectItem key={bo.value} value={bo.value} className="text-sm">
                      {bo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="insight-title" className="text-xs font-semibold text-slate-700">
                Title <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {title.length}/200
              </span>
            </div>
            <Input
              id="insight-title"
              placeholder="e.g., 3 things we learned while building our B2B sales process"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              className="h-10 text-sm bg-white border-slate-200 focus:border-slate-800"
            />
            {errors.title && <p className="text-[11px] text-red-500">{errors.title}</p>}
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="insight-content" className="text-xs font-semibold text-slate-700">
                Content & Takeaway <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {content.length.toLocaleString()}/5,000
              </span>
            </div>
            <Textarea
              id="insight-content"
              placeholder="Share the experience, lesson, process, or advice you think another business could learn from..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              maxLength={5000}
              className="text-sm bg-white border-slate-200 focus:border-slate-800 resize-y leading-relaxed"
            />
            {errors.content && <p className="text-[11px] text-red-500">{errors.content}</p>}
          </div>

          {/* Trust Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Your approved business identity will be shown with this insight. Relay validates verified businesses, while your experiences provide authentic context for other operators.
            </span>
          </div>

          <DialogFooter className="pt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="text-xs border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider h-9 px-5"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Publishing...
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Publish Insight"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
