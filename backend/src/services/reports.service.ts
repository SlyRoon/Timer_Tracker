import { TimeEntryRepository } from '../repositories/time-entry.repository.js';
import type { DateRange } from '../shared/types/repository.types.js';
import type {
  PeriodReportRequest,
  ReportPeriod,
  ReportRequest,
  ReportResult,
} from '../shared/types/service.types.js';
import {
  getDayRange,
  getMonthRange,
  getWeekRange,
  summarizeEntries,
} from './service.helpers.js';

const buildReport = async (range: DateRange) => {
  const entries = await TimeEntryRepository.findForReportsByDateRange(range);
  const summary = summarizeEntries(entries);

  return {
    range,
    ...summary,
  };
};

const getRangeForPeriod = (period: ReportPeriod, date?: Date) => {
  switch (period) {
    case 'day':
      return getDayRange(date);
    case 'week':
      return getWeekRange(date);
    case 'month':
      return getMonthRange(date);
  }
};

const escapeCsvValue = (value: string | number | Date | null) => {
  const stringValue =
    value instanceof Date ? value.toISOString() : String(value ?? '');

  if (/[",\r\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const buildCsv = (report: ReportResult) => {
  const header = [
    'projectId',
    'taskName',
    'startTime',
    'endTime',
    'durationMinutes',
    'entryDate',
  ];
  const rows = report.groups.flatMap((group) =>
    group.entries.map((entry) => [
      group.projectId,
      entry.taskName,
      entry.startTime,
      entry.endTime,
      entry.durationMinutes,
      entry.entryDate,
    ]),
  );

  return [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');
};

export const ReportsService = {
  getReport(input: PeriodReportRequest) {
    return buildReport(getRangeForPeriod(input.period, input.date));
  },

  getDayReport(input: ReportRequest = {}) {
    return buildReport(getDayRange(input.date));
  },

  getWeekReport(input: ReportRequest = {}) {
    return buildReport(getWeekRange(input.date));
  },

  getMonthReport(input: ReportRequest = {}) {
    return buildReport(getMonthRange(input.date));
  },

  async exportCsv(input: PeriodReportRequest) {
    const report = await buildReport(
      getRangeForPeriod(input.period, input.date),
    );

    return buildCsv(report);
  },
};
