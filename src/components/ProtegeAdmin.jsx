
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaAdmin = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario || usuario.email !== 'sonicplaceAdmin@sonicplace.com') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaAdmin;
