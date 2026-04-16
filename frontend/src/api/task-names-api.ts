import type { TaskName } from '../types';
import { requestData } from './http-client';

interface TaskNameResponse extends Omit<TaskName, 'id'> {
  _id?: string;
  id?: string;
}

const toTaskName = (taskName: TaskNameResponse): TaskName => ({
  id: taskName.id ?? taskName._id ?? taskName.value,
  value: taskName.value,
  lastUsedAt: taskName.lastUsedAt,
});

export async function getTaskSuggestions(query: string, limit = 8) {
  const params = new URLSearchParams({
    limit: String(limit),
  });
  const normalizedQuery = query.trim();

  if (normalizedQuery) {
    params.set('query', normalizedQuery);
  }

  const suggestions = await requestData<TaskNameResponse[]>(
    `/task-names/suggestions?${params.toString()}`,
  );

  return suggestions.map(toTaskName);
}
