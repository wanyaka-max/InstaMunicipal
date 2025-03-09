-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table that extends auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  full_name TEXT,
  avatar_url TEXT,
  department TEXT,
  is_government BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  department_id TEXT REFERENCES departments(id),
  visibility TEXT DEFAULT 'public',
  is_anonymous BOOLEAN DEFAULT FALSE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id),
  recipient_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Departments policies
DROP POLICY IF EXISTS "Anyone can view departments" ON departments;
CREATE POLICY "Anyone can view departments"
  ON departments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Government users can insert departments" ON departments;
CREATE POLICY "Government users can insert departments"
  ON departments FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_government = true
  ));

-- Posts policies
DROP POLICY IF EXISTS "Anyone can view public posts" ON posts;
CREATE POLICY "Anyone can view public posts"
  ON posts FOR SELECT
  USING (visibility = 'public' OR author_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert posts" ON posts;
CREATE POLICY "Users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update own posts" ON posts;
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Messages policies
DROP POLICY IF EXISTS "Users can view their messages" ON messages;
CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can insert messages" ON messages;
CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update their received messages" ON messages;
CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  USING (auth.uid() = recipient_id);

-- Insert initial departments
INSERT INTO departments (id, name, description)
VALUES
  ('public-works', 'Public Works', 'Responsible for maintaining public infrastructure including roads, bridges, and municipal buildings.'),
  ('parks-rec', 'Parks & Recreation', 'Manages and maintains public parks, recreational facilities, and community programs for residents.'),
  ('planning', 'Planning & Development', 'Oversees urban planning, zoning regulations, and building permits for sustainable city growth.'),
  ('finance', 'Finance & Budget', 'Manages municipal finances, budget planning, tax collection, and financial reporting.'),
  ('admin', 'Administration', 'Coordinates interdepartmental activities, manages human resources, and implements city policies.'),
  ('health', 'Health Services', 'Provides public health programs, inspections, and community health initiatives.'),
  ('education', 'Education', 'Oversees public schools, educational programs, and learning resources for the community.'),
  ('safety', 'Public Safety', 'Coordinates emergency services, disaster preparedness, and community safety programs.')
ON CONFLICT (id) DO NOTHING;

-- Enable realtime for all tables
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table departments;
alter publication supabase_realtime add table posts;
alter publication supabase_realtime add table messages;
