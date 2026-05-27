import { Link } from "react-router-dom";

function Menu() {

    return (

        <nav
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                zIndex: "1000",
                backgroundColor: "#111",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.5)"
            }}
        >

            <Link to="/">
                <button
                    style={{
                        backgroundColor: "#FFD700",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Inicio
                </button>
            </Link>

            <Link to="/productos">
                <button
                    style={{
                        backgroundColor: "#FFD700",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Productos
                </button>
            </Link>

            <Link to="/contacto">
                <button
                    style={{
                        backgroundColor: "#FFD700",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Contacto
                </button>
            </Link>

        </nav>

    );

}

export default Menu;