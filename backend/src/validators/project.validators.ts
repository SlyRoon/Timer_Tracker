import { z } from 'zod';
import type { RequestValidationSchema } from '../middlewares/validate-request.middleware.js';
import { objectIdSchema, requiredStringSchema } from './shared.schemas.js';

const projectIdParamsSchema = z.object({
  projectId: objectIdSchema,
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
  params: projectIdParamsSchema,
} satisfies RequestValidationSchema;

export const updateProjectSchema = {
  params: projectIdParamsSchema,
  body: updateProjectBodySchema,
} satisfies RequestValidationSchema;
