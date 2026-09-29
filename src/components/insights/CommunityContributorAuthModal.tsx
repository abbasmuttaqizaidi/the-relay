import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, useClerk, useSignIn, useUser } from "@clerk/tanstack-react-start";
import {
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Check,
  Lock,
  Building2,
  User,
  Info,
  Link as LinkIcon,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Loader2,
  ArrowUpRight,
  Eye,
  Gavel,
} from "lucide-react";
import { toast } from "sonner";
import { saveCommunityProfile, setUserAccountType, getCommunityProfile } from "@/functions/communityProfile";
import { postInsightComment } from "@/functions/postInsightComment";
import { getCompanyInitials } from "@/lib/utils";
import {
  savePendingCommentSession,
  getPendingCommentSession,
  clearPendingCommentSession,
} from "@/lib/discussion-session";

interface CommunityContributorAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingComment: string;
  parentId?: string | null;
  itemType: "question" | "knowledge";
  itemId: string;
  itemTitle?: string;
  onCommentPublished?: () => void;
}

export function CommunityContributorAuthModal({
  open,
  onOpenChange,
  pendingComment,
  parentId,
  itemType,
  itemId,
  itemTitle,
  onCommentPublished,
}: CommunityContributorAuthModalProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user: clerkUser } = useUser();
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  // Screen state: 0 (Login/Registration Form), 1 (Choose Account Type), 2 (Set Up Identity)
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(isSignedIn ? 1 : 0);
  const [loading, setLoading] = useState(false);

  // Screen 0 form fields
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [expertiseDomain, setExpertiseDomain] = useState("");
  const [agreedStandards, setAgreedStandards] = useState(false);

  // Screen 1 state: tier selection ("community" | "business")
  const [selectedTier, setSelectedTier] = useState<"community" | "business">("community");

  // Screen 2 contributor profile fields
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [profTitle, setProfTitle] = useState("");
  const [bio, setBio] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [avatarType, setAvatarType] = useState<"monogram" | "photo">("monogram");

  // Sync clerk user data when authenticated
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || clerkUser.username || "";
      const email = clerkUser.primaryEmailAddress?.emailAddress || "";
      
      setFullName((prev) => prev || name);
      setDisplayName((prev) => prev || name || "Anonymous Fellow");
      setWorkEmail((prev) => prev || email);
      
      const emailPrefix = (email.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, "") || "contributor";
      const genHandle = clerkUser.username
        ? `@${clerkUser.username}`
        : `@${emailPrefix}`;
      setHandle((prev) => prev || genHandle);

      // Restore any temporary draft entered on Screen 0 before OAuth
      const session = getPendingCommentSession(itemId);
      if (session?.draft) {
        if (session.draft.fullName) {
          setFullName(session.draft.fullName);
          setDisplayName(session.draft.fullName);
        }
        if (session.draft.workEmail) setWorkEmail(session.draft.workEmail);
        if (session.draft.currentRole) {
          setCurrentRole(session.draft.currentRole);
          setProfTitle(session.draft.currentRole);
        }
        if (session.draft.expertiseDomain) setExpertiseDomain(session.draft.expertiseDomain);
      }

      // Check if user already has an existing DB profile
      getCommunityProfile()
        .then((dbUser) => {
          if (dbUser) {
            if (dbUser.name) setDisplayName(dbUser.name);
            if (dbUser.handle) setHandle(dbUser.handle);
            if (dbUser.title) setProfTitle(dbUser.title);
            if (dbUser.bio) setBio(dbUser.bio);
            if (dbUser.linkedin_url) setExternalLink(dbUser.linkedin_url);
            if (dbUser.avatar_type === "photo") setAvatarType("photo");

            // If user already completed identity setup in a prior session
            if (dbUser.name && dbUser.handle && dbUser.type === "community_member") {
              setCurrentStep(2);
            }
          }
        })
        .catch(() => {});

      // Progress past screen 0 if signed in
      if (currentStep === 0) {
        setCurrentStep(1);
      }
    }
  }, [isSignedIn, clerkUser]);

  // Synchronize initial screen step when modal visibility changes
  useEffect(() => {
    if (open) {
      if (isSignedIn) {
        if (currentStep === 0) {
          setCurrentStep(1);
        }
      } else {
        setCurrentStep(0);
      }
    }
  }, [open, isSignedIn]);

  // Close on Escape key press
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearPendingCommentSession(itemId);
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, itemId, onOpenChange]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  // Cleanly dismiss modal and clear pending comment session keys
  const handleDismiss = () => {
    clearPendingCommentSession(itemId);
    onOpenChange(false);
  };

  // Google OAuth redirect trigger for Screen 0
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      savePendingCommentSession(itemId, {
        content: pendingComment,
        parentId,
        draft: {
          fullName: fullName || undefined,
          workEmail: workEmail || undefined,
          currentRole: currentRole || undefined,
          expertiseDomain: expertiseDomain || undefined,
        },
      });
      
      const returnUrl =
        window.location.pathname +
        window.location.search +
        (window.location.hash || "#discussion");

      await clerk.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: returnUrl,
      });
    } catch (err: any) {
      console.error("[Google OAuth] Error:", err);
      toast.error(err.message || "Failed to initialize Google Sign-in");
      setLoading(false);
    }
  };

  // Screen 0 email form submit
  const handleScreen0Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedStandards) {
      toast.error("Please agree to The Relay Community Standards.");
      return;
    }

    setDisplayName(fullName);
    setProfTitle(currentRole);
    const emailPrefix = (workEmail.split("@")[0] || "").toLowerCase().replace(/[^a-z0-9._-]/g, "") || "contributor";
    setHandle(`@${emailPrefix}`);

    savePendingCommentSession(itemId, {
      content: pendingComment,
      parentId,
      draft: {
        fullName,
        workEmail,
        currentRole,
        expertiseDomain,
      },
    });

    if (!isSignedIn) {
      // Prompt Google authentication
      toast.info("Please authenticate with Google to activate your accreditation.");
      await handleGoogleSignIn();
      return;
    }

    setCurrentStep(1);
  };

  // Screen 1: Proceed based on selected tier
  const handleTierConfirm = async (tierOverride?: "community" | "business") => {
    const tier = tierOverride || selectedTier;
    if (tier === "business") {
      handleDismiss();
      navigate({ to: "/onboarding" });
      return;
    }

    try {
      setLoading(true);
      if (isSignedIn) {
        await setUserAccountType({ data: { type: "community_member" } });
      }
      setCurrentStep(2);
    } catch (err: any) {
      toast.error(err.message || "Failed to set tier");
    } finally {
      setLoading(false);
    }
  };

  // Screen 2: Finalize Profile and Publish Comment
  const handlePublishAndJoin = async () => {
    const trimmedName = displayName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      toast.error("Please enter a display name (at least 2 characters).");
      return;
    }

    let cleanHandle = handle.trim();
    if (cleanHandle.startsWith("@")) {
      cleanHandle = cleanHandle.substring(1).trim();
    }
    cleanHandle = cleanHandle.replace(/\s+/g, "");
    if (!cleanHandle || cleanHandle.length < 2) {
      toast.error("Network handle must be at least 2 characters (e.g. @sarah).");
      return;
    }
    const finalHandle = `@${cleanHandle}`;

    try {
      setLoading(true);

      const clerkPhoto = clerkUser?.imageUrl || undefined;

      let cleanExternalLink = externalLink.trim();
      if (
        cleanExternalLink &&
        !cleanExternalLink.startsWith("http://") &&
        !cleanExternalLink.startsWith("https://")
      ) {
        cleanExternalLink = `https://${cleanExternalLink}`;
      }

      // 1. Save community profile in database
      await saveCommunityProfile({
        data: {
          name: trimmedName,
          handle: finalHandle,
          title: profTitle.trim() || "Community Member",
          bio: bio.trim() || undefined,
          avatar_type: avatarType,
          avatar_url: avatarType === "photo" ? clerkPhoto : undefined,
          linkedin_url: cleanExternalLink || undefined,
          expertise_domain: expertiseDomain || undefined,
        },
      });

      // 2. Post the preserved comment if available (passing parent_id for threaded replies)
      const commentText = pendingComment.trim();
      if (commentText) {
        await postInsightComment({
          data: {
            item_type: itemType,
            item_id: itemId,
            author_type: "general_public",
            content: commentText,
            author_name: trimmedName,
            author_title: profTitle.trim() || "Community Member",
            author_avatar: avatarType === "photo" ? clerkPhoto : undefined,
            parent_id: parentId || null,
          },
        });
      }

      clearPendingCommentSession(itemId);

      toast.success(
        commentText
          ? parentId
            ? "Profile saved & reply posted!"
            : "Profile saved & perspective published!"
          : "Contributor profile saved successfully!"
      );
      onOpenChange(false);
      onCommentPublished?.();
    } catch (err: any) {
      console.error("[CommunityContributorAuthModal] Publish error:", err);
      toast.error(err.message || "Failed to finalize profile and publish response.");
    } finally {
      setLoading(false);
    }
  };

  const monogram = getCompanyInitials(displayName || "Sarah Koenig");

  return (
    <div
      onClick={handleDismiss}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#010611]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-[#c5c6cc]/40 overflow-hidden my-auto text-[#191c1e] font-sans"
      >
        
        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 0: LOGIN & CONTRIBUTOR ACCREDITATION FORM
            ═══════════════════════════════════════════════════════════════════ */}
        {currentStep === 0 && (
          <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
            {/* Breadcrumb & Step Metadata */}
            <div className="flex items-center justify-between text-xs pb-1">
              <div className="flex items-center gap-1.5 text-[#505f76] font-mono uppercase tracking-wider text-[11px]">
                <span>Knowledge Discussion</span>
                <span>/</span>
                <span className="text-[#010611] font-bold">Contributor Access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-[#eceef0] px-3 py-1 rounded-full text-[#505f76] text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#010611] inline-block" />
                  <span>Step 01 / 03</span>
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="p-1 rounded-full text-[#505f76] hover:text-[#010611] hover:bg-[#eceef0] transition-colors cursor-pointer"
                  title="Close and Return"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Header Block */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eceef0] text-[#505f76] text-[11px] font-mono uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#010611]" />
                <span>Individual Accreditation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#010611] font-display">
                Join as a Community Member
              </h1>
              <p className="text-sm text-[#505f76] leading-relaxed font-sans">
                Contribute perspectives, ask questions, and share operational lessons across verified industry playbooks.
              </p>
            </div>

            {/* Quick Fast Auth Button (Google) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full group flex items-center justify-center gap-2.5 h-11 px-4 rounded-md bg-white hover:bg-[#f2f4f6] text-[#010611] text-xs font-semibold border border-[#c5c6cc]/60 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full h-px bg-[#e6e8ea]" />
              <span className="absolute px-3 bg-white text-[#75777c] text-[11px] font-mono uppercase tracking-wider">
                Or register with professional work email
              </span>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleScreen0Submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-[#010611]">Full Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Koenig"
                    className="w-full h-10 px-3 rounded bg-white text-[#010611] text-xs border border-[#c5c6cc] focus:outline-none focus:ring-1 focus:ring-[#010611] shadow-2xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-[#010611]">Work / Professional Email</label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="e.g. sarah@designops.co"
                    className="w-full h-10 px-3 rounded bg-white text-[#010611] text-xs border border-[#c5c6cc] focus:outline-none focus:ring-1 focus:ring-[#010611] shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#010611]">Current Role / Title</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g. Principal Systems Designer or Supply Chain Strategy Lead"
                  className="w-full h-10 px-3 rounded bg-white text-[#010611] text-xs border border-[#c5c6cc] focus:outline-none focus:ring-1 focus:ring-[#010611] shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-[#010611]">Primary Expertise Domain</label>
                <select
                  required
                  value={expertiseDomain}
                  onChange={(e) => setExpertiseDomain(e.target.value)}
                  className="w-full h-10 px-3 rounded bg-white text-[#010611] text-xs border border-[#c5c6cc] focus:outline-none focus:ring-1 focus:ring-[#010611] shadow-2xs cursor-pointer"
                >
                  <option value="" disabled>Select verified domain of practice...</option>
                  <option value="logistics">Logistics &amp; Supply Chain</option>
                  <option value="engineering">Engineering &amp; Infrastructure</option>
                  <option value="talent">Hiring &amp; Executive Talent</option>
                  <option value="sales">Sales &amp; Distribution</option>
                  <option value="finance">Finance &amp; Capital</option>
                </select>
              </div>

              {/* Operational Standards Checkbox */}
              <div className="p-3.5 rounded bg-[#f2f4f6] flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="standardsCheck"
                  checked={agreedStandards}
                  onChange={(e) => setAgreedStandards(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded text-[#010611] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="standardsCheck" className="text-xs text-[#505f76] cursor-pointer select-none leading-relaxed">
                  I agree to <strong className="text-[#010611] font-semibold">The Relay Community Standards</strong> (Strict zero-solicitation policy; factual operational commentary and vetted teardowns only).
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded bg-[#171f2c] hover:bg-[#010611] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Profile Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Institutional Privacy Subtext */}
            <div className="pt-3 border-t border-[#e6e8ea] flex flex-col sm:flex-row items-center justify-between text-[#75777c] text-[11px] font-mono gap-2">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Enterprise SSO &amp; End-to-End Key Encryption</span>
              </div>
              <div>
                <span>Verification SLA: &lt; 2 business hours</span>
              </div>
            </div>

            {/* Switch to Verified Business Banner */}
            <div className="p-3.5 rounded bg-[#f2f4f6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#eceef0] flex items-center justify-center text-[#010611] shrink-0 font-bold">
                  ⇄
                </div>
                <div>
                  <p className="font-semibold text-[#010611]">Need commercial dealflow or trade capacity?</p>
                  <p className="text-[#505f76] text-[11px]">Looking to post commercial dealflow or trade unserviceable leads?</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  navigate({ to: "/onboarding" });
                }}
                className="shrink-0 text-[#010611] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Switch to Verified Business</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 1: CHOOSE YOUR ACCOUNT TYPE
            ═══════════════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="flex flex-col">
            {/* Top Monochromatic Accent Rail & Status Header */}
            <div className="w-full bg-[#f2f4f6] px-6 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#e6e8ea]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#505f76]">
                <span className="w-2 h-2 rounded-full bg-[#010611] inline-block" />
                <span className="uppercase tracking-wider">Authentication Tier Verification Required</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-1 text-[11px] font-mono uppercase text-[#505f76] hover:text-[#010611] transition-colors cursor-pointer"
              >
                <span>Cancel &amp; Return</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Core Container */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#010611] font-display">
                  Choose Your Account Type
                </h2>
                <p className="text-sm text-[#505f76]">
                  Select your participation level to join the discussion.
                </p>
              </div>

              {/* Tier Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* TIER 1: Community Member */}
                <div
                  onClick={() => setSelectedTier("community")}
                  className={`flex flex-col justify-between p-6 rounded-md transition-all cursor-pointer border-2 ${
                    selectedTier === "community"
                      ? "border-[#010611] bg-white shadow-md"
                      : "border-[#e6e8ea] bg-[#f7f9fb] hover:bg-white"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-[#505f76] uppercase tracking-widest">
                          Tier I
                        </span>
                        <h3 className="text-lg font-bold text-[#010611] mt-0.5">
                          Community Member
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#e6e8ea] text-[#010611] font-bold">
                        Instant
                      </span>
                    </div>

                    <p className="text-xs text-[#505f76] leading-relaxed">
                      Join as an individual to discuss playbooks, ask questions, and share insights.
                    </p>

                    <div className="space-y-2 pt-2 text-xs text-[#191c1e]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#010611]" />
                        <span>Unrestricted article discussion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#010611]" />
                        <span>Direct Q&amp;A with authors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#010611]" />
                        <span>Instant access (No KYB required)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#75777c]">
                        <span className="w-4 text-center font-bold">−</span>
                        <span>Excludes commercial dealrooms</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#e6e8ea]">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTier("community");
                        handleTierConfirm("community");
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-[#010611] text-white rounded text-xs font-semibold hover:bg-[#171f2c] transition-all cursor-pointer"
                    >
                      <span className="tracking-wide">Join as Community Member</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="block text-center text-[11px] text-[#505f76] mt-2">
                      Instant activation
                    </span>
                  </div>
                </div>

                {/* TIER 2: Verified Business Account */}
                <div
                  onClick={() => setSelectedTier("business")}
                  className={`flex flex-col justify-between p-6 rounded-md transition-all cursor-pointer border-2 ${
                    selectedTier === "business"
                      ? "border-[#010611] bg-white shadow-md"
                      : "border-[#e6e8ea] bg-[#f2f4f6] hover:bg-white"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-[#505f76] uppercase tracking-widest">
                          Tier II
                        </span>
                        <h3 className="text-lg font-bold text-[#010611] mt-0.5">
                          Verified Business Account
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#010611] text-white font-bold">
                        KYB Required
                      </span>
                    </div>

                    <p className="text-xs text-[#505f76] leading-relaxed">
                      Represent a verified company to access bilateral dealrooms and post official responses.
                    </p>

                    <div className="space-y-2 pt-2 text-xs text-[#191c1e]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#010611]" />
                        <span>Verified Entity badge</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#010611]" />
                        <span>Bilateral dealrooms &amp; LOI exchange</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#010611]" />
                        <span>Direct commercial proposals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#010611]" />
                        <span>Multi-seat team access</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#e6e8ea]">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTier("business");
                        handleTierConfirm("business");
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-white text-[#010611] border border-[#c5c6cc] rounded text-xs font-semibold hover:bg-[#f7f9fb] transition-all cursor-pointer"
                    >
                      <span className="tracking-wide">Apply as Verified Business</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="block text-center text-[11px] text-[#505f76] mt-2">
                      Verification SLA: 24–48h
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Footnote */}
              <div className="w-full bg-[#f2f4f6] p-3 rounded flex flex-col sm:flex-row items-center justify-between text-xs text-[#505f76] gap-2">
                <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-[#010611]" />
                  <span className="font-semibold text-[#010611]">Syndicate Standard:</span>
                  <span>Zero spam. Zero cold outreach. Real operators only.</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#75777c]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit Enclave</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 2: SET UP YOUR CONTRIBUTOR IDENTITY
            ═══════════════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Progress Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#e6e8ea]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-1">
                  <span className="bg-[#010611] text-white px-2 py-0.5 rounded text-[10px] uppercase">
                    Step 2 of 2
                  </span>
                  <span className="text-[#505f76] uppercase tracking-widest text-[11px]">
                    Identity Finalization
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#010611] font-display">
                  Set Up Your Contributor Identity
                </h1>
                <p className="text-xs text-[#505f76]">
                  How your insights and commentary will appear to verified businesses and peers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#eceef0] px-3 py-1.5 rounded-full text-xs font-medium text-[#010611]">
                  <ShieldCheck className="w-4 h-4 text-[#010611]" />
                  <span>Unrestricted Discussion Access</span>
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="p-1 rounded-full text-[#505f76] hover:text-[#010611] hover:bg-[#eceef0] transition-colors cursor-pointer"
                  title="Close and Return"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Split Architecture: Left Panel Form, Right Panel Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT PANEL: Profile Configuration (Col 1-7) */}
              <div className="lg:col-span-7 space-y-5 bg-white rounded-lg p-5 border border-[#e6e8ea] shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#e6e8ea]">
                  <div>
                    <h3 className="text-sm font-bold text-[#010611]">Profile Configuration</h3>
                    <p className="text-[11px] text-[#505f76]">Present your operational background concisely.</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#75777c]">Public Record</span>
                </div>

                {/* Avatar Monogram/Photo Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#010611]">Contributor Avatar</label>
                  <div className="flex items-center gap-4 p-3 bg-[#f2f4f6] rounded-md">
                    <div className="w-12 h-12 rounded-full bg-[#010611] overflow-hidden flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {avatarType === "photo" && clerkUser?.imageUrl ? (
                        <img
                          src={clerkUser.imageUrl}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : avatarType === "monogram" ? (
                        monogram
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-xs font-medium text-[#010611] block">
                        {avatarType === "photo" && clerkUser?.imageUrl ? "Google Profile Photo" : "Executive Monogram"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAvatarType("monogram")}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                            avatarType === "monogram"
                              ? "bg-[#010611] text-white"
                              : "bg-[#e0e3e5] text-[#505f76] hover:text-[#010611]"
                          }`}
                        >
                          Monogram ({monogram})
                        </button>
                        <button
                          type="button"
                          onClick={() => setAvatarType("photo")}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                            avatarType === "photo"
                              ? "bg-[#010611] text-white"
                              : "bg-[#e0e3e5] text-[#505f76] hover:text-[#010611]"
                          }`}
                        >
                          {clerkUser?.imageUrl ? "Photo / Google" : "Default Icon"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Inputs Group */}
                <div className="space-y-3.5">
                  {/* Display Name */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-[#010611]">Display Name</label>
                      <span className="text-[#75777c] text-[11px]">Legal / Operating</span>
                    </div>
                    <input
                      type="text"
                      maxLength={100}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Sarah Koenig"
                      className="w-full h-9 px-3 bg-[#f2f4f6] rounded text-xs text-[#010611] border border-transparent focus:border-[#010611] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  {/* Handle & Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#010611]">Network Handle</label>
                      <input
                        type="text"
                        maxLength={50}
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="@handle"
                        className="w-full h-9 px-3 bg-[#f2f4f6] rounded text-xs text-[#010611] border border-transparent focus:border-[#010611] focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#010611]">Professional Title</label>
                      <input
                        type="text"
                        maxLength={100}
                        value={profTitle}
                        onChange={(e) => setProfTitle(e.target.value)}
                        placeholder="e.g. Head of Operations"
                        className="w-full h-9 px-3 bg-[#f2f4f6] rounded text-xs text-[#010611] border border-transparent focus:border-[#010611] focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Operating Focus / Bio */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-[#010611]">Short Bio / Operating Focus</label>
                      <span className="text-[#75777c] font-mono text-[11px]">{bio.length} / 160</span>
                    </div>
                    <textarea
                      rows={2}
                      maxLength={160}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Summarize your primary operating scope and deal focus..."
                      className="w-full p-2.5 bg-[#f2f4f6] rounded text-xs text-[#010611] border border-transparent focus:border-[#010611] focus:bg-white outline-none resize-none leading-relaxed transition-all"
                    />
                  </div>

                  {/* Portfolio or LinkedIn */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-medium text-[#010611]">Portfolio or LinkedIn (Optional)</label>
                      <span className="text-[#75777c] text-[11px]">Verified external link</span>
                    </div>
                    <div className="flex items-center bg-[#f2f4f6] rounded px-3 border border-transparent focus-within:border-[#010611] focus-within:bg-white transition-all">
                      <LinkIcon className="w-3.5 h-3.5 text-[#75777c] mr-2 shrink-0" />
                      <input
                        type="url"
                        maxLength={200}
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full h-9 bg-transparent text-xs text-[#010611] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e6e8ea]">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full sm:w-auto h-10 px-3.5 rounded bg-[#f2f4f6] text-[#505f76] hover:text-[#010611] hover:bg-[#e6e8ea] text-xs font-medium transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="w-full sm:w-auto h-10 px-4 rounded bg-[#e6e8ea] text-[#010611] hover:bg-[#d8dadc] text-xs font-medium transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handlePublishAndJoin}
                    disabled={loading || !displayName.trim()}
                    className="w-full sm:w-auto h-10 px-5 rounded bg-[#010611] text-white hover:bg-[#171f2c] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{pendingComment?.trim() ? "Publishing & Joining..." : "Saving Profile..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{pendingComment?.trim() ? "Publish Response & Join Discussion" : "Complete Profile & Join Discussion"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL: Live Contributor Preview (Col 8-12) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono uppercase text-[#505f76] text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#010611] animate-pulse" />
                    <span>Live Feed Preview</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#75777c] truncate max-w-[180px]">
                    {itemTitle ? `Article: ${itemTitle}` : "Discussion Context"}
                  </span>
                </div>

                {/* Article Comment Thread Simulation Card */}
                <div className="bg-[#f7f9fb] border border-[#e6e8ea] rounded-lg p-4 space-y-3 shadow-2xs">
                  {/* Originating Post Context */}
                  <div className="bg-white rounded p-3 text-xs border border-[#e6e8ea] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#505f76] block">
                      Target Discussion
                    </span>
                    <p className="font-semibold text-[#010611] line-clamp-1">
                      {itemTitle || "Navigating Bilateral Escrow Structuring in Multi-Jurisdiction Carve-Outs"}
                    </p>
                  </div>

                  {/* Pending Reply / Live Render Box */}
                  <div className="bg-white rounded-lg p-3.5 border border-[#c5c6cc]/70 shadow-xs space-y-2.5">
                    {/* Author Meta Row */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#010611] overflow-hidden text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {avatarType === "photo" && clerkUser?.imageUrl ? (
                          <img
                            src={clerkUser.imageUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : avatarType === "monogram" ? (
                          monogram
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs text-[#010611] truncate">
                            {displayName || "Sarah Koenig"}
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#eceef0] text-[#010611] font-mono text-[9.5px] uppercase font-bold">
                            <User className="w-2.5 h-2.5" />
                            Community Member
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#505f76] mt-0.5">
                          <span>{profTitle || "Senior Product Designer"}</span>
                          <span>•</span>
                          <span className="text-[#75777c]">{handle || "@sarah_ops"}</span>
                          <span>•</span>
                          <span className="text-[#75777c]">Just now</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Body of the Comment */}
                    <div className="text-xs text-[#191c1e] leading-relaxed pl-11 whitespace-pre-line break-words">
                      "{pendingComment.trim() || "As an operator who recently structured similar workflows, this hits home. When diligence expectations bleed into core delivery loops without clear calibration checkpoints, you end up self-selecting for process tolerance rather than velocity."}"
                    </div>

                    {/* Bio Pill */}
                    {bio && (
                      <div className="ml-11 p-2 rounded bg-[#f2f4f6] text-[11px] text-[#505f76] italic">
                        {bio}
                      </div>
                    )}

                    {/* Comment Actions Simulation */}
                    <div className="flex items-center gap-4 pl-11 text-xs text-[#505f76] pt-1">
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5" /> 0 Upvotes
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> Reply
                      </span>
                      <Bookmark className="w-3.5 h-3.5 ml-auto text-[#75777c]" />
                    </div>
                  </div>

                  {/* Network Footprint Metric */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white p-2.5 rounded border border-[#e6e8ea]">
                      <span className="text-[10px] font-mono uppercase text-[#75777c] block">Network Reach</span>
                      <span className="font-bold text-sm text-[#010611]">4,200+</span>
                      <span className="text-[10px] text-[#505f76] block">Verified Execs</span>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-[#e6e8ea]">
                      <span className="text-[10px] font-mono uppercase text-[#75777c] block">Syndicate Tier</span>
                      <span className="font-bold text-sm text-[#010611]">Peer Level 1</span>
                      <span className="text-[10px] text-[#505f76] block">Active Voice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
