-- Create blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Admin',
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT false,
    featured_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to published posts" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Allow admin full access to blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, tags, published, featured_image) VALUES
(
    'The Art of Brand Identity Design',
    'Discover the essential elements that make a brand identity memorable and effective.',
    'Brand identity design is more than just creating a logo. It''s about crafting a visual language that communicates your brand''s values, personality, and promise to your audience. In this comprehensive guide, we''ll explore the key elements of successful brand identity design and how to create a cohesive visual system that resonates with your target market.',
    'Sandesh Shrestha',
    'branding',
    ARRAY['branding', 'design', 'identity', 'logo'],
    true,
    '/placeholder.svg?height=400&width=600'
),
(
    'Video Marketing Trends for 2024',
    'Stay ahead of the curve with the latest video marketing strategies and trends.',
    'Video content continues to dominate digital marketing, and 2024 brings exciting new opportunities for brands to connect with their audiences. From short-form content to interactive videos, we''ll explore the trends that are shaping the future of video marketing and how you can leverage them for your business.',
    'Sandesh Shrestha',
    'video',
    ARRAY['video', 'marketing', 'trends', '2024'],
    true,
    '/placeholder.svg?height=400&width=600'
),
(
    'Social Media Design Best Practices',
    'Learn how to create engaging social media content that drives results.',
    'Social media design requires a unique approach that balances creativity with platform-specific requirements. In this article, we''ll share proven strategies for creating social media content that not only looks great but also performs well across different platforms.',
    'Sandesh Shrestha',
    'social-media',
    ARRAY['social-media', 'design', 'content', 'engagement'],
    false,
    '/placeholder.svg?height=400&width=600'
);
