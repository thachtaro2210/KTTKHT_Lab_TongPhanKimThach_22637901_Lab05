// Auto-initialize database with sample data if empty
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');

const autoInitializeDB = async () => {
  try {
    // Check if database has data
    const restaurantCount = await Restaurant.countDocuments();
    const menuItemCount = await MenuItem.countDocuments();
    const orderCount = await Order.countDocuments();
    const deliveryCount = await Delivery.countDocuments();

    if (restaurantCount > 0 && menuItemCount > 0) {
      console.log('✓ Database already has data, skipping initialization');
      return;
    }

    console.log('📊 Database is empty, initializing with sample data...');

    // Insert restaurants
    console.log('🏪 Inserting restaurants...');
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
        name: 'Sushi Express',
        address: '321 Japanese Way, Arts District',
        phone: '0444555666',
        email: 'order@sushiexpress.com',
        cuisine: ['Japanese', 'Sushi', 'Asian'],
        rating: 4.9
      },
      {
        name: 'Vegan Delights',
        address: '654 Green Street, Eco Zone',
        phone: '0777888999',
        email: 'hello@vegandelights.com',
        cuisine: ['Vegan', 'Vegetarian', 'Health Food'],
        rating: 4.7
      }
    ]);

    // Insert menu items
    console.log('🍽️  Inserting menu items...');
    const menuItems = await MenuItem.insertMany([
      // Pizza Palace items
      {
        restaurantId: restaurants[0]._id,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        price: 12.99,
        category: 'Pizza'
      },
      {
        restaurantId: restaurants[0]._id,
        name: 'Pepperoni Pizza',
        description: 'Delicious pizza topped with pepperoni',
        price: 14.99,
        category: 'Pizza'
      },
      {
        restaurantId: restaurants[0]._id,
        name: 'Spaghetti Carbonara',
        description: 'Traditional Italian pasta with cream sauce',
        price: 11.99,
        category: 'Pasta'
      },
      {
        restaurantId: restaurants[0]._id,
        name: 'Garlic Bread',
        description: 'Fresh bread with garlic and herbs',
        price: 5.99,
        category: 'Appetizer'
      },

      // Dragon Kitchen items
      {
        restaurantId: restaurants[1]._id,
        name: 'Kung Pao Chicken',
        description: 'Spicy chicken with peanuts and vegetables',
        price: 13.99,
        category: 'Main'
      },
      {
        restaurantId: restaurants[1]._id,
        name: 'Fried Rice',
        description: 'Fragrant fried rice with egg and vegetables',
        price: 10.99,
        category: 'Rice'
      },
      {
        restaurantId: restaurants[1]._id,
        name: 'Spring Rolls',
        description: 'Crispy rolls filled with vegetables',
        price: 7.99,
        category: 'Appetizer'
      },
      {
        restaurantId: restaurants[1]._id,
        name: 'Beef Lo Mein',
        description: 'Noodles with beef and Asian vegetables',
        price: 12.99,
        category: 'Noodles'
      },

      // Burger Paradise items
      {
        restaurantId: restaurants[2]._id,
        name: 'Classic Cheeseburger',
        description: 'Juicy burger with cheddar cheese',
        price: 11.99,
        category: 'Burger'
      },
      {
        restaurantId: restaurants[2]._id,
        name: 'Bacon Burger',
        description: 'Burger with crispy bacon and cheese',
        price: 13.99,
        category: 'Burger'
      },
      {
        restaurantId: restaurants[2]._id,
        name: 'French Fries',
        description: 'Golden crispy fries',
        price: 4.99,
        category: 'Sides'
      },
      {
        restaurantId: restaurants[2]._id,
        name: 'Chicken Sandwich',
        description: 'Crispy fried chicken sandwich',
        price: 10.99,
        category: 'Sandwich'
      },

      // Sushi Express items
      {
        restaurantId: restaurants[3]._id,
        name: 'California Roll',
        description: 'Roll with crab, avocado, and cucumber',
        price: 14.99,
        category: 'Roll'
      },
      {
        restaurantId: restaurants[3]._id,
        name: 'Spicy Tuna Roll',
        description: 'Roll with spicy tuna and vegetables',
        price: 15.99,
        category: 'Roll'
      },
      {
        restaurantId: restaurants[3]._id,
        name: 'Nigiri Set',
        description: 'Assorted sushi nigiri',
        price: 18.99,
        category: 'Sushi'
      },
      {
        restaurantId: restaurants[3]._id,
        name: 'Miso Soup',
        description: 'Traditional Japanese soup',
        price: 4.99,
        category: 'Soup'
      },

      // Vegan Delights items
      {
        restaurantId: restaurants[4]._id,
        name: 'Veggie Burger',
        description: 'Plant-based burger with fresh vegetables',
        price: 11.99,
        category: 'Burger'
      },
      {
        restaurantId: restaurants[4]._id,
        name: 'Buddha Bowl',
        description: 'Healthy bowl with quinoa and vegetables',
        price: 12.99,
        category: 'Bowl'
      },
      {
        restaurantId: restaurants[4]._id,
        name: 'Falafel Wrap',
        description: 'Crispy falafel in a pita wrap',
        price: 10.99,
        category: 'Wrap'
      },
      {
        restaurantId: restaurants[4]._id,
        name: 'Green Smoothie',
        description: 'Fresh organic green smoothie',
        price: 6.99,
        category: 'Drink'
      }
    ]);

    // Insert sample orders
    console.log('📦 Inserting sample orders...');
    await Order.insertMany([
      {
        restaurantId: restaurants[0]._id,
        items: [
          { itemId: menuItems[0]._id, quantity: 2, price: 12.99 },
          { itemId: menuItems[3]._id, quantity: 1, price: 5.99 }
        ],
        totalPrice: 31.97,
        status: 'completed',
        deliveryAddress: '100 Main Street, Apt 501',
        customerName: 'John Doe',
        customerPhone: '5551234567'
      },
      {
        restaurantId: restaurants[1]._id,
        items: [
          { itemId: menuItems[4]._id, quantity: 1, price: 13.99 },
          { itemId: menuItems[5]._id, quantity: 2, price: 10.99 }
        ],
        totalPrice: 35.97,
        status: 'delivered',
        deliveryAddress: '200 Oak Avenue, Suite 100',
        customerName: 'Jane Smith',
        customerPhone: '5559876543'
      }
    ]);

    // Insert sample deliveries
    console.log('🚗 Inserting sample deliveries...');
    await Delivery.insertMany([
      {
        orderId: 'ORD001',
        driverId: 'DRV001',
        driverName: 'Ahmed',
        currentLocation: 'Restaurant',
        status: 'preparing',
        estimatedTime: 15
      },
      {
        orderId: 'ORD002',
        driverId: 'DRV002',
        driverName: 'Maria',
        currentLocation: 'On the way',
        status: 'on_the_way',
        estimatedTime: 8
      },
      {
        orderId: 'ORD003',
        driverId: 'DRV003',
        driverName: 'Ahmed',
        currentLocation: 'Delivered',
        status: 'delivered',
        estimatedTime: 0
      }
    ]);

    console.log('✓ Database initialized successfully!');
  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
  }
};

module.exports = { autoInitializeDB };
