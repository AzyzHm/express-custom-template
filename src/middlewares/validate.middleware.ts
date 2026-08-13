import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/http-exceptions';

/**
 * Validates req.body against the given DTO class using class-validator.
 * On success, req.body is replaced with the transformed DTO instance.
 */
export function validateBody<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const details = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      next(new BadRequestException('Validation failed', details));
      return;
    }

    req.body = instance;
    next();
  };
}
