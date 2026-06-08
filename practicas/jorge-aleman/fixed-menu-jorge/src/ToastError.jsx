function ToastError({ mensaje, visible, cerrar }) {

    if (!visible) {
        return null
    }

    return (
        <div className="fondo-toast" onClick={cerrar}>
            <div className="toast-error">

                <h2>Error de validación</h2>

                <p>{mensaje}</p>

                <button onClick={cerrar}>
                    Aceptar
                </button>

            </div>
        </div>
    )
}

export default ToastError