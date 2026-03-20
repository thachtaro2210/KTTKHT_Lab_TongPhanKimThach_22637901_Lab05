import React from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

// SVG Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const RestaurantIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path>
    <path d="M6 9v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"></path>
    <line x1="6" y1="9" x2="6" y2="5"></line>
    <line x1="18" y1="9" x2="18" y2="5"></line>
  </svg>
)

const OrderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

const AdminIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"></circle>
    <path d="M12 1v6m6.66-1.31l-4.24 4.24m1.41 8.25l4.24 4.24M23 12h-6m-8.66-1.31l-4.24-4.24m-1.41 8.25l-4.24 4.24M1 12h6m.66 6.69l4.24-4.24"></path>
  </svg>
)

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
)

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

export default function Navbar({ cartCount, onCartClick, onNavClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'restaurants', label: 'Restaurants', icon: RestaurantIcon },
    { id: 'orders', label: 'Orders', icon: OrderIcon },
    { id: 'deliveries', label: 'Delivery', icon: TruckIcon },
    { id: 'admin', label: 'Admin', icon: AdminIcon },
  ]

  const handleNavClick = (id) => {
    onNavClick(id)
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          onClick={() => handleNavClick('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">FoodHub</span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.li key={item.id}>
                <button className="nav-link" onClick={() => handleNavClick(item.id)}>
                  <Icon />
                  <span>{item.label}</span>
                </button>
              </motion.li>
            )
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Cart Button */}
        <motion.button
          className="cart-btn"
          onClick={onCartClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CartIcon />
          {cartCount > 0 && (
            <motion.span className="cart-count" initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount}>
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="mobile-nav-link"
                onClick={() => handleNavClick(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            )
          })}
        </motion.div>
      )}
    </motion.nav>
  )
}

