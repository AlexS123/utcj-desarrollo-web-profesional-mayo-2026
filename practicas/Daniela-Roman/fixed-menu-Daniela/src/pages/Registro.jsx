import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield
} from "react-icons/fa";
import "../styles/registro.css";

const API_URL = "http://localhost:5000/registrarUsuario";

function Registro() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [form, setForm] = useState({
    user: "",
    pass: "",
    rol: ""
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.user.trim()) nuevosErrores.user = "El usuario es requerido";
    if (form.pass.length < 6) nuevosErrores.pass = "La contraseña debe tener al menos 6 caracteres";
    if (!form.rol) nuevosErrores.rol = "Selecciona un rol";
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setMensajeError("");

    const validacion = validar();
    if (Object.keys(validacion).length > 0) {
      setErrores(validacion);
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const datos = await respuesta.json();

      if (datos.ok) {
        setMensajeExito(datos.msg);
        setForm({ user: "", pass: "", rol: "" });
        setTimeout(() => setMensajeExito(""), 4000);
      } else {
        setMensajeError(datos.msg);
        setTimeout(() => setMensajeError(""), 4000);
      }
    } catch (error) {
      setMensajeError("No se pudo conectar con el servidor. ¿Está corriendo?");
      setTimeout(() => setMensajeError(""), 4000);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar />

      {mensajeExito && <div className="toastExito">{mensajeExito}</div>}
      {mensajeError && <div className="toastError">{mensajeError}</div>}

      <div className="registroContainer">
        <div className="registroCard">

          <h1>Crear cuenta</h1>
          <p>Completa los datos para registrarte</p>

          <form onSubmit={handleSubmit}>

            {/* USUARIO */}
            <div className="inputGroup">
              <FaUser />
              <input
                type="text"
                name="user"
                placeholder="Nombre de usuario"
                value={form.user}
                onChange={handleChange}
                required
              />
            </div>
            {errores.user && <span className="errorText">{errores.user}</span>}

            {/* CONTRASEÑA */}
            <div className="inputGroup">
              <FaLock />
              <input
                type={mostrarPassword ? "text" : "password"}
                name="pass"
                placeholder="Contraseña"
                value={form.pass}
                onChange={handleChange}
                required
              />
              {mostrarPassword ? (
                <FaEyeSlash
                  className="iconoPassword"
                  onClick={() => setMostrarPassword(false)}
                />
              ) : (
                <FaEye
                  className="iconoPassword"
                  onClick={() => setMostrarPassword(true)}
                />
              )}
            </div>
            {errores.pass && <span className="errorText">{errores.pass}</span>}

            {/* ROL */}
            <div className="inputGroup">
              <FaUserShield />
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            {errores.rol && <span className="errorText">{errores.rol}</span>}

            <button type="submit" disabled={cargando}>
              {cargando ? "Registrando..." : "Registrarme"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default Registro;
