function Menu({ cambiarPagina }) {

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
                gap: "20px"
            }}
        >

            <button
                onClick={() => cambiarPagina("inicio")}
                style={{
                    backgroundColor: "gold",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Inicio
            </button>

            <button
                onClick={() => cambiarPagina("productos")}
                style={{
                    backgroundColor: "gold",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Productos
            </button>

            <button
                onClick={() => cambiarPagina("contacto")}
                style={{
                    backgroundColor: "gold",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Contacto
            </button>

        </nav>

    );

}

export default Menu;