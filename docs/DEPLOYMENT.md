# Deployment Guide

## Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Prepare environment file:**
```bash
cp backend/.env.example backend/.env
nano backend/.env
```

Update with production values:
```env
PORT=4000
DATABASE_URL=postgresql://postgres:STRONG_PASSWORD@db:5432/analytics
JWT_SECRET=GENERATE_STRONG_RANDOM_SECRET
PAYPAL_CLIENT_ID=your-production-paypal-client-id
PAYPAL_CLIENT_SECRET=your-production-paypal-secret
NODE_ENV=production
```

2. **Deploy with production compose:**
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

3. **Set up reverse proxy (nginx):**

```nginx
server {
    listen 80;
    server_name analytics.yourdomain.com;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
    }
}
```

4. **Enable SSL with Let's Encrypt:**
```bash
certbot --nginx -d analytics.yourdomain.com
```

### Option 2: Kubernetes

1. **Create secrets:**
```bash
kubectl create secret generic analytics-secrets \
  --from-literal=jwt-secret=YOUR_SECRET \
  --from-literal=db-password=DB_PASSWORD \
  --from-literal=paypal-client-id=CLIENT_ID \
  --from-literal=paypal-secret=CLIENT_SECRET
```

2. **Deploy:**
```bash
kubectl apply -f k8s/
```

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku create analytics-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### AWS ECS/Fargate
- Push images to ECR
- Create task definitions
- Deploy service with ALB

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/analytics-backend
gcloud run deploy --image gcr.io/PROJECT_ID/analytics-backend --platform managed
```

## Environment Variables

### Backend
- `PORT` - Server port (default: 4000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing (use strong random value)
- `PAYPAL_CLIENT_ID` - PayPal app client ID
- `PAYPAL_CLIENT_SECRET` - PayPal app secret
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL

## Database Migrations

Run migrations manually:
```bash
psql $DATABASE_URL < backend/db/init.sql
psql $DATABASE_URL < backend/db/seed.sql
```

Or use migration tools like `knex` or `sequelize-cli` for versioned migrations.

## Monitoring & Logging

### Application Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### Database Logs
```bash
docker compose logs -f db
```

### Health Checks
- Backend: `http://localhost:4000/` should return `{"status":"ok"}`
- Database: Check connection in backend logs

## Backup & Recovery

### Database Backup
```bash
docker compose exec db pg_dump -U postgres analytics > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
docker compose exec -T db psql -U postgres analytics < backup_20251022.sql
```

## Scaling

### Horizontal Scaling
- Run multiple backend instances behind a load balancer
- Use connection pooling for database
- Consider Redis for session storage

### Database Optimization
- Add indexes for frequently queried columns
- Use read replicas for analytics queries
- Partition large tables by date

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set strong JWT_SECRET
- [ ] Use environment variables (never commit secrets)
- [ ] Enable CORS only for trusted domains
- [ ] Set up rate limiting
- [ ] Implement request validation
- [ ] Use prepared statements (already done)
- [ ] Enable PostgreSQL SSL connections
- [ ] Regular security updates
- [ ] Monitor for suspicious activity

## Performance Tuning

### Database
```sql
-- Add indexes for common queries
CREATE INDEX idx_events_website_type ON events(website_id, type, created_at);
CREATE INDEX idx_events_session ON events(session_id);
```

### Backend
- Enable gzip compression
- Use CDN for static assets
- Implement caching (Redis)
- Connection pooling configured

### Frontend
- Build for production: `npm run build`
- Serve with CDN
- Enable service worker for offline support
