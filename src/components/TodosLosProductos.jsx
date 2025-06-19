import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function TodosLosProductos() {
  const [productos, setProductos] = useState([]);

 

  useEffect(() => {
  const obtenerTodos = async () => {
    try {
      const resultados = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/api/destacados`),
        axios.get(`${API_BASE_URL}/api/ofertas`),
        axios.get(`${API_BASE_URL}/api/products`),
      ]);

      const productosExitosos = resultados
        .filter(res => res.status === 'fulfilled')
        .flatMap(res => res.value.data);

      setProductos(productosExitosos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  obtenerTodos();
}, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎧 Todos los Productos</h2>
      <div className="row">
        {productos.map(prod => (
          <div key={`${prod.id}-${prod.nombre}`} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={`${API_BASE_URL}${prod.imagen}`} className="card-img-top" alt={prod.nombre} />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="text-muted">${prod.precio}</p>
                <p className="text-muted">Stock: {prod.stock}</p>
                <p className="text-muted">Estado: {prod.estado}</p>
                {/* Detectar categoría para el enlace */}
              
                <Link to={`/producto/${detectarCategoria(prod)}/${prod.id}`} className="btn btn-outline-dark w-100">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Función auxiliar para detectar la categoría según la presencia de propiedades únicas
function detectarCategoria(producto) {
  if (producto.precio_anterior) return 'ofertas';
  if (producto.user_id) return 'products'; 
  return 'destacados';
}

export default TodosLosProductos;
