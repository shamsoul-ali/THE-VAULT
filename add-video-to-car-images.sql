-- Add video MIME types to existing car-images bucket
-- Run this in your Supabase SQL Editor

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
    'video/quicktime',
    'video/x-msvideo'
  ],
  file_size_limit = 104857600
WHERE id = 'car-images';

-- Verify it worked
SELECT allowed_mime_types, file_size_limit FROM storage.buckets WHERE id = 'car-images';