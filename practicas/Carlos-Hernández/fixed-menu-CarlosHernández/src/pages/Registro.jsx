import Navbar from "../components/Navbar";
import { useState } from "react";
import { validarFormulario } from "../logic/registroValidation";
import "../styles/registro.css";
import {
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaVenusMars
} from "react-icons/fa";

function Registro() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    email: "",
    telefono: "",
    password: "",
    genero: "",
    terminos: false
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validacion = validarFormulario(form);
    setErrores(validacion);

    if (Object.keys(validacion).length === 0) {
      setMensajeExito("¡Cuenta creada correctamente! Bienvenido a AeroClima.");
      setTimeout(() => {
        setMensajeExito("");
      }, 3000);
      setForm({
        nombre: "",
        edad: "",
        email: "",
        telefono: "",
        password: "",
        genero: "",
        terminos: false
      });
    }
  };

  return (
    <>
      <Navbar />
      {mensajeExito && (
        <div className="toastExito">
            {mensajeExito}
        </div>
      )}
      <div className="registroContainer">

        <div className="registroCard">

          <h1>Registro de pasajero</h1>
          <p>Completa con tus datos para crear tu cuenta</p>

          <form onSubmit={handleSubmit}>

            {/* NOMBRE */}
            <div className="inputGroup">
              <FaUser />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            {errores.nombre && <span className="errorText">{errores.nombre}</span>}

            {/* EDAD */}
            <div className="inputGroup">
              <FaCalendarAlt />
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                value={form.edad}
                onChange={handleChange}
                required
              />
            </div>
            {errores.edad && <span className="errorText">{errores.edad}</span>}

            {/* EMAIL */}
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

            {/* PASSWORD */}
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
            {errores.password && <span className="errorText">{errores.password}</span>}

            {/* TELÉFONO */}
            <div className="inputGroup">
              <FaPhone />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>
            {errores.telefono && <span className="errorText">{errores.telefono}</span>}

            {/* SELECT */}
            <div className="inputGroup">
              <FaVenusMars />

              <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            {errores.genero && (<span className="errorText">{errores.genero}</span>

            )}
            {/* CHECKBOX */}
            <label>
              <input
                type="checkbox"
                name="terminos"
                checked={form.terminos}
                onChange={handleChange}
                required
              />
              Acepto términos y condiciones
            </label>

            {errores.terminos && <span className="errorText">{errores.terminos}</span>}

            <button type="submit">Registrarme</button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Registro;