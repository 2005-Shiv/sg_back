import { supabase } from '../config/supabase';

export interface Memory {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

/**
 * Create a new memory for a user
 */
export async function createMemory(
  userId: string,
  content: string
): Promise<Memory> {
  const { data, error } = await supabase
    .from('memories')
    .insert({
      user_id: userId,
      content
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Fetch all memories of a user (latest first)
 */
export async function getUserMemories(
  userId: string
): Promise<Memory[]> {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
