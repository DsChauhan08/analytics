# Testing Guide

1. Start services:

   docker compose up --build

2. The database will run init scripts located in `backend/db/init.sql`.

3. Backend will be available at http://localhost:4000

4. Run backend tests:

   cd backend && npm install && npm test

5. Frontend dev server runs on http://localhost:5173
