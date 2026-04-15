import { Router } from 'express';
import { TimeTrackingController } from '../controllers/time-tracking.controller.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  startTimerSchema,
  stopTimerSchema,
} from '../validators/timer.validators.js';

export const timerRouter = Router();

timerRouter.post(
  '/start',
  validateRequest(startTimerSchema),
  TimeTrackingController.startTimer,
);
timerRouter.post(
  '/stop',
  validateRequest(stopTimerSchema),
  TimeTrackingController.stopTimer,
);
timerRouter.get('/active', TimeTrackingController.getActiveTimer);
