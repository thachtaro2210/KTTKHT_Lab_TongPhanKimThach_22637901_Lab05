const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const orderRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Order Service is running' });
});

const PORT = process.env.ORDER_SERVICE_PORT || 3001;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`🍔 Order Service running on port ${PORT}`);
  });
};

startServer();

