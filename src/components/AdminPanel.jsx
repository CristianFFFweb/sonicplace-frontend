import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../assets/config/apiConfig';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/users`)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  }, []);

  const verPublicaciones = (id) => {
    axios.get(`${API_BASE_URL}/api/admin/users/${id}/publicaciones`)
      .then(res => {
        setPublicaciones(res.data);
        setUsuarioSeleccionado(id);
      })
      .catch(err => console.error('Error al obtener publicaciones:', err));
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario y sus publicaciones?')) {
      axios.delete(`${API_BASE_URL}/api/admin/users/${id}`)
        .then(() => {
          setUsuarios(prev => prev.filter(u => u.id !== id));
          if (usuarioSeleccionado === id) {
            setPublicaciones([]);
            setUsuarioSeleccionado(null);
          }
        })
        .catch(err => console.error('Error al eliminar usuario:', err));
    }
  };

  const eliminarPublicacion = (id) => {
    axios.delete(`${API_BASE_URL}/api/products/${id}`)
      .then(() => {
        setPublicaciones(prev => prev.filter(p => p.id !== id));
      })
      .catch(err => console.error('Error al eliminar publicación:', err));
  };

  const eliminarDestacado = (id) => {
    axios.delete(`${API_BASE_URL}/api/admin/destacados/${id}`)
      .then(() => alert('Destacado eliminado'))
      .catch(err => console.error('Error al eliminar destacado:', err));
  };

  const eliminarOferta = (id) => {
    axios.delete(`${API_BASE_URL}/api/admin/ofertas/${id}`)
      .then(() => alert('Oferta eliminada'))
      .catch(err => console.error('Error al eliminar oferta:', err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👑 Panel de Administración</h2>

      <h4>Usuarios</h4>
      <ul className="list-group mb-4">
        {usuarios.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{user.fullname} ({user.email})</span>
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => verPublicaciones(user.id)}>Ver publicaciones</button>
              <button className="btn btn-sm btn-danger" onClick={() => eliminarUsuario(user.id)}>Eliminar usuario</button>
            </div>
          </li>
        ))}
      </ul>

      {usuarioSeleccionado && (
        <>
          <h4>Publicaciones del usuario</h4>
          {publicaciones.length === 0 ? <p>No hay publicaciones.</p> :
            publicaciones.map(p => (
              <div key={p.id} className="card mb-2">
                <div className="card-body">
                  <h5>{p.nombre}</h5>
                  <p>{p.descripcion}</p>
                  <p className="text-muted">Categoría: {p.categoria}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarPublicacion(p.id)}>Eliminar</button>
                </div>
              </div>
            ))}
        </>
      )}

      <hr />
      <h4>Eliminar producto de ofertas/destacados</h4>
      <form onSubmit={(e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const tipo = e.target.tipo.value;
        if (tipo === 'destacado') eliminarDestacado(id);
        if (tipo === 'oferta') eliminarOferta(id);
        e.target.reset();
      }}>
        <div className="row g-2 align-items-center">
          <div className="col">
            <input type="number" name="id" className="form-control" placeholder="ID del producto" required />
          </div>
          <div className="col">
            <select name="tipo" className="form-select">
              <option value="destacado">Destacado</option>
              <option value="oferta">Oferta</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-warning" type="submit">Eliminar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;
