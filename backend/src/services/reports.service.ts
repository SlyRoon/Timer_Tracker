import { TimeEntryRepository } from '../repositories/time-entry.repository.js';
import type { DateRange } from '../shared/types/repository.types.js';
import type { ReportRequest } from '../shared/types/service.types.js';
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

export const ReportsService = {
  getDayReport(input: ReportRequest = {}) {
    return buildReport(getDayRange(input.date));
  },

  getWeekReport(input: ReportRequest = {}) {
    return buildReport(getWeekRange(input.date));
  },

  getMonthReport(input: ReportRequest = {}) {
    return buildReport(getMonthRange(input.date));
  },
};
