#!/usr/bin/env bash
# Database backup script

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-./backups}"
DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/analytics}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/analytics_backup_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

echo "📦 Backing up database..."
echo "   Target: $BACKUP_FILE"

pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Compress the backup
gzip "$BACKUP_FILE"

echo "✅ Backup complete: ${BACKUP_FILE}.gz"
echo "   Size: $(du -h "${BACKUP_FILE}.gz" | cut -f1)"

# Clean up old backups (keep last 7 days)
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete

echo "🧹 Old backups cleaned up"
