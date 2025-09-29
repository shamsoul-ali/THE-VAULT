-- Create Storage Policies for car-images bucket
-- Run this in your Supabase SQL Editor

-- Policy 1: Allow anyone to upload to car-images bucket
CREATE POLICY "Allow public uploads to car-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'car-images');

-- Policy 2: Allow anyone to read from car-images bucket
CREATE POLICY "Allow public reads from car-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-images');

-- Policy 3: Allow authenticated users to delete from car-images
CREATE POLICY "Allow authenticated deletes from car-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'car-images' AND auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to update metadata in car-images
CREATE POLICY "Allow authenticated updates to car-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'car-images' AND auth.role() = 'authenticated');

-- Verify policies were created successfully
SELECT
  policyname,
  cmd,
  permissive,
  roles,
  qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
ORDER BY policyname;