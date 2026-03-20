import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './AdminPanel.css'

// SVG Icons
const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
    <path d="M3 12a9 3 0 0 0 18 0"></path>
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
  </svg>
)

const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
)

export default function AdminPanel() {
  const [dbStatus, setDbStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    refreshStatus()
  }, [])

  const refreshStatus = async () => {
    try {
      const response = await axios.get('/api/admin/db-status')
      setDbStatus(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching status:', error)
      showMessage('Failed to fetch database status', 'error')
      setLoading(false)
    }
  }

  const showMessage = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const insertData = async () => {
    try {
      setLoading(true)
      await axios.post('/api/admin/insert-data')
      showMessage('Sample data inserted successfully!', 'success')
      setTimeout(() => refreshStatus(), 500)
    } catch (error) {
      showMessage(error.response?.data?.error || 'Failed to insert data', 'error')
      setLoading(false)
    }
  }

  const clearData = async () => {
    if (!window.confirm('Are you sure? This will delete ALL data from the database!')) {
      return
    }
    try {
      setLoading(true)
      await axios.post('/api/admin/clear-data')
      showMessage('All data cleared successfully!', 'success')
      setTimeout(() => refreshStatus(), 500)
    } catch (error) {
      showMessage(error.response?.data?.error || 'Failed to clear data', 'error')
      setLoading(false)
    }
  }

  return (
    <motion.section
      className="admin-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-header">
        <DatabaseIcon />
        <h2>Database Management</h2>
      </div>

      <motion.div 
        className="admin-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="admin-card">
          <div className="card-content">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading database status...</p>
              </div>
            ) : dbStatus ? (
              <div className="db-info">
                <div className="status-indicator">
                  <span className="status-dot online"></span>
                  <span className="status-text">Database Connected</span>
                </div>

                <div className="stats-grid">
                  <motion.div 
                    className="stat-box"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="stat-icon restaurant-icon"></div>
                    <div className="stat-value">{dbStatus.collections.restaurants}</div>
                    <div className="stat-label">Restaurants</div>
                  </motion.div>
                  <motion.div 
                    className="stat-box"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="stat-icon menu-icon"></div>
                    <div className="stat-value">{dbStatus.collections.menuItems}</div>
                    <div className="stat-label">Menu Items</div>
                  </motion.div>
                  <motion.div 
                    className="stat-box"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="stat-icon order-icon"></div>
                    <div className="stat-value">{dbStatus.collections.orders}</div>
                    <div className="stat-label">Orders</div>
                  </motion.div>
                  <motion.div 
                    className="stat-box"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="stat-icon delivery-icon"></div>
                    <div className="stat-value">{dbStatus.collections.deliveries}</div>
                    <div className="stat-label">Deliveries</div>
                  </motion.div>
                </div>
              </div>
            ) : null}

            <div className="action-buttons">
              <motion.button
                className="btn btn-insert"
                onClick={insertData}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckIcon />
                <span>Insert Sample Data</span>
              </motion.button>
              <motion.button
                className="btn btn-refresh"
                onClick={refreshStatus}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshIcon />
                <span>Refresh Status</span>
              </motion.button>
              <motion.button
                className="btn btn-clear"
                onClick={clearData}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrashIcon />
                <span>Clear All Data</span>
              </motion.button>
            </div>

            {message && (
              <motion.div
                className={`message message-${messageType}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
