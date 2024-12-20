import { createClient } from '@supabase/supabase-js';

// Get the URL and anon key from your Supabase project settings
const supabaseUrl = 'https://rlxqmjsqjvxbfvvhvvvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJseHFtanNxanZ4YmZ2dmh2dnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTI2NzAsImV4cCI6MjAyNTIyODY3MH0.Hs_Kq_4rz8e5WRUvZE6ckjtqXIzx4JCZCkR_oqkPrYY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data;
}

export async function likePost(postId: string, currentLikes: number) {
  const { error } = await supabase
    .from('posts')
    .update({ likes: currentLikes + 1 })
    .eq('id', postId);

  if (error) throw error;
}