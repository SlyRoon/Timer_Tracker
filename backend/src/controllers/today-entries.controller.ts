import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { TodayEntriesService } from '../services/today-entries.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type {
  UpdateEntryManualTimeInput,
  UpdateEntryProjectInput,
  UpdateEntryTaskNameInput,
} from '../shared/types/service.types.js';

interface DateQuery {
  date?: Date;
}

export const TodayEntriesController = {
  getTodayEntries: asyncHandler(async (req, res) => {
    const { date } = req.query as DateQuery;
    const entries = await TodayEntriesService.getTodayEntries(date);

    return sendSuccess(res, entries);
  }),

  updateTaskName: asyncHandler(async (req, res) => {
    const timeEntry = await TodayEntriesService.updateTaskName({
      ...(req.body as Omit<UpdateEntryTaskNameInput, 'entryId'>),
      entryId: req.params.entryId,
    });

    return sendSuccess(res, timeEntry);
  }),

  updateProject: asyncHandler(async (req, res) => {
    const timeEntry = await TodayEntriesService.updateProject({
      ...(req.body as Omit<UpdateEntryProjectInput, 'entryId'>),
      entryId: req.params.entryId,
    });

    return sendSuccess(res, timeEntry);
  }),

  updateManualTime: asyncHandler(async (req, res) => {
    const timeEntry = await TodayEntriesService.updateManualTime({
      ...(req.body as Omit<UpdateEntryManualTimeInput, 'entryId'>),
      entryId: req.params.entryId,
    });

    return sendSuccess(res, timeEntry);
  }),

  deleteEntry: asyncHandler(async (req, res) => {
    const timeEntry = await TodayEntriesService.deleteEntry(req.params.entryId);

    return sendSuccess(res, timeEntry);
  }),

  groupEntriesByProject: asyncHandler(async (req, res) => {
    const { date } = req.query as DateQuery;
    const groups = await TodayEntriesService.groupEntriesByProject(date);

    return sendSuccess(res, groups);
  }),

  calculateTotalsByProject: asyncHandler(async (req, res) => {
    const { date } = req.query as DateQuery;
    const totals = await TodayEntriesService.calculateTotalsByProject(date);

    return sendSuccess(res, totals);
  }),
};
