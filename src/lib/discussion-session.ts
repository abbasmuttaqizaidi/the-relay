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

/**
 * Detects if the user has an active authenticated session (via cookies or Clerk window object).
 * Accurately ignores logged-out states (e.g. __client_uat=0, empty __session, or anonymous device IDs).
 */
export function isUserLikelyAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // 1. Direct Clerk window instance check
    const clerk = (window as any)?.Clerk;
    if (clerk && clerk.loaded) {
      return Boolean(clerk.user || clerk.session);
    }

    // 2. Active Admin session cookie check
    const adminMatch = document.cookie.match(/relay_admin_token=([^;]+)/);
    if (adminMatch && adminMatch[1].trim().length > 5) {
      return true;
    }

    // 3. Clerk session token cookie check
    // Note: __client_uat=0 explicitly indicates a logged-out state in Clerk
    const uatMatch = document.cookie.match(/__client_uat=([^;]+)/);
    if (uatMatch && uatMatch[1] === "0") {
      return false; // Explicitly logged out!
    }

    const sessionMatch = document.cookie.match(/__session=([^;]+)/);
    if (sessionMatch && sessionMatch[1].trim().length > 20) {
      if (uatMatch) {
        const uatVal = parseInt(uatMatch[1], 10);
        if (!isNaN(uatVal) && uatVal > 0) {
          return true;
        }
      } else {
        return true;
      }
    }
  } catch (_) {}
  return false;
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
 * 1. Tab sessionStorage (current tab)
 * 2. Cross-page and cross-tab localStorage (persisted across insights, questions, and articles pages)
 * 3. In-memory session state fallback (resilient to blocked/throwing storage)
 */
export function hasGlobalAuthPromptBeenShown(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const isDismissedInSession =
      sessionStorage.getItem(GLOBAL_AUTH_PROMPT_KEY) === "true" ||
      sessionStorage.getItem(LEGACY_AUTH_PROMPT_KEY) === "true";

    const isDismissedInLocal =
      localStorage.getItem(GLOBAL_AUTH_PROMPT_KEY) === "true" ||
      localStorage.getItem(LEGACY_AUTH_PROMPT_KEY) === "true";

    if (isDismissedInSession) {
      return true;
    }

    if (isDismissedInLocal) {
      // If the dismissal timestamp exists and is older than 24h, expire it
      const storedAt = localStorage.getItem(GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY);
      if (storedAt) {
        const parsedTime = parseInt(storedAt, 10);
        if (!isNaN(parsedTime) && Date.now() - parsedTime > AUTH_PROMPT_COOLDOWN_MS) {
          clearGlobalAuthPromptFlags();
          return false;
        }
      }
      return true;
    }

    // When storage is accessible and neither key is set to "true", it is NOT shown
    return false;
  } catch (_) {
    return inMemoryAuthPromptShown;
  }
}

/**
 * Marks the public user discussion authentication prompt as shown/dismissed across all tabs,
 * in-memory session, and localStorage so it will not reappear on insights, questions, or articles.
 */
export function markGlobalAuthPromptShown(): void {
  inMemoryAuthPromptShown = true;
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(GLOBAL_AUTH_PROMPT_KEY, "true");
    sessionStorage.setItem(LEGACY_AUTH_PROMPT_KEY, "true");
  } catch (_) {}

  try {
    localStorage.setItem(GLOBAL_AUTH_PROMPT_KEY, "true");
    localStorage.setItem(LEGACY_AUTH_PROMPT_KEY, "true");
    localStorage.setItem(GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY, Date.now().toString());
  } catch (_) {}
}

/**
 * Resets the public auth prompt flags from in-memory and browser storage.
 */
export function clearGlobalAuthPromptFlags(): void {
  inMemoryAuthPromptShown = false;
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(GLOBAL_AUTH_PROMPT_KEY);
    sessionStorage.removeItem(LEGACY_AUTH_PROMPT_KEY);
  } catch (_) {}

  try {
    localStorage.removeItem(GLOBAL_AUTH_PROMPT_KEY);
    localStorage.removeItem(LEGACY_AUTH_PROMPT_KEY);
    localStorage.removeItem(GLOBAL_AUTH_PROMPT_TIMESTAMP_KEY);
  } catch (_) {}
}

/**
 * Pure predicate validating whether the public auth prompt should be skipped based on environmental conditions:
 * - Already authenticated or logged in
 * - Already shown/dismissed (sessionStorage or cross-page localStorage)
 * - Deep anchor links (user explicitly navigated to #discussion or #discussion-system)
 * - Active user typing (user has currently focused a textarea or input, avoiding focus hijacking)
 * - OAuth redirect in progress
 *
 * NOTE: This function is pure and has NO side effects (does NOT call markGlobalAuthPromptShown).
 */
export function shouldSkipAuthPrompt(options?: { isAdmin?: boolean; isSignedIn?: boolean }): boolean {
  if (typeof window === "undefined") return true;

  // 0. Guard against authenticated users
  if (options?.isSignedIn !== undefined) {
    if (options.isSignedIn) return true;
  } else if (isUserLikelyAuthenticated()) {
    return true;
  }

  // 1. Guard against repeat presentation across all pages
  if (hasGlobalAuthPromptBeenShown()) return true;

  // 2. Guard against Admin users if explicitly requested
  if (options?.isAdmin) {
    return true;
  }

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


