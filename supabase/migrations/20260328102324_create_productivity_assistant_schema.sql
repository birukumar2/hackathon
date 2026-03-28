/*
  # AI Student Productivity Assistant Schema

  1. New Tables
    - `ideas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable for demo)
      - `title` (text)
      - `description` (text)
      - `category` (text) - research, startup, content, learning, project
      - `status` (text) - pending, researching, planned, completed
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `research_results`
      - `id` (uuid, primary key)
      - `idea_id` (uuid, foreign key)
      - `content` (text)
      - `sources` (jsonb)
      - `created_at` (timestamptz)
    
    - `project_plans`
      - `id` (uuid, primary key)
      - `idea_id` (uuid, foreign key)
      - `plan_data` (jsonb)
      - `created_at` (timestamptz)
    
    - `content_generated`
      - `id` (uuid, primary key)
      - `idea_id` (uuid, foreign key)
      - `platform` (text) - linkedin, instagram, twitter
      - `content` (text)
      - `created_at` (timestamptz)
    
    - `learning_paths`
      - `id` (uuid, primary key)
      - `idea_id` (uuid, foreign key)
      - `path_data` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (demo mode)
*/

CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'research',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS research_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES ideas(id) ON DELETE CASCADE,
  content text NOT NULL,
  sources jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES ideas(id) ON DELETE CASCADE,
  plan_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_generated (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES ideas(id) ON DELETE CASCADE,
  platform text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES ideas(id) ON DELETE CASCADE,
  path_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generated ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ideas"
  ON ideas FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert ideas"
  ON ideas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update ideas"
  ON ideas FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view research results"
  ON research_results FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert research results"
  ON research_results FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view project plans"
  ON project_plans FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert project plans"
  ON project_plans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view content"
  ON content_generated FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert content"
  ON content_generated FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view learning paths"
  ON learning_paths FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert learning paths"
  ON learning_paths FOR INSERT
  WITH CHECK (true);