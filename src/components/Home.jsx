import Destacados from "./Destacados";
import OfertasCarrusel from "./OfertasCarrusel";


function Home() {
  return (
    <div className="container my-5">
      <Destacados />
      <OfertasCarrusel />
      <h1 className="text-center">Bienvenido a  SonicPlace</h1>
      <p className="text-center">
        Aquí podrás encontrar productos destacados, ofertas y mucho más. Vive la música con nosotros.
      </p>
    </div>
  );
}
export default Home;