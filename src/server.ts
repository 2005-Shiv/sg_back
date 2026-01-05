import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'OK' });
});

app.get('/protected', authMiddleware, (req, res) => {
    const user = (req as any).user;
    res.json({
        message: 'You are authenticated',
        user_id: user.id,
        email: user.email
    });
});

const PORT = env.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
