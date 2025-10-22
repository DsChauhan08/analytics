const db = require('../db');
const bcrypt = require('bcrypt');

async function createUser({ email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const res = await db.query(
    'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email, created_at',
    [email, hash]
  );
  return res.rows[0];
}

async function findByEmail(email) {
  const res = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  return res.rows[0];
}

module.exports = { createUser, findByEmail };
