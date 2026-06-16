import Menu from "./components/Menu";

function Mypage() {

    return (

        <>

            <Menu />

            <div
                style={{
                    marginTop: "100px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    textAlign: "center",
                    lineHeight: "1.8",
                    color: "white"
                }}
            >

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

            </div>

        </>

    );

}

export default Mypage;