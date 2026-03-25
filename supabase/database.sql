-- Initial Database Schema for Portfolio
-- You can run this directly in the Supabase SQL Editor

-- 1. Create the projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_title TEXT,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for projects table
-- Allow anyone to read published projects
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.projects FOR SELECT
  USING (is_published = true);

-- Allow authenticated users (Admin) full access
CREATE POLICY "Admins can manage projects."
  ON public.projects FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Create Policies for testimonials table
-- Allow anyone to read published testimonials
CREATE POLICY "Public testimonials are viewable by everyone."
  ON public.testimonials FOR SELECT
  USING (is_published = true);

-- Allow authenticated users (Admin) full access
CREATE POLICY "Admins can manage testimonials."
  ON public.testimonials FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
