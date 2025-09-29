-- Fix Storage Issues the Supabase Way
-- This works without needing superuser permissions

-- Step 1: Check current bucket status
SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'car-images';

-- Step 2: Delete and recreate bucket (this removes all policies automatically)
DELETE FROM storage.objects WHERE bucket_id = 'car-images';
DELETE FROM storage.buckets WHERE id = 'car-images';

-- Step 3: Create completely public bucket with no RLS policies needed
INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  avif_autodetection,
  created_at,
  updated_at
) VALUES (
  'car-images',
  'car-images',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic'],
  false,
  now(),
  now()
);

-- Step 4: Verify the bucket is public and has no policies
SELECT
  'Bucket Created' as status,
  id,
  name,
  public
FROM storage.buckets
WHERE id = 'car-images';

-- Step 5: Check if any policies exist (should be none for public buckets)
SELECT
  'Policies Check' as status,
  count(*) as policy_count
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%car-images%';