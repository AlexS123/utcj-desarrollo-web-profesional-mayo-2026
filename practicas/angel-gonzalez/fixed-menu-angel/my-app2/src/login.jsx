import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    const timer = setTimeout(() => {

      setModal((prev) => ({
        ...prev,
        open: false
      }));

    }, 2200);

    return () => clearTimeout(timer);

  }, [modal.open]);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  const openModal = (
    type,
    title,
    message
  ) => {

    setModal({
      open: true,
      type,
      title,
      message
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.password.trim()
    ) {

      openModal(
        'error',
        'Falta completar',
        'Completa todos los campos.'
      );

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:5000/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          credentials: 'include',

          body: JSON.stringify({

            user:
              formData.username.trim(),

            pass:
              formData.password

          })

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.mensaje ||
          'No se pudo iniciar sesión.'
        );

      }


      // Guardar solamente el nombre
      // para mostrarlo en MyPage

      localStorage.setItem(
        'usuario',
        data.usuario.user
      );


      setFormData({
        username: '',
        password: ''
      });


      openModal(
        'success',
        '¡Bienvenido!',
        'Inicio de sesión exitoso.'
      );


      setTimeout(() => {

        navigate('/mypage');

      }, 800);

    }
    catch (error) {

      openModal(
        'error',
        'Error',
        error.message
      );

    }
    finally {

      setLoading(false);

    }

  };


  return (

    <div className="register-container">

      <div className="register-panel register-panel--info">

        <h1>
          🔐 Iniciar sesión
        </h1>

        <p>
          Ingresa tu usuario y contraseña
          para acceder al sistema.
        </p>

        <h3>
          ¿Qué incluye?
        </h3>

        <ul>

          <li>
            • Autenticación mediante JWT
          </li>

          <li>
            • Validación de usuario
          </li>

          <li>
            • Protección de rutas
          </li>

        </ul>

      </div>


      <div className="register-panel register-panel--form">

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          <div className="register-field">

            <label>
              Usuario
            </label>

            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ej. luisangel"
            />

          </div>


          <div className="register-field">

            <label>
              Contraseña
            </label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? 'Iniciando...'
              : 'Iniciar sesión'}

          </button>


          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/reg')}
          >

            Crear una cuenta

          </button>

        </form>

      </div>


      {modal.open && (

        <div
          className="modal-overlay"
          role="dialog"
        >

          <div
            className={`modal-card ${
              modal.type === 'success'
                ? 'modal-card--success'
                : 'modal-card--error'
            }`}
          >

            <div className="modal-icon">

              {modal.type === 'success'
                ? '✓'
                : '!'}

            </div>

            <h3>
              {modal.title}
            </h3>

            <p>
              {modal.message}
            </p>

            <button
              onClick={() =>
                setModal({
                  ...modal,
                  open: false
                })
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

export default Login;