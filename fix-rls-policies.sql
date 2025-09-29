-- Fix RLS Infinite Recursion Issue
-- Run this in your Supabase SQL Editor

-- First, drop all existing policies on user_profiles
DROP POLICY IF EXISTS "Users can manage their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Create simpler, non-recursive policies
-- Policy 1: Users can read and update their own profile
CREATE POLICY "Users can access own profile" ON user_profiles
  FOR ALL TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 2: Allow reading profiles for admin checks (no recursion)
CREATE POLICY "Allow profile reads for auth" ON user_profiles
  FOR SELECT TO authenticated
  USING (true);

-- Alternative fix: Temporarily disable RLS to test
-- You can uncomment this if the above doesn't work
-- ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Test the fix by running this query:
-- SELECT * FROM user_profiles WHERE id = auth.uid();