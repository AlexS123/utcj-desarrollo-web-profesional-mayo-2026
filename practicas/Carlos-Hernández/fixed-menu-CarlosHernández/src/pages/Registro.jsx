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
  const [mensajeServidor, setMensajeServidor] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    fechaNacimiento: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacion = validarFormulario(form);
    setErrores(validacion);

    if (Object.keys(validacion).length > 0) {
        return;
    }
    setMensajeServidor("");
    try {
      const respuesta = await fetch("http://127.0.0.1:5000/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        setErrores((prev) => ({
            ...prev,
            ...error.errores
        }));
        return;
      }

      const datos = await respuesta.json();

      console.log(datos);

      setMensajeExito("¡Cuenta creada correctamente! Bienvenido a AeroClima.");

      setTimeout(() => {
        setMensajeExito("");
      }, 3000);

      setForm({
        nombre: "",
        fechaNacimiento: "",
        email: "",
        telefono: "",
        password: "",
        genero: "",
        terminos: false
      });

    } catch (err) {
        console.log(err);
        alert("Ocurrió un error al registrar el usuario.");
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

            {/* FECHA DE NACIMIENTO */}
            <div className="inputGroup">
              <FaCalendarAlt />

              <input
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
                onFocus={(e) => {
                  if (e.target.showPicker) {
                    e.target.showPicker();
                  }
                }}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {errores.fechaNacimiento && (
              <span className="errorText">
                {errores.fechaNacimiento}
              </span>
            )}

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