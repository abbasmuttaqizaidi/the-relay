CREATE TABLE "marketing_contacts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "name" TEXT,
  "company" TEXT,
  "phone" TEXT,
  "notes" TEXT,
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "marketing_consent" BOOLEAN NOT NULL DEFAULT FALSE,
  "consent_source" TEXT,
  "consent_at" TIMESTAMPTZ(6),
  "archived_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "marketing_contacts_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "marketing_contacts_email_normalized_check"
    CHECK ("email" = lower(trim("email"))),
  CONSTRAINT "marketing_contacts_consent_evidence_check"
    CHECK (NOT "marketing_consent" OR (NULLIF(trim("consent_source"), '') IS NOT NULL AND "consent_at" IS NOT NULL))
);

CREATE UNIQUE INDEX "marketing_contacts_email_key"
  ON "marketing_contacts"("email");
CREATE INDEX "marketing_contacts_name_idx" ON "marketing_contacts"("name");
CREATE INDEX "marketing_contacts_company_idx" ON "marketing_contacts"("company");
CREATE INDEX "marketing_contacts_marketing_consent_archived_at_idx"
  ON "marketing_contacts"("marketing_consent", "archived_at");

DROP INDEX "marketing_campaign_recipients_campaign_id_clerk_user_id_key";
ALTER TABLE "marketing_campaign_recipients"
  ALTER COLUMN "clerk_user_id" DROP NOT NULL,
  ADD COLUMN "contact_id" UUID;
ALTER TABLE "marketing_campaign_recipients"
  ADD CONSTRAINT "marketing_campaign_recipients_contact_id_fkey"
    FOREIGN KEY ("contact_id") REFERENCES "marketing_contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "marketing_campaign_recipients_identity_check"
    CHECK ("contact_id" IS NOT NULL OR "clerk_user_id" IS NOT NULL);

CREATE UNIQUE INDEX "marketing_campaign_recipients_campaign_id_email_key"
  ON "marketing_campaign_recipients"("campaign_id", "email");