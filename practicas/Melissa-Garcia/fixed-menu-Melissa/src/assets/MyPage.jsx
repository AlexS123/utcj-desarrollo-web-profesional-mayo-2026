import { useState } from 'react';
import './MyPage.css';

function MyPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h1>SmileCare</h1>
                    </div>
                    <button 
                        className={`menu-btn ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        Menú
                    </button>
                    <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                        <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
                        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
                        <a href="#especialistas" onClick={() => setMenuOpen(false)}>Especialistas</a>
                        <a href="#testimonios" onClick={() => setMenuOpen(false)}>Testimonios</a>
                        <a href="#contacto" className="btn-contact" onClick={() => setMenuOpen(false)}>Contacto</a>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <section id="inicio" className="hero">
                    <div className="hero-content">
                        <h2>Sonrisas hermosas y salud bucal de calidad</h2>
                        <p>Cuidado de lujo hecho personal</p>
                        <button className="btn-primary">Agendar cita</button>
                    </div>
                </section>

                <section id="servicios" className="section">
                    <h2>Nuestros Servicios</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Odontología Cosmética</h3>
                            <p>Mejora tu sonrisa con nuestros tratamientos cosméticos avanzados</p>
                        </div>
                        <div className="service-card">
                            <h3>Implantes Dentales</h3>
                            <p>Soluciones premium de implantes dentales</p>
                        </div>
                        <div className="service-card">
                            <h3>Ortodoncia</h3>
                            <p>Alineación perfecta con técnicas modernas</p>
                        </div>
                    </div>
                </section>

                <section id="especialistas" className="section">
                    <h2>Nuestros Especialistas</h2>
                    <p>Doctores experimentados listos para cuidar tu sonrisa</p>
                </section>

                <section id="testimonios" className="section">
                    <h2>Testimonios de Pacientes</h2>
                    <p>Únete a miles de pacientes satisfechos</p>
                </section>

                <section id="contacto" className="contact-section">
                    <h2>Ponte en Contacto</h2>
                    <p>Agenda tu cita hoy mismo</p>
                    <button className="btn-primary">Contáctanos</button>
                </section>
            </main>
        </>
    );
}

export default MyPage;