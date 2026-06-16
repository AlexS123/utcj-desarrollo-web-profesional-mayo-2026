function MyPage() {
  return (
    <div>
      {/* MENÚ */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>AutoMax</h2>

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
        <h1>Agencia AutoMax</h1>

        <p>
          Bienvenido a AutoMax, tu mejor opción para encontrar vehículos nuevos y seminuevos con los mejores precios del mercado.
        </p>

        <p>
          Contamos con una amplia variedad de automóviles para todas las necesidades y presupuestos.
        </p>
      </section>
      {/* SERVICIOS */}
      <section id="servicios" style={styles.section2}>
        <h1>Servicios</h1>

        <p>🚗 Venta de vehículos nuevos y seminuevos</p>
        <p>💰 Financiamiento automotriz</p>
        <p>🔧 Mantenimiento preventivo y correctivo</p>
        <p>🛡️ Garantías extendidas</p>
        <p>📋 Trámites de placas y documentación</p>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={styles.section}>
        <h1>Nosotros</h1>

        <p>
          AutoMax es una agencia dedicada a ofrecer vehículos de calidad y un excelente servicio al cliente.
        </p>

        <p>
          Nuestro objetivo es ayudar a nuestros clientes a encontrar el automóvil ideal mediante asesoría profesional y opciones de financiamiento accesibles.
        </p>
      </section>

      {/* GALERÍA */}
      <section id="galeria" style={styles.section2}>
        <h1>Catálogo de Vehículos</h1>

        <p>🚗 Nissan Versa 2025</p>
        <p>🚙 Toyota RAV4</p>
        <p>🏎️ Mazda 3 Sport</p>
        <p>🚘 Honda Civic Touring</p>
        <p>🚐 Chevrolet Captiva</p>
        <p>🚚 Ford Ranger</p>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={styles.section}>
        <h1>Contacto</h1>

        <p>📧 contacto@automax.com</p>
        <p>📞 (656) 123-4567</p>
        <p>📍 Ciudad Juárez, Chihuahua, México</p>

        <p>
          Horario de atención: Lunes a Viernes de 9:00 AM a 6:00 PM.
        </p>
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
  },

  section: {
    height: "100vh",
    paddingTop: "100px",
    paddingLeft: "40px",
    paddingRight: "40px",
    backgroundColor: "#f4f4f4",
  },

  section2: {
    height: "100vh",
    paddingTop: "100px",
    paddingLeft: "40px",
    paddingRight: "40px",
    backgroundColor: "#dcdcdc",
  },
};

export default MyPage;