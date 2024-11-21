import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const agregarProducto = async (producto) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), producto);
    console.log("Producto agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar el producto: ", e);
  }
};
