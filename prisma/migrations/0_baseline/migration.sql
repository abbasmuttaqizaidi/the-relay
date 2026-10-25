-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."activity_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "action" TEXT NOT NULL,
    "details" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."business_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."businesses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_user_id" UUID NOT NULL,
    "company_name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "description" TEXT,
    "linkedin_url" TEXT,
    "logo_url" TEXT,
    "hq_location" TEXT,
    "founded_year" INTEGER,
    "company_size" TEXT,
    "company_type" TEXT,
    "funding_stage" TEXT,
    "twitter_url" TEXT,
    "contact_email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "website_verified" BOOLEAN NOT NULL DEFAULT false,
    "website_verified_at" TIMESTAMPTZ(6),
    "website_verified_domain" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" TEXT,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact_sharing_consents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interest_id" UUID NOT NULL,
    "from_business_id" UUID NOT NULL,
    "to_business_id" UUID NOT NULL,
    "contact_field" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "requested_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_sharing_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."custom_contact_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_contact_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."exchange_agreements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interest_id" UUID NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "final_proposal_id" UUID,
    "owner_business_id" UUID NOT NULL,
    "interested_business_id" UUID NOT NULL,
    "exchange_type" TEXT NOT NULL,
    "exchange_details" TEXT NOT NULL,
    "revenue_percentage" DOUBLE PRECISION,
    "fixed_amount" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'USD',
    "additional_terms" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "owner_confirmed_at" TIMESTAMPTZ(6),
    "requester_confirmed_at" TIMESTAMPTZ(6),
    "agreed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exchange_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."exchange_proposals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "interest_id" UUID NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "proposing_business_id" UUID NOT NULL,
    "receiving_business_id" UUID NOT NULL,
    "exchange_type" TEXT NOT NULL,
    "exchange_details" TEXT NOT NULL,
    "revenue_percentage" DOUBLE PRECISION,
    "fixed_amount" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'USD',
    "additional_terms" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'pending_response',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_methods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "highlighted_terms" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "value_categories" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "exchange_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."insight_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "item_type" TEXT NOT NULL,
    "item_id" UUID NOT NULL,
    "user_id" UUID,
    "author_type" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_email" TEXT,
    "author_avatar" TEXT,
    "author_title" TEXT,
    "business_id" UUID,
    "parent_id" UUID,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insight_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."insight_views" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "item_type" TEXT NOT NULL,
    "item_id" UUID NOT NULL,
    "viewer_key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'direct',

    CONSTRAINT "insight_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."interests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "opportunity_id" UUID NOT NULL,
    "requesting_business_id" UUID NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_acknowledged_at" TIMESTAMPTZ(6),
    "requester_acknowledged_at" TIMESTAMPTZ(6),
    "last_follow_up_at" TIMESTAMPTZ(6),
    "delivery_methods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "highlighted_terms" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "proposed_terms" TEXT,
    "value_categories" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."knowledge_insights" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "based_on" TEXT,
    "status" TEXT NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_json" TEXT,
    "published_at" TIMESTAMPTZ(6),
    "slug" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "knowledge_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."opportunities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "opportunity_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT,
    "offer_text" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "hide_company_name" BOOLEAN NOT NULL DEFAULT false,
    "promotion_status" TEXT NOT NULL DEFAULT 'none',
    "expires_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "industry" TEXT NOT NULL DEFAULT 'SaaS',

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."perspectives" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question_id" UUID NOT NULL,
    "business_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "based_on" TEXT NOT NULL,
    "relevant_experience" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perspectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "desired_perspective" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "context_content_json" TEXT,
    "slug" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reliability_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_id" UUID NOT NULL,
    "interest_id" UUID NOT NULL,
    "reason" TEXT NOT NULL DEFAULT 'unresponsive_7_days',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reliability_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."saved_opportunities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "opportunity_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clerk_user_id" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tour_completed" BOOLEAN NOT NULL DEFAULT false,
    "avatar_type" TEXT DEFAULT 'monogram',
    "avatar_url" TEXT,
    "bio" TEXT,
    "expertise_domain" TEXT,
    "handle" TEXT,
    "linkedin_url" TEXT,
    "name" TEXT,
    "title" TEXT,
    "type" TEXT NOT NULL DEFAULT 'business',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_members_business_id_user_id_key" ON "public"."business_members"("business_id" ASC, "user_id" ASC);

-- CreateIndex
CREATE INDEX "contact_sharing_consents_from_business_id_idx" ON "public"."contact_sharing_consents"("from_business_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "contact_sharing_consents_interest_id_from_business_id_conta_key" ON "public"."contact_sharing_consents"("interest_id" ASC, "from_business_id" ASC, "contact_field" ASC);

-- CreateIndex
CREATE INDEX "contact_sharing_consents_interest_id_idx" ON "public"."contact_sharing_consents"("interest_id" ASC);

-- CreateIndex
CREATE INDEX "contact_sharing_consents_to_business_id_idx" ON "public"."contact_sharing_consents"("to_business_id" ASC);

-- CreateIndex
CREATE INDEX "custom_contact_details_business_id_idx" ON "public"."custom_contact_details"("business_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_agreements_interest_id_idx" ON "public"."exchange_agreements"("interest_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_agreements_interest_id_key" ON "public"."exchange_agreements"("interest_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_agreements_interested_business_id_idx" ON "public"."exchange_agreements"("interested_business_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_agreements_owner_business_id_idx" ON "public"."exchange_agreements"("owner_business_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_agreements_status_idx" ON "public"."exchange_agreements"("status" ASC);

-- CreateIndex
CREATE INDEX "exchange_proposals_interest_id_idx" ON "public"."exchange_proposals"("interest_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_proposals_proposing_business_id_idx" ON "public"."exchange_proposals"("proposing_business_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_proposals_receiving_business_id_idx" ON "public"."exchange_proposals"("receiving_business_id" ASC);

-- CreateIndex
CREATE INDEX "exchange_proposals_status_idx" ON "public"."exchange_proposals"("status" ASC);

-- CreateIndex
CREATE INDEX "insight_comments_business_id_idx" ON "public"."insight_comments"("business_id" ASC);

-- CreateIndex
CREATE INDEX "insight_comments_item_type_item_id_created_at_idx" ON "public"."insight_comments"("item_type" ASC, "item_id" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "insight_comments_parent_id_idx" ON "public"."insight_comments"("parent_id" ASC);

-- CreateIndex
CREATE INDEX "insight_comments_user_id_idx" ON "public"."insight_comments"("user_id" ASC);

-- CreateIndex
CREATE INDEX "insight_views_item_type_item_id_idx" ON "public"."insight_views"("item_type" ASC, "item_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "insight_views_item_type_item_id_viewer_key_key" ON "public"."insight_views"("item_type" ASC, "item_id" ASC, "viewer_key" ASC);

-- CreateIndex
CREATE INDEX "insight_views_source_idx" ON "public"."insight_views"("source" ASC);

-- CreateIndex
CREATE INDEX "interests_opportunity_id_idx" ON "public"."interests"("opportunity_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "interests_opportunity_id_requesting_business_id_key" ON "public"."interests"("opportunity_id" ASC, "requesting_business_id" ASC);

-- CreateIndex
CREATE INDEX "interests_requesting_business_id_idx" ON "public"."interests"("requesting_business_id" ASC);

-- CreateIndex
CREATE INDEX "interests_status_idx" ON "public"."interests"("status" ASC);

-- CreateIndex
CREATE INDEX "knowledge_insights_business_id_created_at_idx" ON "public"."knowledge_insights"("business_id" ASC, "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_insights_slug_key" ON "public"."knowledge_insights"("slug" ASC);

-- CreateIndex
CREATE INDEX "knowledge_insights_status_created_at_idx" ON "public"."knowledge_insights"("status" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "knowledge_insights_topic_created_at_idx" ON "public"."knowledge_insights"("topic" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "opportunities_business_id_idx" ON "public"."opportunities"("business_id" ASC);

-- CreateIndex
CREATE INDEX "opportunities_category_idx" ON "public"."opportunities"("category" ASC);

-- CreateIndex
CREATE INDEX "opportunities_created_at_idx" ON "public"."opportunities"("created_at" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_opportunity_number_key" ON "public"."opportunities"("opportunity_number" ASC);

-- CreateIndex
CREATE INDEX "opportunities_promotion_status_idx" ON "public"."opportunities"("promotion_status" ASC);

-- CreateIndex
CREATE INDEX "opportunities_status_idx" ON "public"."opportunities"("status" ASC);

-- CreateIndex
CREATE INDEX "perspectives_business_id_idx" ON "public"."perspectives"("business_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "perspectives_question_id_business_id_key" ON "public"."perspectives"("question_id" ASC, "business_id" ASC);

-- CreateIndex
CREATE INDEX "perspectives_question_id_created_at_idx" ON "public"."perspectives"("question_id" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "questions_business_id_idx" ON "public"."questions"("business_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "questions_slug_key" ON "public"."questions"("slug" ASC);

-- CreateIndex
CREATE INDEX "questions_status_created_at_idx" ON "public"."questions"("status" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "questions_topic_created_at_idx" ON "public"."questions"("topic" ASC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "reliability_events_business_id_idx" ON "public"."reliability_events"("business_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "reliability_events_interest_id_business_id_key" ON "public"."reliability_events"("interest_id" ASC, "business_id" ASC);

-- CreateIndex
CREATE INDEX "idx_saved_opportunities_created_at" ON "public"."saved_opportunities"("created_at" ASC);

-- CreateIndex
CREATE INDEX "idx_saved_opportunities_opportunity" ON "public"."saved_opportunities"("opportunity_id" ASC);

-- CreateIndex
CREATE INDEX "idx_saved_opportunities_user" ON "public"."saved_opportunities"("user_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "saved_opportunities_user_id_opportunity_id_key" ON "public"."saved_opportunities"("user_id" ASC, "opportunity_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_user_id_key" ON "public"."users"("clerk_user_id" ASC);

-- AddForeignKey
ALTER TABLE "public"."business_members" ADD CONSTRAINT "business_members_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."business_members" ADD CONSTRAINT "business_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."businesses" ADD CONSTRAINT "businesses_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact_sharing_consents" ADD CONSTRAINT "contact_sharing_consents_from_business_id_fkey" FOREIGN KEY ("from_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact_sharing_consents" ADD CONSTRAINT "contact_sharing_consents_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contact_sharing_consents" ADD CONSTRAINT "contact_sharing_consents_to_business_id_fkey" FOREIGN KEY ("to_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."custom_contact_details" ADD CONSTRAINT "custom_contact_details_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_agreements" ADD CONSTRAINT "exchange_agreements_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_agreements" ADD CONSTRAINT "exchange_agreements_interested_business_id_fkey" FOREIGN KEY ("interested_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_agreements" ADD CONSTRAINT "exchange_agreements_owner_business_id_fkey" FOREIGN KEY ("owner_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_proposals" ADD CONSTRAINT "exchange_proposals_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_proposals" ADD CONSTRAINT "exchange_proposals_proposing_business_id_fkey" FOREIGN KEY ("proposing_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."exchange_proposals" ADD CONSTRAINT "exchange_proposals_receiving_business_id_fkey" FOREIGN KEY ("receiving_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."insight_comments" ADD CONSTRAINT "insight_comments_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."insight_comments" ADD CONSTRAINT "insight_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."insight_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."insight_comments" ADD CONSTRAINT "insight_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."interests" ADD CONSTRAINT "interests_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."interests" ADD CONSTRAINT "interests_requesting_business_id_fkey" FOREIGN KEY ("requesting_business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."knowledge_insights" ADD CONSTRAINT "knowledge_insights_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."opportunities" ADD CONSTRAINT "opportunities_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."perspectives" ADD CONSTRAINT "perspectives_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."perspectives" ADD CONSTRAINT "perspectives_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."questions" ADD CONSTRAINT "questions_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reliability_events" ADD CONSTRAINT "reliability_events_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reliability_events" ADD CONSTRAINT "reliability_events_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."saved_opportunities" ADD CONSTRAINT "saved_opportunities_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."saved_opportunities" ADD CONSTRAINT "saved_opportunities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
