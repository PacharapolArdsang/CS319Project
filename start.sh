#!/bin/bash

echo "========================================"
echo "  Starting KindLink Application"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[INFO] Installing frontend dependencies...${NC}"
    npm install
    echo ""
fi

# Check if node_modules exists in server
if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}[INFO] Installing backend dependencies...${NC}"
    cd server
    npm install
    cd ..
    echo ""
fi

# Check if .env file exists in server
if [ ! -f "server/.env" ]; then
    echo -e "${RED}[WARNING] .env file not found in server directory!${NC}"
    echo -e "${YELLOW}[INFO] Please copy .env.example to .env and configure it.${NC}"
    echo ""
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo ""
    echo -e "${YELLOW}[INFO] Stopping servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}[INFO] Servers stopped${NC}"
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}[INFO] Starting Backend Server...${NC}"
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

echo -e "${GREEN}[INFO] Starting Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Application Started Successfully!"
echo "========================================"
echo ""
echo -e "${GREEN}Frontend:${NC} http://localhost:5173"
echo -e "${GREEN}Backend:${NC}  http://localhost:5000/api"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for background processes
wait
