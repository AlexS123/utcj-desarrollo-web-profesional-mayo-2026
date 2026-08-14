import Catalogo from "./Catalogo.jsx"
import "./Ofertas.css"

function Ofertas({ agregarAlCarrito }) {

    const productos = [
        {
            nombre: "iPhone 15",
            marca: "Apple",
            precio: 14999,
            precioAnterior: 16999,
            descuento: "12% OFF",
            calificacion: 4.8
        },
        {
            nombre: "Galaxy S24",
            marca: "Samsung",
            precio: 13999,
            precioAnterior: 16499,
            descuento: "15% OFF",
            calificacion: 4.8
        },
        {
            nombre: "Redmi Note 13 Pro",
            marca: "Xiaomi",
            precio: 6999,
            precioAnterior: 7999,
            descuento: "12% OFF",
            calificacion: 4.5
        },
        {
            nombre: "Moto Edge 50",
            marca: "Motorola",
            precio: 9499,
            precioAnterior: 10999,
            descuento: "13% OFF",
            calificacion: 4.6
        }
    ]

    return (
        <>

            <main className="pagina-ofertas">

                <section className="hero-ofertas">

                    <div className="hero-ofertas-contenido">

                        <span className="etiqueta-ofertas">
                            OFERTAS CELUX
                        </span>

                        <h1>
                            Tecnología que quieres,
                            <span> a un precio que te encantará.</span>
                        </h1>

                        <p>
                            Aprovecha nuestros descuentos especiales
                            en celulares.
                        </p>

                        <a
                            href="#productos-oferta"
                            className="boton-ofertas"
                        >
                            Ver ofertas
                        </a>

                    </div>

                    <div className="oferta-visual">

                        <div className="circulo-oferta circulo-grande"></div>

                        <div className="circulo-oferta circulo-mediano"></div>

                        <div className="oferta-porcentaje">

                            <strong>
                                -30%
                            </strong>

                            <span>
                                DESCUENTO
                            </span>

                        </div>

                    </div>

                </section>

                <section
                    className="beneficios-ofertas"
                    id="productos-oferta"
                >

                    <div className="beneficio">

                        <span className="beneficio-icono">
                            %
                        </span>

                        <div>

                            <strong>
                                Grandes descuentos
                            </strong>

                            <p>
                                Celulares seleccionados con precios especiales.
                            </p>

                        </div>

                    </div>

                    <div className="beneficio">

                        <span className="beneficio-icono">
                            ✓
                        </span>

                        <div>

                            <strong>
                                Celulares seleccionados
                            </strong>

                            <p>
                                Encuentra smartphones de marcas reconocidas.
                            </p>

                        </div>

                    </div>

                    <div className="beneficio">

                        <span className="beneficio-icono">
                            ★
                        </span>

                        <div>

                            <strong>
                                Celulares favoritos
                            </strong>

                            <p>
                                Algunas de nuestras opciones mejor calificadas.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

            <div className="catalogo-ofertas">

                <Catalogo
                    titulo="Ofertas especiales"
                    descripcion="Descubre celulares seleccionados con descuentos especiales por tiempo limitado."
                    productos={productos}
                    agregarAlCarrito={agregarAlCarrito}
                />

            </div>

        </>
    )
}

export default Ofertas