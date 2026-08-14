import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerUsuario, cerrarSesion } from "../logic/auth";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(obtenerUsuario());

  useEffect(() => {
    setUsuario(obtenerUsuario());
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    cerrarSesion();
    setUsuario(null);
    navigate("/");
  };

  return (
    <nav className="menuSuperior">
      <Link to="/" className="logoLink">
        <h2 className="logo">🌵 CDMX 2026</h2>
      </Link>

      <div className="opcionesMenu">
        <Link to="/"><button>Inicio</button></Link>
        <Link to="/itinerario"><button>Itinerario</button></Link>
        <Link to="/lugares"><button>Lugares</button></Link>
        <Link to="/recomendaciones"><button>Recomendaciones</button></Link>
        <Link to="/contacto"><button>Contacto</button></Link>

        {usuario && usuario.rol === "admin" && (
          <Link to="/administrar-usuarios">
            <button>Admin</button>
          </Link>
        )}

        {usuario ? (
          <button className="btnRegistro" onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login">
            <button className="btnRegistro">Entrar</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
