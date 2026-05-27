function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>

        <h2 style={styles.title}>Error crítico: recurso no disponible</h2>

        <p style={styles.text}>
          No se pudo localizar la página solicitada. Esto puede deberse a una
          ruta incorrecta o a que el contenido fue removido.
        </p>

        <p style={styles.text}>
          Si el problema persiste, revisa la dirección ingresada o regresa al
          inicio para continuar desde un punto seguro.
        </p>

        <button
          style={styles.button}
          onClick={() => window.location.href = "/"}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f1115 0%, #181c23 55%, #11151b 100%)",
    color: "#e6e8ef",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "560px",
    padding: "38px 36px",
    backgroundColor: "#141a22",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.25)",
  },

  code: {
    fontSize: "128px",
    lineHeight: "1",
    margin: "0 0 12px",
    color: "#ff3850",
    letterSpacing: "-2px",
  },

  title: {
    fontSize: "28px",
    margin: "0 0 18px",
    color: "#ffffff",
    fontWeight: 600,
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.8",
    margin: "0 0 14px",
    color: "#c8cee0",
  },

  button: {
    marginTop: "24px",
    padding: "14px 28px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#ff3850",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
    boxShadow: "0 14px 32px rgba(255, 56, 80, 0.22)",
  },
};

export default ErrorPage;