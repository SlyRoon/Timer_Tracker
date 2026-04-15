import type { Response } from 'express';

export interface ApiSuccessResponse<TData> {
  success: true;
  data: TData;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const sendSuccess = <TData>(
  res: Response,
  data: TData,
  statusCode = 200,
  message?: string,
) => {
  const payload: ApiSuccessResponse<TData> = {
    success: true,
    data,
    ...(message ? { message } : {}),
  };

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown,
) => {
  const payload: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };

  return res.status(statusCode).json(payload);
};
