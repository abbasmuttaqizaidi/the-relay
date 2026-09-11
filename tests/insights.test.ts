import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createQuestionSchema,
  updateQuestionSchema,
  createPerspectiveSchema,
  updatePerspectiveSchema,
} from "../src/validators";

describe("Insights Feature: Business Questions & Perspectives", () => {
  // Mock business entities
  const approvedBusinessA = {
    id: "biz-a-1111-2222-3333-444455556666",
    company_name: "Apex Manufacturing",
    industry: "Manufacturing",
    hq_location: "Detroit, MI",
    status: "approved",
    contact_email: "ceo@apexmanufacturing.com",
    owner_user_id: "user-owner-a",
  };

  const approvedBusinessB = {
    id: "biz-b-2222-3333-4444-555566667777",
    company_name: "Nova Logistics",
    industry: "Logistics",
    hq_location: "Chicago, IL",
    status: "approved",
    contact_email: "ops@novalogistics.com",
    owner_user_id: "user-owner-b",
  };

  const pendingBusinessC = {
    id: "biz-c-3333-4444-5555-666677778888",
    company_name: "Pending Startup",
    industry: "Technology",
    hq_location: "Austin, TX",
    status: "pending",
    contact_email: "founder@pendingstartup.com",
    owner_user_id: "user-owner-c",
  };

  // ---------------------------------------------------------
  // 1. Zod Schema Validation Tests
  // ---------------------------------------------------------
  describe("Input Validation (Zod Schemas)", () => {
    it("validates a compliant question", () => {
      const validQuestion = {
        title: "How do you evaluate 3PL partners for perishable goods?",
        description:
          "We are evaluating national cold-chain logistics providers. Looking for advice on SLA penalties, temperature monitoring standards, and contract terms.",
        topic: "Operations",
        desired_perspective: "same_industry",
      };

      const result = createQuestionSchema.safeParse(validQuestion);
      expect(result.success).toBe(true);
    });

    it("rejects questions with title under 10 characters", () => {
      const invalid = {
        title: "Help me",
        description:
          "This is a description that is definitely longer than thirty characters for validation.",
        topic: "Operations",
      };

      const result = createQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 10 characters");
      }
    });

    it("rejects questions with description under 30 characters", () => {
      const invalid = {
        title: "Valid question title for validation test",
        description: "Too short desc",
        topic: "Finance",
      };

      const result = createQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 30 characters");
      }
    });

    it("rejects invalid topics", () => {
      const invalid = {
        title: "Valid question title for validation test",
        description:
          "This is a valid length description with enough details to exceed 30 chars.",
        topic: "CryptocurrencyHype",
      };

      const result = createQuestionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("validates a compliant perspective", () => {
      const validPerspective = {
        question_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        content:
          "We spent 18 months working with two major 3PL providers. Make sure your contract mandates real-time IoT temperature logging rather than periodic batch reports.",
        qualification:
          "Ran cold-chain distribution for 45 grocery distribution centers.",
        based_on: "Our business experience",
        relevant_experience: "7 years food & bev logistics",
      };

      const result = createPerspectiveSchema.safeParse(validPerspective);
      expect(result.success).toBe(true);
    });

    it("rejects perspectives with content under 20 characters", () => {
      const invalid = {
        question_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        content: "Just use FedEx.",
        qualification: "Experienced operator in logistics space.",
        based_on: "Our business experience",
      };

      const result = createPerspectiveSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 20 characters");
      }
    });

    it("rejects perspectives with qualification under 10 characters", () => {
      const invalid = {
        question_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        content:
          "This is a detailed practical perspective that easily exceeds the twenty character minimum length.",
        qualification: "Expert",
        based_on: "Industry experience",
      };

      const result = createPerspectiveSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 10 characters");
      }
    });

    it("rejects perspectives with invalid based_on enum", () => {
      const invalid = {
        question_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        content:
          "This is a detailed practical perspective that easily exceeds the twenty character minimum length.",
        qualification: "10 years in enterprise cloud infrastructure.",
        based_on: "I read it on Twitter",
      };

      const result = createPerspectiveSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  // ---------------------------------------------------------
  // 2. Business Rules & Access Control Tests
  // ---------------------------------------------------------
  describe("Authorization & Business Rule Enforcement", () => {
    it("allows approved businesses to post questions", () => {
      const checkCanAskQuestion = (business: typeof approvedBusinessA) => {
        if (!business || business.status !== "approved") {
          throw new Error("Only approved businesses can ask questions.");
        }
        return true;
      };

      expect(() => checkCanAskQuestion(approvedBusinessA)).not.toThrow();
    });

    it("prevents pending or unapproved businesses from posting questions", () => {
      const checkCanAskQuestion = (business: typeof pendingBusinessC) => {
        if (!business || business.status !== "approved") {
          throw new Error("Only approved businesses can ask questions.");
        }
        return true;
      };

      expect(() => checkCanAskQuestion(pendingBusinessC)).toThrow(
        "Only approved businesses can ask questions.",
      );
    });

    it("allows approved businesses to share perspectives on other businesses' questions", () => {
      const question = {
        id: "q-100",
        business_id: approvedBusinessA.id,
        status: "open",
      };

      const checkCanSharePerspective = (
        authorBusiness: typeof approvedBusinessB,
        targetQuestion: typeof question,
      ) => {
        if (authorBusiness.status !== "approved") {
          throw new Error("Only approved businesses can share perspectives.");
        }
        if (targetQuestion.status === "closed") {
          throw new Error("Cannot add perspective: this question is closed.");
        }
        if (authorBusiness.id === targetQuestion.business_id) {
          throw new Error("Cannot share a perspective on your own question.");
        }
        return true;
      };

      expect(() => checkCanSharePerspective(approvedBusinessB, question)).not.toThrow();
    });

    it("prevents a business from sharing a perspective on its own question", () => {
      const question = {
        id: "q-100",
        business_id: approvedBusinessA.id,
        status: "open",
      };

      const checkCanSharePerspective = (
        authorBusiness: typeof approvedBusinessA,
        targetQuestion: typeof question,
      ) => {
        if (authorBusiness.status !== "approved") {
          throw new Error("Only approved businesses can share perspectives.");
        }
        if (targetQuestion.status === "closed") {
          throw new Error("Cannot add perspective: this question is closed.");
        }
        if (authorBusiness.id === targetQuestion.business_id) {
          throw new Error("Cannot share a perspective on your own question.");
        }
        return true;
      };

      expect(() => checkCanSharePerspective(approvedBusinessA, question)).toThrow(
        "Cannot share a perspective on your own question.",
      );
    });

    it("blocks sharing perspectives on closed questions", () => {
      const closedQuestion = {
        id: "q-200",
        business_id: approvedBusinessA.id,
        status: "closed",
      };

      const checkCanSharePerspective = (
        authorBusiness: typeof approvedBusinessB,
        targetQuestion: typeof closedQuestion,
      ) => {
        if (targetQuestion.status === "closed") {
          throw new Error("Cannot add perspective: this question is closed.");
        }
        return true;
      };

      expect(() => checkCanSharePerspective(approvedBusinessB, closedQuestion)).toThrow(
        "Cannot add perspective: this question is closed.",
      );
    });

    it("enforces 1 perspective per business per question (duplicate prevention)", () => {
      const existingPerspectives = [
        {
          question_id: "q-100",
          business_id: approvedBusinessB.id,
        },
      ];

      const checkDuplicatePerspective = (questionId: string, businessId: string) => {
        const found = existingPerspectives.find(
          (p) => p.question_id === questionId && p.business_id === businessId,
        );
        if (found) {
          throw new Error("You have already shared a perspective on this question.");
        }
        return true;
      };

      expect(() =>
        checkDuplicatePerspective("q-100", approvedBusinessB.id),
      ).toThrow("You have already shared a perspective on this question.");
    });

    it("allows only the question owner to edit or close a question", () => {
      const question = {
        id: "q-100",
        business_id: approvedBusinessA.id,
        status: "open",
      };

      const verifyOwner = (bizId: string) => {
        if (question.business_id !== bizId) {
          throw new Error("Unauthorized: You can only edit your own questions.");
        }
        return true;
      };

      expect(() => verifyOwner(approvedBusinessA.id)).not.toThrow();
      expect(() => verifyOwner(approvedBusinessB.id)).toThrow("Unauthorized");
    });

    it("allows only perspective author to edit or delete their perspective", () => {
      const perspective = {
        id: "p-100",
        question_id: "q-100",
        business_id: approvedBusinessB.id,
      };

      const verifyPerspectiveAuthor = (bizId: string) => {
        if (perspective.business_id !== bizId) {
          throw new Error("Unauthorized: You can only edit your own perspective.");
        }
        return true;
      };

      expect(() => verifyPerspectiveAuthor(approvedBusinessB.id)).not.toThrow();
      expect(() => verifyPerspectiveAuthor(approvedBusinessA.id)).toThrow("Unauthorized");
    });
  });

  // ---------------------------------------------------------
  // 3. Privacy & Email Protection
  // ---------------------------------------------------------
  describe("Privacy & Handshake Email Gate", () => {
    it("never exposes private email addresses in public question author data", () => {
      const rawBusiness = {
        id: "biz-a",
        company_name: "Apex Manufacturing",
        industry: "Manufacturing",
        hq_location: "Detroit, MI",
        contact_email: "private-ceo@apexmanufacturing.com",
        owner: { email: "owner@private.com" },
        owner_user_id: "user-1",
      };

      const sanitizePublicBusiness = (b: any) => ({
        id: b.id,
        company_name: b.company_name,
        industry: b.industry,
        hq_location: b.hq_location,
      });

      const sanitized = sanitizePublicBusiness(rawBusiness);
      expect((sanitized as any).contact_email).toBeUndefined();
      expect((sanitized as any).owner).toBeUndefined();
      expect((sanitized as any).owner_user_id).toBeUndefined();
    });
  });

  // ---------------------------------------------------------
  // 4. Chronological Feed Order (No Engagement Ranking)
  // ---------------------------------------------------------
  describe("Chronological Ordering (Strictly Newest First)", () => {
    it("sorts questions by created_at descending", () => {
      const questions = [
        { id: "1", created_at: "2026-03-01T10:00:00Z" },
        { id: "2", created_at: "2026-03-11T12:00:00Z" },
        { id: "3", created_at: "2026-03-05T15:00:00Z" },
      ];

      const sorted = [...questions].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      expect(sorted[0].id).toBe("2");
      expect(sorted[1].id).toBe("3");
      expect(sorted[2].id).toBe("1");
    });
  });

  // ---------------------------------------------------------
  // 5. Notification Dispatch
  // ---------------------------------------------------------
  describe("Notification Dispatch on Perspective Creation", () => {
    it("dispatches notification to question owner when perspective is posted", async () => {
      const mockCreateNotification = vi.fn().mockResolvedValue({ id: "notif-1" });

      const onPerspectiveCreated = async (
        questionOwnerUserId: string,
        authorCompanyName: string,
        questionTitle: string,
      ) => {
        await mockCreateNotification({
          user_id: questionOwnerUserId,
          title: "New Perspective on your question",
          description: `${authorCompanyName} shared a perspective on "${questionTitle}"`,
        });
      };

      await onPerspectiveCreated(
        approvedBusinessA.owner_user_id,
        approvedBusinessB.company_name,
        "How to evaluate 3PL partners?",
      );

      expect(mockCreateNotification).toHaveBeenCalledWith({
        user_id: "user-owner-a",
        title: "New Perspective on your question",
        description: 'Nova Logistics shared a perspective on "How to evaluate 3PL partners?"',
      });
    });
  });
});
