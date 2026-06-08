// Types for The Relay B2B Platform

export type BusinessStatus = "pending" | "approved" | "rejected";
export type BusinessMemberRole = "owner" | "admin" | "member";
export type OpportunityCategory = "partnership" | "referral" | "distribution" | "vendor" | "hiring" | "strategic_advice" | "investment";
export type OpportunityStatus = "active" | "closed";
export type PromotionStatus = "none" | "pending_promotion" | "promoted";
export type InterestStatus = "pending" | "accepted" | "declined" | "withdrawn";

// ---------------------------------------------------------
// DATABASE MODELS
// ---------------------------------------------------------

export interface User {
  id: string; // UUID
  clerk_user_id: string;
  email: string | null;
  created_at: string;
}

export interface Business {
  id: string; // UUID
  owner_user_id: string; // UUID references users.id
  company_name: string;
  website: string;
  industry: string;
  description: string | null;
  linkedin_url: string | null;
  logo_url: string | null;
  hq_location: string | null;
  founded_year: number | null;
  company_size: string | null;
  company_type: string | null;
  funding_stage: string | null;
  twitter_url: string | null;
  contact_email: string | null;
  status: BusinessStatus;
  website_verified: boolean;
  website_verified_at: string | null;
  website_verified_domain: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessMember {
  id: string; // UUID
  business_id: string; // UUID references businesses.id
  user_id: string; // UUID references users.id
  role: BusinessMemberRole;
  created_at: string;
}

export interface Opportunity {
  id: string; // UUID
  business_id: string; // UUID references businesses.id
  opportunity_number: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  location: string | null;
  offer_text: string | null;
  status: OpportunityStatus;
  hide_company_name: boolean;
  promotion_status: PromotionStatus;
  expires_at: string | null; // ISO Date String
  created_at: string;
  updated_at: string;
}

export interface Interest {
  id: string; // UUID
  opportunity_id: string; // UUID references opportunities.id
  requesting_business_id: string; // UUID references businesses.id
  message: string | null;
  status: InterestStatus;
  created_at: string;
  updated_at: string;
}


export interface SavedOpportunity {
  id: string; // UUID
  user_id: string; // UUID references users.id
  opportunity_id: string; // UUID references opportunities.id
  created_at: string;
}

export interface Notification {
  id: string; // UUID
  user_id: string; // UUID references users.id
  title: string;
  description: string | null;
  is_read: boolean;
  created_at: string;
}

// ---------------------------------------------------------
// DATA TRANSFER OBJECTS (DTOs) & INPUTS
// ---------------------------------------------------------

export interface CreateUserDTO {
  clerk_user_id: string;
  email?: string;
}

export interface CreateBusinessDTO {
  owner_user_id: string;
  company_name: string;
  website: string;
  industry: string;
  description?: string;
  linkedin_url?: string;
  logo_url?: string;
}

export interface UpdateBusinessDTO {
  company_name?: string;
  website?: string;
  industry?: string;
  description?: string;
  linkedin_url?: string;
  logo_url?: string;
  hq_location?: string;
  founded_year?: number;
  company_size?: string;
  company_type?: string;
  funding_stage?: string;
  twitter_url?: string;
  contact_email?: string;
}

export interface CreateOpportunityDTO {
  business_id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  location?: string | null;
  offer_text?: string | null;
  expires_at?: string | null;
  hide_company_name?: boolean;
  promotion_status?: PromotionStatus;
}

export interface UpdateOpportunityDTO {
  title?: string;
  description?: string;
  category?: OpportunityCategory;
  location?: string | null;
  offer_text?: string | null;
  expires_at?: string | null;
  status?: OpportunityStatus;
  hide_company_name?: boolean;
  promotion_status?: PromotionStatus;
}

export interface ExpressInterestDTO {
  opportunity_id: string;
  business_id: string;
  message?: string;
}

export interface CreateNotificationDTO {
  user_id: string;
  title: string;
  description?: string;
}

// ---------------------------------------------------------
// SERVICE SCHEMAS & INTERFACES
// ---------------------------------------------------------

export interface ListOpportunitiesFilters {
  industry?: string;
  category?: OpportunityCategory | "All";
  status?: OpportunityStatus;
  limit?: number;
  offset?: number;
}
