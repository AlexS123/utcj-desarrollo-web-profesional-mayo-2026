import React, { useState, useEffect } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: '', title: '', message: '' });

  useEffect(() => {
    if (!modal.open) return;

    const timer = window.setTimeout(() => {
      setModal((prev) => ({ ...prev, open: false }));
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [modal.open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (type, title, message) => {
    setModal({ open: true, type, title, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      openModal('error', 'Falta completar', 'Completa todos los campos antes de iniciar sesión.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || data.error || 'No se pudo iniciar sesión.');
      }

      localStorage.setItem('app_token', data.token);
      openModal('success', '¡Bienvenido!', 'Inicio de sesión exitoso. Token guardado en localStorage.');
      setFormData({ username: '', password: '' });
    } catch (error) {
      openModal('error', 'Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-panel register-panel--highlight">
          <div className="register-icon">🔐</div>
          <h1>Iniciar sesión</h1>
          <p>Ingresa tu usuario y contraseña para acceder al sistema.</p>
          <div className="register-highlight-box">
            <p className="register-highlight-title">¿Qué incluye?</p>
            <ul>
              <li>• Autenticación mediante JWT</li>
              <li>• Validación de usuario y contraseña</li>
              <li>• Token guardado en el navegador</li>
            </ul>
          </div>
        </div>

        <div className="register-panel register-panel--form">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-field">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>

      {modal.open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className={`modal-card ${modal.type === 'success' ? 'modal-card--success' : 'modal-card--error'}`}>
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
