export const addToCart = (product, cart, setCart, userId) => {
    if (!userId) {
      console.error('Usuario no autenticado. No se puede agregar al carrito.');
      return;
    }
  
    const storedCart = [...cart];
  
    const normalizedProduct = {
      id: product.id,
      Nombre: product.Nombre,
      Precio: product.Precio,
      Imagen: product.Imagen,
      quantity: product.quantity || 1,
    };

    const existingProductIndex = storedCart.findIndex((item) => item.id === normalizedProduct.id);
  
    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push(normalizedProduct);
    }
  
    setCart(storedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(storedCart));
  };