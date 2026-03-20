const express = require('express');
const cors = require('cors');
const Order = require('./models/Order');
const { publishEvent } = require('./config/rabbitmq');

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerId, customerName, customerPhone, restaurantId, items, totalAmount, deliveryAddress } = req.body;

    const orderId = `ORD-${Date.now()}`;
    const newOrder = new Order({
      orderId,
      customerId,
      customerName,
      customerPhone,
      restaurantId,
      items,
      totalAmount,
      deliveryAddress,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();

    // Publish order created event
    await publishEvent('order.created', {
      orderId: savedOrder._id,
      orderNumber: orderId,
      restaurantId,
      totalAmount,
      timestamp: new Date()
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status, updatedAt: new Date() },
      { new: true }
    );

    // Publish status changed event
    await publishEvent('order.status.changed', {
      orderId: req.params.orderId,
      status,
      timestamp: new Date()
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const orders = await Order.find({ restaurantId: req.params.restaurantId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

