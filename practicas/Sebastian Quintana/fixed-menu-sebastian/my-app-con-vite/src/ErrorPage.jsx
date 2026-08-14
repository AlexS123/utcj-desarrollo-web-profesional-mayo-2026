import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from './components/Icon.jsx';
import { hasToken } from './auth';

const ERROR_MESSAGES = {
  400: {
    title: 'Solicitud inválida',
    description:
      'Los datos enviados no tienen el formato esperado. Verifica la información e intenta de nuevo.',
    icon: 'alert',
  },
  401: {
    title: 'Sesión requerida',
    description: 'Necesitas iniciar sesión para ver este contenido.',
    icon: 'key',
  },
  403: {
    title: 'Acceso restringido',
    description:
      'Tu cuenta no tiene permisos para esta sección. Solo los roles admin o root pueden entrar.',
    icon: 'shield',
  },
  404: {
    title: 'Página no encontrada',
    description:
      'El enlace que seguiste está roto o la página se movió a otra dimensión del multiverso.',
    icon: 'link',
  },
  500: {
    title: 'Error del servidor',
    description: 'Algo falló de nuestro lado. Estamos revisándolo, intenta de nuevo en unos minutos.',
    icon: 'wrench',
  },
  503: {
    title: 'Servicio en mantenimiento',
    description: 'Estamos aplicando mejoras. Volvemos en breve con todo funcionando.',
    icon: 'cloud',
  },
};

function ErrorPage() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // /error/:code trae el código como parámetro; /403, /500, etc. lo traen en la ruta.
  const fromPath = location.pathname.replace(/\D/g, '');
  const errorCode = code || fromPath || '404';
  const info = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES[404];
  const homePath = hasToken() ? '/' : '/login';

  return (
    <div className="error-page">
      <div className="error-shell fade-in">
        <div>
          <Link to={homePath} className="brand" style={{ marginBottom: '1.8rem' }}>
            <span className="brand-mark">
              <Icon name="bolt" size={20} />
            </span>
            <span className="brand-text">VortiTech</span>
          </Link>

          <span className="eyebrow">
            <Icon name="alert" size={14} />
            Error {errorCode}
          </span>

          <div className="error-code">{errorCode}</div>
          <h1 className="error-title">{info.title}</h1>
          <p className="error-text">{info.description}</p>

          <div className="row">
            <Link className="btn btn-primary" to={homePath}>
              <Icon name="home" size={17} />
              {hasToken() ? 'Volver al inicio' : 'Ir al login'}
            </Link>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Regresar
            </button>
            <Link className="btn btn-ghost" to="/contact">
              <Icon name="chat" size={17} />
              Contactar soporte
            </Link>
          </div>
        </div>

        <div className="error-visual" aria-hidden="true">
          <span className="error-glow" />
          <div className="error-orb">
            <Icon name={info.icon} size={44} />
          </div>
          <div className="error-tags">
            <span className="error-tag">
              <i />
              ERROR_{errorCode}
            </span>
            <span className="error-tag error-tag--ok">
              <i />
              SOPORTE_ACTIVO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
