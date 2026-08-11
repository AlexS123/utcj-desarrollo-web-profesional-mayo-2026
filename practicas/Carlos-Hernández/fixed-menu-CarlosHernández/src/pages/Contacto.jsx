import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contacto.css";

import contactoHero from "../images/contacto-hero.jpg";

import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaYoutube
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { validarFormularioContacto } from "../logic/contactoValidation";

function Contacto() {

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

    const [errores, setErrores] = useState({});

    const [mostrarModal, setMostrarModal] = useState(false);


    const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
        ...form,
        [name]: value
    });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        const validacion =
            validarFormularioContacto(form);

        setErrores(validacion);


        if (Object.keys(validacion).length > 0) {
            return;
        }


        // Simulación de envío
        console.log("Mensaje enviado:", form);

        // Mostrar modal de confirmación
        setMostrarModal(true);

        // Limpiar formulario
        setForm({
            nombre: "",
            email: "",
            asunto: "",
            mensaje: ""
        });

    };

  return (
    <>

      <Navbar />

      <main>

        {/*HERO*/}

        <section className="contactoHero">

          <div className="contactoHeroImagen">

            <img
              src={contactoHero}
              alt="Atención al cliente de una agencia de viajes"
            />

          </div>

          <div className="contactoHeroContenido">

            <span>
              ESTAMOS PARA AYUDARTE
            </span>

            <h1>
              Ponte en contacto con AeroClima
            </h1>

            <p>
              ¿Tienes alguna pregunta sobre vuelos, destinos
              u ofertas? Nuestro objetivo es ayudarte a encontrar
              la información que necesitas para planear tu próximo
              viaje.
            </p>

          </div>

        </section>


        {/*INFORMACIÓN DE CONTACTO*/}

        <section className="contactoInformacion">

          <div className="seccionTitulo">

            <span>
              INFORMACIÓN DE CONTACTO
            </span>

            <h2>
              Estamos cerca de ti
            </h2>

            <p>
              Puedes comunicarte con AeroClima mediante
              cualquiera de nuestros medios de contacto.
            </p>

          </div>


          <div className="contactoGrid">

            {/* WHATSAPP */}

            <a
              href="https://wa.me/526560000000"
              target="_blank"
              rel="noopener noreferrer"
              className="contactoCard"
            >

              <div className="contactoIcono">
                <FaWhatsapp />
              </div>

              <h3>
                WhatsApp
              </h3>

              <p>
                Atención rápida y directa
              </p>

              <strong>
                (656) 4925678
              </strong>

            </a>


            {/* CORREO */}

            <a
              href="mailto:contacto@aeroclima.com"
              className="contactoCard"
            >

              <div className="contactoIcono">
                <FaEnvelope />
              </div>

              <h3>
                Correo electrónico
              </h3>

              <p>
                Escríbenos tus preguntas
              </p>

              <strong>
                contacto@aeroclima.com
              </strong>

            </a>


            {/* TELÉFONO */}

            <a
              href="tel:+526560000000"
              className="contactoCard"
            >

              <div className="contactoIcono">
                <FaPhoneAlt />
              </div>

              <h3>
                Teléfono
              </h3>

              <p>
                Atención personalizada
              </p>

              <strong>
                (656) 4925678
              </strong>

            </a>


            {/* UBICACIÓN */}

            <div className="contactoCard">

              <div className="contactoIcono">
                <FaMapMarkerAlt />
              </div>

              <h3>
                Ubicación
              </h3>

              <p>
                Nuestra ubicación
              </p>

              <strong>
                Ciudad Juárez, Chihuahua
              </strong>

            </div>

          </div>

        </section>

        {/*REDES SOCIALES*/}

        <section className="redesSociales">

          <div className="seccionTitulo">

            <span>
              CONECTA CON NOSOTROS
            </span>

            <h2>
              Síguenos en redes sociales
            </h2>

            <p>
              Mantente informado sobre nuevos destinos,
              promociones y novedades de AeroClima.
            </p>

          </div>


          <div className="redesGrid">

            <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="redSocial facebook"
                >
                <div className="redSocialIcono">
                    <FaFacebookF />
                </div>

                <strong>Facebook</strong>

                <span>
                    Visita nuestra página
                </span>
            </a>


            <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="redSocial instagram"
                >
                <div className="redSocialIcono">
                    <FaInstagram />
                </div>

                <strong>Instagram</strong>

                <span>
                    Conoce nuestras publicaciones
                </span>
            </a>


            <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="redSocial tiktok"
                >
                <div className="redSocialIcono">
                    <FaTiktok />
                </div>

                <strong>TikTok</strong>

                <span>
                    Descubre nuestro contenido
                </span>
            </a>

            <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="redSocial xSocial"
                >
                <div className="redSocialIcono">
                    <FaXTwitter />
                </div>

                <strong>Twitter</strong>

                <span>
                    Noticias y novedades
                </span>
            </a>

            <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="redSocial youtube"
                >
                <FaYoutube className="redSocialIcono" />

                <strong>
                    YouTube
                </strong>

                <span>
                    Descubre nuestros videos
                </span>
            </a>

          </div>

        </section>

        {/*FORMULARIO DE CONTACTO*/}

        <section className="formularioContacto">

        <div className="seccionTitulo">

            <span>
            CONTÁCTANOS
            </span>

            <h2>
            ¿Tienes alguna pregunta?
            </h2>

            <p>
            Envíanos un mensaje y estaremos encantados
            de ayudarte con cualquier duda sobre tus viajes.
            </p>

        </div>

        <form
            className="formContacto"
            onSubmit={handleSubmit}
        >

            {/* NOMBRE */}

            <div className="campoContacto">

            <label>
                Nombre completo
            </label>

            <div className="inputContacto">

                <FaUser />

                <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                />

            </div>

            {errores.nombre && (

                <span className="errorContacto">
                {errores.nombre}
                </span>

            )}

            </div>


            {/* CORREO */}

            <div className="campoContacto">

            <label>
                Correo electrónico
            </label>

            <div className="inputContacto">

                <FaEnvelope />

                <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
                required
                />

            </div>

            {errores.email && (

                <span className="errorContacto">
                {errores.email}
                </span>

            )}

            </div>


            {/* ASUNTO */}

            <div className="campoContacto">

            <label>
                Asunto
            </label>

            <div className="inputContacto">

                <FaTag />

                <input
                type="text"
                name="asunto"
                placeholder="¿Sobre qué deseas contactarnos?"
                value={form.asunto}
                onChange={handleChange}
                required
                />

            </div>

            {errores.asunto && (

                <span className="errorContacto">
                {errores.asunto}
                </span>

            )}

            </div>


            {/* MENSAJE */}

            <div className="campoContacto">

            <label>
                Mensaje
            </label>

            <div className="textareaContacto">

                <FaCommentAlt />

                <textarea
                name="mensaje"
                placeholder="Escribe tu mensaje..."
                value={form.mensaje}
                onChange={handleChange}
                rows="6"
                required
                />

            </div>

            {errores.mensaje && (

                <span className="errorContacto">
                {errores.mensaje}
                </span>

            )}

            </div>


            <button
            type="submit"
            className="btnEnviarContacto"
            >
            Enviar mensaje
            </button>

        </form>

        </section>
        
        {/*PREGUNTAS FRECUENTES*/}

        <section className="preguntasFrecuentes">

          <div className="seccionTitulo">

            <span>
              PREGUNTAS FRECUENTES
            </span>

            <h2>
              Antes de contactarnos
            </h2>

            <p>
              Algunas respuestas que pueden ayudarte.
            </p>

          </div>


          <div className="preguntasGrid">

            <div className="pregunta">

              <h3>
                ¿Los precios mostrados son reales?
              </h3>

              <p>
                Los precios utilizados en AeroClima son
                ilustrativos y forman parte de la demostración
                del proyecto.
              </p>

            </div>


            <div className="pregunta">

              <h3>
                ¿Puedo modificar una reserva?
              </h3>

              <p>
                Para este proyecto las reservas son únicamente
                representativas y no se realizan modificaciones
                reales.
              </p>

            </div>


            <div className="pregunta">

              <h3>
                ¿Qué documentos necesito para viajar?
              </h3>

              <p>
                Los requisitos dependen del destino. Se recomienda
                revisar la documentación necesaria antes de viajar.
              </p>

            </div>


            <div className="pregunta">

              <h3>
                ¿Con cuánto tiempo debo llegar al aeropuerto?
              </h3>

              <p>
                Se recomienda llegar con suficiente anticipación
                para realizar el proceso de documentación y abordar
                el vuelo sin inconvenientes.
              </p>

            </div>

          </div>

        </section>


        {/*LLAMADA FINAL*/}

        <section className="llamadaFinalContacto">

          <div>

            <span>
              AEROCLIMA
            </span>

            <h2>
              ¿Tienes alguna otra pregunta?
            </h2>

            <p>
              Estamos listos para ayudarte a planear
              tu próxima aventura.
            </p>

            <a
              href="mailto:contacto@aeroclima.com"
              className="btnContactoFinal"
            >
              Contactar con AeroClima
            </a>

          </div>

        </section>

      </main>


      {/*MODAL DE MENSAJE ENVIADO*/}

      {mostrarModal && (

        <div className="modalContactoOverlay">

          <div className="modalContacto">

            <button
              className="cerrarModalContacto"
              onClick={() => setMostrarModal(false)}
            >
              ×
            </button>

            <div className="modalContactoIcono">
              ✓
            </div>

            <h2>
              ¡Mensaje enviado!
            </h2>

            <p>
              Gracias por contactar con AeroClima.
              Hemos recibido tu mensaje correctamente
              y nos pondremos en contacto contigo próximamente.
            </p>

            <button
              className="btnModalContacto"
              onClick={() => setMostrarModal(false)}
            >
              Aceptar
            </button>

          </div>

        </div>

      )}

      <Footer />

    </>
  );
}

export default Contacto;