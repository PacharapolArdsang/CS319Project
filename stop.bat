@echo off
echo ========================================
echo   Stopping KindLink Application
echo ========================================
echo.

echo [INFO] Stopping Backend Server (Node.js on port 5000)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do taskkill /F /PID %%a 2>nul

echo [INFO] Stopping Frontend (Vite on port 5173)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /F /PID %%a 2>nul

echo.
echo [INFO] All servers stopped!
echo.
pause
