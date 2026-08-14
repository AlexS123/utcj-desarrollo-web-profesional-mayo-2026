import { API_URL, getToken } from './auth';

const OFFLINE_MSG =
  'No se pudo conectar al servidor. Verifica que el backend esté corriendo en ' + API_URL;

async function request(path, options = {}) {
  const token = getToken();

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (e) {
    throw new Error(OFFLINE_MSG);
  }

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const msg = (data && (data.mensaje || data.error)) || `Error ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export function fetchUsers() {
  return request('/consultarUsuarios').then((data) => (Array.isArray(data) ? data : []));
}

export function updateUserRole(id, rol) {
  return request(`/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ rol }),
  });
}

export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' });
}

export function userId(user) {
  return user._id || user.id;
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function roleClass(rol) {
  const role = String(rol || '').toLowerCase();
  if (role === 'root') return 'badge badge--root';
  if (role === 'admin') return 'badge badge--admin';
  return 'badge badge--user';
}
