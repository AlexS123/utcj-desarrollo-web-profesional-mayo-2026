import React from 'react';

const MyPage = () => {
  // Estilos en objetos de JS para mantener todo en un solo archivo
  const styles = {
    // ── NAVBAR FIJO ──
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#111111', // El negro premium de tu RentGuard
      color: '#FAFAF8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      padding: '0 2rem',
      zIndex: 1000, // Evita que otros elementos pasen por encima al dar scroll
      borderBottom: '1px solid #E2E0DA',
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    navLinks: {
      display: 'flex',
      gap: '1.5rem',
      listStyle: 'none',
    },
    // ── CONTENEDOR PRINCIPAL ──
    mainContent: {
      // CRUCIAL: Como el menu es 'fixed', no ocupa espacio en el flujo. 
      // Necesitamos un padding-top igual o mayor a la altura del navbar (60px)
      // para que el contenido no se quede escondido detrás del menú.
      paddingTop: '80px', 
      paddingLeft: '2rem',
      paddingRight: '2rem',
      minHeight: '200vh', // Altura simulada para forzar el scroll down
      fontFamily: 'sans-serif',
    }
  };

  return (
    <div>
      {/* MENU SUPERIOR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>RentGuard</div>
        <ul style={styles.navLinks}>
          <li><a href="#home" style={{ color: '#FAFAF8', textDecoration: 'none' }}>Inicio</a></li>
          <li><a href="#props" style={{ color: '#FAFAF8', textDecoration: 'none' }}>Propiedades</a></li>
          <li><a href="#out" style={{ color: '#FAFAF8', textDecoration: 'none' }}>Salir</a></li>
        </ul>
      </nav>

      {/* CONTENIDO DE LA PÁGINA */}
      <main style={styles.mainContent}>
        <h2>Bienvenido a tu Dashboard</h2>
        <p>Continua bajando</p>
        
        {/* Relleno para generar el scroll */}
        <div style={{ marginTop: '500px', backgroundColor: '#F0EFEB', padding: '2rem' }}>
          <h3>Continua hacia abajo</h3>
          <p>UTCJ</p>
        </div>
      </main>
    </div>
  );
};

export default MyPage;