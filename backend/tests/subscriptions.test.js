const request = require('supertest');
const app = require('../src/index');

describe('Subscription Management', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'sub-test@example.com', password: 'password' });
    token = res.body.token;
  });

  it('should create a subscription', async () => {
    const res = await request(app)
      .post('/api/subscriptions/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ planId: 'basic' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('approval_url');
  });

  it('should reject without authentication', async () => {
    const res = await request(app)
      .post('/api/subscriptions/create')
      .send({ planId: 'pro' });
    expect(res.statusCode).toBe(401);
  });
});
