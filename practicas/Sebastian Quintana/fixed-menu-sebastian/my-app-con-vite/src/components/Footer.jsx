import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand">
            <span className="brand-mark">
              <Icon name="bolt" size={20} />
            </span>
            <span className="brand-text">VortiTech</span>
          </span>
          <p>
            Plataforma gamer para descubrir juegos, seguir torneos y construir comunidad
            alrededor de las experiencias que más te gustan.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explorar</h4>
          <Link to="/portfolio">Destacados</Link>
          <Link to="/services">Servicios</Link>
          <Link to="/contact">Comunidad</Link>
          <Link to="/about">Acerca de</Link>
        </div>

        <div className="footer-col">
          <h4>Cuenta</h4>
          <Link to="/register">Crear cuenta</Link>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/404">Estado del servicio</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 VortiTech Gaming. Todos los derechos reservados.</span>
        <span className="text-mono">Hecho con React + Vite · UTCJ 2026</span>
      </div>
    </footer>
  );
}

export default Footer;
