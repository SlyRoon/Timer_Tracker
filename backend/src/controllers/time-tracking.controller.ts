import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { TimeTrackingService } from '../services/time-tracking.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type {
  StartTimerInput,
  StopTimerInput,
} from '../shared/types/service.types.js';

export const TimeTrackingController = {
  startTimer: asyncHandler(async (req, res) => {
    const timeEntry = await TimeTrackingService.startTimer(
      req.body as StartTimerInput,
    );

    return sendSuccess(res, timeEntry, 201);
  }),

  stopTimer: asyncHandler(async (req, res) => {
    const timeEntry = await TimeTrackingService.stopTimer(
      req.body as StopTimerInput,
    );

    return sendSuccess(res, timeEntry);
  }),

  getActiveTimer: asyncHandler(async (_req, res) => {
    const activeTimer = await TimeTrackingService.getActiveTimer();

    return sendSuccess(res, activeTimer);
  }),
};
