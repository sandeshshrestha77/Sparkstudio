-- First, let's check what's in the admin_users table
SELECT * FROM admin_users;

-- Drop existing RLS policies for admin_users to start fresh
DROP POLICY IF EXISTS "Admins can do everything on admin_users" ON admin_users;

-- Temporarily disable RLS on admin_users for debugging
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Make sure the admin user exists
INSERT INTO admin_users (email, name, role) VALUES
('sandeshsthaa67@gmail.com', 'Sandesh Shrestha', 'admin')
ON CONFLICT (email) DO UPDATE SET 
  name = EXCLUDED.name,
  role = EXCLUDED.role;

-- Re-enable RLS with a simpler policy
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows reading admin_users table
CREATE POLICY "Allow reading admin users" ON admin_users
  FOR SELECT USING (true);

-- Allow authenticated users to read their own admin record
CREATE POLICY "Allow admin access" ON admin_users
  FOR ALL USING (
    auth.jwt() ->> 'email' = email
  );

-- Verify the admin user exists
SELECT id, email, name, role, created_at FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com';
