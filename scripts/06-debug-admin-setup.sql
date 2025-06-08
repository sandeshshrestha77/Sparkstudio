-- Let's debug the admin setup step by step

-- 1. Check if the admin_users table exists and has the right structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
AND table_schema = 'public';

-- 2. Check what's currently in the admin_users table
SELECT * FROM admin_users;

-- 3. Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'admin_users';

-- 4. Check current policies
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- 5. Insert/update the admin user (force it)
DELETE FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com';
INSERT INTO admin_users (email, name, role) VALUES
('sandeshsthaa67@gmail.com', 'Sandesh Shrestha', 'admin');

-- 6. Verify the insert worked
SELECT * FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com';

-- 7. Test a simple select (this should work)
SELECT COUNT(*) as admin_count FROM admin_users;
