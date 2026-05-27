// Mypage.jsx

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Error from './Error.jsx';

const Home = () => {
  const containerStyle = {
    paddingTop: '80px',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    minHeight: '160vh',
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <h1>Panel de Control</h1>

        <p>Dale para abajo.</p>

        <div
          style={{
            height: '900px',
            margin: '30px 0',
            border: '1px dashed #334155',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
          }}
        >
          Contenido de la aplicación...
        </div>

        <p>Fin</p>
      </div>
    </div>
  );
};

export default function Mypage() {
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
    },
  };

  return (
    <Router>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Dashboard</div>

        <div style={styles.navLinks}>
          <Link to="http://localhost:5173/algo" style={styles.link}>
            Inicio
          </Link>

          {/* Ruta falsa para mostrar error */}
          <Link to="/help-center/docs" style={styles.link}>
            Ayuda
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}