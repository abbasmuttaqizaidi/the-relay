import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Eye, TrendingUp, Loader2, Sparkles, Plus } from "lucide-react";
import { increaseAdminInsightViews } from "@/functions/increaseAdminInsightViews";

export interface AdminIncreaseViewsTarget {
  id: string;
  title: string;
  type: "question" | "knowledge";
  currentViews?: number;
}

export interface AdminIncreaseViewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminIncreaseViewsTarget | null;
  onSuccess?: (newViews: number) => void;
}

export function AdminIncreaseViewsDialog({
  open,
  onOpenChange,
  item,
  onSuccess,
}: AdminIncreaseViewsDialogProps) {
  const [selectedPreset, setSelectedPreset] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const PRESETS = [5, 10, 25, 50, 100];
  const activeAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedPreset;

  const handleIncrement = async () => {
    if (!activeAmount || activeAmount <= 0) {
      toast.error("Please select or enter a valid number of views to add.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await increaseAdminInsightViews({
        data: {
          type: item.type,
          id: item.id,
          amount: activeAmount,
        },
      });

      toast.success(
        `Added +${activeAmount} views to "${item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}". Total: ${res.newViews}`
      );
      onSuccess?.(res.newViews);
      onOpenChange(false);
      setCustomAmount("");
      setSelectedPreset(10);
    } catch (err: any) {
      console.error("[AdminIncreaseViews] Failed:", err);
      toast.error(err.message || "Failed to increase views.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 rounded-xl p-6 shadow-xl gap-4 text-left">
        <DialogHeader className="p-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-300/60 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </span>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Increase Views (Admin)
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Add verified operational visibility to this {item.type === "question" ? "question" : "knowledge article"}.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Item Info Summary */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
              {item.type === "question" ? "Question" : "Knowledge Insight"}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs font-semibold text-slate-700">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Views:</span>
              <strong className="text-slate-900">{item.currentViews ?? 0}</strong>
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
            {item.title}
          </h4>
        </div>

        {/* Quick Amount Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Select View Increment:
          </label>
          <div className="grid grid-cols-5 gap-2">
            {PRESETS.map((preset) => {
              const isSelected = !customAmount && selectedPreset === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCustomAmount("");
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                    isSelected
                      ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                      : "bg-[#F8FAFC] text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  +{preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-1.5">
          <label htmlFor="custom-view-input" className="text-xs font-medium text-slate-600 block">
            Or enter custom amount:
          </label>
          <div className="relative">
            <input
              id="custom-view-input"
              type="number"
              min="1"
              max="100000"
              placeholder="e.g. 150"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setCustomAmount(val);
              }}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-slate-200 rounded-md text-xs font-mono font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F172A] focus:bg-white transition-colors"
            />
            {customAmount && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-400 font-bold">
                VIEWS
              </span>
            )}
          </div>
        </div>

        {/* Summary & Submit */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs font-medium text-slate-500">
            New Total:{" "}
            <strong className="text-slate-900 font-mono">
              {(item.currentViews ?? 0) + (activeAmount > 0 ? activeAmount : 0)}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
              className="h-9 px-3 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting || activeAmount <= 0}
              onClick={handleIncrement}
              className="h-9 px-4 text-xs font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add +{activeAmount} Views</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
