import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MisPublicaciones from './MisPublicaciones.jsx';
import AdminForm from './AdminForm.jsx';


function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    console.log('Usuario guardado:', usuarioGuardado);
    if (!usuarioGuardado) {
      navigate('/login');
    } else {
      setUsuario(usuarioGuardado);
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUsuario(null);
    navigate('/');
    window.location.reload(); 
  };

  if (!usuario) return <p className="text-center mt-5">Cargando perfil...</p>;

  if (usuario.email !== 'sonicplaceAdmin@sonicplace.com' && localStorage.getItem('token'))


return (
    <div className="container mt-5">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {usuario.fullName}</p>
        <p><strong>Email:</strong> {usuario.email}</p>

        <MisPublicaciones />

        <button
            className="btn btn-success mt-3"
            onClick={() => navigate('/agregar')}
        >
            Publicar
        </button>
        <button className="btn btn-danger mt-3" onClick={cerrarSesion}>
            Cerrar Sesión
        </button>
    </div>
);
else { if (usuario.email === 'sonicplaceAdmin@sonicplace.com' && localStorage.getItem('token')) 
    return (
    <div className="container mt-5">
      <h2>Perfil de Administrador</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p className="text-danger">¡Bienvenido administrador!</p>
      <AdminForm />
      <button className="btn btn-danger" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}}

export default Perfil;
