import { TaskNameRepository } from '../repositories/task-name.repository.js';
import type { TaskSuggestionQuery } from '../shared/types/service.types.js';

export const TaskAutocompleteService = {
  searchTaskSuggestions(input: TaskSuggestionQuery = {}) {
    const query = input.query?.trim() ?? '';

    if (!query) {
      return TaskNameRepository.findRecent(input.limit);
    }

    return TaskNameRepository.searchByValue(query, input.limit);
  },

  getRecentTaskNames(limit?: number) {
    return TaskNameRepository.findRecent(limit);
  },
};
