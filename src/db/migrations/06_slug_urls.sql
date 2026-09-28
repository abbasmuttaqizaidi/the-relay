-- The Relay — Questions and Knowledge Insights Slug Migration
-- Adds slug column with unique index for SEO-friendly URLs.

ALTER TABLE questions ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_questions_slug ON questions(slug);

ALTER TABLE knowledge_insights ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_knowledge_insights_slug ON knowledge_insights(slug);
