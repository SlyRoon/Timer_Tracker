import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import {
  objectIdSchema,
  optionalDateSchema,
  requiredStringSchema,
} from './shared.schemas.js';

const startTimerBodySchema = z.object({
  taskName: requiredStringSchema('Task name'),
  projectId: objectIdSchema,
  startTime: optionalDateSchema,
  entryDate: optionalDateSchema,
});

const stopTimerBodySchema = z.object({
  endTime: optionalDateSchema,
}).default({});

export const startTimerSchema = {
  body: startTimerBodySchema,
} satisfies RequestValidationSchema;

export const stopTimerSchema = {
  body: stopTimerBodySchema,
} satisfies RequestValidationSchema;
