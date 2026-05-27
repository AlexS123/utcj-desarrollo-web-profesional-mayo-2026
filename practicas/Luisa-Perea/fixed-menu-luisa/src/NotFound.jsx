import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      gap: '1.5rem',
      fontFamily: 'sans-serif',
      background: '#f9fafb',
    }}>
      <div style={{ fontSize: '80px' }}>🪐</div>

      <div>
        <span style={{
          display: 'inline-block',
          background: '#fee2e2',
          color: '#b91c1c',
          fontSize: '12px',
          padding: '4px 14px',
          borderRadius: '6px',
          marginBottom: '8px',
        }}>
          Error
        </span>
        <h1 style={{
          fontSize: '96px',
          fontWeight: '600',
          margin: 0,
          lineHeight: 1,
          color: '#111',
          letterSpacing: '-4px',
        }}>
          4<span style={{ color: '#9ca3af' }}>0</span>4
        </h1>
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '500', margin: 0 }}>
        Página no encontrada
      </h2>
      <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '360px', lineHeight: 1.7, margin: 0 }}>
        La página que buscas no existe o fue movida a otra dirección.
        Verifica la URL o regresa al inicio.
      </p>

      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 22px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        background: '#fff',
        color: '#111',
        fontSize: '14px',
        textDecoration: 'none',
      }}>
        ← Regresar al inicio
      </Link>
    </div>
  )
}