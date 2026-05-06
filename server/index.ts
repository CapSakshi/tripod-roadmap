import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
import authRoutes from './routes/auth';
// @ts-ignore
import roadmapRoutes from './routes/roadmaps';
// @ts-ignore
import progressRoutes from './routes/progress';
// @ts-ignore
import quizRoutes from './routes/quiz';
// @ts-ignore
import userRoadmapRoutes from './routes/userRoadmaps';
// @ts-ignore
import chatRoutes from './routes/chat';

const app = express();

// Ensure uploads directory exists safely
const uploadDir = path.join(__dirname, 'uploads/thumbnails');
try {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
} catch (err) {
  console.warn('Could not create uploads dir (running in serverless environment)');
}

// CORS — strip trailing slash to avoid mismatch
const allowedOrigin = (process.env.CLIENT_URL || 'http://localhost:3000').replace(/\/+$/, '');
console.log('🔒 CORS allowed origin:', allowedOrigin);
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/roadmap', userRoadmapRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/health', (req: Request, res: Response) => res.json({ status: 'OK', message: 'Tripod Roadmap API running' }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tripod-roadmap';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', (err as Error).message);
  });

export default app;

