import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';

dotenv.config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
