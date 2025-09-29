-- Simple Storage Test
-- Run this to test direct storage access

-- Try to insert a test record directly into storage.objects
INSERT INTO storage.objects (
  bucket_id,
  name,
  owner,
  created_at,
  updated_at,
  last_accessed_at,
  metadata
) VALUES (
  'car-images',
  'test-file.jpg',
  auth.uid(),
  now(),
  now(),
  now(),
  '{}'::jsonb
);

-- If this fails with RLS error, then we know it's the storage.objects table
-- If it succeeds, the issue is in the upload component