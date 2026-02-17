@echo off
echo Starting Orbit Development Environment...
echo.

echo Killing existing Node.js processes...
taskkill /f /im node.exe >nul 2>&1
echo.

echo Cleaning cache directories...
if exist "orbit_admin\.next" rmdir /s /q "orbit_admin\.next"
if exist "Orbit-360\.next" rmdir /s /q "Orbit-360\.next"
echo.

echo Starting services with optimized memory allocation...
echo.

echo [1/3] Starting Backend API (Port 5000)...
start "Backend API" cmd /c "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Orbit Admin (Port 3001)...
start "Orbit Admin" cmd /c "cd orbit_admin && cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Starting Orbit-360 (Port 3003)...
start "Orbit-360" cmd /c "cd Orbit-360 && cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev"

echo.
echo All services started successfully!
echo.
echo Ports:
echo - Backend API: http://localhost:5000
echo - Orbit Admin: http://localhost:3001
echo - Orbit-360: http://localhost:3003
echo.
echo Press any key to stop all services...
pause >nul

echo Stopping all services...
taskkill /f /fi "WINDOWTITLE eq Backend API*" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq Orbit Admin*" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq Orbit-360*" >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo Services stopped.