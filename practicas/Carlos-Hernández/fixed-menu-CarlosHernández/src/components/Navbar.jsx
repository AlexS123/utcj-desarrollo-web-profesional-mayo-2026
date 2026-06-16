import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="menuSuperior">

      <h2 className="logo">AeroClima</h2>

      <div className="opcionesMenu">

        <Link to="/"><button>Inicio</button></Link>
        <button>Vuelos</button>
        <button>Destinos</button>
        <button>Ofertas</button>
        <button>Contacto</button>

        <Link to="/registro">
          <button className="btnRegistro">Registrarse</button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;