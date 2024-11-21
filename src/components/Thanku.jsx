import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";

const Thankyou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  useEffect(() => {
    if (!location.state?.orderId) {
      navigate("/home");
    }
  }, [location, navigate]);

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="animation-wrapper">
          <div className="checkmark">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>
        <h1>¡Gracias por tu compra!</h1>
        <p>
          Tu pedido ha sido registrado exitosamente. Te esperamos en nuestra
          sucursal para completar el pago.
        </p>
        <p className="order-id">
          Número de orden: <strong>{orderId}</strong>
        </p>
        <button onClick={handleBackToHome} className="home-btn">
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Thankyou
