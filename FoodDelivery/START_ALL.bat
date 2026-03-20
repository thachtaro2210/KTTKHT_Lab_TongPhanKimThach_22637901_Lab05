@echo off
REM FoodDelivery - Start All Services Script
REM This script starts all backend services and frontend

setlocal enabledelayedexpansion

set BASE_PATH=t:\TongPhanKimThach_22637901_Lab\FoodDelivery

echo.
echo ================================
echo Starting FoodDelivery System...
echo ================================
echo.

REM Start API Gateway (Port 3000)
echo 1. Starting API Gateway (Port 3000)...
start "API Gateway" cmd /k "cd /d %BASE_PATH% && npm start"
timeout /t 3 /nobreak

REM Start Order Service (Port 3001)
echo 2. Starting Order Service (Port 3001)...
start "Order Service" cmd /k "cd /d %BASE_PATH% && npm run api:order"
timeout /t 3 /nobreak

REM Start Restaurant Service (Port 3002)
echo 3. Starting Restaurant Service (Port 3002)...
start "Restaurant Service" cmd /k "cd /d %BASE_PATH% && npm run api:restaurant"
timeout /t 3 /nobreak

REM Start Delivery Service (Port 3003)
echo 4. Starting Delivery Service (Port 3003)...
start "Delivery Service" cmd /k "cd /d %BASE_PATH% && npm run api:delivery"
timeout /t 3 /nobreak

REM Start Frontend (Port 5173)
echo 5. Starting Frontend (Port 5173)...
start "React Frontend" cmd /k "cd /d %BASE_PATH%\food-delivery-ui && npm run dev"
timeout /t 3 /nobreak

echo.
echo ================================
echo All Services Started!
echo ================================
echo.
echo Services URLs:
echo   API Gateway:         http://localhost:3000
echo   Order Service:       http://localhost:3001
echo   Restaurant Service:  http://localhost:3002
echo   Delivery Service:    http://localhost:3003
echo   Frontend (React):    http://localhost:5173
echo.
echo Open your browser and go to: http://localhost:5173
echo.
pause
