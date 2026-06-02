import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyPage from './MyPage.jsx'
import Page404 from './404.jsx'

const validPaths = ['/']

const App = validPaths.includes(window.location.pathname) ? MyPage : Page404

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)