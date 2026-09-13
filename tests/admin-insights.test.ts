import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  questionTopicSchema,
  desiredPerspectiveSchema,
  knowledgeInsightBasedOnSchema,
  knowledgeInsightStatusSchema,
} from "../src/validators";

// Admin Question Creation Schema
const createAdminQuestionSchema = z
  .object({
    business_id: z.string().uuid("Invalid business ID").optional().nullable(),
    custom_company_name: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters")
      .optional()
      .nullable(),
    custom_industry: z.string().trim().max(100).optional().nullable(),
    custom_website: z.string().trim().max(200).optional().nullable(),
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(200, "Title cannot exceed 200 characters"),
    description: z
      .string()
      .trim()
      .min(30, "Description must be at least 30 characters")
      .max(3000, "Description cannot exceed 3000 characters"),
    topic: questionTopicSchema,
    desired_perspective: desiredPerspectiveSchema.optional().nullable(),
    status: z.enum(["open", "closed"]).optional().default("open"),
  })
  .refine((data) => Boolean(data.business_id || data.custom_company_name?.trim()), {
    message: "Either select an existing business or enter a custom company name.",
    path: ["business_id"],
  });

// Admin Knowledge Insight Creation Schema
const createAdminKnowledgeInsightSchema = z
  .object({
    business_id: z.string().uuid("Invalid business ID").optional().nullable(),
    custom_company_name: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters")
      .optional()
      .nullable(),
    custom_industry: z.string().trim().max(100).optional().nullable(),
    custom_website: z.string().trim().max(200).optional().nullable(),
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(200, "Title cannot exceed 200 characters"),
    content: z
      .string()
      .trim()
      .min(50, "Content must be at least 50 characters")
      .max(5000, "Content cannot exceed 5000 characters"),
    topic: questionTopicSchema,
    based_on: knowledgeInsightBasedOnSchema.optional().nullable(),
    status: knowledgeInsightStatusSchema.optional().default("published"),
  })
  .refine((data) => Boolean(data.business_id || data.custom_company_name?.trim()), {
    message: "Either select an existing business or enter a custom company name.",
    path: ["business_id"],
  });

// Admin Delete Schema
const deleteAdminInsightItemSchema = z.object({
  type: z.enum(["question", "knowledge"]),
  id: z.string().uuid("Invalid ID"),
});

describe("Admin Insights Feature: Manual Creation & Management", () => {
  const sampleBusinessId = "1eb1349c-2ab7-4458-afd6-14604cc1c2bd";

  // ---------------------------------------------------------
  // 1. Admin Authentication & Cryptographic Session Guard
  // ---------------------------------------------------------
  describe("Admin Authentication Guard", () => {
    it("validates correct admin credentials and rejects wrong ones", async () => {
      const { validateAdminCredentials } = await import(
        "../src/lib/admin-auth.server"
      );
      expect(
        validateAdminCredentials("nexorembws@gmail.com", "PP@password110"),
      ).toBe(true);
      expect(
        validateAdminCredentials("nexorembws@gmail.com", "wrong_password"),
      ).toBe(false);
      expect(
        validateAdminCredentials("attacker@gmail.com", "PP@password110"),
      ).toBe(false);
    });

    it("authenticates caller with valid HMAC-SHA256 signed session token in cookie", async () => {
      const { createAdminSessionToken, verifyAdminSession } = await import(
        "../src/lib/admin-auth.server"
      );
      const token = createAdminSessionToken("nexorembws@gmail.com");
      const cookieHeader = `relay_admin_token=${token}; path=/; HttpOnly; SameSite=Strict`;

      expect(verifyAdminSession(cookieHeader)).toBe(true);
      expect(verifyAdminSession(token)).toBe(true);
    });

    it("rejects caller without cookie or with empty header", async () => {
      const { verifyAdminSession } = await import(
        "../src/lib/admin-auth.server"
      );
      expect(verifyAdminSession("")).toBe(false);
      expect(verifyAdminSession(null)).toBe(false);
      expect(verifyAdminSession(undefined)).toBe(false);
    });

    it("rejects tampered or forged session tokens", async () => {
      const { createAdminSessionToken, verifyAdminSession } = await import(
        "../src/lib/admin-auth.server"
      );
      const validToken = createAdminSessionToken("nexorembws@gmail.com");
      const tampered = validToken.slice(0, -4) + "XXXX";

      expect(verifyAdminSession(`relay_admin_token=${tampered}`)).toBe(false);
      expect(verifyAdminSession(tampered)).toBe(false);
    });

    it("rejects raw plaintext password (raw password is no longer accepted as token)", async () => {
      const { verifyAdminSession } = await import(
        "../src/lib/admin-auth.server"
      );
      const rawPasswordCookie = "relay_admin_token=PP@password110; path=/";
      expect(verifyAdminSession(rawPasswordCookie)).toBe(false);
      expect(verifyAdminSession("PP@password110")).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 2. Admin Question Creation Validation
  // ---------------------------------------------------------
  describe("Admin Question Creation Validation", () => {
    it("validates a compliant admin question payload", () => {
      const valid = {
        business_id: sampleBusinessId,
        title: "How do early-stage B2B startups structure founder-led sales handoffs?",
        description:
          "Looking for insights on when founders should step back from day-to-day discovery calls and transition deals to the first account executive.",
        topic: "Sales",
        desired_perspective: "any_business",
        status: "open",
      };

      const result = createAdminQuestionSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("accepts Building a System / Business topic", () => {
      const valid = {
        business_id: sampleBusinessId,
        title: "Standard operating procedures for remote product teams",
        description:
          "We are standardizing our engineering and product delivery cycles to reduce context-switching and sprint bloat.",
        topic: "Building a System / Business",
      };

      const result = createAdminQuestionSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects invalid business_id (must be UUID)", () => {
      const invalid = {
        business_id: "not-a-valid-uuid",
        title: "Valid question title here for testing",
        description:
          "Valid description that is comfortably longer than 30 characters for testing.",
        topic: "Operations",
      };

      const result = createAdminQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("rejects question title shorter than 10 characters", () => {
      const invalid = {
        business_id: sampleBusinessId,
        title: "Too short",
        description:
          "Valid description that is comfortably longer than 30 characters for testing.",
        topic: "Operations",
      };

      const result = createAdminQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("rejects question description shorter than 30 characters", () => {
      const invalid = {
        business_id: sampleBusinessId,
        title: "Valid question title with enough characters",
        description: "Short desc",
        topic: "Operations",
      };

      const result = createAdminQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("accepts custom_company_name when business_id is omitted", () => {
      const valid = {
        custom_company_name: "Stripe",
        custom_industry: "Fintech",
        custom_website: "https://stripe.com",
        title: "How to handle multi-currency settlement latency?",
        description:
          "We are seeing 2-day delays in settling non-domestic card transactions and want to benchmark mitigation strategies.",
        topic: "Finance",
      };

      const result = createAdminQuestionSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects question when neither business_id nor custom_company_name is provided", () => {
      const invalid = {
        title: "Valid question title with enough characters",
        description:
          "Valid description that is comfortably longer than 30 characters for testing.",
        topic: "Operations",
      };

      const result = createAdminQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("rejects custom_company_name shorter than 2 characters", () => {
      const invalid = {
        custom_company_name: "A",
        title: "Valid question title with enough characters",
        description:
          "Valid description that is comfortably longer than 30 characters for testing.",
        topic: "Operations",
      };

      const result = createAdminQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 3. Admin Knowledge Insight Creation Validation
  // ---------------------------------------------------------
  describe("Admin Knowledge Insight Creation Validation", () => {
    it("validates a compliant admin knowledge insight payload", () => {
      const valid = {
        business_id: sampleBusinessId,
        title: "Why paid pilot contracts convert 4x better than free trials in B2B",
        content:
          "In our experience selling to mid-market companies, free pilots attract uncommitted stakeholders. Charging even a nominal 50% pilot fee created executive accountability and yielded an 85% conversion to annual contracts.",
        topic: "Sales",
        based_on: "business_experience",
        status: "published",
      };

      const result = createAdminKnowledgeInsightSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects content shorter than 50 characters", () => {
      const invalid = {
        business_id: sampleBusinessId,
        title: "Valid knowledge insight title for test",
        content: "Too short insight content under 50 characters.",
        topic: "Finance",
        based_on: "lesson_learned",
      };

      const result = createAdminKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("accepts all valid based_on transparency tags", () => {
      const validTags = [
        "business_experience",
        "project",
        "experiment",
        "industry_experience",
        "lesson_learned",
        "general_perspective",
      ];

      for (const tag of validTags) {
        const result = createAdminKnowledgeInsightSchema.safeParse({
          business_id: sampleBusinessId,
          title: "Valid title for testing transparency tag acceptance",
          content:
            "This is content that is comfortably more than fifty characters long to pass the minimum length requirement.",
          topic: "Technology",
          based_on: tag,
        });
        expect(result.success).toBe(true);
      }
    });

    it("defaults status to published when omitted", () => {
      const result = createAdminKnowledgeInsightSchema.parse({
        business_id: sampleBusinessId,
        title: "Valid title for testing default status",
        content:
          "This is content that is comfortably more than fifty characters long to pass the minimum length requirement.",
        topic: "Product",
      });
      expect(result.status).toBe("published");
    });

    it("accepts custom_company_name when business_id is omitted", () => {
      const valid = {
        custom_company_name: "Postman",
        custom_industry: "Developer Tools",
        custom_website: "https://postman.com",
        title: "Why documentation-first API design saves 30% dev cycles",
        content:
          "By publishing interactive API mock specs before writing backend endpoints, partner integrators identified schema mismatches within hours rather than during staging integration.",
        topic: "Technology",
        based_on: "lesson_learned",
      };

      const result = createAdminKnowledgeInsightSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects knowledge insight when neither business_id nor custom_company_name is provided", () => {
      const invalid = {
        title: "Valid title for testing missing business author",
        content:
          "This is content that is comfortably more than fifty characters long to pass the minimum length requirement.",
        topic: "Product",
      };

      const result = createAdminKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("rejects custom_company_name shorter than 2 characters in knowledge insight", () => {
      const invalid = {
        custom_company_name: "X",
        title: "Valid title for testing short company name",
        content:
          "This is content that is comfortably more than fifty characters long to pass the minimum length requirement.",
        topic: "Product",
      };

      const result = createAdminKnowledgeInsightSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 4. Admin Delete Item Validation
  // ---------------------------------------------------------
  describe("Admin Delete Item Validation", () => {
    it("validates question deletion request", () => {
      const result = deleteAdminInsightItemSchema.safeParse({
        type: "question",
        id: "1eb1349c-2ab7-4458-afd6-14604cc1c2bd",
      });
      expect(result.success).toBe(true);
    });

    it("validates knowledge deletion request", () => {
      const result = deleteAdminInsightItemSchema.safeParse({
        type: "knowledge",
        id: "7e165361-5098-4f3a-8972-9291bb39416b",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid type or invalid UUID", () => {
      const invalidType = deleteAdminInsightItemSchema.safeParse({
        type: "unknown_type",
        id: sampleBusinessId,
      });
      expect(invalidType.success).toBe(false);

      const invalidUuid = deleteAdminInsightItemSchema.safeParse({
        type: "question",
        id: "not-a-uuid",
      });
      expect(invalidUuid.success).toBe(false);
    });
  });
});
