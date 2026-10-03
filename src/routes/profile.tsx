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
  AlertCircle,
  ArrowUpRight,
  Info,
  CheckCircle2,
  Users,
  ArrowLeftRight,
} from "lucide-react";
import {
  Modal,
  Button,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  ExecutiveAlertBanner,
} from "@/design-system";
import { getCommunityProfile, saveCommunityProfile } from "@/functions/communityProfile";
import { getMyContributions } from "@/functions/getMyContributions";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getMyAssociationStatus } from "@/functions/association";
import { openBusinessAssociationModal } from "@/lib/association-modal-store";
import { SwitchProfileButton } from "@/components/profile/SwitchProfileButton";
import { formatTimeAgo } from "@/lib/utils";
import { createPrivateMeta } from "@/lib/seo";

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

  // 2. Fetch business status (to show upgrade link if applicable)
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

  // 3. Fetch user's discussion contributions
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
    if (isLoaded && !isSignedIn) {
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

      toast.success("Profile saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-profile"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const business = onboardingData?.business;
  const associatedCompanyName = business?.company_name?.trim();
  const primaryIdentityLabel = associatedCompanyName || "Community Member";
  const activeHandle = handle
    ? (handle.startsWith("@") ? handle : `@${handle}`)
    : (dbProfile?.handle
        ? (dbProfile.handle.startsWith("@") ? dbProfile.handle : `@${dbProfile.handle}`)
        : (clerkUser?.username ? `@${clerkUser.username}` : "@member"));

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4 pb-4 border-b border-[#e2e8f0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#010611] font-display">
                Profile & Identity
              </h1>
              <p className="text-xs sm:text-sm text-[#505f76] mt-0.5 sm:mt-1">
                Manage your public operational identity and network credentials.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-[#eceef0] text-[#010611] px-3 py-2 rounded-lg uppercase border border-[#e2e8f0]">
                <ShieldCheck className="w-4 h-4 text-[#010611]" />
                {business?.status === "approved" ? "Verified Business" : "Community Member"}
              </span>
            </div>
          </div>
        </div>

        {/* 1. PROFILE SETTINGS CARD */}
        <div className="bg-white rounded-xl border border-[#e6e8ea] shadow-xs p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Avatar Header & Shining Glass Switch Button (Single Row on Mobile & Desktop) */}
            <div className="flex flex-row items-center justify-between gap-3 pb-4 border-b border-[#e6e8ea]">
              {/* Left: Google Photo & Identity Details */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#010611] overflow-hidden flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0 border border-[#e2e8f0] shadow-xs">
                  {clerkUser?.imageUrl ? (
                    <img
                      src={clerkUser.imageUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  )}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#010611] block truncate">
                    {primaryIdentityLabel}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#505f76] font-mono block truncate">
                    {activeHandle}
                  </span>
                </div>
              </div>

              {/* Right: Shining Glass Switch Button (only visible for community members) */}
              {(!business || business?.status !== "approved" || dbProfile?.type === "community_member" || dbProfile?.type === "associate") && (
                <div className="flex items-center shrink-0">
                  <SwitchProfileButton size="default" />
                </div>
              )}
            </div>

            {/* Display Name & Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#010611]">Display Name *</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Sarah Koenig"
                  className="w-full h-9 px-3 rounded-lg border border-[#c5c6cc] text-xs text-[#010611] focus:outline-none focus:border-[#010611]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#010611]">Handle *</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-[#75777c] font-mono">@</span>
                  <input
                    type="text"
                    value={handle.startsWith("@") ? handle.substring(1) : handle}
                    onChange={(e) => setHandle(`@${e.target.value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "")}`)}
                    placeholder="sarah_ops"
                    className="w-full h-9 pl-6 pr-3 rounded-lg border border-[#c5c6cc] text-xs font-mono text-[#010611] focus:outline-none focus:border-[#010611]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Title / Role */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#010611]">Professional Role</label>
              <input
                type="text"
                value={profTitle}
                onChange={(e) => setProfTitle(e.target.value)}
                placeholder="e.g. Founder, Operations Lead, Product Designer"
                className="w-full h-9 px-3 rounded-lg border border-[#c5c6cc] text-xs text-[#010611] focus:outline-none focus:border-[#010611]"
              />
            </div>

            {/* Short Bio */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#010611] flex items-center justify-between">
                <span>Bio / Summary</span>
                <span className="text-[10px] text-[#75777c]">Optional</span>
              </label>
              <textarea
                rows={2}
                maxLength={200}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A short note about your operational background..."
                className="w-full p-2.5 rounded-lg border border-[#c5c6cc] text-xs text-[#010611] focus:outline-none focus:border-[#010611] resize-none"
              />
            </div>

            {/* LinkedIn Link */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#010611] flex items-center justify-between">
                <span>LinkedIn Profile</span>
                <span className="text-[10px] text-[#75777c]">Optional</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#75777c]" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full h-9 pl-8 pr-3 rounded-lg border border-[#c5c6cc] text-xs text-[#010611] focus:outline-none focus:border-[#010611]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="monochrome"
                size="sm"
                disabled={isSaving || !displayName.trim()}
                className="px-4 py-2 gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save Changes</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* 2. MY COMMENTS CARD */}
        <div className="bg-white rounded-xl border border-[#e6e8ea] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6e8ea]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#010611]" />
              <h2 className="text-sm font-bold text-[#010611]">
                My Comments ({contributions.length})
              </h2>
            </div>
            <Link
              to="/insights"
              search={{ tab: "knowledge" } as any}
              className="text-xs text-[#505f76] hover:text-[#010611] hover:underline"
            >
              Browse Articles
            </Link>
          </div>

          {contributions.length === 0 ? (
            <p className="text-xs text-[#75777c] py-4 text-center">
              You haven't posted any comments yet. Visit any knowledge article to share your perspective.
            </p>
          ) : (
            <div className="space-y-3">
              {contributions.map((c) => {
                const targetPath =
                  c.item_type === "knowledge"
                    ? "/insights/knowledge/$id"
                    : "/insights/$id";
                const targetId = c.item_slug || c.item_id;
                const commentHash = `comment-${c.id}`;

                return (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-lg bg-[#f7f9fb] border border-[#e6e8ea] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to={targetPath as any}
                        params={{ id: targetId } as any}
                        hash={commentHash}
                        className="font-semibold text-[#010611] hover:underline line-clamp-1"
                      >
                        {c.item_title}
                      </Link>
                      <span className="text-[10px] font-mono text-[#75777c] shrink-0">
                        {formatTimeAgo(c.created_at)}
                      </span>
                    </div>

                    <p className="text-[#505f76] leading-relaxed whitespace-pre-line">
                      "{c.content}"
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#505f76]">
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-[#010611]" />
                        <span>{c.upvotes} upvotes</span>
                      </span>
                      <Link
                        to={targetPath as any}
                        params={{ id: targetId } as any}
                        hash={commentHash}
                        className="inline-flex items-center gap-1 text-[#010611] hover:underline font-medium"
                      >
                        <span>View thread</span>
                        <ExternalLink className="w-3 h-3 text-[#75777c]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
