import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Restaurants from './components/Restaurants'
import Orders from './components/Orders'
import Deliveries from './components/Deliveries'
import AdminPanel from './components/AdminPanel'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const addToCart = (item, restaurantId) => {
    setCart([...cart, { ...item, restaurantId, id: Math.random() }])
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <motion.div className="app">
      <Navbar 
        cartCount={cart.length}
        onCartClick={() => setCartOpen(!cartOpen)}
        onNavClick={setActiveSection}
      />
      
      <main className="main-content">
        {activeSection === 'home' && <Hero onOrderClick={() => setActiveSection('restaurants')} />}
        {activeSection === 'restaurants' && <Restaurants onAddToCart={addToCart} />}
        {activeSection === 'orders' && <Orders />}
        {activeSection === 'deliveries' && <Deliveries />}
        {activeSection === 'admin' && <AdminPanel />}
      </main>

      {cartOpen && (
        <Cart
          items={cart}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onClose={() => setCartOpen(false)}
        />
      )}

      <Footer />
    </motion.div>
  )
}

export default App
