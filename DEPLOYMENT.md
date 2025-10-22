# Production Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Domain name with SSL certificate
- PostgreSQL database (managed service recommended)
- PayPal Business account

## Environment Setup

### 1. Backend Environment Variables

Create `backend/.env`:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@your-db-host:5432/analytics
JWT_SECRET=your-super-secure-random-secret-here
PAYPAL_CLIENT_ID=your-paypal-production-client-id
PAYPAL_CLIENT_SECRET=your-paypal-production-secret
NODE_ENV=production
```

### 2. Frontend Environment

Update API endpoints in frontend code to point to your production domain.

## Deployment Options

### Option 1: Docker Compose (Simplest)

1. Update `docker-compose.yml` for production:

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      PAYPAL_CLIENT_ID: ${PAYPAL_CLIENT_ID}
      PAYPAL_CLIENT_SECRET: ${PAYPAL_CLIENT_SECRET}
      NODE_ENV: production
    ports:
      - '4000:4000'
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - '3000:3000'
    restart: unless-stopped
    depends_on:
      - backend
```

2. Deploy:
```bash
docker compose -f docker-compose.prod.yml up -d
```

### Option 2: Cloud Platforms

#### AWS ECS/Fargate
1. Push images to ECR
2. Create task definitions
3. Set up load balancer
4. Configure auto-scaling

#### Google Cloud Run
1. Build containers
2. Push to GCR
3. Deploy services
4. Configure Cloud SQL

#### DigitalOcean App Platform
1. Connect GitHub repo
2. Configure build settings
3. Add environment variables
4. Deploy

### Option 3: Kubernetes

See `k8s/` directory for manifests:
- Deployment
- Service
- Ingress
- ConfigMap
- Secrets

Deploy:
```bash
kubectl apply -f k8s/
```

## Database Migration

For production, use a managed PostgreSQL service:

- **AWS RDS** (recommended)
- **Google Cloud SQL**
- **DigitalOcean Managed Database**
- **Azure Database**

Run migrations:
```bash
psql $DATABASE_URL < backend/db/init.sql
```

## Reverse Proxy (nginx)

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name analytics.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name analytics.yourdomain.com;

    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL/TLS Setup

### Using Let's Encrypt (certbot)

```bash
sudo certbot --nginx -d analytics.yourdomain.com
```

### Using CloudFlare

1. Add site to CloudFlare
2. Update DNS records
3. Enable SSL/TLS (Full or Strict)

## Monitoring & Logging

### Application Monitoring
- Use PM2 for process management
- Set up health check endpoints
- Configure logging (Winston, Bunyan)

### Infrastructure Monitoring
- CloudWatch (AWS)
- Stackdriver (GCP)
- Datadog
- New Relic

### Log Aggregation
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Papertrail
- Loggly

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Configuration Backups
- Store environment configs in secret manager
- AWS Secrets Manager
- Google Secret Manager
- HashiCorp Vault

## Scaling Considerations

### Horizontal Scaling
- Run multiple backend instances
- Use load balancer (ALB, nginx)
- Implement session storage (Redis)

### Database Scaling
- Read replicas for analytics queries
- Connection pooling (PgBouncer)
- Query optimization

### Caching
- Redis for session storage
- CDN for static assets (CloudFlare, CloudFront)
- API response caching

## Security Checklist

- [ ] SSL/TLS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Security headers configured
- [ ] Regular dependency updates

## Performance Optimization

### Backend
- Enable gzip compression
- Implement query result caching
- Use connection pooling
- Optimize database indexes

### Frontend
- Code splitting
- Lazy loading
- Asset optimization
- CDN delivery

## PayPal Production Setup

1. Create PayPal Business account
2. Create app in PayPal Developer Dashboard
3. Get production credentials
4. Set up webhooks for subscription events
5. Test in sandbox first
6. Switch to live credentials

Webhook URL: `https://your-domain.com/api/subscriptions/webhook`

## Health Checks

Implement health check endpoints:

```javascript
// backend/src/routes/health.js
router.get('/health', async (req, res) => {
  const dbCheck = await db.query('SELECT 1');
  res.json({
    status: 'ok',
    database: dbCheck ? 'connected' : 'error',
    timestamp: new Date()
  });
});
```

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push
        run: |
          docker build -t analytics-backend -f Dockerfile.backend .
          docker build -t analytics-frontend -f Dockerfile.frontend .
      - name: Deploy to server
        run: |
          ssh user@server 'cd /app && docker compose pull && docker compose up -d'
```

## Disaster Recovery

1. Regular database backups (automated)
2. Configuration backups
3. Documented recovery procedures
4. Tested restore process
5. Off-site backup storage

## Cost Optimization

- Use reserved instances for predictable workloads
- Auto-scaling for variable traffic
- Optimize database queries
- Use CDN for static content
- Monitor and optimize resource usage

## Post-Deployment

1. Monitor error rates
2. Check performance metrics
3. Verify SSL certificate
4. Test all critical paths
5. Set up alerts
6. Document runbook procedures