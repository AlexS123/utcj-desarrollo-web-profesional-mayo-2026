function MyPage() {
  return (
    <div>
      {/* Menú fijo */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Mi Menú</h2>

        <ul style={styles.menu}>
          <li>Inicio</li>
          <li>Servicios</li>
          <li>Contacto</li>
        </ul>
      </nav>

      {/* Contenido */}
      <div style={styles.content}>
        <h1>Mi Página</h1>
        <p>
          Este contenido queda debajo del menú fijo.
        </p>

        <p>
          Baja para comprobar que el menú sigue arriba.
        </p>

        {/* Texto extra para scroll */}
        <div style={{ height: "1500px" }}></div>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#222",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    zIndex: 1000,
  },

  logo: {
    margin: 0,
  },

  menu: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  content: {
    marginTop: "80px",
    padding: "20px",
  },
};

export default MyPage;