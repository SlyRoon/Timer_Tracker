import { Router } from 'express';
import { TaskAutocompleteController } from '../controllers/task-autocomplete.controller.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  recentTaskNamesSchema,
  taskSuggestionsSchema,
} from '../validators/task-autocomplete.validators.js';

export const taskNamesRouter = Router();

taskNamesRouter.get(
  '/suggestions',
  validateRequest(taskSuggestionsSchema),
  TaskAutocompleteController.searchTaskSuggestions,
);
taskNamesRouter.get(
  '/recent',
  validateRequest(recentTaskNamesSchema),
  TaskAutocompleteController.getRecentTaskNames,
);
