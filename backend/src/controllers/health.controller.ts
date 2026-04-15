import type { Request, Response } from 'express';
import { sendSuccess } from '../shared/http/responses.js';

export const getHealth = (_req: Request, res: Response) => {
  return sendSuccess(res, {
    status: 'ok',
    message: 'Time Tracker API is running',
  });
};
