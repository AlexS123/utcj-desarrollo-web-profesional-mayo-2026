import { Link } from "react-router-dom";
import "./App.css";

function Error404() {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2>Página perdida en el espacio</h2>
      <p>La ruta que buscas no existe en esta galaxia.</p>
      <Link to="/" className="error-button">🚀 Regresar a la Tierra</Link>
    </div>
  );
}

export default Error404;