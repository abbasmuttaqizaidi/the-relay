import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, ArrowRight, X } from "lucide-react";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getCommunityProfile } from "@/functions/communityProfile";

export function CommunityMemberBanner() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);

  const location = useRouterState({
    select: (state) => state.location,
  });

  const pathname = location?.pathname || "";

  // Do not show on onboarding or auth screens
  const isExcludedRoute =
    pathname === "/get-started" ||
    pathname === "/onboarding" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  const { data: onboardingData, isLoading: loadingOnboarding } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn && !isExcludedRoute),
    staleTime: 1000 * 60 * 1,
  });

  const { data: communityProfile, isLoading: loadingCommunity } = useQuery({
    queryKey: ["community-profile", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getCommunityProfile();
    },
    enabled: Boolean(isLoaded && isSignedIn && !isExcludedRoute),
    staleTime: 1000 * 60 * 2,
  });

  const business = onboardingData?.business || null;
  const isAuthResolving = !isLoaded || (isSignedIn && (loadingOnboarding || loadingCommunity));
  const cachedAccountMode = typeof window !== "undefined" ? localStorage.getItem("relay_account_mode") : null;

  const resolvedIsCommunityMember =
    !business ||
    communityProfile?.type === "community_member" ||
    communityProfile?.type === "associate";

  const isCommunityMember =
    isAuthResolving && cachedAccountMode
      ? cachedAccountMode === "community_member"
      : resolvedIsCommunityMember;

  // Session-based dismissal
  useEffect(() => {
    if (userId && typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem(`relay_comm_banner_dismissed_${userId}`) === "true";
      setIsDismissed(dismissed);
    }
  }, [userId]);

  if (
    isExcludedRoute ||
    !isLoaded ||
    !isSignedIn ||
    isAuthResolving ||
    !isCommunityMember ||
    isDismissed
  ) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    if (userId && typeof window !== "undefined") {
      sessionStorage.setItem(`relay_comm_banner_dismissed_${userId}`, "true");
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-[#0F172A] border-b border-slate-800 text-white font-sans text-xs z-30 transition-all shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        {/* Mobile View (< sm): Top bar with Badge + Actions */}
        <div className="flex sm:hidden items-center justify-between gap-2 w-full">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
            <BookOpen className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Community Profile</span>
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-950 font-semibold text-[11px] shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Upgrade</span>
              <ArrowRight className="w-3 h-3 text-slate-900" />
            </Link>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Content: Cleanly wrapped on mobile, truncated if needed on wide desktop */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
            <BookOpen className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Community Profile</span>
          </span>

          <p className="text-slate-200 text-[11px] sm:text-xs leading-relaxed sm:truncate">
            <span>You can read </span>
            <strong className="text-white font-semibold">Insights</strong>
            <span> and write comments. You cannot post new insights or opportunities.</span>
          </p>
        </div>

        {/* Desktop View (>= sm): Actions Row */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Upgrade to Business</span>
            <ArrowRight className="w-3 h-3 text-slate-900" />
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
