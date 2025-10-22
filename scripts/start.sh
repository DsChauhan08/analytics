#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting services..."
docker compose up -d --build

echo "⏳ Waiting for services to be healthy..."
sleep 10

echo "✅ Services started!"
echo "Backend: http://localhost:4000"
echo "Frontend: http://localhost:5173"
echo "Database: localhost:5432"
