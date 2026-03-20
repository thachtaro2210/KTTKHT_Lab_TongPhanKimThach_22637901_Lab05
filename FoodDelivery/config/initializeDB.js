const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');

// Auto-initialize database with sample data if empty
const initializeDatabase = async () => {
  try {
    // Check if restaurants collection is empty
    const restaurantCount = await Restaurant.countDocuments();
    
    if (restaurantCount === 0) {
      console.log('📊 Database is empty. Auto-inserting sample data...');
      
      // Insert restaurants
      console.log('🏪 Inserting sample restaurants...');
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
          cuisine: ['American', 'Burger', 'Fast Food'],
          rating: 4.5
        },
        {
          name: 'Sushi Master',
          address: '321 Harbor St, Waterfront',
          phone: '0111222333',
          email: 'orders@sushimaster.com',
          cuisine: ['Japanese', 'Sushi', 'Asian'],
          rating: 4.9
        },
        {
          name: 'Taco Fiesta',
          address: '654 Sunset Blvd, West Side',
          phone: '0444555666',
          email: 'hello@tacofiesta.com',
          cuisine: ['Mexican', 'Tacos', 'Latin'],
          rating: 4.4
        }
      ]);

      console.log('🍽️  Inserting sample menu items...');
      const menuItems = await MenuItem.insertMany([
        // Pizza Palace items
        { restaurantId: restaurants[0]._id, name: 'Margherita Pizza', description: 'Classic tomato, mozzarella & basil', price: 12.99, category: 'Pizza', isVegetarian: true },
        { restaurantId: restaurants[0]._id, name: 'Pepperoni Pizza', description: 'Tomato, cheese & pepperoni', price: 14.99, category: 'Pizza', isVegetarian: false },
        { restaurantId: restaurants[0]._id, name: 'Vegetarian Supreme', description: 'Fresh veggies & mozzarella', price: 13.99, category: 'Pizza', isVegetarian: true },
        { restaurantId: restaurants[0]._id, name: 'Pasta Carbonara', description: 'Creamy egg & bacon pasta', price: 11.99, category: 'Pasta', isVegetarian: false },
        { restaurantId: restaurants[0]._id, name: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 4.99, category: 'Appetizer', isVegetarian: true },

        // Dragon Kitchen items
        { restaurantId: restaurants[1]._id, name: 'Kung Pao Chicken', description: 'Chicken with peanuts & spices', price: 10.99, category: 'Main', isVegetarian: false },
        { restaurantId: restaurants[1]._id, name: 'Fried Rice', description: 'Egg fried rice with vegetables', price: 8.99, category: 'Rice', isVegetarian: true },
        { restaurantId: restaurants[1]._id, name: 'Spring Rolls', description: 'Crispy vegetable spring rolls', price: 6.99, category: 'Appetizer', isVegetarian: true },
        { restaurantId: restaurants[1]._id, name: 'Beef with Broccoli', description: 'Tender beef & fresh broccoli', price: 11.99, category: 'Main', isVegetarian: false },
        { restaurantId: restaurants[1]._id, name: 'Sweet & Sour Pork', description: 'Pork in tangy sweet sauce', price: 12.99, category: 'Main', isVegetarian: false },

        // Burger Paradise items
        { restaurantId: restaurants[2]._id, name: 'Classic Burger', description: 'Beef, lettuce, tomato & cheese', price: 9.99, category: 'Burger', isVegetarian: false },
        { restaurantId: restaurants[2]._id, name: 'Double Cheese Burger', description: 'Double patty with double cheese', price: 12.99, category: 'Burger', isVegetarian: false },
        { restaurantId: restaurants[2]._id, name: 'Bacon Burger', description: 'Beef, bacon & crispy lettuce', price: 11.99, category: 'Burger', isVegetarian: false },
        { restaurantId: restaurants[2]._id, name: 'French Fries', description: 'Golden crispy fries', price: 4.99, category: 'Sides', isVegetarian: true },
        { restaurantId: restaurants[2]._id, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 5.99, category: 'Drink', isVegetarian: true },

        // Sushi Master items
        { restaurantId: restaurants[3]._id, name: 'California Roll', description: 'Crab, avocado & cucumber', price: 8.99, category: 'Sushi', isVegetarian: false },
        { restaurantId: restaurants[3]._id, name: 'Salmon Nigiri', description: 'Fresh salmon on rice', price: 10.99, category: 'Sushi', isVegetarian: false },
        { restaurantId: restaurants[3]._id, name: 'Vegetable Roll', description: 'Cucumber, avocado & carrot', price: 6.99, category: 'Sushi', isVegetarian: true },
        { restaurantId: restaurants[3]._id, name: 'Spicy Tuna Roll', description: 'Tuna with spicy mayo', price: 9.99, category: 'Sushi', isVegetarian: false },
        { restaurantId: restaurants[3]._id, name: 'Miso Soup', description: 'Traditional miso soup', price: 3.99, category: 'Soup', isVegetarian: true },

        // Taco Fiesta items
        { restaurantId: restaurants[4]._id, name: 'Beef Tacos', description: 'Three soft tacos with beef', price: 8.99, category: 'Tacos', isVegetarian: false },
        { restaurantId: restaurants[4]._id, name: 'Chicken Tacos', description: 'Three soft tacos with chicken', price: 8.99, category: 'Tacos', isVegetarian: false },
        { restaurantId: restaurants[4]._id, name: 'Vegetarian Tacos', description: 'Three tacos with beans & veggies', price: 7.99, category: 'Tacos', isVegetarian: true },
        { restaurantId: restaurants[4]._id, name: 'Enchiladas', description: 'Rolled tortillas with cheese sauce', price: 10.99, category: 'Main', isVegetarian: true },
        { restaurantId: restaurants[4]._id, name: 'Guacamole & Chips', description: 'Fresh guacamole with tortilla chips', price: 5.99, category: 'Appetizer', isVegetarian: true }
      ]);

      console.log('📦 Inserting sample orders...');
      const orders = await Order.insertMany([
        {
          customerId: 'CUST001',
          restaurantId: restaurants[0]._id,
          items: [
            { itemId: menuItems[0]._id, quantity: 1, price: 12.99 },
            { itemId: menuItems[4]._id, quantity: 1, price: 4.99 }
          ],
          totalPrice: 17.98,
          status: 'completed',
          deliveryAddress: '123 Customer St, Apt 4B',
          paymentMethod: 'credit_card',
          createdAt: new Date(Date.now() - 7*24*60*60*1000) // 7 days ago
        },
        {
          customerId: 'CUST002',
          restaurantId: restaurants[1]._id,
          items: [
            { itemId: menuItems[5]._id, quantity: 1, price: 10.99 },
            { itemId: menuItems[6]._id, quantity: 1, price: 8.99 }
          ],
          totalPrice: 19.98,
          status: 'delivered',
          deliveryAddress: '456 Oak Ave, Suite 200',
          paymentMethod: 'credit_card',
          createdAt: new Date(Date.now() - 3*24*60*60*1000) // 3 days ago
        },
        {
          customerId: 'CUST003',
          restaurantId: restaurants[2]._id,
          items: [
            { itemId: menuItems[10]._id, quantity: 2, price: 9.99 },
            { itemId: menuItems[13]._id, quantity: 1, price: 4.99 }
          ],
          totalPrice: 24.97,
          status: 'confirmed',
          deliveryAddress: '789 Pine Rd, House 15',
          paymentMethod: 'debit_card',
          createdAt: new Date(Date.now() - 1*60*60*1000) // 1 hour ago
        },
        {
          customerId: 'CUST004',
          restaurantId: restaurants[3]._id,
          items: [
            { itemId: menuItems[16]._id, quantity: 1, price: 8.99 },
            { itemId: menuItems[19]._id, quantity: 1, price: 3.99 }
          ],
          totalPrice: 12.98,
          status: 'pending',
          deliveryAddress: '321 Elm St, Floor 5',
          paymentMethod: 'credit_card',
          createdAt: new Date()
        }
      ]);

      console.log('🚗 Inserting sample deliveries...');
      await Delivery.insertMany([
        {
          orderId: orders[0]._id,
          customerId: 'CUST001',
          driverId: 'DRIVER001',
          driverName: 'John Doe',
          status: 'delivered',
          currentLocation: '123 Customer St, Apt 4B',
          estimatedTime: 30,
          actualTime: 28
        },
        {
          orderId: orders[1]._id,
          customerId: 'CUST002',
          driverId: 'DRIVER002',
          driverName: 'Sarah Johnson',
          status: 'delivered',
          currentLocation: '456 Oak Ave, Suite 200',
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

      console.log('✅ Sample data inserted successfully!');
      console.log(`   - Restaurants: 5`);
      console.log(`   - Menu Items: ${menuItems.length}`);
      console.log(`   - Orders: ${orders.length}`);
      console.log(`   - Deliveries: 4`);
    } else {
      console.log(`✓ Database already has ${restaurantCount} restaurants. Skipping auto-insert.`);
    }
  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
  }
};

module.exports = initializeDatabase;
