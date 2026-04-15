import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import { objectIdSchema, requiredStringSchema } from './shared.schemas.js';

const idParamsSchema = z.object({
  id: objectIdSchema,
});

const createProjectBodySchema = z.object({
  name: requiredStringSchema('Project name'),
  color: requiredStringSchema('Project color'),
});

const updateProjectBodySchema = createProjectBodySchema.partial().refine(
  (value) => value.name !== undefined || value.color !== undefined,
  {
    message: 'At least one project field is required',
  },
);

export const createProjectSchema = {
  body: createProjectBodySchema,
} satisfies RequestValidationSchema;

export const getProjectByIdSchema = {
  params: idParamsSchema,
} satisfies RequestValidationSchema;

export const updateProjectSchema = {
  params: idParamsSchema,
  body: updateProjectBodySchema,
} satisfies RequestValidationSchema;
