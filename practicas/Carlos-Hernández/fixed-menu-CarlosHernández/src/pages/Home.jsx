import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

import heroAvion from "../images/hero-avion.jpg";
import destinoCancun from "../images/destino-cancun.jpg";
import destinoMadrid from "../images/destino-madrid.jpg";
import destinoParis from "../images/destino-paris.jpg";
import ofertaCancun from "../images/oferta-cancun.jpg";
import ofertaMadrid from "../images/oferta-madrid.jpg";
function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* HERO PRINCIPAL */}
        <section className="hero">

          <div className="heroContenido">

            <div className="heroTexto">

              <span className="heroEtiqueta">
                TU PRÓXIMA AVENTURA COMIENZA AQUÍ
              </span>

              <h1>
                Viaja hacia nuevas experiencias
              </h1>

              <p>
                Descubre nuevos destinos, disfruta de experiencias
                inolvidables y encuentra opciones de viaje pensadas
                para ti.
              </p>

              <div className="heroBotones">

                <Link to="/destinos">
                  <button className="btnPrincipal">
                    Explorar destinos
                  </button>
                </Link>

                <Link to="/ofertas">
                  <button className="btnSecundario">
                    Ver ofertas
                  </button>
                </Link>

              </div>

            </div>

            <div className="heroImagen">
              <img
                src={heroAvion}
                alt="Avión comercial volando sobre las nubes"
              />
            </div>

          </div>

        </section>


        {/* POR QUÉ AEROCLIMA */}
        <section className="beneficios">

          <div className="seccionTitulo">

            <span>CONOCE AEROCLIMA</span>

            <h2>
              ¿Por qué viajar con nosotros?
            </h2>

            <p>
              Trabajamos para que cada parte de tu viaje sea
              una experiencia cómoda, segura y memorable.
            </p>

          </div>


          <div className="beneficiosGrid">

            <div className="beneficio">

              <h3>Viajes seguros</h3>

              <p>
                Te ayudamos a encontrar opciones de viaje
                confiables para que puedas disfrutar de tu
                experiencia con tranquilidad.
              </p>

            </div>


            <div className="beneficio">

              <h3>Experiencias cómodas</h3>

              <p>
                Encuentra alternativas pensadas para que
                puedas disfrutar de tu viaje desde el primer
                momento hasta llegar a tu destino.
              </p>

            </div>


            <div className="beneficio">

              <h3>Atención personalizada</h3>

              <p>
                Nuestro objetivo es acompañarte durante la
                planeación de tu viaje y ayudarte a encontrar
                la opción que mejor se adapte a tus necesidades.
              </p>

            </div>

          </div>

        </section>


        {/* DESTINOS DESTACADOS */}
        <section className="destinos">

          <div className="seccionTitulo">

            <span>DESCUBRE EL MUNDO</span>

            <h2>
              Destinos destacados
            </h2>

            <p>
              Conoce algunos de los lugares que puedes
              descubrir en tu próxima aventura.
            </p>

          </div>


          <div className="destinosGrid">

            <article className="destinoCard">

              <img
                src={destinoCancun}
                alt="Playa de Cancún"
              />
              <div className="destinoContenido">

                <h3>Cancún</h3>

                <p>
                  Disfruta de playas de aguas turquesas,
                  paisajes increíbles y experiencias
                  inolvidables en uno de los destinos más
                  populares de México.
                </p>

                <Link to="/destinos">
                  <button>
                    Conocer destino
                  </button>
                </Link>

              </div>

            </article>


            <article className="destinoCard">
              <img
                src={destinoMadrid}
                alt="Ciudad de Madrid"
              />
              <div className="destinoContenido">

                <h3>Madrid</h3>

                <p>
                  Descubre la cultura, gastronomía,
                  arquitectura e historia de una de las
                  ciudades más importantes de España.
                </p>

                <Link to="/destinos">
                  <button>
                    Conocer destino
                  </button>
                </Link>

              </div>

            </article>


            <article className="destinoCard">
              <img
                src={destinoParis}
                alt="Torre Eiffel en París"
              />
              <div className="destinoContenido">

                <h3>París</h3>

                <p>
                  Vive una experiencia inolvidable recorriendo
                  sus calles, monumentos y lugares más
                  representativos.
                </p>

                <Link to="/destinos">
                  <button>
                    Conocer destino
                  </button>
                </Link>

              </div>

            </article>

          </div>

        </section>


        {/* OFERTAS */}
        <section className="ofertas">

          <div className="seccionTitulo">

            <span>OPORTUNIDADES PARA VIAJAR</span>

            <h2>
              Ofertas destacadas
            </h2>

            <p>
              Encuentra opciones para comenzar a planear
              tu próximo viaje.
            </p>

          </div>


          <div className="ofertasGrid">

            <article className="ofertaCard">
              <img
                src={ofertaCancun}
                alt="Destino turístico de Cancún"
              />
              <div className="ofertaContenido">

                <span className="ofertaEtiqueta">
                  DESTINO NACIONAL
                </span>

                <h3>
                  Ciudad de México → Cancún
                </h3>

                <p>
                  Vuelo de ida y vuelta
                </p>

                <strong>
                  Desde $2,499 MXN
                </strong>

                <small>
                  *Precio ilustrativo sujeto a disponibilidad.
                </small>

                <Link to="/ofertas">
                  <button>
                    Ver oferta
                  </button>
                </Link>

              </div>

            </article>


            <article className="ofertaCard">
              <img
                src={ofertaMadrid}
                alt="Destino turístico de Madrid"
              />
              <div className="ofertaContenido">

                <span className="ofertaEtiqueta">
                  DESTINO INTERNACIONAL
                </span>

                <h3>
                  Ciudad de México → Madrid
                </h3>

                <p>
                  Vuelo de ida y vuelta
                </p>

                <strong>
                  Desde $12,999 MXN
                </strong>

                <small>
                  *Precio ilustrativo sujeto a disponibilidad.
                </small>

                <Link to="/ofertas">
                  <button>
                    Ver oferta
                  </button>
                </Link>

              </div>

            </article>

          </div>

        </section>


        {/* LLAMADA FINAL */}
        <section className="llamadaFinal">

          <div>

            <span>
              COMIENZA A PLANEAR
            </span>

            <h2>
              ¿Listo para comenzar tu próximo viaje?
            </h2>

            <p>
              Explora nuestros destinos y encuentra la opción
              ideal para tu próxima aventura.
            </p>

            <Link to="/destinos">
              <button>
                Explorar destinos
              </button>
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}

export default Home;