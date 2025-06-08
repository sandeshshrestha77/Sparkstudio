-- First, let's make sure the admin user exists
INSERT INTO admin_users (email, name, role) VALUES
('sandeshsthaa67@gmail.com', 'Sandesh Shrestha', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Verify the admin user was created
SELECT * FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com';

-- Check all tables exist and have data
SELECT 
  'projects' as table_name, 
  COUNT(*) as row_count 
FROM projects
UNION ALL
SELECT 
  'services' as table_name, 
  COUNT(*) as row_count 
FROM services
UNION ALL
SELECT 
  'admin_users' as table_name, 
  COUNT(*) as row_count 
FROM admin_users
UNION ALL
SELECT 
  'contact_submissions' as table_name, 
  COUNT(*) as row_count 
FROM contact_submissions;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'services', 'admin_users', 'contact_submissions');
