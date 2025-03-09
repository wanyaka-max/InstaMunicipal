import { createClient } from "@supabase/supabase-js";

// Use environment variables for Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that the URL and key are provided
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Anon Key. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
