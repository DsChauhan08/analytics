const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paypal = require('../paypal');
const db = require('../db');

router.post('/create', auth, async (req, res) => {
  try {
    const { planId } = req.body;
    const sub = await paypal.createSubscription(planId, req.user.id);
    
    // Store subscription in database
    await db.query(
      'INSERT INTO subscriptions(user_id, plan_id, paypal_sub_id, status) VALUES($1,$2,$3,$4)',
      [req.user.id, planId, sub.id, sub.status]
    );
    
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status', auth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM subscriptions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );
    res.json(result.rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cancel', auth, async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    await paypal.cancelSubscription(subscriptionId);
    
    await db.query(
      'UPDATE subscriptions SET status=$1 WHERE paypal_sub_id=$2 AND user_id=$3',
      ['CANCELLED', subscriptionId, req.user.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PayPal webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const isValid = paypal.verifyWebhookSignature(req.headers, req.body);
    
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    
    // Handle different event types
    switch (event.event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await db.query(
          'UPDATE subscriptions SET status=$1 WHERE paypal_sub_id=$2',
          ['ACTIVE', event.resource.id]
        );
        break;
      
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await db.query(
          'UPDATE subscriptions SET status=$1 WHERE paypal_sub_id=$2',
          ['CANCELLED', event.resource.id]
        );
        break;
      
      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await db.query(
          'UPDATE subscriptions SET status=$1 WHERE paypal_sub_id=$2',
          ['EXPIRED', event.resource.id]
        );
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
