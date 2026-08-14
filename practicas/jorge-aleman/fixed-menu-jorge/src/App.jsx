import {useEffect, useState} from "react"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import FormularioRegistro from "./FormularioRegistro.jsx"
import Login from "./Login.jsx"
import Celulares from "./Celulares.jsx"
import Ofertas from "./Ofertas.jsx"
import Contacto from "./Contacto.jsx"
import MyPage from "./MyPage.jsx"
import PaginaNoEncontrada from "./PaginaNoEncontrada.jsx"
import Menu from "./Menu.jsx"
import ConsultarUsuarios from "./ConsultarUsuarios"
import "./menu.css"
function App() {
    const [carrito, setCarrito] = useState([])
    const [usuarioLogueado, setUsuarioLogueado] = useState(null)
    useEffect(() => {
        fetch("/sesion")
            .then(async respuesta => {
                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    setUsuarioLogueado(datos.usuario)
                } else {
                    setUsuarioLogueado(null)
                }
            })
            .catch(() => {
                setUsuarioLogueado(null)
            })
    }, [])
    const agregarAlCarrito = (producto) => {
        setCarrito((carritoActual) => [
            ...carritoActual,
            producto
        ])
    }
    const quitarDelCarrito = (indiceProducto) => {
        setCarrito((carritoActual) =>
            carritoActual.filter(
                (_, index) => index !== indiceProducto
            )
        )
    }
    return (
        <BrowserRouter>
            <Menu
                carrito={carrito}
                quitarDelCarrito={quitarDelCarrito}
                usuarioLogueado={usuarioLogueado}
                setUsuarioLogueado={setUsuarioLogueado}
            />
            <Routes>
                <Route
                    path="/"
                    element={<MyPage />}
                />
                <Route
                    path="/login"
                    element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
                />
                <Route
                    path="/registro"
                    element={<FormularioRegistro />}
                />
                <Route
                    path="/celulares"
                    element={
                        <Celulares
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    }
                />
                <Route
                    path="/clientes"
                    element={<ConsultarUsuarios/>}
                />
                <Route
                    path="/ofertas"
                    element={
                        <Ofertas
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    }
                />
                <Route
                    path="/contacto"
                    element={<Contacto />}
                />
                <Route
                    path="*"
                    element={<PaginaNoEncontrada />}
                />
            </Routes>
        </BrowserRouter>
    )
}
export default App