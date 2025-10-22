#!/usr/bin/env bash
# Setup script for development environment

set -euo pipefail

echo "🔧 Setting up Analytics Platform Development Environment"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  docker-compose not found, checking for docker compose plugin..."
    if ! docker compose version &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install it first."
        exit 1
    fi
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

echo "✅ Prerequisites met"
echo ""

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env from example..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your configuration"
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update backend/.env with your configuration"
echo "  2. Run: $COMPOSE_CMD up --build"
echo "  3. Access frontend at http://localhost:5173"
echo "  4. Access backend at http://localhost:4000"
echo ""
echo "For testing:"
echo "  cd backend && npm test"
echo ""
