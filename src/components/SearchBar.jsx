import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function SearchBar() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleBuscar = async (e) => {
  e.preventDefault();
  if (!busqueda.trim()) return;

  try {
    const res = await axios.get(`${API_BASE_URL}/api/busqueda?nombre=${busqueda}`);
    navigate('/busqueda', { state: { resultados: res.data } });
    setBusqueda('');
  } catch (err) {
    console.error('Error al buscar:', err);
  }
};
  return (
    <form className="d-flex" onSubmit={handleBuscar}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;