import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <span className="heroEtiqueta">30 JUL — 6 AGO 2026</span>
        <h1>Nuestro viaje a la Ciudad de México</h1>
        <p>
          Un itinerario hecho entre todas para no perdernos nada. 
        </p>

        <div className="heroBotones">
          <Link to="/itinerario"><button>Ver itinerario</button></Link>
          <Link to="/lugares"><button className="btnSecundario">Ver lugares</button></Link>
        </div>
      </section>

      <section className="resumenViaje">
        <div className="resumenTarjeta">
          <h3>Hospedaje</h3>
          <p>San Ángel / Olivar de los Padres</p>
        </div>

        <div className="resumenTarjeta">
          <h3>Concierto</h3>
          <p>Harry Styles — 4 de agosto, GNP Seguros</p>
        </div>

        <div className="resumenTarjeta">
          <h3>Imperdibles</h3>
          <p>Bar Hopping, lucha libre, Ling Ling</p>
        </div>

        <div className="resumenTarjeta">
          <h3>Planes</h3>
          <p>Bar crawl casi todas las tardes</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
