import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Orders.css'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      pending: '#fff3cd',
      confirmed: '#d1ecf1',
      preparing: '#cfe2ff',
      ready: '#d1e7dd',
      delivered: '#d1e7dd',
      cancelled: '#f8d7da',
    }
    return colors[status] || '#f8f9fa'
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      className="orders-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Orders</h2>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <p>No orders yet. Start ordering delicious food!</p>
        </div>
      ) : (
        <motion.div className="orders-grid" variants={container} initial="hidden" animate="show">
          {orders.map((order) => (
            <motion.div key={order._id} className="order-card" variants={item}>
              <div className="order-header">
                <div>
                  <p className="order-id">{order.orderId ? `Order #${order.orderId}` : `Order #${order._id.slice(-8)}`}</p>
                  <p className="order-date">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {(order.status || '').toUpperCase()}
                </span>
              </div>

              <div className="order-items">
                {(order.items || []).map((it, idx) => (
                  <div key={idx} className="item-row">
                    <span>{it.name || 'Item'} x {it.quantity}</span>
                    <span>${((it.price || 0) * (it.quantity || 0)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="total">
                  <strong>Total:</strong>
                  <strong className="amount">${(order.totalAmount || 0).toFixed(2)}</strong>
                </div>
                <p className="delivery-address">
                  <strong>Delivery Address:</strong> {order.deliveryAddress || ''}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}

