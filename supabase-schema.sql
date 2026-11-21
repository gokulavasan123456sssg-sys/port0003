-- =========================================================================
-- GOKULAVASAN CINEMATIC PORTFOLIO — SUPABASE DATABASE SCHEMA & POLICIES
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE (for admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT DEFAULT 'GOKULAVASAN',
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  video_url TEXT,
  video_preview_url TEXT,
  date TEXT,
  software TEXT[] DEFAULT '{}',
  client_label TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TIMELINE EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.media (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image' or 'video'
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  size_kb NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anyone can view published content)
CREATE POLICY "Public can view categories" 
  ON public.categories FOR SELECT 
  USING (true);

CREATE POLICY "Public can view published projects" 
  ON public.projects FOR SELECT 
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view timeline" 
  ON public.timeline_events FOR SELECT 
  USING (true);

CREATE POLICY "Public can view media" 
  ON public.media FOR SELECT 
  USING (true);

CREATE POLICY "Public can view site settings" 
  ON public.site_settings FOR SELECT 
  USING (true);

-- PUBLIC WRITE POLICIES (Visitors can submit contact messages)
CREATE POLICY "Public can insert contact messages" 
  ON public.contact_messages FOR INSERT 
  WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated user can manage everything)
CREATE POLICY "Admin can manage categories" 
  ON public.categories FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage projects" 
  ON public.projects FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage timeline" 
  ON public.timeline_events FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage media" 
  ON public.media FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view and update contact messages" 
  ON public.contact_messages FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage site settings" 
  ON public.site_settings FOR ALL 
  USING (auth.role() = 'authenticated');

-- =========================================================================
-- STORAGE BUCKET CONFIGURATION
-- =========================================================================
-- 1. Create a public bucket named 'portfolio-media' in Supabase dashboard
-- 2. Storage Policies:
-- Allow public read access to all files:
--   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
-- Allow authenticated admin upload:
--   CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
-- Allow authenticated admin update/delete:
--   CREATE POLICY "Admin Manage" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
