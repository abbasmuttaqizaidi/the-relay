import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { Clock, CheckCircle2, Pencil, X, Building2 } from "lucide-react";
import { getMyAssociationStatus } from "@/functions/association";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { openBusinessAssociationModal } from "@/lib/association-modal-store";

export function GlobalAssociationBanner() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);

  // 1. Association status query
  const { data: associationData } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getMyAssociationStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 30,
  });

  // 2. Check if user is a business owner (owners don't associate with other businesses)
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60,
  });

  const hasBusiness = Boolean(onboardingData?.business);

  // Check dismissal state for approved associations
  useEffect(() => {
    if (associationData?.status === "approved" && associationData?.id) {
      const dismissedKey = `relay_assoc_dismissed_${associationData.id}`;
      if (typeof window !== "undefined" && localStorage.getItem(dismissedKey) === "true") {
        setIsDismissed(true);
      } else {
        setIsDismissed(false);
      }
    } else {
      setIsDismissed(false);
    }
  }, [associationData?.id, associationData?.status]);

  if (!isLoaded || !isSignedIn || hasBusiness || !associationData) {
    return null;
  }

  // 1. Pending Request State (Amber banner, non-dismissible, with Edit button)
  if (associationData.status === "pending") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="w-full bg-amber-500/10 border-b border-amber-500/25 px-4 py-2.5 text-amber-950 font-sans z-30 transition-all shadow-2xs"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-800 shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </span>
            <div className="text-xs font-medium truncate">
              <span>Association request with </span>
              <strong className="font-bold text-amber-950">
                {associationData.business.company_name}
              </strong>
              <span> is pending administrator approval.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openBusinessAssociationModal()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-950 shadow-2xs transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3 text-amber-800" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Approved State (Green banner, dismissible)
  if (associationData.status === "approved" && !isDismissed) {
    const handleDismiss = () => {
      setIsDismissed(true);
      if (typeof window !== "undefined" && associationData?.id) {
        localStorage.setItem(`relay_assoc_dismissed_${associationData.id}`, "true");
      }
    };

    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full bg-emerald-500/10 border-b border-emerald-500/25 px-4 py-2.5 text-emerald-950 font-sans z-30 transition-all shadow-2xs"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-800 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            </span>
            <div className="text-xs font-medium truncate">
              <span>Your association with </span>
              <strong className="font-bold text-emerald-950">
                {associationData.business.company_name}
              </strong>
              <span> has been approved! You are now an active associate.</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-500/20 rounded transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
