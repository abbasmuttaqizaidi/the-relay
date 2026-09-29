import { describe, it, expect } from "vitest";
import { updateCommunityProfileSchema, setUserTypeSchema } from "../src/validators";

describe("Community Member Contributor Flow & Validation", () => {
  it("validates valid community member profile submission", () => {
    const validPayload = {
      name: "Sarah Koenig",
      handle: "@sarah_ops",
      title: "Senior Product Designer",
      bio: "10+ years scaling design systems and technical procurement at high-growth European tech firms.",
      avatar_type: "monogram",
      expertise_domain: "engineering",
      linkedin_url: "https://linkedin.com/in/sarah-koenig-ops",
    };

    const res = updateCommunityProfileSchema.safeParse(validPayload);
    expect(res.success).toBe(true);
  });

  it("rejects invalid or too short community profile inputs", () => {
    const invalidPayload = {
      name: "S",
      handle: "",
      title: "X",
    };

    const res = updateCommunityProfileSchema.safeParse(invalidPayload);
    expect(res.success).toBe(false);
  });

  it("strictly accepts only allowed user types (business | community_member | associate)", () => {
    expect(setUserTypeSchema.safeParse({ type: "business" }).success).toBe(true);
    expect(setUserTypeSchema.safeParse({ type: "community_member" }).success).toBe(true);
    expect(setUserTypeSchema.safeParse({ type: "associate" }).success).toBe(true);
    expect(setUserTypeSchema.safeParse({ type: "admin" }).success).toBe(false);
    expect(setUserTypeSchema.safeParse({ type: "guest" }).success).toBe(false);
  });
});
