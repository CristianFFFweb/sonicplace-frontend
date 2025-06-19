import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('Completa ambos campos.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password
      });

      const { token, user } = res.data;

      if (token && user) {
        login(user, token);
        alert('Inicio de sesión exitoso');
        navigate('/');
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } catch (err) {
      setError('Error al intentar iniciar sesión.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
