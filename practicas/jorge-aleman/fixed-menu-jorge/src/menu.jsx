import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {
    Smartphone,
    Percent,
    ShoppingCart,
    User,
    LogOut,
    Trash2,
    Menu as MenuIcon,
    X,
    Contact,
    Users
} from "lucide-react"

function Menu({
    carrito,
    quitarDelCarrito,
    usuarioLogueado,
    setUsuarioLogueado
}) {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [cuentaAbierta, setCuentaAbierta] = useState(false)

    const navigate = useNavigate()

    function cerrarSesion() {
        fetch("/logout", {
            method: "POST"
        })
        .then(async respuesta => {
            if (respuesta.ok) {
                setUsuarioLogueado(null)
                setMenuAbierto(false)
                navigate("/login")
            }
        })
        .catch(() => {
            console.log("No fue posible cerrar la sesión.")
        })
    }

    return (
        <nav className="navbar">

            <Link
                to="/"
                className="logo"
                onClick={() => setMenuAbierto(false)}
            >
                CELUX
            </Link>

            <button
                className="menu-hamburguesa"
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label="Abrir menú"
            >
                {menuAbierto ? (
                    <X size={27}/>
                ) : (
                    <MenuIcon size={27}/>
                )}
            </button>

            <div
                className={`menu-opciones ${
                    menuAbierto ? "menu-abierto" : ""
                }`}
            >

                <Link
                    to="/celulares"
                    className="menu-opcion"
                    onClick={() => setMenuAbierto(false)}
                >
                    <Smartphone size={19}/>
                    Celulares
                </Link>

                <Link
                    to="/ofertas"
                    className="menu-opcion"
                    onClick={() => setMenuAbierto(false)}
                >
                    <Percent size={19}/>
                    Ofertas
                </Link>

                <Link
                    to="/contacto"
                    className="menu-opcion"
                    onClick={() => setMenuAbierto(false)}
                >
                    <Contact size={19}/>
                    Contacto
                </Link>

                {usuarioLogueado?.rol === "Admin" && (
                    <Link
                        to="/clientes"
                        className="menu-opcion"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <Users size={19}/>
                        Ver clientes
                    </Link>
                )}

                <div className="carrito">

                    <div className="menu-opcion carrito-boton">

                        <ShoppingCart size={19}/>

                        Carrito

                        {carrito.length > 0 && (
                            <span className="carrito-contador">
                                {carrito.length}
                            </span>
                        )}

                    </div>

                    <div className="carrito-dropdown">

                        {carrito.length === 0 ? (

                            <div className="carrito-vacio">

                                <ShoppingCart size={25}/>

                                <span>
                                    Tu carrito está vacío
                                </span>

                            </div>

                        ) : (

                            <>

                                <div className="carrito-titulo">

                                    <strong>
                                        Tu carrito
                                    </strong>

                                    <span>
                                        {carrito.length} producto
                                        {carrito.length !== 1 ? "s" : ""}
                                    </span>

                                </div>

                                <div className="carrito-productos">

                                    {carrito.map((producto, index) => (

                                        <div
                                            className="carrito-producto"
                                            key={`${producto.nombre}-${index}`}
                                        >

                                            <div className="carrito-producto-imagen">

                                                <Smartphone size={28}/>

                                            </div>

                                            <div className="carrito-producto-info">

                                                <strong>
                                                    {producto.nombre}
                                                </strong>

                                                <span>
                                                    ${producto.precio.toLocaleString("es-MX")}
                                                </span>

                                            </div>

                                            <button
                                                className="carrito-eliminar"
                                                onClick={() => quitarDelCarrito(index)}
                                            >
                                                <Trash2 size={16}/>
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </>

                        )}

                    </div>

                </div>

                {usuarioLogueado ? (

                    <div className="cuenta">

                        <button
                            className="menu-opcion cuenta-boton"
                            onClick={() => setCuentaAbierta(!cuentaAbierta)}
                        >
                            <User size={19}/>
                            Cuenta
                        </button>

                        <div
                            className={`cuenta-dropdown ${
                                cuentaAbierta
                                    ? "cuenta-dropdown-abierto"
                                    : ""
                            }`}
                        >

                            <div className="cuenta-usuario">

                                <User size={18}/>

                                {usuarioLogueado.usuario}

                            </div>

                            <button
                                className="cuenta-cerrar"
                                onClick={cerrarSesion}
                            >
                                <LogOut size={18}/>
                                Cerrar sesión
                            </button>

                        </div>

                    </div>

                ) : (

                    <Link
                        to="/login"
                        className="menu-opcion"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <User size={19}/>
                        Iniciar sesión
                    </Link>

                )}

            </div>

        </nav>
    )
}

export default Menu