import { clearDatabase, startInMemoryMongo, stopInMemoryMongo } from './in-memory-mongo';

beforeAll(async () => {
  await startInMemoryMongo();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await stopInMemoryMongo();
});
