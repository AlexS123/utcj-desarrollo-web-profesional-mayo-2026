import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './components/Icon.jsx';
import { API_URL } from './auth';
import { resetUserCache } from './useCurrentUser';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: '', title: '', message: '' });

  useEffect(() => {
    if (!modal.open) return;
    const timer = window.setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 2200);
    return () => window.clearTimeout(timer);
  }, [modal.open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (type, title, message) => setModal({ open: true, type, title, message });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      openModal('error', 'Falta completar', 'Completa todos los campos antes de iniciar sesión.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || data.error || 'No se pudo iniciar sesión.');
      }

      localStorage.setItem('app_token', data.token);
      localStorage.setItem('app_user', formData.username.trim());
      resetUserCache();

      openModal('success', 'Correcto', data.mensaje || 'Inicio de sesión exitoso.');
      setFormData({ username: '', password: '' });
      window.setTimeout(() => navigate('/', { replace: true }), 1000);
    } catch (error) {
      const msg =
        error && typeof error.message === 'string' && error.message.toLowerCase().includes('failed to fetch')
          ? `No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo en ${API_URL}`
          : error.message || 'Error desconocido';

      openModal('error', 'Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-panel register-panel--highlight">
          <Link to="/login" className="brand" style={{ marginBottom: '1.6rem' }}>
            <span className="brand-mark">
              <Icon name="bolt" size={20} />
            </span>
            <span className="brand-text">VortiTech</span>
          </Link>

          <div className="register-icon">
            <Icon name="key" size={26} />
          </div>
          <h1>Bienvenid@ de vuelta</h1>
          <p>Ingresa tu usuario y contraseña para volver a la plataforma.</p>

          <div className="register-highlight-box">
            <p className="register-highlight-title">Tu sesión incluye</p>
            <ul>
              <li>· Autenticación mediante JWT</li>
              <li>· Token con expiración de 2 horas</li>
              <li>· Acceso según tu rol de usuario</li>
            </ul>
          </div>
        </div>

        <div className="register-panel register-panel--form">
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Iniciar sesión</h2>

            <div className="register-field">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ej. admin"
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>

            <p className="auth-switch">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </form>
        </div>
      </div>

      {modal.open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div
            className={`modal-card ${modal.type === 'success' ? 'modal-card--success' : 'modal-card--error'}`}
          >
            <div className="modal-icon">{modal.type === 'success' ? '✓' : '!'}</div>
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <button type="button" onClick={() => setModal((prev) => ({ ...prev, open: false }))}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
