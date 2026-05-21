function MyPage() {
  return (
    <div>
      {/* MENÚ */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>UTCJ</h2>

        <ul style={styles.menu}>
          <li>
            <a href="#inicio" style={styles.link}>Inicio</a>
          </li>

          <li>
            <a href="#servicios" style={styles.link}>Servicios</a>
          </li>

          <li>
            <a href="#nosotros" style={styles.link}>Nosotros</a>
          </li>

          <li>
            <a href="#galeria" style={styles.link}>Galería</a>
          </li>

          <li>
            <a href="#contacto" style={styles.link}>Contacto</a>
          </li>
        </ul>
      </nav>

      {/* INICIO */}
      <section id="inicio" style={styles.section}>
        <h1>Universidad Tecnológica de Ciudad Juárez</h1>

        <p>
          Bienvenido al sistema web de Diego Abel Perez Montes.
        </p>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={styles.section2}>
        <h1>Servicios</h1>

        <p>Desarrollo Web</p>
        <p>Aplicaciones Móviles</p>
        <p>Redes y Ciberseguridad</p>
        <p>Bases de Datos SQL y NoSQL</p>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={styles.section}>
        <h1>Nosotros</h1>

        <p>
          Proyecto desarrollado en React con Vite.
        </p>
      </section>

      {/* GALERÍA */}
      <section id="galeria" style={styles.section2}>
        <h1>Galería</h1>

        <p>
          Aquí después podrás agregar imágenes, tarjetas o proyectos.
        </p>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={styles.section}>
        <h1>Contacto</h1>

        <p>Correo: ejemplo@correo.com</p>
        <p>Teléfono: 656-000-0000</p>
      </section>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    backgroundColor: "#111",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    color: "#00bfff",
  },

  menu: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    transition: "0.3s",





    
  },

  section: {
    height: "100vh",
    paddingTop: "100px",
    paddingLeft: "40px",
    backgroundColor: "#f4f4f4",
  },

  section2: {
    height: "100vh",
    paddingTop: "100px",
    paddingLeft: "40px",
    backgroundColor: "#dcdcdc",
  },
};

export default MyPage;