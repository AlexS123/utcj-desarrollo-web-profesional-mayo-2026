import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footerContenido">

        {/* AEROCLIMA */}
        <div className="footerSeccion">

          <h2>
            AeroClima
          </h2>

          <p>
            Somos una agencia de viajes enfocada en ofrecer
            experiencias seguras, cómodas y confiables para
            cada viajero.
          </p>

        </div>


        {/* ENLACES */}
        <div className="footerSeccion">

          <h3>
            Enlaces
          </h3>

          <Link to="/">
            Inicio
          </Link>

          <Link to="/vuelos">
            Vuelos
          </Link>

          <Link to="/destinos">
            Destinos
          </Link>

          <Link to="/ofertas">
            Ofertas
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

        </div>


        {/* CONTACTO */}
        <div className="footerSeccion">

          <h3>
            Contacto
          </h3>

          <p>
            Ciudad Juárez, Chihuahua
          </p>

          <a href="mailto:contacto@aeroclima.com">
            contacto@aeroclima.com
          </a>

          <a href="tel:+526560000000">
            (656) 4925678
          </a>

        </div>

      </div>


      <div className="footerInferior">

        <p>
          © 2026 AeroClima. Todos los derechos reservados.
        </p>

      </div>

    </footer>
  );
}

export default Footer;