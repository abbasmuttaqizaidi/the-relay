-- Migration: 07_insight_views.sql
-- Add views count and deduplicated InsightView table

-- 1. Add views column to questions
ALTER TABLE "questions" 
ADD COLUMN IF NOT EXISTS "views" INTEGER NOT NULL DEFAULT 0;

-- 2. Add views column to knowledge_insights
ALTER TABLE "knowledge_insights" 
ADD COLUMN IF NOT EXISTS "views" INTEGER NOT NULL DEFAULT 0;

-- 3. Create insight_views table for strict deduplication
CREATE TABLE IF NOT EXISTS "insight_views" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "item_type" TEXT NOT NULL,
    "item_id" UUID NOT NULL,
    "viewer_key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insight_views_pkey" PRIMARY KEY ("id")
);

-- Unique index to prevent duplicate views for the same viewer on the same item
CREATE UNIQUE INDEX IF NOT EXISTS "insight_views_item_type_item_id_viewer_key_key" 
ON "insight_views"("item_type", "item_id", "viewer_key");

CREATE INDEX IF NOT EXISTS "insight_views_item_type_item_id_idx" 
ON "insight_views"("item_type", "item_id");
