#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  echo "[0/4] Missing .env file. Copy .env.example to .env and set VITE_ADMIN_PASSWORD before deployment."
  exit 1
fi

set -a
. ./.env
set +a

if [ -z "${VITE_ADMIN_PASSWORD:-}" ]; then
  echo "[0/4] VITE_ADMIN_PASSWORD must be set in .env before deployment."
  exit 1
fi

PORT="${PORT:-3000}"

 echo "========================================================"
 echo "  ATTAYA BEAUTY LUXE BLORA - PRODUCTION DEPLOYMENT BUILD"
 echo "========================================================"

 echo "[1/4] Installing dependencies..."
 npm ci

 echo "[2/4] Running TypeScript verification..."
 npm run lint

 echo "[3/4] Compiling production bundle..."
 npm run build

 if command -v docker >/dev/null 2>&1; then
   echo "[4/4] Building and starting Docker container..."
   docker compose build --no-cache
   docker compose up -d --remove-orphans
   curl -fsS "http://localhost:${PORT}" >/dev/null
   echo "Container is healthy on port ${PORT}."
 else
   echo "Docker CLI not detected, skipping container deployment."
 fi

 echo "========================================================"
 echo "  SUCCESS: Attaya Beauty Luxe is production deployment ready!"
 echo "========================================================"
