-- Check RLS and policies on cars and car_images tables
-- Run this in Supabase SQL Editor

-- 1. Check if RLS is enabled on these tables
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('cars', 'car_images', 'car_features');

-- 2. Check existing policies on cars table
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'cars';

-- 3. Check existing policies on car_images table
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'car_images';

-- 4. Test if we can select from cars table
SELECT COUNT(*) as total_cars FROM public.cars;

-- 5. Test if we can select from car_images table
SELECT COUNT(*) as total_images FROM public.car_images;