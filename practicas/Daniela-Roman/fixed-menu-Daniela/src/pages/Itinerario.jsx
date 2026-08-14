import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/itinerario.css";

const dias = [
  {
    label: "Jue 30 Jul",
    titulo: "Llegada a CDMX",
    actividades: [
      { hora: "Tarde", nombre: "Llegada y check-in en San Ángel / Olivar de los Padres" },
      { hora: "Noche", nombre: "Cena ligera cerca del hospedaje para aclimatarnos" }
    ]
  },
  {
    label: "Vie 31 Jul",
    titulo: "Centro Histórico",
    actividades: [
      { hora: "Mañana", nombre: "Zócalo, Catedral Metropolitana y Palacio Nacional" },
      { hora: "Tarde", nombre: "Bar crawl por el Centro" },
      { hora: "Noche", nombre: "Cena en el Centro Histórico" }
    ]
  },
  {
    label: "Sáb 1 Ago",
    titulo: "Chapultepec y lucha libre",
    actividades: [
      { hora: "Mañana", nombre: "Bosque de Chapultepec y Castillo de Chapultepec" },
      { hora: "Tarde", nombre: "Bar crawl en Roma/Condesa" },
      { hora: "Noche", nombre: "Función de lucha libre" }
    ]
  },
  {
    label: "Dom 2 Ago",
    titulo: "Roma - Condesa",
    actividades: [
      { hora: "Mañana", nombre: "Paseo por Roma y Condesa, cafecitos y tienditas" },
      { hora: "Tarde", nombre: "Bar crawl por la zona" },
      { hora: "Noche", nombre: "Cena en Ling Ling" }
    ]
  },
  {
    label: "Lun 3 Ago",
    titulo: "Día libre / compras",
    actividades: [
      { hora: "Tarde", nombre: "Tiempo libre, compras y descanso antes del concierto" },
      { hora: "Noche", nombre: "Bar crawl tranquilo cerca del hospedaje" }
    ]
  },
  {
    label: "Mar 4 Ago",
    titulo: "Harry Styles 🎤",
    actividades: [
      { hora: "Tarde", nombre: "Outfits, pre-concierto y traslado al GNP Seguros" },
      { hora: "Noche", nombre: "Concierto de Harry Styles en el GNP Seguros" }
    ]
  },
  {
    label: "Mié 5 Ago",
    titulo: "Regreso",
    actividades: [
      { hora: "Mañana", nombre: "Check-out y últimos pendientes" },
      { hora: "Tarde", nombre: "Traslado al aeropuerto / regreso a casa" }
    ]
  }
];

function Itinerario() {
  const [diaActivo, setDiaActivo] = useState(0);

  return (
    <>
      <Navbar />

      <main className="itinerarioPagina">
        <section className="itinerarioHero">
          <span>ITINERARIO</span>
          <h1>Día a día en CDMX</h1>
          <p>
            Toca cada día para ver los planes. Las tardes casi siempre
            terminan en bar crawl, así que trae zapatos cómodos. 
          </p>
        </section>

        <div className="diasTabs">
          {dias.map((dia, index) => (
            <button
              key={dia.label}
              className={index === diaActivo ? "diaTab activo" : "diaTab"}
              onClick={() => setDiaActivo(index)}
            >
              {dia.label}
            </button>
          ))}
        </div>

        <section className="diaContenido">
          <h2>{dias[diaActivo].titulo}</h2>

          <ul className="listaActividades">
            {dias[diaActivo].actividades.map((actividad) => (
              <li key={actividad.hora + actividad.nombre}>
                <span className="horaActividad">{actividad.hora}</span>
                <span>{actividad.nombre}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Itinerario;
