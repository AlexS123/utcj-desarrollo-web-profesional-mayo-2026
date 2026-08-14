export const API_URL = 'http://localhost:5000';

export function getToken() {
  const token = localStorage.getItem('app_token');
  if (!token || token === 'undefined' || token === 'null') return null;
  return token;
}

export function hasToken() {
  return Boolean(getToken());
}

export async function verifyToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.usuario || null;
  } catch (e) {
    return null;
  }
}

// El backend usa 'role' en el JWT y 'rol' en Mongo: aceptamos ambos.
export function getRole(user) {
  if (!user) return '';
  return String(user.role || user.rol || '').toLowerCase();
}

export function isAdminRole(user) {
  const role = getRole(user);
  return role === 'root' || role === 'admin';
}

export function logout() {
  localStorage.removeItem('app_token');
  localStorage.removeItem('app_user');
}
