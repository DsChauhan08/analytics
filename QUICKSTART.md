# Quick Start Guide

## Prerequisites
- Docker & Docker Compose installed
- Node.js 20+ (for local development)

## Getting Started

### 1. Start the application

```bash
docker compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 4000
- Frontend on port 5173

### 2. Access the application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Tracker Script**: http://localhost:4000/tracker.js

### 3. Create an account

1. Navigate to http://localhost:5173/register
2. Enter your email and password
3. Click "Register"
4. Save the token returned

### 4. Create a website

1. Go to http://localhost:5173/dashboard
2. Paste your token
3. Click "Load Websites" to verify authentication
4. Use the API or create a website via:
```bash
curl -X POST http://localhost:4000/api/websites \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Site","domain":"example.com"}'
```

### 5. Track events

Add the tracking script to your website:
```html
<script src="http://localhost:4000/tracker.js" 
        data-api-key="YOUR_WEBSITE_API_KEY"></script>
```

Or manually track events:
```bash
curl -X POST http://localhost:4000/api/analytics/track \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "pageview",
    "payload": {"url": "/home"},
    "session_id": "session123"
  }'
```

### 6. View analytics

1. Go to http://localhost:5173/analytics
2. Enter your website ID
3. Click "Load Analytics"

## Development

### Backend only
```bash
cd backend
npm install
npm run dev
```

### Frontend only
```bash
cd frontend
npm install
npm run dev
```

### Run tests
```bash
cd backend
npm test
```

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for signing JWTs
- `PAYPAL_CLIENT_ID`: PayPal app client ID
- `PAYPAL_CLIENT_SECRET`: PayPal app secret

## Database Schema

The database is automatically initialized with:
- Users table
- Websites table
- Events table (with indexes)
- Subscriptions table

See `backend/db/init.sql` for the complete schema.

## Next Steps

- Implement real PayPal integration (see `backend/src/paypal.js`)
- Add more dashboard visualizations
- Customize tracking library
- Add user management features
- Implement data retention policies
