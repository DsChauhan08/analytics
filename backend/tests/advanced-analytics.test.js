const request = require('supertest');
const app = require('../src/index');

describe('Analytics Advanced Features', () => {
  let token, websiteId, apiKey;

  beforeAll(async () => {
    const authRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'advanced@example.com', password: 'password' });
    token = authRes.body.token;

    const siteRes = await request(app)
      .post('/api/websites')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Site', domain: 'test.com' });
    websiteId = siteRes.body.id;
    apiKey = siteRes.body.api_key;

    // Track some events
    await request(app)
      .post('/api/analytics/track')
      .set('x-api-key', apiKey)
      .send({ type: 'pageview', payload: { url: '/home' }, session_id: 's1' });
    
    await request(app)
      .post('/api/analytics/track')
      .set('x-api-key', apiKey)
      .send({ type: 'pageview', payload: { url: '/about' }, session_id: 's1' });
  });

  it('should get overview stats', async () => {
    const res = await request(app)
      .get(`/api/analytics/overview/${websiteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pageviews');
    expect(res.body).toHaveProperty('total_events');
    expect(res.body).toHaveProperty('unique_sessions');
  });

  it('should get time series data', async () => {
    const res = await request(app)
      .get(`/api/analytics/timeseries/${websiteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get top pages', async () => {
    const res = await request(app)
      .get(`/api/analytics/top-pages/${websiteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should respect days parameter', async () => {
    const res = await request(app)
      .get(`/api/analytics/overview/${websiteId}?days=30`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('should respect limit parameter for top pages', async () => {
    const res = await request(app)
      .get(`/api/analytics/top-pages/${websiteId}?limit=5`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
