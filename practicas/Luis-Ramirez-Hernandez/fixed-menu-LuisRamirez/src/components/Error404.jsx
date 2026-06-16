import { Link } from "react-router-dom";

function Error404() {

    return (

        <div
            style={{
                background: "linear-gradient(135deg, #141E30, #243B55)",
                color: "white",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                overflow: "hidden"
            }}
        >

            <h1
                style={{
                    fontSize: "180px",
                    margin: "0",
                    lineHeight: "1",
                    color: "#00E5FF",
                    textShadow: "0px 0px 25px rgba(0,229,255,0.8)"
                }}
            >
                404
            </h1>

            <h2
                style={{
                    fontSize: "45px",
                    marginTop: "10px",
                    marginBottom: "15px",
                    color: "#FFFFFF"
                }}
            >
                Pagina no encontrada
            </h2>

            <p
                style={{
                    fontSize: "20px",
                    maxWidth: "600px",
                    color: "#D6E4F0",
                    marginBottom: "35px"
                }}
            >
                La ruta que intentaste abrir no existe,
                fue eliminada o movida a otra ubicacion.
            </p>

            <Link to="/">

                <button
                    style={{
                        background: "linear-gradient(90deg, #00E5FF, #00B8D4)",
                        color: "#000",
                        border: "none",
                        padding: "16px 35px",
                        borderRadius: "15px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "18px",
                        transition: "0.3s",
                        boxShadow: "0px 0px 20px rgba(0,229,255,0.6)"
                    }}
                >
                    Volver al inicio
                </button>

            </Link>

        </div>

    );

}

export default Error404;