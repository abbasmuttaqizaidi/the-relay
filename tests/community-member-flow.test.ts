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

  it("ensures serverCache supports both delete() and del() without throwing errors", async () => {
    const { serverCache } = await import("../src/lib/server-cache");
    serverCache.set("test:user:1", { id: "1", name: "Sarah" }, 60);
    expect(serverCache.get("test:user:1")).toEqual({ id: "1", name: "Sarah" });

    // Verify del() alias works properly without throwing TypeError
    expect(() => serverCache.del("test:user:1")).not.toThrow();
    expect(serverCache.get("test:user:1")).toBeNull();

    // Verify delete() also works properly
    serverCache.set("test:user:2", { id: "2", name: "Abbas" }, 60);
    expect(() => serverCache.delete("test:user:2")).not.toThrow();
    expect(serverCache.get("test:user:2")).toBeNull();
  });
});
