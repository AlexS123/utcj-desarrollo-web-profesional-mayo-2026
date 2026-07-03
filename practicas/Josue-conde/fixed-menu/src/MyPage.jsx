import './MyPage.css'

function MyPage() {
    return (
        <>
            <nav className="fixed-nav">
                <div className="logo">Misitio</div>
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
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                </section>

                <section className="section">
                    <h2>Nuestros Productos</h2>
                    <div className="cards">
                        <div className="card">
                            <h3>Producto Uno</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="card">
                            <h3>Producto Dos</h3>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="card">
                            <h3>Producto Tres</h3>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2>Nosotros</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                </section>

                <section className="section">
                    <h2>Blog</h2>
                    <div className="cards">
                        <div className="card">
                            <h3>Artículo Uno</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                        </div>
                        <div className="card">
                            <h3>Artículo Dos</h3>
                            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
                        </div>
                        <div className="card">
                            <h3>Artículo Tres</h3>
                            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem.</p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2>Contáctanos</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                </section>
            </main>
        </>
    );
}

export default MyPage;