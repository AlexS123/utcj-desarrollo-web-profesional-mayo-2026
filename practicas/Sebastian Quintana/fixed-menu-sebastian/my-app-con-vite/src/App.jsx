import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyPage from './MyPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import About from './About.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';
import Portfolio from './Portfolio.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import AdminConfig from './AdminConfig.jsx';
import Icon from './components/Icon.jsx';
import { hasToken } from './auth';
import useCurrentUser from './useCurrentUser';

function Loader({ text }) {
  return (
    <div className="error-page">
      <div className="panel stack" style={{ textAlign: 'center', alignItems: 'center' }}>
        <span className="card-icon">
          <Icon name="shield" size={20} />
        </span>
        <p className="text-muted">{text}</p>
      </div>
    </div>
  );
}

function RequireAuth({ children }) {
  if (!hasToken()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RequireAdmin({ children }) {
  const { isAdmin, loading } = useCurrentUser();

  if (loading) return <Loader text="Comprobando permisos..." />;
  if (!isAdmin) return <Navigate to="/403" replace />;

  return children;
}

// Envuelve una página con el guard de sesión (y opcionalmente el de admin).
function protegida(element, soloAdmin = false) {
  const contenido = soloAdmin ? <RequireAdmin>{element}</RequireAdmin> : element;
  return <RequireAuth>{contenido}</RequireAuth>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={protegida(<MyPage />)} />
        <Route path="/about" element={protegida(<About />)} />
        <Route path="/services" element={protegida(<Services />)} />
        <Route path="/contact" element={protegida(<Contact />)} />
        <Route path="/portfolio" element={protegida(<Portfolio />)} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Solo roles admin / root */}
        <Route path="/admin" element={protegida(<Admin />, true)} />
        <Route path="/admin/config" element={protegida(<AdminConfig />, true)} />

        {/* Rutas para diferentes códigos de error */}
        <Route path="/error/:code" element={<ErrorPage />} />
        <Route path="/400" element={<ErrorPage />} />
        <Route path="/401" element={<ErrorPage />} />
        <Route path="/403" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/500" element={<ErrorPage />} />
        <Route path="/503" element={<ErrorPage />} />

        {/* Ruta catchall para páginas no encontradas */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
