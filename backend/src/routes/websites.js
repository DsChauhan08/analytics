const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const websiteModel = require('../models/website');

router.post('/', auth, async (req, res) => {
  const { name, domain } = req.body;
  const website = await websiteModel.createWebsite({ userId: req.user.id, name, domain });
  res.json(website);
});

router.get('/', auth, async (req, res) => {
  const list = await websiteModel.listWebsites(req.user.id);
  res.json(list);
});

module.exports = router;
