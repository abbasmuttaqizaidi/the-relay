-- The Relay — Insights: Use Case 2 (Knowledge Insights) Schema Migration
-- Defines knowledge_insights table for practical business knowledge, lessons, tips, and observations.

---------------------------------------------------------
-- 1. TABLE DEFINITION
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS knowledge_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  based_on TEXT,
  status TEXT DEFAULT 'published' NOT NULL CHECK (status IN ('published', 'draft', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

---------------------------------------------------------
-- 2. INDEXES
---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_knowledge_insights_status_created_at ON knowledge_insights(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_insights_topic_created_at ON knowledge_insights(topic, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_insights_business_id_created_at ON knowledge_insights(business_id, created_at DESC);

---------------------------------------------------------
-- 3. TRIGGER FOR UPDATED_AT
---------------------------------------------------------

DROP TRIGGER IF EXISTS update_knowledge_insights_updated_at ON knowledge_insights;
CREATE TRIGGER update_knowledge_insights_updated_at 
BEFORE UPDATE ON knowledge_insights 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

---------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
---------------------------------------------------------

ALTER TABLE knowledge_insights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read for knowledge_insights" ON knowledge_insights;
CREATE POLICY "Allow public read for knowledge_insights" ON knowledge_insights
  FOR SELECT USING (true);
