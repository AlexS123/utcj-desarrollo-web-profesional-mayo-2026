function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>

      <h2 style={styles.title}>Servicio no disponible</h2>

      <p style={styles.text}>
        La página que buscas no se encuentra disponible
      </p>

      <p style={styles.textSecondary}>
        Regresa al inicio
      </p>

      <button
        style={styles.button}
        onClick={() => window.location.href = "/"}
      >
        Regresar a la página principal
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
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
    color: "white",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },

  code: {
    fontSize: "170px",
    margin: "0",
    fontWeight: "800",
    color: "#22d3ee",
    textShadow: "0 0 25px rgba(34,211,238,0.6)",
    letterSpacing: "8px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px",
    fontWeight: "600",
    fontFamily: "'Playfair Display', serif",
  },

  text: {
    fontSize: "20px",
    color: "#d1d5db",
    maxWidth: "550px",
    marginBottom: "8px",
    lineHeight: "1.7",
  },

  textSecondary: {
    fontSize: "18px",
    color: "#94a3b8",
    marginBottom: "25px",
  },

  button: {
    marginTop: "10px",
    padding: "14px 32px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg, #06b6d4, #3b82f6)",
    color: "white",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "600",
    fontFamily: "'Poppins', sans-serif",
    transition: "0.3s ease",
    boxShadow: "0 8px 25px rgba(59,130,246,0.35)",
  },
};

export default ErrorPage;