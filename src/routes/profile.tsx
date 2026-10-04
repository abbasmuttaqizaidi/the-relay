import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import {
  User,
  ShieldCheck,
  Building2,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Check,
  Loader2,
  Link as LinkIcon,
  Clock,
  CheckCircle2,
  BookOpen,
  Shield,
} from "lucide-react";
import { Button } from "@/design-system";
import { getCommunityProfile, saveCommunityProfile } from "@/functions/communityProfile";
import { getMyContributions } from "@/functions/getMyContributions";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getMyAssociationStatus } from "@/functions/association";
import { openBusinessAssociationModal } from "@/lib/association-modal-store";
import { SwitchProfileButton } from "@/components/profile/SwitchProfileButton";
import { formatTimeAgo } from "@/lib/utils";
import { createPrivateMeta } from "@/lib/seo";
import { isSigningOutActive } from "@/lib/logout";

export const Route = createFileRoute("/profile")({
  head: () => ({
    ...createPrivateMeta("Contributor Profile — The Relay"),
  }),
  component: SimpleCommunityMemberProfilePage,
});

function SimpleCommunityMemberProfilePage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Profile form state
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [profTitle, setProfTitle] = useState("");
  const [bio, setBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch community profile
  const { data: dbProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ["community-profile", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getCommunityProfile();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  // 2. Fetch business status
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 5,
  });

  // 3. Fetch association status
  const { data: associationData } = useQuery({
    queryKey: ["my-association-status"],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await getMyAssociationStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 30,
  });

  // 4. Fetch user's discussion contributions
  const { data: contributions = [], isLoading: loadingContributions } = useQuery({
    queryKey: ["my-contributions", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      return await getMyContributions();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 2,
  });

  // Redirect unauthenticated visitors to login
  useEffect(() => {
    if (isLoaded && !isSignedIn && !isSigningOutActive()) {
      navigate({ to: "/login", replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Sync state with fetched database profile
  useEffect(() => {
    if (dbProfile) {
      setDisplayName(dbProfile.name || clerkUser?.fullName || "");
      setHandle(dbProfile.handle || (clerkUser?.username ? `@${clerkUser.username}` : ""));
      setProfTitle(dbProfile.title || "");
      setBio(dbProfile.bio || "");
      setLinkedinUrl(dbProfile.linkedin_url || "");
    } else if (clerkUser) {
      setDisplayName(clerkUser.fullName || "");
      const emailPrefix = (clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, "");
      setHandle(clerkUser.username ? `@${clerkUser.username}` : `@${emailPrefix || "contributor"}`);
    }
  }, [dbProfile, clerkUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = displayName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      toast.error("Please enter a valid display name (at least 2 characters).");
      return;
    }

    let cleanHandle = handle.trim();
    if (cleanHandle.startsWith("@")) {
      cleanHandle = cleanHandle.substring(1).trim();
    }
    cleanHandle = cleanHandle.replace(/\s+/g, "");
    if (!cleanHandle || cleanHandle.length < 2) {
      toast.error("Handle must be at least 2 characters.");
      return;
    }
    const finalHandle = `@${cleanHandle}`;

    let cleanLinkedin = linkedinUrl.trim();
    if (cleanLinkedin && !cleanLinkedin.startsWith("http://") && !cleanLinkedin.startsWith("https://")) {
      cleanLinkedin = `https://${cleanLinkedin}`;
    }

    try {
      setIsSaving(true);
      await saveCommunityProfile({
        data: {
          name: trimmedName,
          handle: finalHandle,
          title: profTitle.trim() || "Community Member",
          bio: bio.trim() || undefined,
          avatar_type: "photo",
          avatar_url: clerkUser?.imageUrl || undefined,
          linkedin_url: cleanLinkedin || undefined,
        },
      });

      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-profile"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const business = onboardingData?.business;
  const isCommunityMember = (!business || business?.status !== "approved" || dbProfile?.type === "community_member" || dbProfile?.type === "associate");
  const effectiveName = displayName.trim() || clerkUser?.fullName || "Community Contributor";
  const userInitial = effectiveName ? effectiveName.charAt(0).toUpperCase() : "U";
  const activeHandle = handle
    ? (handle.startsWith("@") ? handle : `@${handle}`)
    : (dbProfile?.handle
        ? (dbProfile.handle.startsWith("@") ? dbProfile.handle : `@${dbProfile.handle}`)
        : (clerkUser?.username ? `@${clerkUser.username}` : "@contributor"));

  const totalContributions = contributions.length;
  const totalUpvotes = contributions.reduce((acc: number, curr: any) => acc + (curr.upvotes || 0), 0);

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 text-slate-400 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  if (loadingProfile && !dbProfile && !clerkUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 text-slate-400 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Loading profile identity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-16">
      <main className="w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Navigation Context Breadcrumb (Mobile-responsive wrap) */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-0.5 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 min-w-0">
            <Link to="/insights" search={{ tab: "knowledge" } as any} className="hover:text-slate-900 transition-colors shrink-0">
              The Relay
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900 truncate">Contributor Profile</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200/80 font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Active Member
          </div>
        </div>

        {/* 1. HERO IDENTITY CARD (Fully responsive on mobile & desktop) */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            {/* Left: Avatar & Identity Details */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
              <div className="relative shrink-0 mt-0.5 sm:mt-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-sm border border-slate-200">
                  {clerkUser?.imageUrl ? (
                    <img
                      src={clerkUser.imageUrl}
                      alt={effectiveName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{userInitial}</span>
                  )}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
                  title="Active Network Contributor"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-950 truncate font-display">
                    {effectiveName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200/90 shrink-0">
                    <ShieldCheck className="w-2.5 h-2.5 text-slate-700" />
                    Community Contributor
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 flex-wrap font-sans">
                  <span className="font-mono text-slate-600 font-semibold">{activeHandle}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-700 font-medium">
                    {profTitle || "Independent Contributor"}
                  </span>
                </div>

                {clerkUser?.primaryEmailAddress?.emailAddress && (
                  <p className="text-[11px] text-slate-400 font-mono truncate pt-0.5">
                    {clerkUser.primaryEmailAddress.emailAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Shining Glass Switch Profile Button (Full width on small phones, inline on desktop) */}
            {isCommunityMember && (
              <div className="flex items-center shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <SwitchProfileButton size="default" className="w-full sm:w-auto justify-center h-9 sm:h-10 text-xs" />
              </div>
            )}
          </div>
        </div>

        {/* 2. MAIN 2-COLUMN GRID (Left: Affiliation & Metrics; Right: Edit Profile & Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* ═════════════════════════════════════════════════════════════════
              LEFT COLUMN: Affiliation, Metrics, Network Status (4 cols)
              ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            {/* A. Corporate Affiliation Card */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Affiliation Status
                </span>
                {associationData?.status === "pending" ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300/80">
                    <Clock className="w-2.5 h-2.5 text-amber-700" />
                    Pending
                  </span>
                ) : associationData?.status === "approved" ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300/80">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
                    Active
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    Independent
                  </span>
                )}
              </div>

              {associationData?.status === "pending" && associationData?.business ? (
                <div className="space-y-3 pt-0.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      {associationData.business.company_name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {associationData.business.industry || "Industry"}
                      {associationData.business.hq_location ? ` • ${associationData.business.hq_location}` : ""}
                    </p>
                    <p className="text-[11px] text-amber-800 mt-2 leading-relaxed bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/70">
                      Your affiliation request was submitted {formatTimeAgo(associationData.requestedAt)} and is currently under operator review.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openBusinessAssociationModal()}
                    className="w-full text-xs font-semibold border-amber-300 bg-white hover:bg-amber-50 text-amber-950 cursor-pointer h-9 justify-center"
                  >
                    Edit Association Request
                  </Button>
                </div>
              ) : associationData?.status === "approved" && associationData?.business ? (
                <div className="space-y-2 pt-0.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      {associationData.business.company_name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {associationData.business.industry || "Industry"}
                    </p>
                    <p className="text-[11px] text-emerald-800 mt-2 leading-relaxed bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200/70">
                      Your contributions across the network reflect your affiliation with {associationData.business.company_name}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-0.5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-950">
                      No Corporate Entity Linked
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      You are contributing as an independent operator. Link your identity with a verified business to unlock enterprise affiliation.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openBusinessAssociationModal()}
                    className="w-full text-xs font-semibold gap-1.5 border-slate-200 text-slate-900 hover:bg-slate-50 cursor-pointer h-9 shadow-2xs justify-center"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Associate with a Business</span>
                  </Button>
                </div>
              )}
            </div>

            {/* B. Contributor Telemetry & Stats Card */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Community Impact
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Network Telemetry</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
                    <span>Contributions</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold font-mono text-slate-950">
                    {totalContributions}
                  </p>
                  <p className="text-[10px] text-slate-400">Discussions posted</p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Upvotes</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold font-mono text-slate-950">
                    {totalUpvotes}
                  </p>
                  <p className="text-[10px] text-slate-400">Peer recognitions</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                High-quality answers and playbooks build your operational reputation across the verified business directory.
              </p>
            </div>

            {/* C. Verified Advisory Protocol Notice */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Shield className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Verified Contributor Protocol</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All contributions on The Relay are indexed under peer-review integrity guidelines to maintain high commercial value.
              </p>
              <div className="pt-0.5">
                <Link
                  to="/trust-and-safety"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-900 hover:underline"
                >
                  <span>Read Trust & Safety guidelines</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Profile Settings Form & Activity Feed (8 cols)
              ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* 1. PUBLIC PROFILE FORM CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-7 space-y-5 sm:space-y-6">
              <div className="space-y-1 pb-3.5 border-b border-slate-100">
                <h2 className="text-sm sm:text-base font-bold text-slate-950 font-display">
                  Public Profile Information
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This identity is visible when posting advisory questions, sharing knowledge playbooks, or answering discussions.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 sm:space-y-5">
                {/* Row 1: Display Name & Handle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                      <span>Display Name</span>
                      <span className="text-[10px] text-slate-400 font-normal">Public Name</span>
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Sarah Koenig"
                      className="w-full h-10 sm:h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all shadow-2xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                      <span>Network Handle</span>
                      <span className="text-[10px] text-slate-400 font-mono">Unique @ID</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 sm:top-2 text-xs text-slate-400 font-mono select-none">
                        @
                      </span>
                      <input
                        type="text"
                        value={handle.startsWith("@") ? handle.substring(1) : handle}
                        onChange={(e) =>
                          setHandle(`@${e.target.value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "")}`)
                        }
                        placeholder="sarah_ops"
                        className="w-full h-10 sm:h-9 pl-7 pr-3 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all shadow-2xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Professional Role & LinkedIn URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                      <span>Professional Role / Title</span>
                      <span className="text-[10px] text-slate-400 font-normal">Operational Area</span>
                    </label>
                    <input
                      type="text"
                      value={profTitle}
                      onChange={(e) => setProfTitle(e.target.value)}
                      placeholder="e.g. Founder, Operations Lead, Product Advisor"
                      className="w-full h-10 sm:h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                      <span>LinkedIn Profile</span>
                      <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 sm:top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full h-10 sm:h-9 pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Bio / Summary */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-900">
                      Bio / Operational Summary
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      {bio.length} / 200
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Brief background on your operational expertise, industry focus, and how you assist peers on the exchange..."
                    className="w-full p-2.5 sm:p-3 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-all shadow-2xs resize-none"
                  />
                </div>

                {/* Form Footer Actions (Reverse on mobile for thumb reach) */}
                <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 text-center sm:text-left">
                    Changes take effect across all network discussions immediately.
                  </p>
                  <Button
                    type="submit"
                    variant="monochrome"
                    size="sm"
                    disabled={isSaving || !displayName.trim()}
                    className="w-full sm:w-auto px-5 py-2 gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 h-10 sm:h-9 font-semibold text-xs justify-center"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Save Profile</span>
                        <Check className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* 2. MY CONTRIBUTIONS & ACTIVITY CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <MessageSquare className="w-4 h-4 text-slate-900 shrink-0" />
                  <h2 className="text-xs sm:text-sm font-bold text-slate-950 truncate">
                    My Discussions & Knowledge Answers ({totalContributions})
                  </h2>
                </div>
                <Link
                  to="/insights"
                  search={{ tab: "knowledge" } as any}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors shrink-0"
                >
                  <span>Explore Playbooks</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {loadingContributions ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-xs font-mono">Loading contributions...</span>
                </div>
              ) : contributions.length === 0 ? (
                <div className="py-8 sm:py-10 px-4 rounded-xl bg-slate-50/80 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-0.5">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-950">No Discussions Contributed Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                    Share your operational insights, ask peer questions, and contribute solutions to knowledge playbooks to build your network profile.
                  </p>
                  <Link
                    to="/insights"
                    search={{ tab: "knowledge" } as any}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Browse Knowledge Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {contributions.map((c: any) => {
                    const targetPath =
                      c.item_type === "knowledge"
                        ? "/insights/knowledge/$id"
                        : "/insights/$id";
                    const targetId = c.item_slug || c.item_id;
                    const commentHash = `comment-${c.id}`;

                    return (
                      <div
                        key={c.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 text-xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          <Link
                            to={targetPath as any}
                            params={{ id: targetId } as any}
                            hash={commentHash}
                            className="font-bold text-slate-950 hover:underline line-clamp-1 text-xs"
                          >
                            {c.item_title}
                          </Link>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {formatTimeAgo(c.created_at)}
                          </span>
                        </div>

                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-xs bg-white p-2.5 sm:p-3 rounded-lg border border-slate-100">
                          "{c.content}"
                        </p>

                        <div className="flex items-center justify-between pt-0.5 text-[11px] text-slate-500">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200/60">
                            <ThumbsUp className="w-3 h-3 text-emerald-600" />
                            <span>{c.upvotes} upvotes</span>
                          </span>
                          <Link
                            to={targetPath as any}
                            params={{ id: targetId } as any}
                            hash={commentHash}
                            className="inline-flex items-center gap-1 text-slate-900 hover:underline font-semibold"
                          >
                            <span>View Discussion</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
