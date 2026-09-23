import * as React from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   1. UNDERLINE / EXECUTIVE TABS COMPONENT
   ========================================================================== */

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  countVariant?: "default" | "active" | "urgent" | "muted";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ExecutiveTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  fullWidth?: boolean;
  variant?: "underline" | "boxed" | "pill";
}

export function ExecutiveTabs({
  tabs,
  activeTab,
  onTabChange,
  fullWidth = false,
  variant = "underline",
  className,
  ...props
}: ExecutiveTabsProps) {
  if (variant === "boxed") {
    return (
      <div
        className={cn(
          "w-full border-b border-[#c5c6cc]/70 bg-white rounded-xl px-2 shadow-none select-none",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "w-full",
            fullWidth ? `grid grid-cols-${tabs.length}` : "flex items-center gap-2",
          )}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                disabled={tab.disabled}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "py-3.5 border-b-2 font-sans text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                  fullWidth && "w-full",
                  isActive
                    ? "border-[#010611] text-[#010611] font-bold"
                    : "border-transparent text-[#505f76] hover:text-[#010611] hover:border-[#c5c6cc] group",
                )}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[11px] font-mono transition-colors",
                      isActive
                        ? "bg-[#010611] text-white font-bold"
                        : "bg-[#e6e8ea] text-[#505f76] group-hover:bg-[#d8dadc] group-hover:text-[#010611] font-medium",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 bg-[#f2f4f6] rounded-xl border border-[#c5c6cc]/40 select-none",
          className,
        )}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                isActive
                  ? "bg-white text-[#010611] font-bold shadow-xs border border-[#c5c6cc]/40"
                  : "text-[#505f76] hover:text-[#010611] hover:bg-white/50",
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold",
                    isActive ? "bg-[#010611] text-white" : "bg-[#e6e8ea] text-[#505f76]",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: "underline"
  return (
    <div
      className={cn("w-full border-b border-[#c5c6cc]/70 flex items-center gap-6 select-none", className)}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-3 border-b-2 font-sans text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed -mb-[1px]",
              isActive
                ? "border-[#010611] text-[#010611] font-bold"
                : "border-transparent text-[#505f76] hover:text-[#010611] hover:border-[#c5c6cc] group",
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold transition-colors",
                  isActive
                    ? "bg-[#010611] text-white"
                    : "bg-[#e6e8ea] text-[#505f76] group-hover:bg-[#d8dadc] group-hover:text-[#010611]",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
