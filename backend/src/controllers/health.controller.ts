import type { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Time Tracker API is running',
  });
};
