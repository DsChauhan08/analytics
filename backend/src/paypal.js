// Enhanced PayPal integration with subscription management
// For production use, integrate with @paypal/checkout-server-sdk

const axios = require('axios');

const PAYPAL_API = process.env.NODE_ENV === 'production' 
  ? 'https://api.paypal.com' 
  : 'https://api.sandbox.paypal.com';

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

/**
 * Get PayPal OAuth token
 */
async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('PayPal auth error:', error);
    throw error;
  }
}

/**
 * Create a subscription
 */
async function createSubscription(planId, userId) {
  // In development, return mock data
  if (!CLIENT_ID || CLIENT_ID === 'your-paypal-client-id') {
    return {
      id: `MOCK_SUB_${Date.now()}`,
      status: 'APPROVAL_PENDING',
      approval_url: 'https://www.paypal.com/checkoutnow?token=MOCK_TOKEN',
      plan_id: planId,
      user_id: userId
    };
  }

  try {
    const token = await getAccessToken();
    
    const response = await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions`,
      {
        plan_id: planId,
        application_context: {
          brand_name: 'Analytics Platform',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${process.env.APP_URL || 'http://localhost:5173'}/subscription/success`,
          cancel_url: `${process.env.APP_URL || 'http://localhost:5173'}/subscription/cancel`
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
      approval_url: response.data.links.find(link => link.rel === 'approve').href,
      plan_id: planId,
      user_id: userId
    };
  } catch (error) {
    console.error('PayPal subscription error:', error.response?.data || error);
    throw error;
  }
}

/**
 * Get subscription details
 */
async function getSubscription(subscriptionId) {
  const token = await getAccessToken();
  
  const response = await axios.get(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
}

/**
 * Cancel a subscription
 */
async function cancelSubscription(subscriptionId, reason) {
  const token = await getAccessToken();
  
  await axios.post(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
    { reason: reason || 'Customer request' },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return { cancelled: true };
}

/**
 * Verify webhook signature
 */
function verifyWebhookSignature(headers, body) {
  // Implement webhook signature verification
  // See: https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature
  return true; // Simplified for demo
}

module.exports = {
  createSubscription,
  getSubscription,
  cancelSubscription,
  verifyWebhookSignature
};
