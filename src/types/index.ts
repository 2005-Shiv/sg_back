import { User } from '@supabase/supabase-js';

/**
 * Minimal user shape we allow to flow through the app
 * Never expose full Supabase user object blindly
 */
export interface AuthUser {
  id: string;
  email: string | null;
}

/**
 * Helper to map Supabase user → AuthUser
 */
export function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email || null
  };
}

/**
 * Extend Express Request interface safely
 */
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
