import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';

export interface RequestValidationSchema {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

export const validateRequest =
  (schema: RequestValidationSchema): RequestHandler =>
  (req, _res, next) => {
    try {
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
