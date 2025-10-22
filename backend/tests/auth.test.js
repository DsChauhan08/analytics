const request = require('supertest');
const app = require('../src/index');

describe('Auth', () => {
  it('returns ok on root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
