import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>🍔 FoodHub</h3>
          <p>Delicious food delivered to your door</p>
        </motion.div>

        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#restaurants">Restaurants</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#deliveries">Track Delivery</a></li>
          </ul>
        </motion.div>

        <motion.div 
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4>Contact</h4>
          <p>Email: support@foodhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 FoodHub - All rights reserved</p>
        <p>Microservices Architecture | Real-time Tracking</p>
      </div>
    </footer>
  )
}
