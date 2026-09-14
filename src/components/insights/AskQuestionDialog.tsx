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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, HelpCircle, Maximize2 } from "lucide-react";
import { createQuestion } from "../../functions/createQuestion";
import { updateQuestion } from "../../functions/updateQuestion";
import { Question, QuestionTopic, DesiredPerspective } from "../../types";
import { QuestionRichTextEditor } from "./QuestionRichTextEditor";

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

interface AskQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  questionToEdit?: Question | null;
}

export function AskQuestionDialog({
  open,
  onOpenChange,
  onSuccess,
  questionToEdit,
}: AskQuestionDialogProps) {
  const navigate = useNavigate();
  const isEditing = !!questionToEdit;
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState<QuestionTopic>("Operations");
  const [description, setDescription] = useState("");
  const [contextContentJson, setContextContentJson] = useState<string | null>(null);
  const [desiredPerspective, setDesiredPerspective] = useState<string>("any_business");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (questionToEdit) {
      setTitle(questionToEdit.title);
      setTopic(questionToEdit.topic);
      setDescription(questionToEdit.description);
      setContextContentJson(questionToEdit.context_content_json || null);
      setDesiredPerspective(questionToEdit.desired_perspective || "any_business");
    } else {
      setTitle("");
      setTopic("Operations");
      setDescription("");
      setContextContentJson(null);
      setDesiredPerspective("any_business");
    }
    setErrors({});
  }, [questionToEdit, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      if (isEditing && questionToEdit) {
        await updateQuestion({
          data: {
            question_id: questionToEdit.id,
            title: title.trim(),
            description: description.trim(),
            topic,
            desired_perspective: (desiredPerspective as DesiredPerspective) || null,
            context_content_json: contextContentJson || null,
          },
        });
        toast.success("Question updated successfully.");
      } else {
        await createQuestion({
          data: {
            title: title.trim(),
            description: description.trim(),
            topic,
            desired_perspective: (desiredPerspective as DesiredPerspective) || null,
            context_content_json: contextContentJson || null,
          },
        });
        toast.success("Question posted to The Relay.");
      }

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      console.error("[AskQuestionDialog] Submission failed:", err);
      toast.error(err.message || "Failed to submit question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                    {isEditing ? "Edit Question" : "Ask the Relay"}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    Pose a genuine business challenge, decision, or problem to verified operators.
                  </DialogDescription>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  navigate({
                    to: "/insights/ask",
                    search: questionToEdit ? { edit: questionToEdit.id } : {},
                  });
                }}
                className="h-8 px-2 text-xs font-mono text-slate-500 hover:text-slate-900 gap-1.5"
                title="Open in full screen page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Screen</span>
              </Button>
            </div>
          </DialogHeader>

          {/* Topic & Desired Perspective Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="question-topic" className="text-xs font-semibold text-slate-700">
                Business Topic <span className="text-red-500">*</span>
              </Label>
              <Select value={topic} onValueChange={(val: any) => setTopic(val)}>
                <SelectTrigger id="question-topic" className="h-10 text-sm bg-white border-slate-200">
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
              <Label htmlFor="desired-perspective" className="text-xs font-semibold text-slate-700">
                Who I'd most like to hear from
              </Label>
              <Select
                value={desiredPerspective}
                onValueChange={(val: string) => setDesiredPerspective(val)}
              >
                <SelectTrigger
                  id="desired-perspective"
                  className="h-10 text-sm bg-white border-slate-200"
                >
                  <SelectValue placeholder="Target perspective" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {DESIRED_PERSPECTIVES.map((dp) => (
                    <SelectItem key={dp.value} value={dp.value} className="text-sm">
                      {dp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="question-title" className="text-xs font-semibold text-slate-700">
                Question / Problem Statement <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {title.length}/200
              </span>
            </div>
            <Input
              id="question-title"
              placeholder="e.g., How do you structure pilot agreements for enterprise SaaS without giving away IP?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              className="h-10 text-sm bg-white border-slate-200 focus:border-slate-800"
            />
            {errors.title && <p className="text-[11px] text-red-500">{errors.title}</p>}
          </div>

          {/* Question Description / Rich-Text Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="question-desc" className="text-xs font-semibold text-slate-700">
                Context & Details <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {description.trim().length} chars (min 30)
              </span>
            </div>

            <QuestionRichTextEditor
              key={questionToEdit?.id || (open ? "new-open" : "new-closed")}
              contentJson={contextContentJson}
              initialPlainText={description}
              questionId={questionToEdit?.id}
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
              placeholder="Share the necessary background: your current business stage, the trade-offs you are weighing, what you have tried so far, and the specific decision or perspective you are seeking..."
            />

            {errors.description ? (
              <p className="text-[11px] text-red-500">{errors.description}</p>
            ) : (
              <p className="text-[11px] text-slate-500">
                Minimum 30 characters. High-context questions receive the most actionable operator perspectives.
              </p>
            )}
          </div>

          <DialogFooter className="pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="border-slate-200 text-slate-700 text-xs uppercase tracking-wider font-mono h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs uppercase tracking-wider font-mono h-9 px-5 shadow-sm"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
              {isEditing ? "Save Changes" : "Post Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
