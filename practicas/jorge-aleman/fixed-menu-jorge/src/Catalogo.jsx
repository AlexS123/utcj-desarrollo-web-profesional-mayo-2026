import { useState } from "react"
import "./Catalogo.css"
import {
    ShoppingCart,
    Star,
    SlidersHorizontal,
    Smartphone
} from "lucide-react"

function Catalogo({ titulo, descripcion, productos, agregarAlCarrito }) {
    const [orden, setOrden] = useState("default")

    const productosOrdenados = [...productos].sort((a, b) => {

        if (orden === "precio-menor") {
            return a.precio - b.precio
        }

        if (orden === "precio-mayor") {
            return b.precio - a.precio
        }

        if (orden === "calificacion") {
            return b.calificacion - a.calificacion
        }

        return 0
    })

    return (
        <>
            <main className="pagina-catalogo">

                <section className="encabezado-catalogo">

                    <div>

                        <span className="etiqueta-catalogo">
                            CATÁLOGO CELUX
                        </span>

                        <h1>
                            {titulo}
                        </h1>

                        <p>
                            {descripcion}
                        </p>

                    </div>

                </section>

                <section className="catalogo">

                    <div className="barra-catalogo">

                        <div className="resultado-catalogo">
                            <strong>
                                {productos.length}
                            </strong>{" "}
                            productos encontrados
                        </div>

                        <button className="boton-filtros">
                            <SlidersHorizontal size={18}/>
                            Filtros
                        </button>

                        <select
                            className="ordenar"
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                        >
                            <option value="default">
                                Ordenar por
                            </option>

                            <option value="precio-menor">
                                Precio: menor a mayor
                            </option>

                            <option value="precio-mayor">
                                Precio: mayor a menor
                            </option>

                            <option value="calificacion">
                                Mejor calificación
                            </option>

                        </select>

                    </div>

                    <div className="productos-grid">

                        {productosOrdenados.map((producto, index) => (

                            <article
                                className="producto-card"
                                key={index}
                            >

                                <div className="etiqueta-descuento">
                                    {producto.descuento}
                                </div>

                                <div className="producto-imagen">

                                    <Smartphone
                                        className="icono-producto"
                                        size={130}
                                        strokeWidth={1.3}
                                    />

                                </div>

                                <div className="producto-informacion">

                                    <span className="producto-marca">
                                        {producto.marca}
                                    </span>

                                    <h2>
                                        {producto.nombre}
                                    </h2>

                                    <div className="calificacion">

                                        <Star
                                            size={15}
                                            fill="currentColor"
                                        />

                                        <span>
                                            {producto.calificacion}
                                        </span>

                                        <span className="opinion">
                                            Excelente
                                        </span>

                                    </div>

                                    <div className="precios">

                                        <strong>
                                            ${producto.precio.toLocaleString("es-MX")}
                                        </strong>

                                        <span>
                                            ${producto.precioAnterior.toLocaleString("es-MX")}
                                        </span>

                                    </div>

                                    <button
                                        className="boton-carrito"
                                        onClick={() => agregarAlCarrito(producto)}
                                    >
                                        <ShoppingCart size={19}/>
                                        Agregar al carrito
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            </main>

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
        </>
    )
}

export default Catalogo