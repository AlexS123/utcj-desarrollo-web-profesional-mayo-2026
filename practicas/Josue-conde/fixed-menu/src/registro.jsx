import { useState } from "react";
import { Link } from "react-router-dom";
import "./Registro.css";

function Registro() {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const registrar = async (e) => {

        e.preventDefault();

        setMensaje("");

        if (!user || !pass || !rol) {
            setTipoMensaje("error");
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        try {

            const respuesta = await fetch("http://localhost:5000/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user,
                    pass,
                    rol
                })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {

                setTipoMensaje("success");
                setMensaje("✅ Usuario registrado correctamente.");

                setUser("");
                setPass("");
                setRol("");

            } else {

                setTipoMensaje("error");
                setMensaje(data.error || data.mensaje || "Ocurrió un error.");

            }

        } catch (error) {

            console.error(error);

            setTipoMensaje("error");
            setMensaje("❌ No fue posible conectar con el servidor.");

        }

    };

    return (

        <div className="registro-container">

            <div className="registro-card">

                <h1>Registro de Usuarios</h1>

                <p className="descripcion">
                    Completa la siguiente información para registrar un nuevo usuario.
                </p>

                <form onSubmit={registrar}>

                    <div className="input-group">

                        <label>Usuario</label>

                        <input
                            type="text"
                            placeholder="Ingrese el usuario"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="Ingrese la contraseña"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Rol</label>

                        <input
                            type="text"
                            placeholder="Ejemplo: admin"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        />

                    </div>

                    <button className="btn-registrar" type="submit">
                        Registrar Usuario
                    </button>

                </form>

                {mensaje && (
                    <p className={`mensaje ${tipoMensaje}`}>
                        {mensaje}
                    </p>
                )}

                <Link to="/" className="btn-volver">
                    ← Volver al inicio
                </Link>

            </div>

        </div>

    );
}

export default Registro;