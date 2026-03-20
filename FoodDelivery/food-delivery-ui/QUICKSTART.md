# 🚀 Hướng Dẫn Chạy FoodHub React UI

## Quick Start (5 phút)

### 1️⃣ Chuẩn Bị
Đảm bảo bạn đã cài đặt:
- Node.js (>=16)
- npm (đã có kèm Node.js)

### 2️⃣ Chạy Backend (API Gateway & Services)

Mở Terminal mới, navigate đến folder FoodDelivery:

```bash
cd "t:\TongPhanKimThach_22637901_Lab\FoodDelivery"
npm start
```

Bạn sẽ thấy:
```
✓ API Gateway running on port 3000
✓ Order Service running on port 3001
✓ Restaurant Service running on port 3002
✓ Delivery Service running on port 3003
```

### 3️⃣ Chạy React Frontend

Mở Terminal mới khác:

```bash
cd "t:\TongPhanKimThach_22637901_Lab\FoodDelivery\food-delivery-ui"
npm install  # (Nếu chưa cài)
npm run dev
```

Bạn sẽ thấy:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 4️⃣ Truy Cập Ứng Dụng

Mở browser và nhập:
```
http://localhost:5173
```

## 📖 Hướng Dẫn Sử Dụng

### 🏠 Home Page
- Nhấn **"Order Now"** để xem danh sách nhà hàng

### 🍽️ Restaurants
- Click vào nhà hàng để xem menu
- Click **"View Menu"** để mở modal
- Click **"Add"** để thêm món ăn vào giỏ

### 🛒 Shopping Cart
- Click nút **🛒** ở góc phải
- Xem các món đã thêm
- Click **"Proceed to Checkout"** để đặt hàng
- Click **"Clear Cart"** để xóa tất cả

### 📦 Your Orders
- Click **"Orders"** trong navbar
- Xem trạng thái các đơn hàng
- Tự động cập nhật mỗi 10 giây

### 🚗 Track Delivery
- Click **"Delivery"** trong navbar
- Xem timeline giao hàng
- Theo dõi tài xế

### ⚙️ Admin Panel
- Click **"Admin"** trong navbar
- Xem số lượng dữ liệu
- Click **"Insert Sample Data"** để thêm dữ liệu mẫu
- Click **"Clear All Data"** để xóa dữ liệu

## 🛠️ Các Lệnh Hữu Ích

### Development
```bash
npm run dev           # Chạy dev server
npm run build         # Build production
npm run preview       # Preview production build
```

### Debugging
- Mở **DevTools** (F12)
- Xem **Console** tab
- Kiểm tra **Network** tab

## ⚠️ Lỗi Phổ Biến & Giải Pháp

### 1. "Cannot GET http://localhost:5173"
**Giải pháp**: Dev server chưa chạy
```bash
npm run dev
```

### 2. "API request failed"
**Giải pháp**: API Gateway chưa chạy
- Quay lại backend terminal
- Chạy `npm start`

### 3. "Port 5173 already in use"
**Giải pháp**: Sử dụng port khác
```bash
npm run dev -- --port 5174
```

### 4. "npm command not found"
**Giải pháp**: Cài đặt Node.js từ nodejs.org

### 5. CORS Error
**Giải pháp**: Kiểm tra API Gateway chạy và CORS enabled

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│    React UI (Port 5173)                 │
│  ├─ Navbar                              │
│  ├─ Hero                                │
│  ├─ Restaurants                         │
│  ├─ Orders                              │
│  ├─ Deliveries                          │
│  ├─ AdminPanel                          │
│  ├─ Cart                                │
│  └─ Footer                              │
└─────────────────────────────────────────┘
         │ HTTP Requests
         │ (Axios)
         ▼
┌─────────────────────────────────────────┐
│    API Gateway (Port 3000)              │
├─────────────────────────────────────────┤
│  ├─ /api/restaurants                    │
│  ├─ /api/orders                         │
│  ├─ /api/deliveries                     │
│  └─ /api/admin/*                        │
└─────────────────────────────────────────┘
         │
    ┌────┼────┬────────┐
    │    │    │        │
    ▼    ▼    ▼        ▼
┌────┐┌────┐┌────┐┌──────────┐
│OR  ││RES││DEL││MongoDBL  │
│SVC ││SVC││SVC││          │
└────┘└────┘└────┘└──────────┘
```

## 🎯 Features Overview

| Feature | Status | Endpoint |
|---------|--------|----------|
| View Restaurants | ✅ | GET /api/restaurants |
| View Menu | ✅ | GET /api/restaurants/:id/menu |
| Add to Cart | ✅ | Frontend only |
| View Orders | ✅ | GET /api/orders |
| Track Delivery | ✅ | GET /api/deliveries |
| Admin Insert Data | ✅ | POST /api/admin/insert-data |
| Admin Clear Data | ✅ | POST /api/admin/clear-data |
| Checkout | 🔄 | Coming Soon |

## 💡 Tips & Tricks

### Để xem dữ liệu mẫu
1. Mở Admin Panel
2. Click "Insert Sample Data"
3. Quay lại Restaurants để xem nhà hàng

### Để test order flow
1. Chọn nhà hàng → thêm menu items
2. Mở giỏ hàng → click "Proceed"
3. Mở Orders tab → xem đơn hàng mới

### Để kiểm tra API responses
1. Mở DevTools (F12)
2. Mở Network tab
3. Refresh page
4. Click request để xem response

## 📚 Tài Liệu Thêm

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Axios Documentation](https://axios-http.com)

## ❓ FAQ

**Q: Làm sao để đổi port?**
A: `npm run dev -- --port 3000`

**Q: Làm sao để xóa node_modules?**
A: 
```bash
rm -rf node_modules
npm install
```

**Q: Làm sao để build cho production?**
A: `npm run build`

**Q: Công nghệ nào được sử dụng?**
A: React, Vite, Framer Motion, Axios

---

**Need Help?** Check console logs in DevTools (F12)

**Happy Coding! 🚀**
