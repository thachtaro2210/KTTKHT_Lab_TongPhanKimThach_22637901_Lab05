import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Restaurants.css'

export default function Restaurants({ onAddToCart }) {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null) // restaurantId
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)

  const cuisineIcons = {
    Italian: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea" opacity="0.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <circle cx="12" cy="12" r="2" fill="#667eea" />
      </svg>
    ),
    Chinese: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea" opacity="0.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          🥡
        </text>
      </svg>
    ),
    American: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea" opacity="0.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <circle cx="12" cy="12" r="4" fill="white" opacity="0.3" />
      </svg>
    ),
    Japanese: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea" opacity="0.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <circle cx="8" cy="10" r="2" fill="white" />
        <circle cx="16" cy="10" r="2" fill="white" />
      </svg>
    ),
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

  const fetchRestaurants = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/restaurants')
      setRestaurants(response.data || [])
    } catch (error) {
      console.error('Error fetching restaurants:', error)
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }

  const fetchMenu = async (restaurantId) => {
    setSelectedRestaurant(restaurantId)
    try {
      const response = await axios.get(`/api/restaurants/${restaurantId}/menu`)
      setMenu(response.data || [])
    } catch (error) {
      console.error('Error fetching menu:', error)
      setMenu([])
    }
  }

  useEffect(() => {
    fetchRestaurants()
    const interval = setInterval(fetchRestaurants, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      className="restaurants-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Popular Restaurants</h2>

      {loading ? (
        <div className="loading">Loading restaurants...</div>
      ) : (
        <motion.div
          className="restaurants-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant._id}
              className="restaurant-card"
              variants={item}
              whileHover={{ y: -10 }}
              onClick={() => fetchMenu(restaurant._id)}
            >
              <div className="restaurant-image">
                {cuisineIcons[restaurant.cuisine?.[0]] || (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="#667eea" opacity="0.8">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                )}
              </div>

              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="address">{restaurant.address}</p>
                <div className="rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(restaurant.rating || 0) ? 'star-filled' : 'star-empty'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-value">{restaurant.rating || 0}</span>
                </div>

                <motion.button
                  className="view-menu-btn"
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Menu
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Menu Modal */}
      {selectedRestaurant && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedRestaurant(null)}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              type="button"
              onClick={() => setSelectedRestaurant(null)}
            >
              ✕
            </button>

            <h2>Menu</h2>

            <div className="menu-grid">
              {menu.map((itemData) => (
                <motion.div
                  key={itemData._id}
                  className="menu-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>{itemData.name}</h4>
                  <p className="description">{itemData.description}</p>

                  <div className="item-footer">
                    <span className="price">${Number(itemData.price || 0).toFixed(2)}</span>

                    <motion.button
                      type="button"
                      className="add-btn"
                      onClick={() => onAddToCart(itemData, selectedRestaurant)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}

