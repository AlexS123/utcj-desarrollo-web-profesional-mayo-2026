import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    pass: '',
    rol: 'User'
  });

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: '',
    title: '',
    message: ''
  });

  useEffect(() => {

    if (!modal.open) return;

    const timer = window.setTimeout(() => {
      setModal((prev) => ({ ...prev, open: false }));
    }, 2200);

    return () => window.clearTimeout(timer);

  }, [modal.open]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const openModal = (type, title, message) => {

    setModal({
      open: true,
      type,
      title,
      message
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.user.trim() || !formData.pass.trim() || !formData.rol) {

      openModal(
        'error',
        'Falta completar',
        'Completa todos los campos antes de crear el usuario.'
      );

      return;

    }

    setLoading(true);

    try {

      const response = await fetch('http://127.0.0.1:5000/registrar', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          user: formData.user.trim(),
          pass: formData.pass,
          rol: formData.rol
        })

      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.error || data.mensaje || 'No se pudo crear el usuario.'
        );

      }

      openModal(
        'success',
        '¡Listo!',
        'Usuario creado correctamente.'
      );

      setFormData({
        user: '',
        pass: '',
        rol: 'User'
      });

    } catch (error) {

      openModal(
        'error',
        'Error',
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-container">

      <div className="register-panel register-panel--info">

        <h1>✦ Crea tu usuario</h1>

        <p>
          Nueva interfaz con un flujo más claro y un manejo más sencillo del registro.
        </p>

        <h3>¿Qué incluye?</h3>

        <ul>
          <li>• Usuario y contraseña</li>
          <li>• Selección de rol</li>
          <li>• Confirmación visual al guardar</li>
        </ul>

      </div>

      <div className="register-panel register-panel--form">

        <form onSubmit={handleSubmit} className="register-form">

          <div className="register-field">

            <label htmlFor="user">Usuario</label>

            <input
              id="user"
              name="user"
              type="text"
              value={formData.user}
              onChange={handleChange}
              placeholder="Ej. Angel"
            />

          </div>

          <div className="register-field">

            <label htmlFor="pass">Contraseña</label>

            <input
              id="pass"
              name="pass"
              type="password"
              value={formData.pass}
              onChange={handleChange}
              placeholder="********"
            />

          </div>

          <div className="register-field">

            <label htmlFor="rol">Rol</label>

            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="User">Usuario</option>
              <option value="Admin">Administrador</option>
            </select>

          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear usuario'}
          </button>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/')}
          >
            Volver al inicio de sesión
          </button>

        </form>

      </div>

      {modal.open && (

        <div className="modal-overlay" role="dialog" aria-modal="true">

          <div
            className={`modal-card ${
              modal.type === 'success'
                ? 'modal-card--success'
                : 'modal-card--error'
            }`}
          >

            <div className="modal-icon">
              {modal.type === 'success' ? '✓' : '!'}
            </div>

            <h3>{modal.title}</h3>

            <p>{modal.message}</p>

            <button
              type="button"
              onClick={() =>
                setModal((prev) => ({
                  ...prev,
                  open: false
                }))
              }
            >
              Aceptar
            </button>

          </div>

        </div>

      )}

    </div>

  );

}
export default Register;