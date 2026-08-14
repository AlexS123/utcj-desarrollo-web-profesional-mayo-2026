import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/lugares.css";

const lugares = [
  { nombre: "Castillo de Chapultepec", categoria: "Imperdible", descripcion: "Vistas de toda la ciudad y el Bosque de Chapultepec a los pies." },
  { nombre: "Zócalo y Catedral Metropolitana", categoria: "Centro Histórico", descripcion: "El corazón de la ciudad, perfecto para empezar el viaje." },
  { nombre: "Arena México (lucha libre)", categoria: "Imperdible", descripcion: "Función de lucha libre, ambiente único que no nos podemos perder." },
  { nombre: "Ling Ling", categoria: "Comida", descripcion: "Cena imperdible del grupo, hay que reservar con tiempo." },
  { nombre: "Roma Norte / Condesa", categoria: "Paseo", descripcion: "Calles arboladas, cafés lindos y tienditas para curiosear." },
  { nombre: "GNP Seguros", categoria: "Concierto", descripcion: "Aquí es el concierto de Harry Styles, 4 de agosto." },
  { nombre: "San Ángel / Olivar de los Padres", categoria: "Hospedaje", descripcion: "Nuestra base durante todo el viaje." },
  { nombre: "Monumento a la Revolución", categoria: "Vistas", descripcion: "Buen lugar para ver el atardecer sobre la ciudad." }
];

function Lugares() {
  return (
    <>
      <Navbar />

      <main className="lugaresPagina">
        <section className="lugaresHero">
          <span>LUGARES</span>
          <h1>Todo lo que queremos visitar</h1>
          <p>La lista de lugares del grupo, votados y organizados por zona.</p>
        </section>

        <section className="lugaresGrid">
          {lugares.map((lugar) => (
            <article className="lugarTarjeta" key={lugar.nombre}>
              <span className="lugarCategoria">{lugar.categoria}</span>
              <h3>{lugar.nombre}</h3>
              <p>{lugar.descripcion}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Lugares;
