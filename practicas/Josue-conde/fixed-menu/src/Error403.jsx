import { Link } from "react-router-dom";
import "./Error403.css";

function Error403() {

    return (

        <div className="error403">

            <div className="error403-card">

                <div className="error403-icon">
                    🔒
                </div>

                <span className="error403-code">
                    ERROR 403
                </span>

                <h1>
                    Acceso denegado
                </h1>

                <p>
                    No tienes autorización para acceder a esta página.
                    Inicia sesión para continuar.
                </p>

                <div className="error403-buttons">

                    <Link
                        to="/login"
                        className="error403-login"
                    >
                        Iniciar sesión
                    </Link>

                    <Link
                        to="/"
                        className="error403-home"
                    >
                        Volver al inicio
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Error403;