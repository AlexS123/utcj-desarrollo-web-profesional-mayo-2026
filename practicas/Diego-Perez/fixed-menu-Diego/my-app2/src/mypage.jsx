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
      <h1 style={{ color: "black" }}>
  Universidad Tecnológica de Ciudad Juárez
</h1>

        <p>
          Mi pagina web: Diego Abel Perez Montes.
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
    height: "85px",

    background: "#111827",

    color: "#ffffff",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "0 45px",

    zIndex: 1000,

    borderBottom: "4px solid #f59e0b",

    boxShadow: "0 8px 25px rgba(0,0,0,.35)",
  },

  logo: {
    margin: 0,

    fontSize: "34px",

    color: "#0bf56d",

    fontFamily: "Georgia, serif",

    fontWeight: "bold",

    letterSpacing: "5px",

    textTransform: "uppercase",
  },

  menu: {
    display: "flex",

    gap: "18px",

    listStyle: "none",

    margin: 0,

    padding: 0,
  },

  link: {
    color: "#ffffff",

    textDecoration: "none",

    fontSize: "17px",

    fontFamily: "Verdana, sans-serif",

    fontWeight: "bold",

    padding: "12px 20px",

    borderRadius: "25px",

    backgroundColor: "#374151",

    border: "2px solid #4b5563",

    boxShadow: "0 4px 10px rgba(0,0,0,.25)",

    transition: "0.3s",
  },

  section: {
    height: "100vh",

    paddingTop: "130px",

    paddingLeft: "60px",

    background:
      "linear-gradient(135deg, #fff7ed, #fde68a)",

    color: "#1f2937",

    fontFamily: "Trebuchet MS, sans-serif",
  },

  section2: {
    height: "100vh",

    paddingTop: "130px",

    paddingLeft: "60px",

    background:
      "linear-gradient(135deg, #0f172a, #1e3a8a)",

    color: "#f8fafc",

    fontFamily: "Trebuchet MS, sans-serif",
  },

};
export default MyPage;
