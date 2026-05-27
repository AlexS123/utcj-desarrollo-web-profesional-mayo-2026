import './App.css'

function Mypage() {
  return (
    <>
      {/* MENU FIJO */}
      <header className="navbar">
        <h2 className="logo">Mi pagina usando fixed menu</h2>

        <nav>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#galeria">Galería</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#about">Acerca</a></li>
          </ul>
        </nav>
      </header>

      {/* SECCIONES */}
      <section id="inicio" className="section">
        <h1>Inicio</h1>
        <p>Bienvenido a mi página web que no sabia como se hacia profe Solis.</p>
      </section>

      <section id="servicios" className="section dark">
        <h1>Servicios</h1>
        <p>Los servicios que ofrecemos en la utcj son: desarrollo web, diseño gráfico y soporte técnico.</p>
      </section>

      <section id="galeria" className="section">
        <h1>Galería</h1>
        <p>Aqui es para colocar imagenes, proyectos y otros contenidos visuales.</p>
      </section>

      <section id="contacto" className="section dark">
        <h1>Contacto</h1>
        <p>Email: al22311801@utcj.edu.mx</p>
      </section>

      <section id="about" className="section">
        <h1>Acerca de</h1>
        <p>Página creada para la materia usando react y vite.</p>
      </section>
    </>
  )
}

export default Mypage