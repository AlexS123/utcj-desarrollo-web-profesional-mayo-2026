import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/recomendaciones.css";

const recomendaciones = [
  {
    titulo: "Outfits",
    tips: [
      "Ropa cómoda para caminar: tenis, pantalón y playera",
      "Abrigo ligero o chamarra para las noches",
      "Un outfit especial para el concierto de Harry Styles"
    ]
  },
  {
    titulo: "Transporte",
    tips: [
      "App de taxis para moverse de noche, sobre todo tras el bar crawl",
      "Metro/metrobús para tramos largos durante el día",
      "Salir con tiempo antes del concierto por el tráfico"
    ]
  },
  {
    titulo: "Presupuesto",
    tips: [
      "Llevar efectivo para mercados y puestos callejeros",
      "Reservar Ling Ling con anticipación",
      "Dejar un colchón extra para souvenirs"
    ]
  },
  {
    titulo: "Salud y comodidad",
    tips: [
      "Protector solar y agua siempre a la mano",
      "Algo para el dolor de pies después de tanto caminar",
      "Cargador/power bank para no quedarnos sin batería"
    ]
  }
];

function Recomendaciones() {
  return (
    <>
      <Navbar />

      <main className="recomendacionesPagina">
        <section className="recomendacionesHero">
          <span>RECOMENDACIONES</span>
          <h1>Tips para el viaje</h1>
          <p>Cositas que nos van a ayudar a disfrutar más y estresarnos menos.</p>
        </section>

        <section className="recomendacionesGrid">
          {recomendaciones.map((grupo) => (
            <article className="recomendacionTarjeta" key={grupo.titulo}>
              <h3>{grupo.titulo}</h3>
              <ul>
                {grupo.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Recomendaciones;
