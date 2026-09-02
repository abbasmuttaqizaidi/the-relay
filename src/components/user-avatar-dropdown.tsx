import { useUser, useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Building2, User, Shield, LogOut, Check, ChevronDown } from "lucide-react";
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

interface ProfileData {
  companyName: string;
  verificationLevel: string;
  logoUrl?: string;
  score?: number;
}

export function UserAvatarDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);

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
  }, [profile?.logoUrl]);

  if (!user) return null;

  // Compute display name: company name if onboarding is completed, else operator full name
  const displayName = profile?.companyName || user.fullName || "Operator";

  // Compute initials based on display name
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "OP";

  // Use company logo url if available, otherwise Clerk user profile image
  const avatarSrc = profile?.logoUrl && !logoFailed ? profile.logoUrl : user.imageUrl;

  // Tier display config — includes legacy mapping for old L1/L2/L3 values
  const tierMap: Record<string, string> = { L1: "Basic", L2: "Applied", L3: "Approved" };
  const rawTier = profile?.verificationLevel || "Basic";
  const tierLabel = tierMap[rawTier] || rawTier;


  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Clerk signOut error:", err);
    }

    // Clear localStorage
    try {
      localStorage.clear();
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
    navigate({ to: "/home" });
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
                    <AvatarFallback className="text-[10px] font-mono font-bold bg-primary/10 text-primary">
                      {initials}
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
          <button className="focus:outline-none cursor-pointer group flex items-center gap-2 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60 rounded-full pl-1.5 pr-2.5 py-1 transition-all bg-white shadow-2xs">
            <TooltipSimple content={tierTooltipContent} side="bottom" align="end">
              <div className="relative shrink-0">
                <Avatar className={`w-7 h-7 border transition-all shrink-0 rounded-full ${
                  tierLabel === "Approved" ? "border-amber-400/90 ring-1.5 ring-amber-400/20" : tierLabel === "Applied" ? "border-indigo-400/90 ring-1.5 ring-indigo-400/20" : "border-slate-200"
                }`}>
                  <AvatarImage
                    src={avatarSrc}
                    alt={displayName}
                    className="object-cover"
                    onError={() => setLogoFailed(true)}
                  />
                  <AvatarFallback className="text-[9px] font-mono font-bold bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className={statusDotClass} />
              </div>
            </TooltipSimple>

            <div className="flex flex-col items-start min-w-0 max-w-[120px] text-left">
              <span className="text-[11px] font-bold text-slate-800 truncate leading-tight font-sans tracking-tight group-hover:text-slate-950 transition-colors">
                {displayName}
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 font-bold leading-none mt-0.5 tracking-tight uppercase">
                {tierLabel}
              </span>
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
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
        
        <DropdownMenuItem
          onClick={() => navigate({ to: "/business-profile" })}
          className="group px-3 py-2 text-xs text-slate-600 focus:bg-primary/10 focus:text-primary cursor-pointer flex items-center gap-2 rounded-md transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-slate-400 group-focus:text-primary transition-colors" />
          <span>Business Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100/80 my-1" />
        
        <DropdownMenuItem
          onClick={handleLogout}
          className="group px-3 py-2 text-xs text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer flex items-center gap-2 font-medium rounded-md transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500 group-focus:text-red-600 transition-colors" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
