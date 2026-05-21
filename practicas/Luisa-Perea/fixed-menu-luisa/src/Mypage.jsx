function Mypage() {
  return (
    <>
      {/* MENÚ FIJO */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem', height: '56px', zIndex: 1000
      }}>
        <span style={{ fontWeight: 600 }}>Luisa Perea</span>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#inicio" style={{ textDecoration: 'none', color: '#333' }}>Inicio</a></li>
          <li><a href="#about"  style={{ textDecoration: 'none', color: '#333' }}>Acerca de</a></li>
          <li><a href="#contact" style={{ textDecoration: 'none', color: '#333' }}>Contacto</a></li>
        </ul>
      </nav>

      {/* CONTENIDO */}
      <main style={{ marginTop: '56px' }}>

        {/* INICIO */}
        <section id="inicio" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <h1>Hola, soy Luisa Perea 👋</h1>
          <p style={{ color: '#666', maxWidth: '500px', margin: '1rem auto' }}>
            Estudiante en la UTCJ.
            Apasionada por el desarrollo web y la ciberseguridad.
          </p>
        </section>

        {/* ACERCA DE */}
        <section id="about" style={{ padding: '3rem 2rem', borderTop: '1px solid #eee' }}>
          <h2>Acerca de mí</h2>
          <p style={{ color: '#666', margin: '1rem 0', lineHeight: 1.7 }}>
            Estudiante de Gesition y desarollo de software , cursando la materia de desarollo web profesional , aprendiendo a usar React .
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1rem' }}>
            {['React', 'Vite', 'JavaScript', 'HTML / CSS', 'Ciberseguridad', 'SQL'].map(s => (
              <span key={s} style={{
                background: '#f4f4f4', borderRadius: '6px',
                padding: '6px 14px', fontSize: '13px'
              }}>{s}</span>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" style={{ padding: '3rem 2rem', borderTop: '1px solid #eee' }}>
          <h2>Contacto</h2>
          <div style={{
            marginTop: '1rem', background: '#f39ce1',
            border: '1px solid #e5e5e5', borderRadius: '12px',
            padding: '1.25rem', maxWidth: '360px'
          }}>
            <p style={{ fontWeight: 600 }}>Luisa Perea</p>
            <p style={{ color: '#666', fontSize: '14px' }}>Estudiante UTCJ · Cd. Juárez</p>
            <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #eee' }} />
            <p style={{ fontSize: '14px' }}>657 192 2980</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}> Ciudad Juárez, Chihuahua</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>UTCJ</p>
          </div>
        </section>

      </main>
    </>
  )
}

export default Mypage
