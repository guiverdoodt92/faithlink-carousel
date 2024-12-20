import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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