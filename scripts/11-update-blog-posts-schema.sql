-- Add missing columns to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Admin',
ADD COLUMN IF NOT EXISTS author_avatar TEXT,
ADD COLUMN IF NOT EXISTS author_role TEXT DEFAULT 'Content Creator',
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS read_time TEXT DEFAULT '5 min read',
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;

-- Update existing records with default values
UPDATE blog_posts 
SET 
    featured = false,
    author_name = COALESCE(author, 'Admin'),
    author_role = 'Content Creator',
    read_time = '5 min read',
    published = true,
    image_url = '/placeholder.svg?height=400&width=600'
WHERE featured IS NULL;

-- Set one post as featured for demo
UPDATE blog_posts 
SET featured = true 
WHERE id = (SELECT id FROM blog_posts ORDER BY created_at DESC LIMIT 1);

-- Update sample data with better content
UPDATE blog_posts SET
    title = 'The Art of Digital Minimalism in Brand Design',
    excerpt = 'Exploring how less can be more in creating powerful brand identities that resonate with modern audiences.',
    content = 'In an age of information overload, minimalist design has become more than just an aesthetic choice. It''s a strategic approach that helps brands cut through the noise and connect with their audience on a deeper level.',
    category = 'Design',
    tags = ARRAY['minimalism', 'branding', 'design'],
    author_name = 'Sandesh Shrestha',
    author_role = 'Creative Director',
    read_time = '8 min read',
    featured = true
WHERE title LIKE '%Art of Digital%' OR id = (SELECT id FROM blog_posts ORDER BY created_at DESC LIMIT 1);

-- Insert additional sample posts if table is empty
INSERT INTO blog_posts (title, excerpt, content, category, tags, author_name, author_role, read_time, published, featured, image_url)
SELECT * FROM (VALUES
    (
        'Motion Graphics: The Future of Digital Storytelling',
        'How motion design is revolutionizing the way brands communicate with their audiences in the digital age.',
        'Motion graphics have evolved from simple animations to sophisticated storytelling tools that can convey complex ideas in seconds. In this article, we explore the latest trends and techniques in motion design.',
        'Motion',
        ARRAY['motion graphics', 'animation', 'storytelling'],
        'Sandesh Shrestha',
        'Motion Director',
        '6 min read',
        true,
        false,
        '/placeholder.svg?height=400&width=600'
    ),
    (
        'Building Inclusive Digital Experiences',
        'A comprehensive guide to creating digital products that are accessible and inclusive for all users.',
        'Inclusive design isn''t just about compliance—it''s about creating better experiences for everyone. Learn how to design with accessibility in mind from the ground up.',
        'UX',
        ARRAY['accessibility', 'inclusive design', 'ux'],
        'Sandesh Shrestha',
        'UX Lead',
        '10 min read',
        true,
        false,
        '/placeholder.svg?height=400&width=600'
    ),
    (
        'The Psychology of Color in Digital Interfaces',
        'Understanding how color choices impact user behavior and emotional responses in digital products.',
        'Color is one of the most powerful tools in a designer''s arsenal. It can influence emotions, guide user behavior, and create memorable brand experiences.',
        'Design',
        ARRAY['color theory', 'psychology', 'ui design'],
        'Sandesh Shrestha',
        'Technical Creative',
        '7 min read',
        true,
        false,
        '/placeholder.svg?height=400&width=600'
    )
) AS new_posts(title, excerpt, content, category, tags, author_name, author_role, read_time, published, featured, image_url)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE title = new_posts.title);
