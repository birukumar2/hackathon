import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Idea = {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  category: 'research' | 'startup' | 'content' | 'learning' | 'project';
  status: 'pending' | 'researching' | 'planned' | 'completed';
  created_at: string;
  updated_at: string;
};

export type ResearchResult = {
  id: string;
  idea_id: string;
  content: string;
  sources: Array<{ title: string; url: string }>;
  created_at: string;
};

export type ProjectPlan = {
  id: string;
  idea_id: string;
  plan_data: {
    phases: Array<{
      name: string;
      tasks: string[];
      duration: string;
    }>;
  };
  created_at: string;
};

export type ContentGenerated = {
  id: string;
  idea_id: string;
  platform: 'linkedin' | 'instagram' | 'twitter';
  content: string;
  created_at: string;
};

export type LearningPath = {
  id: string;
  idea_id: string;
  path_data: {
    courses: Array<{
      title: string;
      topics: string[];
      duration: string;
    }>;
  };
  created_at: string;
};
