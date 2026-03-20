const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Import Models
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');
const Delivery = require('./models/Delivery');
const connectDB = require('./config/database');
const initializeDatabase = require('./config/initializeDB');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Service URLs
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || 'http://localhost:3001';
const RESTAURANT_SERVICE = process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002';
const DELIVERY_SERVICE = process.env.DELIVERY_SERVICE_URL || 'http://localhost:3003';

// Gateway routes - Orders
app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE}/api/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE}/api/orders/${req.params.orderId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_SERVICE}/api/orders`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const response = await axios.patch(`${ORDER_SERVICE}/api/orders/${req.params.orderId}/status`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gateway routes - Restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.get(`${RESTAURANT_SERVICE}/api/restaurants`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const response = await axios.get(`${RESTAURANT_SERVICE}/api/restaurants/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/restaurants/:restaurantId/menu', async (req, res) => {
  try {
    const response = await axios.get(`${RESTAURANT_SERVICE}/api/restaurants/${req.params.restaurantId}/menu`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.post(`${RESTAURANT_SERVICE}/api/restaurants`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gateway routes - Deliveries
app.get('/api/deliveries', async (req, res) => {
  try {
    const response = await axios.get(`${DELIVERY_SERVICE}/api/deliveries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/deliveries/:id', async (req, res) => {
  try {
    const response = await axios.get(`${DELIVERY_SERVICE}/api/deliveries/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/deliveries', async (req, res) => {
  try {
    const response = await axios.post(`${DELIVERY_SERVICE}/api/deliveries`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/deliveries/:id/status', async (req, res) => {
  try {
    const response = await axios.patch(`${DELIVERY_SERVICE}/api/deliveries/${req.params.id}/status`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== DATA MANAGEMENT ENDPOINTS =====

// Get database status
app.get('/api/admin/db-status', async (req, res) => {
  try {
    const restaurantCount = await Restaurant.countDocuments();
    const menuItemCount = await MenuItem.countDocuments();
    const orderCount = await Order.countDocuments();
    const deliveryCount = await Delivery.countDocuments();
    
    res.json({
      status: 'connected',
      database: 'food_delivery',
      collections: {
        restaurants: restaurantCount,
        menuItems: menuItemCount,
        orders: orderCount,
        deliveries: deliveryCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Insert sample data
app.post('/api/admin/insert-data', async (req, res) => {
  try {
    // Check if data already exists
    const restaurantCount = await Restaurant.countDocuments();
    if (restaurantCount > 0) {
      return res.json({ 
        message: 'Data already exists in database',
        action: 'skipped',
        collections: {
          restaurants: restaurantCount,
          menuItems: await MenuItem.countDocuments(),
          orders: await Order.countDocuments(),
          deliveries: await Delivery.countDocuments()
        }
      });
    }

    // Insert restaurants
    const restaurants = await Restaurant.insertMany([
      {
        name: 'Pizza Palace',
        address: '123 Main St, City Center',
        phone: '0123456789',
        email: 'info@pizzapalace.com',
        cuisine: ['Italian', 'Pizza', 'Pasta'],
        rating: 4.8
      },
      {
        name: 'Dragon Kitchen',
        address: '456 Asia Blvd, Downtown',
        phone: '0987654321',
        email: 'contact@dragonkitchen.com',
        cuisine: ['Chinese', 'Asian', 'Vietnamese'],
        rating: 4.6
      },
      {
        name: 'Burger Paradise',
        address: '789 Fast Food Lane, Mall Area',
        phone: '0555666777',
        email: 'hello@burgerparadise.com',
        cuisine: ['American', 'Burgers', 'Fast Food'],
        rating: 4.4
      },
      {
        name: 'Sushi House',
        address: '321 Ocean View Rd, Beach District',
        phone: '0888999000',
        email: 'book@sushihouse.com',
        cuisine: ['Japanese', 'Sushi', 'Seafood'],
        rating: 4.9
      }
    ]);

    // Insert menu items
    const menuItems = await MenuItem.insertMany([
      // Pizza Palace Menu
      { restaurantId: restaurants[0]._id, name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil', price: 12.99, category: 'Pizza', isAvailable: true },
      { restaurantId: restaurants[0]._id, name: 'Pepperoni Pizza', description: 'Delicious pizza with pepperoni and cheese', price: 14.99, category: 'Pizza', isAvailable: true },
      { restaurantId: restaurants[0]._id, name: 'Spaghetti Carbonara', description: 'Traditional Italian pasta with cream and bacon', price: 13.99, category: 'Pasta', isAvailable: true },
      // Dragon Kitchen Menu
      { restaurantId: restaurants[1]._id, name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts and vegetables', price: 11.99, category: 'Main Course', isAvailable: true },
      { restaurantId: restaurants[1]._id, name: 'Fried Rice', description: 'Fragrant fried rice with egg and vegetables', price: 10.99, category: 'Rice', isAvailable: true },
      { restaurantId: restaurants[1]._id, name: 'Spring Rolls', description: 'Crispy spring rolls with sweet dipping sauce', price: 8.99, category: 'Appetizer', isAvailable: true },
      // Burger Paradise Menu
      { restaurantId: restaurants[2]._id, name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheese and toppings', price: 9.99, category: 'Burgers', isAvailable: true },
      { restaurantId: restaurants[2]._id, name: 'Bacon Burger', description: 'Double patty with crispy bacon and special sauce', price: 12.99, category: 'Burgers', isAvailable: true },
      { restaurantId: restaurants[2]._id, name: 'French Fries', description: 'Golden crispy fries with sea salt', price: 4.99, category: 'Sides', isAvailable: true },
      // Sushi House Menu
      { restaurantId: restaurants[3]._id, name: 'California Roll', description: 'Crab, avocado, and cucumber wrapped in sushi rice', price: 15.99, category: 'Sushi', isAvailable: true },
      { restaurantId: restaurants[3]._id, name: 'Salmon Sashimi', description: 'Fresh premium salmon slices', price: 18.99, category: 'Sashimi', isAvailable: true },
      { restaurantId: restaurants[3]._id, name: 'Miso Soup', description: 'Traditional soybean soup with tofu and seaweed', price: 5.99, category: 'Soup', isAvailable: true }
    ]);

    // Insert sample orders
    const orders = await Order.insertMany([
      {
        customerId: 'CUST001',
        restaurantId: restaurants[0]._id,
        items: [
          { itemId: menuItems[0]._id, quantity: 1, price: 12.99 },
          { itemId: menuItems[1]._id, quantity: 1, price: 14.99 }
        ],
        totalPrice: 27.98,
        status: 'completed',
        deliveryAddress: '123 Main St, City Center',
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        customerId: 'CUST002',
        restaurantId: restaurants[1]._id,
        items: [
          { itemId: menuItems[3]._id, quantity: 2, price: 11.99 },
          { itemId: menuItems[5]._id, quantity: 1, price: 8.99 }
        ],
        totalPrice: 32.97,
        status: 'completed',
        deliveryAddress: '456 Asia Blvd, Downtown',
        createdAt: new Date(Date.now() - 172800000)
      },
      {
        customerId: 'CUST003',
        restaurantId: restaurants[2]._id,
        items: [
          { itemId: menuItems[6]._id, quantity: 1, price: 9.99 },
          { itemId: menuItems[8]._id, quantity: 1, price: 4.99 }
        ],
        totalPrice: 14.98,
        status: 'processing',
        deliveryAddress: '789 Fast Food Lane, Mall Area',
        createdAt: new Date()
      },
      {
        customerId: 'CUST004',
        restaurantId: restaurants[3]._id,
        items: [
          { itemId: menuItems[9]._id, quantity: 1, price: 15.99 },
          { itemId: menuItems[11]._id, quantity: 1, price: 5.99 }
        ],
        totalPrice: 21.98,
        status: 'pending',
        deliveryAddress: '321 Ocean View Rd, Beach District',
        createdAt: new Date()
      }
    ]);

    // Insert sample deliveries
    const deliveries = await Delivery.insertMany([
      {
        orderId: orders[0]._id,
        customerId: 'CUST001',
        driverId: 'DRIVER001',
        driverName: 'John Smith',
        status: 'delivered',
        currentLocation: '123 Main St, City Center',
        estimatedTime: 30,
        actualTime: 28
      },
      {
        orderId: orders[1]._id,
        customerId: 'CUST002',
        driverId: 'DRIVER002',
        driverName: 'Sarah Johnson',
        status: 'delivered',
        currentLocation: '456 Asia Blvd, Downtown',
        estimatedTime: 25,
        actualTime: 24
      },
      {
        orderId: orders[2]._id,
        customerId: 'CUST003',
        driverId: 'DRIVER003',
        driverName: 'Mike Chen',
        status: 'on_the_way',
        currentLocation: 'Starting at restaurant',
        estimatedTime: 20,
        actualTime: null
      },
      {
        orderId: orders[3]._id,
        customerId: 'CUST004',
        driverId: 'DRIVER004',
        driverName: 'Emma Williams',
        status: 'preparing',
        currentLocation: 'At restaurant kitchen',
        estimatedTime: 35,
        actualTime: null
      }
    ]);

    res.json({
      message: 'Sample data inserted successfully',
      action: 'inserted',
      collections: {
        restaurants: restaurants.length,
        menuItems: menuItems.length,
        orders: orders.length,
        deliveries: deliveries.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all data
app.post('/api/admin/clear-data', async (req, res) => {
  try {
    const restaurantResult = await Restaurant.deleteMany({});
    const menuItemResult = await MenuItem.deleteMany({});
    const orderResult = await Order.deleteMany({});
    const deliveryResult = await Delivery.deleteMany({});

    res.json({
      message: 'All data cleared successfully',
      action: 'cleared',
      deleted: {
        restaurants: restaurantResult.deletedCount,
        menuItems: menuItemResult.deletedCount,
        orders: orderResult.deletedCount,
        deliveries: deliveryResult.deletedCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

// Initialize database connection and start server
const PORT = process.env.GATEWAY_PORT || 3000;

connectDB().then(async () => {
  // Auto-initialize database if empty
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`✓ API Gateway running on port ${PORT}`);
    console.log(`✓ Access the app at http://localhost:${PORT}`);
    console.log(`✓ Database connected successfully`);
  });
}).catch((error) => {
  console.error('✗ Failed to start server:', error.message);
  process.exit(1);
});
