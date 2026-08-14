// Guarda los datos públicos del usuario
export function guardarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Obtiene los datos del usuario
export function obtenerUsuario() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) return null;

  try {
    return JSON.parse(usuario);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
}

// Verifica si existen datos de usuario
export function estaAutenticado() {
  return localStorage.getItem("usuario") !== null;
}

// Cierra la sesión local
export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
