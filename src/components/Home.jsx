import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { auth } from '../firebase-config'
import NavBar from './NavBar'
import './Home.css'
import { addToCart } from './carritoUtils'


const db = getFirestore();

const Home = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)
        setUserId(user.uid)
      } else {
        setIsAuthenticated(false)
        setUserId(null)
      }
    })
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProducts(productsList);
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || []
      setCart(storedCart)
    }
  }, [userId])

  const addToCartHandler = (product) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addToCart(product, cart, setCart, userId)
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  };

  return (
    <>
      <NavBar cart={cart} />
      <div className="home-container">
        <h1 className="Titulo">PRODUCTOS</h1>
        <div className="products-list">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.Imagen} alt={product.Nombre} />
              </div>
              <div className="product-info">
                <h3>{product.Nombre}</h3>
                <p>{formatPrice(product.Precio)}</p>
              </div>
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.preventDefault()
                  addToCartHandler(product)
                }}
              >
                Agregar al carrito
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
