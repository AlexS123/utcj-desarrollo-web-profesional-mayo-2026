import React from 'react';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';

/**
 * Estructura común de todas las páginas internas:
 * menú fijo arriba, contenido central y footer.
 */
function Layout({ children }) {
  return (
    <div className="page-container">
      <NavBar />
      <main className="page-content fade-in">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
