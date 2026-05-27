function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>

      <h2>Servicio no disponible</h2>

      <p>
        La página que buscas no se encuentra disponible
      </p>

      <p>
        Regresa al inicio
      </p>

      <button
        style={styles.button}
        onClick={() => window.location.href = "/"}
      >
        Regresar a AutoMax
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "white",
    textAlign: "center",
  },

  code: {
    fontSize: "150px",
    margin: 0,
    color: "#ff0026",
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#00bfff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ErrorPage;
