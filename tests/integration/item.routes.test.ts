import request from 'supertest';
import { createApp } from '../../src/app';
import { ItemModel } from '../../src/models/item.model';

const app = createApp();

describe('Item routes (integration)', () => {
  it('creates an item', async () => {
    const res = await request(app)
      .post('/api/v1/items')
      .send({ name: 'Widget', quantity: 3 });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ name: 'Widget', quantity: 3 });
  });

  it('rejects an invalid payload', async () => {
    const res = await request(app).post('/api/v1/items').send({ quantity: -1 });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('lists items', async () => {
    await ItemModel.create({ name: 'Gadget', quantity: 1 });

    const res = await request(app).get('/api/v1/items');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it('returns a single item by id', async () => {
    const created = await ItemModel.create({ name: 'Gizmo', quantity: 2 });

    const res = await request(app).get(`/api/v1/items/${created._id}`);

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Gizmo');
  });

  it('returns 404 for a missing item', async () => {
    const res = await request(app).get('/api/v1/items/64b64b64b64b64b64b64b64b');

    expect(res.status).toBe(404);
  });

  it('updates an item', async () => {
    const created = await ItemModel.create({ name: 'Old Name', quantity: 1 });

    const res = await request(app)
      .patch(`/api/v1/items/${created._id}`)
      .send({ name: 'New Name' });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('New Name');
  });

  it('deletes an item', async () => {
    const created = await ItemModel.create({ name: 'To Delete', quantity: 1 });

    const res = await request(app).delete(`/api/v1/items/${created._id}`);

    expect(res.status).toBe(204);
  });
});
