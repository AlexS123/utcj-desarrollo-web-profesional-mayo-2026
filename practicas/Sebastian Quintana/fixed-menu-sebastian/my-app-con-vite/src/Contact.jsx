import React, { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';
import useCurrentUser from './useCurrentUser';

const CANALES = [
  {
    icon: 'mail',
    tone: '',
    titulo: 'Correo',
    valor: 'hola@vortitech.gg',
    texto: 'Respondemos en menos de 24 horas hábiles.',
  },
  {
    icon: 'discord',
    tone: 'card-icon--violet',
    titulo: 'Servidor de la comunidad',
    valor: 'discord.gg/vortitech',
    texto: 'Canales por juego, escuadras y anuncios de torneos.',
  },
  {
    icon: 'clock',
    tone: 'card-icon--green',
    titulo: 'Horario de soporte',
    valor: 'Lun a Dom · 9:00 - 22:00',
    texto: 'Guardias reducidas en días festivos.',
  },
];

const TEMAS = [
  { value: 'comunidad', label: 'Unirme a la comunidad' },
  { value: 'torneos', label: 'Información de torneos' },
  { value: 'estudio', label: 'Propuesta de estudio indie' },
  { value: 'soporte', label: 'Soporte técnico' },
];

const VACIO = { nombre: '', email: '', tema: 'comunidad', mensaje: '' };

function Contact() {
  const { name } = useCurrentUser();
  const [form, setForm] = useState(() => ({ ...VACIO, nombre: name || '' }));
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [modal, setModal] = useState({ open: false, type: '', title: '', message: '' });

  useEffect(() => {
    if (!modal.open) return;
    const timer = window.setTimeout(() => setModal((prev) => ({ ...prev, open: false })), 2600);
    return () => window.clearTimeout(timer);
  }, [modal.open]);

  const handleChange = (e) => {
    const { name: campo, value } = e.target;
    setForm((prev) => ({ ...prev, [campo]: value }));
    setErrores((prev) => ({ ...prev, [campo]: '' }));
  };

  const validar = () => {
    const nuevos = {};

    if (!form.nombre.trim()) nuevos.nombre = 'Escribe tu nombre.';
    if (!form.email.trim()) {
      nuevos.email = 'Escribe tu correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nuevos.email = 'El formato del correo no es válido.';
    }
    if (form.mensaje.trim().length < 15) {
      nuevos.mensaje = 'Cuéntanos un poco más (mínimo 15 caracteres).';
    }

    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setModal({
        open: true,
        type: 'error',
        title: 'Revisa el formulario',
        message: 'Hay campos que necesitan tu atención antes de enviar.',
      });
      return;
    }

    setEnviando(true);

    // Aún no existe endpoint de contacto en el backend: simulamos el envío.
    window.setTimeout(() => {
      setEnviando(false);
      setForm({ ...VACIO, nombre: name || '' });
      setModal({
        open: true,
        type: 'success',
        title: '¡Mensaje enviado!',
        message: 'Gracias por escribirnos. Te responderemos muy pronto.',
      });
    }, 700);
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Comunidad"
        icon="chat"
        title="Hablemos de"
        accent="videojuegos"
        lead="Dudas, propuestas de estudios indie o ganas de entrar a un torneo: escríbenos y te contactamos."
      />

      <section className="section">
        <div className="grid grid-3">
          {CANALES.map((canal) => (
            <article key={canal.titulo} className="card">
              <span className={`card-icon ${canal.tone}`}>
                <Icon name={canal.icon} size={20} />
              </span>
              <h3>{canal.titulo}</h3>
              <strong className="text-mono" style={{ color: 'var(--cyan)', fontSize: '0.92rem' }}>
                {canal.valor}
              </strong>
              <p>{canal.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2">
          <div className="panel">
            <div className="section-heading">
              <h2>Envíanos un mensaje</h2>
              <p>Completa el formulario y elige el tema para dirigirlo al equipo correcto.</p>
            </div>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className={`field${errores.nombre ? ' has-error' : ''}`}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre o gamertag"
                />
                {errores.nombre && <span className="field-error">{errores.nombre}</span>}
              </div>

              <div className={`field${errores.email ? ' has-error' : ''}`}>
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                />
                {errores.email && <span className="field-error">{errores.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="tema">Tema</label>
                <select id="tema" name="tema" value={form.tema} onChange={handleChange}>
                  {TEMAS.map((tema) => (
                    <option key={tema.value} value={tema.value}>
                      {tema.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`field${errores.mensaje ? ' has-error' : ''}`}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
                <span className={errores.mensaje ? 'field-error' : 'field-hint'}>
                  {errores.mensaje || `${form.mensaje.trim().length} caracteres`}
                </span>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={enviando}>
                <Icon name="mail" size={17} />
                {enviando ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>

          <div className="stack">
            <article className="panel panel--glow">
              <h3 className="mb-2">Antes de escribir</h3>
              <ul className="bullet-list">
                <li>Si es un problema de acceso, indica tu nombre de usuario.</li>
                <li>Para propuestas de juegos, incluye enlace a tu build o tráiler.</li>
                <li>Los torneos abren inscripción los lunes a las 18:00.</li>
              </ul>
            </article>

            <article className="panel">
              <h3 className="mb-2">Preguntas frecuentes</h3>
              <div className="stack">
                <div>
                  <strong>¿Cuánto cuesta participar?</strong>
                  <p className="field-hint">Los torneos abiertos son gratuitos para cuentas registradas.</p>
                </div>
                <div>
                  <strong>¿Puedo publicar mi juego?</strong>
                  <p className="field-hint">Sí, revisamos propuestas de estudios indie cada quincena.</p>
                </div>
                <div>
                  <strong>¿Cómo cambio mi rol?</strong>
                  <p className="field-hint">Solo un administrador puede modificar roles desde el panel.</p>
                </div>
              </div>
            </article>

            <div className="alert alert--info">
              <Icon name="info" size={18} />
              <span>
                Este formulario todavía no envía correos reales: el backend no expone un endpoint de
                contacto, así que la confirmación es solo visual.
              </span>
            </div>
          </div>
        </div>
      </section>

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
    </Layout>
  );
}

export default Contact;
