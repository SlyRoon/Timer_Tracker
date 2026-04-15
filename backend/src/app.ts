import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import {
  healthRouter,
  projectsRouter,
  reportsRouter,
  taskNamesRouter,
  timeEntriesRouter,
  timerRouter,
} from './routes/index.js';

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';

export const app = express();

app.use(
  cors({
    origin: clientUrl,
  }),
);
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/timer', timerRouter);
app.use('/api/time-entries', timeEntriesRouter);
app.use('/api/task-names', taskNamesRouter);
app.use('/api/reports', reportsRouter);

app.use(errorHandler);
