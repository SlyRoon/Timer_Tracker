import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { ReportsService } from '../services/reports.service.js';
import { sendSuccess } from '../shared/http/responses.js';
import type { ReportRequest } from '../shared/types/service.types.js';

export const ReportsController = {
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
};
