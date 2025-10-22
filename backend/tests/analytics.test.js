const request = require('supertest');
const app = require('../src/index');

describe('Analytics Tracking', () => {
  it('returns 400 without api key', async () => {
    const res = await request(app)
      .post('/api/analytics/track')
      .send({ type: 'event', payload: {} });
    expect(res.statusCode).toBe(400);
  });
});
