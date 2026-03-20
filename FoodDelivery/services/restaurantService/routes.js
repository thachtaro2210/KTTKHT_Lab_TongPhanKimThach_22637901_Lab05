const express = require('express');
const cors = require('cors');
const Restaurant = require('../../models/Restaurant');
const MenuItem = require('../../models/MenuItem');
const { publishEvent } = require('../../config/rabbitmq');

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new restaurant
router.post('/', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    
    await publishEvent('restaurant.created', {
      restaurantId: savedRestaurant._id,
      name: savedRestaurant.name,
      timestamp: new Date()
    });

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get menu items for restaurant
router.get('/:restaurantId/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add menu item
router.post('/:restaurantId/menu', async (req, res) => {
  try {
    const newMenuItem = new MenuItem({
      ...req.body,
      restaurantId: req.params.restaurantId
    });
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
