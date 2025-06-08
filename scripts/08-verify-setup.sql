-- Verification script to check everything is working

-- 1. Check if admin_users table exists and has data
SELECT 
  'admin_users table' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com') 
    THEN '✅ PASS' 
    ELSE '❌ FAIL' 
  END as status;

-- 2. Check RLS status
SELECT 
  'RLS enabled' as check_name,
  CASE 
    WHEN rowsecurity = true 
    THEN '✅ ENABLED' 
    ELSE '⚠️ DISABLED' 
  END as status
FROM pg_tables 
WHERE tablename = 'admin_users';

-- 3. Check policies exist
SELECT 
  'Policies exist' as check_name,
  CASE 
    WHEN COUNT(*) > 0 
    THEN '✅ ' || COUNT(*) || ' policies found' 
    ELSE '❌ No policies' 
  END as status
FROM pg_policies 
WHERE tablename = 'admin_users';

-- 4. Show all admin users
SELECT 'Current admin users:' as info;
SELECT email, name, role, created_at FROM admin_users;

-- 5. Show current policies
SELECT 'Current policies:' as info;
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'admin_users';
