-- FINAL FIX: Completely Disable Storage RLS and Reset Everything
-- Run this in your Supabase SQL Editor

-- Step 1: Check current RLS status
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage';

-- Step 2: Disable RLS on ALL storage tables
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Step 3: Drop ALL existing storage policies
DROP POLICY IF EXISTS "Public Access for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete for car-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;

-- Step 4: Remove and recreate the bucket completely
DELETE FROM storage.objects WHERE bucket_id = 'car-images';
DELETE FROM storage.buckets WHERE id = 'car-images';

-- Step 5: Create new public bucket with no restrictions
INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) VALUES (
  'car-images',
  'car-images',
  true,
  52428800, -- 50MB
  '["image/jpeg","image/jpg","image/png","image/webp","image/gif","image/heic"]'
);

-- Step 6: Verify everything is set up correctly
SELECT
  'Buckets' as type,
  id,
  name,
  public,
  file_size_limit
FROM storage.buckets
WHERE id = 'car-images'

UNION ALL

SELECT
  'RLS Status' as type,
  schemaname as id,
  tablename as name,
  rowsecurity::text as public,
  null as file_size_limit
FROM pg_tables
WHERE schemaname = 'storage';

-- Step 7: Check for any remaining policies (should be empty)
SELECT
  policyname,
  schemaname,
  tablename
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects';