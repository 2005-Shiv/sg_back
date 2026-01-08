import { Request, Response } from 'express';
import { createMemory, getUserMemories } from '../services/memory.services';

/**
 * POST /memory
 * Create a new memory for the authenticated user
 */
export async function addMemory(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required' });
    }

    const memory = await createMemory(req.user.id, content);

    return res.status(201).json({ memory });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create memory' });
  }
}

/**
 * GET /memory
 * Fetch all memories of the authenticated user
 */
export async function listMemories(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const memories = await getUserMemories(req.user.id);

    return res.status(200).json({ memories });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch memories' });
  }
}
