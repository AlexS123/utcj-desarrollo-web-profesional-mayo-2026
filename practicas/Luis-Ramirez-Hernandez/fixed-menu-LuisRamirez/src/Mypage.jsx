import { useState } from "react";
import Menu from "./components/Menu";

function Mypage() {

    const [pagina, setPagina] = useState("inicio");

    return (

        <>

            <Menu cambiarPagina={setPagina} />

            <div
                style={{
                    marginTop: "100px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    textAlign: "center",
                    lineHeight: "1.8"
                }}
            >

                {pagina === "inicio" && (
                    <>
                        <h1>Pagina de Inicio</h1>

                        <p>Bienvenido a mi pagina web 😎</p>

                        <p>
                            Este contenido es para probar que el menu
                            permanezca fijo mientras haces scroll.
                        </p>

                        <p>
                            Sigue bajando y revisa si el menu se queda arriba.
                        </p>

                        <h2>Contenido largo</h2>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </>
                )}

                {pagina === "productos" && (
                    <>
                        <h1>Productos</h1>

                        <p>Aqui van los productos 🚗</p>

                        <p>Producto 1</p>
                        <p>Producto 2</p>
                        <p>Producto 3</p>
                        <p>Producto 4</p>
                        <p>Producto 5</p>
                        <p>Producto 6</p>
                        <p>Producto 7</p>
                        <p>Producto 8</p>
                        <p>Producto 9</p>
                        <p>Producto 10</p>
                    </>
                )}

                {pagina === "contacto" && (
                    <>
                        <h1>Contacto</h1>

                        <p>Contacto de la empresa 📞</p>

                        <p>Telefono: 271-000-0000</p>
                        <p>Correo: contacto@gmail.com</p>
                        <p>Direccion: Veracruz, Mexico</p>
                    </>
                )}

            </div>

        </>

    );

}

export default Mypage;