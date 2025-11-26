@echo off
echo ========================================
echo   Starting KindLink Application
echo ========================================
echo.

REM Check if node_modules exists in root
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    echo.
)

REM Check if node_modules exists in server
if not exist "server\node_modules\" (
    echo [INFO] Installing backend dependencies...
    cd server
    call npm install
    cd ..
    echo.
)

REM Check if .env file exists in server
if not exist "server\.env" (
    echo [WARNING] .env file not found in server directory!
    echo [INFO] Please copy .env.example to .env and configure it.
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 2 /nobreak >nul

echo [INFO] Starting Frontend...
start "Frontend (Vite)" cmd /k "npm run dev"

echo.
echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000/api
echo.
echo Press any key to exit this window...
echo (Note: This will NOT stop the servers)
pause >nul
