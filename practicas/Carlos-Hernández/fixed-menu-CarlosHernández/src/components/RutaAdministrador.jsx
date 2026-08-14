import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../logic/auth";

function RutaAdministrador({ children }) {

    const [verificando, setVerificando] = useState(true);
    const [autorizado, setAutorizado] = useState(false);
    const [redireccion, setRedireccion] = useState(null);


    useEffect(() => {

        const verificarSesion = async () => {
            try {

                const respuesta = await fetch(
                    "http://localhost:5000/sesion",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const datos = await respuesta.json();

                // No existe sesión
                if (respuesta.status === 401) {

                    setRedireccion(
                        <Navigate
                            to="/login"
                            replace
                            state={{
                                mensaje:
                                    "Debes iniciar sesión para acceder a esta sección."
                            }}
                        />
                    );

                    return;
                }


                // Existe sesión pero no es administrador
                if (respuesta.status === 403) {

                    setRedireccion(
                        <Navigate
                            to="/"
                            replace
                            state={{
                                mensaje: datos.mensaje,
                                tipo: "sinPermisos"
                            }}
                        />
                    );

                    return;
                }


                // Sesión válida y administrador
                if (respuesta.ok) {

                    if (datos.usuario.rol === "admin") {

                        setAutorizado(true);

                    } else {
                        setRedireccion(
                            <Navigate
                                to="/"
                                replace
                                state={{
                                    mensaje:
                                        "No tienes permisos para acceder a la sección de administración."
                                }}
                            />
                        );
                    }
                }

            } catch (error) {

                console.error(
                    "Error al verificar la sesión:",
                    error
                );

                setRedireccion(
                    <Navigate
                        to="/login"
                        replace
                        state={{
                            mensaje:
                                "No fue posible verificar tu sesión."
                        }}
                    />
                );

            } finally {

                setVerificando(false);

            }

        };


        verificarSesion();

    }, []);


    // Mientras el backend verifica la cookie
    if (verificando) {

        return null;

    }


    // Si hubo que redireccionar
    if (redireccion) {

        return redireccion;

    }


    // Si es administrador
    if (autorizado) {

        return children;

    }


    return null;
}

export default RutaAdministrador;