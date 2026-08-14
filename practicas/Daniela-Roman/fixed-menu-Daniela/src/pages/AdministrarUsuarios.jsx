import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { consultarUsuarios, cambiarRol } from "../logic/api";
import { obtenerUsuario } from "../logic/auth";
import "../styles/administrarUsuarios.css";

function AdministrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  const usuario = obtenerUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      setCargando(true);
      const respuesta = await consultarUsuarios();

      if (respuesta.status !== 200) {
        setError(respuesta.datos.mensaje || "No fue posible consultar los usuarios.");
        return;
      }

      setUsuarios(respuesta.datos);
    } catch (error) {
      console.error(error);
      setError("No fue posible conectarse con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  const handleCambiarRol = async (id, rol) => {
    try {
      const respuesta = await cambiarRol(id, rol);

      if (respuesta.status !== 200) {
        setError(respuesta.datos.mensaje || "No fue posible cambiar el rol.");
        return;
      }

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((u) =>
          u._id === id ? { ...u, rol: respuesta.datos.usuario.rol } : u
        )
      );

      setMensajeModal(respuesta.datos.mensaje || "Rol actualizado correctamente.");
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
      setError("No fue posible conectarse con el servidor.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="administrarUsuarios">
        <section className="adminUsuariosHero">
          <span>ADMINISTRACIÓN</span>
          <h1>Personas del viaje</h1>
          <p>Consulta quién se ha registrado al itinerario y administra permisos.</p>
        </section>

        <section className="usuariosSeccion">
          <div className="usuariosTitulo">
            <h2>Cuentas registradas</h2>
            <p>Selecciona un nuevo rol y presiona "Cambiar rol" para actualizar los permisos.</p>
          </div>

          {cargando && <p className="mensajeUsuarios">Cargando usuarios...</p>}
          {error && <p className="errorUsuarios">{error}</p>}

          {!cargando && !error && usuarios.length === 0 && (
            <p className="mensajeUsuarios">No hay usuarios registrados.</p>
          )}

          {!cargando && !error && usuarios.length > 0 && (
            <div className="tablaUsuarios">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.rol}
                          onChange={(e) => {
                            const nuevoRol = e.target.value;
                            setUsuarios((actuales) =>
                              actuales.map((a) => (a._id === u._id ? { ...a, rol: nuevoRol } : a))
                            );
                          }}
                        >
                          <option value="viajero">Viajero</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </td>
                      <td>
                        <button className="btnCambiarRol" onClick={() => handleCambiarRol(u._id, u.rol)}>
                          Cambiar rol
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {mostrarModal && (
        <div className="modalAdminOverlay">
          <div className="modalAdmin">
            <button className="cerrarModalAdmin" onClick={() => setMostrarModal(false)}>×</button>
            <div className="modalAdminIcono">✓</div>
            <h2>Rol actualizado</h2>
            <p>{mensajeModal}</p>
            <button className="btnModalAdmin" onClick={() => setMostrarModal(false)}>Aceptar</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AdministrarUsuarios;
