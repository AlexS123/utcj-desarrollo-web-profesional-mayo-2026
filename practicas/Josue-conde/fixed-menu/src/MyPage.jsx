import './MyPage.css';
import { Link } from "react-router-dom";

function MyPage() {
    return (
        <>
            <nav className="fixed-nav">

                <div className="logo">
                    MiSitio
                </div>

                <ul className="nav-links">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>

                <div style={{display:"flex",gap:"10px"}}>

    <Link to="/login" className="nav-cta">

        Iniciar Sesión

    </Link>

    <Link to="/registro" className="nav-cta">

        Registrarse

    </Link>

</div>

            </nav>

            <main className="content">

                <section id="inicio" className="hero">

                    <h1>Bienvenido a MiSitio</h1>

                    <p>
                        Descubre nuestros productos y servicios de alta calidad.
                        Trabajamos para ofrecer soluciones innovadoras y una excelente
                        experiencia para todos nuestros clientes.
                    </p>

                </section>

                <section id="productos" className="section">

                    <h2>Nuestros Productos</h2>

                    <div className="cards">

                        <div className="card">

                            <h3>Producto Uno</h3>

                            <p>
                                Este producto ofrece un excelente rendimiento y está
                                diseñado para brindar calidad, confianza y una experiencia
                                satisfactoria.
                            </p>

                        </div>

                        <div className="card">

                            <h3>Producto Dos</h3>

                            <p>
                                Una opción ideal para quienes buscan innovación,
                                funcionalidad y un diseño moderno que se adapte a tus
                                necesidades.
                            </p>

                        </div>

                        <div className="card">

                            <h3>Producto Tres</h3>

                            <p>
                                Fabricado con materiales de alta calidad para garantizar
                                durabilidad, eficiencia y un desempeño excepcional.
                            </p>

                        </div>

                    </div>

                </section>

                <section id="nosotros" className="section">

                    <h2>Nosotros</h2>

                    <p>
                        Somos una empresa comprometida con la innovación y el desarrollo
                        de soluciones tecnológicas que aportan valor a nuestros clientes.
                    </p>

                    <p>
                        Nuestro equipo trabaja con profesionalismo, responsabilidad y
                        pasión para ofrecer productos y servicios de la más alta calidad.
                    </p>

                </section>

                <section id="blog" className="section">

                    <h2>Blog</h2>

                    <div className="cards">

                        <div className="card">

                            <h3>Novedades</h3>

                            <p>
                                Mantente informado sobre nuestras últimas noticias,
                                lanzamientos y actualizaciones.
                            </p>

                        </div>

                        <div className="card">

                            <h3>Tecnología</h3>

                            <p>
                                Descubre tendencias, herramientas y consejos sobre el
                                mundo de la tecnología.
                            </p>

                        </div>

                        <div className="card">

                            <h3>Consejos</h3>

                            <p>
                                Aprende buenas prácticas para aprovechar nuestros
                                productos y servicios al máximo.
                            </p>

                        </div>

                    </div>

                </section>

                <section id="contacto" className="section">

                    <h2>Contáctanos</h2>

                    <p>
                        ¿Tienes alguna duda o deseas más información?
                        Nuestro equipo estará encantado de ayudarte.
                    </p>

                    <br />

                    <Link to="/registro" className="nav-cta">
                        Crear una cuenta
                    </Link>

                </section>

            </main>

        </>
    );
}

export default MyPage;