import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const styles = {
    errorContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0a0f1d',
      color: '#ffffff',
      boxSizing: 'border-box'
    },
    errorContent: {
      textAlign: 'center',
      maxWidth: '500px',
    },
    errorCode: {
      fontSize: '9rem',
      fontWeight: '900',
      margin: 0,
      lineHeight: 0.9,
      color: '#ff4a5a',
      letterSpacing: '-3px',
      textShadow: '0px 0px 30px rgba(255, 74, 90, 0.2)',
    },
    errorMessage: {
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: '20px 0 10px 0',
      color: '#e2e8f0',
    },
    errorDescription: {
      fontSize: '1rem',
      color: '#94a3b8',
      marginBottom: '30px',
      lineHeight: 1.5,
    },
    backHomeBtn: {
      display: 'inline-block',
      padding: '12px 24px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      border: '1px solid #334155',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
    }
  };

  return (
    <div style={styles.errorContainer}>
      <div style={styles.errorContent}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorMessage}>Página no encontrada</h2>
        <p style={styles.errorDescription}>
          No pudimos encontrar la sección que buscas. Es posible que la dirección haya cambiado o no exista.
        </p>
        <button 
          onClick={() => navigate('/')}
          style={styles.backHomeBtn}
        >
          Regresar al inicio
        </button>
      </div>
    </div>
  );
};

export default Error;