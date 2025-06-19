function Footer() {
    return (
      
        <footer style={{ backgroundColor: '#fdd62c' }} className="text-dark mt-auto py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Sobre Nosotros</h5>
              <p>Tu tienda de confianza para encontrar productos increíbles a precios competitivos.</p>
            </div>
            <div className="col-md-4">
              <h5>Enlaces Útiles</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Política de privacidad</a></li>
                <li><a href="#" className="text-white text-decoration-none">Términos y condiciones</a></li>
                <li><a href="#" className="text-white text-decoration-none">Ayuda</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contactar Admin</h5>
              <p>Email: sonicplaceAdmin@sonicplace.com</p>
              <p>Teléfono: +123 456 7890</p>
            </div>
          </div>
          <div className="text-center mt-3">
            <small>&copy; 2025 SonicPlace. Todos los derechos reservados.</small>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;