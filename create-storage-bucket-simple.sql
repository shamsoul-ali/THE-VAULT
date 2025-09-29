-- Create Storage Bucket (Simple Version)
-- Run this in your Supabase SQL Editor

-- Create new public storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-images',
  'car-images',
  true,
  52428800, -- 50MB
  '{"image/jpeg","image/jpg","image/png","image/webp","image/gif","image/heic"}'
);

-- Verify the bucket was created correctly
SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'car-images';