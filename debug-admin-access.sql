-- Debug Admin Access Issues
-- Run these queries in your Supabase SQL Editor to diagnose the problem

-- 1. Check if your user exists in auth.users
SELECT
  id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'your-email@example.com'; -- Replace with your actual email

-- 2. Check if user_profiles record exists
SELECT * FROM user_profiles;

-- 3. Check RLS policies on user_profiles table
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
WHERE tablename = 'user_profiles';

-- 4. Test if you can query user_profiles as authenticated user
-- This will show if RLS is blocking access
SELECT
  up.id,
  up.full_name,
  up.role,
  au.email
FROM user_profiles up
JOIN auth.users au ON up.id = au.id;

-- 5. Check if the foreign key relationship is working
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'user_profiles';

-- 6. Manual admin role assignment (run this with your actual user ID)
-- First, get your user ID from the auth.users query above
-- UPDATE user_profiles SET role = 'admin' WHERE id = 'your-user-id-here';

-- 7. Test profile creation trigger
-- Check if the trigger exists
SELECT
  trigger_name,
  event_object_table,
  trigger_schema,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 8. Check if RLS is enabled on user_profiles
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'user_profiles';