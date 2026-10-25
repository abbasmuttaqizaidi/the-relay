CREATE TABLE "marketing_campaigns" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "subject" TEXT NOT NULL,
  "html_content" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "recipient_count" INTEGER NOT NULL DEFAULT 0,
  "sent_count" INTEGER NOT NULL DEFAULT 0,
  "failed_count" INTEGER NOT NULL DEFAULT 0,
  "skipped_count" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "started_at" TIMESTAMPTZ(6),
  "completed_at" TIMESTAMPTZ(6),
  CONSTRAINT "marketing_campaigns_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "marketing_campaigns_status_check"
    CHECK ("status" IN ('draft', 'queued', 'sending', 'sent', 'sent_with_errors', 'failed'))
);

CREATE TABLE "marketing_campaign_recipients" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "campaign_id" UUID NOT NULL,
  "clerk_user_id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "resend_id" TEXT,
  "last_error" TEXT,
  "last_attempt_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sent_at" TIMESTAMPTZ(6),
  CONSTRAINT "marketing_campaign_recipients_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "marketing_campaign_recipients_campaign_id_fkey"
    FOREIGN KEY ("campaign_id") REFERENCES "marketing_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "marketing_campaign_recipients_status_check"
    CHECK ("status" IN ('pending', 'sending', 'sent', 'failed', 'skipped')),
  CONSTRAINT "marketing_campaign_recipients_attempts_check"
    CHECK ("attempts" >= 0)
);

CREATE UNIQUE INDEX "marketing_campaign_recipients_campaign_id_clerk_user_id_key"
  ON "marketing_campaign_recipients"("campaign_id", "clerk_user_id");
CREATE INDEX "marketing_campaigns_status_created_at_idx"
  ON "marketing_campaigns"("status", "created_at");
CREATE INDEX "marketing_campaign_recipients_campaign_id_status_created_at_idx"
  ON "marketing_campaign_recipients"("campaign_id", "status", "created_at");

CREATE TABLE "marketing_suppressions" (
  "email" TEXT NOT NULL,
  "clerk_user_id" TEXT,
  "reason" TEXT NOT NULL DEFAULT 'unsubscribe',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "marketing_suppressions_pkey" PRIMARY KEY ("email"),
  CONSTRAINT "marketing_suppressions_email_normalized_check"
    CHECK ("email" = lower(trim("email")))
);