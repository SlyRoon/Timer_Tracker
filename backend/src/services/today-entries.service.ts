import {
  ProjectRepository,
  TaskNameRepository,
  TimeEntryRepository,
} from '../repositories/index.js';
import { ServiceError } from '../shared/errors/service-error.js';
import type { EntityId } from '../shared/types/repository.types.js';
import type {
  ProjectTotal,
  UpdateEntryManualTimeInput,
  UpdateEntryProjectInput,
  UpdateEntryTaskNameInput,
} from '../shared/types/service.types.js';
import {
  calculateDurationMinutes,
  getStartOfDay,
  normalizeRequiredText,
  summarizeEntries,
  toServiceTimeEntry,
} from './service.helpers.js';

const trackTaskNameUsage = async (taskName: string) => {
  const usedAt = new Date();
  const existingTaskName = await TaskNameRepository.findByValue(taskName);

  if (existingTaskName) {
    await TaskNameRepository.updateLastUsedAt(taskName, usedAt);
    return;
  }

  await TaskNameRepository.create({
    value: taskName,
    lastUsedAt: usedAt,
  });
};

export const TodayEntriesService = {
  async getTodayEntries(date = new Date()) {
    const entries = await TimeEntryRepository.findTodayEntries(date);

    return entries.map(toServiceTimeEntry);
  },

  async updateTaskName(input: UpdateEntryTaskNameInput) {
    const taskName = normalizeRequiredText(input.taskName, 'Task name');
    const updatedEntry = await TimeEntryRepository.updateById(input.entryId, {
      taskName,
    });

    if (!updatedEntry) {
      throw new ServiceError('NOT_FOUND', 'Time entry not found');
    }

    await trackTaskNameUsage(taskName);

    return toServiceTimeEntry(updatedEntry);
  },

  async updateProject(input: UpdateEntryProjectInput) {
    const project = await ProjectRepository.findById(input.projectId);

    if (!project) {
      throw new ServiceError('NOT_FOUND', 'Project not found');
    }

    const updatedEntry = await TimeEntryRepository.updateById(input.entryId, {
      projectId: input.projectId,
    });

    if (!updatedEntry) {
      throw new ServiceError('NOT_FOUND', 'Time entry not found');
    }

    return toServiceTimeEntry(updatedEntry);
  },

  async updateManualTime(input: UpdateEntryManualTimeInput) {
    const currentEntry = await TimeEntryRepository.findById(input.entryId);

    if (!currentEntry) {
      throw new ServiceError('NOT_FOUND', 'Time entry not found');
    }

    const startTime = input.startTime ?? currentEntry.startTime;
    const endTime =
      input.endTime !== undefined ? input.endTime : currentEntry.endTime;

    if (input.durationMinutes !== undefined && input.durationMinutes < 0) {
      throw new ServiceError(
        'VALIDATION_ERROR',
        'Duration minutes cannot be negative',
      );
    }

    const recalculatedDuration =
      endTime !== null && endTime !== undefined
        ? calculateDurationMinutes(startTime, endTime)
        : undefined;

    const durationMinutes =
      input.durationMinutes ??
      recalculatedDuration ??
      currentEntry.durationMinutes;

    const updatedEntry = await TimeEntryRepository.updateById(input.entryId, {
      startTime,
      endTime,
      durationMinutes,
      entryDate:
        input.entryDate ??
        (input.startTime ? getStartOfDay(startTime) : currentEntry.entryDate),
    });

    if (!updatedEntry) {
      throw new ServiceError('NOT_FOUND', 'Time entry not found');
    }

    return toServiceTimeEntry(updatedEntry);
  },

  async deleteEntry(entryId: EntityId) {
    const deletedEntry = await TimeEntryRepository.deleteById(entryId);

    if (!deletedEntry) {
      throw new ServiceError('NOT_FOUND', 'Time entry not found');
    }

    return toServiceTimeEntry(deletedEntry);
  },

  async groupEntriesByProject(date = new Date()) {
    const entries = await TimeEntryRepository.findTodayEntries(date);

    return summarizeEntries(entries).groups;
  },

  async calculateTotalsByProject(date = new Date()): Promise<ProjectTotal[]> {
    const entries = await TimeEntryRepository.findTodayEntries(date);
    const groups = summarizeEntries(entries).groups;

    return groups.map((group) => ({
      projectId: group.projectId,
      totalDurationMinutes: group.totalDurationMinutes,
    }));
  },
};
