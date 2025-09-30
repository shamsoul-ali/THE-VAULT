-- Update car-images bucket to accept both images and videos
-- Run this in your Supabase SQL Editor

-- Check current bucket settings
SELECT
  id,
  name,
  allowed_mime_types,
  file_size_limit
FROM storage.buckets
WHERE id = 'car-images';

-- Update the bucket to allow both images and videos
UPDATE storage.buckets
SET
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic',
    'video/mp4',
    'video/mov',
    'video/avi',
    'video/quicktime'
  ],
  file_size_limit = 104857600  -- 100MB (for videos)
WHERE id = 'car-images';

-- Verify the update worked
SELECT
  id,
  name,
  allowed_mime_types,
  file_size_limit,
  updated_at
FROM storage.buckets
WHERE id = 'car-images';