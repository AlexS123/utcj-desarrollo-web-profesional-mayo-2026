import "./MyPage.css"
import { Smartphone, Tablet, Watch, ArrowRight, ShoppingBag, Percent } from "lucide-react"

function MyPage() {
    return (
        <>
            <main className="pagina-inicio">

                <section className="hero">
                    <div className="hero-contenido">
                        <span className="hero-etiqueta">TECNOLOGÍA PARA TI</span>

                        <h1>
                            Todo lo que necesitas,
                            <span> en un solo lugar.</span>
                        </h1>

                        <p>
                            Descubre celulares
                            diseñados para acompañarte todos los días.
                        </p>

                        <div className="hero-botones">
                            <a href="#destacados" className="boton-principal">
                                Ver productos
                                <ArrowRight size={19}/>
                            </a>

                            <a href="#categorias" className="boton-secundario">
                                Explorar categorías
                            </a>
                        </div>
                    </div>

                    <div className="hero-decoracion">
                        <div className="hero-circulo">
                            <Smartphone size={150}/>
                        </div>
                    </div>
                </section>

                <section className="seccion categorias" id="categorias">
                    <div className="encabezado-seccion">
                        <span>EXPLORA</span>
                        <h2>Encuentra lo que buscas</h2>
                        <p>Elige una categoría y descubre nuestra selección.</p>
                    </div>

                    <div className="categorias-grid">

                        <a href="/celulares" className="categoria-card">
                            <div className="categoria-icono">
                                <Smartphone size={38}/>
                            </div>

                            <div>
                                <h3>Celulares</h3>
                                <p>Potencia y diseño para todos los días.</p>
                            </div>

                            <ArrowRight
                                className="categoria-flecha"
                                size={22}
                            />
                        </a>
                    </div>
                </section>

                <section className="seccion destacados" id="destacados">

                    <div className="encabezado-productos">
                        <div>
                            <span>SELECCIÓN CELUX</span>
                            <h2>Productos destacados</h2>
                        </div>

                        <a href="/celulares" className="ver-todos">
                            Ver todos
                            <ArrowRight size={18}/>
                        </a>
                    </div>

                    <div className="productos-grid">

                        <article className="producto-card">

                            <div className="producto-imagen">
                                <Smartphone size={90}/>
                            </div>

                            <div className="producto-informacion">
                                <span className="producto-categoria">
                                    CELULAR
                                </span>

                                <h3>Smartphone Pro</h3>

                                <p>
                                    Rendimiento y diseño en un solo dispositivo.
                                </p>

                                <div className="producto-final">
                                    <strong>$12,999</strong>

                                    <button>
                                        <ShoppingBag size={19}/>
                                    </button>
                                </div>
                            </div>

                        </article>

                        <article className="producto-card">

                            <div className="producto-imagen">
                                <Tablet size={90}/>
                            </div>

                            <div className="producto-informacion">
                                <span className="producto-categoria">
                                    CELULAR
                                </span>

                                <h3>iPhone 17 Pro</h3>

                                <p>
                                    Ligero, rápido y perfecto para tu día.
                                </p>

                                <div className="producto-final">
                                    <strong>$8,499</strong>

                                    <button>
                                        <ShoppingBag size={19}/>
                                    </button>
                                </div>
                            </div>

                        </article>

                        <article className="producto-card">

                            <div className="producto-imagen">
                                <Tablet size={90}/>
                            </div>

                            <div className="producto-informacion">
                                <span className="producto-categoria">
                                    CELULAR
                                </span>

                                <h3>iPhone 17 Air</h3>

                                <p>
                                    Conecta tu día con tu tecnología.
                                </p>

                                <div className="producto-final">
                                    <strong>$4,299</strong>

                                    <button>
                                        <ShoppingBag size={19}/>
                                    </button>
                                </div>
                            </div>

                        </article>

                    </div>
                </section>

                <section className="oferta">

                    <div className="oferta-icono">
                        <Percent size={42}/>
                    </div>

                    <div className="oferta-contenido">
                        <span>OFERTA ESPECIAL</span>

                        <h2>Hasta 30% de descuento</h2>

                        <p>
                            Encuentra productos seleccionados a precios especiales
                            por tiempo limitado.
                        </p>
                    </div>

                    <a
                        href="/ofertas"
                        className="boton-oferta"
                    >
                        Ver ofertas
                        <ArrowRight size={19}/>
                    </a>

                </section>

            </main>

            <footer className="footer">

                <div className="footer-logo">
                    CELUX
                </div>

                <p>
                    Tecnología que se adapta a ti.
                </p>

                <span>
                    © 2026 CELUX. Todos los derechos reservados.
                </span>

            </footer>
        </>
    )
}

export default MyPage