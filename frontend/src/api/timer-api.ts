import type { StartTimerPayload, TimeEntry } from '../types';
import { requestData } from './http-client';

interface TimeEntryResponse extends Omit<TimeEntry, 'id'> {
  _id?: string;
  id?: string;
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

export async function getActiveTimer() {
  const activeTimer = await requestData<TimeEntryResponse | null>(
    '/timer/active',
  );

  return activeTimer ? toTimeEntry(activeTimer) : null;
}

export async function startTimer(payload: StartTimerPayload) {
  const timeEntry = await requestData<TimeEntryResponse>('/timer/start', {
    body: payload,
    method: 'POST',
  });

  return toTimeEntry(timeEntry);
}

export async function stopTimer() {
  const timeEntry = await requestData<TimeEntryResponse>('/timer/stop', {
    body: {},
    method: 'POST',
  });

  return toTimeEntry(timeEntry);
}
