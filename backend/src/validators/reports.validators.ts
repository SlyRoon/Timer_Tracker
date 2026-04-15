import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import { optionalDateSchema } from './shared.schemas.js';

const reportQuerySchema = z.object({
  date: optionalDateSchema,
});

export const reportByDateSchema = {
  query: reportQuerySchema,
} satisfies RequestValidationSchema;
