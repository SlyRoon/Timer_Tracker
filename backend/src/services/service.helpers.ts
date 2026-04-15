import { ServiceError } from '../shared/errors/service-error.js';
import type {
  ServiceTimeEntry,
  TimeEntriesSummary,
} from '../shared/types/service.types.js';

interface TimeEntryLike {
  _id: unknown;
  taskName: string;
  projectId: unknown;
  startTime: Date;
  endTime: Date | null;
  durationMinutes: number;
  entryDate: Date;
}

const MS_PER_MINUTE = 60 * 1000;

export const normalizeRequiredText = (value: string, fieldName: string) => {
  const normalized = value.trim();

  if (!normalized) {
    throw new ServiceError('VALIDATION_ERROR', `${fieldName} is required`);
  }

  return normalized;
};

export const getStartOfDay = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  return start;
};

export const getEndOfDay = (date: Date) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return end;
};

export const getDayRange = (date = new Date()) => ({
  from: getStartOfDay(date),
  to: getEndOfDay(date),
});

export const getWeekRange = (date = new Date()) => {
  const start = getStartOfDay(date);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);

  const end = getEndOfDay(start);
  end.setDate(start.getDate() + 6);

  return { from: start, to: end };
};

export const getMonthRange = (date = new Date()) => {
  const from = getStartOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
  const to = getEndOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));

  return { from, to };
};

export const calculateDurationMinutes = (startTime: Date, endTime: Date) => {
  if (endTime.getTime() < startTime.getTime()) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'End time cannot be earlier than start time',
    );
  }

  return Math.max(
    0,
    Math.round((endTime.getTime() - startTime.getTime()) / MS_PER_MINUTE),
  );
};

export const toServiceTimeEntry = (
  entry: TimeEntryLike,
): ServiceTimeEntry => ({
  id: String(entry._id),
  taskName: entry.taskName,
  projectId: String(entry.projectId),
  startTime: entry.startTime,
  endTime: entry.endTime,
  durationMinutes: entry.durationMinutes,
  entryDate: entry.entryDate,
});

export const summarizeEntries = (
  entries: TimeEntryLike[],
): TimeEntriesSummary => {
  const groups = new Map<string, ServiceTimeEntry[]>();

  for (const entry of entries) {
    const view = toServiceTimeEntry(entry);
    const current = groups.get(view.projectId) ?? [];
    current.push(view);
    groups.set(view.projectId, current);
  }

  const groupedEntries = [...groups.entries()].map(([projectId, groupEntries]) => ({
    projectId,
    entries: groupEntries,
    totalDurationMinutes: groupEntries.reduce(
      (total, entry) => total + entry.durationMinutes,
      0,
    ),
  }));

  return {
    groups: groupedEntries,
    totalDurationMinutes: groupedEntries.reduce(
      (total, group) => total + group.totalDurationMinutes,
      0,
    ),
  };
};
