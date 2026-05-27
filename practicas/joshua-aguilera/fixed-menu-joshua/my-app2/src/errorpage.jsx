function ErrorPage({ onBack }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.tag}>404</span>
          <div style={styles.status}>Página no encontrada</div>
        </div>

        <p style={styles.description}>
          Lo sentimos, el recurso que buscas no está disponible. Es posible que
          la ruta sea incorrecta o que este contenido ya no exista.
        </p>

        <p style={styles.description}>
          Vuelve a la página principal para continuar navegando desde un punto
          seguro.
        </p>

        <button
          style={styles.button}
          onClick={onBack || (() => (window.location.hash = "#inicio"))}
        >
          Regresar a la pagina principal
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
    background: "linear-gradient(135deg, #11131a 0%, #0b0d12 42%, #11151b 100%)",
    color: "#e5e9f0",
    padding: "30px",
  },

  card: {
    width: "100%",
    maxWidth: "580px",
    padding: "40px 42px",
    backgroundColor: "#161b24",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "26px",
    boxShadow: "0 40px 120px rgba(0, 0, 0, 0.28)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "22px",
  },

  tag: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    backgroundColor: "#ff3b5c",
    color: "white",
    fontSize: "28px",
    fontWeight: 700,
    boxShadow: "0 14px 30px rgba(255, 59, 92, 0.24)",
  },

  status: {
    fontSize: "26px",
    color: "#f4f7ff",
    fontWeight: 700,
    lineHeight: "1.2",
  },

  description: {
    margin: "0 0 16px",
    color: "#b8c2d7",
    fontSize: "16px",
    lineHeight: "1.8",
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
    marginTop: "12px",
    padding: "14px 28px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#ff3b5c",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 16px 36px rgba(255, 59, 92, 0.22)",
  },
};

export default ErrorPage;