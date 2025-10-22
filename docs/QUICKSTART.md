# Quick Start Guide

## Prerequisites
- Docker & Docker Compose installed
- Node.js 20+ (for local development)

## 1. Clone & Setup

```bash
git clone <repo-url>
cd analytics
cp backend/.env.example backend/.env
```

## 2. Start Services

```bash
docker compose up --build
```

Services:
- **Backend**: http://localhost:4000
- **Frontend**: http://localhost:5173
- **Database**: localhost:5432

## 3. Register an Account

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"yourpass"}'
```

Save the returned `token`.

## 4. Create a Website

```bash
curl -X POST http://localhost:4000/api/auth/websites \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Site","domain":"mysite.com"}'
```

Save the returned `api_key`.

## 5. Track Events

```bash
curl -X POST http://localhost:4000/api/analytics/track \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"pageview","payload":{"url":"/home"},"session_id":"sess123"}'
```

## 6. View Analytics

Use your token to fetch recent events:

```bash
curl http://localhost:4000/api/analytics/recent/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Next Steps

- Explore the dashboard at http://localhost:5173
- Integrate tracking script into your website
- Set up PayPal subscriptions
- Review the full documentation in `docs/`
