-- Lobe AI Database Schema
-- Waitlist table for marketing signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for waitlist form)
CREATE POLICY "Allow anonymous waitlist signups" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Dreams table for user dream completions
CREATE TABLE IF NOT EXISTS dreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  narrative TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

-- Users can only see their own dreams
CREATE POLICY "Users can view own dreams" ON dreams
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own dreams
CREATE POLICY "Users can insert own dreams" ON dreams
  FOR INSERT WITH CHECK (auth.uid() = user_id);
