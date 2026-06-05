import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    nombre: '', email: '', edad: '', carrera: '', genero: '', intereses: []
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const reglas = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
    email:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        intereses: checked
          ? [...prev.intereses, value]
          : prev.intereses.filter(i => i !== value)
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const validar = () => {
    const newErrors = {}
    if (!reglas.nombre.test(form.nombre))
      newErrors.nombre = 'Solo letras y espacios, mínimo 3 caracteres.'
    if (!reglas.email.test(form.email))
      newErrors.email = 'Ingresa un correo válido.'
    if (!form.edad || form.edad < 1 || form.edad > 120)
      newErrors.edad = 'Ingresa una edad entre 1 y 120.'
    if (!form.carrera)
      newErrors.carrera = 'Selecciona una carrera.'
    if (!form.genero)
      newErrors.genero = 'Selecciona una opción.'
    if (form.intereses.length === 0)
      newErrors.intereses = 'Selecciona al menos un interés.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validar()
    setErrors(newErrors)
    setSuccess(Object.keys(newErrors).length === 0)
  }

  const estilos = {
    page: { minHeight:'100vh', background:'#f9fafb', display:'flex',
            alignItems:'center', justifyContent:'center', padding:'2rem' },
    card: { background:'#fff', border:'1px solid #e5e7eb', borderRadius:'12px',
            padding:'2rem', width:'100%', maxWidth:'520px' },
    title: { fontSize:'22px', fontWeight:'500', margin:'0 0 1.5rem' },
    field: { marginBottom:'1.25rem' },
    label: { display:'block', fontSize:'13px', color:'#6b7280', marginBottom:'6px' },
    input: { width:'100%', boxSizing:'border-box', padding:'8px 12px',
             border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'14px' },
    error: { fontSize:'12px', color:'#dc2626', marginTop:'4px' },
    radioGroup: { display:'flex', gap:'1rem', flexWrap:'wrap' },
    radioLabel: { display:'flex', alignItems:'center', gap:'6px', fontSize:'14px', cursor:'pointer' },
    checkGroup: { display:'flex', flexDirection:'column', gap:'8px' },
    checkLabel: { display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', cursor:'pointer' },
    btn: { width:'100%', padding:'10px', border:'1px solid #d1d5db',
           borderRadius:'8px', fontSize:'14px', background:'#fff', cursor:'pointer' },
    success: { background:'#dcfce7', color:'#166534', borderRadius:'8px',
               padding:'12px', textAlign:'center', marginTop:'1rem', fontSize:'14px' },
  }

  return (
    <div style={estilos.page}>
      <div style={estilos.card}>
        <h1 style={estilos.title}>Formulario de registro</h1>

        <form onSubmit={handleSubmit} noValidate>

          {/* Nombre */}
          <div style={estilos.field}>
            <label style={estilos.label}>Nombre completo</label>
            <input style={estilos.input} type="text" name="nombre"
              placeholder="Luisa Perea" value={form.nombre} onChange={handleChange} />
            {errors.nombre && <p style={estilos.error}>{errors.nombre}</p>}
          </div>

          {/* Email */}
          <div style={estilos.field}>
            <label style={estilos.label}>Correo electrónico</label>
            <input style={estilos.input} type="text" name="email"
              placeholder="luisa@correo.com" value={form.email} onChange={handleChange} />
            {errors.email && <p style={estilos.error}>{errors.email}</p>}
          </div>

          {/* Edad */}
          <div style={estilos.field}>
            <label style={estilos.label}>Edad</label>
            <input style={estilos.input} type="number" name="edad"
              placeholder="18" min="1" max="120" value={form.edad} onChange={handleChange} />
            {errors.edad && <p style={estilos.error}>{errors.edad}</p>}
          </div>

          {/* Carrera (select) */}
          <div style={estilos.field}>
            <label style={estilos.label}>Carrera</label>
            <select style={estilos.input} name="carrera"
              value={form.carrera} onChange={handleChange}>
              <option value="">Selecciona una carrera</option>
              <option value="gds">Gestión y desarrollo de software</option>
              <option value="ti">Tecnologías de la información</option>
              <option value="mecatronica">Mecatrónica</option>
              <option value="industrial">Ingeniería industrial</option>
            </select>
            {errors.carrera && <p style={estilos.error}>{errors.carrera}</p>}
          </div>

          {/* Género (radio) */}
          <div style={estilos.field}>
            <label style={estilos.label}>Género</label>
            <div style={estilos.radioGroup}>
              {['femenino','masculino','otro'].map(g => (
                <label key={g} style={estilos.radioLabel}>
                  <input type="radio" name="genero" value={g}
                    checked={form.genero === g} onChange={handleChange} />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
            {errors.genero && <p style={estilos.error}>{errors.genero}</p>}
          </div>

          {/* Intereses (checkbox) */}
          <div style={estilos.field}>
            <label style={estilos.label}>Intereses</label>
            <div style={estilos.checkGroup}>
              {[['web','Desarrollo web'],['ciberseguridad','Ciberseguridad'],['ia','Inteligencia artificial']].map(([val, label]) => (
                <label key={val} style={estilos.checkLabel}>
                  <input type="checkbox" value={val}
                    checked={form.intereses.includes(val)} onChange={handleChange} />
                  {label}
                </label>
              ))}
            </div>
            {errors.intereses && <p style={estilos.error}>{errors.intereses}</p>}
          </div>

          <button type="submit" style={estilos.btn}>Registrarse</button>
          {success && <p style={estilos.success}>¡Registro exitoso!</p>}

        </form>
      </div>
    </div>
  )
}