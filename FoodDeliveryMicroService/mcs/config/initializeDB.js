const Restaurant = require('../models/Restaurant');
const { insertData } = require('../scripts/insertData');

// Auto-initialize database with sample data if empty.
// MongoDB creates the database implicitly on first insert.
const initializeDatabase = async () => {
  const restaurantCount = await Restaurant.countDocuments();
  if (restaurantCount > 0) {
    console.log(`✓ Database already has ${restaurantCount} restaurants. Skipping auto-insert.`);
    return;
  }

  console.log('📊 Database is empty. Inserting sample seed data...');
  await insertData();
  console.log('✅ Database initialized successfully');
};

module.exports = initializeDatabase;

