export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskName {
  id: string;
  value: string;
  lastUsedAt: string;
}

export interface TimeEntry {
  id: string;
  taskName: string;
  projectId: string;
  startTime: string;
  endTime: string | null;
  durationMinutes: number;
  entryDate: string;
}

export interface TodayEntryGroup {
  projectId: string;
  totalDurationMinutes: number;
  entries: TimeEntry[];
}

export interface ProjectTotal {
  projectId: string;
  totalDurationMinutes: number;
}

export interface StartTimerPayload {
  taskName: string;
  projectId: string;
}

export interface UpdateEntryTaskNamePayload {
  taskName: string;
}

export interface UpdateEntryProjectPayload {
  projectId: string;
}

export interface UpdateEntryManualTimePayload {
  startTime?: string;
  endTime?: string | null;
  durationMinutes?: number;
  entryDate?: string;
}

export type ReportPeriod = 'day' | 'week' | 'month';

export interface DateRange {
  from: string;
  to: string;
}

export interface ReportGroup {
  projectId: string;
  totalDurationMinutes: number;
  entries: TimeEntry[];
}

export interface ReportResult {
  range: DateRange;
  totalDurationMinutes: number;
  groups: ReportGroup[];
}

export type PeriodReport = ReportResult;
