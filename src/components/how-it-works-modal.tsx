import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, Pause, RotateCcw } from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRADITIONAL_STEPS = [
  { title: "Search businesses", time: 0.4 },
  { title: "Find someone relevant", time: 0.8 },
  { title: "Send cold message", time: 1.2 },
  { title: "Wait", time: 1.6 },
  { title: "Follow up", time: 2.0 },
  { title: "Maybe get a response", time: 2.4 },
];

const RELAY_STEPS = [
  { title: "Find an active opportunity", time: 4.2 },
  { title: "See what the business needs", time: 4.6 },
  { title: "Show what you can offer", time: 5.0 },
  { title: "Business reviews your interest", time: 5.4 },
  { title: "Both sides agree", time: 5.8 },
  { title: "Introduction", time: 6.2 },
];

const TOTAL_DURATION = 7.6; // seconds

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Reset playback whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setIsPlaying(true);
      lastTimeRef.current = null;
    } else {
      setIsPlaying(false);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
  }, [isOpen]);

  // Video timer ticker
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      lastTimeRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (now - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen, isPlaying]);

  const isTraditional = currentTime < 3.8;
  const isRelay = currentTime >= 3.8;
  const isFinished = currentTime >= TOTAL_DURATION;

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    lastTimeRef.current = null;
  };

  const handleJumpToTraditional = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    lastTimeRef.current = null;
  };

  const handleJumpToRelay = () => {
    setCurrentTime(3.8);
    setIsPlaying(true);
    lastTimeRef.current = null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-full max-w-[420px] max-h-[90dvh] overflow-y-auto bg-white text-slate-900 border border-slate-200 p-0 sm:p-0 gap-0 rounded-xl shadow-2xl">
        <DialogTitle className="sr-only">How It Works Walkthrough</DialogTitle>
        <DialogDescription className="sr-only">
          Animated walkthrough showing Traditional Approach vs With The Relay.
        </DialogDescription>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
          {/* Phase 1: Traditional Approach */}
          {isTraditional && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              {/* Centered Heading with safe margins from close button */}
              <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-950 text-center tracking-tight px-8 sm:px-6">
                Traditional Approach
              </h2>

              {/* Checklist items sliding in from left */}
              <div className="space-y-1.5 pt-1 max-w-sm mx-auto w-full overflow-hidden">
                {TRADITIONAL_STEPS.map((step, idx) => {
                  const isVisible = currentTime >= step.time;
                  return (
                    <div
                      key={idx}
                      style={{
                        transform: isVisible ? "translateX(0)" : "translateX(-28px)",
                        opacity: isVisible ? 1 : 0,
                        transition:
                          "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out",
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 sm:py-1.5 rounded-[4px] bg-slate-50 border border-slate-200/90 text-slate-800 text-xs sm:text-[13px] font-sans"
                    >
                      <span className="w-4.5 h-4.5 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800 leading-snug">{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phase 2: With The Relay */}
          {isRelay && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              {/* Centered Heading with safe margins from close button */}
              <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-950 text-center tracking-tight px-8 sm:px-6">
                With The Relay
              </h2>

              {/* Checklist items sliding in from left */}
              <div className="space-y-1.5 pt-1 max-w-sm mx-auto w-full overflow-hidden">
                {RELAY_STEPS.map((step, idx) => {
                  const isVisible = currentTime >= step.time;
                  return (
                    <div
                      key={idx}
                      style={{
                        transform: isVisible ? "translateX(0)" : "translateX(-28px)",
                        opacity: isVisible ? 1 : 0,
                        transition:
                          "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out",
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 sm:py-1.5 rounded-[4px] bg-orange-50/70 border border-orange-200 text-slate-950 text-xs sm:text-[13px] font-sans"
                    >
                      <span className="w-4.5 h-4.5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 shadow-2xs">
                        ✓
                      </span>
                      <span className="font-semibold text-slate-900 leading-snug">{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Player Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3.5 gap-2">
            {/* Play/Pause & Replay */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (isFinished) {
                    handleRestart();
                  } else {
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isFinished ? (
                  <RotateCcw className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                ) : isPlaying ? (
                  <Pause className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="w-8 h-8 sm:w-7 sm:h-7 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              </button>
            </div>

            {/* Stage Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold shrink-0">
              <button
                type="button"
                onClick={handleJumpToTraditional}
                className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded transition-colors cursor-pointer ${
                  isTraditional
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Traditional
              </button>
              <button
                type="button"
                onClick={handleJumpToRelay}
                className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded transition-colors cursor-pointer ${
                  isRelay
                    ? "bg-orange-600 text-white"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                With Relay
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
