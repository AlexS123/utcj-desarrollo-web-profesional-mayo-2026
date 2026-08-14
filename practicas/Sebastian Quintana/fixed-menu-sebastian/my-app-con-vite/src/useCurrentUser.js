import { useEffect, useState } from 'react';
import { verifyToken, getToken, isAdminRole } from './auth';

// Cache en memoria para no pedir /verify-token en cada cambio de página.
let cache = { token: null, user: null, promise: null };

export function resetUserCache() {
  cache = { token: null, user: null, promise: null };
}

function loadUser() {
  const token = getToken();

  if (!token) {
    resetUserCache();
    return Promise.resolve(null);
  }

  if (cache.token === token && cache.user) {
    return Promise.resolve(cache.user);
  }

  if (cache.token === token && cache.promise) {
    return cache.promise;
  }

  cache = {
    token,
    user: null,
    promise: verifyToken().then((user) => {
      if (cache.token === token) {
        cache.user = user;
        cache.promise = null;
      }
      return user;
    }),
  };

  return cache.promise;
}

/**
 * Devuelve { user, name, isAdmin, loading } del usuario autenticado.
 * `name` cae al valor guardado en localStorage mientras se verifica el token.
 */
export function useCurrentUser() {
  const [state, setState] = useState(() => ({
    user: cache.user,
    loading: !cache.user,
  }));

  useEffect(() => {
    let active = true;

    loadUser().then((user) => {
      if (active) setState({ user, loading: false });
    });

    return () => {
      active = false;
    };
  }, []);

  const storedName = localStorage.getItem('app_user') || '';
  const user = state.user;

  return {
    user,
    name: (user && (user.username || user.user)) || storedName,
    isAdmin: isAdminRole(user),
    loading: state.loading,
  };
}

export default useCurrentUser;
