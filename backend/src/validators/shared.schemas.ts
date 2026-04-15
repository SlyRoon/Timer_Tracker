import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId');

export const requiredStringSchema = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`);

export const optionalDateSchema = z.preprocess((value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  return value;
}, z.date().optional());

export const nullableOptionalDateSchema = z.preprocess((value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  if (value === null || value === 'null') {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  return value;
}, z.date().nullable().optional());

export const paginationLimitSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(50)
  .optional();
