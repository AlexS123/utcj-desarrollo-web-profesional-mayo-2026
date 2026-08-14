import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { validarFormulario } from "../logic/registroValidation";
import { guardarUsuario } from "../logic/auth";
import "../styles/registro.css";

const API_URL = "http://localhost:5000/registrar";

function Registro() {
  const navigate = useNavigate();

  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setMensajeError("");

    const validacion = validarFormulario(form);
    if (Object.keys(validacion).length > 0) {
      setErrores(validacion);
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        guardarUsuario(datos.usuario);
        setMensajeExito(datos.mensaje || "¡Cuenta creada correctamente!");
        setTimeout(() => {
          setMensajeExito("");
          navigate("/");
        }, 1500);
      } else if (datos.errores) {
        setErrores(datos.errores);
      } else {
        setMensajeError(datos.mensaje || "No fue posible crear la cuenta.");
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
          <h1>Únete al viaje</h1>
          <p>Crea tu cuenta para ver y editar el itinerario de CDMX</p>

          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <FaUser />
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            {errores.nombre && <span className="errorText">{errores.nombre}</span>}

            <div className="inputGroup">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            {errores.email && <span className="errorText">{errores.email}</span>}

            <div className="inputGroup">
              <FaLock />
              <input
                type={mostrarPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              {mostrarPassword ? (
                <FaEyeSlash className="iconoPassword" onClick={() => setMostrarPassword(false)} />
              ) : (
                <FaEye className="iconoPassword" onClick={() => setMostrarPassword(true)} />
              )}
            </div>
            {errores.password && <span className="errorText">{errores.password}</span>}

            <button type="submit" disabled={cargando}>
              {cargando ? "Creando cuenta..." : "Registrarme"}
            </button>
          </form>

          <p className="registroLink">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Registro;
