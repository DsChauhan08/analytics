const db = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createWebsite({ userId, name, domain }) {
  const apiKey = uuidv4();
  const res = await db.query(
    'INSERT INTO websites(user_id, name, domain, api_key) VALUES($1,$2,$3,$4) RETURNING *',
    [userId, name, domain, apiKey]
  );
  return res.rows[0];
}

async function listWebsites(userId) {
  const res = await db.query('SELECT * FROM websites WHERE user_id=$1', [userId]);
  return res.rows;
}

async function findByApiKey(apiKey) {
  const res = await db.query('SELECT * FROM websites WHERE api_key=$1', [apiKey]);
  return res.rows[0];
}

module.exports = { createWebsite, listWebsites, findByApiKey };
