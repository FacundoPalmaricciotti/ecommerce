import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';
import NavBar from './NavBar';
import { FaShoppingCart } from 'react-icons/fa';
import './Product.css';
import { addToCart } from './carritoUtils'; 

const db = getFirestore();

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [cart, setCart] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id, ...docSnap.data() }); 
      } else {
        console.log('No such product!');
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCart(storedCart);
    }
  }, [userId]);

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(product, cart, setCart, userId);
  };

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  return (
    <>
      <NavBar cart={cart} />
      <div className="product-container">
        <div className="product-images">
          <img src={product.Imagen} alt={product.Nombre} />
        </div>
        <div className="product-details">
          <p className="product-category">{product.Categoria}</p>
          <h1 className="product-name">{product.Nombre}</h1>
          <p className="product-description">
            {product.Descripcion.split('\\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <p className="product-price">${product.Precio.toLocaleString()}</p>
          <button
            className="add-to-cart-button"
            onClick={addToCartHandler}
          >
            <FaShoppingCart /> Agregar al carrito
          </button>
        </div>
      </div>
    </>
  );
};

export default Product