import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/vuelos.css";

import vuelosHero from "../images/vuelos-hero.jpg";
import vueloCancun from "../images/vuelo-cancun.jpg";
import vueloMonterrey from "../images/vuelo-monterrey.jpg";
import vueloMadrid from "../images/vuelo-madrid.jpg";
import vueloParis from "../images/vuelo-paris.jpg";
import vueloCiudadJuarez from "../images/vuelo-ciudad-juarez.jpg";
import vueloNuevaYork from "../images/vuelo-nueva-york.jpg";
import vueloLosAngeles from "../images/vuelo-los-angeles.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUsers
} from "react-icons/fa";

function Vuelos() {
  const navigate = useNavigate();

  /*
   * Información de vuelos estáticos.
   * No se utiliza ninguna API ni base de datos.
   */
  const vuelos = [
    {
        id: 1,
        origen: "Ciudad de México",
        destino: "Cancún",
        codigoOrigen: "CDMX",
        codigoDestino: "CUN",
        fecha: "15 de agosto de 2026",
        horario: "08:30 - 10:45",
        duracion: "2 h 15 min",
        tipo: "Vuelo directo",
        precio: 2499,
        imagen: vueloCancun,
        categoria: "Nacional"
    },

    {
        id: 2,
        origen: "Ciudad de México",
        destino: "Monterrey",
        codigoOrigen: "CDMX",
        codigoDestino: "MTY",
        fecha: "18 de agosto de 2026",
        horario: "10:15 - 11:55",
        duracion: "1 h 40 min",
        tipo: "Vuelo directo",
        precio: 1899,
        imagen: vueloMonterrey,
        categoria: "Nacional"
    },

    {
        id: 3,
        origen: "Ciudad de México",
        destino: "Madrid",
        codigoOrigen: "CDMX",
        codigoDestino: "MAD",
        fecha: "22 de agosto de 2026",
        horario: "19:30 - 13:20",
        duracion: "10 h 50 min",
        tipo: "Vuelo directo",
        precio: 12999,
        imagen: vueloMadrid,
        categoria: "Internacional"
    },

    {
        id: 4,
        origen: "Ciudad de México",
        destino: "París",
        codigoOrigen: "CDMX",
        codigoDestino: "CDG",
        fecha: "28 de agosto de 2026",
        horario: "21:00 - 15:10",
        duracion: "11 h 10 min",
        tipo: "Vuelo directo",
        precio: 14599,
        imagen: vueloParis,
        categoria: "Internacional"
    },

    {
        id: 5,
        origen: "Ciudad Juárez",
        destino: "Ciudad de México",
        codigoOrigen: "CJS",
        codigoDestino: "CDMX",
        fecha: "20 de agosto de 2026",
        horario: "07:15 - 10:05",
        duracion: "2 h 50 min",
        tipo: "Vuelo directo",
        precio: 2799,
        imagen: vueloCiudadJuarez,
        categoria: "Nacional"
    },

    {
        id: 6,
        origen: "Monterrey",
        destino: "Cancún",
        codigoOrigen: "MTY",
        codigoDestino: "CUN",
        fecha: "25 de agosto de 2026",
        horario: "12:20 - 15:05",
        duracion: "2 h 45 min",
        tipo: "Vuelo directo",
        precio: 2299,
        imagen: vueloCancun,
        categoria: "Nacional"
    },

    {
        id: 7,
        origen: "Guadalajara",
        destino: "Nueva York",
        codigoOrigen: "GDL",
        codigoDestino: "JFK",
        fecha: "30 de agosto de 2026",
        horario: "16:40 - 22:35",
        duracion: "4 h 55 min",
        tipo: "Vuelo directo",
        precio: 8999,
        imagen: vueloNuevaYork,
        categoria: "Internacional"
    },

    {
        id: 8,
        origen: "Tijuana",
        destino: "Los Ángeles",
        codigoOrigen: "TIJ",
        codigoDestino: "LAX",
        fecha: "2 de septiembre de 2026",
        horario: "09:10 - 10:25",
        duracion: "1 h 15 min",
        tipo: "Vuelo directo",
        precio: 3199,
        imagen: vueloLosAngeles,
        categoria: "Internacional"
    }
  ];

  /*
   * Estados del buscador
   */
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [pasajeros, setPasajeros] = useState(1);

  const [resultados, setResultados] = useState(vuelos);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);

  /*
   * Buscar vuelos
   */
  const buscarVuelos = (e) => {

    e.preventDefault();

    let resultadosFiltrados = vuelos;

    if (origen !== "") {

      resultadosFiltrados = resultadosFiltrados.filter(
        (vuelo) =>
          vuelo.codigoOrigen === origen
      );

    }

    if (destino !== "") {

      resultadosFiltrados = resultadosFiltrados.filter(
        (vuelo) =>
          vuelo.codigoDestino === destino
      );

    }

    setResultados(resultadosFiltrados);
    setBusquedaRealizada(true);
  };


  /*
   * Restablecer búsqueda
   */
  const limpiarBusqueda = () => {

    setOrigen("");
    setDestino("");
    setFecha("");
    setPasajeros(1);

    setResultados(vuelos);
    setBusquedaRealizada(false);
  };
  const abrirDetallesVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo);
  };

  const cerrarDetallesVuelo = () => {
      setVueloSeleccionado(null);
  };


  return (
    <>

      <Navbar />

      <main>

        {/* HERO */}

        <section className="vuelosHero">

          <div className="vuelosHeroImagen">
            <img
              src={vuelosHero}
              alt="Avión durante un vuelo"
            />
          </div>

          <div className="vuelosHeroContenido">

            <span>
              ENCUENTRA TU PRÓXIMO DESTINO
            </span>

            <h1>
              Encuentra tu próximo vuelo
            </h1>

            <p>
              Explora diferentes rutas y descubre opciones
              para comenzar a planear tu próxima aventura.
            </p>

          </div>

        </section>


        {/* BUSCADOR */}

        <section className="buscadorSeccion">

          <div className="seccionTitulo">

            <span>
              BUSCADOR DE VUELOS
            </span>

            <h2>
              ¿A dónde quieres viajar?
            </h2>

            <p>
              Selecciona tus preferencias para encontrar
              una opción de vuelo.
            </p>

          </div>


          <form
            className="buscador"
            onSubmit={buscarVuelos}
          >

            <div className="campoBusqueda">

                <label>
                    <FaPlaneDeparture />
                    Origen
                </label>

                <select
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                >

                    <option value="">
                    Cualquier origen
                    </option>

                    <option value="CDMX">
                    Ciudad de México (CDMX)
                    </option>

                    <option value="CJS">
                    Ciudad Juárez (CJS)
                    </option>

                    <option value="MTY">
                    Monterrey (MTY)
                    </option>

                    <option value="GDL">
                    Guadalajara (GDL)
                    </option>

                    <option value="TIJ">
                    Tijuana (TIJ)
                    </option>

                </select>

            </div>

            <div className="campoBusqueda">

                <label>
                    <FaPlaneArrival />
                    Destino
                </label>

                <select
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                >

                    <option value="">
                    Cualquier destino
                    </option>

                    <option value="CUN">
                    Cancún (CUN)
                    </option>

                    <option value="MTY">
                    Monterrey (MTY)
                    </option>

                    <option value="MAD">
                    Madrid (MAD)
                    </option>

                    <option value="CDG">
                    París (CDG)
                    </option>

                    <option value="CDMX">
                    Ciudad de México (CDMX)
                    </option>

                    <option value="JFK">
                    Nueva York (JFK)
                    </option>

                    <option value="LAX">
                    Los Ángeles (LAX)
                    </option>

                </select>

            </div>


            <div
                className="campoBusqueda campoFecha"
                onClick={(e) => {

                    const input = e.currentTarget.querySelector("input");

                    if (
                    input &&
                    e.target !== input &&
                    input.showPicker
                    ) {
                    input.showPicker();
                    }

                }}
                >

                <label>
                    <FaCalendarAlt />
                    Fecha de salida
                </label>

                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    onClick={(e) => {

                    if (e.target.showPicker) {
                        e.target.showPicker();
                    }

                    }}
                />

            </div>

            <div className="campoBusqueda">

                <label>
                    <FaUsers />
                    Pasajeros
                </label>

                <select
                    value={pasajeros}
                    onChange={(e) =>
                    setPasajeros(Number(e.target.value))
                    }
                >

                    <option value="1">
                    1 pasajero
                    </option>

                    <option value="2">
                    2 pasajeros
                    </option>

                    <option value="3">
                    3 pasajeros
                    </option>

                    <option value="4">
                    4 pasajeros
                    </option>

                    <option value="5">
                    5 pasajeros
                    </option>

                </select>

            </div>


            <div className="botonesBusqueda">

              <button
                type="submit"
                className="btnBuscar"
              >
                Buscar vuelos
              </button>

              {busquedaRealizada && (

                <button
                  type="button"
                  className="btnLimpiar"
                  onClick={limpiarBusqueda}
                >
                  Limpiar
                </button>

              )}

            </div>

          </form>

        </section>


        {/* RESULTADOS */}

        <section className="vuelosResultados">

          <div className="seccionTitulo">

            <span>
              OPCIONES DISPONIBLES
            </span>

            <h2>
              Vuelos destacados
            </h2>

            <p>
              Conoce algunas de las rutas disponibles
              para tu próximo viaje.
            </p>

          </div>


          {resultados.length > 0 ? (

            <div className="vuelosGrid">

              {resultados.map((vuelo) => (

                <article
                  className="vueloCard"
                  key={vuelo.id}
                >

                  <div className="vueloImagen">

                    <img
                      src={vuelo.imagen}
                      alt={`Destino ${vuelo.destino}`}
                    />

                    <span>
                      {vuelo.categoria}
                    </span>

                  </div>


                  <div className="vueloContenido">

                    <div className="ruta">

                      <div>

                        <strong>
                          {vuelo.codigoOrigen}
                        </strong>

                        <small>
                          {vuelo.origen}
                        </small>

                      </div>

                      <div className="flechaRuta">
                        →
                      </div>

                      <div>

                        <strong>
                          {vuelo.codigoDestino}
                        </strong>

                        <small>
                          {vuelo.destino}
                        </small>

                      </div>

                    </div>


                    <div className="informacionVuelo">

                      <p>
                        <strong>
                          Fecha:
                        </strong>{" "}
                        {vuelo.fecha}
                      </p>

                      <p>
                        <strong>
                          Horario:
                        </strong>{" "}
                        {vuelo.horario}
                      </p>

                      <p>
                        <strong>
                          Duración:
                        </strong>{" "}
                        {vuelo.duracion}
                      </p>

                      <p>
                        <strong>
                          Tipo:
                        </strong>{" "}
                        {vuelo.tipo}
                      </p>

                    </div>


                    <div className="precioVuelo">

                      <div>

                        <small>
                          Precio por pasajero
                        </small>

                        <strong>
                          ${vuelo.precio.toLocaleString("es-MX")} MXN
                        </strong>

                      </div>

                      <button
                        type="button"
                        onClick={() => abrirDetallesVuelo(vuelo)}
                      >
                        Conocer más
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="sinResultados">

              <h3>
                No encontramos vuelos
              </h3>

              <p>
                No existen vuelos disponibles para
                los criterios seleccionados.
              </p>

              <button
                onClick={limpiarBusqueda}
              >
                Ver todos los vuelos
              </button>

            </div>

          )}

        </section>


        {/* INFORMACIÓN */}

        <section className="informacionVuelos">

          <div className="seccionTitulo">

            <span>
              INFORMACIÓN IMPORTANTE
            </span>

            <h2>
              Antes de reservar tu vuelo
            </h2>

          </div>


          <div className="informacionGrid">

            <div className="informacionItem">

              <h3>
                Precios ilustrativos
              </h3>

              <p>
                Los precios mostrados en esta página son
                únicamente ejemplos para representar las
                opciones disponibles dentro de AeroClima.
              </p>

            </div>


            <div className="informacionItem">

              <h3>
                Horarios
              </h3>

              <p>
                Los horarios presentados son ilustrativos
                y pueden variar dependiendo de la ruta
                y disponibilidad.
              </p>

            </div>


            <div className="informacionItem">

              <h3>
                Preparación del viaje
              </h3>

              <p>
                Se recomienda revisar la documentación
                necesaria y llegar con suficiente
                anticipación al aeropuerto.
              </p>

            </div>

          </div>

        </section>


        {/* LLAMADA FINAL */}

        <section className="llamadaFinalVuelos">

          <div>

            <span>
              TU PRÓXIMA AVENTURA
            </span>

            <h2>
              ¿Ya encontraste tu próximo destino?
            </h2>

            <p>
              Explora nuestros destinos y descubre
              nuevos lugares para visitar.
            </p>

            <button
                onClick={() => navigate("/destinos")}
            >
                Explorar destinos
            </button>

          </div>

        </section>

      </main>

      {/* MODAL DETALLES DEL VUELO */}

      {vueloSeleccionado && (

          <div
              className="modalVueloOverlay"
              onClick={cerrarDetallesVuelo}
          >

              <div
                  className="modalVuelo"
                  onClick={(e) => e.stopPropagation()}
              >

                  <button
                      className="cerrarModalVuelo"
                      onClick={cerrarDetallesVuelo}
                      aria-label="Cerrar"
                  >
                      ×
                  </button>


                  <div className="modalVueloImagen">

                      <img
                          src={vueloSeleccionado.imagen}
                          alt={`Destino ${vueloSeleccionado.destino}`}
                      />

                      <span>
                          {vueloSeleccionado.categoria}
                      </span>

                  </div>


                  <div className="modalVueloContenido">

                      <span className="modalEtiqueta">
                          INFORMACIÓN DEL VUELO
                      </span>

                      <h2>
                          {vueloSeleccionado.origen}
                          {" → "}
                          {vueloSeleccionado.destino}
                      </h2>


                      <div className="modalRuta">

                          <div>

                              <strong>
                                  {vueloSeleccionado.codigoOrigen}
                              </strong>

                              <span>
                                  {vueloSeleccionado.origen}
                              </span>

                          </div>


                          <div className="modalFlecha">
                              →
                          </div>


                          <div>

                              <strong>
                                  {vueloSeleccionado.codigoDestino}
                              </strong>

                              <span>
                                  {vueloSeleccionado.destino}
                              </span>

                          </div>

                      </div>


                      <div className="detallesVueloGrid">

                          <div>
                              <small>Fecha de salida</small>
                              <strong>
                                  {vueloSeleccionado.fecha}
                              </strong>
                          </div>


                          <div>
                              <small>Horario</small>
                              <strong>
                                  {vueloSeleccionado.horario}
                              </strong>
                          </div>


                          <div>
                              <small>Duración</small>
                              <strong>
                                  {vueloSeleccionado.duracion}
                              </strong>
                          </div>


                          <div>
                              <small>Tipo de vuelo</small>
                              <strong>
                                  {vueloSeleccionado.tipo}
                              </strong>
                          </div>

                      </div>


                      <div className="modalPrecio">

                          <div>

                              <small>
                                  Precio por pasajero
                              </small>

                              <strong>
                                  ${vueloSeleccionado.precio.toLocaleString("es-MX")} MXN
                              </strong>

                          </div>

                      </div>


                      <p className="modalNota">
                          *La información y el precio mostrados son
                          ilustrativos y forman parte de la demostración
                          del proyecto AeroClima.
                      </p>


                      <button
                          className="btnCerrarDetalles"
                          onClick={cerrarDetallesVuelo}
                      >
                          Cerrar
                      </button>

                  </div>

              </div>

          </div>
      )}

      <Footer />

    </>
  );
}

export default Vuelos;