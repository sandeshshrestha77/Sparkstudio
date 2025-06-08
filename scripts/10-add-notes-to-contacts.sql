-- Add notes column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Update RLS policies to include notes field
DROP POLICY IF EXISTS "Admin users can manage contact submissions" ON contact_submissions;

CREATE POLICY "Admin users can manage contact submissions" ON contact_submissions
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )
);
