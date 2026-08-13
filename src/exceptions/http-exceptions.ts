import { AppError } from './app-error';

export class BadRequestException extends AppError {
  constructor(message = 'Bad request', details?: unknown) {
    super(message, 400, true, details);
  }
}

export class NotFoundException extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, 404, true, details);
  }
}

export class ConflictException extends AppError {
  constructor(message = 'Resource conflict', details?: unknown) {
    super(message, 409, true, details);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(message, 401, true, details);
  }
}

export class ForbiddenException extends AppError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(message, 403, true, details);
  }
}
