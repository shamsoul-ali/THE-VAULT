-- Completely Disable Storage RLS
-- Run this in your Supabase SQL Editor

-- Check current RLS status on storage tables
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage';

-- Disable RLS on storage.objects table (this is what's causing the issue)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Also disable on storage.buckets just to be safe
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Remove any existing policies on storage.objects
DROP POLICY IF EXISTS "Public Access for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete for car-images" ON storage.objects;

-- Verify RLS is now disabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage';

-- This should show rowsecurity = false for both objects and buckets tables