import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase-config'
import { FiPlus, FiMinus } from 'react-icons/fi'
import './Cart.css'

const Cart = ({ updateCartCount }) => {
  const [cart, setCart] = useState([])
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        navigate('/login')
      }
    });
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || []
      setCart(storedCart)
    }
  }, [userId])


  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart))
    }
  }, [cart, userId])


  const calculateTotal = () => cart.reduce((total, product) => total + product.Precio * product.quantity, 0)

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId)
    setCart(updatedCart)
    updateCartCount()
  }

  const changeQuantity = (productId, action) => {
    const updatedCart = cart
      .map((product) =>
        product.id === productId
          ? { ...product, quantity: action === 'increment' ? product.quantity + 1 : product.quantity - 1 }
          : product
      )
      .filter((product) => product.quantity > 0);
    setCart(updatedCart)
    updateCartCount()
  }

  const formatNumber = (number) => number.toLocaleString('es-ES')

  if (!userId) return <div>Cargando...</div>

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p className='Empty'>Agregá productos para realizar la compra...</p>
      ) : (
        <>
        <h2 className='titulo'>Tu Carrito: </h2>
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.Imagen} alt={product.Nombre} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{product.Nombre}</h3>
                <p>${formatNumber(product.Precio)}</p>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={() => changeQuantity(product.id, 'decrement')}>
                    <FiMinus size={20} />
                  </button>
                  <span className="quantity">{product.quantity}</span>
                  <button className="quantity-btn" onClick={() => changeQuantity(product.id, 'increment')}>
                    <FiPlus size={20} />
                  </button>
                </div>
                </div>
                  <button onClick={() => removeFromCart(product.id)} className="remove-btn">
                    Eliminar
                  </button>
            </div>
          ))}
        </div>
        <div className="cart-total">
        <h3>Total: ${formatNumber(calculateTotal())}</h3>
        </div>
        <div className="pay-button">
          <Link to="/pay" state={{ userId }}>
            <button>Pagar</button>
          </Link>
        </div>
        </>
      )}
    </div>
  )
}

export default Cart
