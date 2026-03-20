#!/usr/bin/env pwsh
# Script commit tung anh voi message de doc

# Navigate to workspace
cd "t:\TongPhanKimThach_22637901_Lab"

# Check git status
Write-Host "=== Kiem tra Git Status ===" -ForegroundColor Cyan
git status
Write-Host ""

# Array cua cac anh va commit messages
$commits = @(
    @{
        file = 'MinhChung/minhchung_docker/1. `docker compose version`.jpg'
        message = "docs: Them anh demo docker compose version"
    },
    @{
        file = 'MinhChung/minhchung_docker/2. `docker compose up`.jpg'
        message = "docs: Them anh demo docker compose up"
    },
    @{
        file = 'MinhChung/minhchung_docker/3. `docker compose up -d`.jpg'
        message = "docs: Them anh demo docker compose up -d (background)"
    },
    @{
        file = 'MinhChung/minhchung_docker/4. `docker compose ps`.jpg'
        message = "docs: Them anh demo docker compose ps (xem status)"
    },
    @{
        file = 'MinhChung/minhchung_docker/5. `docker compose down`.jpg'
        message = "docs: Them anh demo docker compose down (dung services)"
    },
    @{
        file = 'MinhChung/minhchung_docker/6. `docker compose restart`.jpg'
        message = "docs: Them anh demo docker compose restart"
    },
    @{
        file = 'MinhChung/minhchung_docker/7. `docker compose logs -f`.jpg'
        message = "docs: Them anh demo docker compose logs -f (xem logs)"
    },
    @{
        file = 'MinhChung/minhchung_docker/8. `docker compose build`.jpg'
        message = "docs: Them anh demo docker compose build"
    },
    @{
        file = 'MinhChung/minhchung_docker/9. `docker compose exec`.jpg'
        message = "docs: Them anh demo docker compose exec (chay command)"
    },
    @{
        file = 'MinhChung/minhchung_docker/10. `docker compose down -v`.jpg'
        message = "docs: Them anh demo docker compose down -v (xoa volumes)"
    },
    @{
        file = 'MinhChung/minhchung_docker/11. `docker compose run`.jpg'
        message = "docs: Them anh demo docker compose run"
    },
    @{
        file = 'MinhChung/minhchung_docker/12. `docker compose stop`.jpg'
        message = "docs: Them anh demo docker compose stop"
    },
    @{
        file = 'MinhChung/minhchung_docker/13. `docker compose rm`.jpg'
        message = "docs: Them anh demo docker compose rm (xoa container)"
    },
    @{
        file = 'MinhChung/minhchung_docker/14. `docker compose config`.jpg'
        message = "docs: Them anh demo docker compose config"
    },
    @{
        file = 'MinhChung/minhchung_docker/15. `docker compose up -d --build`.jpg'
        message = "docs: Them anh demo docker compose up -d --build"
    },
    @{
        file = "MinhChung/minhchung_docker/bai01-nginx.jpg"
        message = "docs: Them anh demo bai 1 - Nginx voi Docker Compose"
    },
    @{
        file = "MinhChung/minhchung_docker/bai01-nginx1.jpg"
        message = "docs: Them anh demo bai 1 - Nginx (anh 2)"
    },
    @{
        file = "MinhChung/minhchung_docker/bai02-mysql.jpg"
        message = "docs: Them anh demo bai 2 - MySQL voi Docker Compose"
    },
    @{
        file = "MinhChung/minhchung_docker/bai03-mysql-phpmyadmin.jpg"
        message = "docs: Them anh demo bai 3 - MySQL + PhpMyAdmin"
    },
    @{
        file = "MinhChung/minhchung_docker/bai03-mysql-phpmyadmin1.jpg"
        message = "docs: Them anh demo bai 3 - MySQL + PhpMyAdmin (anh 2)"
    },
    @{
        file = "MinhChung/minhchung_docker/bai04-node-express.jpg"
        message = "docs: Them anh demo bai 4 - Node.js Express voi Docker"
    },
    @{
        file = "MinhChung/minhchung_docker/bai04-node-express1.jpg"
        message = "docs: Them anh demo bai 4 - Node.js Express (anh 2)"
    },
    @{
        file = "MinhChung/minhchung_docker/bai05-redis.jpg"
        message = "docs: Them anh demo bai 5 - Redis voi Docker Compose"
    }
)

# Commit tung anh
Write-Host "=== Bat dau commit tung anh ===" -ForegroundColor Green
Write-Host ""

$count = 0
foreach ($commit in $commits) {
    $count++
    $file = $commit.file
    $message = $commit.message
    
    Write-Host "[$count/$($commits.Count)] Committing: $file" -ForegroundColor Yellow
    
    # Add file
    git add "$file" 2>&1
    
    # Commit with message
    git commit -m "$message" 2>&1
    
    Write-Host "OK - Done" -ForegroundColor Green
    Write-Host ""
}

Write-Host "=== Tat ca anh da duoc commit! ===" -ForegroundColor Green
Write-Host ""

# Show git log
Write-Host "=== Git Commit History ===" -ForegroundColor Cyan
git log --oneline -n 25

Write-Host ""
Write-Host "OK - Hoan thanh!" -ForegroundColor Green
