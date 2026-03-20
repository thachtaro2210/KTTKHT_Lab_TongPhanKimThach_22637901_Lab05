#!/usr/bin/env pwsh

# Set git config to not use pager
git config --global core.pager ""

cd 't:\TongPhanKimThach_22637901_Lab'

# Check git status
Write-Host "=== Git Status ===" -ForegroundColor Cyan
git status

# List FoodDelivery structure
Write-Host "`n=== FoodDelivery Structure ===" -ForegroundColor Cyan
Get-ChildItem -Path "FoodDelivery" -Recurse -File | Select-Object -First 30 FullName
