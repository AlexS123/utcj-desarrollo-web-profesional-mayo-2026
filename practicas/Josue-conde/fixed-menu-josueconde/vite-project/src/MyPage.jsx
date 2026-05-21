function MyPage() {
  return (
    <>
      <nav className="menu">
        <h2>Mi pagina</h2>

        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <section id="inicio" className="seccion">
        <h1>Inicio</h1>
        <p>Bienvenido</p>
      </section>

      <section id="servicios" className="seccion">
        <h1>Servicios</h1>
        <p>servicios</p>
      </section>

      <section id="contacto" className="seccion">
        <h1>Contacto</h1>
        <p>Información de contacto</p>
      </section>
    </>
  )
}

export default MyPage