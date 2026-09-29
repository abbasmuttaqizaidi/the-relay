import { describe, it, expect } from "vitest";
import { createInsightCommentSchema, commentAuthorTypeSchema } from "../src/validators";

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
