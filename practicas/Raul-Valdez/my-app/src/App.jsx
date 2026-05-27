import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Mypage from './Mypage' 
import Error from './Error' 
import './App.css'

// Encapsulamos tu pantalla de inicio original en este subcomponente
const Home = ({ count, setCount }) => {
  return (
    <div style={{ paddingTop: '80px' }}> {/* Espacio para que el menú fijo no tape el contenido original */}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '60px',
      backgroundColor: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      boxSizing: 'border-box',
      borderBottom: '1px solid #334155',
      zIndex: 1000,
      fontFamily: 'system-ui, sans-serif',
    },
    logo: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: '1.2rem',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      color: '#94a3b8',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.95rem',
    }
  };

  return (
    <Router>
      {/* MENÚ SUPERIOR FIJO */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Dashboard</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Inicio</Link>
          {/* Al dar clic aquí, la app navega a una ruta que no existe en el sistema */}
          <Link to="/help-center/docs" style={styles.link}>Ayuda</Link>
        </div>
      </nav>

      {/* DEFINICIÓN DE LAS RUTAS */}
      <Routes>
        {/* Ruta correcta de inicio */}
        <Route path="/" element={<Home count={count} setCount={setCount} />} />
        
        {/* El comodín "*" captura la ruta "/help-center/docs" (y cualquier otra ruta rota) */}
        {/* y carga directamente tu componente Mypage tal cual lo dejaste */}
        <Route path="*" element={<Error />} /> {/* Cambiado de Mypage a Error */}
      </Routes>
    </Router>
  )
}

export default App