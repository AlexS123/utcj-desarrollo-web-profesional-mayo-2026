import { useState } from "react"
import "./FormularioRegistro.css"
import "./ToastError.css"
import ToastError from "./ToastError"
import {
    User,
    Mail,
    Hash,
    Phone,
    VenusAndMars,
    Lock,
    ShieldCheck
} from "lucide-react"

function FormularioRegistro({ onRegistroExitoso }) {

    const [usuario, setUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [edad, setEdad] = useState("")
    const [sexo, setSexo] = useState("")
    const [aceptaTerminos, setAceptaTerminos] = useState(false)
    const [telefono, setTelefono] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [verificarContrasena, setVerificarContrasena] = useState("")

    const [sugerenciasCorreo, setSugerenciasCorreo] = useState([])
    const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(-1)

    const [errores, setErrores] = useState({})
    const [mensajeError, setMensajeError] = useState("")
    const [mostrarError, setMostrarError] = useState(false)
    const [mostrarPoliticas, setMostrarPoliticas] = useState(false)

    function mostrarToast(mensaje) {
        setMensajeError(mensaje)
        setMostrarError(true)
    }

    function actualizarSugerenciasCorreo(valor) {

        const dominios = [
            "gmail.com",
            "hotmail.com",
            "outlook.com",
            "yahoo.com"
        ]

        const posicionArroba = valor.indexOf("@")

        if (posicionArroba === -1) {
            setSugerenciasCorreo([])
            setSugerenciaSeleccionada(-1)
            return
        }

        const usuarioCorreo = valor.substring(0, posicionArroba)
        const dominioEscrito = valor.substring(posicionArroba + 1)

        if (usuarioCorreo === "" || dominioEscrito.includes(".")) {
            setSugerenciasCorreo([])
            setSugerenciaSeleccionada(-1)
            return
        }

        const sugerencias = dominios.filter(dominio =>
            dominio.startsWith(dominioEscrito.toLowerCase())
        )

        setSugerenciasCorreo(sugerencias)
        setSugerenciaSeleccionada(-1)
    }

    function validarPoliticasContrasena() {

        return {
            longitud: contrasena.length >= 8,
            mayuscula: /[A-Z]/.test(contrasena),
            minuscula: /[a-z]/.test(contrasena),
            numero: /\d/.test(contrasena)
        }
    }

    function validarCoincidenciaContrasena() {

        return (
            contrasena !== "" &&
            contrasena === verificarContrasena
        )
    }

    function validarCampo(nombreCampo, valor) {

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const regexTelefono = /^[0-9]{10}$/
        const regexEdad = /^[0-9]{1,3}$/
        const regexContrasena =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

        setErrores(prevErrores => {

            const nuevosErrores = {
                ...prevErrores
            }

            if (nombreCampo === "usuario") {

                if (
                    valor.trim() !== "" &&
                    valor.length <= 15
                ) {
                    delete nuevosErrores.usuario
                }
            }

            if (nombreCampo === "correo") {

                if (regexCorreo.test(valor)) {
                    delete nuevosErrores.correo
                }
            }

            if (nombreCampo === "edad") {

                if (regexEdad.test(valor)) {
                    delete nuevosErrores.edad
                }
            }

            if (nombreCampo === "telefono") {

                if (regexTelefono.test(valor)) {
                    delete nuevosErrores.telefono
                }
            }

            if (nombreCampo === "contrasena") {

                if (regexContrasena.test(valor)) {
                    delete nuevosErrores.contrasena
                }
            }

            if (nombreCampo === "verificarContrasena") {

                if (valor === contrasena) {
                    delete nuevosErrores.verificarContrasena
                }
            }

            if (nombreCampo === "sexo") {

                if (valor !== "") {
                    delete nuevosErrores.sexo
                }
            }

            if (nombreCampo === "aceptaTerminos") {

                if (valor) {
                    delete nuevosErrores.aceptaTerminos
                }
            }

            return nuevosErrores
        })
    }

    function validarFormulario(evento) {

        evento.preventDefault()

        const regexUsuario = /^.{1,15}$/
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const regexTelefono = /^[0-9]{10}$/
        const regexEdad = /^[0-9]{1,3}$/
        const regexContrasena =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

        let nuevosErrores = {}

        if (!regexUsuario.test(usuario)) {

            nuevosErrores.usuario =
                "El usuario es obligatorio y debe tener máximo 15 caracteres."
        }

        if (!regexCorreo.test(correo)) {

            nuevosErrores.correo =
                "El correo electrónico no es válido."
        }

        if (!regexEdad.test(edad)) {

            nuevosErrores.edad =
                "La edad debe ser numérica."
        }

        if (!regexTelefono.test(telefono)) {

            nuevosErrores.telefono =
                "El teléfono debe contener exactamente 10 dígitos."
        }

        if (!regexContrasena.test(contrasena)) {

            nuevosErrores.contrasena = true
        }

        if (contrasena !== verificarContrasena) {

            nuevosErrores.verificarContrasena =
                "Las contraseñas no coinciden."
        }

        if (sexo === "") {

            nuevosErrores.sexo =
                "Debe seleccionar un sexo."
        }

        if (!aceptaTerminos) {

            nuevosErrores.aceptaTerminos =
                "Debe aceptar los términos y condiciones."
        }

        setErrores(nuevosErrores)

        if (nuevosErrores.contrasena) {
            setMostrarPoliticas(true)
        }

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        fetch("/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                correo,
                edad,
                telefono,
                sexo,
                contrasena,
                rol: "Cliente"
            })
        })
        .then(async respuesta => {
            const datos = await respuesta.json();

            if (respuesta.ok) {

                setUsuario("")
                setCorreo("")
                setEdad("")
                setTelefono("")
                setSexo("")
                setContrasena("")
                setVerificarContrasena("")
                setAceptaTerminos(false)
                setErrores({})

                if (onRegistroExitoso) {
                    onRegistroExitoso()
                }

            } else if (datos.errores) {

                setErrores(prevErrores => ({
                    ...prevErrores,
                    ...datos.errores
                }))
            }
        })
        .catch(() => {

            mostrarToast(
                "No fue posible conectar con el servidor."
            )
        })
    }

    return (
        <>
            <ToastError
                mensaje={mensajeError}
                visible={mostrarError}
                cerrar={() => setMostrarError(false)}
            />

            <div className="contenedor-formulario">

                <form
                    className="formulario"
                    onSubmit={validarFormulario}
                >

                    <h1>
                        Registro de Usuario
                    </h1>

                    <div className="campo-con-error">

                        <div className="campo-formulario">

                            <User size={20}/>

                            <input
                                type="text"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setUsuario(valor)

                                    validarCampo(
                                        "usuario",
                                        valor
                                    )
                                }}
                                maxLength="15"
                            />

                        </div>

                        {errores.usuario && (
                            <p className="mensaje-error">
                                {errores.usuario}
                            </p>
                        )}

                    </div>

                    <div className="campo-con-error correo-autocompletar">

                        <div className="campo-formulario">

                            <Mail size={20}/>

                            <input
                                type="text"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setCorreo(valor)

                                    actualizarSugerenciasCorreo(
                                        valor
                                    )

                                    validarCampo(
                                        "correo",
                                        valor
                                    )
                                }}
                                onKeyDown={(e) => {

                                    if (
                                        sugerenciasCorreo.length === 0
                                    ) {
                                        return
                                    }

                                    if (e.key === "ArrowDown") {

                                        e.preventDefault()

                                        setSugerenciaSeleccionada(actual =>
                                            actual <
                                            sugerenciasCorreo.length - 1
                                                ? actual + 1
                                                : 0
                                        )
                                    }

                                    if (e.key === "ArrowUp") {

                                        e.preventDefault()

                                        setSugerenciaSeleccionada(actual =>
                                            actual > 0
                                                ? actual - 1
                                                : sugerenciasCorreo.length - 1
                                        )
                                    }

                                    if (
                                        e.key === "Enter" &&
                                        sugerenciaSeleccionada >= 0
                                    ) {

                                        e.preventDefault()

                                        const usuarioCorreo =
                                            correo.substring(
                                                0,
                                                correo.indexOf("@")
                                            )

                                        const correoCompleto =
                                            `${usuarioCorreo}@${sugerenciasCorreo[sugerenciaSeleccionada]}`

                                        setCorreo(correoCompleto)

                                        validarCampo(
                                            "correo",
                                            correoCompleto
                                        )

                                        setSugerenciasCorreo([])

                                        setSugerenciaSeleccionada(-1)
                                    }
                                }}
                            />

                        </div>

                        {sugerenciasCorreo.length > 0 && (

                            <div className="sugerencias-correo">

                                {sugerenciasCorreo.map(
                                    (dominio, indice) => (

                                        <div
                                            key={dominio}
                                            className={
                                                indice === sugerenciaSeleccionada
                                                    ? "sugerencia-correo seleccionada"
                                                    : "sugerencia-correo"
                                            }
                                            onMouseDown={() => {

                                                const usuarioCorreo =
                                                    correo.substring(
                                                        0,
                                                        correo.indexOf("@")
                                                    )

                                                const correoCompleto =
                                                    `${usuarioCorreo}@${dominio}`

                                                setCorreo(correoCompleto)

                                                validarCampo(
                                                    "correo",
                                                    correoCompleto
                                                )

                                                setSugerenciasCorreo([])

                                                setSugerenciaSeleccionada(-1)
                                            }}
                                        >
                                            {dominio}
                                        </div>

                                    )
                                )}

                            </div>

                        )}

                        {errores.correo && (
                            <p className="mensaje-error">
                                {errores.correo}
                            </p>
                        )}

                    </div>

                    <div className="campo-con-error">

                        <div className="campo-formulario">

                            <Hash size={20}/>

                            <input
                                type="number"
                                placeholder="Edad"
                                value={edad}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setEdad(valor)

                                    validarCampo(
                                        "edad",
                                        valor
                                    )
                                }}
                            />

                        </div>

                        {errores.edad && (
                            <p className="mensaje-error">
                                {errores.edad}
                            </p>
                        )}

                    </div>

                    <div className="campo-con-error">

                        <div className="campo-formulario">

                            <Phone size={20}/>

                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setTelefono(valor)

                                    validarCampo(
                                        "telefono",
                                        valor
                                    )
                                }}
                            />

                        </div>

                        {errores.telefono && (
                            <p className="mensaje-error">
                                {errores.telefono}
                            </p>
                        )}

                    </div>

                    <div className="campo-con-error">

                        <div className="campo-formulario">

                            <VenusAndMars size={20}/>

                            <select
                                value={sexo}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setSexo(valor)

                                    validarCampo(
                                        "sexo",
                                        valor
                                    )
                                }}
                            >

                                <option value="">
                                    Seleccione sexo
                                </option>

                                <option value="Masculino">
                                    Masculino
                                </option>

                                <option value="Femenino">
                                    Femenino
                                </option>

                            </select>

                        </div>

                        {errores.sexo && (
                            <p className="mensaje-error">
                                {errores.sexo}
                            </p>
                        )}

                    </div>

                    <div className="campo-contrasena">

                        <div className="campo-formulario">

                            <Lock size={20}/>

                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onFocus={() =>
                                    setMostrarPoliticas(true)
                                }
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setContrasena(valor)

                                    validarCampo(
                                        "contrasena",
                                        valor
                                    )
                                }}
                            />

                        </div>

                        {mostrarPoliticas && (

                            <div className="politicas-contrasena">

                                <p
                                    className={
                                        validarPoliticasContrasena().longitud
                                            ? "politica-valida"
                                            : "politica-invalida"
                                    }
                                >
                                    {validarPoliticasContrasena().longitud
                                        ? "✓"
                                        : "✗"}{" "}
                                    Mínimo 8 caracteres
                                </p>

                                <p
                                    className={
                                        validarPoliticasContrasena().mayuscula
                                            ? "politica-valida"
                                            : "politica-invalida"
                                    }
                                >
                                    {validarPoliticasContrasena().mayuscula
                                        ? "✓"
                                        : "✗"}{" "}
                                    Una letra mayúscula
                                </p>

                                <p
                                    className={
                                        validarPoliticasContrasena().minuscula
                                            ? "politica-valida"
                                            : "politica-invalida"
                                    }
                                >
                                    {validarPoliticasContrasena().minuscula
                                        ? "✓"
                                        : "✗"}{" "}
                                    Una letra minúscula
                                </p>

                                <p
                                    className={
                                        validarPoliticasContrasena().numero
                                            ? "politica-valida"
                                            : "politica-invalida"
                                    }
                                >
                                    {validarPoliticasContrasena().numero
                                        ? "✓"
                                        : "✗"}{" "}
                                    Un número
                                </p>

                            </div>
                        )}

                    </div>

                    <div className="campo-contrasena">

                        <div className="campo-formulario">

                            <ShieldCheck size={20}/>

                            <input
                                type="password"
                                placeholder="Verificar contraseña"
                                value={verificarContrasena}
                                onChange={(e) => {

                                    const valor = e.target.value

                                    setVerificarContrasena(valor)

                                    validarCampo(
                                        "verificarContrasena",
                                        valor
                                    )
                                }}
                            />

                        </div>

                        {verificarContrasena !== "" && (

                            <p
                                className={
                                    validarCoincidenciaContrasena()
                                        ? "politica-valida"
                                        : "politica-invalida"
                                }
                            >
                                {validarCoincidenciaContrasena()
                                    ? "✓"
                                    : "✗"}{" "}
                                Las contraseñas coinciden
                            </p>

                        )}

                    </div>

                    <div className="grupo-checkbox">

                        <label>

                            <input
                                type="checkbox"
                                checked={aceptaTerminos}
                                onChange={(e) => {

                                    const valor = e.target.checked

                                    setAceptaTerminos(valor)

                                    validarCampo(
                                        "aceptaTerminos",
                                        valor
                                    )
                                }}
                            />

                            Acepto los términos y condiciones

                        </label>

                        {errores.aceptaTerminos && (
                            <p className="mensaje-error">
                                {errores.aceptaTerminos}
                            </p>
                        )}

                    </div>

                    <button type="submit">
                        Registrarse
                    </button>

                </form>

            </div>
        </>
    )
}

export default FormularioRegistro