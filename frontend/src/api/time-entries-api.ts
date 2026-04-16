import type {
  ProjectTotal,
  TimeEntry,
  TodayEntryGroup,
  UpdateEntryManualTimePayload,
  UpdateEntryProjectPayload,
  UpdateEntryTaskNamePayload,
} from '../types';
import { requestData } from './http-client';

interface TimeEntryResponse extends Omit<TimeEntry, 'id'> {
  _id?: string;
  id?: string;
}

interface TodayEntryGroupResponse extends Omit<TodayEntryGroup, 'entries'> {
  entries: TimeEntryResponse[];
}

const toTimeEntry = (entry: TimeEntryResponse): TimeEntry => ({
  id: entry.id ?? entry._id ?? '',
  taskName: entry.taskName,
  projectId: entry.projectId,
  startTime: entry.startTime,
  endTime: entry.endTime,
  durationMinutes: entry.durationMinutes,
  entryDate: entry.entryDate,
});

const toTodayEntryGroup = (
  group: TodayEntryGroupResponse,
): TodayEntryGroup => ({
  projectId: group.projectId,
  totalDurationMinutes: group.totalDurationMinutes,
  entries: group.entries.map(toTimeEntry),
});

function withDateParam(path: string, date?: string) {
  if (!date) {
    return path;
  }

  const params = new URLSearchParams({ date });

  return `${path}?${params.toString()}`;
}

export async function getTodayEntries(date?: string) {
  const entries = await requestData<TimeEntryResponse[]>(
    withDateParam('/time-entries/today', date),
  );

  return entries.map(toTimeEntry);
}

export async function getTodayEntryGroups(date?: string) {
  const groups = await requestData<TodayEntryGroupResponse[]>(
    withDateParam('/time-entries/today/grouped', date),
  );

  return groups.map(toTodayEntryGroup);
}

export async function getTodayProjectTotals(date?: string) {
  return requestData<ProjectTotal[]>(
    withDateParam('/time-entries/today/totals', date),
  );
}

export async function updateEntryTaskName(
  entryId: string,
  payload: UpdateEntryTaskNamePayload,
) {
  const entry = await requestData<TimeEntryResponse>(
    `/time-entries/${entryId}/task-name`,
    {
      body: payload,
      method: 'PATCH',
    },
  );

  return toTimeEntry(entry);
}

export async function updateEntryProject(
  entryId: string,
  payload: UpdateEntryProjectPayload,
) {
  const entry = await requestData<TimeEntryResponse>(
    `/time-entries/${entryId}/project`,
    {
      body: payload,
      method: 'PATCH',
    },
  );

  return toTimeEntry(entry);
}

export async function updateEntryManualTime(
  entryId: string,
  payload: UpdateEntryManualTimePayload,
) {
  const entry = await requestData<TimeEntryResponse>(
    `/time-entries/${entryId}/manual-time`,
    {
      body: payload,
      method: 'PATCH',
    },
  );

  return toTimeEntry(entry);
}

export async function deleteTimeEntry(entryId: string) {
  const entry = await requestData<TimeEntryResponse>(
    `/time-entries/${entryId}`,
    {
      method: 'DELETE',
    },
  );

  return toTimeEntry(entry);
}
