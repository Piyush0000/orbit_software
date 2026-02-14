@echo off
taskkill /f /im node.exe
timeout /t 2 /nobreak
rd /s /q context
rd /s /q lib
rd /s /q .next
echo Done
