import { createClient } from '@supabase/supabase-js';
import type { Post } from '@/types/database';

// Get the URL and anon key from your Supabase project settings
const supabaseUrl = 'https://rlxqmjsqjvxbfvvhvvvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJseHFtanNxanZ4YmZ2dmh2dnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTI2NzAsImV4cCI6MjAyNTIyODY3MH0.Hs_Kq_4rz8e5WRUvZE6ckjtqXIzx4JCZCkR_oqkPrYY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  }
});

export async function fetchPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    return [];
  }
}

export async function likePost(postId: string, currentLikes: number) {
  try {
    const { error } = await supabase
      .from('posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', postId);

    if (error) throw error;
  } catch (error) {
    console.error('Error in likePost:', error);
    throw error;
  }
}