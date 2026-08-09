// Guarda el token de sesión
export function guardarToken(token) {
  localStorage.setItem("token", token);
}

// Obtiene el token guardado
export function obtenerToken() {
  return localStorage.getItem("token");
}

// Decodifica correctamente el payload del JWT
export function obtenerUsuario() {
  const token = obtenerToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const binario = atob(base64);

    const bytes = Uint8Array.from(
      binario,
      caracter => caracter.charCodeAt(0)
    );

    const texto = new TextDecoder("utf-8").decode(bytes);

    return JSON.parse(texto);

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

// Verifica si existe una sesión
export function estaAutenticado() {
  return obtenerToken() !== null;
}

// Cierra la sesión
export function cerrarSesion() {
  localStorage.removeItem("token");
}