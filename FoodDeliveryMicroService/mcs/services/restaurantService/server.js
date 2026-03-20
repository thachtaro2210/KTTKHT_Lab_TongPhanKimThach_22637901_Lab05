const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');

const restaurantRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/restaurants', restaurantRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Restaurant Service is running' });
});

const PORT = process.env.RESTAURANT_SERVICE_PORT || 3002;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`🍔 Restaurant Service running on port ${PORT}`);
  });
};

startServer();

