import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  MessageSquare,
  ShieldCheck,
  Building2,
  User,
  MoreHorizontal,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CompanyLogo } from "@/components/company-logo";
import { toast } from "sonner";
import {
  InsightComment,
  CommentAuthorType,
  Business,
  User as UserTypeModel,
} from "@/types";
import { getInsightComments } from "@/functions/getInsightComments";
import { postInsightComment, upvoteInsightComment } from "@/functions/postInsightComment";
import { getCommunityProfile } from "@/functions/communityProfile";
import { InsightsPublicAuthPromptModal } from "./InsightsPublicAuthPromptModal";
import { formatTimeAgo, getCompanyInitials } from "@/lib/utils";
import {
  savePendingCommentSession,
  getPendingCommentSession,
  clearPendingCommentSession,
  getStoredUpvotedComments,
  saveStoredUpvotedComment,
} from "@/lib/discussion-session";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";
import { useUser } from "@clerk/tanstack-react-start";

interface InsightDiscussionSectionProps {
  itemType: "question" | "knowledge";
  itemId: string;
  itemTitle?: string;
  currentUserBusiness?: Business | null;
  isSignedIn?: boolean;
}

export function InsightDiscussionSection({
  itemType,
  itemId,
  itemTitle,
  currentUserBusiness,
  isSignedIn,
}: InsightDiscussionSectionProps) {
  const { user: clerkUser } = useUser();
  const [comments, setComments] = useState<InsightComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showIdentitySwitch, setShowIdentitySwitch] = useState(false);

  // Active filter tab: "all" | "verified" | "team"
  const [activeTab, setActiveTab] = useState<"all" | "verified" | "team">("all");

  // Pagination / visible count
  const [visibleCount, setVisibleCount] = useState(5);

  // Identity selector state (strictly authenticated: verified business or verified community contributor)
  const [selectedRole, setSelectedRole] = useState<CommentAuthorType>(
    currentUserBusiness ? "relay_business" : "general_public"
  );
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalPendingText, setAuthModalPendingText] = useState("");
  const [pendingParentId, setPendingParentId] = useState<string | null>(null);
  const [authModalTrigger, setAuthModalTrigger] = useState<"comment" | "upvote" | "landing">("comment");
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [upvotingIds, setUpvotingIds] = useState<Set<string>>(new Set());
  const [communityUser, setCommunityUser] = useState<UserTypeModel | null>(null);

  const [profileLoading, setProfileLoading] = useState(Boolean(isSignedIn));
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const hasAutoPublishedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // 1. If contributor auth modal is open, or user is replying, hide floating CTA
      if (authModalOpen || replyToId !== null) {
        setShowFloatingButton(false);
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const discussionEl = document.getElementById("discussion-system") || document.getElementById("discussion");

      if (!discussionEl) {
        setShowFloatingButton(false);
        return;
      }

      const rect = discussionEl.getBoundingClientRect();

      // 2. Strict Scroll & Position Verification:
      // - Must not show at the top or in the middle of reading the article (scrollY > 300 required)
      // - Discussion section is "approaching" when it's within 500px below viewport
      // - If rect.top <= windowHeight * 0.45, discussion header is already on screen or scrolled above (user is in discussion comments)
      const isPastTop = scrollY > 300;
      const isApproachingDiscussion = rect.top <= windowHeight + 500;
      const isDiscussionAlreadyInView = rect.top <= windowHeight * 0.45;

      const shouldShow = isPastTop && isApproachingDiscussion && !isDiscussionAlreadyInView;
      setShowFloatingButton(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [loading, comments.length, authModalOpen, replyToId]);

  const handleScrollToDiscussion = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowFloatingButton(false);
    const el = document.getElementById("discussion-system") || document.getElementById("discussion");
    if (el) {
      const yOffset = -72;
      const y = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", "#discussion-system");
    }
  };

  // Auto-scroll to discussion section when page loads or navigates with discussion hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash || "";
    if (h.toLowerCase().includes("discussion")) {
      const timer = setTimeout(() => {
        const el = document.getElementById("discussion-system") || document.getElementById("discussion");
        if (el) {
          const yOffset = -72;
          const y = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [itemId]);

  useEffect(() => {
    if (currentUserBusiness && selectedRole === "general_public") {
      setSelectedRole("relay_business");
    }
  }, [currentUserBusiness]);

  useEffect(() => {
    if (isSignedIn) {
      setProfileLoading(true);
      getCommunityProfile()
        .then((profile) => {
          if (profile) {
            setCommunityUser(profile);
            if (profile.type === "community_member" && !currentUserBusiness) {
              setSelectedRole("general_public");
            }
          }
        })
        .catch(() => {})
        .finally(() => {
          setProfileLoading(false);
        });
    } else {
      setProfileLoading(false);
    }
  }, [isSignedIn, currentUserBusiness]);

  // Auto-publish pending draft when user returns authenticated from sign up / sign in modal
  const publishPendingComment = async (text: string, pId?: string | null) => {
    if (!text || !text.trim()) return;
    try {
      setSubmitting(true);
      const sessionDraft = getPendingCommentSession(itemId)?.draft;
      const effectiveAuthorName =
        currentUserBusiness?.company_name ||
        communityUser?.name ||
        sessionDraft?.fullName ||
        "Community Member";

      const effectiveAuthorTitle =
        currentUserBusiness
          ? "Relay Verified"
          : communityUser?.title || sessionDraft?.currentRole || undefined;

      const effectiveAuthorAvatar = currentUserBusiness
        ? currentUserBusiness.logo_url || undefined
        : communityUser?.avatar_url || clerkUser?.imageUrl || undefined;

      const created = await postInsightComment({
        data: {
          item_type: itemType,
          item_id: itemId,
          author_type: currentUserBusiness ? "relay_business" : "general_public",
          content: text.trim(),
          author_name: effectiveAuthorName,
          author_title: effectiveAuthorTitle,
          author_avatar: effectiveAuthorAvatar,
          business_id: currentUserBusiness?.id,
          parent_id: pId || undefined,
        },
      });

      if (created) {
        if (pId) {
          setComments((prev) =>
            prev.map((c) =>
              c.id === pId ? { ...c, replies: [...(c.replies || []), created] } : c
            )
          );
        } else {
          setComments((prev) => [created, ...prev]);
          setContent("");
        }
        clearPendingCommentSession(itemId);
        toast.success("Welcome to The Relay! Your perspective has been published.");
      }
    } catch (err: any) {
      console.warn("[InsightDiscussionSection] Error auto-posting comment:", err);
      if (!pId) setContent(text);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setUpvotedIds(getStoredUpvotedComments());

    if (!isSignedIn || !itemId) return;

    if (!hasAutoPublishedRef.current) {
      const pending = getPendingCommentSession(itemId);
      if (pending?.content) {
        // Only auto-publish if user is already an established business OR has an established community profile.
        // For new users without a completed profile, CommunityContributorAuthModal handles onboarding and publishes with their chosen credentials.
        if (currentUserBusiness || communityUser?.name) {
          hasAutoPublishedRef.current = true;
          publishPendingComment(pending.content, pending.parentId);
        }
      }
    }

    try {
      const pendingUpvoteId = sessionStorage.getItem(`relay_pending_upvote_${itemId}`);
      if (pendingUpvoteId) {
        sessionStorage.removeItem(`relay_pending_upvote_${itemId}`);
        handleUpvote(pendingUpvoteId);
      }
    } catch {}
  }, [itemId, isSignedIn]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getInsightComments({
        data: { item_type: itemType, item_id: itemId },
      });
      setComments(data || []);
    } catch (err) {
      console.warn("[InsightDiscussionSection] Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadComments();
    }
  }, [itemId]);

  const handlePostComment = async (parentId?: string) => {
    if (submitting) return;

    const textToSubmit = parentId ? replyContent.trim() : content.trim();
    if (!textToSubmit) {
      toast.error("Please enter a perspective.");
      return;
    }

    if (textToSubmit.length < 3) {
      toast.error("Response must be at least 3 characters.");
      return;
    }

    // Unauthenticated user -> Save draft and open the sign-up modal ("Your response could be valuable to someone else")
    if (!isSignedIn) {
      setAuthModalTrigger("comment");
      setAuthModalPendingText(textToSubmit);
      setPendingParentId(parentId || null);
      savePendingCommentSession(itemId, {
        content: textToSubmit,
        parentId: parentId || undefined,
        timestamp: Date.now(),
      });
      setAuthModalOpen(true);
      return;
    }

    try {
      setSubmitting(true);

      const effectiveAuthorName =
        selectedRole === "relay_business"
          ? currentUserBusiness?.company_name || "Relay Verified Business"
          : communityUser?.name ||
            (selectedRole === "business_member" ? "Associate Member" : "Community Contributor");

      const effectiveAuthorAvatar =
        selectedRole === "relay_business"
          ? currentUserBusiness?.logo_url || undefined
          : communityUser?.avatar_url || clerkUser?.imageUrl || undefined;

      const created = await postInsightComment({
        data: {
          item_type: itemType,
          item_id: itemId,
          author_type: selectedRole,
          content: textToSubmit,
          author_name: effectiveAuthorName,
          author_title: effectiveAuthorTitle,
          author_avatar: effectiveAuthorAvatar,
          business_id:
            selectedRole === "relay_business" || selectedRole === "business_member"
              ? currentUserBusiness?.id
              : undefined,
          parent_id: parentId || undefined,
        },
      });

      if (!created) {
        toast.error("Failed to post response. Please try again.");
        return;
      }

      if (parentId) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === parentId) {
              return {
                ...c,
                replies: [...(c.replies || []), created],
              };
            }
            return c;
          })
        );
        setReplyContent("");
        setReplyToId(null);
      } else {
        setComments((prev) => [created, ...prev]);
        setContent("");
        setIsFocused(false);
        setActiveTab("all");
        setVisibleCount((prev) => Math.max(prev, 5));
      }

      clearPendingCommentSession(itemId);
      toast.success("Perspective posted successfully.");
    } catch (err: any) {
      console.error("[InsightDiscussionSection] Failed to post comment:", err);
      toast.error(err?.message || "Failed to post response.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (commentId: string) => {
    // Unauthenticated user -> Save draft if typed, remember pending upvote, open auth modal
    if (!isSignedIn) {
      const draft = content.trim() || replyContent.trim();
      if (draft) {
        setAuthModalPendingText(draft);
        savePendingCommentSession(itemId, {
          content: draft,
          parentId: replyToId || undefined,
          timestamp: Date.now(),
        });
      } else {
        setAuthModalPendingText("");
      }
      setPendingParentId(null);
      setAuthModalTrigger("upvote");
      try {
        sessionStorage.setItem(`relay_pending_upvote_${itemId}`, commentId);
      } catch {}
      setAuthModalOpen(true);
      return;
    }

    if (upvotedIds.has(commentId)) {
      toast.info("You have already upvoted this perspective.");
      return;
    }

    if (upvotingIds.has(commentId)) {
      return;
    }

    try {
      setUpvotingIds((prev) => new Set([...prev, commentId]));
      const newCount = await upvoteInsightComment({
        data: { comment_id: commentId },
      });
      saveStoredUpvotedComment(commentId);
      setUpvotedIds((prev) => new Set([...prev, commentId]));
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === commentId) return { ...c, upvotes: newCount };
          if (c.replies) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === commentId ? { ...r, upvotes: newCount } : r
              ),
            };
          }
          return c;
        })
      );
    } catch {
      toast.error("Failed to upvote.");
    } finally {
      setUpvotingIds((prev) => {
        const next = new Set(prev);
        next.delete(commentId);
        return next;
      });
    }
  };

  // Compute counts
  const totalResponses = comments.reduce(
    (acc, curr) => acc + 1 + (curr.replies?.length || 0),
    0
  );

  const verifiedCount = comments.reduce(
    (acc, curr) =>
      acc +
      (curr.author_type === "relay_business" ? 1 : 0) +
      (curr.replies?.filter((r) => r.author_type === "relay_business").length || 0),
    0
  );

  const teamCount = comments.reduce(
    (acc, curr) =>
      acc +
      (curr.author_type !== "relay_business" ? 1 : 0) +
      (curr.replies?.filter((r) => r.author_type !== "relay_business").length || 0),
    0
  );

  // Filter comments based on activeTab
  const filteredComments = comments.filter((comment) => {
    if (activeTab === "all") return true;
    if (activeTab === "verified") {
      return (
        comment.author_type === "relay_business" ||
        (comment.replies && comment.replies.some((r) => r.author_type === "relay_business"))
      );
    }
    if (activeTab === "team") {
      return (
        comment.author_type !== "relay_business" ||
        (comment.replies && comment.replies.some((r) => r.author_type !== "relay_business"))
      );
    }
    return true;
  });

  const visibleComments = filteredComments.slice(0, visibleCount);

  // Active user name for composer
  const activeComposerName =
    selectedRole === "relay_business"
      ? currentUserBusiness?.company_name || "Relay Verified Business"
      : selectedRole === "business_member"
      ? communityUser?.name || "Associate Contributor"
      : communityUser?.name || (isSignedIn ? "Community Member" : "");

  const activeAvatarInitials = getCompanyInitials(activeComposerName) || "CR";

  return (
    <section className="mt-12 sm:mt-16 pt-8 border-t border-[#c5c6cc]/60 w-full scroll-mt-20" id="discussion-system">
      {/* Anchor for backward compatibility with #discussion */}
      <span id="discussion" className="sr-only" />

      {/* ─────────────────────────────────────────────────────────────
          DISCUSSION & PERSPECTIVES HEADER & FILTER TABS
          (seo_code_guide.md line 577)
          ───────────────────────────────────────────────────────────── */}
      <div className="pb-4 border-b border-[#c5c6cc] mb-6 space-y-3">
        {/* Title and Subheading */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#010611] tracking-tight">
            Discussion &amp; Perspectives
          </h2>
          <p className="text-xs sm:text-sm text-[#505f76] mt-0.5">
            Insights and commentary from verified operators and practitioners.
          </p>
        </div>

        {/* Responses count and compact dropdown in the exact same row */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <span className="text-xs sm:text-[13px] font-medium text-[#505f76] whitespace-nowrap">
            {totalResponses} {totalResponses === 1 ? "response" : "responses"}
          </span>

          {/* User Type Filter Dropdown (Compact Size) */}
          <Select
            value={activeTab}
            onValueChange={(val: "all" | "verified" | "team") => {
              setActiveTab(val);
              setVisibleCount(5);
            }}
          >
            <SelectTrigger className="h-8 w-auto min-w-[130px] sm:min-w-[145px] text-[11px] font-mono uppercase tracking-wider bg-white border-[#c5c6cc] text-[#010611] rounded-[4px] px-2.5 py-1 shadow-2xs hover:border-slate-400 shrink-0">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="font-mono text-xs">
              <SelectItem value="all">
                All ({totalResponses})
              </SelectItem>
              <SelectItem value="verified">
                Verified ({verifiedCount})
              </SelectItem>
              <SelectItem value="team">
                Team ({teamCount})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RESPONSE COMPOSER CARD
          (seo_code_guide.md line 577)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-lg border border-[#c5c6cc] p-4 sm:p-5 mb-8 shadow-xs">
        {/* Top bar: Identity info */}
        {isSignedIn ? (
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              {/* Small circular avatar */}
              {selectedRole === "relay_business" && currentUserBusiness ? (
                <div className="w-6 h-6 rounded-full overflow-hidden bg-[#171f2c] border border-[#c5c6cc] flex items-center justify-center shrink-0">
                  <CompanyLogo
                    name={currentUserBusiness.company_name}
                    src={currentUserBusiness.logo_url}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              ) : (communityUser?.avatar_url || clerkUser?.imageUrl) ? (
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#c5c6cc] shrink-0">
                  <img
                    src={communityUser?.avatar_url || clerkUser?.imageUrl}
                    alt={communityUser?.name || clerkUser?.fullName || "Avatar"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-200 text-[#010611] flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-[#505f76]" />
                </div>
              )}

              <span className="text-xs sm:text-sm text-[#505f76] truncate">
                Responding as{" "}
                <span className="font-semibold text-[#010611]">{activeComposerName}</span>
              </span>
            </div>

            {currentUserBusiness && (
              <button
                type="button"
                onClick={() => setShowIdentitySwitch(!showIdentitySwitch)}
                className="text-[11px] font-medium text-[#505f76] hover:text-[#010611] transition-colors cursor-pointer shrink-0"
              >
                {showIdentitySwitch ? "Close" : "Switch"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center pb-2.5 border-b border-[#c5c6cc]/60 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#f2f4f6] text-[#505f76] flex items-center justify-center text-[10px] font-bold shrink-0 border border-[#c5c6cc]/70">
                <User className="w-3 h-3 text-slate-500" />
              </div>
              <span className="text-xs text-[#505f76] font-medium">
                Add your perspective or experience
              </span>
            </div>
          </div>
        )}

        {/* Collapsible Identity Switch Panel (Only for signed-in users switching roles) */}
        {isSignedIn && showIdentitySwitch && (
          <div className="mb-4 p-3 bg-[#f2f4f6] rounded-lg border border-[#c5c6cc]/70 space-y-3">
            <div className="text-xs font-semibold text-[#010611]">
              Select Perspective Identity
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Option 1: Relay Verified Business */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("relay_business");
                  setShowIdentitySwitch(false);
                }}
                disabled={!currentUserBusiness}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedRole === "relay_business"
                    ? "bg-[#010611] text-white shadow-xs"
                    : "bg-white text-[#010611] border border-[#c5c6cc] hover:bg-[#e6e8ea]"
                } ${!currentUserBusiness ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{currentUserBusiness?.company_name || "Relay Verified Business"}</span>
              </button>

              {/* Option 2: Business Associate */}
              <button
                type="button"
                onClick={() => {
                  if (currentUserBusiness || communityUser?.type === "associate") {
                    setSelectedRole("business_member");
                    setShowIdentitySwitch(false);
                  } else {
                    toast.info("Business Associate perspective is available for verified corporate members.");
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedRole === "business_member"
                    ? "bg-[#010611] text-white shadow-xs"
                    : "bg-white text-[#010611] border border-[#c5c6cc] hover:bg-[#e6e8ea]"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Associate / Team</span>
              </button>

              {/* Option 3: Community Contributor */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("general_public");
                  setShowIdentitySwitch(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedRole === "general_public"
                    ? "bg-[#010611] text-white shadow-xs"
                    : "bg-white text-[#010611] border border-[#c5c6cc] hover:bg-[#e6e8ea]"
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#505f76]" />
                <span>Community Contributor</span>
              </button>
            </div>
          </div>
        )}

        {/* Textarea */}
        <textarea
          rows={3}
          maxLength={2000}
          value={content}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your perspective or experience..."
          className="w-full bg-[#f2f4f6]/50 border border-[#c5c6cc] rounded-lg p-3.5 text-[#010611] text-sm placeholder:text-[#505f76] focus:outline-none focus:border-[#010611] focus:bg-white transition-all resize-y"
        />

        {/* Composer Footer: Markdown supported on left, Cancel + Respond on right */}
        <div className="flex items-center justify-between gap-4 mt-2.5 pt-1">
          <span className="text-[11px] text-[#505f76] font-normal">
            Markdown supported
          </span>
          <div className="flex items-center gap-2">
            {(isFocused || content.trim().length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setIsFocused(false);
                  setShowIdentitySwitch(false);
                  clearPendingCommentSession(itemId);
                }}
                className="px-3.5 py-1.5 text-xs sm:text-[13px] font-medium text-[#505f76] hover:text-[#010611] rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={() => handlePostComment()}
              disabled={submitting || !content.trim()}
              className="px-4 sm:px-5 py-1.5 bg-[#010611] text-white font-medium rounded-lg text-xs sm:text-[13px] hover:bg-[#171f2c] transition-colors disabled:opacity-40 disabled:hover:bg-[#010611] cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Responding...</span>
                </>
              ) : (
                <span>Respond</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PERSPECTIVES FEED / THREADS LIST
          (seo_code_guide.md line 577)
          ───────────────────────────────────────────────────────────── */}
      <div>
        {loading ? (
          <div className="py-12 text-center text-sm text-[#505f76] flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#010611]" />
            <span>Loading perspectives...</span>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="py-14 text-center space-y-2 border-t border-[#c5c6cc]/60">
            <div className="text-base font-semibold text-[#010611]">
              {activeTab === "verified"
                ? "No verified perspectives yet"
                : activeTab === "team"
                ? "No team perspectives yet"
                : "No perspectives yet"}
            </div>
            <p className="text-xs sm:text-sm text-[#505f76] max-w-sm mx-auto">
              {activeTab === "verified"
                ? "Be the first verified business to contribute an executive perspective."
                : activeTab === "team"
                ? "Be the first associate or contributor to share an operational lesson."
                : "Be the first to share your perspective with verified operators."}
            </p>
          </div>
        ) : (
          <div className="border-t border-[#c5c6cc]/60 divide-y divide-[#c5c6cc]/60">
            {visibleComments.map((comment) => (
              <PerspectiveCommentItem
                key={comment.id}
                comment={comment}
                onUpvote={handleUpvote}
                isUpvoted={upvotedIds.has(comment.id)}
                upvotedIds={upvotedIds}
                onReplyClick={(id) => {
                  if (replyToId !== id) {
                    setReplyContent("");
                  }
                  setReplyToId(replyToId === id ? null : id);
                }}
                replyOpen={replyToId === comment.id}
                replyContent={replyContent}
                onReplyContentChange={setReplyContent}
                onSubmitReply={() => handlePostComment(comment.id)}
                submitting={submitting}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER / LOAD REMAINING CONTRIBUTIONS
          (seo_code_guide.md line 577)
          ───────────────────────────────────────────────────────────── */}
      {!loading && filteredComments.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#c5c6cc]/60 mt-2">
          <span className="text-xs sm:text-sm text-[#505f76]">
            Showing {visibleComments.length} of {filteredComments.length} perspectives
          </span>
          {visibleCount < filteredComments.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-4 py-1.5 bg-white border border-[#c5c6cc] rounded-lg text-xs sm:text-[13px] font-medium text-[#010611] hover:bg-[#f2f4f6] transition-colors cursor-pointer shadow-2xs"
            >
              Load Remaining Contributions
            </button>
          )}
        </div>
      )}

      {/* Sign Up / Authentication Modal (Prompt on Respond or Upvote) */}
      <InsightsPublicAuthPromptModal
        open={authModalOpen}
        onOpenChange={(val) => {
          setAuthModalOpen(val);
          if (!val) {
            setPendingParentId(null);
          }
        }}
        pendingComment={authModalPendingText || (pendingParentId ? replyContent : content)}
        parentId={pendingParentId}
        itemType={itemType}
        itemId={itemId}
        tabName={itemType === "knowledge" ? "knowledge" : "questions"}
        triggerSource={authModalTrigger}
      />

      {/* ─────────────────────────────────────────────────────────────
          FLOATING "SEE DISCUSSION" ACTION BUTTON (Mobile & Desktop)
          ───────────────────────────────────────────────────────────── */}
      {showFloatingButton && (
        <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            type="button"
            onClick={handleScrollToDiscussion}
            aria-label={`Jump to Discussion & Perspectives${totalResponses > 0 ? ` (${totalResponses} responses)` : ""}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#010611] text-white hover:bg-[#171f2c] active:scale-95 shadow-xl border border-slate-700/60 text-xs font-semibold uppercase tracking-wider font-mono cursor-pointer transition-all duration-200 group"
            title="Jump to Discussion & Perspectives"
          >
            <MessageSquare className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <span>See Discussion</span>
            {totalResponses > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-bold font-mono">
                {totalResponses}
              </span>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Perspective Comment Item (Swiss Minimalist Structural Cards)
// (seo_code_guide.md line 577)
// ─────────────────────────────────────────────────────────────────────────
interface PerspectiveCommentItemProps {
  comment: InsightComment;
  onUpvote: (id: string) => void;
  isUpvoted?: boolean;
  upvotedIds?: Set<string>;
  onReplyClick: (id: string) => void;
  replyOpen: boolean;
  replyContent: string;
  onReplyContentChange: (val: string) => void;
  onSubmitReply: () => void;
  submitting: boolean;
  isReply?: boolean;
  parentAuthorName?: string;
}

function PerspectiveCommentItem({
  comment,
  onUpvote,
  isUpvoted = false,
  upvotedIds,
  onReplyClick,
  replyOpen,
  replyContent,
  onReplyContentChange,
  onSubmitReply,
  submitting,
  isReply = false,
  parentAuthorName,
}: PerspectiveCommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBusiness = comment.author_type === "relay_business";
  const isMember = comment.author_type === "business_member";
  const isPublic = comment.author_type === "general_public";

  const hasReplies = comment.replies && comment.replies.length > 0;
  // Truncate if comment is longer than 280 characters or has 3+ line breaks
  const isLong = comment.content.length > 280 || (comment.content.match(/\n/g) || []).length >= 3;

  // Subtitle / role metadata
  const subTitle = isBusiness
    ? "Enterprise Member"
    : comment.author_title || (isMember ? "Associate Member" : "Contributor");

  return (
    <div id={`comment-${comment.id}`} className={`py-5 sm:py-6 ${isReply ? "py-2.5 first:pt-1" : ""}`}>
      {/* Top Row: Author avatar + info + more menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Avatar rendering: Square rounded for verified business, circle for individuals */}
          {isBusiness ? (
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#171f2c] border border-[#c5c6cc] flex items-center justify-center shrink-0">
              <CompanyLogo
                name={comment.author_name}
                src={comment.business?.logo_url}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
          ) : comment.author_avatar ? (
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#c5c6cc] bg-[#f2f4f6] shrink-0">
              <img
                src={comment.author_avatar}
                alt={comment.author_name}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-100 text-[#505f76] flex items-center justify-center border border-[#e2e8f0] shrink-0">
              <User className="w-4 h-4 text-[#75777c]" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#010611] text-[14px] sm:text-[15px]">
                {comment.author_name}
              </span>

              {/* Exact Prototype Badges from seo_code_guide.md */}
              {isBusiness && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">
                  Relay Verified
                </span>
              )}

              {isMember && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#eceef0] text-[#010611] border border-[#c5c6cc]">
                  {comment.business?.company_name || "Associate"}
                </span>
              )}

              {isPublic && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#f2f4f6] text-[#505f76] border border-[#c5c6cc]">
                  Contributor
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#505f76] mt-0.5">
              <span>{subTitle}</span>
              <span>•</span>
              <span>{formatTimeAgo(comment.created_at)}</span>
            </div>
          </div>
        </div>

        {/* More options button (Copy link to perspective) */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              const url = `${window.location.origin}${window.location.pathname}#comment-${comment.id}`;
              if (navigator?.clipboard?.writeText) {
                navigator.clipboard
                  .writeText(url)
                  .then(() => toast.success("Link to perspective copied to clipboard!"))
                  .catch(() => toast.info(url));
              } else {
                toast.info(url);
              }
            }
          }}
          className="text-[#505f76] hover:text-[#010611] transition-colors p-1 rounded hover:bg-[#f2f4f6] cursor-pointer"
          title="Copy link to perspective"
        >
          <MoreHorizontal className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Body text with See more / Show less toggle */}
      <div
        className={`mt-3.5 text-[#191c1e] text-[14px] leading-relaxed break-words whitespace-pre-line ${
          isLong && !isExpanded ? "line-clamp-4" : ""
        }`}
      >
        {isReply && parentAuthorName && (
          <span className="text-[#010611] font-semibold mr-1.5">
            @{parentAuthorName}
          </span>
        )}
        {comment.content}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#010611] hover:text-[#505f76] transition-colors cursor-pointer select-none"
        >
          <span>{isExpanded ? "Show less" : "See more"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#505f76]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#505f76]" />
          )}
        </button>
      )}

      {/* Actions Row: Upvote + Reply */}
      <div className="flex items-center gap-5 mt-3.5 text-[#505f76] text-[13px]">
        {/* Upvote button */}
        <button
          type="button"
          onClick={() => onUpvote(comment.id)}
          className={`inline-flex items-center gap-1.5 hover:text-[#010611] transition-colors cursor-pointer group ${
            isUpvoted ? "text-[#010611] font-semibold" : ""
          }`}
          title={isUpvoted ? "Already upvoted" : "Upvote"}
        >
          <ArrowUp
            className={`w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 ${
              isUpvoted ? "text-[#010611] stroke-[2.5]" : "text-[#505f76]"
            }`}
          />
          <span className={isUpvoted ? "text-[#010611] font-bold" : "text-[#010611] font-medium"}>
            {comment.upvotes || 0}
          </span>
        </button>

        {/* Reply button */}
        {!isReply && (
          <button
            type="button"
            onClick={() => onReplyClick(comment.id)}
            className="inline-flex items-center gap-1 hover:text-[#010611] transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        )}
      </div>

      {/* Inline Reply Composer */}
      {replyOpen && !isReply && (
        <div className="mt-3.5 bg-white rounded-lg border border-[#c5c6cc] p-3.5 space-y-2.5">
          <div className="text-xs text-[#505f76]">
            Replying to <span className="font-semibold text-[#010611]">@{comment.author_name}</span>
          </div>
          <textarea
            rows={2}
            maxLength={2000}
            value={replyContent}
            onChange={(e) => onReplyContentChange(e.target.value)}
            placeholder={`Reply to ${comment.author_name}...`}
            className="w-full bg-[#f2f4f6]/50 border border-[#c5c6cc] rounded-lg p-2.5 text-[#010611] text-xs sm:text-sm placeholder:text-[#505f76] focus:outline-none focus:border-[#010611] focus:bg-white transition-all resize-y"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#505f76]">Markdown supported</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onReplyClick(comment.id)}
                className="px-3 py-1 text-xs text-[#505f76] hover:text-[#010611] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmitReply}
                disabled={submitting || !replyContent.trim()}
                className="px-3.5 py-1 bg-[#010611] text-white font-medium rounded-lg text-xs hover:bg-[#171f2c] transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
              >
                {submitting ? "Responding..." : "Respond"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nested Replies (indented border-l-2 simulation from seo_code_guide.md) */}
      {!isReply && hasReplies && (
        <div className="mt-3.5 ml-3 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-[#c5c6cc]/80 space-y-2 pt-1">
          {comment.replies?.map((reply) => (
            <PerspectiveCommentItem
              key={reply.id}
              comment={reply}
              onUpvote={onUpvote}
              isUpvoted={upvotedIds?.has(reply.id)}
              upvotedIds={upvotedIds}
              onReplyClick={() => {}}
              replyOpen={false}
              replyContent=""
              onReplyContentChange={() => {}}
              onSubmitReply={() => {}}
              submitting={false}
              isReply={true}
              parentAuthorName={comment.author_name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
