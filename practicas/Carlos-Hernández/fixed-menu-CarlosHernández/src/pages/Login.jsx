import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { guardarUsuario } from "../logic/auth";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Login() {

    const location = useLocation();
    const navigate = useNavigate();

    const [mostrarModalAcceso, setMostrarModalAcceso] = useState(false);
    const [mensajeAcceso, setMensajeAcceso] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    useEffect(() => {

        if (location.state?.mensaje) {

            setMensajeAcceso(location.state.mensaje);
            setTipoMensaje(location.state.tipo || "");
            setMostrarModalAcceso(true);

            navigate(location.pathname, {
                replace: true,
                state: {}
            });
        }

    }, [location, navigate]);


    const [mensajeExito, setMensajeExito] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMensajeError("");
        setMensajeExito("");

        try {

            const respuesta = await fetch(
                "http://localhost:5000/login",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(form)
                }
            );


            const datos = await respuesta.json();


            if (!respuesta.ok) {

                setMensajeError(
                    datos.mensaje ||
                    "Correo o contraseña incorrectos."
                );

                setTimeout(() => {
                    setMensajeError("");
                }, 3000);

                return;
            }


            console.log("Login exitoso:", datos);

            guardarUsuario(datos.usuario);

            setMensajeExito(
                "Sesión iniciada correctamente."
            );


            setTimeout(() => {

                setMensajeExito("");

                navigate("/");

            }, 2000);


        } catch (error) {

            console.error(
                "Error al iniciar sesión:",
                error
            );

            setMensajeError(
                "No se pudo conectar con el servidor."
            );

            setTimeout(() => {

                setMensajeError("");

            }, 3000);

        }

    };


    return (
        <>

            {mensajeExito && (

                <div className="toastExito">
                    {mensajeExito}
                </div>

            )}


            {mensajeError && (

                <div className="toastError">
                    {mensajeError}
                </div>

            )}


            <Navbar />


            <div className="loginContainer">

                <div className="loginCard">

                    <h1>
                        Iniciar sesión
                    </h1>


                    <p>
                        Ingresa tus datos para acceder a AeroClima
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* CORREO */}

                        <div className="inputGroup">

                            <FaEnvelope />

                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* CONTRASEÑA */}

                        <div className="inputGroup">

                            <FaLock />

                            <input
                                type={
                                    mostrarPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />


                            {mostrarPassword ? (

                                <FaEyeSlash
                                    className="iconoPassword"
                                    onClick={() =>
                                        setMostrarPassword(false)
                                    }
                                />

                            ) : (

                                <FaEye
                                    className="iconoPassword"
                                    onClick={() =>
                                        setMostrarPassword(true)
                                    }
                                />

                            )}

                        </div>


                        <button type="submit">
                            Iniciar sesión
                        </button>

                    </form>


                    <p className="registroLink">

                        ¿No tienes una cuenta?

                        <Link to="/registro">
                            Crea una
                        </Link>

                    </p>

                </div>

            </div>


            <Footer />


            {/* MODAL ACCESO */}

            {mostrarModalAcceso && (

                <div className="modalAccesoOverlay">

                    <div className="modalAcceso">

                        <button
                            className="cerrarModalAcceso"
                            onClick={() =>
                                setMostrarModalAcceso(false)
                            }
                        >
                            ×
                        </button>


                        <div className="modalAccesoIcono">
                            !
                        </div>


                        <h2>
                            {tipoMensaje === "logout"
                                ? "Sesión cerrada"
                                : "Inicia sesión"}
                        </h2>

                        <p>
                            {mensajeAcceso}
                        </p>


                        <button
                            className="btnModalAcceso"
                            onClick={() =>
                                setMostrarModalAcceso(false)
                            }
                        >
                            Aceptar
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}

export default Login;