import React from 'react';

const Mypage = () => {
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
    },
    errorContent: {
      textAlign: 'center',
      maxWidth: '550px',
      padding: '40px 20px',
    },
    errorCode: {
      fontSize: '10rem',
      fontWeight: '900',
      margin: 0,
      lineHeight: 0.9,
      color: '#ff4a5a',
      letterSpacing: '-4px',
      textShadow: '0px 0px 30px rgba(255, 74, 90, 0.2)',
    },
    errorMessage: {
      fontSize: '2.2rem',
      fontWeight: '700',
      margin: '20px 0 10px 0',
      color: '#e2e8f0',
    },
    errorDescription: {
      fontSize: '1.1rem',
      color: '#94a3b8',
      marginBottom: '35px',
      lineHeight: 1.6,
    },
    backHomeBtn: {
      display: 'inline-block',
      padding: '14px 28px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      border: '1px solid #334155',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
    }
  };

  const handleBackHome = () => {
    window.location.pathname = '/';
  };

  return (
    <div style={styles.errorContainer}>
      <div style={styles.errorContent}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorMessage}>Pagina no encontrada</h2>
        <p style={styles.errorDescription}>
          Lo sentimos, el recurso que estas buscando no existe o fue movido a otra direccion permanentemente.
        </p>
        <button 
          onClick={handleBackHome}
          style={styles.backHomeBtn}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ff4a5a';
            e.target.style.borderColor = '#ff4a5a';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#1e293b';
            e.target.style.borderColor = '#334155';
          }}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Mypage;