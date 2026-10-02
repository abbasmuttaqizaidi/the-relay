import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { updateInsightPostTime } from "@/functions/updateInsightPostTime";

export interface AdminEditPostTimeTarget {
  id: string;
  title: string;
  type: "question" | "knowledge" | "comment";
  currentDate: string; // ISO string
}

export interface AdminEditPostTimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminEditPostTimeTarget | null;
  onSuccess?: () => void;
}

export function AdminEditPostTimeDialog({
  open,
  onOpenChange,
  item,
  onSuccess,
}: AdminEditPostTimeDialogProps) {
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form values when item changes
  useEffect(() => {
    if (item?.currentDate) {
      const d = new Date(item.currentDate);
      // Format: YYYY-MM-DD
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      setDateValue(`${yyyy}-${mm}-${dd}`);
      // Format: HH:MM
      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      setTimeValue(`${hh}:${min}`);
    }
  }, [item?.currentDate]);

  if (!item) return null;

  const handleSave = async () => {
    if (!dateValue) {
      toast.error("Please select a date.");
      return;
    }

    const newDateStr = timeValue
      ? `${dateValue}T${timeValue}:00`
      : `${dateValue}T00:00:00`;

    const parsedDate = new Date(newDateStr);
    if (isNaN(parsedDate.getTime())) {
      toast.error("Invalid date or time.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateInsightPostTime({
        data: {
          id: item.id,
          type: item.type,
          newDate: parsedDate.toISOString(),
        },
      });

      toast.success(
        `Post time updated to ${parsedDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} at ${parsedDate.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to update post time.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFormatted = new Date(item.currentDate).toLocaleDateString(
    undefined,
    { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            Edit Post Time
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Change when this {item.type === "question" ? "question" : "knowledge article"} appears to have been posted.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {/* Item Title */}
          <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 mb-0.5">
              {item.type === "question" ? "Question" : "Knowledge Article"}
            </p>
            <p className="text-sm font-semibold text-[#0b1c30] line-clamp-2">
              {item.title}
            </p>
          </div>

          {/* Current Post Time */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Current: <span className="font-mono font-semibold text-slate-700">{currentFormatted}</span></span>
          </div>

          {/* Date & Time Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-post-date" className="text-xs font-semibold text-slate-600">
                Date
              </label>
              <input
                id="admin-post-date"
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="h-10 px-3 rounded-md border border-slate-200 bg-white text-sm text-[#0b1c30] font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-post-time" className="text-xs font-semibold text-slate-600">
                Time
              </label>
              <input
                id="admin-post-time"
                type="time"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="h-10 px-3 rounded-md border border-slate-200 bg-white text-sm text-[#0b1c30] font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={isSubmitting || !dateValue}
              className="gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Calendar className="w-3.5 h-3.5" />
              )}
              <span>{isSubmitting ? "Saving..." : "Update Post Time"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
