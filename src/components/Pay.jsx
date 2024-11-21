import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Pay.css';

const Pay = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || null;

  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCart(storedCart);
    } else {
      navigate('/home');
    }
  }, [userId, navigate]);

  const calculateTotal = () =>
    cart.reduce((total, product) => total + product.Precio * product.quantity, 0);

  const handlePayment = () => {
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    localStorage.removeItem(`cart_${userId}`);
    setCart([]);
    navigate('/thank-you', { state: { orderId } });
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="pay-container">
      <h1>Formulario de Pago</h1>
      <div className="payment-section">
        <h2>Seleccione forma de pago:</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="payment-select"
        >
          <option value="" disabled>
            Seleccione
          </option>
          <option value="tarjeta">Tarjeta</option>
          <option value="debito">Débito</option>
          <option value="efectivo">Efectivo</option>
        </select>
      </div>
      <div className="ticket">
        <h3>Resumen del Pedido:</h3>
        {cart.map((product) => (
          <div key={product.id} className="ticket-item">
            <p>
              <strong>{product.Nombre}</strong> - {product.quantity} x ${product.Precio} ={' '}
              ${(product.Precio * product.quantity).toLocaleString('es-ES')}
            </p>
          </div>
        ))}
        <hr />
        <h4>Total: ${calculateTotal().toLocaleString('es-ES')}</h4>
      </div>
      <div className="payment-buttons">
        <button
          onClick={handlePayment}
          className="proceed-payment-btn"
          disabled={!paymentMethod}
        >
          Proceder con el Pago
        </button>
        <button onClick={handleBackToHome} className="back-btn">
          Volver
        </button>
      </div>
    </div>
  );
};

export default Pay