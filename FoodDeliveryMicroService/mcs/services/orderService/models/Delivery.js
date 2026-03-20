const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customerId: String,
  driverId: String,
  driverName: String,
  driverPhone: String,
  vehicleType: {
    type: String,
    enum: ['motorcycle', 'car', 'bicycle'],
    default: 'motorcycle'
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'picked_up', 'on_way', 'delivered', 'failed', 'preparing', 'ready'],
    default: 'pending'
  },
  pickupLocation: String,
  deliveryLocation: String,
  currentLocation: String,
  estimatedTime: Number,
  actualDeliveryTime: Date,
  actualTime: Number,
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);

