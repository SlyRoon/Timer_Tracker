import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import { optionalDateSchema } from './shared.schemas.js';

const reportPeriodSchema = z.enum(['day', 'week', 'month']);

const reportQuerySchema = z.object({
  date: optionalDateSchema,
});

const periodReportQuerySchema = z.object({
  period: reportPeriodSchema,
  date: optionalDateSchema,
});

const csvExportQuerySchema = periodReportQuerySchema.extend({
  format: z.literal('csv').default('csv'),
});

export const reportByPeriodSchema = {
  query: periodReportQuerySchema,
} satisfies RequestValidationSchema;

export const reportByDateSchema = {
  query: reportQuerySchema,
} satisfies RequestValidationSchema;

export const csvExportSchema = {
  query: csvExportQuerySchema,
} satisfies RequestValidationSchema;
