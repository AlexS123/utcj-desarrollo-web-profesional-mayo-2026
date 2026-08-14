import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';

const SERVICIOS = [
  {
    icon: 'gamepad',
    tone: '',
    titulo: 'Catálogo curado',
    descripcion: 'Selección semanal de títulos indie y competitivos con reseñas de la comunidad.',
    detalles: ['Fichas técnicas completas', 'Puntuación de jugadores', 'Alertas de lanzamiento'],
  },
  {
    icon: 'trophy',
    tone: 'card-icon--amber',
    titulo: 'Torneos y ligas',
    descripcion: 'Organizamos brackets abiertos con tabla de posiciones y premios por temporada.',
    detalles: ['Brackets automáticos', 'Ranking por temporada', 'Transmisiones en vivo'],
  },
  {
    icon: 'users',
    tone: 'card-icon--violet',
    titulo: 'Escuadras y clanes',
    descripcion: 'Encuentra equipo por horario, región y estilo de juego sin salir del sitio.',
    detalles: ['Búsqueda por horario', 'Perfiles de jugador', 'Chat de escuadra'],
  },
  {
    icon: 'shield',
    tone: 'card-icon--green',
    titulo: 'Cuentas seguras',
    descripcion: 'Autenticación con JWT, contraseñas cifradas y control de roles por usuario.',
    detalles: ['Tokens con expiración', 'Hash bcrypt', 'Roles user / admin / root'],
  },
  {
    icon: 'bolt',
    tone: '',
    titulo: 'Recomendaciones',
    descripcion: 'Sugerencias basadas en tu historial de partidas y en lo que juega tu escuadra.',
    detalles: ['Historial personal', 'Listas compartidas', 'Favoritos sincronizados'],
  },
  {
    icon: 'cloud',
    tone: 'card-icon--green',
    titulo: 'Soporte 24/7',
    descripcion: 'Un equipo disponible todo el día para resolver dudas técnicas y de cuenta.',
    detalles: ['Respuesta < 2 h', 'Base de conocimiento', 'Seguimiento por ticket'],
  },
];

const PLANES = [
  {
    nombre: 'Jugador',
    precio: 'Gratis',
    resumen: 'Para explorar el catálogo y unirte a la comunidad.',
    incluye: ['Catálogo completo', 'Perfil de jugador', 'Foros y comentarios'],
    destacado: false,
  },
  {
    nombre: 'Escuadra',
    precio: '$99 / mes',
    resumen: 'Para equipos que compiten cada semana.',
    incluye: ['Todo lo de Jugador', 'Torneos privados', 'Estadísticas del equipo', 'Soporte prioritario'],
    destacado: true,
  },
  {
    nombre: 'Estudio',
    precio: 'A medida',
    resumen: 'Para estudios que publican sus juegos con nosotros.',
    incluye: ['Ficha destacada', 'Campañas de lanzamiento', 'Panel de métricas'],
    destacado: false,
  },
];

function Services() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Servicios"
        icon="layers"
        title="Todo para tu"
        accent="experiencia gamer"
        lead="Desde el descubrimiento de juegos hasta la organización de torneos: estas son las piezas que forman la plataforma VortiTech."
      />

      <section className="section">
        <div className="grid grid-3">
          {SERVICIOS.map((servicio) => (
            <article key={servicio.titulo} className="card">
              <span className={`card-icon ${servicio.tone}`}>
                <Icon name={servicio.icon} size={20} />
              </span>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
              <ul className="bullet-list mt-1" style={{ fontSize: '0.9rem' }}>
                {servicio.detalles.map((detalle) => (
                  <li key={detalle}>{detalle}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Planes</h2>
          <p>Empieza gratis y escala cuando tu escuadra o tu estudio lo necesite.</p>
        </div>

        <div className="grid grid-3">
          {PLANES.map((plan) => (
            <article
              key={plan.nombre}
              className={`card${plan.destacado ? ' panel--glow' : ''}`}
            >
              {plan.destacado && <span className="chip chip--violet">Más elegido</span>}
              <h3>{plan.nombre}</h3>
              <strong
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.7rem',
                  color: 'var(--cyan)',
                }}
              >
                {plan.precio}
              </strong>
              <p>{plan.resumen}</p>
              <ul className="bullet-list mt-1" style={{ fontSize: '0.9rem' }}>
                {plan.incluye.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="card-footer">
                <Link
                  className={`btn btn-block ${plan.destacado ? 'btn-primary' : 'btn-secondary'}`}
                  to="/contact"
                >
                  Solicitar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="split-panel">
          <div>
            <h2>Infraestructura del proyecto</h2>
            <p className="text-muted mt-1">
              La plataforma corre con un frontend en React + Vite y un backend en Express con
              MongoDB, autenticación JWT y contraseñas cifradas con bcrypt.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>React 19</strong>
              <span>Frontend</span>
            </div>
            <div className="stat-card">
              <strong>Express</strong>
              <span>API REST</span>
            </div>
            <div className="stat-card">
              <strong>MongoDB</strong>
              <span>Base de datos</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Services;
