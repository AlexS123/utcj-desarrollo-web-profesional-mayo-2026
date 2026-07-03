import { useState } from "react"

import "./FormularioRegistro.css"
import "./ToastError.css"
import Menu from "./Menu"
import ToastError from "./ToastError"

function FormularioRegistro() {

    const [correo, setCorreo] = useState("")
    const [edad, setEdad] = useState("")
    const [sexo, setSexo] = useState("")
    const [aceptaTerminos, setAceptaTerminos] = useState(false)
    const [telefono, setTelefono] = useState("")
    const [contrasena, setContrasena] = useState("")

    const [mensajeError, setMensajeError] = useState("")
    const [mostrarError, setMostrarError] = useState(false)

    function mostrarToast(mensaje) {

        setMensajeError(mensaje)
        setMostrarError(true)
    }

    function validarFormulario(evento) {

        evento.preventDefault()

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Formato básico de correo electrónico

        const regexTelefono = /^[0-9]{10}$/ // Número de 10 dígitos

        const regexEdad = /^[0-9]{1,3}$/ //Edad de entre 1 y 3 dígitos

        const regexContrasena = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/ //Contraseña con mayúscula, minúscula, número y mínimo 8 caracteres

        let errores = []

        if (!regexCorreo.test(correo)) {
            errores.push("• El correo electrónico no es válido.")
        }

        if (!regexEdad.test(edad)) {
            errores.push("• La edad debe ser numérica.")
        }

        if (!regexTelefono.test(telefono)) {
            errores.push("• El teléfono debe contener exactamente 10 dígitos.")
        }

        if (!regexContrasena.test(contrasena)) {
            errores.push("• La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.")
        }

        if (sexo === "") {
            errores.push("• Debe seleccionar un sexo.")
        }

        if (!aceptaTerminos) {
            errores.push("• Debe aceptar los términos y condiciones.")
        }

        if (errores.length > 0) {
            mostrarToast(errores.join("\n"))
            return
        }

        alert("Registro exitoso")
    }

    return (
        <>
            <Menu />

            <ToastError
                mensaje={mensajeError}
                visible={mostrarError}
                cerrar={() => setMostrarError(false)}
            />

            <div className="contenedor-formulario">

                <form className="formulario" onSubmit={validarFormulario}>
                    <h1>Registro de Usuario</h1>

                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />

                    <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
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

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) =>
                            setContrasena(e.target.value)
                        }
                    />

                    <div className="grupo-checkbox">

                        <label>
                            <input
                                type="checkbox"
                                checked={aceptaTerminos}
                                onChange={(e) =>
                                    setAceptaTerminos(
                                        e.target.checked
                                    )
                                }
                            />
                            Acepto los términos y condiciones
                        </label>

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