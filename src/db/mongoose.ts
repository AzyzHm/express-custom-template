import mongoose from 'mongoose';
import { env } from '../config/env';
import { logger } from '../config/logger';

export async function connectDatabase(uri: string = env.mongoUri): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(uri);
  logger.info('Connected to MongoDB');
  return connection;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}
