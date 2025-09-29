-- Recreate Storage Bucket with Proper Policies
-- Run this in your Supabase SQL Editor

-- Step 1: Delete all objects in the bucket first (if any)
DELETE FROM storage.objects WHERE bucket_id = 'car-images';

-- Step 2: Drop the existing bucket
DELETE FROM storage.buckets WHERE id = 'car-images';

-- Step 3: Create new public storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-images',
  'car-images',
  true,
  52428800, -- 50MB
  '{"image/jpeg","image/jpg","image/png","image/webp","image/gif","image/heic"}'
);

-- Step 4: Create storage policies using the newer format
-- Enable RLS on storage.objects (required for policies to work)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read access to car-images bucket
CREATE POLICY "Public Access for car-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-images');

-- Policy 2: Allow authenticated users to upload to car-images bucket
CREATE POLICY "Authenticated Upload for car-images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'car-images'
    AND auth.role() = 'authenticated'
  );

-- Policy 3: Allow authenticated users to update their uploads
CREATE POLICY "Authenticated Update for car-images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'car-images'
    AND auth.role() = 'authenticated'
  );

-- Policy 4: Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated Delete for car-images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'car-images'
    AND auth.role() = 'authenticated'
  );

-- Step 5: Verify the bucket was created correctly
SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'car-images';

-- Step 6: Verify policies were created
SELECT
  policyname,
  cmd,
  permissive,
  roles,
  qual
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage';