-- Fix RLS policies for cars and car_images tables
-- Run this in Supabase SQL Editor

-- 1. Ensure RLS is enabled
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_features ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to start fresh
DROP POLICY IF EXISTS "Public can view all cars" ON public.cars;
DROP POLICY IF EXISTS "Public can view all car images" ON public.car_images;
DROP POLICY IF EXISTS "Public can view all car features" ON public.car_features;

-- 3. Create new policies for public read access
-- Allow anyone to read cars (for marketplace)
CREATE POLICY "Public can view all cars" ON public.cars
  FOR SELECT
  USING (true);

-- Allow anyone to read car images (for marketplace)
CREATE POLICY "Public can view all car images" ON public.car_images
  FOR SELECT
  USING (true);

-- Allow anyone to read car features (for marketplace)
CREATE POLICY "Public can view all car features" ON public.car_features
  FOR SELECT
  USING (true);

-- 4. Verify the policies were created
SELECT
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('cars', 'car_images', 'car_features')
ORDER BY tablename, policyname;