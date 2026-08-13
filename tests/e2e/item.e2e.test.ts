import request from 'supertest';
import { createApp } from '../../src/app';

const app = createApp();

describe('Item lifecycle (e2e)', () => {
  it('supports the full create -> read -> update -> delete flow', async () => {
    // 1. Create
    const createRes = await request(app)
      .post('/api/v1/items')
      .send({ name: 'Lifecycle Item', quantity: 10 });
    expect(createRes.status).toBe(201);
    const id = createRes.body.data._id;

    // 2. Read back
    const getRes = await request(app).get(`/api/v1/items/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.quantity).toBe(10);

    // 3. Update
    const updateRes = await request(app).patch(`/api/v1/items/${id}`).send({ quantity: 20 });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.quantity).toBe(20);

    // 4. Appears in listing
    const listRes = await request(app).get('/api/v1/items');
    expect(listRes.body.data.some((item: { _id: string }) => item._id === id)).toBe(true);

    // 5. Delete
    const deleteRes = await request(app).delete(`/api/v1/items/${id}`);
    expect(deleteRes.status).toBe(204);

    // 6. Confirm gone
    const finalGetRes = await request(app).get(`/api/v1/items/${id}`);
    expect(finalGetRes.status).toBe(404);
  });

  it('returns a healthy status from the health check endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
