const express = require('express');
const router = express.Router();
const websiteModel = require('../models/website');
const analyticsModel = require('../models/analytics');
const auth = require('../middleware/auth');

// Public tracking endpoint used by websites via API key
router.post('/track', async (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (!apiKey) return res.status(400).json({ error: 'Missing api key' });
  const website = await websiteModel.findByApiKey(apiKey);
  if (!website) return res.status(404).json({ error: 'Invalid api key' });
  const { type, payload, session_id } = req.body;
  const ev = await analyticsModel.trackEvent({ websiteId: website.id, type, payload, session_id });
  res.json(ev);
});

// Protected endpoints
router.get('/recent/:websiteId', auth, async (req, res) => {
  const events = await analyticsModel.recentEvents(req.params.websiteId, 200);
  res.json(events);
});

router.get('/overview/:websiteId', auth, async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const overview = await analyticsModel.getOverview(req.params.websiteId, days);
  res.json(overview);
});

router.get('/timeseries/:websiteId', auth, async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const series = await analyticsModel.getTimeSeries(req.params.websiteId, days);
  res.json(series);
});

router.get('/top-pages/:websiteId', auth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const pages = await analyticsModel.getTopPages(req.params.websiteId, limit);
  res.json(pages);
});

module.exports = router;
