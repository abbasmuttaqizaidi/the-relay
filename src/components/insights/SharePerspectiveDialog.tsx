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
import { Loader2, MessageSquareQuote } from "lucide-react";
import { createPerspective } from "../../functions/createPerspective";
import { updatePerspective } from "../../functions/updatePerspective";
import { Perspective, BasedOn } from "../../types";

const BASED_ON_OPTIONS: { value: BasedOn; label: string }[] = [
  { value: "Our business experience", label: "Our business experience" },
  { value: "A project we worked on", label: "A project we worked on" },
  { value: "An experiment or test", label: "An experiment or test" },
  { value: "Industry experience", label: "Industry experience" },
  { value: "Personal experience", label: "Personal experience" },
  { value: "General perspective", label: "General perspective" },
];

interface SharePerspectiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  questionId: string;
  questionTitle: string;
  perspectiveToEdit?: Perspective | null;
}

export function SharePerspectiveDialog({
  open,
  onOpenChange,
  onSuccess,
  questionId,
  questionTitle,
  perspectiveToEdit,
}: SharePerspectiveDialogProps) {
  const isEditing = !!perspectiveToEdit;
  const [content, setContent] = useState("");
  const [qualification, setQualification] = useState("");
  const [basedOn, setBasedOn] = useState<BasedOn>("Our business experience");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (perspectiveToEdit) {
      setContent(perspectiveToEdit.content);
      setQualification(perspectiveToEdit.qualification);
      setBasedOn(perspectiveToEdit.based_on);
      setRelevantExperience(perspectiveToEdit.relevant_experience || "");
    } else {
      setContent("");
      setQualification("");
      setBasedOn("Our business experience");
      setRelevantExperience("");
    }
    setErrors({});
  }, [perspectiveToEdit, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!content.trim() || content.trim().length < 20) {
      newErrors.content = "Perspective must be at least 20 characters.";
    } else if (content.trim().length > 1500) {
      newErrors.content = "Perspective cannot exceed 1500 characters.";
    }

    if (!qualification.trim() || qualification.trim().length < 10) {
      newErrors.qualification = "Please state why you are qualified in at least 10 characters.";
    } else if (qualification.trim().length > 300) {
      newErrors.qualification = "Qualification cannot exceed 300 characters.";
    }

    if (!basedOn) {
      newErrors.basedOn = "Please select what this perspective is based on.";
    }

    if (relevantExperience.trim().length > 200) {
      newErrors.relevantExperience = "Relevant experience cannot exceed 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      if (isEditing && perspectiveToEdit) {
        await updatePerspective({
          data: {
            perspective_id: perspectiveToEdit.id,
            content: content.trim(),
            qualification: qualification.trim(),
            based_on: basedOn,
            relevant_experience: relevantExperience.trim() || null,
          },
        });
        toast.success("Perspective updated successfully.");
      } else {
        await createPerspective({
          data: {
            question_id: questionId,
            content: content.trim(),
            qualification: qualification.trim(),
            based_on: basedOn,
            relevant_experience: relevantExperience.trim() || null,
          },
        });
        toast.success("Perspective shared with the question owner and network.");
      }

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      console.error("[SharePerspectiveDialog] Submission error:", err);
      toast.error(err.message || "Failed to share perspective. Please try again.");
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
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                  {isEditing ? "Edit Your Perspective" : "Share Your Perspective"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 line-clamp-1">
                  Re: "{questionTitle}"
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Context box: Guidance banner */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">Operator Ground Rule:</span> Perspectives on The Relay are rooted in authentic experience rather than generic commentary or sales pitches.
          </div>

          {/* Perspective Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="perspective-content" className="text-xs font-semibold text-slate-700">
                Your Perspective <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {content.length}/1500
              </span>
            </div>
            <Textarea
              id="perspective-content"
              rows={6}
              placeholder="Provide specific, practical takeaways. What worked? What surprised you? What trade-offs or pitfalls should this business watch out for?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1500}
              className="text-sm bg-white border-slate-200 focus:border-slate-800 leading-relaxed resize-y"
            />
            {errors.content && <p className="text-[11px] text-red-500">{errors.content}</p>}
          </div>

          {/* Qualification Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="perspective-qual" className="text-xs font-semibold text-slate-700">
                Why are you qualified to answer? <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] font-mono text-slate-400">
                {qualification.length}/300
              </span>
            </div>
            <Input
              id="perspective-qual"
              placeholder="e.g., We transitioned from founder-led sales to our first 3 account executives in 2024."
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              maxLength={300}
              className="h-10 text-sm bg-white border-slate-200 focus:border-slate-800"
            />
            {errors.qualification && (
              <p className="text-[11px] text-red-500">{errors.qualification}</p>
            )}
          </div>

          {/* Based On & Relevant Experience Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="perspective-based" className="text-xs font-semibold text-slate-700">
                Based On <span className="text-red-500">*</span>
              </Label>
              <Select value={basedOn} onValueChange={(val: any) => setBasedOn(val)}>
                <SelectTrigger id="perspective-based" className="h-10 text-sm bg-white border-slate-200">
                  <SelectValue placeholder="Select basis" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {BASED_ON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-sm">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.basedOn && <p className="text-[11px] text-red-500">{errors.basedOn}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="perspective-exp" className="text-xs font-semibold text-slate-700">
                  Relevant Experience <span className="text-slate-400 font-normal">(Optional)</span>
                </Label>
                <span className="text-[11px] font-mono text-slate-400">
                  {relevantExperience.length}/200
                </span>
              </div>
              <Input
                id="perspective-exp"
                placeholder="e.g., 6 years B2B SaaS, $2M ARR"
                value={relevantExperience}
                onChange={(e) => setRelevantExperience(e.target.value)}
                maxLength={200}
                className="h-10 text-sm bg-white border-slate-200 focus:border-slate-800"
              />
              {errors.relevantExperience && (
                <p className="text-[11px] text-red-500">{errors.relevantExperience}</p>
              )}
            </div>
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
              {isEditing ? "Save Perspective" : "Publish Perspective"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
