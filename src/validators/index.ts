import { z } from "zod";

// Shared validators
export const uuidSchema = z.string().uuid("Invalid UUID format");

export const businessStatusSchema = z.enum(["pending", "approved", "rejected"]);
export const businessMemberRoleSchema = z.enum(["owner", "admin", "member"]);
export const opportunityTypeSchema = z.enum([
  "growth_partner",
  "strategic_partner",
  "distribution_partner",
  "vendor",
  "hiring",
  "investment",
]);
export const opportunityStatusSchema = z.enum(["active", "closed"]);
export const interestStatusSchema = z.enum(["pending", "accepted", "rejected"]);

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
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: opportunityTypeSchema,
});

export const updateOpportunitySchema = z.object({
  opportunity_id: uuidSchema,
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  type: opportunityTypeSchema.optional(),
  status: opportunityStatusSchema.optional(),
});

export const expressInterestSchema = z.object({
  opportunity_id: uuidSchema,
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
