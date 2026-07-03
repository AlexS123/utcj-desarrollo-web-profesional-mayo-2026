import './MyPage.css'

function MyPage() {
    return (
        <>
            <nav className="fixed-nav">
                <div className="logo">MiSitio</div>
                <ul className="nav-links">
                    <li><a href="#" className="active">Inicio</a></li>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Nosotros</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
                <button className="nav-cta">Contáctanos</button>
            </nav>

            <main className="content">
                <section className="hero">
                    <h1>Bienvenido a nuestro sitio web</h1>
                    <p>
                        Descubre nuestros productos y servicios de alta calidad. Trabajamos para ofrecer
                        soluciones innovadoras y una excelente experiencia para todos nuestros clientes.
                    </p>
                </section>

                <section className="section">
                    <h2>Nuestros Productos</h2>
                    <div className="cards">
                        <div className="card">
                            <h3>Producto Uno</h3>
                            <p>
                                Este producto ofrece un excelente rendimiento y está diseñado para brindar
                                calidad, confianza y una experiencia satisfactoria.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Producto Dos</h3>
                            <p>
                                Una opción ideal para quienes buscan innovación, funcionalidad y un diseño
                                moderno que se adapte a sus necesidades.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Producto Tres</h3>
                            <p>
                                Fabricado con materiales de alta calidad para garantizar durabilidad,
                                eficiencia y un desempeño excepcional.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2>Nosotros</h2>
                    <p>
                        Somos una empresa comprometida con la innovación y el desarrollo de soluciones
                        que aporten valor a nuestros clientes. Nuestro equipo trabaja con dedicación para
                        ofrecer productos y servicios de la más alta calidad.
                    </p>
                    <p>
                        Creemos en la mejora continua, el trabajo en equipo y la satisfacción del cliente,
                        por lo que buscamos superar las expectativas en cada proyecto que realizamos.
                    </p>
                </section>

                <section className="section">
                    <h2>Blog</h2>
                    <div className="cards">
                        <div className="card">
                            <h3>Artículo Uno</h3>
                            <p>
                                Conoce las últimas novedades, consejos y recomendaciones para aprovechar
                                al máximo nuestros productos y servicios.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Artículo Dos</h3>
                            <p>
                                Descubre información útil sobre nuevas tecnologías, tendencias y buenas
                                prácticas que pueden ayudarte en tu día a día.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Artículo Tres</h3>
                            <p>
                                Mantente informado con noticias, actualizaciones y contenido de interés
                                relacionado con nuestra empresa y el sector.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2>Contáctanos</h2>
                    <p>
                        Si tienes alguna duda o deseas obtener más información sobre nuestros productos y
                        servicios, estaremos encantados de atenderte.
                    </p>
                    <p>
                        Ponte en contacto con nosotros y uno de nuestros asesores responderá tus preguntas
                        lo antes posible.
                    </p>
                </section>
            </main>
        </>
    );
}

export default MyPage;