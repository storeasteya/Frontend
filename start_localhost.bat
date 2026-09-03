@echo off
title ASTEYA - Starting Local Development Environment

echo ========================================================
echo          🚀 ASTEYA ANIME MERCHANDISE STORE
echo ========================================================
echo.
echo Starting Backend Server on http://localhost:3000...
start "ASTEYA Backend (Port 3000)" cmd /k "cd /d "%~dp0animeverse-backend" && npm start"

echo.
echo Starting Frontend Server on http://localhost:5173...
start "ASTEYA Frontend (Port 5173)" cmd /k "cd /d "%~dp0animeverse-frontend" && npm run dev"

echo.
echo Waiting 3 seconds for servers to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Opening http://localhost:5173 in your default browser...
start http://localhost:5173

echo.
echo ========================================================
echo ✅ Local servers launched successfully!
echo.
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:3000
echo ========================================================
