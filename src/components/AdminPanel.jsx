import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../assets/config/apiConfig';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener todos los usuarios
    axios.get(`${API_BASE_URL}/api/users`)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al obtener usuarios', err));

    // Obtener todos los productos (publicados por usuarios)
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administración</h2>

      <h4>Usuarios registrados:</h4>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.email} - ID: {usuario.id}
          </li>
        ))}
      </ul>

      <hr />

      <h4>Publicaciones de usuarios:</h4>
      <div className="row">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`${API_BASE_URL}${producto.imagen}`}
                className="card-img-top"
                alt={producto.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="text-muted">Publicado por ID usuario: {producto.user_id}</p>
                {/* Aquí podrías agregar botón para eliminar */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
