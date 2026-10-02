export interface ContributorDraft {
  fullName?: string;
  workEmail?: string;
  currentRole?: string;
  expertiseDomain?: string;
}

export interface PendingCommentSession {
  content: string;
  parentId?: string | null;
  draft?: ContributorDraft;
  timestamp?: number;
}

const STORAGE_PREFIX = "relay_pending_comment_";
const DRAFT_PREFIX = "relay_comment_draft_";
const UPVOTE_KEY = "relay_upvoted_comments";
const MAX_STORED_UPVOTES = 200;

/**
 * Saves pending comment and contributor draft atomically under a single scoped key in both sessionStorage and localStorage.
 */
export function savePendingCommentSession(itemId: string, data: PendingCommentSession): void {
  if (typeof window === "undefined" || !itemId) return;
  const serialized = JSON.stringify(data);
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${itemId}`, serialized);
  } catch (_) {}
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${itemId}`, serialized);
  } catch (_) {}
}

/**
 * Retrieves the pending comment session with backwards compatibility for legacy strings.
 * Falls back from sessionStorage to localStorage to survive cross-origin OAuth redirects.
 */
export function getPendingCommentSession(itemId: string): PendingCommentSession | null {
  if (typeof window === "undefined" || !itemId) return null;
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${itemId}`) || localStorage.getItem(`${STORAGE_PREFIX}${itemId}`);
    if (!raw) return null;
    if (raw.startsWith("{")) {
      return JSON.parse(raw);
    }
    return { content: raw };
  } catch (_) {
    return null;
  }
}

/**
 * Clears all pending comment data and legacy keys for this item.
 */
export function clearPendingCommentSession(itemId: string): void {
  if (typeof window === "undefined" || !itemId) return;
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${itemId}`);
    localStorage.removeItem(`${STORAGE_PREFIX}${itemId}`);
    // Clean up any legacy separate keys if present
    sessionStorage.removeItem(`relay_pending_comment_parent_${itemId}`);
    sessionStorage.removeItem("relay_pending_item_type");
    sessionStorage.removeItem("relay_pending_contributor_draft");
    clearArticleCommentDraft(itemId);
  } catch (_) {}
}

/**
 * Saves a live comment draft strictly scoped to this specific article itemId.
 */
export function saveArticleCommentDraft(itemId: string, content: string): void {
  if (typeof window === "undefined" || !itemId) return;
  try {
    const trimmed = content ? content.trim() : "";
    if (!trimmed) {
      localStorage.removeItem(`${DRAFT_PREFIX}${itemId}`);
      sessionStorage.removeItem(`${DRAFT_PREFIX}${itemId}`);
    } else {
      localStorage.setItem(`${DRAFT_PREFIX}${itemId}`, content);
      sessionStorage.setItem(`${DRAFT_PREFIX}${itemId}`, content);
    }
  } catch (_) {}
}

/**
 * Retrieves the live comment draft strictly for this specific article itemId.
 * Guarantees zero bleed-through across different articles.
 */
export function getArticleCommentDraft(itemId: string): string {
  if (typeof window === "undefined" || !itemId) return "";
  try {
    const draft = localStorage.getItem(`${DRAFT_PREFIX}${itemId}`) || sessionStorage.getItem(`${DRAFT_PREFIX}${itemId}`);
    return draft || "";
  } catch (_) {
    return "";
  }
}

/**
 * Clears the article comment draft for this specific article itemId.
 */
export function clearArticleCommentDraft(itemId: string): void {
  if (typeof window === "undefined" || !itemId) return;
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${itemId}`);
    sessionStorage.removeItem(`${DRAFT_PREFIX}${itemId}`);
  } catch (_) {}
}

/**
 * Loads the set of upvoted comment IDs from localStorage.
 */
export function getStoredUpvotedComments(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(UPVOTE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch (_) {
    return new Set();
  }
}

/**
 * Persists an upvote with a bounded size to avoid unbounded storage growth.
 */
export function saveStoredUpvotedComment(commentId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredUpvotedComments();
    current.add(commentId);
    const arr = Array.from(current).slice(-MAX_STORED_UPVOTES);
    localStorage.setItem(UPVOTE_KEY, JSON.stringify(arr));
  } catch (_) {}
}

const GLOBAL_AUTH_PROMPT_KEY = "relay_insights_auth_prompt_dismissed";
const LEGACY_AUTH_PROMPT_KEY = "relay_insights_auth_prompt_shown";
const GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY = "relay_insights_auth_prompt_dismissed_at";
const AUTH_PROMPT_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours cross-tab suppression

// In-memory fallback if storage is restricted or disabled in private browsing
let inMemoryAuthPromptShown = false;

/**
 * Checks if the public user discussion authentication prompt has already been shown/dismissed.
 * Covers:
 * 1. In-memory session state (resilient to blocked/throwing storage)
 * 2. Tab sessionStorage (current tab)
 * 3. Cross-tab localStorage timestamp (24-hour suppression across multiple tabs/windows)
 */
export function hasGlobalAuthPromptBeenShown(): boolean {
  if (inMemoryAuthPromptShown) return true;
  if (typeof window === "undefined") return false;

  try {
    if (
      sessionStorage.getItem(GLOBAL_AUTH_PROMPT_KEY) === "true" ||
      sessionStorage.getItem(LEGACY_AUTH_PROMPT_KEY) === "true"
    ) {
      return true;
    }

    const storedAt = localStorage.getItem(GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY);
    if (storedAt) {
      const parsedTime = parseInt(storedAt, 10);
      if (!isNaN(parsedTime) && Date.now() - parsedTime < AUTH_PROMPT_COOLDOWN_MS) {
        return true;
      }
    }
  } catch (_) {}

  return false;
}

/**
 * Marks the public user discussion authentication prompt as shown/dismissed across all tabs,
 * in-memory session, and cross-tab storage.
 */
export function markGlobalAuthPromptShown(): void {
  inMemoryAuthPromptShown = true;
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(GLOBAL_AUTH_PROMPT_KEY, "true");
    sessionStorage.setItem(LEGACY_AUTH_PROMPT_KEY, "true");
  } catch (_) {}

  try {
    localStorage.setItem(GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY, Date.now().toString());
  } catch (_) {}
}

/**
 * Validates whether the public auth prompt should be skipped based on environmental edge cases:
 * - Already shown/dismissed (in-memory, sessionStorage, or cross-tab localStorage)
 * - Active Admin session (relay_admin_token cookie present)
 * - Deep anchor links (user explicitly navigated to #discussion or #discussion-system)
 * - Active user typing (user has currently focused a textarea or input, avoiding focus hijacking)
 * - OAuth redirect in progress
 */
export function shouldSkipAuthPrompt(options?: { isAdmin?: boolean }): boolean {
  if (typeof window === "undefined") return true;

  // 1. Guard against repeat presentation
  if (hasGlobalAuthPromptBeenShown()) return true;

  // 2. Guard against Admin users
  if (options?.isAdmin) {
    markGlobalAuthPromptShown();
    return true;
  }
  try {
    if (document.cookie && document.cookie.includes("relay_admin_token=")) {
      markGlobalAuthPromptShown();
      return true;
    }
  } catch (_) {}

  // 3. Guard against OAuth redirect in flight
  const s = window.location.search || "";
  const h = window.location.hash || "";
  if (
    s.includes("__clerk") ||
    s.includes("status=") ||
    s.includes("created_session_id") ||
    h.includes("__clerk") ||
    document.documentElement.classList.contains("clerk-oauth-resolving")
  ) {
    return true;
  }

  // 4. Guard against deep anchor navigation (#discussion, #discussion-system, or #comment-...)
  if (h.toLowerCase().includes("discussion") || h.toLowerCase().includes("comment")) {
    markGlobalAuthPromptShown();
    return true;
  }

  // 5. Guard against active user typing / focus hijacking
  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === "INPUT" ||
      activeEl.tagName === "TEXTAREA" ||
      activeEl.getAttribute("contenteditable") === "true")
  ) {
    return true;
  }

  return false;
}


