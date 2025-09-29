-- Simple Storage Fix for car-images bucket
-- Run this in your Supabase SQL Editor

-- Check if the bucket exists
SELECT * FROM storage.buckets WHERE name = 'car-images';

-- Make the bucket completely public and set proper settings
UPDATE storage.buckets
SET
  public = true,
  file_size_limit = 52428800,  -- 50MB limit
  allowed_mime_types = '{"image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"}'
WHERE name = 'car-images';

-- Check if storage.objects has RLS enabled and disable it
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage' AND tablename = 'objects';

-- Disable RLS on storage.objects if it's enabled
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Verify the bucket is now public
SELECT name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'car-images';