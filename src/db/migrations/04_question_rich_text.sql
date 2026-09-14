-- The Relay — Question Rich-Text Content Migration
-- Adds context_content_json column to questions table to store Tiptap structured rich content.

ALTER TABLE questions ADD COLUMN IF NOT EXISTS context_content_json TEXT;
