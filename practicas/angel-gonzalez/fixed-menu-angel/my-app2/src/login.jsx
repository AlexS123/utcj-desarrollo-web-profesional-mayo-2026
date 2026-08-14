import React, {
  useState,
  useEffect
} from 'react';

import {
  useNavigate
} from 'react-router-dom';


function Login() {

  const navigate =
    useNavigate();


  // ==========================================
  // ESTADO DEL FORMULARIO
  // ==========================================

  const [formData, setFormData] =
    useState({

      username: '',
      password: ''

    });


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // MODAL
  // ==========================================

  const [modal, setModal] =
    useState({

      open: false,
      type: '',
      title: '',
      message: ''

    });


  // ==========================================
  // CERRAR MODAL AUTOMÁTICAMENTE
  // ==========================================

  useEffect(() => {

    if (!modal.open) return;


    const timer =
      setTimeout(() => {

        setModal((prev) => ({

          ...prev,

          open: false

        }));

      }, 2200);


    return () =>
      clearTimeout(timer);

  }, [modal.open]);


  // ==========================================
  // CAMBIAR INPUTS
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]:
        value

    }));

  };


  // ==========================================
  // ABRIR MODAL
  // ==========================================

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


  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ========================================
    // VALIDAR CAMPOS
    // ========================================

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

      // ======================================
      // PETICIÓN AL BACKEND
      // ======================================

      const response =
        await fetch(

          'http://localhost:5000/login',

          {

            method: 'POST',

            headers: {

              'Content-Type':
                'application/json'

            },

            credentials:
              'include',

            body:
              JSON.stringify({

                user:
                  formData.username.trim(),

                pass:
                  formData.password

              })

          }

        );


      // ======================================
      // RESPUESTA
      // ======================================

      const data =
        await response.json();


      // ======================================
      // ERROR
      // ======================================

      if (!response.ok) {

        throw new Error(

          data.mensaje ||

          'No se pudo iniciar sesión.'

        );

      }


      // ======================================
      // VERIFICAR QUE EXISTE EL TOKEN
      // ======================================

      if (!data.token) {

        throw new Error(

          'El servidor no devolvió el JWT.'

        );

      }


      // ======================================
      // GUARDAR USUARIO
      // ======================================

      localStorage.setItem(

        'usuario',

        data.usuario.user

      );


      // ======================================
      // GUARDAR JWT
      // ======================================

      localStorage.setItem(

        'token',

        data.token

      );


      // ======================================
      // GUARDAR ROL
      // ======================================

      localStorage.setItem(

        'rol',

        data.usuario.rol

      );


      // ======================================
      // MOSTRAR INFORMACIÓN EN CONSOLA
      // ======================================

      console.log(
        '================================'
      );

      console.log(
        'LOGIN EXITOSO'
      );

      console.log(
        'Usuario:',
        data.usuario.user
      );

      console.log(
        'Rol:',
        data.usuario.rol
      );

      console.log(
        'JWT:',
        data.token
      );

      console.log(
        '================================'
      );


      // ======================================
      // LIMPIAR FORMULARIO
      // ======================================

      setFormData({

        username: '',
        password: ''

      });


      // ======================================
      // MOSTRAR MENSAJE
      // ======================================

      openModal(

        'success',

        '¡Bienvenido!',

        'Inicio de sesión exitoso.'

      );


      // ======================================
      // REDIRECCIÓN
      // ======================================

      setTimeout(() => {

        navigate('/mypage');

      }, 800);

    }

    catch (error) {

      console.error(
        'Error de login:',
        error
      );


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


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="register-shell">

      <div className="register-card">


        {/* ==================================
            PANEL IZQUIERDO
        ================================== */}

        <div
          className="
            register-panel
            register-panel--highlight
          "
        >

          <div className="register-icon">

            🔐

          </div>


          <h1>

            Iniciar sesión

          </h1>


          <p>

            Ingresa tu usuario y contraseña
            para acceder al sistema.

          </p>


          <div
            className="
              register-highlight-box
            "
          >

            <p
              className="
                register-highlight-title
              "
            >

              ¿Qué incluye?

            </p>


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

        </div>


        {/* ==================================
            PANEL DEL FORMULARIO
        ================================== */}

        <div
          className="
            register-panel
            register-panel--form
          "
        >

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >


            {/* ==============================
                USUARIO
            ============================== */}

            <div
              className="
                register-field
              "
            >

              <label>

                Usuario

              </label>


              <input

                name="username"

                type="text"

                value={
                  formData.username
                }

                onChange={
                  handleChange
                }

                placeholder="Ej. luisangel"

              />

            </div>


            {/* ==============================
                PASSWORD
            ============================== */}

            <div
              className="
                register-field
              "
            >

              <label>

                Contraseña

              </label>


              <input

                name="password"

                type="password"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                placeholder="********"

              />

            </div>


            {/* ==============================
                LOGIN
            ============================== */}

            <button

              type="submit"

              disabled={loading}

            >

              {

                loading

                  ? 'Iniciando...'

                  : 'Iniciar sesión'

              }

            </button>


            {/* ==============================
                REGISTRO
            ============================== */}

            <button

              type="button"

              className="
                button-secondary
              "

              onClick={() =>
                navigate('/reg')
              }

            >

              Crear una cuenta

            </button>


          </form>

        </div>

      </div>


      {/* ====================================
          MODAL
      ==================================== */}

      {modal.open && (

        <div

          className="
            modal-overlay
          "

          role="dialog"

        >

          <div

            className={`
              modal-card
              ${
                modal.type === 'success'
                  ? 'modal-card--success'
                  : 'modal-card--error'
              }
            `}

          >

            <div
              className="
                modal-icon
              "
            >

              {

                modal.type === 'success'

                  ? '✓'

                  : '!'

              }

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