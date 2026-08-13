import pino from 'pino';
import { env } from './env';

export const logger = pino({
  level: env.logLevel,
  transport: env.isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
});
