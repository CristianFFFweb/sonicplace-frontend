import { useLocation, Link } from 'react-router-dom';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function ResultadosBusqueda() {
  const location = useLocation();
  const resultados = location.state?.resultados || [];

  return (
    <div className="container mt-5">
      <h4 className="mb-4">🔍 Resultados de la búsqueda</h4>
      {resultados.length === 0 ? (
        <p>No se encontraron productos con ese nombre.</p>
      ) : (
        <div className="row">
          {resultados.map((prod) => (
            <div key={`${prod.origen}-${prod.id}`} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={`${API_BASE_URL}${prod.imagen}`}
                  className="card-img-top"
                  alt={prod.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="card-text">{prod.descripcion}</p>
                  <p className="text-muted">${prod.precio}</p>
                  {prod.stock && <p className="text-muted">Stock: {prod.stock}</p>}
                  {prod.estado && <p className="text-muted">Estado: {prod.estado}</p>}
                  <Link
                    to={`/producto/${prod.origen}/${prod.id}`}
                    className="btn btn-outline-dark w-100"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultadosBusqueda;
