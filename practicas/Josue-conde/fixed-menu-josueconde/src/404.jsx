import './MyPage.css'
import './404.css'

function NotFound() {
    return (
        <>
            <nav className="fixed-nav">
                <div className="logo">Misitio</div>
                <ul className="nav-links">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Nosotros</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
                <button className="nav-cta">Contáctanos</button>
            </nav>

            <main className="not-found-body">
                <div className="not-found-grid-bg" />
                <div className="not-found-orb not-found-orb-1" />
                <div className="not-found-orb not-found-orb-2" />

                <div className="not-found-center">
                    <span className="not-found-code">404</span>
                    <div className="not-found-line" />
                    <h1 className="not-found-title">Página no encontrada</h1>
                    <p className="not-found-desc">
                        La página que buscas no existe, fue movida, o simplemente nunca estuvo aquí.
                        No te preocupes, todo lo demás sí funciona.
                    </p>
                    <div className="not-found-actions">
                        <a href="/" className="nav-cta not-found-btn-home">Ir al inicio</a>
                        <button className="not-found-btn-back" onClick={() => window.history.back()}>
                            Regresar
                        </button>
                    </div>
                    <div className="not-found-quick-links">
                        <span className="not-found-quick-label">O visita</span>
                        <a href="#" className="not-found-quick-link">Productos</a>
                        <a href="#" className="not-found-quick-link">Nosotros</a>
                        <a href="#" className="not-found-quick-link">Blog</a>
                        <a href="#" className="not-found-quick-link">Contáctanos</a>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFound
