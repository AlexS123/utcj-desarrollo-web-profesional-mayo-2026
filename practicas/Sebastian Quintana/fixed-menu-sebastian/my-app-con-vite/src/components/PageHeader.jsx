import React from 'react';
import Icon from './Icon.jsx';

/**
 * Encabezado reutilizable: etiqueta pequeña, título con palabra acentuada,
 * texto de apoyo y acciones opcionales.
 */
function PageHeader({ eyebrow, icon, title, accent, lead, children }) {
  return (
    <section className="page-hero">
      {eyebrow && (
        <span className="eyebrow">
          {icon && <Icon name={icon} size={14} />}
          {eyebrow}
        </span>
      )}

      <h1 className="page-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h1>

      {lead && <p className="page-lead">{lead}</p>}

      {children && <div className="hero-actions">{children}</div>}
    </section>
  );
}

export default PageHeader;
