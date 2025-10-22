#!/usr/bin/env bash
# Load Testing Script for Analytics Platform

set -euo pipefail

API_BASE="${1:-http://localhost:4000}"
REQUESTS="${2:-1000}"
CONCURRENCY="${3:-10}"

echo "🚀 Load Testing Analytics Platform"
echo "   API: $API_BASE"
echo "   Requests: $REQUESTS"
echo "   Concurrency: $CONCURRENCY"
echo ""

# Check if ab (Apache Bench) is installed
if ! command -v ab &> /dev/null; then
    echo "❌ Apache Bench (ab) is not installed."
    echo "   Install with: sudo apt-get install apache2-utils"
    exit 1
fi

echo "1️⃣  Testing health endpoint..."
ab -n 100 -c 10 "$API_BASE/" > /dev/null 2>&1
echo "   ✅ Health check passed"

echo ""
echo "2️⃣  Load testing tracking endpoint..."
echo "   (Note: This requires a valid API key)"
echo ""

# Create a temp file with POST data
cat > /tmp/analytics-payload.json <<EOF
{"type":"pageview","payload":{"url":"/test"},"session_id":"load-test-session"}
EOF

# You'll need to add your API key here
API_KEY="${ANALYTICS_API_KEY:-test-key}"

echo "   Running $REQUESTS requests with concurrency $CONCURRENCY..."
ab -n "$REQUESTS" \
   -c "$CONCURRENCY" \
   -p /tmp/analytics-payload.json \
   -T application/json \
   -H "x-api-key: $API_KEY" \
   "$API_BASE/api/analytics/track"

rm /tmp/analytics-payload.json

echo ""
echo "✅ Load test complete!"
