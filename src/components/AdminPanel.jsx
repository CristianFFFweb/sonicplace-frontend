import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../assets/config/apiConfig';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const usuariosRes = await axios.get(`${API_BASE_URL}/api/users`);
      const productosRes = await axios.get(`${API_BASE_URL}/api/products`);
      setUsuarios(usuariosRes.data);
      setProductos(productosRes.data);
    } catch (err) {
      console.error('Error al obtener datos', err);
    }
  };

  const eliminarUsuario = async (id, email) => {
    if (email === 'sonicplaceAdmin@sonicplace.com') {
      alert('No se puede eliminar al administrador.');
      return;
    }

    if (window.confirm(`¿Eliminar al usuario ${email}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Eliminar esta publicación?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        setProductos(productos.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administración</h2>

      <h4>Usuarios registrados:</h4>
      <ul className="list-group mb-4">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            {usuario.email}
            {usuario.email !== 'sonicplaceAdmin@sonicplace.com' && (
              <button className="btn btn-sm btn-danger" onClick={() => eliminarUsuario(usuario.id, usuario.email)}>
                Eliminar usuario
              </button>
            )}
          </li>
        ))}
      </ul>

      <hr />

      <h4>Publicaciones de usuarios:</h4>
      <div className="row">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src={`${API_BASE_URL}${producto.imagen}`}
                className="card-img-top"
                alt={producto.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="text-muted">Publicado por ID usuario: {producto.user_id}</p>
                <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(producto.id)}>
                  Eliminar publicación
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
