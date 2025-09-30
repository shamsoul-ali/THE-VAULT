-- Storage Setup for Car Media (Images and Videos)
-- IMPORTANT: You'll get permission errors with SQL - use Supabase Dashboard instead!

-- ==================================================
-- METHOD 1: Supabase Dashboard (RECOMMENDED - This is what worked before)
-- ==================================================
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "Create Bucket"
-- 3. Name: "car-media"
-- 4. Set as Public: YES
-- 5. File Size Limit: 100MB
-- 6. Allowed MIME types: image/*, video/*
-- 7. No RLS policies needed if storage RLS is disabled

-- ==================================================
-- METHOD 2: SQL Alternative (if Dashboard doesn't work)
-- ==================================================

-- Just create the bucket (this should work)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-media',
  'car-media',
  true,
  104857600, -- 100MB (for videos)
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic','video/mp4','video/mov','video/avi','video/quicktime']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic','video/mp4','video/mov','video/avi','video/quicktime'];

-- Check if bucket was created
SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'car-media';

-- ==================================================
-- If you get "must be owner of table objects" errors:
-- ==================================================
-- This means you need to use the Supabase Dashboard UI instead of SQL.
-- The dashboard has the proper permissions to manage storage.

-- After creating the bucket (either method), test upload by running your app!
-- The virtual tour upload should work immediately.