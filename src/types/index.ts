// Types for The Relay B2B Platform

export type BusinessStatus = "pending" | "approved" | "rejected" | "restricted";
export type BusinessMemberRole = "owner" | "admin" | "member";
export type OpportunityCategory = "partnership" | "referral" | "distribution" | "vendor" | "hiring" | "strategic_advice" | "investment";
export type OpportunityStatus = "active" | "closed";
export type PromotionStatus = "none" | "pending_promotion" | "promoted";
export type InterestStatus = "pending" | "accepted" | "declined" | "withdrawn" | "unresponsive";

// ---------------------------------------------------------
// DATABASE MODELS
// ---------------------------------------------------------

export interface User {
  id: string; // UUID
  clerk_user_id: string;
  email: string | null;
  created_at: string;
}

export interface ReliabilityEvent {
  id: string;
  business_id: string;
  interest_id: string;
  reason: string;
  created_at: string;
  business?: Business;
  interest?: Interest;
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
  phone_number: string | null;
  status: BusinessStatus;
  website_verified: boolean;
  website_verified_at: string | null;
  website_verified_domain: string | null;
  created_at: string;
  updated_at: string;
  custom_contact_details?: CustomContactDetail[];
  reliability_events?: ReliabilityEvent[];
}

export interface CustomContactDetail {
  id: string; // UUID
  business_id: string; // UUID
  label: string;
  value: string;
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
  requester_acknowledged_at?: string | null;
  owner_acknowledged_at?: string | null;
  last_follow_up_at?: string | null;
  created_at: string;
  updated_at: string;
  opportunity?: Opportunity;
  requesting_business?: Business;
  exchange_proposals?: ExchangeProposal[];
  exchange_agreement?: ExchangeAgreement | null;
  contact_consents?: ContactSharingConsent[];
  reliability_events?: ReliabilityEvent[];
}

export type ExchangeType =
  | "fixed_amount"
  | "revenue_share"
  | "qualified_lead"
  | "business_opportunity"
  | "service_work"
  | "partnership"
  | "introduction"
  | "other";

export type ExchangeProposalStatus =
  | "pending_response"
  | "countered"
  | "accepted"
  | "superseded"
  | "declined"
  | "cancelled";

export type ExchangeAgreementStatus = "draft" | "agreed" | "cancelled";

export type ContactSharingStatus = "requested" | "accepted" | "declined";

export type ContactField = "email" | "phone" | "whatsapp" | "linkedin" | "twitter" | string;

export type DeclineReason =
  | "valuation_mismatch"
  | "exchange_type_unsuitable"
  | "timeline_conflict"
  | "scope_unclear"
  | "other";

export interface ExchangeProposal {
  id: string;
  interest_id: string;
  opportunity_id: string;
  proposing_business_id: string;
  receiving_business_id: string;
  exchange_type: ExchangeType;
  exchange_details: string;
  revenue_percentage?: number | null;
  fixed_amount?: number | null;
  currency?: string | null;
  additional_terms?: string | null;
  version: number;
  status: ExchangeProposalStatus;
  decline_reason?: DeclineReason | string | null;
  decline_note?: string | null;
  created_at: string;
  updated_at: string;
  proposing_business?: Business;
  receiving_business?: Business;
}

export interface ExchangeAgreement {
  id: string;
  interest_id: string;
  opportunity_id: string;
  final_proposal_id?: string | null;
  owner_business_id: string;
  interested_business_id: string;
  exchange_type: ExchangeType;
  exchange_details: string;
  revenue_percentage?: number | null;
  fixed_amount?: number | null;
  currency?: string | null;
  additional_terms?: string | null;
  status: ExchangeAgreementStatus;
  owner_confirmed_at?: string | null;
  requester_confirmed_at?: string | null;
  agreed_at?: string | null;
  created_at: string;
  updated_at: string;
  owner_business?: Business;
  interested_business?: Business;
}

export interface ContactSharingConsent {
  id: string;
  interest_id: string;
  from_business_id: string;
  to_business_id: string;
  contact_field: ContactField;
  status: ContactSharingStatus;
  requested_at: string;
  accepted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProposalDTO {
  interest_id: string;
  proposing_business_id: string;
  exchange_type: ExchangeType;
  exchange_details: string;
  revenue_percentage?: number;
  fixed_amount?: number;
  currency?: string;
  additional_terms?: string;
}

export interface CounterProposalDTO {
  interest_id: string;
  proposing_business_id: string;
  exchange_type: ExchangeType;
  exchange_details: string;
  revenue_percentage?: number;
  fixed_amount?: number;
  currency?: string;
  additional_terms?: string;
}

export interface ShareContactFieldsDTO {
  interest_id: string;
  business_id: string;
  fields: ContactField[];
}

export interface AcceptContactFieldsDTO {
  interest_id: string;
  business_id: string;
  fields: ContactField[];
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
  website?: string;
  industry: string;
  description?: string;
  linkedin_url?: string;
  logo_url?: string;
  hq_location?: string;
  founded_year?: number;
  company_size?: string;
  company_type?: string;
  funding_stage?: string;
  twitter_url?: string;
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
  phone_number?: string;
}

export interface CreateCustomContactDTO {
  label: string;
  value: string;
}

export interface UpdateCustomContactDTO {
  id: string;
  label: string;
  value: string;
}

export interface DeleteCustomContactDTO {
  id: string;
}

export interface CreateOpportunityDTO {
  business_id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  industry: string;
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
  industry?: string;
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

// ---------------------------------------------------------
// INSIGHTS TYPES (Questions & Perspectives)
// ---------------------------------------------------------

export type QuestionTopic =
  | "Sales"
  | "Marketing"
  | "Operations"
  | "Hiring"
  | "Finance"
  | "Product"
  | "Partnerships"
  | "Distribution"
  | "Technology"
  | "Building a System / Business"
  | "Other";

export type DesiredPerspective =
  | "any_business"
  | "same_industry"
  | "similar_customers"
  | "relevant_experience";

export type QuestionStatus = "open" | "closed";

export type BasedOn =
  | "Our business experience"
  | "A project we worked on"
  | "An experiment or test"
  | "Industry experience"
  | "Personal experience"
  | "General perspective";

export interface Question {
  id: string;
  business_id: string;
  title: string;
  description: string;
  topic: QuestionTopic;
  desired_perspective: DesiredPerspective | null;
  status: QuestionStatus;
  context_content_json?: string | null;
  created_at: string;
  updated_at: string;
  business?: Business;
  _count?: {
    perspectives: number;
  };
  perspectives?: Perspective[];
}

export interface Perspective {
  id: string;
  question_id: string;
  business_id: string;
  content: string;
  qualification: string;
  based_on: BasedOn;
  relevant_experience: string | null;
  created_at: string;
  updated_at: string;
  business?: Business;
  question?: Question;
}

export interface CreateQuestionDTO {
  business_id: string;
  title: string;
  description: string;
  topic: QuestionTopic;
  desired_perspective?: DesiredPerspective | null;
  context_content_json?: string | null;
}

export interface UpdateQuestionDTO {
  title?: string;
  description?: string;
  topic?: QuestionTopic;
  desired_perspective?: DesiredPerspective | null;
  status?: QuestionStatus;
  context_content_json?: string | null;
}

export interface ListQuestionsFilters {
  topic?: string;
  industry?: string;
  search?: string;
  status?: QuestionStatus;
  sortBy?: "newest" | "perspectives";
  limit?: number;
  offset?: number;
}

export interface CreatePerspectiveDTO {
  question_id: string;
  business_id: string;
  content: string;
  qualification: string;
  based_on: BasedOn;
  relevant_experience?: string | null;
}

export interface UpdatePerspectiveDTO {
  content?: string;
  qualification?: string;
  based_on?: BasedOn;
  relevant_experience?: string | null;
}

export type KnowledgeInsightTopic = QuestionTopic;

export type KnowledgeInsightBasedOn =
  | "business_experience"
  | "project"
  | "experiment"
  | "industry_experience"
  | "lesson_learned"
  | "general_perspective";

export type KnowledgeInsightStatus = "published" | "draft" | "archived";

export interface KnowledgeInsight {
  id: string;
  business_id: string;
  title: string;
  content: string;
  content_json?: string | null;
  topic: KnowledgeInsightTopic;
  based_on?: KnowledgeInsightBasedOn | null;
  status: KnowledgeInsightStatus;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  business?: Business | null;
}

export interface CreateKnowledgeInsightDTO {
  business_id: string;
  title: string;
  content: string;
  content_json?: string | null;
  topic: KnowledgeInsightTopic;
  based_on?: KnowledgeInsightBasedOn | null;
  status?: KnowledgeInsightStatus;
  published_at?: string | null;
}

export interface UpdateKnowledgeInsightDTO {
  knowledge_insight_id: string;
  business_id: string;
  title?: string;
  content?: string;
  content_json?: string | null;
  topic?: KnowledgeInsightTopic;
  based_on?: KnowledgeInsightBasedOn | null;
  status?: KnowledgeInsightStatus;
  published_at?: string | null;
}

export interface ListKnowledgeInsightsFilters {
  topic?: string;
  search?: string;
  status?: KnowledgeInsightStatus | "all";
  business_id?: string;
  limit?: number;
  offset?: number;
  cursor?: string;
}


