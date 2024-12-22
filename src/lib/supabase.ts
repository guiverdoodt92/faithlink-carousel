import { createClient } from '@supabase/supabase-js';
import type { Post } from '@/types/database';

const supabaseUrl = 'https://rukeqkqpdplastrgvtdx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a2Vxa3FwZHBsYXN0cmd2dGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjkyOTcsImV4cCI6MjA1MDMwNTI5N30.2WYRB_4IMqenJrwbk2KCf_mI9kymaKj8gvhhnGqMCwY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
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
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
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

export async function createPost(content: string, images?: string[]) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('User not authenticated');

  try {
    const { error } = await supabase
      .from('posts')
      .insert({
        author: user.data.user.id,
        content,
        images,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
}