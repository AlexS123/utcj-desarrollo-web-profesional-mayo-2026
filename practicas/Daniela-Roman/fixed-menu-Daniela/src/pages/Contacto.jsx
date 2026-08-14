import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { validarFormularioContacto } from "../logic/contactoValidation";
import { enviarContacto } from "../logic/api";
import "../styles/contacto.css";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setMensajeError("");

    const validacion = validarFormularioContacto(form);
    if (Object.keys(validacion).length > 0) {
      setErrores(validacion);
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await enviarContacto(form);

      if (respuesta.status === 200 || respuesta.status === 201) {
        setMensajeExito("¡Gracias! Tu mensaje fue enviado al grupo.");
        setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
      } else {
        setMensajeError(respuesta.datos.mensaje || "No fue posible enviar el mensaje.");
      }
    } catch (error) {
      setMensajeError("No se pudo conectar con el servidor.");
    } finally {
      setEnviando(false);
      setTimeout(() => {
        setMensajeExito("");
        setMensajeError("");
      }, 4000);
    }
  };

  return (
    <>
      <Navbar />

      {mensajeExito && <div className="toastExito">{mensajeExito}</div>}
      {mensajeError && <div className="toastError">{mensajeError}</div>}

      <main className="contactoPagina">
        <section className="contactoHero">
          <span>CONTACTO</span>
          <h1>¿Se te ocurrió algo para el itinerario?</h1>
          <p>Manda tus ideas, cambios o pendientes para el viaje.</p>
        </section>

        <form className="contactoForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>
          {errores.nombre && <span className="errorText">{errores.nombre}</span>}

          <div className="inputGroup">
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errores.email && <span className="errorText">{errores.email}</span>}

          <div className="inputGroup">
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={form.asunto}
              onChange={handleChange}
            />
          </div>
          {errores.asunto && <span className="errorText">{errores.asunto}</span>}

          <div className="inputGroup">
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje"
              rows="5"
              value={form.mensaje}
              onChange={handleChange}
            />
          </div>
          {errores.mensaje && <span className="errorText">{errores.mensaje}</span>}

          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Contacto;
