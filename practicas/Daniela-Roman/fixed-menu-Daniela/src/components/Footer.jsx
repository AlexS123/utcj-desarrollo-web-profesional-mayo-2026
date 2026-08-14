import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContenido">

        <div className="footerSeccion">
          <h2>CDMX 2026 🌸</h2>
          <p>
            El itinerario del viaje del grupo a la Ciudad de México,
            del 30 de julio al 5 de agosto: lugares, actividades y
            todo lo que no nos podemos perder.
          </p>
        </div>

        <div className="footerSeccion">
          <h3>Enlaces</h3>
          <Link to="/">Inicio</Link>
          <Link to="/itinerario">Itinerario</Link>
          <Link to="/lugares">Lugares</Link>
          <Link to="/recomendaciones">Recomendaciones</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footerSeccion">
          <h3>Hospedaje</h3>
          <p>San Ángel / Olivar de los Padres</p>
          <p>Concierto de Harry Styles — 4 de agosto, GNP Seguros</p>
        </div>

      </div>

      <div className="footerInferior">
        <p>Hecho con 💗 para el viaje del grupo · 2026</p>
      </div>
    </footer>
  );
}

export default Footer;
