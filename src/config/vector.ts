import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const vectorDb = createClient(
    env.supabaseUrl,
    env.supabaseServiceRoleKey
);