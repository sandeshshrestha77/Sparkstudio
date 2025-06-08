-- First, let's make sure we have the right setup for admin authentication

-- 1. Ensure admin_users table exists with proper structure
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Disable RLS temporarily for easier setup
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 3. Insert the admin user record
INSERT INTO admin_users (email, name, role) VALUES
('sandeshsthaa67@gmail.com', 'Sandesh Shrestha', 'admin')
ON CONFLICT (email) DO UPDATE SET 
  name = EXCLUDED.name,
  role = EXCLUDED.role;

-- 4. Verify the admin user exists
SELECT * FROM admin_users WHERE email = 'sandeshsthaa67@gmail.com';

-- 5. Re-enable RLS with simple policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies
DROP POLICY IF EXISTS "Allow reading admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow admin access" ON admin_users;

-- 7. Create simple policies
CREATE POLICY "Enable read access for all users" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON admin_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON admin_users
  FOR UPDATE USING (true);

-- 8. Grant necessary permissions
GRANT ALL ON admin_users TO authenticated;
GRANT ALL ON admin_users TO anon;
