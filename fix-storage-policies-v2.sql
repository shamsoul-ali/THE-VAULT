-- Fix Storage Bucket Policies for car-images bucket (Updated)
-- Run this in your Supabase SQL Editor

-- Check if the bucket exists and its current settings
SELECT * FROM storage.buckets WHERE name = 'car-images';

-- Check existing storage policies (using correct table name)
SELECT
  id,
  name,
  bucket_id,
  definition,
  check_,
  command
FROM storage.policies
WHERE bucket_id = 'car-images' OR bucket_id IS NULL;

-- Alternative: Check storage objects table structure
SELECT * FROM storage.objects WHERE bucket_id = 'car-images' LIMIT 1;

-- Method 1: Remove existing policies and create new ones
-- First delete existing policies
DELETE FROM storage.policies WHERE bucket_id = 'car-images';

-- Create permissive policies for car-images bucket
-- Policy 1: Allow anyone to upload (for testing)
INSERT INTO storage.policies (
  bucket_id,
  name,
  definition,
  check_,
  command
) VALUES (
  'car-images',
  'Allow all uploads',
  'true',
  'true',
  'INSERT'
);

-- Policy 2: Allow anyone to read
INSERT INTO storage.policies (
  bucket_id,
  name,
  definition,
  command
) VALUES (
  'car-images',
  'Allow all reads',
  'true',
  'SELECT'
);

-- Policy 3: Allow anyone to delete (for testing)
INSERT INTO storage.policies (
  bucket_id,
  name,
  definition,
  command
) VALUES (
  'car-images',
  'Allow all deletes',
  'true',
  'DELETE'
);

-- Method 2: If the above doesn't work, update bucket to be completely public
UPDATE storage.buckets
SET public = true, file_size_limit = 52428800, allowed_mime_types = '{"image/*"}'
WHERE name = 'car-images';

-- Method 3: Alternative - Check if RLS is enabled on storage objects
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage' AND tablename IN ('objects', 'buckets');

-- If storage.objects has RLS enabled, disable it
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;