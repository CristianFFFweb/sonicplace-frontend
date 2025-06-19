import { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    
    if (producto.stock <= 0) return;

    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);
      if (existente) {
       
        if (existente.cantidad < producto.stock) {
          return prev.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          return prev; 
        }
      } else {
        
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === id);
      if (existente && existente.cantidad > 1) {
        return prev.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        return prev.filter(item => item.id !== id);
      }
    });
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
export { CarritoContext };