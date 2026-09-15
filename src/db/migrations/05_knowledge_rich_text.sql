-- The Relay — Knowledge Rich-Text & Publishing Migration
-- Adds content_json to store structured Tiptap JSON and published_at timestamp to knowledge_insights table.

ALTER TABLE knowledge_insights ADD COLUMN IF NOT EXISTS content_json TEXT;
ALTER TABLE knowledge_insights ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
