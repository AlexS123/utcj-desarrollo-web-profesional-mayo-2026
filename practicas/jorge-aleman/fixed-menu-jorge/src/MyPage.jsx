import { Link } from "react-router-dom"

function MyPage() {
    return (
        <>
            <div className="navbar">
                <Link to="/inexistente1">Opción 1</Link>

                <Link to="/inexistente2">Opción 2</Link>

                <Link to="/inexistente3">Opción 3</Link>
            </div>

            <div className="main">
                <h1>Menú persistente</h1>

                <h2>Scrollea el contenido</h2>

                <h2>
                    El menú persistirá en la parte superior aunque se scrollee
                </h2>
            </div>
        </>
    )
}

export default MyPage