import { FaShoppingCart, FaUser, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/splogo.svg';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext'; 
import React from 'react';
import './../assets/styles/header.css';
import SearchBar from './SearchBar.jsx';

function Header() {
  const { carrito } = useCarrito();
  const { usuario, logout } = useAuth(); 
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  
 
 

  return (
    <header style={{ backgroundColor: '#fdd62c' }} className="border-bottom py-3">
      <div className="container d-flex justify-content-between align-items-center">

        <Link to="/" className="navbar-brand fw-bold">
          <img src={logo} alt="Logo" style={{ height: '80px' }} />
        </Link>

        <SearchBar />

        <div className="d-flex align-items-center gap-3">
          <Link to="/carrito" className="text-dark fs-4 position-relative" title="Carrito">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </Link>

          <Link className="nav-link" to="/catalogo">Publicados por Usuarios</Link>
          <Link className="nav-link" to="/todos">Ver Todos</Link>

          
          {usuario ? (
            <>
              <span className="text-dark">Hola, {usuario.email}</span>
             <Link to="/perfil" className="btn btn-outline-secondary d-flex align-items-center gap-2">
             <FaUser /> Perfil</Link>
              <Link to="/">
              <button onClick={logout} className="btn btn-outline-danger d-flex align-items-center gap-2">
              
                <FaSignOutAlt />
              Salir
              </button>

              </Link>
              
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary d-flex align-items-center gap-2">
                <FaUserPlus />
                Registrarse
              </Link>
              <Link to="/login" className="btn btn-success d-flex align-items-center gap-2">
                <FaSignInAlt />
                Iniciar Sesión
              </Link>
            </>
          )}
          
        </div>
        
      </div>
    </header>
  );
}

export default Header;
