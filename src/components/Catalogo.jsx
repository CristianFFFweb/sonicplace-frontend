import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);
  console.log(productos);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎶 Catálogo</h2>
      <div className="row">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-4 mb-4">
            <div className="card h-100">
              
              <div className="card-body">
                <img src={`${API_BASE_URL}${prod.imagen}`} className="card-img-top" alt={prod.nombre} />
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="text-muted">${prod.precio}</p>
                <p className="text-muted">Stock: {prod.stock}</p>
                <p className="text-muted">Estado: {prod.estado}</p>
                <p className="text-sm text-gray-500">Publicado por: {prod.publicado_por}</p>
                
                <Link to={`/producto/products/${prod.id}`} className="btn btn-outline-dark w-100">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
