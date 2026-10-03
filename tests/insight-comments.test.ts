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
  clearGlobalAuthPromptFlags,
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

    it("does not skip auth prompt for logged out public user when flags are cleared", () => {
      clearGlobalAuthPromptFlags();
      expect(hasGlobalAuthPromptBeenShown()).toBe(false);
      expect(shouldSkipAuthPrompt({ isSignedIn: false })).toBe(false);
      // Ensure shouldSkipAuthPrompt has NO side-effects (does not set dismissal flags)
      expect(hasGlobalAuthPromptBeenShown()).toBe(false);
      expect(localStorage.getItem("relay_insights_auth_prompt_dismissed")).toBeNull();
    });

    it("correctly identifies logged-out state in isUserLikelyAuthenticated without false positives", () => {
      document.cookie = "__client_uat=0";
      expect(isUserLikelyAuthenticated()).toBe(false);
      expect(shouldSkipAuthPrompt({ isSignedIn: false })).toBe(false);
    });

    it("persists dismissal across insights, articles, and questions pages via storage", () => {
      // Clean previous state
      clearGlobalAuthPromptFlags();

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

  describe("Admin Demo Comments and Threaded Replies Validation", () => {
    it("validates admin demo comment with custom verified business name and industry", () => {
      const input = {
        item_type: "question",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "relay_business",
        content: "Here is an executive operational perspective from our enterprise logistics platform.",
        custom_company_name: "Apex Global Freight",
        custom_industry: "Supply Chain & Logistics",
        custom_website: "https://apexfreight.com",
        custom_logo_url: "https://apexfreight.com/logo.png",
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.custom_company_name).toBe("Apex Global Freight");
      expect(parsed.data?.custom_industry).toBe("Supply Chain & Logistics");
    });

    it("validates admin demo comment with community member persona", () => {
      const input = {
        item_type: "knowledge",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "general_public",
        author_name: "Sarah Jenkins",
        author_title: "VP of Product Strategy",
        author_avatar: "https://example.com/avatar.jpg",
        content: "We conducted a deep-dive benchmark on this approach across 500 B2B suppliers.",
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.author_name).toBe("Sarah Jenkins");
      expect(parsed.data?.author_title).toBe("VP of Product Strategy");
      expect(parsed.data?.author_avatar).toBe("https://example.com/avatar.jpg");
    });

    it("validates admin demo reply under verified network business name", () => {
      const input = {
        item_type: "question",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        parent_id: "c1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "relay_business",
        business_id: "b1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_name: "Nexor Em Cloud",
        author_title: "Relay Verified",
        content: "We verified this architecture in high-throughput workloads with zero SLA degradation.",
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.parent_id).toBe("c1b2c3d4-e5f6-7890-abcd-ef1234567890");
      expect(parsed.data?.author_type).toBe("relay_business");
      expect(parsed.data?.author_name).toBe("Nexor Em Cloud");
    });

    it("validates admin demo reply under custom community member persona", () => {
      const input = {
        item_type: "knowledge",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        parent_id: "c1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "general_public",
        author_name: "Dr. Vikram Patel",
        author_title: "Chief Research Scientist",
        content: "The econometric modeling aligns with the 2026 enterprise survey findings.",
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.parent_id).toBe("c1b2c3d4-e5f6-7890-abcd-ef1234567890");
      expect(parsed.data?.author_name).toBe("Dr. Vikram Patel");
      expect(parsed.data?.author_title).toBe("Chief Research Scientist");
    });

    it("validates admin custom post time (created_at ISO timestamp)", () => {
      const customDate = "2026-09-15T10:30:00.000Z";
      const input = {
        item_type: "question",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "relay_business",
        author_name: "Acme Corp",
        content: "Perspective with historical backdated timestamp.",
        created_at: customDate,
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.created_at).toBe(customDate);
    });

    it("accepts null or omitted created_at", () => {
      const input = {
        item_type: "knowledge",
        item_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        author_type: "general_public",
        author_name: "Standard User",
        content: "Perspective with default current timestamp.",
        created_at: null,
      };

      const parsed = createInsightCommentSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      expect(parsed.data?.created_at).toBeNull();
    });
  });
});


