import { useState } from "react";
import Menu from "./components/Menu";

function Mypage() {

    const [pagina, setPagina] = useState("inicio");

    return (

        <>

            <Menu cambiarPagina={setPagina} />

            <div
                style={{
                    padding: "40px",
                    textAlign: "center"
                }}
            >

                {pagina === "inicio" && (
                    <>
                        <h1>Pagina de Inicio</h1>
                        <p>Bienvenido a mi pagina web 😎</p>
                    </>
                )}

                {pagina === "productos" && (
                    <>
                        <h1>Productos</h1>
                        <p>Aqui van los productos 🚗</p>
                    </>
                )}

                {pagina === "contacto" && (
                    <>
                        <h1>Contacto</h1>
                        <p>Contacto de la empresa 📞</p>
                    </>
                )}

            </div>

        </>

    );

}

export default Mypage;