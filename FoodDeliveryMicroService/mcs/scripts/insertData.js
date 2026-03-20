const mongoose = require('mongoose');
require('dotenv').config();

const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');

const connectDB = async () => {
  const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/food_delivery';
  await mongoose.connect(mongoURL);
};

const insertData = async () => {
  // Clear existing data
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});
  await Order.deleteMany({});
  await Delivery.deleteMany({});

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
    {
      restaurantId: restaurants[0]._id,
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato, mozzarella, and basil',
      price: 12.99,
      category: 'Pizza',
      isAvailable: true
    },
    {
      restaurantId: restaurants[0]._id,
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza with pepperoni and cheese',
      price: 14.99,
      category: 'Pizza',
      isAvailable: true
    },
    {
      restaurantId: restaurants[0]._id,
      name: 'Spaghetti Carbonara',
      description: 'Traditional Italian pasta with cream and bacon',
      price: 13.99,
      category: 'Pasta',
      isAvailable: true
    },
    // Dragon Kitchen Menu
    {
      restaurantId: restaurants[1]._id,
      name: 'Kung Pao Chicken',
      description: 'Stir-fried chicken with peanuts and vegetables',
      price: 11.99,
      category: 'Main Course',
      isAvailable: true
    },
    {
      restaurantId: restaurants[1]._id,
      name: 'Pho Bo',
      description: 'Traditional Vietnamese beef noodle soup',
      price: 10.99,
      category: 'Soup',
      isAvailable: true
    },
    {
      restaurantId: restaurants[1]._id,
      name: 'Spring Rolls',
      description: 'Fresh spring rolls with peanut sauce',
      price: 8.99,
      category: 'Appetizer',
      isAvailable: true
    },
    // Burger Paradise Menu
    {
      restaurantId: restaurants[2]._id,
      name: 'Classic Burger',
      description: 'Beef burger with lettuce, tomato, and sauce',
      price: 9.99,
      category: 'Burger',
      isAvailable: true
    },
    {
      restaurantId: restaurants[2]._id,
      name: 'Double Cheese Burger',
      description: 'Double patty with extra cheese',
      price: 12.99,
      category: 'Burger',
      isAvailable: true
    },
    {
      restaurantId: restaurants[2]._id,
      name: 'French Fries',
      description: 'Golden crispy french fries',
      price: 4.99,
      category: 'Sides',
      isAvailable: true
    },
    // Sushi House Menu
    {
      restaurantId: restaurants[3]._id,
      name: 'California Roll',
      description: 'Sushi roll with crab and avocado',
      price: 14.99,
      category: 'Sushi Roll',
      isAvailable: true
    },
    {
      restaurantId: restaurants[3]._id,
      name: 'Salmon Sashimi',
      description: 'Fresh salmon sashimi platter',
      price: 18.99,
      category: 'Sashimi',
      isAvailable: true
    },
    {
      restaurantId: restaurants[3]._id,
      name: 'Miso Soup',
      description: 'Traditional Japanese miso soup',
      price: 5.99,
      category: 'Soup',
      isAvailable: true
    }
  ]);

  // Insert sample orders
  const orders = await Order.insertMany([
    {
      orderId: `ORD-${Date.now()}-1`,
      customerId: 'CUST001',
      customerName: 'John Doe',
      customerPhone: '0123456789',
      restaurantId: restaurants[0]._id,
      items: [
        { menuItemId: menuItems[0]._id, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
        { menuItemId: menuItems[2]._id, name: 'Spaghetti Carbonara', price: 13.99, quantity: 1 }
      ],
      totalAmount: 39.97,
      deliveryAddress: '100 Main St, Apt 5A',
      status: 'pending',
      createdAt: new Date()
    },
    {
      orderId: `ORD-${Date.now()}-2`,
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      customerPhone: '0987654321',
      restaurantId: restaurants[1]._id,
      items: [
        { menuItemId: menuItems[3]._id, name: 'Kung Pao Chicken', price: 11.99, quantity: 1 },
        { menuItemId: menuItems[5]._id, name: 'Spring Rolls', price: 8.99, quantity: 2 }
      ],
      totalAmount: 30.97,
      deliveryAddress: '200 Oak Ave, Suite 10',
      status: 'confirmed',
      createdAt: new Date()
    },
    {
      orderId: `ORD-${Date.now()}-3`,
      customerId: 'CUST003',
      customerName: 'Bob Johnson',
      customerPhone: '0555666777',
      restaurantId: restaurants[2]._id,
      items: [
        { menuItemId: menuItems[7]._id, name: 'Double Cheese Burger', price: 12.99, quantity: 2 },
        { menuItemId: menuItems[8]._id, name: 'French Fries', price: 4.99, quantity: 2 }
      ],
      totalAmount: 35.96,
      deliveryAddress: '300 Pine Rd, Unit 15',
      status: 'preparing',
      createdAt: new Date()
    },
    {
      orderId: `ORD-${Date.now()}-4`,
      customerId: 'CUST004',
      customerName: 'Alice Brown',
      customerPhone: '0888999000',
      restaurantId: restaurants[3]._id,
      items: [
        { menuItemId: menuItems[9]._id, name: 'California Roll', price: 14.99, quantity: 2 },
        { menuItemId: menuItems[11]._id, name: 'Miso Soup', price: 5.99, quantity: 1 }
      ],
      totalAmount: 35.97,
      deliveryAddress: '400 Beach Blvd, Penthouse',
      status: 'ready',
      createdAt: new Date()
    }
  ]);

  // Insert delivery records
  await Delivery.insertMany([
    {
      orderId: orders[0]._id,
      driverId: 'DRV001',
      driverName: 'Tom Wilson',
      driverPhone: '0100000001',
      vehicleType: 'motorcycle',
      status: 'assigned',
      pickupLocation: restaurants[0].address,
      deliveryLocation: '100 Main St, Apt 5A',
      estimatedTime: 30
    },
    {
      orderId: orders[1]._id,
      driverId: 'DRV002',
      driverName: 'Sarah Lee',
      driverPhone: '0100000002',
      vehicleType: 'car',
      status: 'on_way',
      pickupLocation: restaurants[1].address,
      deliveryLocation: '200 Oak Ave, Suite 10',
      estimatedTime: 25
    },
    {
      orderId: orders[2]._id,
      driverId: 'DRV003',
      driverName: 'Mike Chen',
      driverPhone: '0100000003',
      vehicleType: 'motorcycle',
      status: 'picked_up',
      pickupLocation: restaurants[2].address,
      deliveryLocation: '300 Pine Rd, Unit 15',
      estimatedTime: 20
    },
    {
      orderId: orders[3]._id,
      driverId: 'DRV004',
      driverName: 'Emma White',
      driverPhone: '0100000004',
      vehicleType: 'bicycle',
      status: 'delivered',
      pickupLocation: restaurants[3].address,
      deliveryLocation: '400 Beach Blvd, Penthouse',
      estimatedTime: 35,
      actualDeliveryTime: new Date(),
      rating: 5
    }
  ]);

  console.log('✅ Seed data inserted successfully');
};

const main = async () => {
  await connectDB();
  await insertData();
  await mongoose.disconnect();
};

module.exports = { connectDB, insertData, main };

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error inserting data:', err?.message || err);
    process.exit(1);
  });
}

