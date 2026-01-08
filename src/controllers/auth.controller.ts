import { Request, Response } from 'express';

/**
 * GET /auth/me
 * Returns the currently authenticated user
 */
export function getMe(req: Request, res: Response) {
  // authMiddleware guarantees req.user exists
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(200).json({
    user: req.user
  });
}
