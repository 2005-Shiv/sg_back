import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Invalid Authorization format' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // attach user safely
    (req as any).user = data.user;

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Auth middleware failed' });
  }
}
