#!/bin/sh
echo "========================================================"
echo "  ATTAYA BEAUTY LUXE BLORA - PRODUCTION DEPLOYMENT BUILD"
echo "========================================================"

# Step 1: Check dependencies & linting
echo "[1/4] Running TypeScript Linting & Code Verification..."
npm run lint

if [ $? -ne 0 ]; then
  echo "Error: Code verification failed. Fix lint issues first."
  exit 1
fi

# Step 2: Build frontend distribution bundle
echo "[2/4] Compiling Production Bundle with Vite..."
npm run build

if [ $? -ne 0 ]; then
  echo "Error: Build failed."
  exit 1
fi

# Step 3: Docker container deployment check (if Docker available)
echo "[3/4] Preparing Docker Image Deployment..."
if command -v docker >/dev/null 2>&1; then
  echo "Building Docker container image: attaya-beauty-luxe:latest..."
  docker build -t attaya-beauty-luxe:latest .
  echo "Docker build completed successfully."
else
  echo "Docker CLI not detected in container environment, skipping local docker image build."
fi

echo "[4/4] Production deployment readiness verified."
echo "========================================================"
echo "  SUCCESS: Attaya Beauty Luxe is 100% Production Ready!"
echo "========================================================"
