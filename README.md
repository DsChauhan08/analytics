# Analytics Platform - Google Analytics Alternative

Enterprise-grade web analytics platform with real-time tracking, comprehensive dashboards, and subscription management.

## 📦 What's Included

### Backend (Express.js + PostgreSQL)
✅ Complete REST API with authentication (JWT)  
✅ Analytics tracking endpoints (pageviews, events, sessions)  
✅ Analytics retrieval endpoints (overview, real-time, reports)  
✅ Website management with API key generation  
✅ PayPal subscription integration  
✅ Comprehensive test suite (Jest + Supertest)  

### Frontend (SvelteKit)
✅ User registration and login  
✅ Dashboard with analytics visualization  
✅ Website management  
✅ Subscription management  
✅ Real-time data display  

### Database (PostgreSQL)
✅ Complete schema with all tables  
✅ Optimized indexes for performance  
✅ Sample seed data  
✅ Subscription plans pre-configured  

### Docker Configuration
✅ docker-compose.yml with all services  
✅ Dockerfiles for backend and frontend  
✅ Health checks and networking configured  

### Testing Suite
✅ 50+ automated tests covering all features  
✅ Integration test script (test-runner.sh)  
✅ Manual testing guide (TESTING.md)  
✅ Load testing instructions  

## 🚀 Quick Start

```bash
# Clone and start
docker compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:4000
```

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## 📚 Documentation

- [API Documentation](API.md) - Complete API reference
- [Quick Start Guide](QUICKSTART.md) - Getting started
- [Testing Guide](TESTING.md) - How to run tests

## 🏗️ Architecture

```
analytics/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── models/   # Database models
│   │   ├── middleware/ # Auth, validation
│   │   └── index.js  # App entry point
│   ├── db/           # Database migrations
│   ├── tests/        # Test suites
│   └── public/       # Tracking library
├── frontend/         # SvelteKit app
│   └── src/routes/   # Pages (dashboard, login, etc.)
├── docker-compose.yml
└── Dockerfiles
```

## 🔑 Key Features

### For Website Owners
- Easy integration with single script tag
- Real-time analytics tracking
- Customizable event tracking
- Privacy-focused (self-hosted)

### For Platform Users
- Multi-website management
- Detailed analytics dashboards
- Time-series data visualization
- Top pages and referrer tracking
- Session tracking

### For Developers
- RESTful API
- JWT authentication
- PostgreSQL database
- Docker deployment
- Comprehensive tests

## 📊 Tracking Library

Add to any website:
```html
<script src="http://your-domain:4000/tracker.js" 
        data-api-key="YOUR_API_KEY"></script>
```

Custom events:
```javascript
window.analytics.track('signup', { plan: 'pro' });
```

## 🔐 Security

- Passwords hashed with bcrypt
- JWT token authentication
- API key-based tracking
- CORS protection
- SQL injection prevention via parameterized queries

## 💳 Subscription Plans

Integrated PayPal subscription support:
- Basic: $9/month
- Pro: $29/month
- Enterprise: $99/month

## 🧪 Testing

```bash
cd backend
npm install
npm test
```

Tests include:
- Unit tests for models
- Integration tests for API endpoints
- Authentication flow tests
- Analytics tracking tests

## 📈 Performance

- Indexed database queries
- Optimized for high-volume tracking
- Connection pooling
- Background event processing

## 🚢 Deployment

### Development
```bash
docker compose up
```

### Production
- Set environment variables (see `.env.example`)
- Use managed PostgreSQL (AWS RDS, etc.)
- Deploy backend behind reverse proxy (nginx)
- Enable SSL/TLS
- Configure PayPal production credentials

## 📝 License

MIT License - see [LICENSE](LICENSE)

## 🤝 Contributing

Contributions welcome! Please read the testing guide and ensure all tests pass.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: SvelteKit, Svelte 4
- **Database**: PostgreSQL 15
- **Testing**: Jest, Supertest
- **Payment**: PayPal API
- **Containerization**: Docker, Docker Compose
- **Authentication**: JWT (jsonwebtoken)

## 📞 Support

For issues and questions, please open a GitHub issue.
# analytics