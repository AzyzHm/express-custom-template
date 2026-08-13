process.env.NODE_ENV = 'test';
process.env.MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/test-placeholder';
process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? 'silent';
