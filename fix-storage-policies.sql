-- Fix Storage Bucket Policies for car-images bucket
-- Run this in your Supabase SQL Editor

-- First, check existing storage policies
SELECT * FROM storage.policies WHERE bucket_id = 'car-images';

-- Delete any existing restrictive policies on car-images bucket
DELETE FROM storage.policies WHERE bucket_id = 'car-images';

-- Create new permissive storage policies
-- Policy 1: Allow authenticated users to upload files
INSERT INTO storage.policies (
  id,
  bucket_id,
  name,
  definition,
  check_,
  command
) VALUES (
  'allow_authenticated_uploads',
  'car-images',
  'Allow authenticated uploads',
  '(auth.role() = ''authenticated'')',
  '(auth.role() = ''authenticated'')',
  'INSERT'
);

-- Policy 2: Allow public read access to files
INSERT INTO storage.policies (
  id,
  bucket_id,
  name,
  definition,
  check_,
  command
) VALUES (
  'allow_public_read',
  'car-images',
  'Allow public read access',
  'true',
  NULL,
  'SELECT'
);

-- Policy 3: Allow authenticated users to delete their files
INSERT INTO storage.policies (
  id,
  bucket_id,
  name,
  definition,
  check_,
  command
) VALUES (
  'allow_authenticated_delete',
  'car-images',
  'Allow authenticated delete',
  '(auth.role() = ''authenticated'')',
  NULL,
  'DELETE'
);

-- Policy 4: Allow authenticated users to update their files
INSERT INTO storage.policies (
  id,
  bucket_id,
  name,
  definition,
  check_,
  command
) VALUES (
  'allow_authenticated_update',
  'car-images',
  'Allow authenticated update',
  '(auth.role() = ''authenticated'')',
  '(auth.role() = ''authenticated'')',
  'UPDATE'
);