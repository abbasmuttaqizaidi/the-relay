import { describe, it, expect } from "vitest";
import {
  createInsightCommentSchema,
  commentAuthorTypeSchema,
  deleteInsightCommentSchema,
} from "../src/validators";
import {
  saveArticleCommentDraft,
  getArticleCommentDraft,
  clearArticleCommentDraft,
  savePendingCommentSession,
  getPendingCommentSession,
  clearPendingCommentSession,
  markGlobalAuthPromptShown,
  hasGlobalAuthPromptBeenShown,
  shouldSkipAuthPrompt,
  isUserLikelyAuthenticated,
} from "../src/lib/discussion-session";

describe("Insight Comments Validation (3 Identity Tiers)", () => {
  it("validates general public comment", () => {
    const input = {
      item_type: "knowledge",
      item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      author_type: "general_public",
      content: "This is a thoughtful public perspective on supply chain optimization.",
      author_name: "Arjun Sharma",
    };

    const parsed = createInsightCommentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
  });

  it("validates verified relay business comment", () => {
    const input = {
      item_type: "question",
      item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      author_type: "relay_business",
      content: "From our enterprise logistics operational framework, we recommend 30-day SLA reviews.",
      business_id: "b1b2c3d4-e5f6-7890-abcd-ef1234567890",
    };

    const parsed = createInsightCommentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
  });

  it("validates business associated member comment (e.g. HR Manager at APLEX LLP)", () => {
    const input = {
      item_type: "knowledge",
      item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      author_type: "business_member",
      content: "As an HR leader, internal hiring velocity improved by 40% using these playbooks.",
      author_name: "Sarah Jenkins",
      author_title: "HR Director",
      business_id: "b1b2c3d4-e5f6-7890-abcd-ef1234567890",
    };

    const parsed = createInsightCommentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
  });

  it("rejects comments with less than 3 characters", () => {
    const input = {
      item_type: "question",
      item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      author_type: "general_public",
      content: "Hi",
    };

    const parsed = createInsightCommentSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("validates nested reply comment with parent_id", () => {
    const input = {
      item_type: "knowledge",
      item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      parent_id: "c1b2c3d4-e5f6-7890-abcd-ef1234567890",
      author_type: "general_public",
      content: "I completely concur with this operational analysis.",
      author_name: "Sarah Koenig",
    };

    const parsed = createInsightCommentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    expect(parsed.data?.parent_id).toBe("c1b2c3d4-e5f6-7890-abcd-ef1234567890");
  });
});

describe("Scoped Article Comment Draft & Multi-Article Isolation", () => {
  const articleA = "art-aaa-111";
  const articleB = "art-bbb-222";

  it("persists and retrieves a drafted comment strictly for the specified article", () => {
    saveArticleCommentDraft(articleA, "This is an important perspective on Article A");
    expect(getArticleCommentDraft(articleA)).toBe("This is an important perspective on Article A");

    // Strict multi-article isolation: Article B must NOT have Article A's draft
    expect(getArticleCommentDraft(articleB)).toBe("");
  });

  it("ensures two distinct articles maintain completely isolated drafts simultaneously", () => {
    saveArticleCommentDraft(articleA, "Draft for Article A");
    saveArticleCommentDraft(articleB, "Draft for Article B");

    expect(getArticleCommentDraft(articleA)).toBe("Draft for Article A");
    expect(getArticleCommentDraft(articleB)).toBe("Draft for Article B");

    // Clearing Article A must leave Article B completely intact
    clearArticleCommentDraft(articleA);
    expect(getArticleCommentDraft(articleA)).toBe("");
    expect(getArticleCommentDraft(articleB)).toBe("Draft for Article B");

    // Clean up Article B
    clearArticleCommentDraft(articleB);
    expect(getArticleCommentDraft(articleB)).toBe("");
  });

  it("supports atomic pending comment session persistence across storage mechanisms", () => {
    savePendingCommentSession(articleA, {
      content: "Pending perspective submitted before login",
      parentId: null,
      draft: {
        fullName: "Sarah Koenig",
        currentRole: "Founder & Operator",
      },
    });

    const session = getPendingCommentSession(articleA);
    expect(session).not.toBeNull();
    expect(session?.content).toBe("Pending perspective submitted before login");
    expect(session?.draft?.fullName).toBe("Sarah Koenig");

    // Article B session must be null
    expect(getPendingCommentSession(articleB)).toBeNull();

    // Clean up
    clearPendingCommentSession(articleA);
    expect(getPendingCommentSession(articleA)).toBeNull();
    expect(getArticleCommentDraft(articleA)).toBe("");
  });

  describe("Public Auth Prompt Dismissal and Login Suppression", () => {
    it("skips auth prompt when user is signed in", () => {
      expect(shouldSkipAuthPrompt({ isSignedIn: true })).toBe(true);
    });

    it("persists dismissal across insights, articles, and questions pages via storage", () => {
      // Clean previous state
      localStorage.clear();
      sessionStorage.clear();

      markGlobalAuthPromptShown();
      expect(hasGlobalAuthPromptBeenShown()).toBe(true);
      expect(shouldSkipAuthPrompt()).toBe(true);

      // Verify localStorage has the dismissal flag set
      expect(localStorage.getItem("relay_insights_auth_prompt_dismissed")).toBe("true");
    });
  });

  describe("Delete Insight Comment Schema", () => {
    it("validates valid comment_id uuid", () => {
      const parsed = deleteInsightCommentSchema.safeParse({
        comment_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      });
      expect(parsed.success).toBe(true);
    });

    it("rejects invalid comment_id", () => {
      const parsed = deleteInsightCommentSchema.safeParse({
        comment_id: "not-a-valid-uuid",
      });
      expect(parsed.success).toBe(false);
    });
  });
});

