# API Documentation

Base URL: `http://localhost:4000`

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass"
}
```

**Response:**
```json
{
  "user": { "id": 1, "email": "user@example.com" },
  "token": "eyJhbGc..."
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass"
}
```

## Websites

### Create Website
```http
POST /api/websites
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "My Website",
  "domain": "example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Website",
  "domain": "example.com",
  "api_key": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-10-22T10:00:00.000Z"
}
```

### List Websites
```http
GET /api/websites
Authorization: Bearer YOUR_TOKEN
```

## Analytics

### Track Event (Public)
```http
POST /api/analytics/track
X-API-Key: YOUR_WEBSITE_API_KEY
Content-Type: application/json

{
  "type": "pageview",
  "payload": {
    "url": "/home",
    "referrer": "https://google.com",
    "title": "Home Page"
  },
  "session_id": "sess_abc123"
}
```

### Get Recent Events
```http
GET /api/analytics/recent/:websiteId
Authorization: Bearer YOUR_TOKEN
```

### Get Overview Stats
```http
GET /api/analytics/overview/:websiteId?from=2025-10-01&to=2025-10-31
Authorization: Bearer YOUR_TOKEN
```

### Get Real-time Stats
```http
GET /api/analytics/realtime/:websiteId
Authorization: Bearer YOUR_TOKEN
```

## Subscriptions

### Create Subscription
```http
POST /api/subscriptions/create
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "planId": "pro"
}
```

**Response:**
```json
{
  "id": "sub_pro_1234567890",
  "approval_url": "https://www.paypal.com/checkoutnow?token=..."
}
```

### PayPal Webhook
```http
POST /api/subscriptions/webhook
Content-Type: application/json

{
  "event_type": "BILLING.SUBSCRIPTION.ACTIVATED",
  "resource": { ... }
}
```

## Error Responses

All endpoints return errors in the format:
```json
{
  "error": "Error message description"
}
```

Common status codes:
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error
