import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { ReportsService } from '../services/reports.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type {
  CsvExportRequest,
  PeriodReportRequest,
  ReportRequest,
} from '../shared/types/service.types.js';

export const ReportsController = {
  getReport: asyncHandler(async (req, res) => {
    const report = await ReportsService.getReport(
      req.query as unknown as PeriodReportRequest,
    );

    return sendSuccess(res, report);
  }),

  getDayReport: asyncHandler(async (req, res) => {
    const report = await ReportsService.getDayReport(
      req.query as ReportRequest,
    );

    return sendSuccess(res, report);
  }),

  getWeekReport: asyncHandler(async (req, res) => {
    const report = await ReportsService.getWeekReport(
      req.query as ReportRequest,
    );

    return sendSuccess(res, report);
  }),

  getMonthReport: asyncHandler(async (req, res) => {
    const report = await ReportsService.getMonthReport(
      req.query as ReportRequest,
    );

    return sendSuccess(res, report);
  }),

  exportCsv: asyncHandler(async (req, res) => {
    const input = req.query as unknown as CsvExportRequest;
    const csv = await ReportsService.exportCsv(input);
    const datePart = (input.date ?? new Date()).toISOString().slice(0, 10);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="time-tracker-${input.period}-${datePart}.csv"`,
    );

    return res.status(200).send(csv);
  }),
};
