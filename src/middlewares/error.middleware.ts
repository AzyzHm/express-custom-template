import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';
import { env } from '../config/env';
import { AppError } from '../exceptions/app-error';

interface ErrorResponseBody {
  status: 'error';
  message: string;
  details?: unknown;
  stack?: string;
}

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : 'Internal server error';

  if (!isAppError || statusCode >= 500) {
    logger.error({ err, path: req.originalUrl, method: req.method }, message);
  } else {
    logger.warn({ path: req.originalUrl, method: req.method }, message);
  }

  const body: ErrorResponseBody = {
    status: 'error',
    message,
  };

  if (isAppError && err.details) {
    body.details = err.details;
  }

  if (!env.isProduction) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
}
