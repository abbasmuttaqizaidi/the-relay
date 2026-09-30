import React, { useEffect, useState } from "react";
import { useClerk, useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import { useNavigate, Link } from "@tanstack/react-router";
import { X, MessageSquare, ShieldCheck, ArrowRight, Loader2, Sparkles, Mail, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { markGlobalAuthPromptShown, savePendingCommentSession } from "@/lib/discussion-session";

interface InsightsPublicAuthPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenContributorSetup?: () => void;
  tabName?: "questions" | "knowledge";
  pendingComment?: string;
  itemId?: string;
  itemType?: "question" | "knowledge";
  parentId?: string | null;
  triggerSource?: "comment" | "upvote" | "landing";
}

export function InsightsPublicAuthPromptModal({
  open,
  onOpenChange,
  onOpenContributorSetup,
  tabName = "questions",
  pendingComment,
  itemId,
  itemType,
  parentId,
  triggerSource = "comment",
}: InsightsPublicAuthPromptModalProps) {
  const clerk = useClerk();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Escape key listener
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  const handleDismiss = () => {
    markGlobalAuthPromptShown();
    onOpenChange(false);
  };

  const getReturnUrl = () => {
    if (typeof window === "undefined") return "/insights";
    const isDetailPage =
      window.location.pathname.startsWith("/insights/") &&
      window.location.pathname !== "/insights";

    return (
      window.location.pathname +
      window.location.search +
      (window.location.hash || (isDetailPage ? "#discussion-system" : ""))
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      markGlobalAuthPromptShown();

      if (pendingComment && itemId) {
        savePendingCommentSession(itemId, {
          content: pendingComment,
          parentId: parentId || undefined,
          timestamp: Date.now(),
        });
      }

      const returnUrl = getReturnUrl();

      try {
        sessionStorage.setItem("relay_pending_contributor_onboarding", "true");
      } catch {}

      let authResource =
        signIn ||
        signUp ||
        (clerk as any)?.client?.signIn ||
        (clerk as any)?.client?.signUp;

      // If Clerk is still initializing in the browser, wait briefly
      if (!authResource && (clerk as any)?.loaded === false) {
        for (let i = 0; i < 10; i++) {
          await new Promise((r) => setTimeout(r, 150));
          authResource =
            signIn ||
            signUp ||
            (clerk as any)?.client?.signIn ||
            (clerk as any)?.client?.signUp;
          if (authResource) break;
        }
      }

      if (authResource && typeof authResource.authenticateWithRedirect === "function") {
        await authResource.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: returnUrl,
          continueSignUp: true,
          continueSignIn: true,
        });
        return;
      }

      // Fallback: If authenticateWithRedirect is not available, navigate to login with returnUrl
      onOpenChange(false);
      navigate({ to: "/login", search: { redirect: returnUrl } as any });
    } catch (err: any) {
      console.error("[Google OAuth] Error:", err);
      toast.error(err?.message || "Failed to initialize Google Sign-in");
      setLoading(false);
    }
  };

  const handleEmailSignUp = () => {
    if (pendingComment && itemId) {
      savePendingCommentSession(itemId, {
        content: pendingComment,
        parentId: parentId || undefined,
        timestamp: Date.now(),
      });
    }
    markGlobalAuthPromptShown();
    onOpenChange(false);
    const returnUrl = getReturnUrl();
    navigate({ to: "/signup", search: { redirect: returnUrl } as any });
  };

  const handleEmailSignIn = () => {
    if (pendingComment && itemId) {
      savePendingCommentSession(itemId, {
        content: pendingComment,
        parentId: parentId || undefined,
        timestamp: Date.now(),
      });
    }
    markGlobalAuthPromptShown();
    onOpenChange(false);
    const returnUrl = getReturnUrl();
    navigate({ to: "/login", search: { redirect: returnUrl } as any });
  };

  const hasPendingComment = Boolean(pendingComment && pendingComment.trim().length > 0);
  const contextTitle =
    tabName === "knowledge" ? "Knowledge Base & Playbooks" : "Peer Advisory & Questions";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#c5c6cc]/80 p-6 sm:p-7 relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#505f76] hover:text-[#010611] hover:bg-[#f2f4f6] transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eceef0] text-[#505f76] text-[11px] font-mono uppercase tracking-wider font-semibold">
          {hasPendingComment ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Valuable Perspective</span>
            </>
          ) : triggerSource === "upvote" ? (
            <>
              <ArrowUp className="w-3.5 h-3.5 text-orange-600" />
              <span>Valuable Feedback</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-3.5 h-3.5 text-[#010611]" />
              <span>Discussion &amp; Perspectives</span>
            </>
          )}
        </div>

        {/* Modal Title & Subtitle */}
        <div className="mt-3.5 space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#010611] font-display leading-tight">
            {hasPendingComment || triggerSource === "upvote"
              ? "Your response could be valuable to someone else"
              : "Join the Discussion"}
          </h3>
          <p className="text-xs sm:text-sm text-[#505f76] leading-relaxed font-sans">
            {hasPendingComment
              ? "Please create an account or sign in to share your perspective with the community. Real operational experiences help fellow operators make better decisions."
              : triggerSource === "upvote"
              ? "Please create an account or sign in to upvote perspectives. Real operator feedback helps fellow operators discover valuable insights."
              : `Log in to share your operational experience, ask questions, and comment on ${contextTitle} alongside verified operators.`}
          </p>
        </div>

        {/* Conditional Middle Block: Draft Preview (if pending comment) OR Benefits List (if landing/upvote prompt) */}
        {hasPendingComment ? (
          <div className="my-4 p-3.5 bg-[#f7f9fb] border border-[#e6e8ea] rounded-lg text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider text-[#505f76] font-semibold">
              <span>Your Perspective</span>
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Draft Saved
              </span>
            </div>
            <p className="text-[#191c1e] italic line-clamp-3 font-sans leading-relaxed text-[13px] bg-white p-2.5 rounded border border-[#c5c6cc]/40">
              "{pendingComment}"
            </p>
            <span className="text-[11px] text-[#505f76] block pt-0.5">
              Will be published automatically under your verified profile once you sign in.
            </span>
          </div>
        ) : triggerSource === "upvote" ? (
          <div className="my-5 p-3.5 bg-[#f7f9fb] border border-[#e6e8ea] rounded-lg space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0 font-bold text-orange-600">
                ▲
              </span>
              <span className="leading-snug">
                Upvote perspectives to highlight valuable insights from real operators
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0">
                💬
              </span>
              <span className="leading-snug">
                Publish comments and replies on questions &amp; articles
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0">
                🛡️
              </span>
              <span className="leading-snug">
                Get recognized with verified contributor credentials
              </span>
            </div>
          </div>
        ) : (
          <div className="my-5 p-3.5 bg-[#f7f9fb] border border-[#e6e8ea] rounded-lg space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0">
                💬
              </span>
              <span className="leading-snug">
                Publish comments and replies on questions &amp; articles
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0">
                🛡️
              </span>
              <span className="leading-snug">
                Get recognized with verified contributor credentials
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#010611]">
              <span className="w-5 h-5 rounded-full bg-white border border-[#c5c6cc]/70 flex items-center justify-center text-[11px] shrink-0">
                ⚡
              </span>
              <span className="leading-snug">
                Direct peer advisory with executive syndicate leaders
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-11 px-4 rounded-lg bg-white hover:bg-[#f2f4f6] text-[#010611] text-xs font-semibold border border-[#c5c6cc] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#010611]" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* 2. Email Sign Up or Contributor Setup */}
          {hasPendingComment ? (
            <button
              type="button"
              onClick={handleEmailSignUp}
              className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-[#010611] text-white hover:bg-[#171f2c] text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Create Account with Email</span>
            </button>
          ) : (
            onOpenContributorSetup && (
              <button
                type="button"
                onClick={() => {
                  handleDismiss();
                  onOpenContributorSetup();
                }}
                className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-[#010611] text-white hover:bg-[#171f2c] text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>Join as Community Contributor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )
          )}

          {/* 3. Footer Links: Already have an account OR dismiss link */}
          <div className="text-center pt-2 flex flex-col items-center gap-1.5">
            {hasPendingComment ? (
              <div className="flex items-center gap-1.5 text-xs text-[#505f76]">
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={handleEmailSignIn}
                  className="font-semibold text-[#010611] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs text-[#75777c] hover:text-[#010611] transition-colors cursor-pointer"
            >
              {hasPendingComment ? "Cancel and keep editing" : "Continue browsing as guest →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
