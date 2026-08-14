import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Usuarios.css";

function Usuarios() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        // No hay token
        if (!token) {

            navigate("/403");

            return;

        }

        try {

            const datos = jwtDecode(token);

            // No es administrador
            if (datos.rol !== "admin") {

                navigate("/403");

                return;

            }

        } catch (error) {

            localStorage.removeItem("token");

            navigate("/403");

            return;

        }


        // Consultar usuarios
        fetch("http://localhost:5000/consultarUsuarios", {

            method: "GET",

            headers: {

                Authorization: `Bearer ${token}`

            }

        })

        .then(async response => {

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.mensaje || "No tienes autorización"
                );

            }

            return data;

        })

        .then(data => {

            setUsuarios(data.usuarios);

            setCargando(false);

        })

        .catch(error => {

            console.error(error);

            setError(error.message);

            setCargando(false);

        });

    }, [navigate]);


    return (

        <div className="usuarios-page">

            <div className="usuarios-header">

                <div>

                    <p>ADMINISTRACIÓN</p>

                    <h1>
                        Usuarios
                    </h1>

                    <span>
                        Usuarios registrados en MiSitio
                    </span>

                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="btn-volver"
                >
                    ← Dashboard
                </button>

            </div>


            {cargando && (

                <div className="usuarios-mensaje">
                    Cargando usuarios...
                </div>

            )}


            {error && (

                <div className="usuarios-error">
                    {error}
                </div>

            )}


            {!cargando && !error && (

                <div className="usuarios-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Usuario
                                </th>

                                <th>
                                    Rol
                                </th>

                                <th>
                                    Estado
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {usuarios.map(usuario => (

                                <tr key={usuario._id}>

                                    <td>
                                        {usuario.user}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                usuario.rol === "admin"
                                                    ? "rol-admin"
                                                    : "rol-usuario"
                                            }
                                        >
                                            {usuario.rol}
                                        </span>

                                    </td>

                                    <td>
                                        <span className="estado-activo">
                                            Activo
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

export default Usuarios;