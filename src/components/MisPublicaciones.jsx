import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function MisPublicaciones() {
  const { usuario } = useAuth();
  const [misProductos, setMisProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMisProductos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/`);
        const misItems = res.data.filter(item => item.user_id === usuario.id);
        setMisProductos(misItems);
      } catch (err) {
        console.error('Error al cargar tus productos', err);
      } finally {
        setCargando(false);
      }
    };

    if (usuario?.id) {
      fetchMisProductos();
    }
  }, [usuario]);

  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMisProductos(prev => prev.filter(prod => prod.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto');
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mt-4">Mis productos publicados</h4>

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div className="row">
          {misProductos.length === 0 ? (
            <p>No tienes productos publicados aún.</p>
          ) : (
            misProductos.map(producto => (
              <div key={producto.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <img src={`${API_BASE_URL}${producto.imagen}`} alt={producto.nombre} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p><strong>${producto.precio}</strong></p>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/producto/products/${producto.id}`)}
                      >
                        Ver detalles
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MisPublicaciones;