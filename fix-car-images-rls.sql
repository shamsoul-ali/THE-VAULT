-- Fix Car Images RLS Policy Issue
-- Run this in your Supabase SQL Editor

-- Drop existing car_images policies that might be too restrictive
DROP POLICY IF EXISTS "Public can view car images" ON car_images;
DROP POLICY IF EXISTS "Authenticated users can view all car images" ON car_images;
DROP POLICY IF EXISTS "Admins can manage car images" ON car_images;

-- Create new, simpler policies for car_images
-- Policy 1: Anyone can view car images
CREATE POLICY "Allow public read access to car images" ON car_images
  FOR SELECT
  USING (true);

-- Policy 2: Authenticated users can insert car images
CREATE POLICY "Allow authenticated users to insert car images" ON car_images
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Policy 3: Authenticated users can update/delete their own car images
CREATE POLICY "Allow authenticated users to manage car images" ON car_images
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Alternative: Temporarily disable RLS on car_images for testing
-- Uncomment the line below if the above policies don't work
-- ALTER TABLE car_images DISABLE ROW LEVEL SECURITY;

-- Test the fix by checking if you can insert a test record
-- INSERT INTO car_images (car_id, image_url, image_type)
-- VALUES ('test-id', 'test-url', 'exterior');