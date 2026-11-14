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
  const hasBusiness = Boolean(business);
  const isAuthResolving = !isLoaded || (isSignedIn && (loadingOnboarding || loadingCommunity));
  const cachedAccountMode = typeof window !== "undefined" ? localStorage.getItem("relay_account_mode") : null;

  const resolvedIsCommunityMember =
    !hasBusiness &&
    (onboardingData?.userType === "community_member" ||
      communityProfile?.type === "community_member" ||
      communityProfile?.type === "associate");

  const isCommunityMember = hasBusiness
    ? false
    : isAuthResolving && cachedAccountMode
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
      className="w-full bg-slate-50/95 backdrop-blur-xs border-b border-slate-200/90 text-slate-700 font-sans z-30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
          <p className="text-[11px] sm:text-xs text-slate-600 leading-normal">
            <span className="font-semibold text-slate-900">Community Profile:</span>{" "}
            <span>You can read Insights and write comments.</span>{" "}
            <span className="text-slate-500">Posting is exclusive to</span>{" "}
            <Link
              to="/onboarding"
              className="font-semibold text-slate-900 hover:text-blue-600 underline underline-offset-2 transition-colors"
            >
              Verified Businesses
            </Link>
            .
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="p-1 -mr-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
