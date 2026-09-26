import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Clock, AlertTriangle, X, ArrowRight } from "lucide-react";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * TOAST NOTIFICATION SYSTEM (Specification 03)
 * Executive Midnight #0F172A Container Notifications with Halo Icons & Inline CTAs
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface ToastOptions {
  id?: string;
  variant?: "success" | "warning" | "danger";
  title: string;
  badge?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  durationMs?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

type ToastListener = (toasts: ToastItem[]) => void;

class ExecutiveToastManager {
  private toasts: ToastItem[] = [];
  private listeners: Set<ToastListener> = new Set();
  private count = 0;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener(this.toasts);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const copy = [...this.toasts];
    this.listeners.forEach((l) => l(copy));
  }

  show(options: ToastOptions): string {
    const id = options.id || `exec-toast-${++this.count}-${Date.now()}`;
    const duration = options.durationMs ?? 5000;

    const item: ToastItem = {
      ...options,
      id,
      createdAt: Date.now(),
    };

    this.toasts = [item, ...this.toasts].slice(0, 5); // Keep max 5
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  success(title: string, options?: Partial<ToastOptions>): string {
    return this.show({
      variant: "success",
      title,
      description: options?.description || "",
      badge: options?.badge || "Stage 4 Complete",
      action: options?.action,
      ...options,
    });
  }

  warning(title: string, options?: Partial<ToastOptions>): string {
    return this.show({
      variant: "warning",
      title,
      description: options?.description || "",
      badge: options?.badge || "Action SLA",
      action: options?.action,
      ...options,
    });
  }

  danger(title: string, options?: Partial<ToastOptions>): string {
    return this.show({
      variant: "danger",
      title,
      description: options?.description || "",
      badge: options?.badge || "Security Halt",
      action: options?.action,
      ...options,
    });
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

export const executiveToast = new ExecutiveToastManager();

export function useExecutiveToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    return executiveToast.subscribe(setToasts);
  }, []);

  return {
    toasts,
    toast: executiveToast,
    dismiss: (id: string) => executiveToast.dismiss(id),
  };
}

export function ExecutiveToastContainer({ className }: { className?: string }) {
  const { toasts, dismiss } = useExecutiveToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-[120] flex flex-col space-y-3 pointer-events-none max-w-md w-full",
        className
      )}
    >
      {toasts.map((item) => (
        <ExecutiveToastItem key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
      ))}
    </div>
  );
}

export function ExecutiveToastItem({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: () => void;
}) {
  const variant = item.variant || "success";

  const config = {
    success: {
      haloBg: "bg-[#15803D]/20 border-[#16A34A]/50 text-[#22C55E]",
      icon: <Check className="w-4 h-4 stroke-[2.5]" />,
      badge: "text-[#DCFCE7] bg-[#15803D]/30 border-[#16A34A]/30",
      cta: "text-[#4ADE80] hover:text-[#86EFAC]",
    },
    warning: {
      haloBg: "bg-[#D97706]/20 border-[#D97706]/50 text-[#FBBF24]",
      icon: <Clock className="w-4 h-4 stroke-[2]" />,
      badge: "text-[#FDE68A] bg-[#D97706]/30 border-[#D97706]/30",
      cta: "text-[#FBBF24] hover:text-[#FDE68A]",
    },
    danger: {
      haloBg: "bg-[#DC2626]/20 border-[#DC2626]/50 text-[#F87171]",
      icon: <AlertTriangle className="w-4 h-4 stroke-[2]" />,
      badge: "text-[#FECACA] bg-[#DC2626]/30 border-[#DC2626]/30",
      cta: "text-[#F87171] hover:text-[#FCA5A5]",
    },
  }[variant];

  return (
    <div
      className="pointer-events-auto p-4 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl flex items-start justify-between gap-3 text-white transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div
          className={cn(
            "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
            config.haloBg
          )}
        >
          {config.icon}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-white">{item.title}</span>
            {item.badge && (
              <span
                className={cn(
                  "text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold",
                  config.badge
                )}
              >
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-[11px] text-slate-400 leading-snug break-words">
              {item.description}
            </p>
          )}
          {item.action && (
            <button
              type="button"
              onClick={() => {
                item.action?.onClick();
                onDismiss();
              }}
              className={cn(
                "text-[11px] font-semibold hover:underline pt-1 inline-flex items-center gap-1 cursor-pointer transition",
                config.cta
              )}
            >
              <span>{item.action.label}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-slate-500 hover:text-white transition text-sm cursor-pointer p-0.5"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
