import { useUser, useClerk } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Building2, User, Shield, LogOut, Check } from "lucide-react";
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

export function UserAvatarDropdown() {
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
    await signOut();
    localStorage.removeItem("relay.profile.v1"); // Clear company profile cache on logout
    toast.success("Signed out successfully.", { id: "signout-success" });
    navigate({ to: "/home" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none cursor-pointer group flex items-center gap-2.5 border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.5 transition-all bg-white hover:shadow-sm">
          {/* Left side: Name + Tier stacked vertically */}
          <div className="flex flex-col items-end gap-0.5 min-w-0">
            <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px] leading-tight">
              {displayName}
            </span>
            <TooltipSimple
              content={
                <div className="p-2.5 max-w-[260px] space-y-2 text-left font-sans leading-normal">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 gap-4">
                    <span className="font-extrabold text-[12px] text-white">
                      {tierLabel === "Approved" ? "Established Entity" : tierLabel === "Applied" ? "Trusted Operator" : "Verified Business"}
                    </span>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-[2px] font-bold uppercase tracking-wider">
                      {tierLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {tierLabel === "Approved"
                      ? "Corporate registry (CIN/GST/Tax certificate) or revenue proof checked. Highest trust, priority concierge matchmaking, and active surfacing top-tier listings."
                      : tierLabel === "Applied"
                        ? "Founder identity & company LinkedIn registration validated manually. Unlocks direct connection unlocks, score boosts, and full access to private protocols."
                        : "Domain email check, SSL validation, and core founder verification. Surfaces basic referral, vendor, and warm intro requests with standard priority."}
                  </p>
                  <div className="pt-1.5 border-t border-slate-800 flex flex-col gap-0.5 font-mono text-[8px] text-slate-500">
                    <span className="uppercase text-[7.5px] font-bold text-slate-400">Requirement:</span>
                    <span>
                      {tierLabel === "Approved"
                        ? "Tax registration / Active Revenue proof"
                        : tierLabel === "Applied"
                          ? "LinkedIn + Founder Identity Match"
                          : "Email domain & Website lookup"}
                    </span>
                  </div>
                </div>
              }
              side="bottom"
              align="end"
            >
              <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 cursor-default">
                {tierLabel === "Approved" && <Check className="w-2.5 h-2.5" />}
                {tierLabel}
              </span>
            </TooltipSimple>
          </div>
          {/* Right side: Avatar */}
          <Avatar className="w-7 h-7 border border-border group-hover:border-primary transition-all shrink-0">
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
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 bg-white border border-[#1f25301f] rounded-[4px] shadow-lg font-sans p-1" align="end">
        <DropdownMenuLabel className="px-3 py-2 flex flex-col space-y-0.5">
          <span className="text-xs font-semibold text-slate-800 truncate">
            {displayName}
          </span>
          <span className="text-[10px] font-mono text-slate-400 truncate">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100 my-1" />
        <DropdownMenuItem
          onClick={() => navigate({ to: "/onboarding" })}
          className="group px-3 py-2 text-xs text-slate-600 focus:bg-primary/10 focus:text-primary cursor-pointer flex items-center gap-2 rounded-sm transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-slate-400 group-focus:text-primary transition-colors" />
          <span>Business Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate({ to: "/opportunities" })}
          className="group px-3 py-2 text-xs text-slate-600 focus:bg-primary/10 focus:text-primary cursor-pointer flex items-center gap-2 rounded-sm transition-colors"
        >
          <User className="w-3.5 h-3.5 text-slate-400 group-focus:text-primary transition-colors" />
          <span>Opportunities Board</span>
        </DropdownMenuItem>
        {user.primaryEmailAddress?.emailAddress === "zaidi.yam5@gmail.com" && (
          <DropdownMenuItem
            onClick={() => navigate({ to: "/admin" })}
            className="group px-3 py-2 text-xs text-slate-600 focus:bg-primary/10 focus:text-primary cursor-pointer flex items-center gap-2 rounded-sm transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400 group-focus:text-primary transition-colors" />
            <span>Control Panel</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-slate-100 my-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="group px-3 py-2 text-xs text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer flex items-center gap-2 font-medium rounded-sm transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-red-500 group-focus:text-red-600 transition-colors" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
