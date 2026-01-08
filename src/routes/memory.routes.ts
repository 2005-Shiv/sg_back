import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { addMemory, listMemories } from '../controllers/memory.controller';

const router = Router();

/**
 * POST /memory
 * Create a new memory
 */
router.post('/', authMiddleware, addMemory);

/**
 * GET /memory
 * List all memories of the user
 */
router.get('/', authMiddleware, listMemories);

export default router;
