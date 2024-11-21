import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'
import { FaShoppingCart } from 'react-icons/fa'
import logo from '../images/logo.png'
import './Navbar.css'

const NavBar = ({ cart = [] }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()

  // Verificar autenticación del usuario
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    });
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      const totalCount = cart.reduce((acc, product) => acc + product.quantity, 0);
      setCartCount(totalCount)
    }
  }, [cart])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-buttons">
        {isAuthenticated && user ? (
          <>
            <span className="welcome-message">
              Bienvenido: {user.displayName || user.email}
            </span>
            <button className="btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="btn">Creá tu cuenta</button>
            </Link>
            <Link to="/login">
              <button className="btn">Ingresá</button>
            </Link>
          </>
        )}
        <Link to="/cart">
          <button className="btn-cart">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar
