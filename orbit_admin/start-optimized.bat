@echo off
echo Starting Orbit Admin with optimized memory (2GB)...
echo Port: 3001
echo.

set NODE_OPTIONS=--max-old-space-size=2048
npm run dev

pause