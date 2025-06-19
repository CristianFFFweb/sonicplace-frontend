import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setUsuario({
        id: decoded.id,
        email: decoded.email,
        nombre: decoded.nombre, // si lo incluiste en el token
      });
    }
  }, []);

  const login = (user, token) => {
    const decoded = jwtDecode(token);
    const usuarioCompleto = {
    id: decoded.id,
    email: decoded.email,
    nombre: decoded.nombre,
  };

  setUsuario(usuarioCompleto);
  setToken(token);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
