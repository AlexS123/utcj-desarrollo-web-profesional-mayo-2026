import React from 'react';

// 1. Movemos los datos fuera del componente para limpiar el render
const SERVICIOS = [
  {
    id: 'software',
    titulo: 'Desarrollo de Software',
    descripcion: 'Creación de aplicaciones web y móviles con las últimas tecnologías.'
  },
  {
    id: 'ciberseguridad',
    titulo: 'Ciberseguridad',
    descripcion: 'Protección de sistemas y datos contra amenazas cibernéticas.'
  },
  {
    id: 'nube',
    titulo: 'Servicios en la Nube',
    descripcion: 'Implementación y gestión de soluciones en la nube para optimizar la infraestructura.'
  }
];

function MyPage() {
  return (
    <div className="page-container">
      {/* Usamos <header> en lugar de un <div> genérico para mejorar el SEO y la accesibilidad */}
      <header className="fixed-menu">
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>
      
      {/* <main> le dice al navegador dónde está el contenido fuerte de la página */}
      <main className="page-content">
        
        <section id="inicio" className="hero-section">
          <h1>Mi Página</h1>
          <p className="hero-subtitle">Esta es mi primera página con React.</p>
          {/* Eliminé el estilo en línea (inline style) para mantener todo el diseño en el CSS */}
          <p className="hero-potential">Si te gusta mi página, ayúdame a desbloquear mi potencial.</p>
        </section>

        <section id="servicios" className="content-section">
          <h2>Servicios</h2>
          {/* Contenedor Grid para ordenar las tarjetas de forma horizontal en PC */}
          <div className="services-grid">
            {SERVICIOS.map((servicio) => (
              <article key={servicio.id} className="service-card">
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="content-section">
          <h2>Contacto</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:Sebastian@utcj.edu.mx">Sebastian@utcj.edu.mx</a></p>
            <p><strong>Teléfono:</strong> <a href="tel:+34123456789">+34 123 456 789</a></p>
            <p><strong>Dirección:</strong> Calle Toros Bravos, 656</p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default MyPage;