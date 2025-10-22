require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const websiteRoutes = require('./routes/websites');
const subscriptionRoutes = require('./routes/subscriptions');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => console.log(`Backend listening on ${port}`));

module.exports = app;
