// src/App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

// ── Página 404 ──────────────────────────────────────────────
function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.errorCode}>404</div>
        <div style={styles.icon}>🗺️</div>
        <h1 style={styles.title}>Página no encontrada</h1>
        <p style={styles.message}>
          La ruta que buscas no existe o fue movida a otro lugar.
        </p>
        <button style={styles.button} onClick={() => navigate('/')}>
          ← Regresar al inicio
        </button>
      </div>
    </div>
  )
}

// ── Tu página original ───────────────────────────────────────
function MyPage() {
  return (
    <>
      <section className="itinerary-intro">
        <h1>Itinerario CDMX</h1>
        <p>Un itinerario para mi viaje en julio-agosto</p>
      </section>

      <section id="lugares" className="itinerary-section">
        <h2>Lugares</h2>
        <ul>
          <li>Zócalo, Catedral y Centro Histórico</li>
          <li>Barrio de la Roma o Condesa para pasear</li>
        </ul>
      </section>

      <section id="actividades" className="itinerary-section">
        <h2>Actividades</h2>
        <ul>
          <li>Caminar por el Bosque de Chapultepec y ver el Castillo</li>
          <li>Atardecer en el monumento a la Revolución</li>
        </ul>
      </section>

      <section id="outfits" className="itinerary-section">
        <h2>Outfits</h2>
        <ul>
          <li>Ropa cómoda para caminar: tenis, pantalones y playera</li>
          <li>Abrigo ligero o chamarra para la noche</li>
        </ul>
      </section>
    </>
  )
}

// ── Router principal ─────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// ── Estilos de la página 404 ─────────────────────────────────
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    fontFamily: 'sans-serif',
  },
  card: {
    textAlign: 'center',
    padding: '3rem 2.5rem',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    backdropFilter: 'blur(12px)',
    color: '#fff',
    maxWidth: '420px',
    width: '90%',
  },
  errorCode: {
    fontSize: '7rem',
    fontWeight: '800',
    lineHeight: 1,
    background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  icon: { fontSize: '3rem', margin: '0.5rem 0' },
  title: { fontSize: '1.5rem', fontWeight: '600', margin: '0.5rem 0' },
  message: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  button: {
    padding: '0.75rem 1.75rem',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
}