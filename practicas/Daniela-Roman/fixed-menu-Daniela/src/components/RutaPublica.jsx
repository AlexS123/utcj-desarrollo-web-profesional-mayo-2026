import { Navigate } from "react-router-dom";
import { obtenerUsuario } from "../logic/auth";

function RutaPublica({ children }) {
  const usuario = obtenerUsuario();

  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaPublica;
