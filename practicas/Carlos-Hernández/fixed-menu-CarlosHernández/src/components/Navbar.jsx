import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaBars
} from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem("usuario");

  const [usuario, setUsuario] = useState(
    usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  );

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarMensajeCierre, setMostrarMensajeCierre] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Confirmar cierre de sesión
  const confirmarCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setUsuario(null);
    setMostrarModal(false);

    navigate("/");

    setMostrarMensajeCierre(true);

    setTimeout(() => {
        setMostrarMensajeCierre(false);
    }, 3000);
  };

  return (
    <>

      <nav className="menuSuperior">

        <h2 className="logo">
          AeroClima
        </h2>


        {/* BOTÓN HAMBURGUESA */}

        <button
          className="btnMenuMovil"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>


        {/* MENÚ */}

        <div
          className={`opcionesMenu ${
            menuAbierto ? "menuAbierto" : ""
          }`}
        >

          <Link
            to="/"
            onClick={() => setMenuAbierto(false)}
          >
            <button>
              Inicio
            </button>
          </Link>


          <Link
            to="/vuelos"
            onClick={() => setMenuAbierto(false)}
          >
            <button>
              Vuelos
            </button>
          </Link>


          <Link
            to="/destinos"
            onClick={() => setMenuAbierto(false)}
          >
            <button>
              Destinos
            </button>
          </Link>


          <Link
            to="/ofertas"
            onClick={() => setMenuAbierto(false)}
          >
            <button>
              Ofertas
            </button>
          </Link>


          <Link
            to="/contacto"
            onClick={() => setMenuAbierto(false)}
          >
            <button>
              Contacto
            </button>
          </Link>


          {!usuario ? (

            <Link
              to="/login"
              onClick={() => setMenuAbierto(false)}
            >
              <button className="btnRegistro">
                Registrarse / Iniciar sesión
              </button>
            </Link>

          ) : (

            <div className="usuarioSesion">

              <span className="datosUsuario">

                <FaUser />

                <span>
                  {usuario.nombre}
                </span>

              </span>


              <button
                className="btnCerrarSesion"
                onClick={() => {
                  setMostrarModal(true);
                  setMenuAbierto(false);
                }}
                title="Cerrar sesión"
              >
                <FaSignOutAlt />
              </button>

            </div>

          )}

        </div>

      </nav>


      {/* MODAL CERRAR SESIÓN */}

      {mostrarModal && (

        <div className="modalOverlay">

          <div className="modalCerrarSesion">

            <button
              className="btnCerrarModal"
              onClick={() => setMostrarModal(false)}
            >
              <FaTimes />
            </button>


            <h2>
              ¿Cerrar sesión?
            </h2>


            <p>
              ¿Estás seguro de que deseas cerrar tu sesión?
            </p>


            <div className="botonesModal">

              <button
                className="btnCancelar"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>


              <button
                className="btnAceptar"
                onClick={confirmarCerrarSesion}
              >
                Aceptar
              </button>

            </div>

          </div>

        </div>

      )}


      {/* MODAL SESIÓN CERRADA */}

      {mostrarMensajeCierre && (

        <div className="modalOverlay">

          <div className="modalCerrarSesion">

            <button
              className="btnCerrarModal"
              onClick={() =>
                setMostrarMensajeCierre(false)
              }
            >
              <FaTimes />
            </button>


            <h2>
              Sesión cerrada
            </h2>


            <p>
              Sesión cerrada correctamente.
            </p>


            <div className="botonesModal">

              <button
                className="btnAceptar"
                onClick={() =>
                  setMostrarMensajeCierre(false)
                }
              >
                Aceptar
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;