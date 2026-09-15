import { z } from "zod";

// Shared validators
export const uuidSchema = z.string().uuid("Invalid UUID format");

export const businessStatusSchema = z.enum(["pending", "approved", "rejected", "restricted"]);
export const businessMemberRoleSchema = z.enum(["owner", "admin", "member"]);
export const opportunityCategorySchema = z.enum(["partnership", "referral", "distribution", "vendor", "hiring", "strategic_advice", "investment"]);
export const opportunityStatusSchema = z.enum(["active", "closed"]);
export const interestStatusSchema = z.enum(["pending", "accepted", "declined", "withdrawn", "unresponsive"]);
export const promotionStatusSchema = z.enum(["none", "pending_promotion", "promoted"]);

// ---------------------------------------------------------
// INPUT VALIDATORS
// ---------------------------------------------------------

export const createBusinessSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Must be a valid URL starting with http:// or https://"),
  industry: z.string().min(2, "Industry is required"),
  description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  linkedin_url: z.string().url("Must be a valid LinkedIn URL").optional().or(z.literal("")),
  logo_url: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
});

export const updateBusinessSchema = z.object({
  business_id: uuidSchema,
  company_name: z.string().min(2).optional(),
  website: z.string().url().optional(),
  industry: z.string().min(2).optional(),
  description: z.string().max(1000).optional(),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  logo_url: z.string().url().optional().or(z.literal("")),
  hq_location: z.string().optional().nullable().or(z.literal("")),
  founded_year: z.number().int().optional().nullable(),
  company_size: z.string().optional().nullable().or(z.literal("")),
  company_type: z.string().optional().nullable().or(z.literal("")),
  funding_stage: z.string().optional().nullable().or(z.literal("")),
  twitter_url: z.string().optional().nullable().or(z.literal("")),
  contact_email: z.string().optional().nullable().or(z.literal("")),
});

export const createOpportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: opportunityCategorySchema,
  industry: z.string().min(1, "Industry is required"),
  description: z.string()
    .min(50, "Description must be at least 50 characters")
    .max(3000, "Description cannot exceed 3000 characters"),
  location: z.string().optional().nullable(),
  offer_text: z.string().optional().nullable(),
  expires_at: z.string().optional().nullable(),
  hide_company_name: z.boolean().optional().default(false),
  promote: z.boolean().optional().default(false),
});

export const updateOpportunitySchema = z.object({
  opportunity_id: uuidSchema,
  title: z.string().min(1).optional(),
  category: opportunityCategorySchema.optional(),
  industry: z.string().min(1).optional(),
  description: z.string().min(50).max(3000).optional(),
  location: z.string().optional().nullable(),
  offer_text: z.string().optional().nullable(),
  expires_at: z.string().optional().nullable(),
  status: opportunityStatusSchema.optional(),
  hide_company_name: z.boolean().optional().nullable(),
  promote: z.boolean().optional(),
});

export const expressInterestSchema = z.object({
  opportunity_id: uuidSchema,
  message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
});

export const approveBusinessSchema = z.object({
  business_id: uuidSchema,
});

export const rejectBusinessSchema = z.object({
  business_id: uuidSchema,
});

export const saveOpportunitySchema = z.object({
  opportunity_id: uuidSchema,
});

export const removeSavedOpportunitySchema = z.object({
  opportunity_id: uuidSchema,
});

export const updatePromotionStatusSchema = z.object({
  opportunity_id: uuidSchema,
  promotion_status: promotionStatusSchema,
});

// ---------------------------------------------------------
// INSIGHTS VALIDATORS (Questions & Perspectives)
// ---------------------------------------------------------

export const questionTopicSchema = z.enum([
  "Sales",
  "Marketing",
  "Operations",
  "Hiring",
  "Finance",
  "Product",
  "Partnerships",
  "Distribution",
  "Technology",
  "Building a System / Business",
  "Other",
]);

export const desiredPerspectiveSchema = z.enum([
  "any_business",
  "same_industry",
  "similar_customers",
  "relevant_experience",
]);

export const questionStatusSchema = z.enum(["open", "closed"]);

export const basedOnSchema = z.enum([
  "Our business experience",
  "A project we worked on",
  "An experiment or test",
  "Industry experience",
  "Personal experience",
  "General perspective",
]);

export const createQuestionSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title cannot exceed 200 characters"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters")
    .max(10000, "Description cannot exceed 10000 characters"),
  topic: questionTopicSchema,
  desired_perspective: desiredPerspectiveSchema.optional().nullable(),
  context_content_json: z.string().optional().nullable(),
});

export const updateQuestionSchema = z.object({
  question_id: uuidSchema,
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title cannot exceed 200 characters")
    .optional(),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters")
    .max(10000, "Description cannot exceed 10000 characters")
    .optional(),
  topic: questionTopicSchema.optional(),
  desired_perspective: desiredPerspectiveSchema.optional().nullable(),
  context_content_json: z.string().optional().nullable(),
});

export const closeQuestionSchema = z.object({
  question_id: uuidSchema,
});

export const createPerspectiveSchema = z.object({
  question_id: uuidSchema,
  content: z
    .string()
    .min(20, "Perspective content must be at least 20 characters")
    .max(1500, "Perspective content cannot exceed 1500 characters"),
  qualification: z
    .string()
    .min(10, "Qualification must be at least 10 characters")
    .max(300, "Qualification cannot exceed 300 characters"),
  based_on: basedOnSchema,
  relevant_experience: z
    .string()
    .max(200, "Relevant experience cannot exceed 200 characters")
    .optional()
    .nullable(),
});

export const updatePerspectiveSchema = z.object({
  perspective_id: uuidSchema,
  content: z
    .string()
    .min(20, "Perspective content must be at least 20 characters")
    .max(1500, "Perspective content cannot exceed 1500 characters")
    .optional(),
  qualification: z
    .string()
    .min(10, "Qualification must be at least 10 characters")
    .max(300, "Qualification cannot exceed 300 characters")
    .optional(),
  based_on: basedOnSchema.optional(),
  relevant_experience: z
    .string()
    .max(200, "Relevant experience cannot exceed 200 characters")
    .optional()
    .nullable(),
});

export const deletePerspectiveSchema = z.object({
  perspective_id: uuidSchema,
});

export const knowledgeInsightBasedOnSchema = z.enum([
  "business_experience",
  "project",
  "experiment",
  "industry_experience",
  "lesson_learned",
  "general_perspective",
]);

export const knowledgeInsightStatusSchema = z.enum([
  "published",
  "draft",
  "archived",
]);

export const createKnowledgeInsightSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(200, "Title cannot exceed 200 characters"),
    content: z
      .string()
      .trim()
      .max(5000, "Content cannot exceed 5000 characters"),
    content_json: z.string().optional().nullable(),
    topic: questionTopicSchema,
    based_on: knowledgeInsightBasedOnSchema.optional().nullable(),
    status: knowledgeInsightStatusSchema.optional().default("published"),
  })
  .superRefine((data, ctx) => {
    if (data.status !== "draft" && data.content.length < 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content must be at least 50 characters",
        path: ["content"],
      });
    }
  });

export const updateKnowledgeInsightSchema = z
  .object({
    knowledge_insight_id: uuidSchema,
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(200, "Title cannot exceed 200 characters")
      .optional(),
    content: z
      .string()
      .trim()
      .max(5000, "Content cannot exceed 5000 characters")
      .optional(),
    content_json: z.string().optional().nullable(),
    topic: questionTopicSchema.optional(),
    based_on: knowledgeInsightBasedOnSchema.optional().nullable(),
    status: knowledgeInsightStatusSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "published" && data.content !== undefined && data.content.length < 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content must be at least 50 characters",
        path: ["content"],
      });
    }
  });

export const archiveKnowledgeInsightSchema = z.object({
  knowledge_insight_id: uuidSchema,
});

export const deleteKnowledgeInsightSchema = z.object({
  knowledge_insight_id: uuidSchema,
});

export const listKnowledgeInsightsSchema = z.object({
  topic: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(["published", "draft", "archived", "all"]).optional(),
  business_id: uuidSchema.optional(),
  limit: z.number().min(1).max(50).optional(),
  offset: z.number().min(0).optional(),
});

// ---------------------------------------------------------
// EXCHANGE & NEGOTIATION VALIDATORS
// ---------------------------------------------------------

export const exchangeTypeSchema = z.enum([
  "fixed_amount",
  "revenue_share",
  "qualified_lead",
  "business_opportunity",
  "service_work",
  "partnership",
  "introduction",
  "other",
]);

export const contactFieldSchema = z.enum([
  "email",
  "phone",
  "whatsapp",
  "linkedin",
  "twitter",
]);

export const acknowledgeProcessSchema = z.object({
  interest_id: uuidSchema,
});

export const createProposalSchema = z.object({
  interest_id: uuidSchema,
  exchange_type: exchangeTypeSchema,
  exchange_details: z.string().min(5, "Details must be at least 5 characters").max(3000, "Details cannot exceed 3000 characters"),
  revenue_percentage: z.number().min(0.01).max(100).optional().nullable(),
  fixed_amount: z.number().min(0).optional().nullable(),
  currency: z.string().max(10).optional().nullable(),
  additional_terms: z.string().max(2000).optional().nullable(),
});

export const counterProposalSchema = z.object({
  interest_id: uuidSchema,
  exchange_type: exchangeTypeSchema,
  exchange_details: z.string().min(5, "Details must be at least 5 characters").max(3000, "Details cannot exceed 3000 characters"),
  revenue_percentage: z.number().min(0.01).max(100).optional().nullable(),
  fixed_amount: z.number().min(0).optional().nullable(),
  currency: z.string().max(10).optional().nullable(),
  additional_terms: z.string().max(2000).optional().nullable(),
});

export const declineReasonSchema = z.enum([
  "valuation_mismatch",
  "exchange_type_unsuitable",
  "timeline_conflict",
  "scope_unclear",
  "other",
]);

export const respondProposalSchema = z.object({
  proposal_id: uuidSchema,
  action: z.enum(["accept", "decline"]),
  decline_reason: declineReasonSchema.optional().nullable(),
  decline_note: z.string().max(500).optional().nullable(),
});

export const withdrawProposalSchema = z.object({
  proposal_id: uuidSchema,
});

export const confirmAgreementSchema = z.object({
  interest_id: uuidSchema,
  proposal_id: uuidSchema,
});

export const shareContactConsentSchema = z.object({
  interest_id: uuidSchema,
  fields: z.array(contactFieldSchema).min(1, "Please select at least one contact field to share"),
});

export const acceptContactConsentSchema = z.object({
  interest_id: uuidSchema,
  fields: z.array(contactFieldSchema).min(1, "Please select at least one contact field to accept"),
});

export const sendFollowUpSchema = z.object({
  interest_id: uuidSchema,
});




