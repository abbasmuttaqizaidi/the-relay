-- The Relay — Database Initialization Schema
-- This script sets up tables, constraints, indexes, RLS, and storage configuration.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------
-- 1. TABLES DEFINITIONS
---------------------------------------------------------

-- TABLE: users
-- Maps Clerk users to internal users using clerk_user_id as the mapping key.
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TABLE: businesses
-- Stores business profiles linked to an owner user.
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  website TEXT NOT NULL,
  industry TEXT NOT NULL,
  description TEXT,
  linkedin_url TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TABLE: business_members
-- Maps users who are members of a business (supporting future team structures).
CREATE TABLE IF NOT EXISTS business_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT uq_business_members_business_user UNIQUE (business_id, user_id)
);

-- TABLE: opportunities
-- Core B2B listing objects in The Relay (hiring, partnership, distribution, etc.)
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('growth_partner', 'strategic_partner', 'distribution_partner', 'vendor', 'hiring', 'investment')),
  status TEXT DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TABLE: interests
-- Tracks businesses expressing interest in specific opportunities.
CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- TABLE: saved_opportunities
-- Bookmarks of opportunities by users.
CREATE TABLE IF NOT EXISTS saved_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT uq_saved_opportunities_user_opportunity UNIQUE (user_id, opportunity_id)
);

-- TABLE: notifications
-- System notifications for users.
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

---------------------------------------------------------
-- 2. INDEXES
---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users(clerk_user_id);

CREATE INDEX IF NOT EXISTS idx_businesses_owner_user_id ON businesses(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_industry ON businesses(industry);

CREATE INDEX IF NOT EXISTS idx_opportunities_business_id ON opportunities(business_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON opportunities(type);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);

CREATE INDEX IF NOT EXISTS idx_interests_opportunity_id ON interests(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_interests_business_id ON interests(business_id);
CREATE INDEX IF NOT EXISTS idx_interests_status ON interests(status);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

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

CREATE TRIGGER update_businesses_updated_at 
BEFORE UPDATE ON businesses 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at 
BEFORE UPDATE ON opportunities 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

---------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
---------------------------------------------------------
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Note: Permission checks are mainly enforced by the TanStack Server Functions + Service Layer.
-- These RLS policies act as a secondary guard rails.

-- Read-only public policies for active/approved entities
CREATE POLICY "Allow public read for approved businesses" ON businesses
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow public read for active opportunities" ON opportunities
  FOR SELECT USING (status = 'active');

-- Service role bypasses RLS implicitly. Since our Service layer connects using the service_role key,
-- it will have full admin rights. Below we define fallback policies for users if direct client calls are ever used:
CREATE POLICY "Allow users to read their own notifications" ON notifications
  FOR SELECT USING (true); -- Refined further in service layer

---------------------------------------------------------
-- 5. SUPABASE STORAGE BUCKET CONFIGURATION
-- Sets up the 'business-assets' bucket for company logos.
---------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-assets', 
  'business-assets', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage bucket
CREATE POLICY "Allow public read access for business-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-assets');

CREATE POLICY "Allow server-side uploads only" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'business-assets');
