import { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) return;

    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id && item.tabla === producto.tabla);
      if (existente) {
        if (existente.cantidad < producto.stock) {
          return prev.map(item =>
            item.id === producto.id && item.tabla === producto.tabla
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          return prev; // No agregar más si ya está al máximo del stock
        }
      } else {
        // Asegura que incluimos `tabla` al agregar al carrito
        return [...prev, { ...producto, cantidad: 1, tabla: producto.tabla }];
      }
    });
  };

  const quitarDelCarrito = (id, tabla) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === id && item.tabla === tabla);
      if (existente && existente.cantidad > 1) {
        return prev.map(item =>
          item.id === id && item.tabla === tabla
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else {
        return prev.filter(item => !(item.id === id && item.tabla === tabla));
      }
    });
  };

  const eliminarDelCarrito = (id, tabla) => {
    setCarrito(prev => prev.filter(item => !(item.id === id && item.tabla === tabla)));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
export { CarritoContext };
