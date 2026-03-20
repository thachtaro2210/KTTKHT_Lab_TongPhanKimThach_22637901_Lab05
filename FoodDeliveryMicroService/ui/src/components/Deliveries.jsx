import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Deliveries.css'

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)

  const ChefIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 13.87A4 4 0 0 1 7.41 6.5a5.11 5.11 0 0 1 9.18 0A4 4 0 0 1 18 13.87"></path>
      <path d="M9 19h6"></path>
      <path d="M12 23a9 9 0 0 1 9-9 9 9 0 0 1-9 9"></path>
    </svg>
  )

  const TruckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  )

  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )

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

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/deliveries')
      setDeliveries(response.data || [])
    } catch (error) {
      console.error('Error fetching deliveries:', error)
      setDeliveries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeliveries()
    const interval = setInterval(fetchDeliveries, 10000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    const icons = {
      preparing: <ChefIcon />,
      ready: <ChefIcon />,
      on_way: <TruckIcon />,
      picked_up: <TruckIcon />,
      assigned: <TruckIcon />,
      delivered: <CheckIcon />,
    }
    return icons[status] || <ChefIcon />
  }

  const isPreparingActive = (status) => status === 'preparing'
  const isOnTheWayActive = (status) =>
    status === 'assigned' || status === 'picked_up' || status === 'on_way' || status === 'ready'
  const isDeliveredActive = (status) => status === 'delivered'

  return (
    <motion.section
      className="deliveries-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Track Your Delivery</h2>

      {loading ? (
        <div className="loading">Loading deliveries...</div>
      ) : deliveries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <TruckIcon />
          </div>
          <p>No active deliveries</p>
        </div>
      ) : (
        <motion.div className="deliveries-grid" variants={container} initial="hidden" animate="show">
          {deliveries.map((delivery) => (
            <motion.div key={delivery._id} className="delivery-card" variants={item}>
              <div className="delivery-header">
                <div className="driver-info">
                  <span className="driver-name">{delivery.driverName || ''}</span>
                  <span className="driver-id">Driver: {delivery.driverId || ''}</span>
                </div>
                <span className="status-icon">{getStatusIcon(delivery.status)}</span>
              </div>

              <div className="status-timeline">
                <div
                  className={`timeline-step ${isPreparingActive(delivery.status) ? 'active' : ''}`}
                >
                  <div className="step-circle">
                    <ChefIcon />
                  </div>
                  <p>Preparing</p>
                </div>

                <div
                  className={`timeline-step ${isOnTheWayActive(delivery.status) ? 'active' : ''}`}
                >
                  <div className="step-circle">
                    <TruckIcon />
                  </div>
                  <p>On the Way</p>
                </div>

                <div
                  className={`timeline-step ${isDeliveredActive(delivery.status) ? 'active' : ''}`}
                >
                  <div className="step-circle">
                    <CheckIcon />
                  </div>
                  <p>Delivered</p>
                </div>
              </div>

              <div className="delivery-details">
                <div className="detail-item">
                  <span className="label">Current Location:</span>
                  <span className="value">
                    {delivery.currentLocation || delivery.pickupLocation || 'N/A'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className="value status">
                    {(delivery.status || '').replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="label">Est. Time:</span>
                  <span className="value">{delivery.estimatedTime || 0} mins</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}

