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
const { insertData } = require('./scripts/insertData');

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

// Insert sample data (used for lab demonstration)
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
    await insertData();

    res.json({ message: 'Sample data inserted successfully', action: 'inserted' });
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

connectDB()
  .then(async () => {
    // Auto-initialize database if empty
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`✓ API Gateway running on port ${PORT}`);
      console.log(`✓ Access the app at http://localhost:${PORT}`);
      console.log(`✓ Database connected successfully`);
    });
  })
  .catch((error) => {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  });

