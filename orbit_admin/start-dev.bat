@echo off
echo Starting Orbit Admin Panel...
echo Port: 3001
echo Allocating 2GB memory (optimized for parallel execution)...
echo.

cross-env NODE_OPTIONS=--max-old-space-size=2048 npm run dev

pause