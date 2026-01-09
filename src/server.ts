import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import memoryRoutes from './routes/memory.routes';
import voiceRoutes from './routes/voice.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/memory', memoryRoutes);
app.use('/voice', voiceRoutes);
app.use('/auth', authRoutes);

app.get("/health", (_, res) => res.send("OK"));

const PORT = env.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
