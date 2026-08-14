import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {Lock, LogIn, X, User} from "lucide-react"
import "./Login.css"
import "./ToastError.css"
import ToastError from "./ToastError"
import FormularioRegistro from "./FormularioRegistro"
function Login({setUsuarioLogueado}) {
    const [usuarioCorreo, setUsuarioCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [mensajeError, setMensajeError] = useState("")
    const [mostrarError, setMostrarError] = useState(false)
    const [mostrarRegistro, setMostrarRegistro] = useState(false)
    const navigate = useNavigate()
    function iniciarSesion(evento) {
        evento.preventDefault()
        if (usuarioCorreo.trim() === "" || contrasena.trim() === "") {
            setMensajeError("Debes ingresar tu usuario o correo y tu contraseña.")
            setMostrarError(true)
            return
        }
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: usuarioCorreo,
                contrasena: contrasena
            })
        })
        .then(async respuesta => {
            const datos = await respuesta.json()
            if (respuesta.ok) {
                const sesion = await fetch("/sesion")
                if (sesion.ok) {
                    const datosSesion = await sesion.json()
                    setUsuarioLogueado(datosSesion.usuario)
                }
                navigate("/")
            } else {
                setMensajeError(
                    datos.mensaje || "Usuario o contraseña incorrectos."
                )
                setMostrarError(true)
            }
        })
        .catch(() => {
            setMensajeError(
                "No fue posible conectar con el servidor."
            )
            setMostrarError(true)
        })
    }
    function abrirRegistro(evento) {
        evento.preventDefault()
        setMostrarRegistro(true)
    }
    function cerrarRegistro() {
        setMostrarRegistro(false)
    }
    function registroExitoso() {
        setMostrarRegistro(false)
    }
    return (
        <>
            <ToastError
                mensaje={mensajeError}
                visible={mostrarError}
                cerrar={() => setMostrarError(false)}
            />
            <main className="pagina-login">
                <div className="login-contenedor">
                    <form
                        className="formulario-login"
                        onSubmit={iniciarSesion}
                    >
                        <div className="login-icono">
                            <LogIn size={30}/>
                        </div>
                        <h1>
                            Iniciar sesión
                        </h1>
                        <p className="login-descripcion">
                            Ingresa a tu cuenta para continuar.
                        </p>
                        <div className="campo-login">
                            <User size={20}/>
                            <input
                                type="text"
                                placeholder="Correo electrónico o usuario"
                                value={usuarioCorreo}
                                onChange={(e) => setUsuarioCorreo(e.target.value)}
                            />
                        </div>
                        <div className="campo-login">
                            <Lock size={20}/>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="boton-login"
                        >
                            <LogIn size={19}/>
                            Iniciar sesión
                        </button>
                        <div className="login-registro">
                            <span>
                                ¿No tienes una cuenta?
                            </span>
                            <a
                                href="#"
                                onClick={abrirRegistro}
                            >
                                Regístrate
                            </a>
                        </div>
                    </form>
                </div>
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
            {mostrarRegistro && (
                <div className="modal-registro">
                    <div
                        className="modal-registro-fondo"
                        onClick={cerrarRegistro}
                    ></div>
                    <div className="modal-registro-contenido">
                        <button
                            className="modal-registro-cerrar"
                            onClick={cerrarRegistro}
                            aria-label="Cerrar registro"
                        >
                            <X size={24}/>
                        </button>
                        <FormularioRegistro
                            onRegistroExitoso={registroExitoso}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
export default Login