#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Running backend tests..."
cd backend
npm test
cd ..

echo "✅ All tests passed!"
