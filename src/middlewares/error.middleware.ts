import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
     res.status(err.statusCode).json({ status: 'error', message: err.message });
     return;
  }
  console.error(' [CRITICAL BACKEND ERROR]:', err);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};