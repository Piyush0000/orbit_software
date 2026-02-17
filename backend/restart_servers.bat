@echo off
taskkill /F /IM node.exe
cd /d "%~dp0"
start "Backend" cmd /k "npm run dev"
