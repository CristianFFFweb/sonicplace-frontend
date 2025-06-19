import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './../assets/styles/destacados.css'
import { Link } from 'react-router-dom';
import { API_BASE_URL} from '../assets/config/apiConfig.js';

function Destacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/destacados`) 
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

return (
    <div className="container mt-5 destacados-wrapper">
        <h2 className="mb-4 text-center">🎸 Productos Destacados</h2>
        <Slider {...settings}>
            {productos.map(prod => (
                <div key={prod.id} className="p-2">
                    <div className="card h-100 carrusel-card">
                        <div className="img-wrapper">
                            <img src={`${API_BASE_URL}${prod.imagen}`} className="card-img-top" alt={prod.nombre} />
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">{prod.nombre}</h5>
                            <p className="card-text">{prod.descripcion}</p>
                            <p className="text-muted">${prod.precio}</p>
                        </div>
                        <div className="card-footer bg-transparent border-0">
                            <Link to={`/producto/destacados/${prod.id}`} className="btn btn-sm btn-outline-dark w-100">
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
);
}

export default Destacados;
