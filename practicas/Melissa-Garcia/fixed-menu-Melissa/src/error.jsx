import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={styles.page}>

      <main style={styles.mainContent}>

        <section style={styles.hero}>

          <h1 style={styles.errorCode}>404</h1>

          <h2 style={styles.title}>
            Página no encontrada
          </h2>

          <p style={styles.message}>
            Lo sentimos, la página que intentas visitar no existe
            o fue movida de lugar.
          </p>

          <Link to="/" style={styles.button}>
            Volver al inicio
          </Link>

        </section>

      </main>

    </div>
  );
}

const styles = {

  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f9ff",
    minHeight: "100vh",
  },

  mainContent: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },

  hero: {
    maxWidth: "900px",
    width: "100%",
    padding: "5rem 3rem",
    background: "linear-gradient(135deg, #ffebfa 0%, #ffebfa 100%)",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  errorCode: {
    fontSize: "9rem",
    color: "#003d99",
    fontWeight: "800",
    margin: "0",
    lineHeight: "1",
    marginBottom: "2rem",
  },

  title: {
    fontSize: "3rem",
    color: "#003d99",
    marginBottom: "1.5rem",
    fontWeight: "700",
  },

  message: {
    fontSize: "1.3rem",
    color: "#555",
    marginBottom: "3rem",
    lineHeight: "1.7",
  },

  button: {
    display: "inline-block",
    backgroundColor: "#0066cc",
    color: "white",
    padding: "15px 35px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    transition: "0.3s",
  },

};

export default ErrorPage;