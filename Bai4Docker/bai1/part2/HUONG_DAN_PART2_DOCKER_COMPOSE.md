# Part 2 - Docker Compose file (15 bài)

Thư mục gốc: `bai1/part2`

## Cách chạy mỗi bài
1. Mở terminal tại thư mục của bài (ví dụ: `bai01-nginx`).
2. Chạy:
   ```bash
   docker compose up -d --build
   docker compose ps
   ```
3. Kiểm tra kết quả theo cổng/bài bên dưới.
4. Chụp màn hình minh chứng.
5. Dọn dẹp:
   ```bash
   docker compose down -v
   ```

---

## Danh sách bài và kết quả mong đợi

1. **bai01-nginx**
   - Cổng: `http://localhost:8080`

2. **bai02-mysql**
   - MySQL 8.0
   - DB: `mydb`, user: `user`, password: `password`

3. **bai03-mysql-phpmyadmin**
   - PHPMyAdmin: `http://localhost:8081`

4. **bai04-node-express**
   - Web: `http://localhost:3000`

5. **bai05-redis**
   - Redis: `localhost:6379`

6. **bai06-wordpress-mysql**
   - WordPress: `http://localhost:8082`

7. **bai07-mongodb-mongoexpress**
   - Mongo Express: `http://localhost:8084`

8. **bai08-node-mysql**
   - Web/API: `http://localhost:3001`

9. **bai09-python-flask**
   - Web: `http://localhost:5000`

10. **bai10-mysql-volume**
    - MySQL có volume: `mysql_persistent_data`

11. **bai11-postgres-adminer**
    - Postgres: DB `mydb`, user `user`, password `password`
    - Adminer: `http://localhost:8083`

12. **bai12-prometheus-grafana**
    - Prometheus: `http://localhost:9090`
    - Grafana: `http://localhost:3002`

13. **bai13-react-nginx**
    - React app qua Nginx: `http://localhost:8085`

14. **bai14-private-network**
    - Hai container `service-a`, `service-b` cùng mạng `private_net`
    - Test giao tiếp:
      ```bash
      docker compose exec service-a ping -c 3 service-b
      ```

15. **bai15-redis-limits**
    - Redis giới hạn tài nguyên (CPU/RAM) trong file compose.

---

## Lưu ý
- Chạy từng bài một để tránh trùng cổng.
- Nếu báo lỗi cổng bận, dừng bài trước bằng `docker compose down -v`.
