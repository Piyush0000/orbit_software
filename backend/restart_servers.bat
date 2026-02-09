@echo off
taskkill /F /IM node.exe
cd /d "%~dp0"
start "Backend" cmd /k "npm run dev"
cd /d "%~dp0..\templates\orbit_storefront_hub"
start "Storefront" cmd /k "npm run dev"
