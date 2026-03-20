# 🍔 FoodHub - React UI

Một giao diện người dùng hiện đại và tương tác cao cho hệ thống giao hàng thực phẩm, được xây dựng bằng React + Vite + Framer Motion.

## ✨ Tính Năng

### 1. **Khám Phá Nhà Hàng**
- Grid hiển thị các nhà hàng phổ biến
- Hiển thị thông tin nhà hàng (tên, địa chỉ, đánh giá)
- Modal menu với danh sách các món ăn
- Add to cart trực tiếp từ menu

### 2. **Giỏ Hàng**
- Sidebar giỏ hàng với animation mượt mà
- Xem danh sách sản phẩm đã chọn
- Tính tổng tiền tự động
- Xóa sản phẩm khỏi giỏ hàng
- Xóa toàn bộ giỏ hàng

### 3. **Theo Dõi Đơn Hàng**
- Hiển thị danh sách các đơn hàng
- Trạng thái đơn hàng (pending, confirmed, preparing, ready, delivered)
- Thông tin chi tiết đơn hàng
- Auto-refresh dữ liệu mỗi 10 giây

### 4. **Theo Dõi Giao Hàng**
- Timeline hiển thị trạng thái giao hàng
- Thông tin tài xế (tên, ID)
- Vị trí hiện tại
- Thời gian giao dự kiến
- Auto-refresh 10 giây

### 5. **Bảng Điều Khiển Admin**
- Xem trạng thái kết nối database
- Hiển thị số lượng dữ liệu trong database
- Chèn dữ liệu mẫu
- Xóa tất cả dữ liệu
- Làm mới trạng thái

### 6. **Giao Diện Đẹp**
- Design hiện đại với gradient
- Animation mượt mà (Framer Motion)
- Responsive design cho mobile
- Dark mode support
- Loading states

## 🚀 Cài Đặt & Chạy

### Yêu Cầu
- Node.js >= 16
- npm hoặc yarn

### Bước 1: Cài đặt Dependencies
```bash
npm install
```

### Bước 2: Chạy Development Server
```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:5173`

### Bước 3: Build Production
```bash
npm run build
```

### Bước 4: Preview Production Build
```bash
npm run preview
```

## 📁 Cấu Trúc Folder

```
food-delivery-ui/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Restaurants.jsx      # Restaurant listing & menu
│   │   ├── Orders.jsx          # Order tracking
│   │   ├── Deliveries.jsx      # Delivery tracking
│   │   ├── AdminPanel.jsx      # Admin control
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Footer.jsx          # Footer
│   │   └── [styles].css        # Component styles
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## 🎨 Công Nghệ Sử Dụng

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Styling
- **CSS3** - Vanilla CSS
- **CSS Grid & Flexbox** - Layout
- **CSS Variables** - Theme management
- **CSS Animations** - Smooth transitions

## 🔌 API Integration

React app tương tác với API Gateway tại `http://localhost:3000`

### Endpoints được sử dụng

#### Restaurants
```
GET /api/restaurants              # Danh sách nhà hàng
GET /api/restaurants/:id          # Chi tiết nhà hàng
GET /api/restaurants/:id/menu     # Menu của nhà hàng
POST /api/restaurants             # Tạo nhà hàng mới
```

#### Orders
```
GET /api/orders                   # Danh sách đơn hàng
GET /api/orders/:orderId          # Chi tiết đơn hàng
POST /api/orders                  # Tạo đơn hàng mới
PATCH /api/orders/:orderId/status # Cập nhật trạng thái
```

#### Deliveries
```
GET /api/deliveries               # Danh sách giao hàng
GET /api/deliveries/:id           # Chi tiết giao hàng
POST /api/deliveries              # Tạo giao hàng mới
PATCH /api/deliveries/:id/status  # Cập nhật trạng thái
```

#### Admin
```
GET /api/admin/db-status          # Trạng thái database
POST /api/admin/insert-data       # Chèn dữ liệu mẫu
POST /api/admin/clear-data        # Xóa tất cả dữ liệu
```

## 🎭 Component Details

### Navbar
- Logo với emoji 🍔
- Navigation menu (Home, Restaurants, Orders, Delivery, Admin)
- Cart button với badge số lượng
- Mobile responsive menu

### Hero Section
- Tiêu đề lớn
- Call-to-action button
- Animated emoji
- Responsive layout

### Restaurants
- Grid layout các nhà hàng
- Modal menu với các món ăn
- Add to cart functionality
- Loading states

### Orders
- Grid của các đơn hàng
- Status badge với màu sắc khác nhau
- Thông tin chi tiết đơn hàng
- Empty state

### Deliveries
- Delivery cards
- Timeline hiển thị trạng thái
- Thông tin tài xế
- Location tracking

### Admin Panel
- Database status indicator
- Stats grid (số lượng các collection)
- Action buttons (Insert, Clear, Refresh)
- Success/Error messages

### Cart
- Drawer sidebar animation
- Item list with remove buttons
- Total calculation
- Clear cart option

## 🔧 Customization

### Thay đổi màu sắc
Edit `src/index.css` trong `:root`:

```css
:root {
  --primary-color: #ff6b35;      /* Primary color */
  --secondary-color: #f7931e;    /* Secondary color */
  --accent-color: #004e89;       /* Accent color */
  /* ... */
}
```

### Thay đổi API URL
Edit `src/components/[component].jsx`:

```javascript
const API_BASE = 'http://localhost:3000/api';
```

### Thay đổi animation tốc độ
Edit Framer Motion transitions trong components

## 📱 Responsive Design

- Desktop: Full layout
- Tablet: Adjusted grid columns
- Mobile: Single column, full-width components

## ⚡ Performance

- Code splitting tự động
- Lazy loading components
- Optimized animations
- Cached API calls
- Auto-refresh intervals

## 🐛 Troubleshooting

### API Connection Error
1. Kiểm tra API Gateway chạy tại `http://localhost:3000`
2. Kiểm tra CORS configuration
3. Kiểm tra console browser cho errors

### Build Error
```bash
rm -rf node_modules
npm install
npm run build
```

### Port đã được sử dụng
```bash
npm run dev -- --port 5174
```

## 📊 Development

### Project Statistics
- **Components**: 8 functional components
- **CSS Files**: 8 styling files
- **Lines of Code**: ~1500+ LOC
- **Build Size**: ~200KB (gzipped)

## 🚀 Next Steps

1. Thêm checkout modal
2. Thêm authentication
3. Thêm payment integration
4. Thêm user profile
5. Thêm ratings & reviews

## 📝 License

MIT License

## 👨‍💻 Author

Created by: Tôi (Copilot)
Date: March 20, 2026

---

**Happy Ordering! 🍕🍔🍜**
