#!/bin/bash

echo "========================================"
echo "  Stopping KindLink Application"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[INFO] Stopping Backend Server (Node.js on port 5000)...${NC}"
lsof -ti:5000 | xargs kill -9 2>/dev/null

echo -e "${YELLOW}[INFO] Stopping Frontend (Vite on port 5173)...${NC}"
lsof -ti:5173 | xargs kill -9 2>/dev/null

# For systems without lsof (like some Linux distributions)
if ! command -v lsof &> /dev/null; then
    echo -e "${YELLOW}[INFO] Using alternative method...${NC}"
    pkill -f "vite" 2>/dev/null
    pkill -f "node.*index.js" 2>/dev/null
fi

echo ""
echo -e "${GREEN}[INFO] All servers stopped!${NC}"
echo ""
