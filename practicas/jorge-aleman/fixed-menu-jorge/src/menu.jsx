import { Link } from "react-router-dom"

function Menu() {
    return (
        <div className="navbar">

            <Link to="/">
                Inicio
            </Link>

            <Link to="/registro">
                Registro
            </Link>

            <Link to="/inexistente1">
                Opción 1
            </Link>

            <Link to="/inexistente2">
                Opción 2
            </Link>

            <Link to="/inexistente3">
                Opción 3
            </Link>

        </div>
    )
}

export default Menu