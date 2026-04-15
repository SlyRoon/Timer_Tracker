import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ServiceError } from '../shared/errors/service-error.js';
import { sendError } from '../shared/http/responses.js';

const serviceErrorStatusMap: Record<ServiceError['code'], number> = {
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Validation failed', {
      issues: error.issues,
    });
  }

  if (error instanceof ServiceError) {
    return sendError(
      res,
      serviceErrorStatusMap[error.code],
      error.code,
      error.message,
    );
  }

  return sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
};
