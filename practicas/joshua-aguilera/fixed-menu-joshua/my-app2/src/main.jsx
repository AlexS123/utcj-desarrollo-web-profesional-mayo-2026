import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mypage from './mypage.jsx'
import ErrorPage from './errorpage.jsx'

function getRoute() {
  // Normalize hash: remove leading '#' and optional leading '/'
  let route = window.location.hash || ''
  if (route.startsWith('#')) route = route.slice(1)
  if (route.startsWith('/')) route = route.slice(1)
  return route // '' means root
}

function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (to) => {
    if (to.startsWith('#')) window.location.hash = to
    else window.location.hash = `#${to}`
  }

  // allowed routes (menu anchors and main aliases)
  const allowed = new Set(['', 'inicio', 'servicios', 'galeria', 'contacto', 'about', 'mypage', 'home'])

  // If route contains additional segments (e.g. "inicio/extra"), treat as unknown
  const primary = route.split('/')[0]

  // show Mypage only for exact allowed values (no extra segments)
  if (route === '' || (allowed.has(route) && route === primary)) {
    return <Mypage />
  }

  // any other route -> show ErrorPage and allow returning to menu start
  console.debug('Unknown route:', route)
  return <ErrorPage onBack={() => navigate('inicio')} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
