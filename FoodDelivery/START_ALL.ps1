# Start All Services Script for FoodDelivery
# This script starts API Gateway + 3 Microservices + Frontend

$basePath = "t:\TongPhanKimThach_22637901_Lab\FoodDelivery"

Write-Host "Starting FoodDelivery System..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Function to open new PowerShell window and run command
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$Command,
        [string]$WorkingDirectory
    )
    
    $scriptContent = @"
cd '$WorkingDirectory'
Write-Host "Starting $ServiceName..." -ForegroundColor Cyan
$Command
"@
    
    $scriptPath = "$env:TEMP\start_$ServiceName.ps1"
    Set-Content -Path $scriptPath -Value $scriptContent
    
    Start-Process powershell.exe -ArgumentList "-NoExit -File `"$scriptPath`"" -WindowStyle Normal
    Start-Sleep -Seconds 2
}

# Start API Gateway (Port 3000)
Write-Host "[1] Starting API Gateway (Port 3000)..." -ForegroundColor Yellow
Start-Service -ServiceName "API_Gateway" -Command "npm start" -WorkingDirectory $basePath
Write-Host "OK - API Gateway started" -ForegroundColor Green

# Start Order Service (Port 3001)
Write-Host "[2] Starting Order Service (Port 3001)..." -ForegroundColor Yellow
Start-Service -ServiceName "Order_Service" -Command "npm run api:order" -WorkingDirectory $basePath
Write-Host "OK - Order Service started" -ForegroundColor Green

# Start Restaurant Service (Port 3002)
Write-Host "[3] Starting Restaurant Service (Port 3002)..." -ForegroundColor Yellow
Start-Service -ServiceName "Restaurant_Service" -Command "npm run api:restaurant" -WorkingDirectory $basePath
Write-Host "OK - Restaurant Service started" -ForegroundColor Green

# Start Delivery Service (Port 3003)
Write-Host "[4] Starting Delivery Service (Port 3003)..." -ForegroundColor Yellow
Start-Service -ServiceName "Delivery_Service" -Command "npm run api:delivery" -WorkingDirectory $basePath
Write-Host "OK - Delivery Service started" -ForegroundColor Green

# Start Frontend (Port 5173)
Write-Host "[5] Starting Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Service -ServiceName "Frontend" -Command "npm run dev" -WorkingDirectory "$basePath\food-delivery-ui"
Write-Host "OK - Frontend started" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "All Services Started!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services URLs:" -ForegroundColor Cyan
Write-Host "   API Gateway:         http://localhost:3000" -ForegroundColor White
Write-Host "   Order Service:       http://localhost:3001" -ForegroundColor White
Write-Host "   Restaurant Service:  http://localhost:3002" -ForegroundColor White
Write-Host "   Delivery Service:    http://localhost:3003" -ForegroundColor White
Write-Host "   Frontend (React):    http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Open your browser: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Keep this window open. Close it to stop all services." -ForegroundColor Yellow
Write-Host ""

# Keep main window open
Read-Host "Press Enter to exit"
