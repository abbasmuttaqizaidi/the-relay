-- The Relay — Insights Schema Migration
-- Defines questions and perspectives tables for Use Case 1: Business Questions & Perspectives.

---------------------------------------------------------
-- 1. TABLES DEFINITIONS
---------------------------------------------------------

-- TABLE: questions
-- Businesses can ask business problems, questions, or requests for perspectives.
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  topic TEXT NOT NULL,
  desired_perspective TEXT,
  status TEXT DEFAULT 'open' NOT NULL CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TABLE: perspectives
-- Approved businesses can share practical perspectives on questions.
-- 1 perspective per business per question.
CREATE TABLE IF NOT EXISTS perspectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  qualification TEXT NOT NULL,
  based_on TEXT NOT NULL,
  relevant_experience TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT uq_perspectives_question_business UNIQUE (question_id, business_id)
);

---------------------------------------------------------
-- 2. INDEXES
---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_questions_business_id ON questions(business_id);
CREATE INDEX IF NOT EXISTS idx_questions_status_created_at ON questions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_topic_created_at ON questions(topic, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_perspectives_question_id_created_at ON perspectives(question_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_perspectives_business_id ON perspectives(business_id);

---------------------------------------------------------
-- 3. TRIGGERS FOR UPDATED_AT
---------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_questions_updated_at ON questions;
CREATE TRIGGER update_questions_updated_at 
BEFORE UPDATE ON questions 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_perspectives_updated_at ON perspectives;
CREATE TRIGGER update_perspectives_updated_at 
BEFORE UPDATE ON perspectives 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

---------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
---------------------------------------------------------
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE perspectives ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read for questions" ON questions;
CREATE POLICY "Allow public read for questions" ON questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read for perspectives" ON perspectives;
CREATE POLICY "Allow public read for perspectives" ON perspectives
  FOR SELECT USING (true);
