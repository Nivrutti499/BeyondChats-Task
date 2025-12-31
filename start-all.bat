@echo off
echo ========================================
echo   BeyondChats Article Management
echo   Starting Mock API and Frontend...
echo ========================================
echo.

start "Mock API Server" cmd /k "cd /d %~dp0mock-api-server && npm install && npm start"
timeout /t 3 /nobreak >nul
start "React Frontend" cmd /k "cd /d %~dp0react-frontend && npm start"

echo.
echo Both servers are starting...
echo Mock API will run on: http://localhost:8000
echo Frontend will run on: http://localhost:3000
echo.
pause




