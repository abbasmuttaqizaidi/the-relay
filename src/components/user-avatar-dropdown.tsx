import { useUser, useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { Building2, User, Shield, LogOut, Check, ChevronDown, Clock, CheckCircle2 } from "lucide-react";
import { TooltipSimple } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCompanyInitials } from "@/lib/utils";
import { DefaultBusinessLogo } from "@/default_business_logo";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getCommunityProfile } from "@/functions/communityProfile";
import { getMyAssociationStatus } from "@/functions/association";
import { openBusinessAssociationModal } from "@/lib/association-modal-store";

interface ProfileData {
  companyName: string;
  verificationLevel: string;
  logoUrl?: string;
  score?: number;
}

export function UserAvatarDropdown({
  isMobile = false,
  onNavigate,
}: {
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);

  // Fetch verified business profile from live database
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", user?.id],
    queryFn: async () => {
      if (!user) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(user?.id),
    staleTime: 1000 * 60 * 1,
  });

  const { data: communityProfile } = useQuery({
    queryKey: ["community-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      return await getCommunityProfile();
    },
    enabled: Boolean(user?.id),
    staleTime: 1000 * 60 * 2,
  });

  const dbBusiness = onboardingData?.business;
  const hasBusiness = Boolean(dbBusiness);

  const { data: associationData } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      if (!user) return null;
      return await getMyAssociationStatus();
    },
    enabled: Boolean(user?.id && !hasBusiness),
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem("relay.profile.v1");
        if (stored) {
          setProfile(JSON.parse(stored));
        } else {
          setProfile(null);
        }
      } catch (_) {
        setProfile(null);
      }
    };
    loadProfile();
    window.addEventListener("relay:profile", loadProfile);
    window.addEventListener("storage", loadProfile);
    return () => {
      window.removeEventListener("relay:profile", loadProfile);
      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  useEffect(() => {
    setLogoFailed(false);
  }, [profile?.logoUrl, dbBusiness?.logo_url]);

  if (!user) return null;

  // Compute display name: Prioritize business name if registered, otherwise community contributor name
  const displayName = hasBusiness
    ? dbBusiness?.company_name || profile?.companyName || "Your Business"
    : communityProfile?.name || user.fullName || "Community Contributor";

  // Compute initials based on active display name:
  // For business: standard company initials
  // For community member: strictly single initial of the first word
  const initials = hasBusiness
    ? getCompanyInitials(displayName)
    : (displayName.trim().split(/\s+/)[0]?.charAt(0).toUpperCase() || "U");

  // Avatar source: business logo if entity; for community member strictly use initial
  const businessLogoUrl = dbBusiness?.logo_url || profile?.logoUrl;
  const avatarSrc = hasBusiness
    ? (businessLogoUrl && !logoFailed ? businessLogoUrl : undefined)
    : undefined;

  // Tier display config
  const tierMap: Record<string, string> = { L1: "Basic", L2: "Applied", L3: "Approved" };
  const rawTier = hasBusiness
    ? dbBusiness?.status === "approved"
      ? "Approved"
      : dbBusiness?.status
        ? "Applied"
        : profile?.verificationLevel || "Basic"
    : "Community";
  const tierLabel = tierMap[rawTier] || rawTier;


  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Clerk signOut error:", err);
    }

    // Clear localStorage while preserving tour completion flags so returning users don't see the tour again
    try {
      const tourCompleted = localStorage.getItem("relay.tour_completed");
      const tourKeys: [string, string][] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("relay.tour_completed")) {
          tourKeys.push([key, localStorage.getItem(key) || "true"]);
        }
      }
      localStorage.clear();
      if (tourCompleted) {
        localStorage.setItem("relay.tour_completed", tourCompleted);
      }
      for (const [k, v] of tourKeys) {
        localStorage.setItem(k, v);
      }
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }

    // Clear sessionStorage
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error("Failed to clear sessionStorage:", e);
    }

    // Clear cookies
    try {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname.replace(/^www\./, "");
      }
    } catch (e) {
      console.error("Failed to clear cookies:", e);
    }

    toast.success("Signed out successfully.", { id: "signout-success" });
    navigate({ to: "/" });
  };

  // Define tooltip content for the user verification tier
  const tierTooltipContent = (
    <div className="p-3 max-w-[280px] space-y-2.5 text-left font-sans leading-normal">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-4">
        <span className="font-extrabold text-[12px] text-white">
          {tierLabel === "Approved" ? "Established Entity" : tierLabel === "Applied" ? "Trusted Operator" : "Verified Business"}
        </span>
        <span className={`font-mono text-[9px] px-2 py-0.5 rounded-[2px] font-bold uppercase tracking-wider ${
          tierLabel === "Approved" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : tierLabel === "Applied" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "bg-slate-700/50 text-slate-300 border border-slate-600/50"
        }`}>
          {tierLabel}
        </span>
      </div>
      <p className="text-[10.5px] text-slate-300 leading-relaxed font-medium">
        {tierLabel === "Approved"
          ? "Corporate registry (CIN/GST/Tax certificate) or revenue proof checked. Highest trust, priority concierge matchmaking, and active surfacing top-tier listings."
          : tierLabel === "Applied"
            ? "Founder identity & company LinkedIn registration validated manually. Unlocks direct connection unlocks, score boosts, and full access to private protocols."
            : "Domain email check, SSL validation, and core founder verification. Surfaces basic referral, vendor, and warm intro requests with standard priority."}
      </p>
      <div className="pt-2 border-t border-slate-800 flex flex-col gap-1 font-mono text-[8.5px] text-slate-400">
        <span className="uppercase text-[8.5px] font-extrabold text-slate-300">Requirement:</span>
        <span>
          {tierLabel === "Approved"
            ? "Tax registration / Active Revenue proof"
            : tierLabel === "Applied"
              ? "LinkedIn + Founder Identity Match"
              : "Email domain & Website lookup"}
        </span>
      </div>
    </div>
  );

  // Status indicator styles
  const statusDotClass = `absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white shadow-xs ${
    tierLabel === "Approved"
      ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
      : tierLabel === "Applied"
        ? "bg-indigo-500"
        : "bg-slate-400"
  }`;

  const statusDotClassMobile = `absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-1.5 border-white shadow-xs ${
    tierLabel === "Approved"
      ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
      : tierLabel === "Applied"
        ? "bg-indigo-500"
        : "bg-slate-400"
  }`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isMobile ? (
          <button className="w-full focus:outline-none cursor-pointer group flex items-center justify-between border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 rounded-[8px] p-2.5 transition-all bg-white shadow-2xs">
            {/* Left: Avatar + Truncated Text Stack */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <TooltipSimple content={tierTooltipContent} side="top" align="start">
                <div className="relative shrink-0">
                  <Avatar className={`w-8 h-8 border transition-all shrink-0 rounded-[6px] shadow-2xs ${
                    tierLabel === "Approved" ? "border-amber-400/90 ring-1.5 ring-amber-400/20" : tierLabel === "Applied" ? "border-indigo-400/90 ring-1.5 ring-indigo-400/20" : "border-slate-200"
                  }`}>
                    <AvatarImage
                      src={avatarSrc}
                      alt={displayName}
                      className="object-cover"
                      onError={() => setLogoFailed(true)}
                    />
                    <AvatarFallback className="text-[10px] font-mono font-bold bg-slate-950 text-white overflow-hidden">
                      {logoFailed ? initials : <DefaultBusinessLogo className="w-full h-full object-cover" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className={statusDotClassMobile} />
                </div>
              </TooltipSimple>

              <div className="flex flex-col items-start min-w-0 flex-1 text-left">
                <span className="text-xs font-bold text-slate-900 truncate w-full leading-tight font-sans tracking-tight">
                  {displayName}
                </span>
                <span className="text-[9px] font-mono text-slate-400 font-medium leading-none mt-1 truncate w-full">
                  {user.primaryEmailAddress?.emailAddress || "Verified Operator"}
                </span>
              </div>
            </div>

            {/* Right: Tier Badge + Chevron (Non-shrinking, zero overlap) */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className={`inline-flex items-center text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[3px] shrink-0 ${
                tierLabel === "Approved" ? "bg-amber-100 text-amber-900 border border-amber-300/80" : tierLabel === "Applied" ? "bg-indigo-100 text-indigo-900 border border-indigo-300/80" : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}>
                {tierLabel}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="focus:outline-none cursor-pointer group flex items-center gap-1.5 sm:gap-2 border-0 sm:border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60 rounded-full p-0 sm:p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 transition-all bg-transparent sm:bg-white shadow-none sm:shadow-2xs"
            aria-label="User Profile Menu"
          >
            <TooltipSimple content={tierTooltipContent} side="bottom" align="end">
              <div className="relative shrink-0">
                <Avatar className={`w-8 h-8 sm:w-7 sm:h-7 transition-all shrink-0 rounded-full ${
                  !hasBusiness
                    ? "border-0"
                    : tierLabel === "Approved"
                      ? "border border-amber-400/90 ring-1.5 ring-amber-400/20"
                      : tierLabel === "Applied"
                        ? "border border-indigo-400/90 ring-1.5 ring-indigo-400/20"
                        : "border border-slate-200"
                }`}>
                  <AvatarImage
                    src={avatarSrc}
                    alt={displayName}
                    className="object-cover"
                    onError={() => setLogoFailed(true)}
                  />
                  <AvatarFallback className="text-xs sm:text-[10px] font-mono font-bold bg-[#010611] text-white overflow-hidden">
                    {hasBusiness ? (logoFailed ? initials : <DefaultBusinessLogo className="w-full h-full object-cover" />) : initials}
                  </AvatarFallback>
                </Avatar>
                {hasBusiness && <span className={statusDotClass} />}
              </div>
            </TooltipSimple>

            <div className="hidden sm:flex flex-col items-start min-w-0 max-w-[120px] text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate leading-tight font-sans tracking-tight group-hover:text-slate-950 transition-colors">
                {displayName}
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 font-bold leading-none mt-0.5 tracking-tight uppercase">
                {tierLabel}
              </span>
            </div>

            <ChevronDown className="hidden sm:block w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
          </button>
        )}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 mt-2 bg-white border border-[#1f25301f] rounded-[8px] shadow-lg font-sans p-1.5" align="end">
        <DropdownMenuLabel className="px-3 py-2.5 flex flex-col gap-1.5 bg-slate-50/50 rounded-t-[6px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-900 truncate">
              {displayName}
            </span>
            <span className={`inline-flex items-center text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[3px] shrink-0 shadow-2xs ${
              tierLabel === "Approved" ? "bg-amber-100 text-amber-900 border border-amber-300/80" : tierLabel === "Applied" ? "bg-indigo-100 text-indigo-900 border border-indigo-300/80" : "bg-slate-100 text-slate-700 border border-slate-200"
            }`}>
              {tierLabel}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 truncate">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-slate-100/80 my-1" />
        
        {!hasBusiness && (
          <>
            <DropdownMenuItem
              onClick={() => {
                onNavigate?.();
                navigate({ to: "/profile" });
              }}
              className="group px-3 py-2 text-xs text-slate-700 hover:text-black focus:text-black data-[highlighted]:text-black hover:bg-slate-100 focus:bg-slate-100 data-[highlighted]:bg-slate-100 cursor-pointer flex items-center gap-2 rounded-md transition-colors"
            >
              <User className="w-3.5 h-3.5 text-slate-500 group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors shrink-0" />
              <span className="group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors font-medium">Contributor Profile</span>
            </DropdownMenuItem>

            {associationData?.status === "pending" ? (
              <DropdownMenuItem
                onClick={() => {
                  onNavigate?.();
                  openBusinessAssociationModal();
                }}
                className="group px-3 py-2 text-xs text-amber-900 bg-amber-50/50 hover:bg-amber-100/60 focus:bg-amber-100/60 cursor-pointer flex items-center justify-between gap-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-semibold truncate">Association: Pending</span>
                </div>
                <span className="text-[9px] font-mono uppercase bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                  Edit
                </span>
              </DropdownMenuItem>
            ) : associationData?.status === "approved" ? (
              <DropdownMenuItem
                disabled
                className="px-3 py-2 text-xs text-emerald-950 bg-emerald-50/50 opacity-90 cursor-default flex items-center gap-2 rounded-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold truncate">
                  Associated: {associationData.business.company_name}
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  onNavigate?.();
                  openBusinessAssociationModal();
                }}
                className="group px-3 py-2 text-xs text-slate-700 hover:text-black focus:text-black data-[highlighted]:text-black hover:bg-slate-100 focus:bg-slate-100 data-[highlighted]:bg-slate-100 cursor-pointer flex items-center gap-2 rounded-md transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors shrink-0" />
                <span className="group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors font-medium">Associate with Business</span>
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuItem
          onClick={() => {
            onNavigate?.();
            navigate({ to: "/onboarding" });
          }}
          className="group px-3 py-2 text-xs text-slate-700 hover:text-black focus:text-black data-[highlighted]:text-black hover:bg-slate-100 focus:bg-slate-100 data-[highlighted]:bg-slate-100 cursor-pointer flex items-center gap-2 rounded-md transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors shrink-0" />
          <span className="group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors font-medium">
            {hasBusiness ? "Business Profile" : "Upgrade to Business (KYB)"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100/80 my-1" />
        
        <DropdownMenuItem
          onClick={() => {
            onNavigate?.();
            handleLogout();
          }}
          className="group px-3 py-2 text-xs text-red-600 hover:text-black focus:text-black data-[highlighted]:text-black hover:bg-slate-100 focus:bg-slate-100 data-[highlighted]:bg-slate-100 cursor-pointer flex items-center gap-2 font-medium rounded-md transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500 group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors shrink-0" />
          <span className="group-hover:text-black group-focus:text-black group-data-[highlighted]:text-black transition-colors font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
