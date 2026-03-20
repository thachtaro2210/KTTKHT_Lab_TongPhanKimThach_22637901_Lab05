const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../../config/database');
const { connectRabbitMQ } = require('../../config/rabbitmq');

const deliveryRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/deliveries', deliveryRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Delivery Service is running' });
});

const PORT = process.env.DELIVERY_SERVICE_PORT || 3003;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();
  
  app.listen(PORT, () => {
    console.log(`🍔 Delivery Service running on port ${PORT}`);
  });
};

startServer();
