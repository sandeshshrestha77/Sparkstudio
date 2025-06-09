-- Insert sample projects
INSERT INTO projects (title, description, category, client, year, image_url, tags, featured, project_type) VALUES
('Mountain Cafe Branding', 'Complete brand identity for a Nepali coffee shop, including logo, packaging, and menu design.', 'branding', 'Concept Project', 2024, '/placeholder.svg?height=400&width=600', ARRAY['Brand Identity', 'Logo Design', 'Packaging'], true, 'concept'),
('Himalayan Trek Video', 'Engaging promotional video showcasing trekking experiences in the Himalayas.', 'video', 'Adventure Nepal', 2024, '/placeholder.svg?height=400&width=600', ARRAY['Video Editing', 'Color Grading', 'Tourism'], false, 'client'),
('Festival Social Campaign', 'Series of eye-catching social media graphics for a major Nepali festival.', 'social', 'Cultural Events Nepal', 2023, '/placeholder.svg?height=400&width=600', ARRAY['Social Media', 'Festival', 'Graphics'], false, 'client');

-- Insert sample services
INSERT INTO services (title, description, features, price, original_price, timeline, popular, icon) VALUES
('Logo & Brand Identity', 'Professional logo design and brand identity packages', ARRAY['Logo design & variations', 'Color palette & typography', 'Brand guidelines document', 'Business card design', 'Social media templates', '3 revision rounds included'], 'Starting at NPR 15,000', 'NPR 25,000', '1-2 weeks', false, 'Palette'),
('Video Editing', 'Professional video editing and post-production', ARRAY['Professional editing', 'Color grading', 'Basic motion graphics', 'Audio enhancement', 'Intro/outro creation', '2 revision rounds included'], 'Starting at NPR 10,000', 'NPR 18,000', '3-5 days', true, 'Video'),
('Social Media Graphics', 'Eye-catching graphics for your social media platforms', ARRAY['Custom post designs', 'Story templates', 'Profile graphics', 'Cover images', 'Promotional graphics', 'Content calendar planning'], 'Starting at NPR 8,000', 'NPR 12,000', '2-3 days', false, 'ImageIcon');

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author_name, author_role, category, tags, featured, published, read_time) VALUES
('The Art of Digital Minimalism in Brand Design', 'Exploring how less can be more in creating powerful brand identities that resonate with modern audiences.', 'In an age of information overload, minimalist design has become more than just an aesthetic choice...', 'Sarah Chen', 'Creative Director', 'Design', ARRAY['Minimalism', 'Branding', 'Design Theory'], true, true, '8 min read'),
('Motion Graphics: The Future of Digital Storytelling', 'How motion design is revolutionizing the way brands communicate with their audiences in the digital age.', 'Motion graphics have evolved from simple animations to sophisticated storytelling tools...', 'Marcus Rodriguez', 'Motion Director', 'Motion', ARRAY['Motion Graphics', 'Animation', 'Storytelling'], false, true, '6 min read');

-- Insert admin user (you'll need to update this with your actual email)
INSERT INTO admin_users (email, name, role) VALUES
('admin@sandeshshrestha.com.np', 'Admin User', 'admin');
