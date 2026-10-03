import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/design-system";
import { openSwitchProfileModal } from "@/lib/switch-profile-modal-store";
import { cn } from "@/lib/utils";

interface SwitchProfileButtonProps {
  className?: string;
  size?: "sm" | "default";
}

export function SwitchProfileButton({ className, size = "sm" }: SwitchProfileButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => openSwitchProfileModal()}
      className={cn(
        "relative overflow-hidden group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold select-none cursor-pointer",
        "backdrop-blur-md bg-gradient-to-b from-[#252b3b]/90 via-[#0d1322]/95 to-[#010611]",
        "border border-white/20 hover:border-white/40",
        "shadow-[0_4px_14px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.35)]",
        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.28),inset_0_1px_2px_rgba(255,255,255,0.6)]",
        "active:scale-95 transition-all duration-300 font-sans shrink-0",
        size === "sm" ? "h-8 px-2.5 text-[11px]" : "h-9 px-3.5 text-xs",
        className
      )}
      title="Switch Profile Mode"
    >
      {/* Shining glass reflection beam */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform pointer-events-none" />
      {/* Glass glossy top highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      <ArrowLeftRight className="w-3.5 h-3.5 text-white/90 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
      <span className="tracking-wide">Switch</span>
    </Button>
  );
}
