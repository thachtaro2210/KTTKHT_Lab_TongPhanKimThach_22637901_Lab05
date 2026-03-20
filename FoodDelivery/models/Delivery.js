const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
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
    enum: ['pending', 'assigned', 'picked_up', 'on_way', 'delivered', 'failed'],
    default: 'pending'
  },
  pickupLocation: String,
  deliveryLocation: String,
  estimatedTime: Number,
  actualDeliveryTime: Date,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);
