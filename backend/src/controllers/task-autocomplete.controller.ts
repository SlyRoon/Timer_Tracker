import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { TaskAutocompleteService } from '../services/task-autocomplete.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type { TaskSuggestionQuery } from '../shared/types/service.types.js';

export const TaskAutocompleteController = {
  searchTaskSuggestions: asyncHandler(async (req, res) => {
    const suggestions = await TaskAutocompleteService.searchTaskSuggestions(
      req.query as TaskSuggestionQuery,
    );

    return sendSuccess(res, suggestions);
  }),

  getRecentTaskNames: asyncHandler(async (req, res) => {
    const { limit } = req.query as Pick<TaskSuggestionQuery, 'limit'>;
    const taskNames = await TaskAutocompleteService.getRecentTaskNames(limit);

    return sendSuccess(res, taskNames);
  }),
};
