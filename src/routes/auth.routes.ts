import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getMe } from '../controllers/auth.controller';

const router = Router();

/**
 * GET /auth/me
 * Protected route – returns current user
 */
router.get('/me', authMiddleware, getMe);

export default router;
