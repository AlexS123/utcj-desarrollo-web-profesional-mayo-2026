const API_URL = "http://localhost:5000";

export async function consultarUsuarios() {
  const respuesta = await fetch(`${API_URL}/consultarUsuarios`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });

  const datos = await respuesta.json();

  return { status: respuesta.status, datos };
}

export async function cambiarRol(id, rol) {
  const respuesta = await fetch(`${API_URL}/cambiarRol/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rol })
  });

  const datos = await respuesta.json();

  return { status: respuesta.status, datos };
}

export async function enviarContacto(form) {
  const respuesta = await fetch(`${API_URL}/contacto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const datos = await respuesta.json();

  return { status: respuesta.status, datos };
}
