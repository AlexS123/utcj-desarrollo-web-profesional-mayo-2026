import { useState } from 'react'
import '../App.css'

const menuItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'mypage', label: 'Mi página' },
  { id: 'docs', label: 'Documentación' },
  { id: 'contact', label: 'Contacto' },
  { id: 'about', label: 'Acerca de' },
]

function Mypage() {
  const [activePage, setActivePage] = useState('mypage')

  const renderPage = () => {
    switch (activePage) {
      case 'mypage':
        return (
          <div>
            <h1>Mi Página</h1>
            <p>Esta es la sección principal de mypage.</p>
          </div>
        )
      case 'docs':
        return (
          <div>
            <h1>Documentación</h1>
            <p>Encuentra aquí los enlaces y recursos útiles de tu proyecto.</p>
            <ul>
              <li>Guía de uso</li>
              <li>Funciones del menú</li>
              <li>Cómo editar la interfaz</li>
            </ul>
          </div>
        )
      case 'contact':
        return (
          <div>
            <h1>Contacto</h1>
            <p>Escribe a soporte@example.com o visita nuestras redes.</p>
          </div>
        )
      case 'about':
        return (
          <div>
            <h1>Acerca de</h1>
            <p>Esta aplicación usa Vite y React. El menú es persistente y permite cambiar de secciones.</p>
          </div>
        )
      case 'home':
      default:
        return (
          <div>
            <h1>Bienvenido</h1>
            <p>Este es el dashboard principal. Selecciona una opción del menú para cambiar de sección.</p>
          </div>
        )
    }
  }

  return (
    <div className="app-shell">
      <aside className="app-menu">
        <div className="menu-brand">Mi Pagina</div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={activePage === item.id ? 'menu-button active' : 'menu-button'}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="app-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default Mypage;