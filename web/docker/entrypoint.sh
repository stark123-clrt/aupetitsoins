#!/bin/sh
set -e

mkdir -p /app/data

echo "Applying database schema..."
npx prisma db push --schema=/app/prisma/schema.prisma --skip-generate --accept-data-loss

echo "Seeding initial data (no-op if already present)..."
npx tsx prisma/seed.ts || echo "Seed skipped."

exec "$@"
