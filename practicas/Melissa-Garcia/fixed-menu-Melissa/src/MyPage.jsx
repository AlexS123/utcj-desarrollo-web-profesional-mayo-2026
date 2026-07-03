import { useState } from 'react';
import './MyPage.css';

function MyPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    // 1. Estados para los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        servicio: '',
        horario: '', // Para los radio buttons
        terminos: false // Para el checkbox
    });

    // 2. Estados para manejar los errores de validación
    const [errors, setErrors] = useState({});

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // 3. Función de validación obligatoria
    const handleSubmit = (e) => {
        e.preventDefault();
        let currentErrors = {};

        // Validación de campos no nulos / vacíos
        if (!formData.nombre.trim()) currentErrors.nombre = 'El nombre es obligatorio.';
        if (!formData.edad) currentErrors.edad = 'La edad es obligatoria.';
        if (!formData.servicio) currentErrors.servicio = 'Debes seleccionar un servicio.';
        if (!formData.horario) currentErrors.horario = 'Debes elegir un horario de preferencia.';
        if (!formData.terminos) currentErrors.terminos = 'Debes aceptar los términos y condiciones.';

        // Validación con Expresión Regular (Formato de texto/nombre básico sin números)
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
        if (formData.nombre && !nameRegex.test(formData.nombre)) {
            currentErrors.nombre = 'El nombre solo debe contener letras (mínimo 3).';
        }

        // Si existen errores, se guardan en el estado; si no, se procesa el formulario
        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            alert('¡Registro exitoso! Tu cita ha sido agendada.');
            // Aquí puedes limpiar el formulario si lo deseas
        }
    };

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
                        <a href="#contacto" className="btn-primary" style={{textDecoration: 'none', display: 'inline-block'}}>Agendar cita</a>
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

                {/* Formulario de registro añadido y validado en la sección de contacto */}
                <section id="contacto" className="contact-section">
                    <h2>Ponte en Contacto</h2>
                    <p>Agenda tu cita hoy mismo completando el formulario</p>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        
                        {/* 1. Input Text */}
                        <div className="form-group">
                            <label>Nombre Completo:</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleChange}
                                placeholder="Ej. Juan Pérez"
                            />
                            {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
                        </div>

                        {/* 2. Input Numérico */}
                        <div className="form-group">
                            <label>Edad:</label>
                            <input 
                                type="number" 
                                name="edad" 
                                value={formData.edad} 
                                onChange={handleChange}
                                min="1" 
                                max="120"
                                placeholder="Ej. 25"
                            />
                            {errors.edad && <span className="error-msg">{errors.edad}</span>}
                        </div>

                        {/* 3. Select */}
                        <div className="form-group">
                            <label>Servicio Requerido:</label>
                            <select name="servicio" value={formData.servicio} onChange={handleChange}>
                                <option value="">-- Selecciona una opción --</option>
                                <option value="cosmetica">Odontología Cosmética</option>
                                <option value="implantes">Implantes Dentales</option>
                                <option value="ortodoncia">Ortodoncia</option>
                            </select>
                            {errors.servicio && <span className="error-msg">{errors.servicio}</span>}
                        </div>

                        {/* 4. Radio Buttons */}
                        <div className="form-group">
                            <label>Horario de Preferencia:</label>
                            <div className="radio-group">
                                <label>
                                    <input 
                                        type="radio" 
                                        name="horario" 
                                        value="matutino" 
                                        checked={formData.horario === 'matutino'} 
                                        onChange={handleChange} 
                                    /> Mañana
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="horario" 
                                        value="vespertino" 
                                        checked={formData.horario === 'vespertino'} 
                                        onChange={handleChange} 
                                    /> Tarde
                                </label>
                            </div>
                            {errors.horario && <span className="error-msg">{errors.horario}</span>}
                        </div>

                        {/* 5. Checkbox */}
                        <div className="form-group checkbox-group">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="terminos" 
                                    checked={formData.terminos} 
                                    onChange={handleChange} 
                                /> Acepto recibir notificaciones de mi cita
                            </label>
                            {errors.terminos && <span className="error-msg">{errors.terminos}</span>}
                        </div>

                        <button type="submit" className="btn-primary">Enviar Registro</button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default MyPage;