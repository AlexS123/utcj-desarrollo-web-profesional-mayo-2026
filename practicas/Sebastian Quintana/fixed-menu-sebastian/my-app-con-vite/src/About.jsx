import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';

const VALORES = [
  {
    icon: 'gamepad',
    tone: '',
    titulo: 'Jugar primero',
    texto: 'Cada decisión de producto se prueba jugando: si no se siente bien, no se publica.',
  },
  {
    icon: 'users',
    tone: 'card-icon--violet',
    titulo: 'Comunidad al centro',
    texto: 'Las reseñas, los torneos y las listas nacen de lo que pide la comunidad.',
  },
  {
    icon: 'shield',
    tone: 'card-icon--green',
    titulo: 'Cuentas protegidas',
    texto: 'Tokens con expiración, contraseñas cifradas y permisos claros por rol.',
  },
  {
    icon: 'code',
    tone: 'card-icon--amber',
    titulo: 'Hecho a la vista',
    texto: 'Proyecto académico abierto: el código y las decisiones técnicas están documentados.',
  },
];

const HISTORIA = [
  {
    year: 'Mayo 2026',
    titulo: 'Primer prototipo',
    texto: 'Menú fijo y primeras vistas estáticas con React y Vite.',
  },
  {
    year: 'Junio 2026',
    titulo: 'Backend y autenticación',
    texto: 'API en Express con MongoDB, registro de usuarios y login con JWT.',
  },
  {
    year: 'Julio 2026',
    titulo: 'Roles y panel admin',
    texto: 'Control de acceso por rol y gestión de usuarios desde el panel.',
  },
  {
    year: 'Agosto 2026',
    titulo: 'Rediseño completo',
    texto: 'Sistema de diseño unificado, navegación consistente y panel de configuración.',
  },
];

function About() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Acerca de"
        icon="info"
        title="Somos"
        accent="VortiTech"
        lead="Una plataforma gamer creada como proyecto de Desarrollo Web Profesional en la UTCJ: descubrir juegos, formar comunidad y practicar desarrollo full-stack real."
      />

      <section className="section">
        <div className="split-panel">
          <div className="stack">
            <h2>Nuestra misión</h2>
            <p className="text-muted">
              Acercar a los jugadores a experiencias que de otra forma pasarían desapercibidas:
              títulos indie, torneos pequeños y comunidades que apenas empiezan.
            </p>
            <p className="text-muted">
              Queremos que encontrar tu próximo juego (y con quién jugarlo) tome menos de un
              minuto, sin anuncios ni rankings pagados.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-sm" to="/portfolio">
                <Icon name="gamepad" size={16} />
                Ver catálogo
              </Link>
              <Link className="btn btn-secondary btn-sm" to="/contact">
                <Icon name="mail" size={16} />
                Contactar
              </Link>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <strong>+120</strong>
              <span>Jugadores registrados</span>
            </div>
            <div className="stat-card">
              <strong>6</strong>
              <span>Juegos en catálogo</span>
            </div>
            <div className="stat-card">
              <strong>3</strong>
              <span>Eventos por mes</span>
            </div>
            <div className="stat-card">
              <strong>2026</strong>
              <span>Año de inicio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Lo que nos mueve</h2>
          <p>Cuatro principios que ordenan cómo construimos la plataforma.</p>
        </div>
        <div className="grid grid-4">
          {VALORES.map((valor) => (
            <article key={valor.titulo} className="card">
              <span className={`card-icon ${valor.tone}`}>
                <Icon name={valor.icon} size={20} />
              </span>
              <h3>{valor.titulo}</h3>
              <p>{valor.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Cómo llegamos aquí</h2>
          <p>El recorrido del proyecto, entrega por entrega.</p>
        </div>
        <div className="panel">
          <ul className="timeline">
            {HISTORIA.map((etapa) => (
              <li key={etapa.year} className="timeline-item">
                <span className="timeline-year">{etapa.year}</span>
                <h4>{etapa.titulo}</h4>
                <p>{etapa.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2">
          <article className="panel">
            <h3 className="mb-2">Equipo</h3>
            <div className="stack">
              <div className="row">
                <span className="avatar avatar--lg">SQ</span>
                <div>
                  <strong>Sebastián Quintana</strong>
                  <p className="field-hint">Desarrollo full-stack · Diseño de interfaz</p>
                </div>
              </div>
              <div className="row">
                <span className="avatar avatar--lg">UT</span>
                <div>
                  <strong>UTCJ · Mayo 2026</strong>
                  <p className="field-hint">Desarrollo Web Profesional</p>
                </div>
              </div>
            </div>
          </article>

          <article className="panel">
            <h3 className="mb-2">Stack técnico</h3>
            <ul className="bullet-list">
              <li>React 19 con React Router 7 y Vite</li>
              <li>CSS propio con sistema de tokens y Tailwind disponible</li>
              <li>Express 5 + Mongoose sobre MongoDB</li>
              <li>Autenticación JWT con bcrypt y control de roles</li>
            </ul>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default About;
