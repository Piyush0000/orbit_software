@echo off
echo ========================================
echo ORBIT360 Onboarding Website Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
cd /d d:\orbit\onboarding
call npm install

echo.
echo Step 2: Starting development server...
echo The website will be available at: http://localhost:3004
echo.
call npm run dev
