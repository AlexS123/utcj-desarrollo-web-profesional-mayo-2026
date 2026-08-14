import "./Contacto.css"

import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send
} from "lucide-react"

import {
    FaInstagram,
    FaFacebook,
    FaWhatsapp
} from "react-icons/fa"

import { FaXTwitter } from "react-icons/fa6"

function Contacto() {
    return (
        <main className="pagina-contacto">

            <section className="hero-contacto">

                <div className="contacto-contenido">

                    <span className="etiqueta-contacto">
                        ESTAMOS PARA TI
                    </span>

                    <h1>
                        ¿Tienes alguna
                        <span> pregunta?</span>
                    </h1>

                    <p>
                        Si necesitas información sobre nuestros productos,
                        tienes alguna duda o simplemente quieres ponerte
                        en contacto con nosotros, estamos aquí para ayudarte.
                    </p>

                </div>

            </section>

            <section className="contacto-seccion">

                <div className="contacto-informacion">

                    <span className="contacto-subtitulo">
                        CONTÁCTANOS
                    </span>

                    <h2>
                        Hablemos
                    </h2>

                    <p>
                        Puedes comunicarte con nosotros mediante cualquiera
                        de nuestros medios de contacto.
                    </p>

                    <div className="datos-contacto">

                        <div className="dato-contacto">

                            <div className="dato-icono">
                                <Mail size={21}/>
                            </div>

                            <div>
                                <span>
                                    Correo electrónico
                                </span>

                                <strong>
                                    contacto@celux.com
                                </strong>
                            </div>

                        </div>

                        <div className="dato-contacto">

                            <div className="dato-icono">
                                <Phone size={21}/>
                            </div>

                            <div>
                                <span>
                                    Teléfono
                                </span>

                                <strong>
                                    +52 656 123 4567
                                </strong>
                            </div>

                        </div>

                        <div className="dato-contacto">

                            <div className="dato-icono">
                                <MapPin size={21}/>
                            </div>

                            <div>
                                <span>
                                    Ubicación
                                </span>

                                <strong>
                                    Ciudad Juárez, Chihuahua
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="redes-contacto">

                    <div className="redes-icono-principal">
                        <MessageCircle size={35}/>
                    </div>

                    <span className="contacto-subtitulo">
                        SÍGUENOS
                    </span>

                    <h2>
                        Estamos en redes
                    </h2>

                    <p>
                        Síguenos para conocer nuestras novedades, promociones
                        y nuevos productos.
                    </p>

                    <div className="redes-grid">

                        <a
                            href="#"
                            className="red-social instagram"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={24}/>
                            <span>
                                Instagram
                            </span>
                        </a>

                        <a
                            href="#"
                            className="red-social facebook"
                            aria-label="Facebook"
                        >
                            <FaFacebook size={24}/>
                            <span>
                                Facebook
                            </span>
                        </a>

                        <a
                            href="#"
                            className="red-social twitter"
                            aria-label="X"
                        >
                            <FaXTwitter size={24}/>
                            <span>
                                X
                            </span>
                        </a>

                        <a
                            href="#"
                            className="red-social whatsapp"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp size={24}/>
                            <span>
                                WhatsApp
                            </span>
                        </a>

                    </div>

                </div>

            </section>

            <section className="contacto-mensaje">

                <Send size={28}/>

                <div>

                    <h2>
                        Tu opinión nos importa
                    </h2>

                    <p>
                        Queremos seguir mejorando para ofrecerte la mejor
                        experiencia al comprar tecnología.
                    </p>

                </div>

            </section>

            <footer className="footer-catalogo">

                <div className="footer-logo-catalogo">
                    CELUX
                </div>

                <p>
                    La tecnología que necesitas, en un solo lugar.
                </p>

                <span>
                    © 2026 CELUX. Todos los derechos reservados.
                </span>

            </footer>

        </main>
    )
}

export default Contacto