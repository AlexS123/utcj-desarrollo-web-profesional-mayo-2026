import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './components/Icon.jsx';
import { API_URL } from './auth';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ user: '', pass: '', rol: 'user' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: '', title: '', message: '' });

  useEffect(() => {
    if (!modal.open) return;
    const timer = window.setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 2400);
    return () => window.clearTimeout(timer);
  }, [modal.open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (type, title, message) => setModal({ open: true, type, title, message });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user.trim() || !formData.pass.trim()) {
      openModal('error', 'Falta completar', 'Completa todos los campos antes de crear el usuario.');
      return;
    }

    if (formData.pass.length < 6) {
      openModal('error', 'Contraseña corta', 'Usa al menos 6 caracteres para la contraseña.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: formData.user.trim(),
          pass: formData.pass,
          rol: formData.rol,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.mensaje || 'No se pudo crear el usuario.');
      }

      openModal('success', '¡Listo!', `Usuario creado correctamente: ${data.user}`);
      setFormData({ user: '', pass: '', rol: 'user' });
      window.setTimeout(() => navigate('/login'), 1600);
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
            <Icon name="userPlus" size={26} />
          </div>
          <h1>Crea tu cuenta</h1>
          <p>Únete a la comunidad para seguir juegos, torneos y escuadras.</p>

          <div className="register-highlight-box">
            <p className="register-highlight-title">¿Qué obtienes?</p>
            <ul>
              <li>· Catálogo completo de juegos</li>
              <li>· Inscripción a torneos abiertos</li>
              <li>· Contraseña cifrada con bcrypt</li>
            </ul>
          </div>
        </div>

        <div className="register-panel register-panel--form">
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Registro</h2>

            <div className="register-field">
              <label htmlFor="user">Usuario</label>
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="username"
                value={formData.user}
                onChange={handleChange}
                placeholder="Ej. sebastian"
              />
            </div>

            <div className="register-field">
              <label htmlFor="pass">Contraseña</label>
              <input
                id="pass"
                name="pass"
                type="password"
                autoComplete="new-password"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="register-field">
              <label htmlFor="rol">Rol</label>
              <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <span className="field-hint">El rol admin habilita el panel de administración.</span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear usuario'}
            </button>

            <p className="auth-switch">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
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

export default Register;
