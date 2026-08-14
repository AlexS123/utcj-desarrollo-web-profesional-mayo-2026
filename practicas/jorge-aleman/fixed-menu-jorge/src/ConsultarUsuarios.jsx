import {useEffect, useState} from "react"
import {
    Users,
    User,
    Mail,
    Phone,
    ShieldCheck
} from "lucide-react"
import "./ConsultarUsuarios.css"

function ConsultarUsuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        fetch("/consultarUsuarios")
            .then(async respuesta => {

                const datos = await respuesta.json()

                if (!respuesta.ok) {
                    throw new Error(
                        datos.mensaje || "No fue posible consultar los usuarios."
                    )
                }

                setUsuarios(datos)
                setCargando(false)

            })
            .catch(error => {

                console.error(error)
                setError(error.message)
                setCargando(false)

            })

    }, [])

    return (
        <main className="pagina-clientes">

            <section className="encabezado-clientes">

                <span className="etiqueta-clientes">
                    ADMINISTRACIÓN
                </span>

                <div className="titulo-clientes">

                    <div className="icono-clientes">
                        <Users size={30}/>
                    </div>

                    <div>
                        <h1>
                            Clientes registrados
                        </h1>

                        <p>
                            Consulta los usuarios registrados en CELUX.
                        </p>
                    </div>

                </div>

            </section>

            <section className="clientes-contenedor">

                <div className="clientes-resumen">

                    <Users size={22}/>

                    <span>
                        <strong>{usuarios.length}</strong>
                        {" "}
                        {usuarios.length === 1
                            ? "usuario registrado"
                            : "usuarios registrados"}
                    </span>

                </div>

                {cargando && (
                    <div className="clientes-mensaje">
                        Cargando usuarios...
                    </div>
                )}

                {error && (
                    <div className="clientes-mensaje clientes-error">
                        {error}
                    </div>
                )}

                {!cargando && !error && usuarios.length === 0 && (
                    <div className="clientes-mensaje">
                        No hay usuarios registrados.
                    </div>
                )}

                {!cargando && !error && usuarios.length > 0 && (

                    <div className="clientes-grid">

                        {usuarios.map(usuario => (

                            <article
                                className="cliente-card"
                                key={usuario._id}
                            >

                                <div className="cliente-card-encabezado">

                                    <div className="cliente-icono">
                                        <User size={25}/>
                                    </div>

                                    <div className="cliente-nombre">

                                        <h2>
                                            {usuario.usuario}
                                        </h2>

                                        <span>
                                            ID: {usuario._id}
                                        </span>

                                    </div>

                                </div>

                                <div className="cliente-datos">

                                    <div className="cliente-dato">

                                        <Mail size={18}/>

                                        <div>
                                            <span>
                                                Correo
                                            </span>

                                            <strong>
                                                {usuario.correo}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="cliente-dato">

                                        <Phone size={18}/>

                                        <div>
                                            <span>
                                                Teléfono
                                            </span>

                                            <strong>
                                                {usuario.telefono || "No registrado"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="cliente-dato">

                                        <User size={18}/>

                                        <div>
                                            <span>
                                                Edad
                                            </span>

                                            <strong>
                                                {usuario.edad || "No registrada"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="cliente-dato">

                                        <ShieldCheck size={18}/>

                                        <div>
                                            <span>
                                                Rol
                                            </span>

                                            <strong
                                                className={
                                                    usuario.rol === "Admin"
                                                        ? "rol-admin"
                                                        : "rol-cliente"
                                                }
                                            >
                                                {usuario.rol || "Cliente"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </main>
    )
}

export default ConsultarUsuarios