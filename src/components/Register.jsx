import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    termsAccepted: false,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      fullName,
      phone,
      termsAccepted,
    } = formData;

    if (!email || !password || !confirmPassword || !fullName || !phone) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!termsAccepted) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    setError('');
    axios.post(`${API_BASE_URL}/api/users/register`, {
  email,
  password,
  fullName,
  phone
})
.then(() => {
  alert('Usuario registrado con éxito');
  navigate('/login');
})
.catch(() => {
  setError('Error al registrar el usuario. Intenta más tarde.');
});
    
    navigate('/login'); 
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Número de teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="terms">
            Acepto los <a href="#">términos y condiciones</a>
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;
