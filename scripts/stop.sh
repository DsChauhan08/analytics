#!/usr/bin/env bash
set -euo pipefail

echo "🛑 Stopping services..."
docker compose down

echo "✅ Services stopped!"
