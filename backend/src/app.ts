import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { healthRouter } from './routes/health.routes.js';

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';

export const app = express();

app.use(
  cors({
    origin: clientUrl,
  }),
);
app.use(express.json());

app.use('/api', healthRouter);

app.use(errorHandler);
