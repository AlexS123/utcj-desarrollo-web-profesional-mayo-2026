import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Icon from './components/Icon.jsx';
import useCurrentUser from './useCurrentUser';

const DESTACADOS = [
  {
    id: 'neon-drift',
    titulo: 'Neon Drift Pro',
    badges: ['Esports', 'Racing'],
    score: '9.2',
    descripcion:
      'Siente la velocidad en circuitos cibernéticos y participa en torneos con recompensas exclusivas.',
    visual: 'neon',
  },
  {
    id: 'shadow-realm',
    titulo: 'Echoes of Aethelgard',
    badges: ['Indie', 'RPG'],
    score: '8.8',
    descripcion:
      'Explora un mundo fracturado lleno de magia antigua y decisiones que cambian la historia.',
    visual: 'fantasy',
  },
  {
    id: 'void-vanguard',
    titulo: 'Void Vanguard',
    badges: ['Gaming', 'Shooter'],
    score: '9.0',
    descripcion:
      'Acción táctica por equipos en estaciones espaciales abandonadas con coordinación total.',
    visual: 'sci-fi',
  },
];

const VENTAJAS = [
  {
    icon: 'trophy',
    tone: 'card-icon--amber',
    titulo: 'Torneos cada semana',
    texto: 'Compite en brackets abiertos y sube en la tabla de posiciones de la comunidad.',
  },
  {
    icon: 'bolt',
    tone: '',
    titulo: 'Recomendaciones al instante',
    texto: 'Tu biblioteca aprende de lo que juegas y te sugiere el siguiente título.',
  },
  {
    icon: 'users',
    tone: 'card-icon--violet',
    titulo: 'Escuadras activas',
    texto: 'Encuentra equipo por horario, región y estilo de juego en segundos.',
  },
];

function MyPage() {
  const { name } = useCurrentUser();

  return (
    <Layout>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">
            <Icon name="gamepad" size={14} />
            Gaming • Indie • Esports
          </span>
          <h1>
            Vorti<span className="accent">Tech</span>
          </h1>
          {name && <p className="hero-welcome">Bienvenid@ de vuelta, {name}.</p>}
          <p className="hero-subtitle">
            Tu espacio para descubrir videojuegos, explorar nuevas historias y vivir la emoción
            del mundo gamer con una comunidad que juega en serio.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/portfolio">
              <Icon name="gamepad" size={17} />
              Ver destacados
            </Link>
            <Link className="btn btn-secondary" to="/services">
              <Icon name="layers" size={17} />
              Conocer servicios
            </Link>
          </div>
        </div>

        <aside className="hero-card">
          <h2>
            <Icon name="bolt" size={16} /> Esta semana
          </h2>
          <ul className="bullet-list">
            <li>Nuevo capítulo de Neon Drift</li>
            <li>Torneos semanales de velocidad</li>
            <li>Recomendaciones exclusivas para ti</li>
            <li>Reseñas de la comunidad indie</li>
          </ul>
          <div className="card-footer">
            <Link className="link-inline" to="/contact">
              Unirme a la comunidad <Icon name="arrowUp" size={15} style={{ transform: 'rotate(90deg)' }} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading section-heading--row">
          <div>
            <h2>Destacados del momento</h2>
            <p>Experiencias que marcan la diferencia esta temporada.</p>
          </div>
          <Link className="link-inline" to="/portfolio">
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid grid-3">
          {DESTACADOS.map((juego) => (
            <article key={juego.id} className="card game-card">
              <div className={`game-visual game-visual--${juego.visual}`}>
                <span className="game-visual-score">★ {juego.score}</span>
              </div>
              <div className="game-content">
                <div className="chip-row">
                  {juego.badges.map((badge) => (
                    <span key={badge} className="chip">
                      {badge}
                    </span>
                  ))}
                </div>
                <h3>{juego.titulo}</h3>
                <p>{juego.descripcion}</p>
                <div className="card-footer">
                  <Link className="link-inline" to="/portfolio">
                    Ver detalles →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>¿Por qué VortiTech?</h2>
          <p>Todo lo que necesitas para jugar acompañado y no perderte nada.</p>
        </div>
        <div className="grid grid-3">
          {VENTAJAS.map((item) => (
            <article key={item.titulo} className="card">
              <span className={`card-icon ${item.tone}`}>
                <Icon name={item.icon} size={20} />
              </span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="split-panel">
          <div>
            <h2>Conecta con la comunidad</h2>
            <p className="text-muted mt-1">
              Comparte tus partidas, descubre recomendaciones y forma parte de la siguiente
              generación gamer.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-secondary btn-sm" to="/contact">
                <Icon name="chat" size={16} />
                Escríbenos
              </Link>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>24/7</strong>
              <span>Actualizaciones</span>
            </div>
            <div className="stat-card">
              <strong>+120</strong>
              <span>Jugadores activos</span>
            </div>
            <div className="stat-card">
              <strong>3</strong>
              <span>Eventos mensuales</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <h2>¿Listo para tu siguiente partida?</h2>
          <p>Explora el catálogo y arma tu escuadra hoy mismo.</p>
        </div>
        <div className="row">
          <Link className="btn btn-primary" to="/portfolio">
            <Icon name="rocket" size={17} />
            Explorar juegos
          </Link>
          <Link className="btn btn-secondary" to="/about">
            Conocer el proyecto
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default MyPage;
