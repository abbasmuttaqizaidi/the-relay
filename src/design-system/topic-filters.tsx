import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * ACTIVE TOPIC FILTER PILLS (Specification 01 - Topic Filters)
 * Interactive quick-filter buttons with live counts & semantic status dots
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface TopicFilterItem {
  id: string;
  label: string;
  count?: number;
  variant?: "all" | "success" | "warning" | "danger" | "terracotta" | "neutral";
  dotColor?: string;
  showDot?: boolean;
}

export interface TopicFilterPillsProps {
  filters: TopicFilterItem[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  className?: string;
}

export function TopicFilterPills({
  filters,
  activeFilter,
  onFilterChange,
  className,
}: TopicFilterPillsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const variant = filter.variant || (filter.id === "all" ? "all" : "neutral");

        let style = "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
        let dotClass = "";
        let countStyle = "bg-slate-100 text-slate-600";

        if (isActive) {
          if (variant === "all") {
            style = "bg-black text-white border-transparent shadow-xs";
            countStyle = "bg-white/20 text-white";
          } else if (variant === "success") {
            style = "bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7] shadow-xs font-bold";
            dotClass = "bg-[#16A34A]";
            countStyle = "text-[#15803D]";
          } else if (variant === "warning") {
            style = "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] shadow-xs font-bold";
            dotClass = "bg-[#D97706]";
            countStyle = "text-[#B45309]";
          } else if (variant === "danger") {
            style = "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA] shadow-xs font-bold";
            dotClass = "bg-[#DC2626]";
            countStyle = "text-[#991B1B]";
          } else if (variant === "terracotta") {
            style = "bg-[#FFF1F2] text-[#9A3412] border-[#FED7AA] shadow-xs font-bold";
            dotClass = "bg-[#C2410C]";
            countStyle = "text-[#9A3412]";
          } else {
            style = "bg-slate-900 text-white border-transparent shadow-xs";
            countStyle = "bg-white/20 text-white";
          }
        } else {
          if (variant === "success") {
            dotClass = "bg-[#16A34A]";
          } else if (variant === "warning") {
            dotClass = "bg-[#D97706]";
          } else if (variant === "danger") {
            dotClass = "bg-[#DC2626]";
          } else if (variant === "terracotta") {
            dotClass = "bg-[#C2410C]";
          }
        }

        const showDot = filter.showDot ?? Boolean(dotClass);

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-lg border transition-all inline-flex items-center gap-1.5 cursor-pointer select-none",
              style
            )}
          >
            {showDot && dotClass && (
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotClass)} />
            )}
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                  countStyle
                )}
              >
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
