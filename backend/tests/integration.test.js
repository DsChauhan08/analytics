const request = require('supertest');
const app = require('../src/index');

describe('Integration Tests', () => {
  let token;
  let website;

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should create a website', async () => {
    const res = await request(app)
      .post('/api/websites')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Site', domain: 'example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('api_key');
    website = res.body;
  });

  it('should list websites', async () => {
    const res = await request(app)
      .get('/api/websites')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should track an event', async () => {
    const res = await request(app)
      .post('/api/analytics/track')
      .set('x-api-key', website.api_key)
      .send({
        type: 'pageview',
        payload: { url: '/home' },
        session_id: 'session123'
      });
    expect(res.statusCode).toBe(200);
  });

  it('should retrieve recent events', async () => {
    const res = await request(app)
      .get(`/api/analytics/recent/${website.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
