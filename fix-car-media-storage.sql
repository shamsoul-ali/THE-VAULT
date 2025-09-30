-- Fix Car Media Storage RLS Issues
-- Run this in your Supabase SQL Editor

-- Step 1: Check current RLS status
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage';

-- Step 2: Check what storage buckets exist
SELECT id, name, public FROM storage.buckets;

-- Step 3: Try to disable RLS on storage tables (if you have permission)
-- If this fails with "must be owner" error, skip to Step 4
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Step 4: If the above failed, try removing specific policies for car-media
DROP POLICY IF EXISTS "Public Access for car-media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload for car-media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update for car-media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete for car-media" ON storage.objects;

-- Step 5: List all current storage policies to see what's blocking us
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects';

-- Step 6: If RLS can't be disabled, create very permissive policies
-- Only run this if the above steps didn't work

-- Allow anyone to read from car-media bucket
CREATE POLICY "Allow all reads on car-media" ON storage.objects
FOR SELECT USING (bucket_id = 'car-media');

-- Allow anyone to upload to car-media bucket
CREATE POLICY "Allow all uploads on car-media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'car-media');

-- Allow anyone to update in car-media bucket
CREATE POLICY "Allow all updates on car-media" ON storage.objects
FOR UPDATE USING (bucket_id = 'car-media');

-- Allow anyone to delete from car-media bucket
CREATE POLICY "Allow all deletes on car-media" ON storage.objects
FOR DELETE USING (bucket_id = 'car-media');

-- Step 7: Verify the final state
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage';

-- Check policies again
SELECT
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND (qual LIKE '%car-media%' OR qual = 'true');