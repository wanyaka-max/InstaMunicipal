-- Create AI interactions table to store user-AI conversations
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  department_context TEXT,
  sentiment FLOAT,
  tags TEXT[]
);

-- Enable Row Level Security
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own AI interactions" ON ai_interactions;
CREATE POLICY "Users can view their own AI interactions"
  ON ai_interactions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own AI interactions" ON ai_interactions;
CREATE POLICY "Users can insert their own AI interactions"
  ON ai_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS ai_interactions_user_id_idx ON ai_interactions(user_id);
CREATE INDEX IF NOT EXISTS ai_interactions_created_at_idx ON ai_interactions(created_at);

-- Enable realtime for AI interactions
alter publication supabase_realtime add table ai_interactions;
