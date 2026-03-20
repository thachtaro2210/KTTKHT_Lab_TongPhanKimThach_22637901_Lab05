const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
  try {
    const rabbitURL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

    connection = await amqp.connect(rabbitURL);
    channel = await connection.createChannel();

    await channel.assertExchange('food_delivery', 'topic', { durable: true });

    // Order events
    await channel.assertQueue('order.events', { durable: true });
    await channel.bindQueue('order.events', 'food_delivery', 'order.*');

    // Restaurant events
    await channel.assertQueue('restaurant.events', { durable: true });
    await channel.bindQueue('restaurant.events', 'food_delivery', 'restaurant.*');

    // Delivery events
    await channel.assertQueue('delivery.events', { durable: true });
    await channel.bindQueue('delivery.events', 'food_delivery', 'delivery.*');

    console.log('✓ RabbitMQ connected successfully');
    return channel;
  } catch (error) {
    console.warn('⚠ RabbitMQ not available, running in standalone mode:', error.message);
    return null;
  }
};

const publishEvent = async (eventType, eventData) => {
  if (!channel) return;

  try {
    channel.publish('food_delivery', eventType, Buffer.from(JSON.stringify(eventData)));
    console.log(`📤 Event published: ${eventType}`);
  } catch (error) {
    console.error('Error publishing event:', error.message);
  }
};

const subscribeEvent = async (queue, callback) => {
  if (!channel) return;

  try {
    channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel.ack(msg);
      }
    });
    console.log(`📥 Subscribed to: ${queue}`);
  } catch (error) {
    console.error('Error subscribing to event:', error.message);
  }
};

module.exports = {
  connectRabbitMQ,
  publishEvent,
  subscribeEvent
};

