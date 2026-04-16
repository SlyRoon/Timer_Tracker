import { TaskNameRepository } from '../repositories/task-name.repository.js';
import type {
  TaskNameSuggestion,
  TaskSuggestionQuery,
} from '../shared/types/service.types.js';

interface TaskNameLike {
  _id: unknown;
  value: string;
  lastUsedAt: Date;
}

const toTaskNameSuggestion = (taskName: TaskNameLike): TaskNameSuggestion => ({
  id: String(taskName._id),
  value: taskName.value,
  lastUsedAt: taskName.lastUsedAt,
});

export const TaskAutocompleteService = {
  async searchTaskSuggestions(input: TaskSuggestionQuery = {}) {
    const query = input.query?.trim() ?? '';

    if (!query) {
      const recentTaskNames = await TaskNameRepository.findRecent(input.limit);

      return recentTaskNames.map(toTaskNameSuggestion);
    }

    const matchingTaskNames = await TaskNameRepository.searchByValue(
      query,
      input.limit,
    );

    return matchingTaskNames.map(toTaskNameSuggestion);
  },

  async getRecentTaskNames(limit?: number) {
    const taskNames = await TaskNameRepository.findRecent(limit);

    return taskNames.map(toTaskNameSuggestion);
  },
};
