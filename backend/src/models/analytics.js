const db = require('../db');

async function trackEvent({ websiteId, type, payload, session_id }) {
  const res = await db.query(
    'INSERT INTO events(website_id, type, payload, session_id) VALUES($1,$2,$3,$4) RETURNING *',
    [websiteId, type, payload, session_id]
  );
  return res.rows[0];
}

async function recentEvents(websiteId, limit = 100) {
  const res = await db.query(
    'SELECT * FROM events WHERE website_id=$1 ORDER BY created_at DESC LIMIT $2',
    [websiteId, limit]
  );
  return res.rows;
}

async function getOverview(websiteId, days = 7) {
  const res = await db.query(
    `SELECT 
       COUNT(*) FILTER (WHERE type='pageview') as pageviews,
       COUNT(*) as total_events,
       COUNT(DISTINCT session_id) as unique_sessions
     FROM events 
     WHERE website_id=$1 AND created_at > NOW() - INTERVAL '${days} days'`,
    [websiteId]
  );
  return res.rows[0];
}

async function getTimeSeries(websiteId, days = 7) {
  const res = await db.query(
    `SELECT 
       DATE(created_at) as date,
       COUNT(*) FILTER (WHERE type='pageview') as pageviews,
       COUNT(DISTINCT session_id) as sessions
     FROM events
     WHERE website_id=$1 AND created_at > NOW() - INTERVAL '${days} days'
     GROUP BY DATE(created_at)
     ORDER BY date DESC`,
    [websiteId]
  );
  return res.rows;
}

async function getTopPages(websiteId, limit = 10) {
  const res = await db.query(
    `SELECT 
       payload->>'url' as url,
       COUNT(*) as views
     FROM events
     WHERE website_id=$1 AND type='pageview' AND payload->>'url' IS NOT NULL
     GROUP BY payload->>'url'
     ORDER BY views DESC
     LIMIT $2`,
    [websiteId, limit]
  );
  return res.rows;
}

module.exports = { 
  trackEvent, 
  recentEvents, 
  getOverview, 
  getTimeSeries, 
  getTopPages 
};
