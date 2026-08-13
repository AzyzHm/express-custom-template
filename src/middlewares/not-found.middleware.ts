import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions/http-exceptions';

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundException(`Route ${req.method} ${req.originalUrl} not found`));
}
