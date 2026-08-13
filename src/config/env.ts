import 'dotenv/config';
import Joi from 'joi';

interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGO_URI: string;
  LOG_LEVEL: string;
  CORS_ORIGIN: string;
}

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().port().default(3000),
  MONGO_URI: Joi.string().uri().required(),
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('info'),
  CORS_ORIGIN: Joi.string().default('*'),
}).unknown(true);

const { error, value } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const validatedEnv = value as EnvVars;

export const env = {
  nodeEnv: validatedEnv.NODE_ENV,
  port: validatedEnv.PORT,
  mongoUri: validatedEnv.MONGO_URI,
  logLevel: validatedEnv.LOG_LEVEL,
  corsOrigin: validatedEnv.CORS_ORIGIN,
  isProduction: validatedEnv.NODE_ENV === 'production',
  isTest: validatedEnv.NODE_ENV === 'test',
};
