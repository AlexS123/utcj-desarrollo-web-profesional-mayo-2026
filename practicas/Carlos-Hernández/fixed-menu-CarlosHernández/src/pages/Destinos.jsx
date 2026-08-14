import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/destinos.css";

import destinosHero from "../images/destinos-hero.jpg";

import destinoCancun from "../images/destino-cancun.jpg";
import destinoMonterrey from "../images/destino-monterrey.jpg";
import destinoCiudadMexico from "../images/destino-ciudad-mexico.jpg";
import destinoCiudadJuarez from "../images/destino-ciudad-juarez.jpg";
import destinoGuadalajara from "../images/destino-guadalajara.jpg";
import destinoPuertoVallarta from "../images/destino-puerto-vallarta.jpg";

import destinoMadrid from "../images/destino-madrid.jpg";
import destinoParis from "../images/destino-paris.jpg";
import destinoNuevaYork from "../images/destino-nueva-york.jpg";
import destinoLosAngeles from "../images/destino-los-angeles.jpg";
import destinoRoma from "../images/destino-roma.jpg";
import destinoTokio from "../images/destino-tokio.jpg";

function Destinos() {
  const navigate = useNavigate();
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);

  /*Información estática de los destinos.*/
  const destinosNacionales = [
    {
      id: 1,
      nombre: "Cancún",
      ubicacion: "Quintana Roo, México",
      descripcion:
        "Disfruta de playas de aguas turquesas, paisajes increíbles y experiencias inolvidables.",
      experiencia:
        "Es una excelente opción para quienes buscan playas, descanso, actividades acuáticas, entretenimiento y recorridos por paisajes naturales.",
      recomendacion:
        "Ideal para viajes de descanso, vacaciones familiares, escapadas románticas y actividades de playa.",
      imagen: destinoCancun
    },

    {
      id: 2,
      nombre: "Monterrey",
      ubicacion: "Nuevo León, México",
      descripcion:
        "Descubre una ciudad rodeada de montañas, naturaleza, gastronomía y experiencias urbanas.",
      experiencia:
        "Combina actividades urbanas con espacios naturales, recorridos por montañas, gastronomía y diferentes opciones de entretenimiento.",
      recomendacion:
        "Ideal para quienes disfrutan de las grandes ciudades, la naturaleza, la aventura y la gastronomía.",
      imagen: destinoMonterrey
    },

    {
      id: 3,
      nombre: "Ciudad de México",
      ubicacion: "Ciudad de México, México",
      descripcion:
        "Conoce una de las ciudades más grandes del mundo, llena de historia, cultura y gastronomía.",
      experiencia:
        "Ofrece una gran variedad de museos, sitios históricos, restaurantes, espacios culturales y lugares representativos.",
      recomendacion:
        "Ideal para viajes culturales, gastronómicos, familiares y para conocer la historia de México.",
      imagen: destinoCiudadMexico
    },

    {
      id: 4,
      nombre: "Ciudad Juárez",
      ubicacion: "Chihuahua, México",
      descripcion:
        "Explora la frontera norte de México y descubre su cultura, gastronomía y atractivos locales.",
      experiencia:
        "Permite conocer la cultura fronteriza, disfrutar de su gastronomía y visitar diferentes espacios culturales y recreativos.",
      recomendacion:
        "Ideal para quienes desean conocer la región fronteriza y descubrir sus atractivos locales.",
      imagen: destinoCiudadJuarez
    },

    {
      id: 5,
      nombre: "Guadalajara",
      ubicacion: "Jalisco, México",
      descripcion:
        "Vive la cultura de Jalisco, conoce su arquitectura y disfruta de su reconocida gastronomía.",
      experiencia:
        "Ofrece recorridos culturales, arquitectura histórica, gastronomía tradicional y diferentes actividades para conocer la identidad de Jalisco.",
      recomendacion:
        "Ideal para viajes culturales, gastronómicos y para conocer las tradiciones de México.",
      imagen: destinoGuadalajara
    },

    {
      id: 6,
      nombre: "Puerto Vallarta",
      ubicacion: "Jalisco, México",
      descripcion:
        "Disfruta de playas, paisajes naturales, gastronomía y una gran variedad de actividades en uno de los destinos turísticos más reconocidos de México.",
      experiencia:
        "Combina playas, actividades acuáticas, paisajes naturales, gastronomía y recorridos por diferentes zonas turísticas.",
      recomendacion:
        "Ideal para vacaciones de playa, viajes en pareja, familias y actividades al aire libre.",
      imagen: destinoPuertoVallarta
    }
  ];

  const destinosInternacionales = [
    {
      id: 7,
      nombre: "Madrid",
      ubicacion: "España",
      descripcion:
        "Descubre la historia, arquitectura, cultura y gastronomía de la capital española.",
      experiencia:
        "Permite recorrer lugares históricos, plazas, museos y espacios culturales, además de disfrutar de la gastronomía española.",
      recomendacion:
        "Ideal para viajes culturales, gastronómicos y para conocer la historia y arquitectura de España.",
      imagen: destinoMadrid
    },

    {
      id: 8,
      nombre: "París",
      ubicacion: "Francia",
      descripcion:
        "Recorre sus calles, monumentos y lugares emblemáticos en una experiencia inolvidable.",
      experiencia:
        "Ofrece recorridos por monumentos históricos, museos, calles emblemáticas y diferentes espacios culturales y gastronómicos.",
      recomendacion:
        "Ideal para viajes culturales, románticos, gastronómicos y para conocer algunos de los lugares más representativos de Francia.",
      imagen: destinoParis
    },

    {
      id: 9,
      nombre: "Nueva York",
      ubicacion: "Estados Unidos",
      descripcion:
        "Conoce una de las ciudades más famosas del mundo y disfruta de su impresionante ambiente urbano.",
      experiencia:
        "Permite conocer grandes avenidas, edificios emblemáticos, parques, zonas comerciales y diferentes espacios culturales.",
      recomendacion:
        "Ideal para quienes disfrutan de las grandes ciudades, las compras, la cultura y el entretenimiento.",
      imagen: destinoNuevaYork
    },

    {
      id: 10,
      nombre: "Los Ángeles",
      ubicacion: "California, Estados Unidos",
      descripcion:
        "Descubre sus playas, zonas urbanas y algunos de los lugares más representativos de California.",
      experiencia:
        "Combina playas, entretenimiento, recorridos urbanos y diferentes lugares relacionados con la industria cinematográfica.",
      recomendacion:
        "Ideal para viajes de entretenimiento, playa, recorridos urbanos y para conocer algunos lugares famosos de California.",
      imagen: destinoLosAngeles
    },

    {
      id: 11,
      nombre: "Roma",
      ubicacion: "Italia",
      descripcion:
        "Viaja al pasado y descubre monumentos, plazas y lugares históricos de la capital italiana.",
      experiencia:
        "Permite conocer monumentos históricos, arquitectura, plazas, museos y una amplia variedad de lugares relacionados con la historia de Roma.",
      recomendacion:
        "Ideal para viajes culturales, históricos, gastronómicos y para conocer el patrimonio de Italia.",
      imagen: destinoRoma
    },

    {
      id: 12,
      nombre: "Tokio",
      ubicacion: "Japón",
      descripcion:
        "Experimenta la combinación entre tradición, tecnología, cultura y modernidad de Japón.",
      experiencia:
        "Ofrece una combinación de zonas modernas, templos tradicionales, gastronomía, tecnología y diferentes experiencias culturales.",
      recomendacion:
        "Ideal para quienes buscan conocer una cultura diferente, disfrutar de la tecnología, la gastronomía y los grandes espacios urbanos.",
      imagen: destinoTokio
    }
  ];



  return (
    <>

      <Navbar />

      <main>

        {/*HERO*/}

        <section className="destinosHero">

          <div className="destinosHeroImagen">

            <img
              src={destinosHero}
              alt="Avión viajando hacia un destino"
            />

          </div>


          <div className="destinosHeroContenido">

            <span>
              DESCUBRE EL MUNDO
            </span>

            <h1>
              Encuentra tu próximo destino
            </h1>

            <p>
              Explora lugares increíbles, conoce nuevas culturas
              y descubre experiencias que harán de tu próximo
              viaje un recuerdo inolvidable.
            </p>

          </div>

        </section>


        {/*DESTINOS NACIONALES*/}

        <section className="destinosSeccion">

          <div className="seccionTituloDestinos">

            <span>
              VIAJA POR MÉXICO
            </span>

            <h2>
              Destinos nacionales
            </h2>

            <p>
              Descubre algunos de los lugares más interesantes
              que puedes visitar dentro de México.
            </p>

          </div>


          <div className="destinosGrid">

            {destinosNacionales.map((destino) => (

              <article
                className="destinoCard"
                key={destino.id}
              >

                <div className="destinoImagen">

                  <img
                    src={destino.imagen}
                    alt={`Destino ${destino.nombre}`}
                  />

                  <span>
                    Nacional
                  </span>

                </div>


                <div className="destinoContenido">

                  <small>
                    {destino.ubicacion}
                  </small>

                  <h3>
                    {destino.nombre}
                  </h3>

                  <p>
                    {destino.descripcion}
                  </p>

                  <button
                    onClick={() => setDestinoSeleccionado(destino)}
                  >
                    Conocer destino
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/*DESTINOS INTERNACIONALES*/}

        <section className="destinosSeccion destinosInternacionales">

          <div className="seccionTituloDestinos">

            <span>
              EXPLORA EL MUNDO
            </span>

            <h2>
              Destinos internacionales
            </h2>

            <p>
              Conoce algunas de las ciudades más representativas
              que puedes descubrir en tus próximos viajes.
            </p>

          </div>


          <div className="destinosGrid">

            {destinosInternacionales.map((destino) => (

              <article
                className="destinoCard"
                key={destino.id}
              >

                <div className="destinoImagen">

                  <img
                    src={destino.imagen}
                    alt={`Destino ${destino.nombre}`}
                  />

                  <span>
                    Internacional
                  </span>

                </div>


                <div className="destinoContenido">

                  <small>
                    {destino.ubicacion}
                  </small>

                  <h3>
                    {destino.nombre}
                  </h3>

                  <p>
                    {destino.descripcion}
                  </p>

                  <button
                    onClick={() => setDestinoSeleccionado(destino)}
                  >
                    Conocer destino
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/*TIPOS DE VIAJE*/}

        <section className="tiposViaje">

          <div className="seccionTituloDestinos">

            <span>
              ENCUENTRA TU EXPERIENCIA
            </span>

            <h2>
              ¿Qué tipo de viaje buscas?
            </h2>

            <p>
              Cada viaje es diferente. Encuentra el destino
              que mejor se adapte a lo que estás buscando.
            </p>

          </div>


          <div className="tiposViajeGrid">

            <div className="tipoViaje">

              <h3>
                Playa y descanso
              </h3>

              <p>
                Disfruta del sol, el mar y momentos de
                relajación en destinos llenos de paisajes
                increíbles.
              </p>

            </div>


            <div className="tipoViaje">

              <h3>
                Cultura e historia
              </h3>

              <p>
                Descubre ciudades llenas de historia,
                arquitectura, tradiciones y lugares
                representativos.
              </p>

            </div>


            <div className="tipoViaje">

              <h3>
                Grandes ciudades
              </h3>

              <p>
                Explora destinos modernos, disfruta de
                nuevas experiencias y conoce diferentes
                estilos de vida.
              </p>

            </div>


            <div className="tipoViaje">

              <h3>
                Aventura
              </h3>

              <p>
                Encuentra nuevos lugares y vive experiencias
                diferentes en cada uno de tus viajes.
              </p>

            </div>

          </div>

        </section>


        {/*LLAMADA FINAL*/}

        <section className="llamadaFinalDestinos">

          <div>

            <span>
              TU PRÓXIMA AVENTURA
            </span>

            <h2>
              El mundo está esperando por ti
            </h2>

            <p>
              Explora nuestros destinos y comienza a imaginar
              tu próximo viaje con AeroClima.
            </p>

            <button onClick={() => navigate("/vuelos")}>
              Explorar vuelos
            </button>

          </div>

        </section>

        {destinoSeleccionado && (

          <div
            className="modalDestinoOverlay"
            onClick={() => setDestinoSeleccionado(null)}
          >

            <div
              className="modalDestino"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="cerrarModalDestino"
                onClick={() => setDestinoSeleccionado(null)}
              >
                ×
              </button>

              <img
                src={destinoSeleccionado.imagen}
                alt={`Destino ${destinoSeleccionado.nombre}`}
                className="modalDestinoImagen"
              />

              <div className="modalDestinoContenido">
                <span className="modalDestinoCategoria">
                  DESTINO{" "}
                  {destinoSeleccionado.ubicacion.includes("México")
                    ? "NACIONAL"
                    : "INTERNACIONAL"}
                </span>

                <h2>
                  {destinoSeleccionado.nombre}
                </h2>

                <p className="modalDestinoUbicacion">
                  {destinoSeleccionado.ubicacion}
                </p>

                <p>
                  {destinoSeleccionado.descripcion}
                </p>


                <h3>
                  Experiencia
                </h3>

                <p>
                  {destinoSeleccionado.experiencia}
                </p>


                <h3>
                  Recomendación
                </h3>

                <p>
                  {destinoSeleccionado.recomendacion}
                </p>


                <div className="modalDestinoInfo">

                  <div>
                    <strong>
                      Tipo de destino
                    </strong>

                    <span>
                      {destinoSeleccionado.ubicacion.includes("México")
                        ? "Nacional"
                        : "Internacional"}
                    </span>
                  </div>


                  <div>
                    <strong>
                      Experiencia
                    </strong>

                    <span>
                      Turismo y viajes
                    </span>
                  </div>


                  <div>
                    <strong>
                      Ubicación
                    </strong>

                    <span>
                      {destinoSeleccionado.ubicacion}
                    </span>
                  </div>

                </div>


                <button
                  className="btnCerrarDestino"
                  onClick={() => setDestinoSeleccionado(null)}
                >
                  Cerrar
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

      <Footer />

    </>
  );
}

export default Destinos;