import React, { useState } from 'react'

function Reg() {
  const [formData, setFormData] = useState({
    user: '',
    pass: '',
    rol: 'User',
  })
  const [modal, setModal] = useState({ open: false, type: '', title: '', message: '' })
  const [loading, setLoading] = useState(false)

  const openModal = (type, title, message) => {
    setModal({ open: true, type, title, message })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.user.trim() || !formData.pass.trim() || !formData.rol) {
      openModal('error', 'Falta completar', 'Completa usuario, contraseña y rol para continuar.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: formData.user.trim(),
          pass: formData.pass,
          rol: formData.rol,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo registrar el usuario')
      }

      openModal('success', '¡Registro creado!', `Usuario ${data.user} registrado correctamente.`)
      setFormData({ user: '', pass: '', rol: 'User' })
    } catch (error) {
      openModal('error', 'Error al enviar', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-shell">
      <div className="register-card">
        <div className="register-panel register-panel--highlight">
          <div className="register-icon">✦</div>
          <h1>Crear nuevo usuario</h1>
          <p>Nueva interfaz con un flujo más claro y un manejo más sencillo del registro.</p>
          <div className="register-highlight-box">
            <p className="register-highlight-title">Qué incluye</p>
            <ul>
              <li>• Usuario y contraseña</li>
              <li>• Selección de rol</li>
              <li>• Confirmación al completar</li>
            </ul>
          </div>
        </div>

        <div className="register-panel register-panel--form">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="user">Usuario</label>
              <input
                id="user"
                name="user"
                type="text"
                value={formData.user}
                onChange={handleChange}
                placeholder="Ej. angel"
              />
            </div>

            <div className="register-field">
              <label htmlFor="pass">Contraseña</label>
              <input
                id="pass"
                name="pass"
                type="password"
                value={formData.pass}
                onChange={handleChange}
                placeholder="********"
              />
            </div>

            <div className="register-field">
              <label htmlFor="rol">Rol</label>
              <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
                <option value="User">Usuario</option>
                <option value="Admin">Administrador</option>
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear usuario'}
            </button>
          </form>
        </div>
      </div>

      {modal.open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className={`modal-card ${modal.type === 'success' ? 'modal-card--success' : 'modal-card--error'}`}>
            <div className="modal-icon">{modal.type === 'success' ? '✓' : '!'}</div>
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <button type="button" onClick={() => setModal({ open: false, type: '', title: '', message: '' })}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reg
