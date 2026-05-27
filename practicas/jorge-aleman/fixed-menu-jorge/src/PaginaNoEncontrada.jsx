import "./PaginaNoEncontrada.css"

function PaginaNoEncontrada() {
    return (
        <div className="contenedor-error">
            <h1>Error 404</h1>

            <h2>Página no encontrada</h2>

            <p>
                La página que intentas abrir no existe.
            </p>

            <a href="/">
                Volver al inicio
            </a>
        </div>
    )
}

export default PaginaNoEncontrada