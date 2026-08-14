import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PageHeader from './components/PageHeader.jsx';
import Icon from './components/Icon.jsx';

const JUEGOS = [
  {
    id: 'neon-drift',
    titulo: 'Neon Drift Pro',
    genero: 'Racing',
    visual: 'neon',
    score: '9.2',
    estado: 'Disponible',
    descripcion:
      'Carreras a velocidad extrema en circuitos cibernéticos, con torneos semanales y recompensas exclusivas.',
    tags: ['Multijugador', 'Esports'],
  },
  {
    id: 'echoes-aethelgard',
    titulo: 'Echoes of Aethelgard',
    genero: 'RPG',
    visual: 'fantasy',
    score: '8.8',
    estado: 'Disponible',
    descripcion:
      'Un mundo fracturado por la magia antigua donde cada decisión reescribe el destino de tres reinos.',
    tags: ['Historia', 'Un jugador'],
  },
  {
    id: 'void-vanguard',
    titulo: 'Void Vanguard',
    genero: 'Shooter',
    visual: 'sci-fi',
    score: '9.0',
    estado: 'Disponible',
    descripcion:
      'Acción táctica por escuadras en estaciones espaciales abandonadas: la coordinación lo es todo.',
    tags: ['Cooperativo', 'Táctico'],
  },
  {
    id: 'hollow-signal',
    titulo: 'Hollow Signal',
    genero: 'Terror',
    visual: 'horror',
    score: '8.4',
    estado: 'Beta',
    descripcion:
      'Terror psicológico en una estación de radio abandonada donde el sonido es tu única defensa.',
    tags: ['Atmosférico', 'Un jugador'],
  },
  {
    id: 'prism-logic',
    titulo: 'Prism Logic',
    genero: 'Puzzle',
    visual: 'puzzle',
    score: '8.9',
    estado: 'Disponible',
    descripcion:
      'Rompecabezas de luz y reflejos con 120 niveles diseñados por la propia comunidad.',
    tags: ['Casual', 'Ingenio'],
  },
  {
    id: 'pixel-arena',
    titulo: 'Pixel Arena 88',
    genero: 'Retro',
    visual: 'retro',
    score: '8.1',
    estado: 'Próximamente',
    descripcion:
      'Peleas 1v1 con estética arcade de los ochenta, rollback netcode y ranking global.',
    tags: ['Competitivo', 'Arcade'],
  },
];

const GENEROS = ['Todos', ...new Set(JUEGOS.map((juego) => juego.genero))];

function Portfolio() {
  const [genero, setGenero] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return JUEGOS.filter((juego) => {
      const coincideGenero = genero === 'Todos' || juego.genero === genero;
      const coincideTexto =
        !texto ||
        juego.titulo.toLowerCase().includes(texto) ||
        juego.descripcion.toLowerCase().includes(texto);

      return coincideGenero && coincideTexto;
    });
  }, [genero, busqueda]);

  return (
    <Layout>
      <PageHeader
        eyebrow="Catálogo"
        icon="gamepad"
        title="Juegos"
        accent="destacados"
        lead="Una selección curada de títulos indie y competitivos. Filtra por género o busca por nombre para encontrar tu próxima partida."
      />

      <section className="section">
        <div className="row row-between mb-2">
          <div className="chip-row">
            {GENEROS.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip chip-filter${genero === item ? ' is-active' : ''}`}
                onClick={() => setGenero(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="search-input">
            <Icon name="search" size={16} />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar juego..."
              aria-label="Buscar juego"
            />
          </label>
        </div>

        <p className="field-hint mb-2">
          Mostrando {visibles.length} de {JUEGOS.length} títulos
        </p>

        {visibles.length === 0 ? (
          <div className="empty-state">
            <span className="card-icon">
              <Icon name="search" size={20} />
            </span>
            <h3>Sin resultados</h3>
            <p>No encontramos juegos con ese filtro. Prueba con otro género o limpia la búsqueda.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setGenero('Todos');
                setBusqueda('');
              }}
            >
              <Icon name="refresh" size={16} />
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-3">
            {visibles.map((juego) => (
              <article key={juego.id} className="card game-card">
                <div className={`game-visual game-visual--${juego.visual}`}>
                  <span className="game-visual-score">★ {juego.score}</span>
                </div>
                <div className="game-content">
                  <div className="chip-row">
                    <span className="chip">{juego.genero}</span>
                    {juego.tags.map((tag) => (
                      <span key={tag} className="chip chip--violet">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3>{juego.titulo}</h3>
                  <p>{juego.descripcion}</p>
                  <div className="card-footer row row-between">
                    <span className="field-hint text-mono">{juego.estado}</span>
                    <Link className="link-inline" to="/contact">
                      Pedir acceso →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="cta-panel">
        <div>
          <h2>¿Tu juego debería estar aquí?</h2>
          <p>Recibimos propuestas de estudios indie todo el año.</p>
        </div>
        <Link className="btn btn-primary" to="/contact">
          <Icon name="mail" size={17} />
          Enviar propuesta
        </Link>
      </section>
    </Layout>
  );
}

export default Portfolio;
