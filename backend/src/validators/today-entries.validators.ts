import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import {
  nullableOptionalDateSchema,
  objectIdSchema,
  optionalDateSchema,
  requiredStringSchema,
} from './shared.schemas.js';

const entryIdParamsSchema = z.object({
  entryId: objectIdSchema,
});

const todayEntriesQuerySchema = z.object({
  date: optionalDateSchema,
});

const updateEntryTaskNameBodySchema = z.object({
  taskName: requiredStringSchema('Task name'),
});

const updateEntryProjectBodySchema = z.object({
  projectId: objectIdSchema,
});

const updateManualTimeBodySchema = z
  .object({
    startTime: optionalDateSchema,
    endTime: nullableOptionalDateSchema,
    durationMinutes: z.number().int().min(0).optional(),
    entryDate: optionalDateSchema,
  })
  .refine(
    (value) =>
      value.startTime !== undefined ||
      value.endTime !== undefined ||
      value.durationMinutes !== undefined ||
      value.entryDate !== undefined,
    {
      message: 'At least one time correction field is required',
    },
  );

export const getTodayEntriesSchema = {
  query: todayEntriesQuerySchema,
} satisfies RequestValidationSchema;

export const updateEntryTaskNameSchema = {
  params: entryIdParamsSchema,
  body: updateEntryTaskNameBodySchema,
} satisfies RequestValidationSchema;

export const updateEntryProjectSchema = {
  params: entryIdParamsSchema,
  body: updateEntryProjectBodySchema,
} satisfies RequestValidationSchema;

export const updateManualTimeSchema = {
  params: entryIdParamsSchema,
  body: updateManualTimeBodySchema,
} satisfies RequestValidationSchema;

export const deleteEntrySchema = {
  params: entryIdParamsSchema,
} satisfies RequestValidationSchema;
