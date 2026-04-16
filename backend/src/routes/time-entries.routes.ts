import { Router } from 'express';
import { TodayEntriesController } from '../controllers/today-entries.controller.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  deleteEntrySchema,
  getTodayEntriesSchema,
  updateEntryProjectSchema,
  updateEntryTaskNameSchema,
  updateManualTimeSchema,
} from '../validators/today-entries.validators.js';

export const timeEntriesRouter = Router();

timeEntriesRouter.get(
  '/today',
  validateRequest(getTodayEntriesSchema),
  TodayEntriesController.getTodayEntries,
);
timeEntriesRouter.get(
  '/today/grouped',
  validateRequest(getTodayEntriesSchema),
  TodayEntriesController.groupEntriesByProject,
);
timeEntriesRouter.get(
  '/today/totals',
  validateRequest(getTodayEntriesSchema),
  TodayEntriesController.calculateTotalsByProject,
);
timeEntriesRouter.patch(
  '/:id/task-name',
  validateRequest(updateEntryTaskNameSchema),
  TodayEntriesController.updateTaskName,
);
timeEntriesRouter.patch(
  '/:id/project',
  validateRequest(updateEntryProjectSchema),
  TodayEntriesController.updateProject,
);
timeEntriesRouter.patch(
  '/:id/manual-time',
  validateRequest(updateManualTimeSchema),
  TodayEntriesController.updateManualTime,
);
timeEntriesRouter.delete(
  '/:id',
  validateRequest(deleteEntrySchema),
  TodayEntriesController.deleteEntry,
);
