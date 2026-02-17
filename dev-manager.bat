@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Orbit Development Environment Manager
echo ========================================
echo.

:menu
echo Select an option:
echo 1. Start all services (Backend + Admin + Orbit-360)
echo 2. Start Backend API only (Port 5000)
echo 3. Start Orbit Admin only (Port 3001)
echo 4. Start Orbit-360 only (Port 3003)
echo 5. Stop all services
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start_all
if "%choice%"=="2" goto start_backend
if "%choice%"=="3" goto start_admin
if "%choice%"=="4" goto start_orbit360
if "%choice%"=="5" goto stop_all
if "%choice%"=="6" goto exit
echo Invalid choice. Please try again.
echo.
goto menu

:start_all
echo.
echo Starting all services with optimized memory allocation...
echo.

echo [1/3] Starting Backend API (Port 5000)...
start "Backend API" cmd /c "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Orbit Admin (Port 3001)...
start "Orbit Admin" cmd /c "cd /d %~dp0orbit_admin && cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Starting Orbit-360 (Port 3003)...
start "Orbit-360" cmd /c "cd /d %~dp0Orbit-360 && cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev"

echo.
echo All services started successfully!
echo.
echo Ports:
echo - Backend API: http://localhost:5000
echo - Orbit Admin: http://localhost:3001
echo - Orbit-360: http://localhost:3003
echo.
echo Press any key to return to menu...
pause >nul
cls
goto menu

:start_backend
echo.
echo Starting Backend API...
cd /d %~dp0backend
npm run dev
goto menu

:start_admin
echo.
echo Starting Orbit Admin with 2GB memory...
cd /d %~dp0orbit_admin
cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev
goto menu

:start_orbit360
echo.
echo Starting Orbit-360 with 2GB memory...
cd /d %~dp0Orbit-360
cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev
goto menu

:stop_all
echo.
echo Stopping all services...
taskkill /f /fi "WINDOWTITLE eq Backend API*" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq Orbit Admin*" >nul 2>&1
taskkill /f /fi "WINDOWTITLE eq Orbit-360*" >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo Services stopped.
echo.
echo Press any key to return to menu...
pause >nul
cls
goto menu

:exit
echo.
echo Goodbye!
exit /b 0