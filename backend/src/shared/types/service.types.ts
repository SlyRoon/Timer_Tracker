import type { DateRange, EntityId } from './repository.types.js';

export interface CreateProjectInput {
  name: string;
  color: string;
}

export interface UpdateProjectInput {
  name?: string;
  color?: string;
}

export interface StartTimerInput {
  taskName: string;
  projectId: EntityId;
  startTime?: Date;
  entryDate?: Date;
}

export interface StopTimerInput {
  endTime?: Date;
}

export interface UpdateEntryTaskNameInput {
  entryId: EntityId;
  taskName: string;
}

export interface UpdateEntryProjectInput {
  entryId: EntityId;
  projectId: EntityId;
}

export interface UpdateEntryManualTimeInput {
  entryId: EntityId;
  startTime?: Date;
  endTime?: Date | null;
  durationMinutes?: number;
  entryDate?: Date;
}

export interface TaskSuggestionQuery {
  query?: string;
  limit?: number;
}

export interface TaskNameSuggestion {
  id: string;
  value: string;
  lastUsedAt: Date;
}

export type ReportPeriod = 'day' | 'week' | 'month';

export interface ReportRequest {
  date?: Date;
}

export interface PeriodReportRequest extends ReportRequest {
  period: ReportPeriod;
}

export interface CsvExportRequest extends PeriodReportRequest {
  format: 'csv';
}

export interface ServiceTimeEntry {
  id: string;
  taskName: string;
  projectId: string;
  startTime: Date;
  endTime: Date | null;
  durationMinutes: number;
  entryDate: Date;
}

export interface ProjectEntriesGroup {
  projectId: string;
  totalDurationMinutes: number;
  entries: ServiceTimeEntry[];
}

export interface ProjectTotal {
  projectId: string;
  totalDurationMinutes: number;
}

export interface TimeEntriesSummary {
  totalDurationMinutes: number;
  groups: ProjectEntriesGroup[];
}

export interface ReportResult extends TimeEntriesSummary {
  range: DateRange;
}
