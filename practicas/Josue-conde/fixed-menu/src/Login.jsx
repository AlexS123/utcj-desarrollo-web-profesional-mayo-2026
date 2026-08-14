import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const iniciarSesion = async (e) => {

        e.preventDefault();

        setMensaje("");

        if (!user || !pass) {

            setTipoMensaje("error");
            setMensaje("Todos los campos son obligatorios.");
            return;

        }

        try {

            const respuesta = await fetch("http://localhost:5000/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    user,
                    pass

                })

            });

            const data = await respuesta.json();

            if (respuesta.ok) {

                localStorage.setItem("token", data.token);

                setTipoMensaje("success");
                setMensaje("Autenticacion exitosa");

                setUser("");
                setPass("");

                setTimeout(() => {

                    navigate("/dashboard");

                }, 1000);

            }

            else {

                setTipoMensaje("error");
                setMensaje(data.mensaje || "Usuario o contraseña incorrectos.");

            }

        }

        catch (error) {

            console.error(error);

            setTipoMensaje("error");
            setMensaje("No fue posible conectar con el servidor.");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo-login">
                    🔐
                </div>

                <h1>Iniciar Sesión</h1>

                <p className="descripcion">

                    Bienvenido nuevamente.
                    <br />
                    Ingresa tus credenciales para acceder.

                </p>

                <form onSubmit={iniciarSesion}>

                    <div className="input-group">

                        <label>Usuario</label>

                        <input

                            type="text"

                            placeholder="Ingrese su usuario"

                            value={user}

                            onChange={(e) => setUser(e.target.value)}

                        />

                    </div>

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input

                            type="password"

                            placeholder="Ingrese su contraseña"

                            value={pass}

                            onChange={(e) => setPass(e.target.value)}

                        />

                    </div>

                    <button
                        type="submit"
                        className="btn-login"
                    >

                        Iniciar Sesión

                    </button>

                </form>

                {

                    mensaje && (

                        <p className={`mensaje ${tipoMensaje}`}>

                            {mensaje}

                        </p>

                    )

                }

                <Link
                    to="/"
                    className="volver"
                >

                    ← Volver al inicio

                </Link>

                <Link
                    to="/registro"
                    className="volver"
                >

                    ¿No tienes una cuenta? Regístrate

                </Link>

            </div>

        </div>

    );

}

export default Login;