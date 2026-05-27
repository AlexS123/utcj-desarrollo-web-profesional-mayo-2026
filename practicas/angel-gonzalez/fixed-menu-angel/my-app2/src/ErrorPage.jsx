import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>

      <h2>Vehículo no encontrado</h2>

      <p>
        La página que buscas salió del concesionario o no existe.
      </p>

      <p>
        Regresa al inicio para seguir explorando nuestro catálogo.
      </p>

      <button
        style={styles.button}
        onClick={() => navigate("/")}
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
    color: "#00bfff",
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