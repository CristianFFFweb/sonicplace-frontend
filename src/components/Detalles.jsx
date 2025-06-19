import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import axios from 'axios';
import { API_BASE_URL} from '../assets/config/apiConfig.js';


function ProductoDetalle() {
  const { categoria, id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/${categoria}/${id}`) 
      
      .then(res => setProducto(res.data))
      .catch(err => {
        console.error(err);
        setProducto(null);
      });
  }, [categoria, id]);

  if (!producto) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
         
          <img src={`${API_BASE_URL}${producto.imagen}`} alt={producto.nombre} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <h4 className="text-success">${producto.precio}</h4>
          <p className="text-muted">Estado: {producto.estado}</p>
          <p className="text-muted">Stock: {producto.stock}</p>
          {/* <button className="btn btn-primary mt-3" onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </button> */}
           {producto.stock > 0 ? (
      <button
        className="btn btn-outline-primary"
        onClick={() => agregarAlCarrito(producto)}
      >
        Agregar al carrito
      </button>
    ) : (
      <button className="btn btn-secondary" disabled>
        Agotado
      </button>
    )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
