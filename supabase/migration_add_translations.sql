-- Migration: Add Spanish translation columns to projects and testimonials
-- Run this in the Supabase SQL Editor

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS title_es TEXT,
  ADD COLUMN IF NOT EXISTS description_es TEXT;

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS content_es TEXT,
  ADD COLUMN IF NOT EXISTS author_title_es TEXT;
