import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import axios from 'axios';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function Carrito() {
  const { carrito, agregarAlCarrito, quitarDelCarrito, eliminarDelCarrito, vaciarCarrito } =
    useContext(CarritoContext);
  const [procesandoPago, setProcesandoPago] = useState(false);

  const calcularTotal = () => {
    return carrito.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
  };

  const handleVaciarCarrito = () => {
    const confirmar = window.confirm('¿Estás seguro de que quieres vaciar el carrito?');
    if (confirmar) vaciarCarrito();
  };

  const handlePagar = async () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de pagar.');
      return;
    }

    const confirmar = window.confirm('¿Confirma su compra?');
    if (!confirmar) return;

    setProcesandoPago(true);
    try {
      // 1. Actualizar stock en el backend para cada producto
      await Promise.all(
        carrito.map((prod) => {
          const nuevoStock = prod.stock - prod.cantidad;
          return axios.patch(`${API_BASE_URL}/catalogo/${prod.id}`, {
            stock: nuevoStock < 0 ? 0 : nuevoStock,
          });
        })
      );

      // 2. Simular compra exitosa
      alert('¡Gracias por tu compra! 🎉');

      // 3. Vaciar carrito
      vaciarCarrito();
    } catch (err) {
      console.error('Error al procesar pago:', err);
      alert('Hubo un error al procesar tu pago. Intenta de nuevo más tarde.');
    } finally {
      setProcesandoPago(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Tu carrito está vacío.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>🛒 Carrito de compras</h2>
      <div className="row">
        {carrito.map((prod) => (
          <div key={prod.id} className="col-md-12 mb-3">
            <div className="card p-3 d-flex flex-row align-items-center">
              <img
                src={`${API_BASE_URL}${prod.imagen}`}
                alt={prod.nombre}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                className="me-3"
              />
              <div className="flex-grow-1">
                <h5>{prod.nombre}</h5>
                <p className="mb-1">Precio: ${prod.precio}</p>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => quitarDelCarrito(prod.id)}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    -
                  </button>
                  <span>{prod.cantidad}</span>
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="btn btn-sm btn-outline-secondary ms-2"
                    disabled={prod.cantidad >= prod.stock}
                  >
                    +
                  </button>
                </div>
                <p className="mt-2">Subtotal: ${prod.precio * prod.cantidad}</p>
                {prod.stock - prod.cantidad <= 0 && (
                  <p className="text-danger">Última unidad o agotado</p>
                )}
              </div>
              <button
                onClick={() => eliminarDelCarrito(prod.id)}
                className="btn btn-outline-danger ms-3"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: ${calcularTotal()}</h4>

        <button onClick={handleVaciarCarrito} className="btn btn-danger">
          Vaciar Carrito
        </button>

        <button
          onClick={handlePagar}
          className="btn btn-success"
          disabled={procesandoPago}
        >
          {procesandoPago ? 'Procesando...' : 'Pagar'}
        </button>
      </div>
    </div>
  );
}

export default Carrito;
