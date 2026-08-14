import './MyPage.css';
import { Link } from "react-router-dom";

function MyPage() {

    return (

        <>
            <nav className="fixed-nav">

                <div className="logo">
                    MiSitio
                </div>

                <div className="nav-actions">

                    <Link to="/login" className="btn-login-nav">
                        Iniciar sesión
                    </Link>

                    <Link to="/registro" className="btn-register-nav">
                        Registrarse
                    </Link>

                </div>

            </nav>


            <main className="welcome-page">

                <section className="welcome-hero">

                    <div className="welcome-content">

                        <span className="welcome-tag">
                            BIENVENIDO A MISITIO
                        </span>

                        <h1>
                            Soluciones simples para una mejor experiencia
                        </h1>

                        <p>
                            Descubre nuestros productos, servicios y contenido
                            pensado para ofrecerte una experiencia moderna,
                            sencilla y confiable.
                        </p>

                        <div className="welcome-buttons">

                            <Link
                                to="/registro"
                                className="btn-primary"
                            >
                                Crear una cuenta
                            </Link>

                            <Link
                                to="/login"
                                className="btn-secondary"
                            >
                                Ya tengo una cuenta
                            </Link>

                        </div>

                    </div>


                    <div className="welcome-box">

                        <div className="box-icon">
                            ✦
                        </div>

                        <h2>
                            Todo comienza aquí
                        </h2>

                        <p>
                            Regístrate o inicia sesión para acceder a tu espacio
                            personal dentro de MiSitio.
                        </p>

                    </div>

                </section>


                <section className="welcome-info">

                    <div className="info-item">

                        <div className="info-icon">
                            ✓
                        </div>

                        <h3>
                            Fácil de usar
                        </h3>

                        <p>
                            Una experiencia sencilla y accesible.
                        </p>

                    </div>


                    <div className="info-item">

                        <div className="info-icon">
                            ⚡
                        </div>

                        <h3>
                            Innovación
                        </h3>

                        <p>
                            Soluciones modernas pensadas para ti.
                        </p>

                    </div>


                    <div className="info-item">

                        <div className="info-icon">
                            ★
                        </div>

                        <h3>
                            Calidad
                        </h3>

                        <p>
                            Trabajamos para ofrecer una mejor experiencia.
                        </p>

                    </div>

                </section>


                <section className="welcome-cta">

                    <h2>
                        ¿Listo para comenzar?
                    </h2>

                    <p>
                        Crea tu cuenta y conoce todo lo que MiSitio tiene para ti.
                    </p>

                    <Link
                        to="/registro"
                        className="btn-primary"
                    >
                        Comenzar ahora
                    </Link>

                </section>

            </main>

        </>

    );

}

export default MyPage;