import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ofertas.css";

import ofertasHero from "../images/ofertas-hero.jpg";
import ofertaCancun from "../images/oferta-cancun.jpg";
import ofertaGuadalajara from "../images/oferta-guadalajara.jpg";
import ofertaNuevaYork from "../images/oferta-nueva-york.jpg";
import ofertaMadrid from "../images/oferta-madrid.jpg";

function Ofertas() {
  const navigate = useNavigate();
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);

  const ofertas = [
    {
      id: 1,
      destino: "Cancún",
      ruta: "Ciudad de México → Cancún",
      categoria: "DESTINO NACIONAL",
      precio: 2499,
      descripcion:
        "Disfruta de las playas, el clima y los paisajes del Caribe mexicano.",
      tipoViaje: "Playa y descanso",
      incluye:
        "Vuelo de ida y vuelta y opciones para disfrutar de playas, actividades acuáticas y entretenimiento.",
      recomendacion:
        "Ideal para vacaciones familiares, viajes en pareja y escapadas de descanso.",
      imagen: ofertaCancun
    },

    {
      id: 2,
      destino: "Guadalajara",
      ruta: "Ciudad de México → Guadalajara",
      categoria: "DESTINO NACIONAL",
      precio: 2099,
      descripcion:
        "Descubre la cultura, gastronomía y tradición de una de las ciudades más representativas de México.",
      tipoViaje: "Cultura y gastronomía",
      incluye:
        "Vuelo de ida y vuelta y la posibilidad de conocer espacios culturales, zonas históricas y gastronomía tradicional.",
      recomendacion:
        "Ideal para quienes buscan conocer la cultura, historia y gastronomía de Jalisco.",
      imagen: ofertaGuadalajara
    },

    {
      id: 3,
      destino: "Nueva York",
      ruta: "Ciudad de México → Nueva York",
      categoria: "DESTINO INTERNACIONAL",
      precio: 9999,
      descripcion:
        "Conoce una de las ciudades más famosas del mundo y disfruta de sus grandes atractivos.",
      tipoViaje: "Grandes ciudades",
      incluye:
        "Vuelo de ida y vuelta y la oportunidad de recorrer lugares emblemáticos, zonas comerciales y espacios culturales.",
      recomendacion:
        "Ideal para quienes disfrutan de las grandes ciudades, el entretenimiento, las compras y la cultura.",
      imagen: ofertaNuevaYork
    },

    {
      id: 4,
      destino: "Madrid",
      ruta: "Ciudad de México → Madrid",
      categoria: "DESTINO INTERNACIONAL",
      precio: 12999,
      descripcion:
        "Explora la historia, gastronomía, arquitectura y cultura de la capital española.",
      tipoViaje: "Cultura e historia",
      incluye:
        "Vuelo de ida y vuelta y la oportunidad de conocer lugares históricos, museos, plazas y espacios culturales.",
      recomendacion:
        "Ideal para viajes culturales, gastronómicos y para conocer la historia y arquitectura de España.",
      imagen: ofertaMadrid
    }
  ];

  return (
    <>

      <Navbar />

      <main>

        {/* HERO */}

        <section className="ofertasHero">

          <div className="ofertasHeroImagen">

            <img
              src={ofertasHero}
              alt="Avión viajando hacia un destino"
            />

          </div>

          <div className="ofertasHeroContenido">

            <span>
              OFERTAS PARA VIAJAR
            </span>

            <h1>
              Encuentra tu próxima aventura
            </h1>

            <p>
              Descubre nuestras ofertas destacadas y encuentra
              opciones ideales para comenzar a planear tu próximo viaje.
            </p>

          </div>

        </section>


        {/* OFERTAS DESTACADAS */}

        <section className="ofertasSeccion">

          <div className="seccionTitulo">

            <span>
              PROMOCIONES DESTACADAS
            </span>

            <h2>
              Ofertas especiales
            </h2>

            <p>
              Conoce algunas de las opciones que AeroClima
              tiene disponibles para diferentes destinos.
            </p>

          </div>


          <div className="ofertasGrid">

            {ofertas.map((oferta) => (

              <article
                className="ofertaCard"
                key={oferta.id}
              >

                <div className="ofertaImagen">

                  <img
                    src={oferta.imagen}
                    alt={`Destino turístico de ${oferta.destino}`}
                  />

                  <span>
                    OFERTA
                  </span>

                </div>


                <div className="ofertaContenido">

                  <span className="ofertaEtiqueta">
                    {oferta.categoria}
                  </span>

                  <h3>
                    {oferta.ruta}
                  </h3>

                  <p>
                    {oferta.descripcion}
                  </p>

                  <div className="ofertaPrecio">

                    <small>
                      Desde
                    </small>

                    <strong>
                      ${oferta.precio.toLocaleString("es-MX")} MXN
                    </strong>

                    <small>
                      por pasajero
                    </small>

                  </div>

                  <small className="notaOferta">
                    *Precio ilustrativo sujeto a disponibilidad.
                  </small>

                  <button
                    onClick={() => setOfertaSeleccionada(oferta)}
                  >
                    Ver detalles
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* INFORMACIÓN */}

        <section className="informacionOfertas">

          <div className="seccionTitulo">

            <span>
              INFORMACIÓN IMPORTANTE
            </span>

            <h2>
              Planea tu viaje con AeroClima
            </h2>

            <p>
              Las ofertas mostradas en esta página forman parte
              de la demostración del sitio web y representan
              precios ilustrativos.
            </p>

          </div>


          <div className="informacionOfertasGrid">

            <div className="informacionOferta">

              <h3>
                Precios ilustrativos
              </h3>

              <p>
                Los precios mostrados tienen como objetivo
                representar las promociones disponibles dentro
                de AeroClima.
              </p>

            </div>


            <div className="informacionOferta">

              <h3>
                Destinos nacionales
              </h3>

              <p>
                Encuentra opciones para conocer diferentes
                ciudades y lugares dentro de México.
              </p>

            </div>


            <div className="informacionOferta">

              <h3>
                Destinos internacionales
              </h3>

              <p>
                Descubre algunas de las principales ciudades
                internacionales que puedes visitar.
              </p>

            </div>

          </div>

        </section>


        {/* LLAMADA FINAL */}

        <section className="llamadaFinalOfertas">

          <div>

            <span>
              COMIENZA A VIAJAR
            </span>

            <h2>
              ¿Encontraste una oferta que te interesa?
            </h2>

            <p>
              Explora nuestros vuelos y encuentra la ruta
              ideal para tu próximo viaje.
            </p>

            <button onClick={() => navigate("/vuelos")}>
              Explorar vuelos
            </button>

          </div>

        </section>
        {ofertaSeleccionada && (

          <div
            className="modalOfertaOverlay"
            onClick={() => setOfertaSeleccionada(null)}
          >

            <div
              className="modalOferta"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="cerrarModalOferta"
                onClick={() => setOfertaSeleccionada(null)}
              >
                ×
              </button>


              <div className="modalOfertaImagen">

                <img
                  src={ofertaSeleccionada.imagen}
                  alt={`Destino ${ofertaSeleccionada.destino}`}
                />

                <span>
                  {ofertaSeleccionada.categoria}
                </span>

              </div>


              <div className="modalOfertaContenido">

                <span className="modalOfertaEtiqueta">
                  OFERTA DESTACADA
                </span>

                <h2>
                  {ofertaSeleccionada.destino}
                </h2>

                <p className="modalOfertaRuta">
                  {ofertaSeleccionada.ruta}
                </p>


                <div className="modalOfertaPrecio">

                  <small>
                    Precio desde
                  </small>

                  <strong>
                    ${ofertaSeleccionada.precio.toLocaleString("es-MX")} MXN
                  </strong>

                  <span>
                    por pasajero
                  </span>

                </div>


                <h3>
                  Sobre esta oferta
                </h3>

                <p>
                  {ofertaSeleccionada.descripcion}
                </p>


                <h3>
                  Tipo de viaje
                </h3>

                <p>
                  {ofertaSeleccionada.tipoViaje}
                </p>


                <h3>
                  ¿Qué puedes encontrar?
                </h3>

                <p>
                  {ofertaSeleccionada.incluye}
                </p>


                <h3>
                  Recomendación
                </h3>

                <p>
                  {ofertaSeleccionada.recomendacion}
                </p>


                <div className="modalOfertaNota">

                  <strong>
                    Importante:
                  </strong>

                  <span>
                    Precio ilustrativo sujeto a disponibilidad.
                  </span>

                </div>


                <div className="modalOfertaBotones">

                  <button
                    className="btnExplorarOferta"
                    onClick={() => {
                      setOfertaSeleccionada(null);
                      window.location.href = "/vuelos";
                    }}
                  >
                    Explorar vuelos
                  </button>

                  <button
                    className="btnCerrarOferta"
                    onClick={() => setOfertaSeleccionada(null)}
                  >
                    Cerrar
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      </main>

      <Footer />

    </>
  );
}

export default Ofertas;