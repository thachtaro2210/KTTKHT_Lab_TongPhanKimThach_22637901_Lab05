const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Delivery = require('./models/Delivery');
const Order = require('./models/Order');
const { publishEvent } = require('./config/rabbitmq');

const router = express.Router();

// Get all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get delivery by ID
router.get('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new delivery
router.post('/', async (req, res) => {
  try {
    const newDelivery = new Delivery(req.body);
    const savedDelivery = await newDelivery.save();

    // Update order status to ready (if delivery assigned)
    if (req.body?.orderId) {
      await Order.findByIdAndUpdate(req.body.orderId, { status: 'ready' });
    }

    await publishEvent('delivery.assigned', {
      deliveryId: savedDelivery._id,
      orderId: req.body.orderId,
      driverId: req.body.driverId,
      timestamp: new Date()
    });

    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update delivery status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    // If delivery completed, update order status
    if (status === 'delivered' && delivery?.orderId) {
      await Order.findByIdAndUpdate(delivery.orderId, { status: 'delivered' });
    }

    await publishEvent('delivery.status.changed', {
      deliveryId: req.params.id,
      status,
      timestamp: new Date()
    });

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get deliveries by driver
router.get('/driver/:driverId', async (req, res) => {
  try {
    const deliveries = await Delivery.find({ driverId: req.params.driverId });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

