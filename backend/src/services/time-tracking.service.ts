import {
  ProjectRepository,
  TaskNameRepository,
  TimeEntryRepository,
} from '../repositories/index.js';
import { ServiceError } from '../shared/errors/service-error.js';
import type {
  StartTimerInput,
  StopTimerInput,
} from '../shared/types/service.types.js';
import {
  calculateDurationMinutes,
  getStartOfDay,
  normalizeRequiredText,
} from './service.helpers.js';

const trackTaskNameUsage = async (taskName: string, usedAt: Date) => {
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

export const TimeTrackingService = {
  async startTimer(input: StartTimerInput) {
    const taskName = normalizeRequiredText(input.taskName, 'Task name');
    const project = await ProjectRepository.findById(input.projectId);

    if (!project) {
      throw new ServiceError('NOT_FOUND', 'Project not found');
    }

    const activeEntry = await TimeEntryRepository.findActive();

    if (activeEntry) {
      throw new ServiceError('CONFLICT', 'Active timer already exists');
    }

    const startTime = input.startTime ?? new Date();
    const entryDate = input.entryDate ?? getStartOfDay(startTime);

    await trackTaskNameUsage(taskName, startTime);

    return TimeEntryRepository.create({
      taskName,
      projectId: input.projectId,
      startTime,
      endTime: null,
      durationMinutes: 0,
      entryDate,
    });
  },

  async stopTimer(input: StopTimerInput = {}) {
    const activeEntry = await TimeEntryRepository.findActive();

    if (!activeEntry) {
      throw new ServiceError('NOT_FOUND', 'Active timer not found');
    }

    const endTime = input.endTime ?? new Date();
    const durationMinutes = calculateDurationMinutes(
      activeEntry.startTime,
      endTime,
    );

    const stoppedEntry = await TimeEntryRepository.updateById(
      String(activeEntry._id),
      {
        endTime,
        durationMinutes,
      },
    );

    if (!stoppedEntry) {
      throw new ServiceError('NOT_FOUND', 'Active timer not found');
    }

    await trackTaskNameUsage(stoppedEntry.taskName, endTime);

    return stoppedEntry;
  },

  getActiveTimer() {
    return TimeEntryRepository.findActive();
  },
};
