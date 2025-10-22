const request = require('supertest');
const app = require('../src/index');

describe('Website Management', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/websites');
    expect(res.statusCode).toBe(401);
  });
});
