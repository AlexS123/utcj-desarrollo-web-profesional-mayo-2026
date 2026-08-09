import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { guardarToken, obtenerUsuario } from "../logic/auth";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Login() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const decodificarToken = (token) => {
  const partePayload = token.split(".")[1];

  const payload = partePayload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  return JSON.parse(atob(payload));
  };


  const handleSubmit = async (e) => {

    setMensajeError(""); 
    setMensajeExito("");
    e.preventDefault();

    try {

      const respuesta = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {

        setMensajeError("Correo o contraseña incorrectos."); 
        setTimeout(() => {
            setMensajeError(""); 
        }, 3000);

        return;
      }

      console.log("Login exitoso:", datos);

      guardarToken(datos.token);

      const usuario = obtenerUsuario();

      console.log("Usuario:", usuario);

      localStorage.setItem("usuario", JSON.stringify(usuario));
      setMensajeExito("Sesión iniciada correctamente."); 
      setTimeout(() => {
        setMensajeExito("");
        navigate("/"); 
      }, 2000);

    } catch (error) {

      console.error("Error al iniciar sesión:", error);

      setMensajeError("No se pudo conectar con el servidor.");

      setTimeout(() => {
        setMensajeError("");
      }, 3000);

    }

  };

  return (
    <>
        {mensajeExito && (
        <div className="toastExito">
            {mensajeExito}
        </div>
        )}

        {mensajeError && (
        <div className="toastError">
            {mensajeError}
        </div>
        )}

      <Navbar />

      <div className="loginContainer">

        <div className="loginCard">

          <h1>Iniciar sesión</h1>

          <p>
            Ingresa tus datos para acceder a AeroClima
          </p>

          <form onSubmit={handleSubmit}>

            {/* CORREO */}
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

            {/* CONTRASEÑA */}
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

            <button type="submit">
              Iniciar sesión
            </button>

          </form>

          <p className="registroLink">

            ¿No tienes una cuenta?

            <Link to="/registro">
              Crea una
            </Link>

          </p>

        </div>

      </div>
      <Footer />
    </>
  );
}

export default Login;
