import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import { paginationLimitSchema } from './shared.schemas.js';

const taskSuggestionsQuerySchema = z.object({
  query: z.string().trim().optional(),
  limit: paginationLimitSchema,
});

export const taskSuggestionsSchema = {
  query: taskSuggestionsQuerySchema,
} satisfies RequestValidationSchema;

export const recentTaskNamesSchema = {
  query: z.object({
    limit: paginationLimitSchema,
  }),
} satisfies RequestValidationSchema;
