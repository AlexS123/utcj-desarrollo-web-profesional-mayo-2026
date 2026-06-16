import Menu from "./Menu"

function MyPage() {

    return (
        <>
            <Menu />

            <div className="main">

                <h1>Menú persistente</h1>

                <h2>Scrollea el contenido</h2>

                <h2>
                    El menú persistirá en la parte superior aunque se scrollee
                </h2>

            </div>
        </>
    )
}

export default MyPage