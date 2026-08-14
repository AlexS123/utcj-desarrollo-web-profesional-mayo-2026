import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (!token) {

        navigate("/403");

        return null;

    }

    let usuario = "";
    let rol = "";

    try {

        const datos = jwtDecode(token);

        usuario = datos.user;
        rol = datos.rol;

    } catch (error) {

        localStorage.removeItem("token");

        navigate("/403");

        return null;

    }


    const cerrarSesion = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <div className="dashboard">

            <aside className="sidebar">

                <div className="sidebar-logo">

                    Mi<span>Sitio</span>

                </div>


                <nav className="menu">

                    <a
                        href="#inicio"
                        className="menu-item activo"
                    >
                        <span>⌂</span>
                        Inicio
                    </a>


                    <a
                        href="#productos"
                        className="menu-item"
                    >
                        <span>▣</span>
                        Productos
                    </a>


                    <a
                        href="#actividad"
                        className="menu-item"
                    >
                        <span>◷</span>
                        Actividad
                    </a>


                    {/* SOLO ADMIN */}

                    {rol === "admin" && (

                        <button
                            className="menu-item menu-button"
                            onClick={() => navigate("/usuarios")}
                        >

                            <span>👥</span>

                            Usuarios

                        </button>

                    )}


                    <a
                        href="#configuracion"
                        className="menu-item"
                    >
                        <span>⚙</span>
                        Configuración
                    </a>

                </nav>


                <div className="sidebar-footer">

                    <button
                        className="btn-salir"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>

                </div>

            </aside>


            <main className="dashboard-content">

                <section
                    id="inicio"
                    className="dashboard-section"
                >

                    <header className="dashboard-header">

                        <div>

                            <p className="saludo">
                                Bienvenido de nuevo
                            </p>

                            <h1>
                                Hola, {usuario} 👋
                            </h1>

                        </div>


                        <div className="perfil">

                            <div className="avatar">

                                {usuario
                                    .charAt(0)
                                    .toUpperCase()
                                }

                            </div>


                            <div>

                                <div className="nombre">
                                    {usuario}
                                </div>

                                <div className="estado">
                                    ● {rol === "admin"
                                        ? "Administrador"
                                        : "Usuario"
                                    }
                                </div>

                            </div>

                        </div>

                    </header>


                    <div className="welcome-card">

                        <span>
                            PANEL PRINCIPAL
                        </span>

                        <h2>
                            Bienvenido a tu espacio en MiSitio.
                        </h2>

                        <p>
                            Desde aquí puedes explorar nuestros productos,
                            consultar novedades y administrar tu cuenta.
                        </p>

                        <a
                            href="#productos"
                            className="btn-explorar"
                        >
                            Ver productos
                        </a>

                    </div>


                    <div className="stats">

                        <div className="stat-card">

                            <p>
                                Productos
                            </p>

                            <h3>
                                3
                            </h3>

                        </div>


                        <div className="stat-card">

                            <p>
                                Notificaciones
                            </p>

                            <h3>
                                2
                            </h3>

                        </div>


                        <div className="stat-card">

                            <p>
                                Favoritos
                            </p>

                            <h3>
                                0
                            </h3>

                        </div>


                        <div className="stat-card">

                            <p>
                                Rol
                            </p>

                            <h3>
                                {rol === "admin"
                                    ? "Admin"
                                    : "Usuario"
                                }
                            </h3>

                        </div>

                    </div>

                </section>


                <section
                    id="productos"
                    className="dashboard-section"
                >

                    <div className="section-title">

                        <p>
                            CATÁLOGO
                        </p>

                        <h2>
                            Nuestros productos
                        </h2>

                    </div>


                    <div className="productos-grid">

                        <div className="producto-card">

                            <div className="producto-icon">
                                🚀
                            </div>

                            <h3>
                                Producto Uno
                            </h3>

                            <p>
                                Una solución moderna y eficiente
                                diseñada para nuestros usuarios.
                            </p>

                            <button>
                                Ver más
                            </button>

                        </div>


                        <div className="producto-card">

                            <div className="producto-icon">
                                💻
                            </div>

                            <h3>
                                Producto Dos
                            </h3>

                            <p>
                                Tecnología y funcionalidad para
                                adaptarse a tus necesidades.
                            </p>

                            <button>
                                Ver más
                            </button>

                        </div>


                        <div className="producto-card">

                            <div className="producto-icon">
                                ✨
                            </div>

                            <h3>
                                Producto Tres
                            </h3>

                            <p>
                                Una experiencia moderna enfocada
                                en brindar valor al usuario.
                            </p>

                            <button>
                                Ver más
                            </button>

                        </div>

                    </div>

                </section>


                <section
                    id="actividad"
                    className="dashboard-section"
                >

                    <div className="section-title">

                        <p>
                            HISTORIAL
                        </p>

                        <h2>
                            Actividad reciente
                        </h2>

                    </div>


                    <div className="activity-panel">

                        <div className="activity-item">

                            <div className="activity-dot"></div>

                            <div>

                                <strong>
                                    Inicio de sesión correcto
                                </strong>

                                <p>
                                    Accediste correctamente a tu cuenta.
                                </p>

                            </div>

                        </div>


                        <div className="activity-item">

                            <div className="activity-dot"></div>

                            <div>

                                <strong>
                                    Cuenta activa
                                </strong>

                                <p>
                                    Tu perfil está funcionando correctamente.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                <section
                    id="configuracion"
                    className="dashboard-section"
                >

                    <div className="section-title">

                        <p>
                            CUENTA
                        </p>

                        <h2>
                            Configuración
                        </h2>

                    </div>


                    <div className="config-card">

                        <div className="config-row">

                            <div>

                                <strong>
                                    Usuario
                                </strong>

                                <p>
                                    {usuario}
                                </p>

                            </div>

                        </div>


                        <div className="config-row">

                            <div>

                                <strong>
                                    Rol
                                </strong>

                                <p>
                                    {rol}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );

}

export default Dashboard;