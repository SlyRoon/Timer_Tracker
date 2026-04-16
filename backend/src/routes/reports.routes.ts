import { Router } from 'express';
import { ReportsController } from '../controllers/reports.controller.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  csvExportSchema,
  reportByDateSchema,
  reportByPeriodSchema,
} from '../validators/reports.validators.js';

export const reportsRouter = Router();

reportsRouter.get(
  '/',
  validateRequest(reportByPeriodSchema),
  ReportsController.getReport,
);
reportsRouter.get(
  '/export',
  validateRequest(csvExportSchema),
  ReportsController.exportCsv,
);
reportsRouter.get(
  '/day',
  validateRequest(reportByDateSchema),
  ReportsController.getDayReport,
);
reportsRouter.get(
  '/week',
  validateRequest(reportByDateSchema),
  ReportsController.getWeekReport,
);
reportsRouter.get(
  '/month',
  validateRequest(reportByDateSchema),
  ReportsController.getMonthReport,
);
