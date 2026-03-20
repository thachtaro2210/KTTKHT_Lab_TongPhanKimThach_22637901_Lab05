import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Cart.css'

// SVG Icons
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
)

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

export default function Cart({ items, onRemoveItem, onClearCart, onClose }) {
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0)

  return (
    <motion.div
      className="cart-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cart-drawer"
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <div className="cart-title">
            <CartIcon />
            <h2>Your Cart</h2>
          </div>

          <motion.button className="close-btn" onClick={onClose} whileHover={{ rotate: 90 }}>
            <CloseIcon />
          </motion.button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                <CartIcon />
              </div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="price">${item.price.toFixed(2)}</p>
                  </div>

                  <motion.button
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TrashIcon />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>Total:</span>
              <span className="amount">${total.toFixed(2)}</span>
            </div>

            <motion.button className="checkout-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>Proceed to Checkout</span>
              <ArrowRightIcon />
            </motion.button>

            <motion.button className="clear-btn" onClick={onClearCart} whileHover={{ scale: 1.02 }}>
              Clear Cart
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

