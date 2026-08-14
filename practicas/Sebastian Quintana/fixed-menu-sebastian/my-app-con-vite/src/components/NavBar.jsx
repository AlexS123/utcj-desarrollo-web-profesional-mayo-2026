import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { logout as doLogout } from '../auth';
import useCurrentUser, { resetUserCache } from '../useCurrentUser';

const LINKS = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/portfolio', label: 'Destacados', icon: 'gamepad' },
  { to: '/services', label: 'Servicios', icon: 'layers' },
  { to: '/contact', label: 'Comunidad', icon: 'chat' },
  { to: '/about', label: 'Acerca', icon: 'info' },
];

const ADMIN_LINKS = [
  { to: '/admin', label: 'Admin', icon: 'shield' },
  { to: '/admin/config', label: 'Admin Config', icon: 'settings' },
];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, isAdmin } = useCurrentUser();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    doLogout();
    resetUserCache();
    closeMenu();
    navigate('/login', { replace: true });
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`;
  const adminLinkClass = ({ isActive }) => `nav-link nav-link--admin${isActive ? ' is-active' : ''}`;

  return (
    <header className={`navbar${open ? ' is-open' : ''}`}>
      <nav className="navbar-shell" aria-label="Navegación principal">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Icon name="bolt" size={20} />
          </span>
          <span className="brand-text">VortiTech</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass} onClick={closeMenu}>
                <Icon name={link.icon} size={16} />
                {link.label}
              </NavLink>
            </li>
          ))}

          {isAdmin &&
            ADMIN_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={adminLinkClass} onClick={closeMenu}>
                  <Icon name={link.icon} size={16} />
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>

        <div className="nav-actions">
          {name ? (
            <>
              <span className="nav-user">
                <span className="avatar">{name.slice(0, 2).toUpperCase()}</span>
                <span>
                  Hola, <strong>{name}</strong>
                </span>
              </span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                <Icon name="logout" size={16} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="btn btn-ghost btn-sm"
                onClick={closeMenu}
              >
                <Icon name="login" size={16} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                <Icon name="userPlus" size={16} />
                Registro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
