# API Documentation

## Base URL
`http://localhost:4000/api`

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### POST `/auth/register`
Register a new user.
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Returns: `{ user, token }`

#### POST `/auth/login`
Login existing user.
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Returns: `{ user, token }`

### Websites

#### POST `/websites` (Protected)
Create a new website to track.
```json
{
  "name": "My Website",
  "domain": "example.com"
}
```
Returns: Website object with `api_key`

#### GET `/websites` (Protected)
List all websites for the authenticated user.

### Analytics

#### POST `/analytics/track` (Public, requires API key)
Track an event. Use `x-api-key` header or `?api_key=` query param.
```json
{
  "type": "pageview",
  "payload": { "url": "/home", "title": "Home" },
  "session_id": "session123"
}
```

#### GET `/analytics/recent/:websiteId` (Protected)
Get recent events for a website.

#### GET `/analytics/overview/:websiteId?days=7` (Protected)
Get aggregated stats (pageviews, sessions, events).

#### GET `/analytics/timeseries/:websiteId?days=7` (Protected)
Get daily time-series data.

#### GET `/analytics/top-pages/:websiteId?limit=10` (Protected)
Get top pages by view count.

### Subscriptions

#### POST `/subscriptions/create` (Protected)
Create a PayPal subscription.
```json
{
  "planId": "basic"
}
```
Returns: `{ id, approval_url }`

## Tracking Library

Include this script on your website:
```html
<script src="http://localhost:4000/tracker.js" data-api-key="YOUR_API_KEY"></script>
```

It will automatically track:
- Pageviews
- Link clicks
- Custom events via `window.analytics.track(type, payload)`
