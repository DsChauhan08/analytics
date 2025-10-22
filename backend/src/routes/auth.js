const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await userModel.findByEmail(email);
  if (existing) return res.status(400).json({ error: 'Email taken' });
  const user = await userModel.createUser({ email, password });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ user, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ user: { id: user.id, email: user.email }, token });
});

module.exports = router;
