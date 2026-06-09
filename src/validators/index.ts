import { z } from "zod";

// Shared validators
export const uuidSchema = z.string().uuid("Invalid UUID format");

export const businessStatusSchema = z.enum(["pending", "approved", "rejected"]);
export const businessMemberRoleSchema = z.enum(["owner", "admin", "member"]);
export const opportunityCategorySchema = z.enum(["partnership", "referral", "distribution", "vendor", "hiring", "strategic_advice", "investment"]);
export const opportunityStatusSchema = z.enum(["active", "closed"]);
export const interestStatusSchema = z.enum(["pending", "accepted", "declined", "withdrawn"]);
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
